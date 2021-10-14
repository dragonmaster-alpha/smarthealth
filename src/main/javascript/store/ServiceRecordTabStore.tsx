import AppStore from 'main/store/AppStore';
import ServiceTypeFormatter from 'main/utility/ServiceTypeFormatter';
import {action, autorun, computed, observable, runInAction} from 'mobx';
import React from 'react';
import ServiceRecord from 'smarthealth-javascript/ServiceRecord';
import ServiceSummary from 'smarthealth-javascript/ServiceSummary';
import ServiceType from 'smarthealth-javascript/ServiceType';

/**
 * A store to manage tabStore for service records
 *
 * @author Thompson 31/01/2019
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2019
 */
export interface ServiceTab
{
    isNew?: boolean;
    key: string | number;
    serviceDate: string;
    serviceRecord?: ServiceRecord;
    serviceSummary: ServiceSummary;
    title: string;
}

export interface SummaryTab
{
    key: string;
    render: () => React.ReactNode;
    title: string;
    visible: boolean;
}

class ServiceRecordTabStore
{
    private readonly appStore: AppStore;

    @observable
    private selectedServiceKey: string | number;

    @observable
    private selectedSummaryKey: string;

    private serviceActionDisposer: () => void;

    @observable
    public services: ServiceTab[] = [];

    @observable
    private summaries: SummaryTab[] = [];

    constructor(appStore: AppStore)
    {
        this.appStore = appStore;
        this.serviceActionDisposer = this.createOpenServiceAutoRun();
    }

    // index of the selection in ServiceRecordTabs which is all visible summaries then all services
    @computed
    public get selectedIndex(): number
    {
        if (this.selectedSummaryKey)
        {
            const index = this.visibleSummaries.findIndex(summary => summary.key === this.selectedSummaryKey);
            if (index >= 0)
            {
                return index;
            }
        }

        if (this.selectedServiceKey)
        {
            const index = this.services.findIndex(service => service.key === this.selectedServiceKey);
            if (index >= 0)
            {
                return this.visibleSummaries.length + index;
            }
        }

        return 0;
    }

    @computed
    public get tabCount(): number
    {
        return this.visibleSummaries.length + this.services.length;
    }

    @computed
    public get visibleSummaries(): SummaryTab[]
    {
        return this.summaries.filter(summaryTab => summaryTab.visible);
    }

    @action
    public addSummary(summaryTab: SummaryTab)
    {
        this.summaries.push(summaryTab);
    }

    public close()
    {
        this.serviceActionDisposer();
    }

    @action
    public closeAllSummaries()
    {
        this.summaries = [];
    }

    @action
    public closePatient()
    {
        this.summaries = [];
        this.services = [];
    }

    @action
    public closeService(serviceID: number)
    {
        const serviceToCloseIndex = this.services.findIndex((service) =>
            (service.serviceSummary.serviceID === serviceID));
        if (serviceToCloseIndex >= 0)
        {
            this.services.splice(serviceToCloseIndex, 1);

            this.updateSelectedTabAfterServiceClosed(serviceToCloseIndex);
        }
    }

    // TODO this method does not belong here - find where to put it
    private createOpenServiceAutoRun(): () => void
    {
        const disposer = autorun(async () =>
        {
            const { serviceToOpenInTabStore } = this.appStore.componentStore;
            if (!serviceToOpenInTabStore)
            {
                return;
            }

            if (serviceToOpenInTabStore.serviceSummary && serviceToOpenInTabStore.serviceRecord)
            {
                await this.showNewService(serviceToOpenInTabStore.serviceSummary,
                    serviceToOpenInTabStore.serviceRecord);
            }
            else if (serviceToOpenInTabStore.serviceSummary)
            {
                await this.showExistingService(serviceToOpenInTabStore.serviceSummary);
            }
        });
        return disposer;
    }

    @action.bound
    public onSelection(selectedIndex: number)
    {
        this.setSelectedTabIndex(selectedIndex);
    }

    @action.bound
    public onTabChange(event: { originalEvent: Event, index: number })
    {
        this.setSelectedTabIndex(event.index);
    }

    @action
    public selectFirstTab()
    {
        this.setSelectedTabIndex(0);
    }

    private setSelectedTabIndex(tabIndex: number)
    {
        if (tabIndex < this.visibleSummaries.length)
        {
            this.selectedServiceKey = null;
            this.selectedSummaryKey = this.visibleSummaries[tabIndex].key;
        }
        else
        {
            const serviceIndex = tabIndex - this.visibleSummaries.length;
            if (serviceIndex < this.services.length)
            {
                this.selectedServiceKey = this.services[serviceIndex].key;
                this.selectedSummaryKey = null;
            }
            else
            {
                this.selectedServiceKey = null;
                this.selectedSummaryKey = null;
            }
        }
    }

    @action
    public async showExistingService(serviceSummary: ServiceSummary)
    {
        const index = this.services.findIndex(
            (service) => (service.serviceSummary.serviceID === serviceSummary.serviceID));
        if (index >= 0)
        {
            // service was already opened
            this.selectedServiceKey = this.services[index].key;
            this.selectedSummaryKey = null;
            return;
        }

        const serviceDate = this.appStore.i18nStore.formatEventDateTime(serviceSummary.serviceDate);

        const serviceType: ServiceType = await this.appStore.entityCache.serviceTypes.load(serviceSummary.serviceType);
        const serviceTypeText = ServiceTypeFormatter.formatName(serviceType, serviceSummary.program);

        const tab: ServiceTab = {
            serviceSummary,
            serviceDate,
            key: `s-${serviceSummary.serviceID}`,
            title: `${serviceTypeText}`
        };

        runInAction(() =>
        {
            this.services.push(tab);
            this.selectedServiceKey = tab.key;
            this.selectedSummaryKey = null;
        });
    }

    public async showNewService(serviceSummary: ServiceSummary, serviceRecord: ServiceRecord)
    {
        const serviceDate = this.appStore.i18nStore.formatEventDateTime(serviceSummary.serviceDate);

        const serviceType: ServiceType = await this.appStore.entityCache.serviceTypes.load(serviceSummary.serviceType);
        const serviceTypeText = ServiceTypeFormatter.formatName(serviceType, serviceSummary.program);

        const tab: ServiceTab = {
            serviceRecord,
            serviceSummary,
            serviceDate: 'new',
            key: `n-${Date.now()}`,
            title: `${serviceTypeText} ${serviceDate}`,
            isNew: true
        };

        runInAction(() =>
        {
            this.services.push(tab);
            this.selectedServiceKey = tab.key;
            this.selectedSummaryKey = null;
        });
    }

    @action
    private updateSelectedTabAfterServiceClosed(serviceClosedIndex: number)
    {
        const serviceClosedTabIndex = this.summaries.length + serviceClosedIndex;

        const lastTabIndex = (this.summaries.length + this.services.length) - 1;
        if (lastTabIndex === -1)
        {
            this.setSelectedTabIndex(0);
        }
        else if (serviceClosedTabIndex >= lastTabIndex)
        {
            this.setSelectedTabIndex(lastTabIndex);
        }
        else
        {
            this.setSelectedTabIndex(serviceClosedTabIndex);
        }
    }
}

export default ServiceRecordTabStore;
