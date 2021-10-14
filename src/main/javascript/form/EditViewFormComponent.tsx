import {autobind} from 'core-decorators';
import lodash from 'lodash';
import LOG from 'loglevel';
import {form} from 'main/application/ThemeConstants';
import Button from 'main/component/Button';
import ErrorBoundary from 'main/component/ErrorBoundary';
import ButtonBar from 'main/container/ButtonBar';
import AbandonChangesDialog from 'main/dialog/AbandonChangesDialog';
import DialogIcons from 'main/dialog/DialogIcons';
import OKDialog from 'main/dialog/OKDialog';
import {CustomFields} from 'main/form/CustomFieldRenderer';
import FormCalculations from 'main/form/FormCalculations';
import FormComponent from 'main/form/FormComponent';
import FormContext from 'main/form/FormContext';
import SessionStore from 'main/store/SessionStore';
import StoreProps from 'main/store/StoreProps';
import FormDataUtility from 'main/utility/FormDataUtility';
import {grid} from 'main/utility/StyleUtility';
import {action, intercept, isObservable, Lambda, observable, runInAction, toJS} from 'mobx';
import {inject, observer} from 'mobx-react';
import React from 'react';
import FormDescription from 'smarthealth-javascript/FormDescription';

/**
 * A form that includes edit and view buttons and functionailty.
 *
 * @author Larry 8/01/2019
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2019
 */
export type ButtonRenderer = (boolean) => React.ReactNode;

export interface BaseEditViewFormComponentProps<T>
{
    // map field ID to custom field renderer
    customFields?: CustomFields<T>;
    // the data for the form
    data: T;
    // position=0 adds before the first button
    extraButtons?: { renderer: ButtonRenderer, position: number }[];
    // initial editing state can be set from outside
    initialEditingState?: boolean;
    onCancel?: () => void;
    // defining an onClose function says that the form can be closed
    onClose?: () => void;
    // hook to conditionally allow editing of the form
    onEdit?: () => boolean | Promise<boolean>;
    onFinishEditing?: () => void;
    /*
     * defining an onSave function says that the form can be edited
     * return true if it was saved successfully
     */
    onSave?: (T) => boolean | Promise<boolean>;
    /*
     * defining an onSaveDraft function says that the form can be saved as draft
     * return true if it was saved successfully
     */
    onSaveDraft?: (T) => boolean | Promise<boolean>;
    onStartEditing?: (editData: T) => void;
}

export interface EditViewFormComponentProps<T> extends BaseEditViewFormComponentProps<T>, StoreProps
{
    formDescription: FormDescription;
    sessionStore?: SessionStore;
}

@inject('appStore', 'sessionStore')
@observer
class EditViewFormComponent<T> extends React.Component<EditViewFormComponentProps<T>>
{

    @observable
    private buttons: ButtonRenderer[];

    private disposer: Lambda;

    @observable
    private editData: T;

    private formCalculations: FormCalculations;

    @observable
    private readonly formContext: FormContext<T>;

    constructor(props)
    {
        super(props);
        this.formContext = FormContext.build(props.appStore, props.formDescription, props.customFields);
        this.setUpButtons();
        if (this.props.initialEditingState)
        {
            this.startEditing();
        }
    }

    public componentDidMount(): void
    {
        if (isObservable(this.props.data))
        {
            // prevent reloads during editing
            this.disposer = intercept(this.props.data, change =>
            {
                // TODO determine why interceptor is not intercepting
                if (this.formContext.editing)
                {
                    this.props.appStore.componentStore.modalDialog.show(<OKDialog header="Edit" icon={DialogIcons.warn}
                        message={'The data for this form has been changed by someone else.' +
                        ' Please cancel your changes and apply them again.'} />);
                }
                else
                {
                    return change;
                }
            });
        }
    }

    public componentDidUpdate(prevProps): void
    {
        if (prevProps.extraButtons !== this.props.extraButtons)
        {
            this.setUpButtons();
        }
    }

    public componentWillUnmount(): void
    {
        this.disposer && this.disposer();
        this.cleanUpFormCalculations();
    }

    private cleanUpFormCalculations()
    {
        if (this.formCalculations)
        {
            this.formCalculations.cleanUp();
            this.formCalculations = null;
        }
    }

    @action
    private doSave(saveDraft?: boolean)
    {
        this.formContext.validateIncludeMandatory = true;
        const saveType: string = saveDraft ? 'Save Draft' : 'Save';
        const invalidFields: Set<string> = this.formContext.fieldValidator.validateForm<T>(this.editData,
            this.props.formDescription, this.formContext.fieldStates);
        if (invalidFields.size > 0)
        {
            LOG.info(`${saveType}fields in error: ${Array.from(invalidFields)
                .join(', ')}`);
            this.props.appStore.componentStore.message.error('Please correct the errors before submitting this form.',
                saveType);
            return;
        }
        if (!this.hasChanged())
        {
            this.props.appStore.componentStore.message.info('Data was not changed.', saveType);
            this.finishEditing();
            return;
        }

        const editData = this.removeNullFields(this.editData);
        let resultOrPromise: boolean | Promise<boolean>;
        if (saveDraft)
        {
            resultOrPromise = this.props.onSaveDraft(editData);
        }
        else
        {
            resultOrPromise = this.props.onSave(editData);
        }

        if (resultOrPromise instanceof Promise)
        {
            const promise: Promise<boolean> = resultOrPromise;
            promise.then((result: boolean) => result && this.finishEditing());
        }
        else
        {
            if (resultOrPromise)
            {
                this.finishEditing();
            }
        }
    }

    @action
    private finishEditing()
    {
        this.formContext.editing = false;
        this.cleanUpFormCalculations();
        this.props.onFinishEditing && this.props.onFinishEditing();
    }

    private hasChanged(): boolean
    {
        const editData = this.removeNullFields(this.editData);
        const data = this.removeNullFields(this.props.data);

        return !lodash.isEqual(data, editData);
    }

    @action.bound
    private onClickCancel()
    {
        if (this.hasChanged())
        {
            this.props.appStore.componentStore.modalDialog.show(
                <AbandonChangesDialog onAbandon={() =>
                {
                    this.props.onCancel && this.props.onCancel();
                    this.finishEditing();
                }} />
            );
        }
        else
        {
            this.props.onCancel && this.props.onCancel();
            this.finishEditing();
        }
    }

    @action.bound
    private onClickEdit()
    {
        if (this.props.onEdit)
        {
            const result = this.props.onEdit();
            if (result instanceof Promise)
            {
                result.then((value: boolean) =>
                {
                    if (value)
                    {
                        runInAction(() => this.startEditing());
                    }
                });
            }
            else if (!this.props.onEdit || result)
            {
                this.startEditing();
            }
        }
        else
        {
            this.startEditing();
        }
    }

    @autobind
    private onClickSave()
    {
        this.doSave(false);
    }

    @autobind
    private onClickSaveDraft()
    {
        this.doSave(true);
    }

    @action.bound
    private populateEditData()
    {
        const editData = lodash.cloneDeep(toJS(this.props.data));
        // unless fields are there components are not controlled
        FormDataUtility.populateMissingFieldsWithNulls(editData, this.props.formDescription.fieldsAndSections);
        this.editData = editData;

        this.formCalculations = new FormCalculations(this.editData, this.props.formDescription);

        this.props.onStartEditing && this.props.onStartEditing(this.editData);
    }

    private removeNullFields(data): {}
    {
        return FormDataUtility.prepareObjectForServer(toJS(data));
    }

    public render()
    {
        const data = this.formContext.editing ? this.editData : this.props.data;
        return (
            <div style={grid(null, `1fr ${form.buttonBarHeight}`)}>
                <ErrorBoundary message={`Error in form ${this.props.formDescription.id}`}>
                    <FormComponent context={this.formContext} data={data} />
                </ErrorBoundary>
                {this.renderButtons()}
            </div>
        );
    }

    private renderButtons()
    {
        return (
            <ButtonBar>
                {this.buttons.map(renderer => renderer(this.formContext.editing))}
            </ButtonBar>
        );
    }

    @autobind
    private renderCancelButton(editing: boolean): React.ReactNode
    {
        return this.formContext.editing && <Button title="Cancel" onClick={this.onClickCancel} />;
    }

    @autobind
    private renderCloseButton(editing: boolean): React.ReactNode
    {
        return this.props.onClose && !this.formContext.editing &&
            <Button title="Close" primary={!this.props.onSave} onClick={this.props.onClose} />;
    }

    @autobind
    private renderEditButton(editing: boolean): React.ReactNode
    {
        return this.props.onSave && !editing && <Button title="Edit" primary={true} onClick={this.onClickEdit} />;
    }

    @autobind
    private renderSaveButton(editing: boolean): React.ReactNode
    {
        return editing && <Button title="Save" primary={true} onClick={this.onClickSave} />;
    }

    @autobind
    private renderSaveDraftButton(editing: boolean): React.ReactNode
    {
        return this.props.onSaveDraft && this.formContext.editing &&
            <Button title="Save Draft" onClick={this.onClickSaveDraft} />;
    }

    @action
    private setUpButtons()
    {
        this.buttons = [this.renderEditButton, this.renderSaveDraftButton,
            this.renderSaveButton, this.renderCancelButton, this.renderCloseButton];
        if (this.props.extraButtons)
        {
            this.props.extraButtons.forEach(button =>
            {
                this.buttons.splice(button.position, 0, button.renderer);
            });
        }
    }

    @action
    private startEditing()
    {
        this.formContext.editing = true;
        this.formContext.validateIncludeMandatory = false;
        this.populateEditData();
    }
}

export default EditViewFormComponent;
