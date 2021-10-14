import {css} from '@emotion/core';
import {background, colour} from 'main/application/ThemeConstants';
import SHIcon from 'main/component/SHIcon';
import {border, px} from 'main/utility/StyleUtility';
import React from 'react';

/**
 * Toggle button to filter the service history list
 *
 * @author Larry 23/09/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
interface MockUpServiceHistoryFilterButtonProps
{
    onClick?: () => void;
}

const filterBaseButtonStyle = css({
    fontSize: '12px',
    border: border(colour.primary2),
    borderRadius: '4px',
    padding: px(5, 5, 3)
});

const addButtonStyle = css(filterBaseButtonStyle, {
    backgroundColor: colour.white,
    color: colour.primary2,
    border: border(colour.primary2),
    '&:active': {
        backgroundColor: background.white
    },
    '&:hover': {
        backgroundColor: background.buttonHover,
        border: border(colour.primary2a),
        color: colour.primary2a
    }
});

class MockUpServiceRecordAddButton extends React.Component<MockUpServiceHistoryFilterButtonProps>
{
    public render(): React.ReactNode
    {
        return (
            <button css={addButtonStyle} onClick={() => this.props.onClick()} title="New Service Record">
                <SHIcon icon="add" title="New Service Record" />
            </button>
        );
    }
}

export default MockUpServiceRecordAddButton;
