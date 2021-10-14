import {css} from '@emotion/core';
import {autobind} from 'core-decorators';
import {background, colour} from 'main/application/ThemeConstants';
import SHIcon from 'main/component/SHIcon';
import {border, px} from 'main/utility/StyleUtility';
import React from 'react';

/**
 * Standard button
 *
 * @author Larry 25/09/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
interface IconButtonProps
{
    disabled?: boolean;
    icon: string;
    key?: string;
    onClick?: () => void;
    primary?: boolean;
    small?: boolean;
    toolTip?: string;
}

const buttonStyle = css({
    fontSize: '14px',
    border: border(colour.primary2),
    borderRadius: '4px',
    padding: px(4, 4, 2),
    transition: '0.1s'
});

const buttonStylePrimary = css(buttonStyle, {
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

const buttonStyleSecondary = css(buttonStyle, {
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

const buttonStyleDisabled = css(buttonStyle, {
    backgroundColor: background.white,
    border: border(colour.disabled),
    color: colour.disabled
});

const smallButtonStyle = css({
    fontSize: '10px',
    padding: px(2, 2, 1)
});

class IconButton extends React.Component<IconButtonProps>
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
            const style = [
                buttonStyleDisabled,
                this.props.small ? smallButtonStyle : null
            ];
            return (
                <button css={style} key={this.props.key || this.props.icon} disabled={true} title={this.props.toolTip}>
                    <SHIcon icon={this.props.icon} noTitle={!this.props.toolTip} title={this.props.toolTip} />
                </button>
            );
        }
        else
        {
            const style = [
                this.props.primary ? buttonStylePrimary : buttonStyleSecondary,
                this.props.small ? smallButtonStyle : null
            ];
            return (
                <button css={style} key={this.props.key || this.props.icon} onClick={this.onClick}
                    title={this.props.toolTip}>
                    <SHIcon icon={this.props.icon} noTitle={!this.props.toolTip} title={this.props.toolTip} />
                </button>
            );
        }
    }
}

export default IconButton;
