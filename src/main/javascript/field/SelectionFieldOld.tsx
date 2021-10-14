import {autobind} from 'core-decorators';
import MultipleSelectionComponent from 'main/component/MultipleSelectionComponent';
import DropdownWithLength from 'main/field/DropdownWithLength';
import FieldStateUtility from 'main/utility/FieldStateUtility';
import FormDescriptionUtility from 'main/utility/FormDescriptionUtility';
import {isObservableArray} from 'mobx';
import React from 'react';
import FormFieldSelection from 'smarthealth-javascript/FormFieldSelection';
import BaseFieldOld from './BaseFieldOld';

/**
 * Selection form field
 *
 * TODO editable and multiple
 *
 *
 * @author Larry 16/01/2019
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2019
 */
class SelectionFieldOld extends BaseFieldOld<FormFieldSelection>
{
    protected fieldWidthStyles(): React.CSSProperties
    {
        return { ...super.fieldWidthStyles(), minWidth: 'unset' };
    }

    @autobind
    private onDropdownChange(e)
    {
        const value = e.target.value;
        let arrayValue;
        if (isObservableArray(this.props.value))
        {
            arrayValue = [...this.props.value, value];
        }
        else
        {
            arrayValue = [value];
        }
        this.props.onFieldChange(arrayValue, this.props.field);
    }

    protected renderEditing(): React.ReactNode
    {
        const { field, value } = this.props;

        const nullOption = FieldStateUtility.isMandatory(this.props.fieldState) ? null : '(Empty)';
        const options = FormDescriptionUtility.buildOptions(field, nullOption);
        if (field.multiple)
        {
            return <MultipleSelectionComponent appendTo={document.body} className={this.classNames()}
                disabled={FieldStateUtility.isReadOnly(this.props.fieldState)} editable={field.editable}
                id={field.id} maxLength={field.size} onChange={this.onDropdownChange}
                options={options}
                style={this.fieldWidthStyles()} value={value} />;
        }
        else
        {
            return <DropdownWithLength appendTo={document.body} className={this.classNames()}
                disabled={FieldStateUtility.isReadOnly(this.props.fieldState)} editable={field.editable}
                maxLength={field.size} onChange={this.onChange} options={options} style={this.fieldWidthStyles()}
                value={value} />;
        }
    }

    protected renderValue(): React.ReactNode
    {
        const { value } = this.props;
        if (isObservableArray(value) && value.length !== 0)
        {
            return value && value.join(', ');
        }
        else
        {
            return value;
        }
    }
}

export default SelectionFieldOld;
