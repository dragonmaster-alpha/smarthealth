import BaseField from 'main/field/BaseField';
import React from 'react';
import FormFieldUnsupported from 'smarthealth-javascript/FormFieldUnsupported';

/**
 * Unsupported form field
 *
 * @author Larry 16/01/2019
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2019
 */
class UnsupportedField extends BaseField<FormFieldUnsupported>
{
    protected renderEditing()
    {
        return this.renderView();
    }

    protected renderValue()
    {
        return <>Unsupported: {this.field.name}</>;
    }
}

export default UnsupportedField;
