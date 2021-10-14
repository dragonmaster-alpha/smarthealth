import {css} from '@emotion/core';
import {autobind} from 'core-decorators';
import lodash from 'lodash';
import {colour, field} from 'main/application/ThemeConstants';
import BaseField from 'main/field/BaseField';
import FormFieldWidthUtility from 'main/utility/FormFieldWidthUtility';
import ShouldNeverGetHereError from 'main/utility/ShouldNeverGetHereError';
import StringUtility from 'main/utility/StringUtility';
import {px} from 'main/utility/StyleUtility';
import {observer} from 'mobx-react';
import React from 'react';
import FormFieldText from 'smarthealth-javascript/FormFieldText';

/**
 * Text form field
 *
 * TODO Larry fix?: if the old value is not null and the new value is null then the field does not update - this is
 * evident in a table when we sort on a string column
 *
 * @author Larry 16/01/2019
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2019
 */
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
        padding: px(0, 7),
        ':focus': {
            ...field.focus
        }
    },
    textarea: {
        border: field.border,
        borderRadius: field.borderRadius,
        color: 'inherit',
        font: 'inherit',
        padding: px(0, 7),
        width: '100%',
        ':focus': {
            ...field.focus
        }
    },
    ':hover': {
        input: {
            ...field.hover,
            ':focus': {
                ...field.focus
            }
        },
        textarea: {
            ...field.hover,
            ':focus': {
                ...field.focus
            }
        }
    }
});

const textFieldReadOnlyStyle = css(textFieldEditStyle, {
    ':hover': {
        input: {
            border: field.border
        },
        textarea: {
            border: field.border
        }
    }
});

const textFieldInvalidStyle = css(textFieldEditStyle, {
    input: {
        borderColor: colour.error,
        ':focus': {
            ...field.focusInvalid
        }
    },
    textarea: {
        borderColor: colour.error,
        ':focus': {
            ...field.focusInvalid
        }
    },
    ':hover': {
        input: {
            ...field.hoverInvalid,
            ':focus': {
                ...field.focusInvalid
            }
        },
        textarea: {
            ...field.hoverInvalid,
            ':focus': {
                ...field.focusInvalid
            }
        }
    }
});

const textFieldViewStyle = css(textFieldStyle, {
    display: 'inline-block',
    verticalAlign: 'middle',
    padding: px(field.viewPaddingHeightPx, 8)
});

@observer
class TextField extends BaseField<FormFieldText>
{
    private fieldWidthStyles(): React.CSSProperties
    {
        return { width: '100%', maxWidth: this.maxWidth() };
    }

    protected getValidationText(): string
    {
        return this.field.minimumLength ? `Minimum length ${this.field.minimumLength}` : null;
    }

    private isMultiline(): boolean
    {
        const { layoutMultiline } = this.field;
        if (lodash.isNil(layoutMultiline))
        {
            return this.field.size > 100;
        }
        else if (!layoutMultiline)
        {
            return false;
        }
        else if (layoutMultiline || (this.field.size > 100))
        {
            return true;
        }
        else
        {
            throw new ShouldNeverGetHereError();
        }
    }

    private maxWidth(): string
    {
        if (this.field.layout && this.field.layout.fillWidth)
        {
            return 'none';
        }
        else
        {
            return FormFieldWidthUtility.widthEM(this.field, this.fieldState);
        }
    }

    @autobind
    private onChange(event: React.ChangeEvent<HTMLInputElement>)
    {
        this.props.onFieldChange(event.target.value, this.field);
    }

    @autobind
    private onInput(event: React.FormEvent<HTMLTextAreaElement>)
    {
        this.props.onFieldChange(event.currentTarget.value, this.field);
    }

    protected renderEditing()
    {
        const style = this.readOnly ? textFieldReadOnlyStyle : this.valid ? textFieldEditStyle : textFieldInvalidStyle;
        if (this.isMultiline())
        {
            return (
                <span css={style}>
                    <textarea disabled={this.readOnly} maxLength={this.field.size} onInput={this.onInput}
                        placeholder={this.placeholder} rows={this.rows()} title={this.toolTip}
                        value={this.props.value} />
                </span>
            );
        }
        else
        {
            return (
                <span css={style}>
                    <input disabled={this.readOnly} maxLength={this.field.size} onChange={this.onChange}
                        placeholder={this.placeholder} style={this.fieldWidthStyles()} title={this.toolTip} type="text"
                        value={this.props.value} />
                    {this.renderUnits()}
                </span>
            );
        }
    }

    protected renderView()
    {
        const value = this.props.value;
        if (this.field.abbreviate && value && (value.length > this.field.size))
        {
            const abbrev = StringUtility.abbreviate(value, this.field.size);
            return (
                <span css={textFieldViewStyle} title={value}>
                    {abbrev}
                    {this.renderUnits()}
                </span>
            );
        }
        else
        {
            return super.renderView();
        }
    }

    private rows(): number
    {
        if (this.field.size > 1000)
        {
            return 6;
        }
        else if (this.field.size > 500)
        {
            return 4;
        }
        else
        {
            return 2;
        }
    }
}

export default TextField;
