import lodash from 'lodash';
import DateUtility from 'main/utility/DateUtility';

/**
 * Start of a validator for checkinggobjects. This is intended to be used in interfaces generated from Java to allow
 * the JSON data to be validated.
 *
 * TODO: Larry work in progress
 * TODO: handle arrays and maps
 * TODO: what happens in the compiled code interms of including these functions?
 * TODO: implement in Java to generate this
 *
 * @author Larry 19/05/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
export type Validator = (value: any, name: string) => void;

export function validate(value: any, name: string, optional: boolean, validator: Validator)
{
    if (value.hasOwnProperty(name))
    {
        validator(value[name], name);
    }
    else if (!optional)
    {
        throw new Error(`Missing property ${name}`);
    }
}

export function validateString(value: any, name: string)
{
    if (!lodash.isString(value))
    {
        throw new Error(`Field ${name} is not a string`);
    }
}

export function validateBoolean(value: any, name: string)
{
    if (!lodash.isBoolean(value))
    {
        throw new Error(`Field ${name} is not a boolean`);
    }
}

export function validateNumber(value: any, name: string)
{
    if (!lodash.isNumber(value))
    {
        throw new Error(`Field ${name} is not a number`);
    }
}

export function validateEventDateTime(value: any, name: string)
{
    validate(value, 'iso', false, validateDateString);
}

export function validateDateString(value: any, name: string)
{
    if (!DateUtility.isValidDateTimeString(value.iso, 'en-AU'))
    {
        throw new Error(`Field ${name} is not a date string`);
    }
}

export function validateAddress(value: any, name: string): void
{
    try
    {
        validate(value, 'address1', false, validateString);
        validate(value, 'address2', true, validateString);
        validate(value, 'city', false, validateString);
        validate(value, 'country', true, validateString);
        validate(value, 'postcode', false, validateString);
        validate(value, 'state', false, validateString);
    }
    catch (ex)
    {
        ex.message = `Validation error in ${name}: Address - ${ex.message}`;
        throw ex;
    }
}

function validateAudit(value: any, name: string): void
{
    try
    {
        validate(value, 'auditIPAddress', false, validateString);
        validate(value, 'auditDateTime', false, validateEventDateTime);
        validate(value, 'auditGroupId', false, validateNumber);
        validate(value, 'auditUserId', false, validateNumber);
    }
    catch (ex)
    {
        ex.message = `Validation error in ${name}: Audit - ${ex.message}`;
        throw ex;
    }
}

export function validateMedicalGroup(value: any, name: string): void
{
    try
    {
        validate(value, 'address', false, validateAddress);
        validate(value, 'audit', true, validateAudit);
        validate(value, 'enabled', true, validateBoolean);
        validate(value, 'fax', true, validateString);
        validate(value, 'groupID', false, validateNumber);
        validate(value, 'name', false, validateString);
        // more fields
    }
    catch (ex)
    {
        ex.message = `Validation error in ${name}: MedicalGroup - ${ex.message}`;
        throw ex;
    }
}

export function validateChildPughClassParameters(value: any, name: string): void
{
    try
    {
        validate(value, 'albumin', true, validateNumber);
        validate(value, 'albuminUnits', true, validateString);
        validate(value, 'ascites', true, validateString);
        validate(value, 'bilirubin', true, validateNumber);
        // more fields
    }
    catch (ex)
    {
        ex.message = `Validation error in ${name}: ChildPughClassParameters - ${ex.message}`;
        throw ex;
    }
}
