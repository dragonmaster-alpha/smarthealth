import {autobind} from 'core-decorators';
import Entity from 'main/component/Entity';
import EntityList from 'main/component/EntityList';
import StoreProps from 'main/store/StoreProps';
import StringUtility from 'main/utility/StringUtility';
import {inject, observer} from 'mobx-react';
import {Column} from 'primereact/column';
import {DataTable} from 'primereact/datatable';
import React from 'react';
import CodedValue from 'smarthealth-javascript/CodedValue';
import EntityReferenceList from 'smarthealth-javascript/EntityReferenceList';
import EntityReferenceListType from 'smarthealth-javascript/EntityReferenceListType';
import EntityReferenceListTypeUtility from 'smarthealth-javascript/EntityReferenceListTypeUtility';
import EntityType from 'smarthealth-javascript/EntityType';
import MedicationSummary from 'smarthealth-javascript/MedicationSummary';

/**
 * Display the history for a Medication used in Medication summary.
 *
 * @author Thompson 20/10/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
interface MedicationSummaryProductHistoryTableProps extends StoreProps
{
    medicationSelected: MedicationSummary;
    onSelectionChange: (event) => void;
    product: CodedValue;
}

@inject('appStore')
@observer
class MedicationSummaryProductHistoryTable extends React.Component<MedicationSummaryProductHistoryTableProps>
{
    private static SMALLER_COLUMN_WIDTH_EM: string = '10em';

    private static scrollHeightEX: string = '22ex';

    public render()
    {
        const id = this.props.product.code
            ? EntityReferenceListTypeUtility.buildID(EntityReferenceListType.MedicationHistoryByCode,
                { id: this.props.product.code })
            : EntityReferenceListTypeUtility.buildID(EntityReferenceListType.MedicationHistoryByName,
                { name: encodeURI(this.props.product.value) });

        return (
            <Entity<EntityReferenceList> id={id} type={EntityType.EntityReferenceList} render={(data) => (
                <EntityList<MedicationSummary> references={data} render={(data) =>
                {
                    const medicationsAscending = data.sort(
                        (medicationA, medicationB) => (
                            StringUtility.compareAscending(medicationA.prodFormStrength, medicationB.prodFormStrength)
                        ));
                    const dateColumnWidth = {
                        width: MedicationSummaryProductHistoryTable.SMALLER_COLUMN_WIDTH_EM
                    };
                    return (
                        <DataTable onSelectionChange={this.props.onSelectionChange} scrollable={true}
                            scrollHeight={MedicationSummaryProductHistoryTable.scrollHeightEX}
                            selection={this.props.medicationSelected} selectionMode="single"
                            value={medicationsAscending}>
                            <Column field="prodFormStrength" header="Medication" />
                            <Column field="dose" header="Dose" style={dateColumnWidth} />
                            <Column field="frequency" header="Frequency" style={dateColumnWidth} />
                            <Column body={this.renderDate} field="startDate" header="Start date"
                                style={dateColumnWidth} />
                            <Column body={this.renderDate} field="finishDate" header="Finish date"
                                style={dateColumnWidth} />
                            <Column field="summary" header="Summary" />
                        </DataTable>
                    );
                }} />
            )} />
        );
    }

    @autobind
    private renderDate(rowData, column): React.ReactNode
    {
        return rowData[column.field] && this.props.appStore.i18nStore.formatEventDateTime(rowData[column.field]);
    }
}

export default MedicationSummaryProductHistoryTable;
