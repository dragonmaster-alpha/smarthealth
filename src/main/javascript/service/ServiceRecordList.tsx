import {autobind} from 'core-decorators';
import MedicalGroupOwnerText from 'main/service/MedicalGroupOwnerText';
import ServiceTypeAnnotatedEntity from 'main/service/ServiceTypeAnnotatedEntity';
import StoreProps from 'main/store/StoreProps';
import DateUtility from 'main/utility/DateUtility';
import {TableFilterMode} from 'main/utility/TableFilterUtility';
import {action, computed, observable, runInAction, toJS} from 'mobx';
import {inject, observer} from 'mobx-react';
import {Button} from 'primereact/button';
import {Column} from 'primereact/column';
import {DataTable} from 'primereact/datatable';
import {Dropdown} from 'primereact/dropdown';
import {InputText} from 'primereact/inputtext';
import * as React from 'react';
import EventDateTime from 'smarthealth-javascript/EventDateTime';
import Program, {programDescriptions} from 'smarthealth-javascript/Program';
import ServiceStatus from 'smarthealth-javascript/ServiceStatus';
import ServiceSummary from 'smarthealth-javascript/ServiceSummary';

/**
 * The list of service records
 *
 * TODO have a look at React Concurrent and Suspense when available
 * TODO make Table vertical scroll bar decrease in size as more Service Records are fetched and added to the table
 *
 * @author Larry 25/01/2019
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2019
 */
interface ServiceRecordListProps extends StoreProps
{
    showFilters: boolean;
}

@inject('appStore', 'sessionStore')
@observer
class ServiceRecordList extends React.Component<ServiceRecordListProps>
{
    // TODO see if we can determine the number of rows dynamically based on the screen size or viewport size
    private static readonly ROWS: number = 8;

    // Conversion, 1ex = 7.5px (in table), 200px / 7.5px = 26.6667ex
    private static TABLE_SCROLL_HEIGHT_EX: number = 26.6667;

    // Height of a row to use in calculations of virtual scrolling. virtualRowHeight only accepts a number.
    private static VIRTUAL_ROW_HEIGHT_PX: number = 38;

    @observable
    private selection;

    @observable
    private virtualFirst: number = 0;

    @observable
    private virtualSize: number = 16;

    constructor(props)
    {
        super(props);
        runInAction(() =>
        {
            this.props.appStore.sessionStore.serviceRecordListStore.filtersMetadata = {
                serviceTypeText: { filter: '', filterMode: TableFilterMode.ContainsAnyStartWords },
                serviceDate: {
                    filter: '', parseValue: this.parseServiceDate, filterMode: TableFilterMode.ContainsAnyStartWords
                },
                programText: {
                    filter: '', parseFilter: this.parseProgram, filterMode: TableFilterMode.Equals
                },
                ownerText: {
                    filter: '', filterMode: TableFilterMode.ContainsAnyStartWords
                },
                summaryLine: {
                    filter: '', filterMode: TableFilterMode.ContainsAnyStartWords
                }
            };
        });
    }

    @computed
    get virtualItems(): ServiceSummary[]
    {
        return this.props.sessionStore.serviceRecordListStore.sortedItems
            ? this.props.sessionStore.serviceRecordListStore.sortedItems.slice(this.virtualFirst,
                this.virtualFirst + this.virtualSize)
            : [];
    }

    public async componentDidMount()
    {
        await this.props.appStore.sessionStore.serviceRecordListStore.load();
    }

    private loadingBody(): React.ReactNode
    {
        // TODO NOTE: look into loadingBody, may be causing the scroll flicker with DataTable virtualScrollDelay={0}
        return <div style={{ height: '38px' }}></div>;
    }

    @action.bound
    private onDoubleClick(event)
    {
        this.props.appStore.actionStore.openService(event.data);
    }

    @action.bound
    private onInputChange(event)
    {
        this.props.appStore.sessionStore.serviceRecordListStore.onFiltersChange(event.target.id, event.target.value);
        this.props.appStore.sessionStore.serviceRecordListStore.onFilter();
    }

    @action.bound
    private onSelectionChange(event)
    {
        this.selection = event.value;
    }

    @action.bound
    private onVirtualScroll(event)
    {
        this.virtualFirst = event.first;
        this.virtualSize = event.rows;
    }

    private parseProgram(value: Program): string
    {
        return value ? programDescriptions[value] : '';
    }

    private parseServiceDate(value: EventDateTime): string
    {
        return value ? value.iso.split('-')[0] : '';
    }

    public render(): React.ReactNode
    {
        const {
            buildServiceDateYearOptions, filteredLength, loading, onSort, sortField, sortOrder
        } = this.props.appStore.sessionStore.serviceRecordListStore;

        const serviceDateOptions = buildServiceDateYearOptions();

        const columns = [
            <Column body={this.renderServiceDate} field="serviceDate" filter={this.props.showFilters}
                filterElement={this.renderDropdownFilter('serviceDate', serviceDateOptions)}
                header="Service Date"
                key="Service Date" loadingBody={this.loadingBody} sortable={true} style={{ width: '10em' }} />,
            <Column body={this.renderServiceType} field="serviceTypeText" header="Service Type" key="Service Type"
                filter={this.props.showFilters} style={{ width: '20%' }}
                loadingBody={this.loadingBody} filterElement={this.renderInputFilter('serviceTypeText')} />,
            <Column body={this.renderOwnerText} field="ownerText" filter={this.props.showFilters}
                filterElement={this.renderInputFilter('ownerText')} header="Owner" key="Owner"
                loadingBody={this.loadingBody} style={{ width: '20%' }} />,
            <Column field="summaryLine" filter={this.props.showFilters}
                filterElement={this.renderInputFilter('summaryLine')} header="Details" key="Summary"
                loadingBody={this.loadingBody} />,
            <Column body={this.renderOpenButton} key="openButton" loadingBody={this.loadingBody}
                style={{ width: '3em', padding: '3px' }} />
        ];

        // TODO there was an issue with reorderableColumns=true. A new Service Type column is added into the table
        //  for some reason whenever we reorder the column.
        return (
            <DataTable dataKey="serviceID" emptyMessage={loading ? 'Loading' : 'No service records found'}
                lazy={true} rows={ServiceRecordList.ROWS} onSort={onSort} onSelectionChange={this.onSelectionChange}
                onRowDoubleClick={this.onDoubleClick} onVirtualScroll={this.onVirtualScroll} scrollable={true}
                selection={this.selection} sortField={sortField} sortOrder={sortOrder}
                scrollHeight={`${ServiceRecordList.TABLE_SCROLL_HEIGHT_EX}ex`} selectionMode="single"
                totalRecords={filteredLength} value={toJS(this.virtualItems)}
                virtualRowHeight={ServiceRecordList.VIRTUAL_ROW_HEIGHT_PX} virtualScroll={true} virtualScrollDelay={0}>
                {columns}
            </DataTable>
        );
    }

    private renderDropdownFilter(field: string, options: any[]): object
    {
        return (
            <Dropdown appendTo={document.body} id={field} options={options} onChange={this.onInputChange}
                style={{ width: '100%' }}
                value={this.props.appStore.sessionStore.serviceRecordListStore.filtersMetadata[field].filter} />
        );
    }

    private renderInputFilter(field: string): object
    {
        return (
            <InputText id={field} onChange={this.onInputChange} style={{ display: 'block', width: '100%' }}
                value={this.props.appStore.sessionStore.serviceRecordListStore.filtersMetadata[field].filter} />
        );
    }

    @autobind
    private renderOpenButton(rowData: ServiceSummary, column): React.ReactNode
    {
        return (<Button icon="pi pi-file" title="Open"
            onClick={() => this.props.appStore.actionStore.openService(rowData)} />);
    }

    private renderOwnerText(rowData: ServiceSummary, column): React.ReactNode
    {
        return <MedicalGroupOwnerText groupID={rowData.owningGroupID} />;
    }

    @autobind
    private renderServiceDate(rowData, column): string
    {
        return DateUtility.formatEventDateTime(rowData[column.field], this.props.appStore.i18nStore.locale);
    }

    @autobind
    private renderServiceType(rowData, column): React.ReactNode
    {
        return <ServiceTypeAnnotatedEntity serviceTypeID={rowData.serviceType} program={rowData.program}
            draft={rowData.status === ServiceStatus.DRAFT} />;
    }
}

export default ServiceRecordList;
