import {css} from '@emotion/core';
import {autobind} from 'core-decorators';
import {colour, font} from 'main/application/ThemeConstants';
import SHIcon from 'main/component/SHIcon';
import React from 'react';

/**
 * Button for closing something, such as a tab
 *
 * @author Larry 11/11/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
interface CloseButtonProps
{
    disabled?: boolean;
    onClose: () => void;
    small?: boolean;
    title?: string;
}

const closeButtonStyle = css({
    backgroundColor: 'inherit',
    border: 'none',
    color: colour.text,
    cursor: 'pointer',
    font: font.chevron,
    fontSize: '12px',
    padding: 0,
    ':active': {
        color: colour.text
    },
    ':focus': {
        outline: 'none'
    },
    ':hover': {
        color: colour.primary2a
    }
});

const closeButtonDisabledStyle = css(closeButtonStyle, {
    color: colour.disabled,
    cursor: 'default',
    ':active': {
        color: colour.disabled
    },
    ':hover': {
        color: colour.disabled
    }
});

const closeButtonSmallStyle = css({
    fontSize: '8px'
});

class CloseButton extends React.Component<CloseButtonProps>
{
    @autobind
    private onClick(event: React.SyntheticEvent)
    {
        this.props.onClose();
        event.stopPropagation();
    }

    public render(): React.ReactNode
    {
        if (this.props.disabled)
        {
            const style = this.props.small
                ? css(closeButtonDisabledStyle, closeButtonSmallStyle)
                : closeButtonDisabledStyle;
            return (
                <button css={style} onClick={() => null} tabIndex={-1}>
                    <SHIcon icon="close" title="" />
                </button>
            );
        }
        else
        {
            const style = this.props.small ? css(closeButtonStyle, closeButtonSmallStyle) : closeButtonStyle;
            const title = (this.props.title === undefined) ? 'Close' : this.props.title;
            return (
                <button css={style} onClick={this.onClick} tabIndex={-1}>
                    <SHIcon icon="close" title={title} />
                </button>
            );
        }
    }
}

export default CloseButton;
