import {css, SerializedStyles} from '@emotion/core';
import {field, hoverAndFocus} from 'main/application/ThemeConstants';
import FieldContext from 'main/field/FieldContext';
import FieldContextUtility from 'main/utility/FieldContextUtility';

/**
 * Utility functions to set border styles
 *
 * @author Larry 23/12/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
const borderNormalStyle = css({
    border: field.border,
    borderRadius: field.borderRadius,
    ...hoverAndFocus
});

const borderReadOnlyStyle = css({
    border: field.border,
    borderRadius: field.borderRadius
});

const borderFocusStyle = css({
    borderRadius: field.borderRadius,
    ...field.focus
});

const borderInvalidStyle = css({
    border: field.borderInvalid,
    borderRadius: field.borderRadius,
    ':hover': {
        ...field.hoverInvalid
    },
    ':focus': {
        ...field.focusInvalid
    }
});

const borderFocusInvalidStyle = css({
    borderRadius: field.borderRadius,
    ...field.focusInvalid
});

/**
 * @param focus - where the focus is on an inner field this needs a separate style to make the focus look right
 */
export function borderStyle(context: FieldContext, valid: boolean, focus?: boolean): SerializedStyles
{
    if (FieldContextUtility.isReadOnly(context))
    {
        return borderReadOnlyStyle;
    }
    else if (focus)
    {
        return valid ? borderFocusStyle : borderFocusInvalidStyle;
    }
    else
    {
        return valid ? borderNormalStyle : borderInvalidStyle;
    }
}
