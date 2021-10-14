import {css} from '@emotion/core';
import {autobind} from 'core-decorators';
import {background, colour, font} from 'main/application/ThemeConstants';
import {REQUIRED} from 'main/field/FieldConstants';
import BaseInputFieldComponent, {BaseInputFieldComponentProps} from 'main/fieldcomponent/BaseInputFieldComponent';
import FormFieldWidthUtility from 'main/utility/FormFieldWidthUtility';
import {observer} from 'mobx-react';
import React from 'react';

/**
 * An input component for use with fields.
 *
 * Initial implementation doesn't have borders. Consider a variant with or prop for borders.
 *
 * @author Larry 23/12/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
interface InputFieldComponentProps extends BaseInputFieldComponentProps
{
    editable: boolean;
    maxLength: number;
    onArrowDown?: () => void;
    onFocus?: (focus: boolean) => void;
    ref?: React.RefObject<any>;
}

const fieldStyle = css({
    backgroundColor: background.white,
    border: 'none',
    color: colour.text,
    font: font.text,
    padding: 0,
    whiteSpace: 'nowrap',
    ':focus': {
        border: 'none',
        outline: 'none'
    }
});

const fieldNotEditableStyle = css(fieldStyle, {
    cursor: 'default'
});

const fieldReadOnlyStyle = css(fieldStyle, {
    backgroundColor: background.disabled,
    color: colour.disabled
});

@observer
class InputFieldComponent extends BaseInputFieldComponent<InputFieldComponentProps>
{
    @autobind
    private onBlur()
    {
        this.props.onValueChange(this.props.value, false);
        this.props.onFocus && this.props.onFocus(false);
    }

    @autobind
    private onChange(event: React.ChangeEvent<HTMLInputElement>)
    {
        if (event.target.value)
        {
            this.props.onValueChange(event.target.value, true);
        }
        else
        {
            this.props.onValueChange(null, true);
        }
    }

    @autobind
    private onClick(event: React.SyntheticEvent)
    {
        if (this.props.editable)
        {
            event.stopPropagation();
        }
    }

    @autobind
    private onFocus()
    {
        this.props.onFocus && this.props.onFocus(true);
    }

    @autobind
    private onKeyUp(event: React.KeyboardEvent)
    {
        if (event.key === 'ArrowDown')
        {
            this.props.onArrowDown && this.props.onArrowDown();
        }
    }

    public render(): React.ReactNode
    {
        const maxChars = Math.max(this.props.maxLength, this.mandatory ? REQUIRED.length : 0);
        const width = FormFieldWidthUtility.textFieldWidth(maxChars);
        const style = [];
        style.push(this.readOnly ? fieldReadOnlyStyle : this.props.editable ? fieldStyle : fieldNotEditableStyle);
        style.push(css({ width: `${width}em` }));

        return <input css={style} disabled={this.readOnly} maxLength={this.props.maxLength} onBlur={this.onBlur}
            onChange={this.onChange} onClick={this.onClick} onFocus={this.onFocus} onKeyUp={this.onKeyUp}
            placeholder={this.placeholder} readOnly={!this.props.editable} ref={this.props.ref} type="text"
            value={this.props.value || ''} />;
    }
}

export default InputFieldComponent;
