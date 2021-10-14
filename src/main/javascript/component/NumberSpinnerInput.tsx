import {css} from '@emotion/core';
import {autobind} from 'core-decorators';
import lodash from 'lodash';
import {colour, field, font} from 'main/application/ThemeConstants';
import FormFieldWidthUtility from 'main/utility/FormFieldWidthUtility';
import {px} from 'main/utility/StyleUtility';
import {observer} from 'mobx-react';
import React from 'react';

/**
 * Number input with up and down arrow buttons to increment and decrement value.
 *
 * TODO Thompson - fix issue with input type="number" allowing characters to be entered.
 *
 * @author Thompson 13/01/2021
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2021
 */
interface NumberSpinnerInputProps
{
    maximumDigits: number;
    onValueChange: (value: number) => void;
    title: string;
    value: number;
}

const inputStyle = css({
    color: colour.text,
    border: field.border,
    borderRadius: field.borderRadius,
    font: font.text,
    padding: px(2, 0, 2, 2),
    ':not(:first-child)': {
        marginLeft: '10px'
    },
    ':hover': {
        ...field.hover
    },
    ':focus': {
        ...field.focus
    }
});

@observer
class NumberSpinnerInput extends React.Component<NumberSpinnerInputProps>
{
    private static spinnerButtonWidthEM: number = 0.8;

    @autobind
    private onChange(event: React.ChangeEvent<HTMLInputElement>)
    {
        if (event.target.value.length <= this.props.maximumDigits)
        {
            const number = parseInt(event.target.value, 10);
            if (!lodash.isNaN(number))
            {
                this.props.onValueChange(number);
            }
        }
    }

    public render()
    {
        return (
            <input css={inputStyle} onChange={this.onChange} step={1} style={this.style()}
                title={this.props.title} type="number" value={this.props.value} />
        );
    }

    private style(): React.CSSProperties
    {
        if (this.props.maximumDigits)
        {
            return {
                width: `${FormFieldWidthUtility.adjustWidth(
                    this.props.maximumDigits) + NumberSpinnerInput.spinnerButtonWidthEM}em`
            };
        }
        else
        {
            return {};
        }
    }
}

export default NumberSpinnerInput;
