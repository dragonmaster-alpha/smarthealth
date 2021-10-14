import {autobind} from 'core-decorators';
import lodash from 'lodash';
import SelectionList from 'main/component/SelectionList';
import BaseField from 'main/field/BaseField';
import {EMPTY} from 'main/field/FieldConstants';
import DropdownFieldComponent from 'main/fieldcomponent/DropdownFieldComponent';
import InputFieldComponent from 'main/fieldcomponent/InputFieldComponent';
import MultipleFieldComponent from 'main/fieldcomponent/MultipleFieldComponent';
import {observer} from 'mobx-react';
import React from 'react';
import FormFieldSelection from 'smarthealth-javascript/FormFieldSelection';

/**
 * Selection form field
 *
 * @author Larry 16/01/2019
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2019
 */
@observer
class SelectionField extends BaseField<FormFieldSelection, string | string[]>
{
    private buildOptions()
    {
        const options = this.field.options.map(option => ({ label: option, value: option }));
        if (!this.mandatory && !this.field.multiple)
        {
            options.unshift({ label: EMPTY, value: null });
        }
        return options;
    }

    @autobind
    private onSelectionListValueChange(value)
    {
        if (this.field.multiple)
        {
            if (lodash.isNil(this.props.value))
            {
                this.onValueChange([value]);
            }
            else if (!this.props.value.includes(value))
            {
                const newValues = [...this.props.value, value];
                this.onValueChange(this.resortValues(newValues));
            }
        }
        else
        {
            this.onValueChange(value);
        }
    }

    @autobind
    private renderContent(ref: React.RefObject<any>, onFocus: (focus: boolean) => void): React.ReactNode
    {
        if (this.field.multiple)
        {
            return <MultipleFieldComponent context={this.props.context} onValueChange={this.onValueChange}
                value={this.props.value} />;
        }
        else
        {
            return (
                <InputFieldComponent context={this.props.context} editable={this.field.editable}
                    maxLength={this.field.size} onFocus={onFocus} onValueChange={this.onValueChange}
                    ref={this.field.editable ? ref : null} value={this.props.value} />
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

    @autobind
    private renderOverlay(onExit: () => void): React.ReactNode
    {
        return <SelectionList size={this.field.size} options={this.buildOptions()} onExit={onExit}
            onSelection={this.onSelectionListValueChange} other={this.field.multiple && this.field.editable} />;
    }

    /**
     * Sort the values into the same order as the options follower by  other values
     */
    private resortValues(values: string[]): string[]
    {
        // make the list the same order as the options
        const sortedValues = this.field.options.filter(option => values.includes(option));
        // add other values to the list
        const otherValues = values.filter(value => !sortedValues.includes(value));
        if (otherValues.length > 0)
        {
            sortedValues.push(...otherValues);
        }
        return sortedValues;
    }
}

export default SelectionField;
