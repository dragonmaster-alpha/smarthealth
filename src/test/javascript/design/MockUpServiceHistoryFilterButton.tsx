import {css} from '@emotion/core';
import {autobind} from 'core-decorators';
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
    onToggle?: (selected) => void;
    program: string;
    selected?: boolean;
    title: string;
}

const filterBaseButtonStyle = css({
    fontSize: '14px',
    border: border(colour.primary2),
    borderRadius: '4px',
    padding: px(4, 4, 2)
});

const filterButtonStyle = css(filterBaseButtonStyle, {
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

const filterSelectedButtonStyle = css(filterBaseButtonStyle, {
    backgroundColor: colour.primary2,
    color: colour.white,
    '&:active': {
        backgroundColor: colour.primary2
    },
    '&:hover': {
        backgroundColor: colour.primary2a
    }
});

class MockUpServiceHistoryFilterButton extends React.Component<MockUpServiceHistoryFilterButtonProps>
{
    @autobind
    private onClick()
    {
        this.props.onToggle && this.props.onToggle(!this.props.selected);
    }

    public render(): React.ReactNode
    {
        return (
            <button css={this.props.selected ? filterSelectedButtonStyle : filterButtonStyle} onClick={this.onClick}
                title={this.props.title}>
                <SHIcon icon={`program-${this.props.program}`} title={this.props.title} />
            </button>
        );
    }
}

export default MockUpServiceHistoryFilterButton;
