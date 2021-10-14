import {autobind} from 'core-decorators';
import sort from 'fast-sort';
import MedicationProduct from 'main/component/MedicationProduct';
import StoreProps from 'main/store/StoreProps';
import MedicationSummaryProductHistoryTable from 'main/summary/medication/MedicationSummaryProductHistoryTable';
import DateUtility from 'main/utility/DateUtility';
import {action, computed, observable} from 'mobx';
import {inject, observer} from 'mobx-react';
import {Column} from 'primereact/column';
import {DataTable} from 'primereact/datatable';
import React from 'react';
import MedicationSummary from 'smarthealth-javascript/MedicationSummary';

/**
 * Display a TreeTable to show the latest medication summaries as first level and second level to show the medication
 * history.
 *
 * WebUI differs from JavaUI in that there will no longer be a dual-panel presentation of medications.
 * https://rm.smarthealth.com.au/smartrm/#!/PV8/FR3181
 *
 * TODO there is currently a bug with displaying the Medication summary history table. In that when the Medication
 * summary history table displays and causes the Medication summary table to scroll. The table column header and column
 * body does not align.
 * https://github.com/primefaces/primereact/issues/1642
 *
 * @author Thompson 9/10/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
interface MedicationSummaryTreeTableProps extends StoreProps
{
    data: MedicationSummary[];
    onMedicationSummaryChange: (medicationSummary: MedicationSummary) => void;
}

@inject('appStore', 'entityCache', 'sessionStore')
@observer
class MedicationSummaryExpandableTable extends React.Component<MedicationSummaryTreeTableProps>
{
    private static DATE_COLUMN_WIDTH_EM: string = '9em';

    private static SCROLL_HEIGHT_EX: string = '30ex';

    @observable
    private expandedRows: any;

    @computed
    private get medicationSummaries(): MedicationSummary[]
    {
        if (!this.props.data)
        {
            return [];
        }

        const dataSorted = sort(this.props.data)
            .asc(data => data.product.value);
        if (this.props.sessionStore.medicationSummaryStore.allMedicationFilter)
        {
            return dataSorted;
        }
        else if (this.props.sessionStore.medicationSummaryStore.adverseReactionFilter)
        {
            return dataSorted.filter(medicationSummary => medicationSummary.adverseReaction);
        }

        const today = this.props.appStore.dateTime.today();
        return dataSorted.filter(medicationSummary => medicationSummary.finishDate
            ? DateUtility.isAfterDay(medicationSummary.finishDate, today)
            || DateUtility.isSameDay(medicationSummary.finishDate, today)
            : true);
    }

    @action.bound
    private onRowToggle(event)
    {
        this.expandedRows = event.data;
    }

    @autobind
    private onSelectionChange(event)
    {
        this.props.onMedicationSummaryChange(event.value);
    }

    public render()
    {
        const medicationSummarySelected = this.props.sessionStore.medicationSummaryStore.medicationSummarySelected;
        const dateColumnWidth = {
            width: MedicationSummaryExpandableTable.DATE_COLUMN_WIDTH_EM
        };
        return (
            <DataTable expandedRows={this.expandedRows} onSelectionChange={this.onSelectionChange}
                onRowToggle={this.onRowToggle} rowExpansionTemplate={this.renderProductHistoryTable} scrollable={true}
                scrollHeight={MedicationSummaryExpandableTable.SCROLL_HEIGHT_EX} selection={medicationSummarySelected}
                selectionMode="single" value={this.medicationSummaries}>
                <Column expander style={{ width: '3em' }} />
                <Column body={this.renderProductOrGenerics} field="product" header="Product/Generics" sortable={true} />
                <Column field="details" header="Details" sortable={true} />
                <Column body={this.renderDate} field="firstDate" header="First date" sortable={true}
                    style={dateColumnWidth} />
                <Column body={this.renderDate} field="lastDate" header="Last date" sortable={true}
                    style={dateColumnWidth} />
                <Column body={this.renderDate} field="finishDate" header="Finish date" sortable={true}
                    style={dateColumnWidth} />
            </DataTable>
        );
    }

    @autobind
    private renderDate(rowData, column): React.ReactNode
    {
        return rowData[column.field] && this.props.appStore.i18nStore.formatEventDateTime(rowData[column.field]);
    }

    @autobind
    private renderProductHistoryTable(data): React.ReactElement
    {
        return (
            <MedicationSummaryProductHistoryTable
                medicationSelected={this.props.sessionStore.medicationSummaryStore.medicationSummarySelected}
                onSelectionChange={this.onSelectionChange} product={data.product} />
        );
    }

    public renderProductOrGenerics(rowData, column): React.ReactNode
    {
        return <MedicationProduct codedValue={rowData[column.field]} />;
    }
}

export default MedicationSummaryExpandableTable;
