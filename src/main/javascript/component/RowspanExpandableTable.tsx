import lodash from 'lodash';
import RowspanTable, {ColumnSortDetail, RowspanColumn} from 'main/component/RowspanTable';
import {TableRow} from 'main/data/TableData';
import ShouldNeverGetHereError from 'main/utility/ShouldNeverGetHereError';
import {action, computed, observable} from 'mobx';
import {observer} from 'mobx-react';
import React from 'react';

/**
 * Render RowspanTable with expandable rowspan and sort capabilities.
 *
 * @author Thompson 23/07/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
interface RowspanExpandableTableProps
{
    columns: RowspanColumn[];
    data: TableRow[];
    onExpandToggled?: (rowspanData: TableRow) => void;
}

@observer
class RowspanExpandableTable extends React.Component<RowspanExpandableTableProps>
{
    private readonly columnExpandableID: string;

    @observable
    private columnSort: ColumnSortDetail | null;

    @observable
    private data = lodash.cloneDeep(this.props.data);

    constructor(props)
    {
        super(props);
        if ((this.props.columns.length === 0) || !this.props.columns[0].groupRows)
        {
            throw new Error('RowspanExpandableTable expect the first column to have a groupRows property.');
        }

        // TODO remove
        // @ts-ignore
        this.columnExpandableID = this.props.columns[0].accessor;
    }

    @computed
    private get dataExpandAndSorted()
    {
        const dataExpanded = [];
        this.data.forEach((data, dataIndex) =>
        {
            if ((this.columnSort && (this.columnSort.columnID !== this.columnExpandableID)) || data['expanded'])
            {
                const rowspanRowData = data['rowspanRowData'];

                rowspanRowData.forEach((result, rowIndex) =>
                {
                    dataExpanded.push({
                        ...result,
                        [this.columnExpandableID]: data[this.columnExpandableID],
                        expanded: true,
                        rowspan: this.determineRowspan(data, rowIndex)
                    });
                });
            }
            else
            {
                dataExpanded.push({
                    [this.columnExpandableID]: data[this.columnExpandableID],
                    expanded: false,
                    rowspan: 1
                });
            }
        });

        return this.sortData(dataExpanded);
    }

    private determineRowspan(test, rowIndex: number): number
    {
        if (this.columnSort && (this.columnSort.columnID !== this.columnExpandableID))
        {
            return 1;
        }
        else if (rowIndex === 0)
        {
            return test.rowspanRowData.length;
        }
        else
        {
            return 0;
        }
    }

    @action.bound
    private onToggleExpand(columnID: string)
    {
        const dataToExpand = this.data.find(data => data[this.columnExpandableID] === columnID);
        dataToExpand['expanded'] = !dataToExpand['expanded'];
        this.props.onExpandToggled(dataToExpand);
    }

    public render()
    {
        // TODO fix this component with new RowspanTable implementation
        return (
            // @ts-ignore
            <RowspanTable columns={this.props.columns} columnSort={this.columnSort} data={this.dataExpandAndSorted}
                onExpand={this.onToggleExpand} setColumnSort={this.setColumnSort} />
        );
    }

    @action.bound
    private setColumnSort(columnID: string)
    {
        if (!this.columnSort || (this.columnSort.columnID !== columnID))
        {
            const columnSort: ColumnSortDetail = { columnID, sortOrder: 1 };
            this.columnSort = columnSort;
        }
        else if (this.columnSort.sortOrder === 1)
        {
            this.columnSort.sortOrder = -1;
        }
        else if (this.columnSort.sortOrder === -1)
        {
            this.columnSort = null;
        }
        else
        {
            throw new ShouldNeverGetHereError();
        }
    }

    private sortData(data: any[])
    {
        if (this.columnSort)
        {
            return data.sort((dataA, dataB) =>
            {
                const dataAString = dataA[this.columnSort.columnID] ? dataA[this.columnSort.columnID] : '';
                const dataBString = dataB[this.columnSort.columnID] ? dataB[this.columnSort.columnID] : '';
                if (dataAString < dataBString)
                {
                    return -1 * this.columnSort.sortOrder;
                }
                else if (dataAString > dataBString)
                {
                    return 1 * this.columnSort.sortOrder;
                }
                else
                {
                    return 0;
                }
            });
        }
        else
        {
            return data;
        }
    }
}

export default RowspanExpandableTable;
