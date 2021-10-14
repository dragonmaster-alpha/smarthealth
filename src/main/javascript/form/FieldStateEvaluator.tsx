import FieldConditionEvaluator from 'main/form/FieldConditionEvaluator';
import FormContext from 'main/form/FormContext';
import FormDataUtility from 'main/utility/FormDataUtility';
import FormDescriptionUtility from 'main/utility/FormDescriptionUtility';
import {runInAction} from 'mobx';
import EntityData from 'smarthealth-javascript/EntityData';
import FieldConditionalIf from 'smarthealth-javascript/FieldConditionalIf';
import FieldEditState from 'smarthealth-javascript/FieldEditState';
import FieldState from 'smarthealth-javascript/FieldState';
import FormDescription from 'smarthealth-javascript/FormDescription';
import FormField from 'smarthealth-javascript/FormField';
import FormFieldGroup from 'smarthealth-javascript/FormFieldGroup';
import FormFieldType from 'smarthealth-javascript/FormFieldType';

/**
 * Extract fields ConditionalFieldState from a form description and evaluate the destination field conditions to
 * determine the destination field FieldState.
 *
 * @author Thompson 4/11/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
export interface FieldStates
{
    [fieldID: string]: FieldState;
}

class FieldStateEvaluator
{

    private static determineCondition(formContext: FormContext, conditionalIf: FieldConditionalIf,
        data: EntityData): boolean
    {
        return FieldConditionEvaluator.evaluate(formContext, conditionalIf.condition, data);
    }

    public static evaluate(formContext: FormContext, destinationField: FormField, data: EntityData): FieldState
    {
        if (!destinationField.fieldIf)
        {
            return destinationField.state;
        }

        const conditionMet = destinationField.fieldIf.ifs.find(
            conditionIf => FieldStateEvaluator.determineCondition(formContext, conditionIf, data));
        if (conditionMet)
        {
            return conditionMet.then;
        }
        else
        {
            return destinationField.fieldIf.elseState;
        }
    }

    private static extractInitialFieldState(field: FormField, fieldsState: FieldStates)
    {
        if (field.type === FormFieldType.Group)
        {
            const groupField = field as FormFieldGroup;
            groupField.fields.forEach(
                innerField => FieldStateEvaluator.extractInitialFieldState(innerField, fieldsState));
        }

        if (field.state)
        {
            fieldsState[field.id] = field.state;
        }
        else
        {
            fieldsState[field.id] = { editState: FieldEditState.Enabled };
        }
    }

    public static extractInitialFieldStates(formDescription: FormDescription): FieldStates
    {
        const fields = FormDescriptionUtility.allFields(formDescription);
        const fieldStates: FieldStates = {};
        fields.forEach((field) => FieldStateEvaluator.extractInitialFieldState(field, fieldStates));
        return fieldStates;
    }

    public static updateFieldState(formContext: FormContext, field: FormField, data: EntityData)
    {
        const fieldState = FieldStateEvaluator.evaluate(formContext, field, data);
        // mobx.runInAction must be used and not @action
        // https://github.com/mobxjs/mobx/issues/457#issuecomment-237145967
        runInAction(() =>
        {
            formContext.fieldStates[field.id] = fieldState;

            if (formContext.editing && fieldState.clearValue && FormDataUtility.get(data, field))
            {
                FormDataUtility.set(data, field, null);
            }
        });
    }
}

export default FieldStateEvaluator;
