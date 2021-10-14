import {autobind} from 'core-decorators';
import sort from 'fast-sort';
import AppStore from 'main/store/AppStore';
import DateUtility from 'main/utility/DateUtility';
import TableFilterUtility, {TableFiltersMetadata} from 'main/utility/TableFilterUtility';
import WaitModalComponent from 'main/wait/WaitModalComponent';
import {action, observable, runInAction, toJS} from 'mobx';
import React from 'react';
import PagedResults from 'smarthealth-javascript/PagedResults';
import Program from 'smarthealth-javascript/Program';
import ServiceSummary from 'smarthealth-javascript/ServiceSummary';

/**
 * Manage Service Record List for ServiceRecordList.tsx
 *
 * @author Thompson 4/12/2019
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2019
 */
const CHUNK_SIZE = 100;

class ServiceRecordListStore
{
    private static toString(value)
    {
        if (!value)
        {
            // if no value then use empty string for sort comparison
            return '';
        }
        else if (DateUtility.isEventDateTime(value))
        {
            return value.iso;
        }
        else
        {
            // ignore case sensitive e.g. ignore capital letter always being first
            return value.toLowerCase();
        }
    }

    private readonly appStore: AppStore;

    private filteredItems: ServiceSummary[] = null;

    @observable
    public filteredLength: number;

    @observable
    public filtersMetadata: TableFiltersMetadata;

    @observable
    public loading: boolean;

    private originalItems: ServiceSummary[] = null;

    @observable
    public sortField: string;

    @observable
    public sortOrder: number;

    @observable
    public sortedItems: ServiceSummary[];

    @observable
    public totalRecords: number;

    constructor(appStore)
    {
        this.appStore = appStore;
    }

    @autobind
    public buildServiceDateYearOptions(): any[]
    {
        const years = {};
        this.originalItems && this.originalItems.forEach(item =>
        {
            const year = item.serviceDate.iso.split('-')[0];
            if (!years[year])
            {
                years[year] = true;
            }
        });

        const options = Object.keys(years)
            .map(year => ({ label: year, value: year }));
        options.unshift({ label: 'All Dates', value: null });

        return options;
    }

    public clear()
    {
        this.filteredItems = null;
        this.filteredLength = null;
        this.filtersMetadata = null;
        this.originalItems = null;
        this.sortField = null;
        this.sortedItems = null;
        this.sortOrder = null;
        this.totalRecords = null;
    }

    @action
    public async clearFilters()
    {
        Object.keys(this.filtersMetadata)
            .forEach(filterMetaKey =>
            {
                this.filtersMetadata[filterMetaKey].filter = '';
            });
        await this.onFilter();
    }

    @action
    private doFilter()
    {
        this.loading = true;
        this.filteredItems = TableFilterUtility.runFilters(this.originalItems, this.filtersMetadata);
        this.filteredLength = this.filteredItems ? this.filteredItems.length : 0;
        this.loading = false;
    }

    @action
    private async doSort()
    {
        // TODO Larry - make wait icon work
        this.appStore.componentStore.modalDialog.show(<WaitModalComponent />);
        this.loading = true;
        const sorted = await new Promise<ServiceSummary[]>((resolve) =>
        {
            if (this.filteredItems && this.sortField)
            {
                const items = toJS(this.filteredItems);

                if (this.sortOrder === 1)
                {
                    sort(items)
                        .asc(item => ServiceRecordListStore.toString(item[this.sortField]));
                }
                else if (this.sortOrder === -1)
                {
                    sort(items)
                        .desc(item => ServiceRecordListStore.toString(item[this.sortField]));
                }

                resolve(items);
            }
            resolve(this.filteredItems);
        });
        runInAction(() =>
        {
            this.sortedItems = sorted;
            this.loading = false;
        });

        this.appStore.componentStore.modalDialog.close();
    }

    private async fetchPage(previousPage: PagedResults<ServiceSummary>)
    {
        const patientID = this.appStore.sessionStore.currentPatientID;
        const currentPage = await this.appStore.handlers.patientHandler.getServices(patientID,
            previousPage ? previousPage.count + previousPage.offset : 0, CHUNK_SIZE);

        const originalItems = this.originalItems ? this.originalItems : [];
        originalItems.push(...currentPage.items);
        await runInAction(async () =>
        {
            this.originalItems = originalItems;
            this.totalRecords = currentPage.total;
        });

        this.doFilter();
        await this.doSort();

        if (currentPage.more)
        {
            this.fetchPage(currentPage);
        }
    }

    @action.bound
    public async filterByProgram(program: Program)
    {
        if (!this.originalItems)
        {
            return;
        }

        // programText fieldID set in constructor of ServiceRecordList.tsx
        this.onFiltersChange('programText', program);
        this.onFilter();
    }

    public async filterByServiceTypes(serviceTypes: number[])
    {
        // TODO filter services records by service type ID for pathology Summary and Lung function
        //  figure out if we need to manage the filter outside of the DataTable. That way filter isn't limited to the
        //  filters in ServiceRecordList DataTable.
    }

    @action
    public async load(): Promise<void>
    {
        if (this.originalItems === null)
        {
            this.filteredItems = null;
            this.sortedItems = null;
            await this.appStore.handlers.serviceTypeHandler.preloadServiceTypes();
            await this.loadOriginalItems();
        }
    }

    private async loadOriginalItems()
    {
        this.appStore.componentStore.modalDialog.show(<WaitModalComponent />);

        await this.fetchPage(null);

        this.appStore.componentStore.modalDialog.close();
    }

    @autobind
    public async onFilter()
    {
        this.doFilter();
        await this.doSort();
    }

    @action.bound
    public onFiltersChange(field: string, value: string)
    {
        this.filtersMetadata[field].filter = value;
    }

    @action.bound
    public async onSort(event)
    {
        this.sortField = event.sortField;
        this.sortOrder = event.sortOrder;
        await this.doSort();
    }

}

export default ServiceRecordListStore;
