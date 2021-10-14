import {css} from '@emotion/core';
import lodash from 'lodash';
import {colour, field} from 'main/application/ThemeConstants';
import {px} from 'main/utility/StyleUtility';
import {action, observable} from 'mobx';
import {observer} from 'mobx-react';
import React from 'react';
import FormFieldText from 'smarthealth-javascript/FormFieldText';

/**
 * Text field with Edit and View mode.
 *
 * @author Thompson 1/10/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
interface MockUpTextFieldProps
{
    editing: boolean;
    field?: FormFieldText;
    invalid?: boolean;
    mandatory?: boolean;
    size?: TextFieldSize;
    value: string;
}

export enum TextFieldSize
{
    small,
    medium,
    large
}

const textFieldStyle = css({
    color: colour.text
});

const textFieldEditStyle = css(textFieldStyle, {
    input: {
        border: field.border,
        borderRadius: field.borderRadius,
        color: 'inherit',
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
    },
    textarea: {
        border: field.border,
        borderRadius: field.borderRadius,
        color: 'inherit',
        font: 'inherit',
        padding: '0 7px',
        width: '100%',
        ':focus': {
            ...field.focus
        },
        '.invalid': {
            borderColour: colour.error
        }
    }
});

const textFieldViewStyle = css(textFieldStyle, {
    display: 'inline-block',
    verticalAlign: 'middle',
    padding: px(field.viewPaddingHeightPx, 8)
});

@observer
class MockUpTextField extends React.Component<MockUpTextFieldProps>
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
            const multiline = this.props.field &&
                (lodash.isNil(this.props.field.layoutMultiline) ?
                    this.props.field.size > 100 :
                    this.props.field.layoutMultiline);
            if (multiline)
            {
                return (
                    <span css={textFieldEditStyle}>
                        <textarea placeholder={this.props.mandatory ? 'Required' : null} rows={this.rows()}>
                            {this.value}
                        </textarea>
                        {units && <span>{units}</span>}
                    </span>
                );
            }
            else
            {
                return (
                    <span css={textFieldEditStyle}>
                        <input type="text" value={this.value} placeholder={this.props.mandatory ? 'Required' : null}
                            style={{ width: this.width() }} onChange={this.onChange} />
                        {units && <span>{units}</span>}
                    </span>
                );
            }
        }
        else
        {
            return (
                <span css={textFieldViewStyle}>
                    <span>{this.props.value || '-'}</span>
                    {this.props.value && units && <span>{units}</span>}
                </span>
            );
        }
    }

    private rows(): number
    {
        const { field } = this.props;
        if (field.size > 1000)
        {
            return 6;
        }
        else if (field.size > 500)
        {
            return 4;
        }
        else
        {
            return 2;
        }
    }

    private width(): string
    {
        const { field } = this.props;
        if (!field)
        {
            if (this.props.size === TextFieldSize.small)
            {
                return '90px';
            }
            else if (this.props.size === TextFieldSize.large)
            {
                return '294px';
            }
            else // if (this.props.size === TextFieldSize.medium)
            {
                return '180px';
            }
        }
        else if (field.layout && field.layout.fillWidth)
        {
            return '100%';
        }
        else if (field.size >= 100)
        {
            return '100%';
        }
        else
        {
            return `${field.size}em`;
        }
    }
}

export default MockUpTextField;
