import FieldContext from 'main/field/FieldContext';
import FieldValidator from 'main/form/FieldValidator';
import React from 'react';
import FieldState from 'smarthealth-javascript/FieldState';
import FormField from 'smarthealth-javascript/FormField';

/**
 * Definition of a custom field
 * <ul>
 *     <li>T is the type of the form data</li>
 * </ul>
 *
 * @author Larry 16/08/2019
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2019
 */
export type OnFieldChange = (value: any, field: FormField) => void;

export type CustomFieldRenderer<T> =
    (context: FieldContext, value: any, data: T, onFieldChange: OnFieldChange) => React.ReactNode;

export type CustomFieldRendererOld<T> =
    (field: FormField, value: any, editing: boolean, disabled: boolean, valid: boolean, onFieldChange: OnFieldChange,
        context: FieldContext, fieldValidator: FieldValidator, data: T, fieldState: FieldState) => React.ReactNode;

export function customFieldRendererAdapter<T = any>(renderer: CustomFieldRendererOld<T>): CustomFieldRenderer<T>
{
    return function (context: FieldContext, value: any, data: T, onFieldChange: OnFieldChange): React.ReactNode
    {
        const { field } = context;
        const { editing, fieldValidator } = context.formContext;
        const fieldState = context.formContext.fieldStates[field.id];
        const valid = fieldValidator.validate(value, field, fieldState, !context.formContext.validateIncludeMandatory);
        return renderer(field, value, editing, false, valid, onFieldChange, context, fieldValidator, data, fieldState);
    };
}

export type CustomFields<T> = { [key: string]: CustomFieldRenderer<T> };
