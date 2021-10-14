import FieldEditState from 'smarthealth-javascript/FieldEditState';
import FieldState from 'smarthealth-javascript/FieldState';

/**
 * Utility for field condition in forms.
 *
 * @author Thompson 7/11/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
class FieldStateUtility
{
    public static isEnabled(fieldState: FieldState): boolean
    {
        return !fieldState || (fieldState.editState === FieldEditState.Enabled);
    }

    public static isMandatory(fieldState: FieldState): boolean
    {
        return fieldState && (fieldState.editState === FieldEditState.Mandatory);
    }

    public static isReadOnly(fieldState: FieldState): boolean
    {
        return fieldState && (fieldState.editState === FieldEditState.ReadOnly);
    }

    public static isVisible(editing: boolean, fieldState: FieldState): boolean
    {
        if (!fieldState)
        {
            return true;
        }
        else if (editing)
        {
            return fieldState.editState !== FieldEditState.Hidden;
        }
        else
        {
            return !fieldState.viewStateHidden;
        }
    }
}

export default FieldStateUtility;
