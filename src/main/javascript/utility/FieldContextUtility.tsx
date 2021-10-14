import FieldContext from 'main/field/FieldContext';
import {isTableFieldContext} from 'main/field/TableFieldContext';
import FieldStateUtility from 'main/utility/FieldStateUtility';
import FieldEditState from 'smarthealth-javascript/FieldEditState';
import FieldState from 'smarthealth-javascript/FieldState';
import FormField from 'smarthealth-javascript/FormField';

/**
 * Utility functions for FieldContext
 *
 * @author Larry 23/12/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
class FieldContextUtility
{
    public static getField(context: FieldContext): FormField
    {
        return context.field;
    }

    public static getFieldState(context: FieldContext): FieldState
    {
        if (isTableFieldContext(context))
        {
            const tableFieldState = context.formContext.fieldStates[context.tableContext.id];
            if (FieldStateUtility.isReadOnly(tableFieldState))
            {
                return tableFieldState;
            }
            else
            {
                return context.field.state || { editState: FieldEditState.Enabled };
            }
        }
        else
        {
            return context.formContext.fieldStates[context.id];
        }
    }

    public static isEditing(context: FieldContext): boolean
    {
        return context.formContext.editing;
    }

    public static isMandatory(context: FieldContext): boolean
    {
        return FieldStateUtility.isMandatory(FieldContextUtility.getFieldState(context));
    }

    public static isReadOnly(context: FieldContext): boolean
    {
        return FieldStateUtility.isReadOnly(FieldContextUtility.getFieldState(context));
    }

    public static isValid(context: FieldContext, value: any): boolean
    {
        return context.formContext.fieldValidator.validate(value, FieldContextUtility.getField(context),
            FieldContextUtility.getFieldState(context),
            !context.formContext.validateIncludeMandatory);
    }
}

export default FieldContextUtility;
