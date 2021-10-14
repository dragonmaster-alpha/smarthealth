import lodash from 'lodash';
import {isCodedValue} from 'main/data/CodedValueTypeGuard';
import {
    isFieldConditionAnd, isFieldConditionField, isFieldConditionNot, isFieldConditionOr
} from 'main/data/FieldConditionTypeGuard';
import FormContext from 'main/form/FormContext';
import FormDataUtility from 'main/utility/FormDataUtility';
import FormDescriptionUtility from 'main/utility/FormDescriptionUtility';
import ShouldNeverGetHereError from 'main/utility/ShouldNeverGetHereError';
import StringUtility from 'main/utility/StringUtility';
import EntityData from 'smarthealth-javascript/EntityData';
import FieldCondition from 'smarthealth-javascript/FieldCondition';
import FieldConditionAnd from 'smarthealth-javascript/FieldConditionAnd';
import FieldConditionField from 'smarthealth-javascript/FieldConditionField';
import FieldConditionNot from 'smarthealth-javascript/FieldConditionNot';
import FieldConditionOr from 'smarthealth-javascript/FieldConditionOr';
import FieldEditState from 'smarthealth-javascript/FieldEditState';
import FieldState from 'smarthealth-javascript/FieldState';

/**
 * Evaluate a field condition
 *
 * @author Thompson 29/10/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
class FieldConditionEvaluator
{
    private static compareEqual(sourceFieldValue: any, equal: string): boolean
    {
        if (lodash.isNil(sourceFieldValue))
        {
            return false;
        }
        else if ((typeof sourceFieldValue !== 'string') && !isCodedValue(sourceFieldValue))
        {
            throw new Error('Value is not of type string or CodedValue.');
        }

        if (isCodedValue(sourceFieldValue))
        {
            return (FieldConditionEvaluator.compareEqual(sourceFieldValue.code, equal)
                || FieldConditionEvaluator.compareEqual(sourceFieldValue.value, equal));
        }
        else if (typeof sourceFieldValue === 'string')
        {
            return StringUtility.compareStringsIgnoreCase(sourceFieldValue, equal);
        }
    }

    public static evaluate(formContext: FormContext, fieldCondition: FieldCondition, data: EntityData): boolean
    {
        if (isFieldConditionField(fieldCondition))
        {
            return FieldConditionEvaluator.evaluateField(formContext, fieldCondition, data);
        }
        else if (isFieldConditionNot(fieldCondition))
        {
            return FieldConditionEvaluator.evaluateNot(formContext, fieldCondition, data);
        }
        else if (isFieldConditionOr(fieldCondition))
        {
            return FieldConditionEvaluator.evaluateOr(formContext, fieldCondition, data);
        }
        else if (isFieldConditionAnd(fieldCondition))
        {
            return FieldConditionEvaluator.evaluateAnd(formContext, fieldCondition, data);
        }
        else
        {
            throw new ShouldNeverGetHereError();
        }
    }

    private static evaluateAnd(formContext: FormContext, fieldCondition: FieldConditionAnd, data: EntityData): boolean
    {
        return fieldCondition.and.every(condition => FieldConditionEvaluator.evaluate(formContext, condition, data));
    }

    private static evaluateBooleanMatch(match: boolean, sourceFieldValue: any): boolean
    {
        if (lodash.isNil(sourceFieldValue) || (typeof sourceFieldValue === 'boolean'))
        {
            return sourceFieldValue === match;
        }
        else
        {
            throw new Error('Value is not of type boolean.');
        }
    }

    private static evaluateEquals(sourceFieldValue: any, equals: string[]): boolean
    {
        if (Array.isArray(sourceFieldValue))
        {
            return equals.some(equalValue => sourceFieldValue.some(
                fieldValue => FieldConditionEvaluator.compareEqual(fieldValue, equalValue)));
        }
        else
        {
            return equals.some(equalValue => FieldConditionEvaluator.compareEqual(sourceFieldValue, equalValue));
        }
    }

    private static evaluateField(formContext: FormContext, fieldCondition: FieldConditionField,
        data: EntityData): boolean
    {
        let evaluation: boolean = true;
        const sourceField = FormDescriptionUtility.findField(formContext.formDescription, fieldCondition.fieldID);
        if (!sourceField)
        {
            throw new Error(`Field not found: ${fieldCondition.fieldID}`);
        }
        const sourceFieldValue: any = FormDataUtility.get(data, sourceField);
        const sourceFieldState: FieldState = formContext.fieldStates[fieldCondition.fieldID];
        if (fieldCondition.equals)
        {
            evaluation = FieldConditionEvaluator.evaluateEquals(sourceFieldValue, fieldCondition.equals);
        }
        if (evaluation && fieldCondition.testNotEmpty)
        {
            evaluation = !FieldConditionEvaluator.evaluateTestEmpty(sourceFieldValue);
        }
        if (evaluation && fieldCondition.testEmpty)
        {
            evaluation = FieldConditionEvaluator.evaluateTestEmpty(sourceFieldValue);
        }
        if (evaluation && fieldCondition.testValid)
        {
            evaluation = FieldConditionEvaluator.evaluateTestValid(formContext, sourceFieldValue,
                fieldCondition.fieldID, sourceFieldState);
        }
        if (evaluation && fieldCondition.testTrue)
        {
            evaluation = FieldConditionEvaluator.evaluateBooleanMatch(true, sourceFieldValue);
        }
        if (evaluation && fieldCondition.testFalse)
        {
            evaluation = FieldConditionEvaluator.evaluateBooleanMatch(false, sourceFieldValue);
        }
        if (evaluation && fieldCondition.testEnabled)
        {
            evaluation = FieldConditionEvaluator.evaluateTestEnabled(sourceFieldState);
        }
        if (evaluation && fieldCondition.testDisabled)
        {
            evaluation = FieldConditionEvaluator.evaluateTestDisabled(sourceFieldState);
        }
        if (evaluation && fieldCondition.testMandatory)
        {
            evaluation = FieldConditionEvaluator.evaluateTestMandatory(sourceFieldState);
        }

        return evaluation;
    }

    private static evaluateNot(formContext: FormContext, fieldCondition: FieldConditionNot, data: EntityData): boolean
    {
        return !FieldConditionEvaluator.evaluate(formContext, fieldCondition.not, data);
    }

    private static evaluateOr(formContext: FormContext, fieldCondition: FieldConditionOr, data: EntityData): boolean
    {
        return fieldCondition.or.some(
            condition => FieldConditionEvaluator.evaluate(formContext, condition, data));
    }

    private static evaluateTestDisabled(sourceFieldState: FieldState): boolean
    {
        return !!sourceFieldState
            && ((sourceFieldState.editState === FieldEditState.Hidden)
                || (sourceFieldState.editState === FieldEditState.ReadOnly));
    }

    private static evaluateTestEmpty(sourceFieldValue: any): boolean
    {
        if (sourceFieldValue === '')
        {
            return true;
        }
        else if (Array.isArray(sourceFieldValue) && (sourceFieldValue.length === 0))
        {
            return true;
        }
        else if (lodash.isNil(sourceFieldValue))
        {
            return true;
        }

        return false;
    }

    private static evaluateTestEnabled(fieldState: FieldState): boolean
    {
        return !!fieldState && (fieldState.editState === FieldEditState.Enabled);
    }

    private static evaluateTestMandatory(sourceFieldState: FieldState): boolean
    {
        return !!sourceFieldState && (sourceFieldState.editState === FieldEditState.Mandatory);
    }

    private static evaluateTestValid(formContext: FormContext, sourceFieldValue: any, sourceFieldID: string,
        sourceFieldState: FieldState): boolean
    {
        const sourceField = FormDescriptionUtility.findField(formContext.formDescription, sourceFieldID);
        return formContext.fieldValidator.validate(sourceFieldValue, sourceField, sourceFieldState,
            !formContext.validateIncludeMandatory);
    }
}

export default FieldConditionEvaluator;
