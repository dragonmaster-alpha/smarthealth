import {autobind} from 'core-decorators';
import StoreProps from 'main/store/StoreProps';
import PathologyFilteredPathologySummaryDataModel
    from 'main/summary/pathology/PathologyFilteredPathologySummaryDataModel';
import PathologySummaryResult from 'main/summary/pathology/PathologySummaryResult';
import {observable, runInAction} from 'mobx';
import {inject, observer} from 'mobx-react';
import {Column, ColumnProps} from 'primereact/column';
import {DataTable} from 'primereact/datatable';
import React from 'react';
import FilteredPathologySummaryData from 'smarthealth-javascript/FilteredPathologySummaryData';
import FilteredPathologyType from 'smarthealth-javascript/FilteredPathologyType';

/**
 * Display a dynamic pathology summary table used for Renal pathology and Renal Transplant pathology tabs.
 *
 * The table display up to 12 new date columns for results. The result value is a ServiceRecordReference with abnormal
 * value styling. That is, if property "abnormalFlag" has a value other than "N" or undefined, the font colour is red.
 * The last two columns of the table are Units and Range.
 *
 * https://rm.smarthealth.com.au/smartrm/#!/PV8/FR3188
 * https://rm.smarthealth.com.au/smartrm/#!/PV8/FR3390
 * https://rm.smarthealth.com.au/smartrm/#!/PV8/FR3467
 *
 * TODO Renal pathology tab is selected by default when a patient has service records in the Renal program
 *
 * @author Thompson 15/05/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
interface PathologySummaryTableFilteredPathologyTypeProps extends StoreProps
{
    filterType: FilteredPathologyType;
}

@inject('appStore', 'handlers')
@observer
class PathologySummaryFilteredTable extends React.Component<PathologySummaryTableFilteredPathologyTypeProps>
{
    @observable
    private filteredPathologySummary: FilteredPathologySummaryData = null;

    public async componentDidMount()
    {
        // pathology filter is not an entity therefore we fetch it directly.
        const result = await this.props.handlers.pathologyHandler.getPathologyFilteredBy(this.props.filterType);
        runInAction(() =>
        {
            this.filteredPathologySummary = result;
        });
    }

    @autobind
    private generateColumn(columnProps: ColumnProps): React.ReactNode
    {
        if (columnProps.field === 'result' || columnProps.field === 'units' || columnProps.field === 'range')
        {
            return <Column {...columnProps} />;
        }
        else
        {
            return <Column body={this.renderValueAndServiceRecordReferenceButton} {...columnProps} />;
        }
    }

    public render()
    {
        const model = new PathologyFilteredPathologySummaryDataModel(this.props.appStore,
            this.filteredPathologySummary);

        return (
            <DataTable value={model.values}>
                {model.columns.map(this.generateColumn)}
            </DataTable>
        );
    }

    private renderValueAndServiceRecordReferenceButton(rowData, column): React.ReactNode
    {
        const value = rowData[column.field];
        if (!value)
        {
            return null;
        }

        return <PathologySummaryResult abnormalFlags={value.result.abnormalFlags} service={value.service}
            value={value.result.value} />;
    }
}

export default PathologySummaryFilteredTable;
