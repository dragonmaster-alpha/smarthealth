import {css} from '@emotion/core';
import lodash from 'lodash';
import {colour, field} from 'main/application/ThemeConstants';
import {px} from 'main/utility/StyleUtility';
import {action, observable} from 'mobx';
import {observer} from 'mobx-react';
import React from 'react';
import FormFieldNumber from 'smarthealth-javascript/FormFieldNumber';

/**
 * Number field for mockup
 *
 * @author Larry 13/10/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
interface MockUpNumberFieldProps
{
    editing: boolean;
    field?: FormFieldNumber;
    invalid?: boolean;
    mandatory?: boolean;
    value: string;
}

const numberFieldStyle = css({
    height: px(field.heightPx)
});

const numberFieldEditStyle = css(numberFieldStyle, {
    input: {
        border: field.border,
        borderRadius: field.borderRadius,
        color: colour.text,
        font: 'inherit',
        height: px(field.heightPx - field.marginHeightPx * 2),
        margin: px(field.marginHeightPx, 0),
        padding: '0 7px',
        ':focus': {
            ...field.focus
        },
        '.invalid': {
            borderColour: colour.error
        }
    }
});

const numberFieldViewStyle = css(numberFieldStyle, {
    display: 'inline-block',
    lineHeight: px(field.heightPx),
    padding: '0 8px'
});

@observer
class MockUpNumberField extends React.Component<MockUpNumberFieldProps>
{
    @observable
    private value: string;

    public componentDidMount()
    {
        this.value = this.props.value;
    }

    @action.bound
    private onChange(event: React.ChangeEvent<HTMLInputElement>)
    {
        this.value = event.target.value;
    }

    public render()
    {
        const units = this.props.field && this.props.field.units;
        if (this.props.editing)
        {
            return (
                <span css={numberFieldEditStyle}>
                    <input type="text" onChange={this.onChange} value={this.value}
                        placeholder={this.props.mandatory ? 'Required' : null} style={{ width: '90px' }} />
                    {units && <span>&nbsp;{units}</span>}
                </span>
            );
        }
        else if (lodash.isNil(this.props.value))
        {
            return <span css={numberFieldViewStyle}>-</span>;
        }
        else
        {
            return (
                <span css={numberFieldViewStyle}>
                    <span>{this.props.value}</span>
                    {units && <span>&nbsp;{units}</span>}
                </span>
            );
        }
    }
}

export default MockUpNumberField;
