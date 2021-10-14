import {css} from '@emotion/core';
import ErrorBoundary from 'main/component/ErrorBoundary';
import TabBar from 'main/component/TabBar';
import {action, observable} from 'mobx';
import {observer} from 'mobx-react';
import React from 'react';

/**
 * A tab bar and the content of the tabs. The contents of all the tabs are loaded so that their state is kept.
 *
 * @author Larry 10/11/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
export interface Tab
{
    content: React.ReactNode;
    decoration?: React.ReactNode;
    title: string | React.ReactNode;
    toolTip?: string;
}

interface TabPaneProps
{
    onSelection?: (selectedIndex: number) => void;
    selectedIndex?: number;
    small?: boolean;
    stretch?: boolean;
    tabBarPadding?: string;
    tabs: Tab[];
}

const tabPaneStyle = css({
    display: 'grid',
    gridTemplateColumns: '1fr',
    gridTemplateRows: 'auto 1fr'
});

const tabContentStyle = css({
    display: 'grid',
    gridTemplateColumns: '1fr',
    gridTemplateRows: '1fr'
});

const tabContentHiddenStyle = css({
    display: 'none'
});

@observer
class TabPane extends React.Component<TabPaneProps>
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
            <div css={tabPaneStyle}>
                <TabBar tabs={this.props.tabs} selectedIndex={this.selectedIndex} onSelection={this.onSelection}
                    tabBarPadding={this.props.tabBarPadding} small={this.props.small} />
                {this.props.tabs.map((tab, index) => (
                    <div css={(this.selectedIndex === index) ? tabContentStyle : tabContentHiddenStyle}>
                        <ErrorBoundary>
                            {tab.content}
                        </ErrorBoundary>
                    </div>
                ))}
            </div>
        );
    }
}

export default TabPane;
