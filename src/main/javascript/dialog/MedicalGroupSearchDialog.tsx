import classNames from 'classnames';
import {autobind} from 'core-decorators';
import Entity from 'main/component/Entity';
import DialogIcons from 'main/dialog/DialogIcons';
import MandatoryOrInvalidFieldDialog from 'main/dialog/MandatoryOrInvalidFieldDialog';
import OKDialog from 'main/dialog/OKDialog';
import FieldContext from 'main/field/FieldContext';
import TableFieldMinimumWidthVisitor from 'main/field/TableFieldMinimumWidthVisitor';
import {customFieldRendererAdapter, OnFieldChange} from 'main/form/CustomFieldRenderer';
import FieldValidator from 'main/form/FieldValidator';
import FormComponent from 'main/form/FormComponent';
import FormContext from 'main/form/FormContext';
import StoreProps from 'main/store/StoreProps';
import {grid} from 'main/utility/StyleUtility';
import {action, observable, runInAction} from 'mobx';
import {inject, observer} from 'mobx-react';
import {Button} from 'primereact/button';
import {Column} from 'primereact/column';
import {DataTable} from 'primereact/datatable';
import {Dialog} from 'primereact/dialog';
import {InputText} from 'primereact/inputtext';
import React from 'react';
import EntityType from 'smarthealth-javascript/EntityType';
import FormDescription from 'smarthealth-javascript/FormDescription';
import FormField from 'smarthealth-javascript/FormField';
import FormFieldTable from 'smarthealth-javascript/FormFieldTable';
import MedicalGroupDigest from 'smarthealth-javascript/MedicalGroupDigest';

/**
 * Medial Group Search Dialog. Usually loaded from MedicalGroupField.
 *
 * @author Larry 6/05/2019
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2019
 */
interface MedicalGroupSearchDialogProps extends StoreProps
{
    // use onSelect(null) to remove selection
    onSelect: (medicalGroup: number) => void;
}

@inject('appStore')
@observer
class MedicalGroupSearchDialog extends React.Component<MedicalGroupSearchDialogProps>
{
    @observable
    private formData = { Results: null, Search: '' };

    @observable
    private selection: MedicalGroupDigest;

    @action.bound
    private async doSearch()
    {
        this.formData.Results = null;

        const result = await this.props.appStore.handlers.medicalGroupHandler.findMedicalGroups(this.formData.Search);
        if (result.length === 0)
        {
            this.props.appStore.componentStore.modalDialog.show(<OKDialog header="Medical Group Search"
                icon={DialogIcons.info} message="No matching medical group found" />);
        }
        else
        {
            runInAction(() =>
            {
                this.formData.Results = result;
            });
        }
    }

    @autobind
    private onCancel()
    {
        this.props.appStore.componentStore.modalDialog.close();
        this.props.onSelect(null);
    }

    @autobind
    private onClickSearch(canSearch: boolean)
    {
        if (canSearch)
        {
            this.doSearch();
        }
        else
        {
            this.props.appStore.componentStore.modalDialog.show(<MandatoryOrInvalidFieldDialog />);
        }
    }

    @autobind
    private onCreateMedicalGroup()
    {
        // TODO implement create new medical group
        this.props.appStore.componentStore.message.todo('create medical group');
    }

    @autobind
    private onSelectMedicalGroup()
    {
        this.props.appStore.componentStore.modalDialog.close();
        this.props.onSelect(this.selection.groupID);
        this.props.appStore.handlers.medicalGroupHandler.addMedicalGroupRecent(this.selection.groupID);
    }

    @action.bound
    private onSelectionChange(event)
    {
        this.selection = event.value;
    }

    public render(): React.ReactNode
    {
        const actions = (
            <>
                <Button disabled={!this.selection} label="OK" onClick={this.onSelectMedicalGroup} />
                <Button label="New Medical Group ..." onClick={this.onCreateMedicalGroup} />
                <Button label="Cancel" onClick={this.onCancel} />
            </>
        );
        const customFields = {
            Search: customFieldRendererAdapter(this.renderSearchField),
            Results: customFieldRendererAdapter(this.renderResultsTable)
        };
        return (
            <Entity type={EntityType.FormDescription} id="Dialog.MedicalGroup.Search"
                render={(formDescription: FormDescription) =>
                {
                    const formContext = FormContext.build(this.props.appStore, formDescription, customFields);
                    return (
                        <Dialog className="cp-MedicalGroupSearchDialog" header="Medical Group Search" visible={true}
                            modal={true} onHide={this.onCancel} footer={actions} closable={false}>
                            <div style={{ ...grid(), minHeight: '300px' }}>
                                <FormComponent context={formContext} data={this.formData} />
                            </div>
                        </Dialog>
                    );
                }}
            />
        );
    }

    @autobind
    private renderResultsTable(field: FormField, value: any, editing: boolean, disabled: boolean, valid: boolean,
        onFieldChange: OnFieldChange, context: FieldContext, fieldValidator: FieldValidator, data)
    {
        const table = field as FormFieldTable;
        const columns = table.columns.map(columnField =>
        {
            const tableFieldMinimumWidthVisitor = new TableFieldMinimumWidthVisitor();
            const fieldColumnWidth = tableFieldMinimumWidthVisitor.accept(columnField);
            return <Column style={{ width: `${fieldColumnWidth}em` }} field={columnField.id}
                header={columnField.label} />;
        });
        // TODO PrimeReact scrollHeight sets height using max-height. We need to implement height instead.
        return (
            <DataTable scrollable={true} scrollHeight="30ex" selection={this.selection} selectionMode="single"
                onRowDoubleClick={this.onSelectMedicalGroup} onSelectionChange={this.onSelectionChange}
                value={value}>
                {columns}
            </DataTable>
        );
    }

    @autobind
    private renderSearchField(field: FormField, value: any, editing: boolean, disabled: boolean, valid: boolean,
        onFieldChange: OnFieldChange, context: FieldContext, fieldValidator: FieldValidator, data)
    {
        // TODO add styling to look like JavaUI and how to add classes to this
        return (
            <div className="p-inputgroup" style={{ display: 'flex' }}>
                <InputText style={{ flex: 1 }} className={classNames({ 'p-error': !valid })}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => onFieldChange(e.target.value, field)}
                    value={value} />
                <Button label="Search" onClick={() => this.onClickSearch(valid)} />
            </div>
        );
    }
}

export default MedicalGroupSearchDialog;
