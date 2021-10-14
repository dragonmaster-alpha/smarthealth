import {css} from '@emotion/core';
import {colour, font} from 'main/application/ThemeConstants';
import {border, px} from 'main/utility/StyleUtility';
import {action, observable} from 'mobx';
import {observer} from 'mobx-react';
import React from 'react';

/**
 * A bar with tabs for the mock up
 *
 * @author Larry 25/09/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
export interface Tab
{
    decoration?: React.ReactNode;
    name: React.ReactNode;
}

interface MockUpTabBarProps
{
    onSelection?: (selectedIndex: number) => void;
    selectedIndex?: number;
    stretch?: boolean;
    tabs: Tab[];
}

const tabBarStyle = css({
    alignItems: 'end',
    display: 'flex',
    font: font.h3,
    '.MockUpTab': {
        color: colour.primary6,
        display: 'inline-block',
        cursor: 'pointer',
        paddingBottom: '12px',
        ':hover': {
            color: colour.primary2a
        },
        '&.selected': {
            borderBottom: border(colour.primary2a, 5),
            color: colour.primary2a,
            paddingBottom: '7px'
        },
        ':not(:first-child)': {
            marginLeft: '16px'
        },
        ':after': {
            backgroundColor: 'red',
            width: '1px'
        }
    }
});

const tabBarStretchStyle = css(tabBarStyle, {
    justifyContent: 'space-between',
    '>span': {
        marginRight: '0'
    }
});

const tabSeparatorStyle = css({
    border: 'none',
    borderLeft: border(colour.tabBorder),
    margin: px(0, 16, 7, 16),
    width: '1px',
    height: '24px'
});

const innerSpanStyle = css({
    color: colour.primary6,
    display: 'inline-block',
    cursor: 'pointer',
    paddingBottom: '12px',
    ':hover': {
        color: colour.primary2a
    }
});

const innerSpanSelectedStyle = css(innerSpanStyle, {
    borderBottom: border(colour.primary2a, 5),
    color: colour.primary2a,
    paddingBottom: '7px'
});

@observer
class MockUpTabBar extends React.Component<MockUpTabBarProps>
{
    @observable
    private selectedIndex: number;

    public componentDidMount()
    {
        this.selectedIndex = this.props.selectedIndex || 0;
    }

    public componentDidUpdate(prevProps)
    {
        if (prevProps.selectedIndex !== this.props.selectedIndex)
        {
            this.onSelection(this.props.selectedIndex || 0);
        }
    }

    @action.bound
    private onSelection(selectedIndex: number)
    {
        this.selectedIndex = selectedIndex;
        this.props.onSelection && this.props.onSelection(selectedIndex);
    }

    public render(): React.ReactNode
    {
        return (
            <nav css={this.props.stretch ? tabBarStretchStyle : tabBarStyle}>
                {this.props.tabs.map((tab, i) => (
                    <>
                        {(i !== 0) && <hr css={tabSeparatorStyle} />}
                        <span css={(this.selectedIndex === i) ? innerSpanSelectedStyle : innerSpanStyle}
                            onClick={() => this.onSelection(i)} key={i}>
                            {tab.name}
                            {tab.decoration && <span style={{ paddingLeft: '8px' }}>{tab.decoration}</span>}
                        </span>
                    </>
                ))}
            </nav>
        );
    }
}

export default MockUpTabBar;
