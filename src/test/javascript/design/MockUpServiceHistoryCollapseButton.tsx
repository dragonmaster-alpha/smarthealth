import {css} from '@emotion/core';
import {autobind} from 'core-decorators';
import {colour, font} from 'main/application/ThemeConstants';
import SHIcon from 'main/component/SHIcon';
import {border, px} from 'main/utility/StyleUtility';
import React from 'react';

/**
 * Button to collapse the service record history
 *
 * @author Larry 19/11/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
interface MockUpServiceHistoryCollapseButtonProps
{
    collapsed?: boolean;
    onToggle?: (collapsed) => void;
}

const collapseButtonStyle = css({
    backgroundColor: colour.primary2,
    color: colour.white,
    font: font.doubleChevron,
    border: border(colour.primary2),
    borderRadius: '2px',
    padding: px(4, 12, 2),
    '&:active': {
        backgroundColor: colour.primary2
    },
    '&:hover': {
        backgroundColor: colour.primary2a
    }
});

class MockUpServiceHistoryCollapseButton extends React.Component<MockUpServiceHistoryCollapseButtonProps>
{
    @autobind
    private onClick()
    {
        this.props.onToggle && this.props.onToggle(!this.props.collapsed);
    }

    public render(): React.ReactNode
    {
        const title = this.props.collapsed ? 'Show Service Record History' : 'Hide Service Record History';
        return (
            <button css={collapseButtonStyle} onClick={this.onClick} title={title}>
                <SHIcon icon={this.props.collapsed ? 'double-chevron-down' : 'double-chevron-up'} title={title} />
            </button>
        );
    }
}

export default MockUpServiceHistoryCollapseButton;
