import {css} from '@emotion/core';
import {autobind} from 'core-decorators';
import {colour, field} from 'main/application/ThemeConstants';
import SHIcon from 'main/component/SHIcon';
import {border, px} from 'main/utility/StyleUtility';
import React from 'react';

/**
 * An icon button without a border
 *
 * @author Larry 20/01/2021
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2021
 */
interface IconButtonProps
{
    disabled?: boolean;
    icon: string;
    onClick?: () => void;
    toolTip?: string;
}

const buttonBaseStyle = css({
    backgroundColor: 'inherit',
    border: 'none',
    borderRadius: field.borderRadius,
    color: colour.primary2a,
    fontSize: '14px',
    margin: px(-4, 0, -5),
    padding: px(3, 3, 1),
    verticalAlign: '-2px'
});

const buttonStyle = css(buttonBaseStyle, {
    ':hover': {
        border: border(colour.primary2a),
        padding: px(2, 2, 0)
    },
    ':active': {
        border: border(colour.hover),
        color: colour.hover,
        padding: px(2, 2, 0)
    }
});

const buttonStyleDisabled = css(buttonBaseStyle, {
    color: colour.disabled
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
            return (
                <button css={buttonStyleDisabled} disabled={true} title={this.props.toolTip}>
                    <SHIcon icon={this.props.icon} noTitle={!this.props.toolTip} title={this.props.toolTip} />
                </button>
            );
        }
        else
        {
            return (
                <button css={buttonStyle} onClick={this.onClick} title={this.props.toolTip}>
                    <SHIcon icon={this.props.icon} noTitle={!this.props.toolTip} title={this.props.toolTip} />
                </button>
            );
        }
    }
}

export default IconButton;
