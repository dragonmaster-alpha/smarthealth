import lodash from 'lodash';
import SelectionFieldOld from 'main/field/SelectionFieldOld';
import {computed} from 'mobx';
import {observer} from 'mobx-react';
import React from 'react';
import FieldEditState from 'smarthealth-javascript/FieldEditState';
import FormFieldFormSpecific from 'smarthealth-javascript/FormFieldFormSpecific';
import FormFieldSelection from 'smarthealth-javascript/FormFieldSelection';
import FormFieldType from 'smarthealth-javascript/FormFieldType';
import BaseFieldOld, {BaseFieldOldProps} from '../field/BaseFieldOld';

/**
 * Form specific selection field which will default to a value if there is only 1 value in the options list.
 *
 * TODO remove this and make it work in the standard selection field if necessary
 *
 * @author Thompson 17/09/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
interface SelectionMandatoryFieldProps extends BaseFieldOldProps<FormFieldFormSpecific>
{
    options: string[];
}

@observer
class SelectionMandatoryField
    extends BaseFieldOld<FormFieldFormSpecific, string, SelectionMandatoryFieldProps>
{
    @computed
    private get selectionField(): FormFieldSelection
    {
        // prepend 0 in argument of Math.max() to allow it to have a default if options is an empty array.
        const size = Math.max(0, ...this.props.options.map(option => option.length));

        return {
            size,
            id: this.props.field.id,
            label: this.props.field.label,
            options: this.props.options,
            type: FormFieldType.Selection,
            state: { editState: FieldEditState.Mandatory }
        };
    }

    public componentDidMount()
    {
        this.setPossibleDefault();
    }

    public componentDidUpdate(prevProps)
    {
        if (!lodash.isEqual(prevProps.options, this.props.options))
        {
            this.setPossibleDefault();
        }
    }

    protected renderEditing(): React.ReactNode
    {
        return <SelectionFieldOld context={this.props.context} editing={this.props.editing}
            disabled={this.props.disabled}
            field={this.selectionField} fieldState={this.props.fieldState} fieldValidator={this.props.fieldValidator}
            onFieldChange={this.props.onFieldChange} value={this.props.value} />;
    }

    protected renderValue(): React.ReactNode
    {
        return this.props.value;
    }

    private setPossibleDefault()
    {
        if ((this.props.options.length !== 1))
        {
            return;
        }

        if (this.props.value !== this.props.options[0])
        {
            this.props.onFieldChange(this.props.options[0], this.props.field);
        }
    }
}

export default SelectionMandatoryField;
