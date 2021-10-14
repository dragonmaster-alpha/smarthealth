import {css} from '@emotion/core';
import {autobind} from 'core-decorators';
import {background, colour, font} from 'main/application/ThemeConstants';
import {border, px} from 'main/utility/StyleUtility';
import React from 'react';

/**
 * Standard button
 *
 * @author Larry 25/09/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
interface ButtonProps
{
    disabled?: boolean;
    key?: string;
    onClick?: () => void;
    primary?: boolean;
    small?: boolean;
    title: string;
    tooltip?: string;
}

const buttonStyle = css({
    borderRadius: '4px',
    cursor: 'pointer',
    font: font.button,
    padding: px(8, 16),
    transition: '0.1s'
});

const buttonSmallStyle = css(buttonStyle, {
    font: font.buttonSmall,
    padding: px(4, 8)
});

const buttonStylePrimary = css({
    backgroundColor: colour.primary2,
    color: colour.white,
    border: border(colour.primary2),
    ':hover': {
        backgroundColor: colour.primary2a
    },
    ':active': {
        backgroundColor: colour.primary2
    }
});

const buttonStyleSecondary = css({
    backgroundColor: background.white,
    border: border(colour.primary2),
    color: colour.primary2,
    ':hover': {
        backgroundColor: background.buttonHover,
        border: border(colour.primary2a),
        color: colour.primary2a
    },
    ':active': {
        backgroundColor: background.white
    }
});

const buttonStyleDisabled = css({
    backgroundColor: background.white,
    border: border(colour.disabled),
    color: colour.disabled,
    cursor: 'default'
});

class Button extends React.Component<ButtonProps>
{
    @autobind
    private onClick()
    {
        this.props.onClick && this.props.onClick();
    }

    public render(): React.ReactNode
    {
        if (this.props.disabled)
        {
            return (
                <button css={css(this.props.small ? buttonSmallStyle : buttonStyle,
                    buttonStyleDisabled)}
                    key={this.props.key || this.props.title}
                    disabled={true}>
                    {this.props.title}
                </button>
            );
        }
        else
        {
            return (
                <button css={css(this.props.small ? buttonSmallStyle : buttonStyle,
                    this.props.primary ? buttonStylePrimary : buttonStyleSecondary)}
                    key={this.props.key || this.props.title}
                    title={this.props.tooltip}
                    onClick={this.onClick}>
                    {this.props.title}
                </button>
            );
        }
    }
}

export default Button;
