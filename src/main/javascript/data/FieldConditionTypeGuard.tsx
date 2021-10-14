import FieldCondition from 'smarthealth-javascript/FieldCondition';
import FieldConditionAnd from 'smarthealth-javascript/FieldConditionAnd';
import FieldConditionField from 'smarthealth-javascript/FieldConditionField';
import FieldConditionNot from 'smarthealth-javascript/FieldConditionNot';
import FieldConditionOr from 'smarthealth-javascript/FieldConditionOr';

/**
 * FieldCondition type guards
 *
 * @author Thompson 3/11/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
export function isFieldConditionField(fieldCondition: FieldCondition): fieldCondition is FieldConditionField
{
    return 'fieldID' in fieldCondition;
}

export function isFieldConditionNot(fieldCondition: FieldCondition): fieldCondition is FieldConditionNot
{
    return 'not' in fieldCondition;
}

export function isFieldConditionOr(fieldCondition: FieldCondition): fieldCondition is FieldConditionOr
{
    return 'or' in fieldCondition;
}

export function isFieldConditionAnd(fieldCondition: FieldCondition): fieldCondition is FieldConditionAnd
{
    return 'and' in fieldCondition;
}
