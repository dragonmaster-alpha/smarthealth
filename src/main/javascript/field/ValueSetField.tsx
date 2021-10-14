import {autobind} from 'core-decorators';
import lodash from 'lodash';
import Entity from 'main/component/Entity';
import SelectionList from 'main/component/SelectionList';
import BaseField, {BaseFieldProps} from 'main/field/BaseField';
import DropdownFieldComponent from 'main/fieldcomponent/DropdownFieldComponent';
import InputFieldComponent from 'main/fieldcomponent/InputFieldComponent';
import MultipleFieldComponent from 'main/fieldcomponent/MultipleFieldComponent';
import ValueSetUtility from 'main/utility/ValueSetUtility';
import {observer} from 'mobx-react';
import React from 'react';
import CodedValue from 'smarthealth-javascript/CodedValue';
import EntityType from 'smarthealth-javascript/EntityType';
import FormFieldValueSet from 'smarthealth-javascript/FormFieldValueSet';
import ValueSet from 'smarthealth-javascript/ValueSet';

/**
 * Render a Value Set field
 *
 * @author Larry 30/12/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
interface ValueSetEditingFieldProps extends BaseFieldProps<FormFieldValueSet, CodedValue | CodedValue[]>
{
    valueSet: ValueSet;
}

class ValueSetEditingField extends BaseField<FormFieldValueSet, CodedValue | CodedValue[], ValueSetEditingFieldProps>
{
    @autobind
    private onInputValueChange(value)
    {
        this.onValueChange(lodash.isString(value) ? { value } : value);
    }

    @autobind
    private onSelectionListValueChange(value)
    {
        if (!this.field.multiple)
        {
            this.onValueChange(value);
            return;
        }

        const newValue = lodash.isString(value) ? { value } : value;
        const array = this.props.value as CodedValue[];
        if (lodash.isNil(this.props.value))
        {
            this.onValueChange([newValue]);
        }
        else if (!array.includes(newValue))
        {
            const newValues = [...array, newValue];
            this.onValueChange(this.resortValues(newValues));
        }
    }

    @autobind
    private renderContent(ref: React.RefObject<any>, onFocus: (focus: boolean) => void): React.ReactNode
    {
        if (this.field.multiple)
        {
            return <MultipleFieldComponent context={this.props.context} onValueChange={this.onValueChange}
                value={this.props.value} renderValue={value => value.value} />;
        }
        else
        {
            return (
                <InputFieldComponent context={this.props.context} editable={this.props.valueSet.extensible}
                    maxLength={this.props.valueSet.length} onFocus={onFocus} onValueChange={this.onInputValueChange}
                    ref={this.props.valueSet.extensible ? ref : null}
                    value={this.renderValue(this.props.value, null)} />
            );
        }
    }

    protected renderEditing(): React.ReactNode
    {
        return (
            <DropdownFieldComponent context={this.props.context} renderContent={this.renderContent}
                renderOverlay={this.renderOverlay} valid={this.valid} />
        );
    }

    protected renderObject(value: CodedValue): React.ReactNode
    {
        return value.value;
    }

    @autobind
    private renderOverlay(onExit: () => void): React.ReactNode
    {
        const nullOption = (this.mandatory || this.field.multiple) ? null : '(Empty)';
        const options = ValueSetUtility.buildValueSetOptions(this.props.valueSet, nullOption);

        return <SelectionList size={this.props.valueSet.length} options={options} onExit={onExit}
            onSelection={this.onSelectionListValueChange}
            other={this.field.multiple && this.props.valueSet.extensible} />;
    }

    /**
     * Sort the values into the same order as the options follower by  other values
     */
    private resortValues(values: CodedValue[]): CodedValue[]
    {
        // make the list the same order as the options
        const sortedValues = this.props.valueSet.values.filter(option => values.includes(option));
        // add other values to the list
        const otherValues = values.filter(value => !sortedValues.includes(value));
        if (otherValues.length > 0)
        {
            sortedValues.push(...otherValues);
        }
        return sortedValues;
    }
}

@observer
class ValueSetField extends BaseField<FormFieldValueSet, CodedValue | CodedValue[]>
{
    protected renderEditing(): React.ReactNode
    {
        return <Entity id={this.field.valueSetID} type={EntityType.ValueSet}
            render={valueSet => <ValueSetEditingField context={this.props.context}
                onFieldChange={this.props.onFieldChange} value={this.props.value} valueSet={valueSet as ValueSet} />}
        />;
    }

    protected renderObject(value: CodedValue): React.ReactNode
    {
        return value.value;
    }
}

export default ValueSetField;
