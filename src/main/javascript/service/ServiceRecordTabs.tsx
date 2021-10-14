import {css} from '@emotion/core';
import {autobind} from 'core-decorators';
import CloseButton from 'main/component/CloseButton';
import ErrorBoundary from 'main/component/ErrorBoundary';
import TabPane, {Tab} from 'main/container/TabPane';
import ServiceRecordEntityPanel from 'main/service/ServiceRecordEntityPanel';
import {ServiceTab} from 'main/store/ServiceRecordTabStore';
import StoreProps from 'main/store/StoreProps';
import {px} from 'main/utility/StyleUtility';
import {computed} from 'mobx';
import {inject, observer} from 'mobx-react';
import * as React from 'react';
import ServiceSummary from 'smarthealth-javascript/ServiceSummary';

/**
 * Tabs containing the service records
 *
 * TODO close button on tabs
 *
 * @author Larry 25/01/2019
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2019
 */
const serviceRecordTabsStyle = css({
    display: 'grid',
    gridTemplateColumns: '1fr',
    gridTemplateRows: '1fr',
    padding: px(0, 32)
});

@inject('componentStore')
@observer
class ServiceRecordTabs extends React.Component<StoreProps>
{
    @computed
    private get tabs(): Tab[]
    {
        const tabStore = this.props.componentStore.serviceRecordTabStore;

        const tabs = [];
        tabStore.visibleSummaries.forEach(summary =>
        {
            const tab: Tab = { title: summary.title, content: <ErrorBoundary>{summary.render()}</ErrorBoundary> };
            tabs.push(tab);
        });
        tabStore.services.forEach(serviceTab =>
        {
            const tab: Tab = {
                title: serviceTab.title,
                decoration: <CloseButton onClose={() => this.onClose(serviceTab)} />,
                toolTip: serviceTab.serviceDate,
                content: (
                    <ErrorBoundary>
                        <ServiceRecordEntityPanel serviceTab={serviceTab} closeServiceTab={this.closeServiceTab}
                            openServiceTab={this.openServiceTab} />
                    </ErrorBoundary>
                )
            };
            tabs.push(tab);
        });
        return tabs;
    }

    @autobind
    private closeServiceTab(serviceID: number): void
    {
        this.props.componentStore.serviceRecordTabStore.closeService(serviceID);
    }

    @autobind
    private onClose(serviceTab: ServiceTab)
    {
        this.props.componentStore.serviceRecordTabStore.closeService(serviceTab.serviceSummary.serviceID);
    }

    @autobind
    // @ts-ignore
    private openServiceTab(serviceSummary: ServiceSummary): void
    {
        this.props.componentStore.serviceRecordTabStore.showExistingService(serviceSummary);
    }

    public render(): React.ReactNode
    {
        const tabStore = this.props.componentStore.serviceRecordTabStore;

        return (
            <div css={serviceRecordTabsStyle}>
                <TabPane tabs={this.tabs} selectedIndex={tabStore.selectedIndex} onSelection={tabStore.onSelection} />
            </div>
        );
    }
}

export default ServiceRecordTabs;
