import {autobind} from 'core-decorators';
import lodash from 'lodash';
import MedicalGroupMemberAggregate from 'main/data/MedicalGroupMemberAggregate';
import TableData from 'main/data/TableData';
import SelectionTableFilterInput from 'main/field/SelectionTableFilterInput';
import TableFieldOld from 'main/field/TableFieldOld';
import {action, observable} from 'mobx';
import {observer} from 'mobx-react';
import {Column} from 'primereact/column';
import {DataTable} from 'primereact/datatable';
import React from 'react';
import MemberID from 'smarthealth-javascript/MemberID';

/**
 * Overlay Table for MemberField.tsx
 *
 * @author Thompson 4/11/2019
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2019
 */
interface MemberOverlayTableProps
{
    footerActionTemplate: () => React.ReactNode;
    onSelectionChange: (memberID: MemberID) => void;
    options: MedicalGroupMemberAggregate[];
    value: MedicalGroupMemberAggregate;
}

@observer
class MemberSelectionTable extends React.Component<MemberOverlayTableProps>
{
    private static MINIMUM_ROWS: number = 5;

    @observable
    private filters = { familyName: { value: '' } };

    @action.bound
    private onFiltersChange(event)
    {
        this.filters[event.target.id].value = event.target.value;
    }

    @autobind
    private onSelectionChange(event)
    {
        const selectedRow = event.value;
        if (lodash.isEmpty(selectedRow))
        {
            return;
        }

        this.props.onSelectionChange(selectedRow.value.member.memberID);
    }

    public render()
    {
        const memberRows: TableData = this.props.options
            ? this.props.options.map(value => ({
                value, givenName: value.user.name.givenName, familyName: value.user.name.familyName,
                role: value.member.role, speciality: value.member.speciality,
                medicalGroup: value.medicalGroup.name, city: value.medicalGroup.address.city,
                state: value.medicalGroup.address.state
            }))
            : [];

        // @ts-ignore
        const selectedRow = memberRows && memberRows.find(row => lodash.isEqual(row.value, this.props.value));

        const scrollHeightEx = TableFieldOld.ROW_MIN_HEIGHT_VIEW_MODE_EX * MemberSelectionTable.MINIMUM_ROWS;

        return (
            <div className="cp-MemberSelectionTable">
                <DataTable filters={this.filters} scrollable={true} scrollHeight={`${scrollHeightEx}ex`}
                    selection={selectedRow} selectionMode="single"
                    style={{ height: `${scrollHeightEx + TableFieldOld.MINIMUM_COLUMN_HEADER_HEIGHT_EX}ex` }}
                    tableClassName="cp-MemberSelectionTable-table" onSelectionChange={this.onSelectionChange}
                    value={memberRows}>
                    <Column field="givenName" header="Given Name" />
                    <Column field="familyName" header="Family Name" />
                    {/*
                    TODO cp-MemberSelectionTable-cell may be replaced for TableField abbreviate property in future
                    */}
                    <Column field="role" header="Role" bodyClassName="cp-MemberSelectionTable-cell" />
                    <Column field="speciality" header="Speciality" />
                    {/*
                    TODO cp-MemberSelectionTable-cell may be replaced for TableField abbreviate property in future
                    */}
                    <Column field="medicalGroup" header="Medical Group" bodyClassName="cp-MemberSelectionTable-cell" />
                    <Column field="city" header="City" />
                    <Column field="state" header="State" />
                </DataTable>
                <div className="cp-MemberSelectionTable-footer">
                    <SelectionTableFilterInput id="familyName" label="Provider Name:" onChange={this.onFiltersChange}
                        value={this.filters.familyName.value} />
                    {this.props.footerActionTemplate()}
                </div>
            </div>
        );
    }
}

export default MemberSelectionTable;
