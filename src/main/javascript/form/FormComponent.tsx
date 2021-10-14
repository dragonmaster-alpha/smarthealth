import {autobind} from 'core-decorators';
import Scroll from 'main/container/Scroll';
import FieldStateEvaluator from 'main/form/FieldStateEvaluator';
import FormContext from 'main/form/FormContext';
import FormFieldsAndSections from 'main/form/FormFieldsAndSections';
import FormWithTabs from 'main/form/FormWithTabs';
import AutoCloser from 'main/utility/AutoCloser';
import FormDataUtility from 'main/utility/FormDataUtility';
import FormDescriptionUtility from 'main/utility/FormDescriptionUtility';
import {observer} from 'mobx-react';
import React from 'react';
import FormField from 'smarthealth-javascript/FormField';
import FormFieldGroup from 'smarthealth-javascript/FormFieldGroup';
import FormFieldType from 'smarthealth-javascript/FormFieldType';

/**
 * Component for a form based on a form description. Manages the data for the form and the reaction for fieldStates.
 *
 * @author Larry 16/08/2019
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2019
 */
interface FormComponentProps<T>
{
    context: FormContext<T>;
    data: T;
}

@observer
class FormComponent<T> extends React.Component<FormComponentProps<T>>
{
    private readonly autoCloser = new AutoCloser();

    public componentDidMount()
    {
        this.createAutomaticFieldStateEvaluators();
    }

    public componentWillUnmount()
    {
        this.autoCloser.onUnmount();
    }

    private createAutomaticFieldStateEvaluators()
    {
        const allFields = FormDescriptionUtility.allFields(this.props.context.formDescription);
        allFields.forEach(this.createFieldStateReaction);
    }

    @autobind
    private createFieldStateReaction(field: FormField)
    {
        if (field.type === FormFieldType.Group)
        {
            const groupField = field as FormFieldGroup;
            groupField.fields.forEach(this.createFieldStateReaction);
        }

        if (field.fieldIf)
        {
            this.autoCloser.createMobXAutorun(() =>
                FieldStateEvaluator.updateFieldState(this.props.context, field, this.props.data));
        }
    }

    @autobind
    private onFieldChange(value: any, field: FormField)
    {
        FormDataUtility.set(this.props.data as any, field, value);
    }

    public render()
    {
        // TODO draw form outer boundary
        const { formDescription } = this.props.context;
        if (FormDescriptionUtility.hasTabs(formDescription))
        {
            return <FormWithTabs context={this.props.context} data={this.props.data}
                onFieldChange={this.onFieldChange} />;
        }
        else
        {
            return (
                <Scroll>
                    <FormFieldsAndSections context={this.props.context} data={this.props.data}
                        fieldsAndSections={formDescription.fieldsAndSections} onFieldChange={this.onFieldChange} />
                </Scroll>
            );
        }
    }
}

export default FormComponent;
