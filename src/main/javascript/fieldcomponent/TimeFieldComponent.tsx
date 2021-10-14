import {css} from '@emotion/core';
import {autobind} from 'core-decorators';
import {colour, field, font} from 'main/application/ThemeConstants';
import {REQUIRED} from 'main/field/FieldConstants';
import {BaseFieldComponentProps} from 'main/fieldcomponent/BaseFieldComponent';
import StoreProps from 'main/store/StoreProps';
import FieldContextUtility from 'main/utility/FieldContextUtility';
import FieldStateUtility from 'main/utility/FieldStateUtility';
import FormFieldWidthUtility from 'main/utility/FormFieldWidthUtility';
import {px} from 'main/utility/StyleUtility';
import {computed} from 'mobx';
import {inject, observer} from 'mobx-react';
import React from 'react';
import FieldState from 'smarthealth-javascript/FieldState';
import FormField from 'smarthealth-javascript/FormField';

/**
 * Allow input of a valid 24 hour time.
 *
 * TODO some internal code taken from BaseContextFieldComponent
 *
 * @author Thompson 21/01/2021
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2021
 */
interface FormattedFieldComponentProps extends BaseFieldComponentProps, StoreProps
{
    // RegExp string pattern for characters that can be accept
    characterFilter?: string;
    format?: (value: string) => string;
    maxLength?: number;
    placeholder?: string;
    // RegExp string pattern for a valid value
    validation?: string;
}

const timeInputStyle = css({
    border: field.border,
    borderRadius: field.borderRadius,
    font: font.text,
    margin: px(field.marginHeightPx, 12),
    padding: px(field.paddingHeightPx, 8),
    width: '62px',
    ':hover': {
        ...field.hover
    },
    ':focus': {
        ...field.focus
    },
    ':read-only': {
        border: 'none'
    }
});

const invalidStyle = css({
    borderColor: colour.error,
    ':hover': {
        ...field.hoverInvalid
    },
    ':focus': {
        ...field.focusInvalid
    }
});

@inject('appStore')
@observer
class TimeFieldComponent extends React.Component<FormattedFieldComponentProps>
{
    @computed
    protected get editing(): boolean
    {
        return this.props.context.formContext.editing;
    }

    @computed
    protected get field(): FormField
    {
        return this.props.context.field as FormField;
    }

    @computed
    protected get fieldState(): FieldState
    {
        return FieldContextUtility.getFieldState(this.props.context);
    }

    @computed
    protected get mandatory(): boolean
    {
        return FieldStateUtility.isMandatory(this.fieldState);
    }

    @computed
    protected get placeholder(): string
    {
        return this.mandatory ? REQUIRED : null;
    }

    @computed
    protected get readOnly(): boolean
    {
        return FieldStateUtility.isReadOnly(this.fieldState);
    }

    @computed
    protected get toolTip(): string
    {
        const toolTip = [this.field.toolTip];
        if (this.editing && !this.readOnly)
        {
            toolTip.push(this.getValidationText());
        }
        return toolTip.filter(value => value)
            .join('\r\n');
    }

    protected getValidationText(): string
    {
        return null;
    }

    private isInputValid(): boolean
    {
        const mandatory = this.mandatory && this.props.context.formContext.validateIncludeMandatory;
        if ((mandatory && !this.props.value))
        {
            return false;
        }
        else if (this.props.value && !this.isValueValid())
        {
            return false;
        }

        return true;
    }

    private isValueAccepted(value: string): boolean
    {
        if (!value || !this.props.characterFilter)
        {
            return true;
        }

        return new RegExp('^[' + `${this.props.characterFilter}` + ']*$').test(value);
    }

    private isValueValid(): boolean
    {
        if (!this.props.value || !this.props.validation)
        {
            return true;
        }

        return new RegExp(this.props.validation).test(this.props.value);
    }

    @autobind
    private onBlur()
    {
        if (this.props.value && this.isValueValid() && this.props.format)
        {
            const valueFormatted = this.props.format(this.props.value);
            this.props.onValueChange(valueFormatted);
        }
    }

    @autobind
    private onChange(event: React.ChangeEvent<HTMLInputElement>)
    {
        if (this.isValueAccepted(event.target.value))
        {
            this.props.onValueChange(event.target.value);
        }
    }

    private onFocus(event: React.FocusEvent<HTMLInputElement>)
    {
        event.target.focus();
    }

    public render()
    {
        return <input css={[timeInputStyle, !this.isInputValid() && invalidStyle]} disabled={this.readOnly}
            maxLength={this.props.maxLength} onBlur={this.onBlur} onChange={this.onChange} onFocus={this.onFocus}
            placeholder={this.props.placeholder}
            // TODO width too narrow for placeholder text
            style={{ width: `${FormFieldWidthUtility.adjustWidth(this.props.maxLength)}em` }}
            readOnly={this.readOnly} type="text" value={this.props.value || ''}
        />;
    }
}

export default TimeFieldComponent;
