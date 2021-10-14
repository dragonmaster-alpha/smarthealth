import {autobind} from 'core-decorators';
import SelectionList from 'main/component/SelectionList';
import BaseField from 'main/field/BaseField';
import {EMPTY} from 'main/field/FieldConstants';
import DropdownFieldComponent from 'main/fieldcomponent/DropdownFieldComponent';
import InputFieldComponent from 'main/fieldcomponent/InputFieldComponent';
import EnumUtility from 'main/utility/EnumUtility';
import React from 'react';
import FormFieldEnum from 'smarthealth-javascript/FormFieldEnum';

/**
 * Enum form field
 *
 * @author Larry 16/01/2019
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2019
 */
class EnumField extends BaseField<FormFieldEnum>
{
    @autobind
    private renderContent(ref: React.RefObject<any>, onFocus: (focus: boolean) => void): React.ReactNode
    {
        const nullOption = this.mandatory ? null : EMPTY;
        const size = EnumUtility.getEnumSize(this.field.enumType, nullOption);
        return (
            <InputFieldComponent context={this.props.context} editable={false}
                maxLength={size} onFocus={onFocus} onValueChange={() => null}
                value={EnumUtility.getEnumText(this.field.enumType, this.props.value)} />
        );
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
        const nullOption = this.mandatory ? null : EMPTY;
        const options = EnumUtility.buildEnumOptions(this.field.enumType, nullOption);
        const size = EnumUtility.getEnumSize(this.field.enumType, nullOption);
        return <SelectionList size={size} options={options} onExit={onExit}
            onSelection={this.onValueChange} other={false} />;
    }

    protected renderValue(value): React.ReactNode
    {
        if (value)
        {
            return EnumUtility.getEnumText(this.field.enumType, value);
        }
        else
        {
            return '-';
        }
    }

}

export default EnumField;
