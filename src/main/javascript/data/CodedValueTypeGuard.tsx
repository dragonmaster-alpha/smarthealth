import CodedValue from 'smarthealth-javascript/CodedValue';

/**
 * CodedValue type guard
 *
 * @author Thompson 3/11/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
export function isCodedValue(value: any): value is CodedValue
{
    return (value as CodedValue).value !== undefined;
}
