import {css} from '@emotion/core';
import {autobind} from 'core-decorators';
import lodash from 'lodash';
import {background, colour, field, font} from 'main/application/ThemeConstants';
import SHIcon from 'main/component/SHIcon';
import BaseField from 'main/field/BaseField';
import {border, px} from 'main/utility/StyleUtility';
import {observer} from 'mobx-react';
import React from 'react';
import FormFieldBoolean from 'smarthealth-javascript/FormFieldBoolean';

/**
 * Boolean form field
 *
 * @author Larry 21/12/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
const booleanFieldStyle = css({
    color: colour.text,
    font: font.text
});

const booleanFieldEditBaseStyle = css(booleanFieldStyle, {
    display: 'flex',
    margin: px(field.marginHeightPx, 0),
    padding: px(0, field.viewPaddingWidthPx),
    ':focus': {
        border: 'none',
        outline: 'none'
    },
    '>div:first-of-type': {
        backgroundColor: background.white,
        border: field.border,
        borderRadius: field.borderRadius,
        fontSize: '10px',
        marginRight: '4px',
        padding: px(6, 0),
        height: '24px',
        width: '24px',
        textAlign: 'center'
    },
    '>div:last-of-type': {
        padding: px(field.paddingHeightPx + field.borderPx + 1, 0)
    }
});

const booleanFieldEditStyle = css(booleanFieldEditBaseStyle, {
    cursor: 'pointer',
    ':hover': {
        '>div:first-of-type': {
            ...field.hover
        }
    },
    ':focus': {
        '>div:first-of-type': {
            ...field.focus
        }
    }
});

const booleanFieldReadOnlyStyle = css(booleanFieldEditBaseStyle, {
    '>div:first-of-type': {
        backgroundColor: background.disabled,
        border: border(background.disabled)
    }
});

const booleanFieldInvalidStyle = css(booleanFieldEditBaseStyle, {
    cursor: 'pointer',
    '>div:first-of-type': {
        borderColor: colour.error
    },
    ':hover': {
        '>div:first-of-type': {
            ...field.hoverInvalid
        }
    },
    ':focus': {
        '>div:first-of-type': {
            ...field.focusInvalid
        }
    }
});

const booleanFieldViewStyle = css(booleanFieldStyle, {
    padding: px(field.viewPaddingHeightPx, field.viewPaddingWidthPx)
});

const placeholderStyle = css({
    color: colour.placeholder
});

@observer
class BooleanField extends BaseField<FormFieldBoolean, boolean>
{
    @autobind
    private onClick()
    {
        if (this.readOnly)
        {
            // ignore the click
        }
        // tslint:disable-next-line:no-boolean-literal-compare
        else if (this.props.value === true)
        {
            this.onValueChange(false);
        }
        else if (this.props.value === false)
        {
            this.onValueChange(this.mandatory ? true : null);
        }
        else
        {
            this.onValueChange(true);
        }
    }

    private renderEditValue()
    {
        if (lodash.isNil(this.props.value) && this.mandatory)
        {
            return <span css={placeholderStyle}>{this.placeholder}</span>;
        }
        else
        {
            return this.renderValue();
        }
    }

    protected renderEditing()
    {
        const style = this.readOnly ? booleanFieldReadOnlyStyle
            : this.valid ? booleanFieldEditStyle : booleanFieldInvalidStyle;
        return (
            <div css={style} tabIndex={this.readOnly ? -1 : 0} title={this.toolTip}>
                <div onClick={this.onClick}>{this.renderIcon()}</div>
                <div>{this.renderEditValue()}</div>
            </div>
        );
    }

    private renderIcon(): React.ReactNode
    {
        // tslint:disable-next-line:no-boolean-literal-compare
        if (this.props.value === true)
        {
            return <SHIcon icon="tick" noTitle={true} />;
        }
        else if (this.props.value === false)
        {
            return <SHIcon icon="cross" noTitle={true} />;
        }
        else
        {
            return '';
        }
    }

    protected renderValue()
    {
        // tslint:disable-next-line:no-boolean-literal-compare
        if (this.props.value === true)
        {
            return this.field.trueDisplayText || 'Yes';
        }
        else if (this.props.value === false)
        {
            return this.field.falseDisplayText || 'No';
        }
        else
        {
            return '';
        }
    }

    protected renderView(): React.ReactNode
    {
        return <div css={booleanFieldViewStyle}>{lodash.isNil(this.props.value) ? '-' : this.renderValue()}</div>;
    }
}

export default BooleanField;
