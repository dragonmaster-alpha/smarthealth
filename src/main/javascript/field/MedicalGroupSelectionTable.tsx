import {autobind} from 'core-decorators';
import lodash from 'lodash';
import TableData from 'main/data/TableData';
import SelectionTableFilterInput from 'main/field/SelectionTableFilterInput';
import TableFieldOld from 'main/field/TableFieldOld';
import {action, observable} from 'mobx';
import {observer} from 'mobx-react';
import {Column} from 'primereact/column';
import {DataTable} from 'primereact/datatable';
import React from 'react';
import MedicalGroup from 'smarthealth-javascript/MedicalGroup';

/**
 * Overlay Table for MedicalGroupFieldOld.tsx
 *
 * @author Thompson 4/11/2019
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2019
 */

interface MedicalGroupOverlayTableProps
{
    footerActionTemplate: () => React.ReactNode;
    onSelectionChange: (groupID: number) => void;
    options: MedicalGroup[];
    value: MedicalGroup;
}

@observer
class MedicalGroupSelectionTable extends React.Component<MedicalGroupOverlayTableProps>
{
    private static MINIMUM_ROWS: number = 5;

    @observable
    private filters = { name: { value: '' } };

    @action.bound
    private onFiltersChange(event)
    {
        this.filters[event.target.id].value = event.target.value;
    }

    @autobind
    private onSelectionChange(event)
    {
        const selectedRow = event.value;
        // ignore filler rows
        if (lodash.isEmpty(selectedRow))
        {
            return;
        }

        this.props.onSelectionChange(selectedRow.value.groupID);
    }

    public render()
    {
        const medicalGroupRows: TableData = this.props.options
            ? this.props.options.map(value => (
                { value, name: value.name, city: value.address.city, state: value.address.state }
            ))
            : [];
        // @ts-ignore
        const selection = medicalGroupRows && medicalGroupRows.find(row => lodash.isEqual(row.value, this.props.value));

        const scrollHeightEx = TableFieldOld.ROW_MIN_HEIGHT_VIEW_MODE_EX * MedicalGroupSelectionTable.MINIMUM_ROWS;

        return (
            <div className="cp-MedicalGroupSelectionTable">
                <DataTable filters={this.filters} scrollable={true} scrollHeight={`${scrollHeightEx}ex`}
                    selection={selection} selectionMode="single"
                    style={{ height: `${scrollHeightEx + TableFieldOld.MINIMUM_COLUMN_HEADER_HEIGHT_EX}ex` }}
                    onSelectionChange={this.onSelectionChange} value={medicalGroupRows}>
                    <Column field="name" header="Name" />
                    <Column field="city" header="City" />
                    <Column field="state" header="State" />
                </DataTable>
                <div className="cp-MedicalGroupSelectionTable-footer">
                    <SelectionTableFilterInput id="name" label="Group Name:" onChange={this.onFiltersChange}
                        value={this.filters.name.value} />
                    {this.props.footerActionTemplate()}
                </div>
            </div>
        );
    }
}

export default MedicalGroupSelectionTable;
