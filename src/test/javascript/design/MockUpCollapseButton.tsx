import {css} from '@emotion/core';
import {autobind} from 'core-decorators';
import {colour, font} from 'main/application/ThemeConstants';
import SHIcon from 'main/component/SHIcon';
import React from 'react';

/**
 * Button used in sidebar
 *
 * @author Larry 23/09/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
interface MockUpCollapseButtonProps
{
    collapsed?: boolean;
    onToggle?: (collapsed) => void;
}

const collapseButtonStyle = css({
    color: colour.navigation,
    float: 'right',
    font: font.chevron,
    backgroundColor: 'inherit',
    border: 'none',
    outline: 'none',
    padding: 0,
    '&:hover': {
        color: colour.white
    }
});

class MockUpCollapseButton extends React.Component<MockUpCollapseButtonProps>
{
    @autobind
    private onClick()
    {
        this.props.onToggle && this.props.onToggle(!this.props.collapsed);
    }

    public render(): React.ReactNode
    {
        return (
            <button css={collapseButtonStyle} onClick={this.onClick}>
                <SHIcon icon={this.props.collapsed ? 'chevron-down' : 'chevron-up'} />
            </button>
        );
    }
}

export default MockUpCollapseButton;
