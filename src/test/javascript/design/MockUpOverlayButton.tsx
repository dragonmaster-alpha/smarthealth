import {css} from '@emotion/core';
import {autobind} from 'core-decorators';
import {colour, font} from 'main/application/ThemeConstants';
import SHIcon from 'main/component/SHIcon';
import React from 'react';

/**
 * Button to show/hode overlay in selection field
 *
 * @author Larry 11/01/2021
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2021
 */
interface MockUpOverlayButtonProps
{
    collapsed?: boolean;
    onToggle?: (collapsed) => void;
}

const overlayButtonStyle = css({
    backgroundColor: 'inherit',
    border: 'none',
    cursor: 'pointer',
    font: font.chevron,
    padding: 0,
    ':active': {
        color: colour.primary2a
    },
    ':hover': {
        color: colour.primary2a
    },
    ':focus': {
        outline: 'none'
    }
});

class MockUpOverlayButton extends React.Component<MockUpOverlayButtonProps>
{
    @autobind
    private onClick()
    {
        this.props.onToggle && this.props.onToggle(!this.props.collapsed);
    }

    public render(): React.ReactNode
    {
        return (
            <button css={overlayButtonStyle} onClick={this.onClick}>
                <SHIcon icon={this.props.collapsed ? 'chevron-down' : 'chevron-up'} />
            </button>
        );
    }
}

export default MockUpOverlayButton;
