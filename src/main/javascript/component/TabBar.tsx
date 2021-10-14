import {css} from '@emotion/core';
import {colour, font} from 'main/application/ThemeConstants';
import {Tab} from 'main/container/TabPane';
import {border, px} from 'main/utility/StyleUtility';
import {action, observable} from 'mobx';
import {observer} from 'mobx-react';
import React from 'react';

/**
 * A bar that displays multiple tabs with optional decorations and allows selection of one tab.
 *
 * @author Larry 10/11/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
interface TabBarProps
{
    onSelection?: (selectedIndex: number) => void;
    selectedIndex?: number;
    small?: boolean;
    tabBarPadding?: string;
    tabs: Tab[];
}

const tabBarStyle = css({
    alignItems: 'end',
    display: 'flex',
    font: font.h3
});

const tabBarSmallStyle = css(tabBarStyle, {
    font: font.label
});

const tabStyle = css({
    color: colour.primary6,
    display: 'inline-block',
    cursor: 'pointer',
    paddingBottom: '12px',
    ':hover': {
        color: colour.primary2a
    }
});

const tabSelectedStyle = css(tabStyle, {
    borderBottom: border(colour.primary2a, 5),
    color: colour.primary2a,
    paddingBottom: '7px'
});

const tabDecorationStyle = css({
    paddingLeft: '8px'
});

const tabSeparatorStyle = css({
    border: 'none',
    borderLeft: border(colour.tabBorder),
    margin: px(0, 16, 7, 16),
    width: '1px',
    height: '24px'
});

@observer
class TabBar extends React.Component<TabBarProps>
{
    @observable
    private selectedIndex: number;

    @action
    public componentDidMount()
    {
        this.selectedIndex = this.props.selectedIndex || 0;
    }

    @action
    public componentDidUpdate(prevProps)
    {
        if (prevProps.selectedIndex !== this.props.selectedIndex)
        {
            this.selectedIndex = this.props.selectedIndex || 0;
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
            <div css={this.props.small ? tabBarSmallStyle : tabBarStyle} style={{ padding: this.props.tabBarPadding }}>
                {this.props.tabs.map((tab, index) => (
                    <>
                        {(index !== 0) && <hr css={tabSeparatorStyle} />}
                        <span css={(this.selectedIndex === index) ? tabSelectedStyle : tabStyle}
                            onClick={() => this.onSelection(index)} key={index} title={tab.toolTip}>
                            {tab.title}
                            {tab.decoration && <span css={tabDecorationStyle}>{tab.decoration}</span>}
                    </span>
                    </>
                ))}
            </div>
        );
    }
}

export default TabBar;
