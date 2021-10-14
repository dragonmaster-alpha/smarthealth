import RowspanTable, {ColumnSortDetail} from 'main/component/RowspanTable';
import PathologySummaryPanelModel from 'main/summary/pathology/PathologySummaryPanelModel';
import PathologySummaryTableModel from 'main/summary/pathology/PathologySummaryTableModel';
import {action, observable} from 'mobx';
import {observer} from 'mobx-react';
import React from 'react';

/**
 * Display a summary table of pathology results in a Rowspan table format with expandable rowspan and column sorting.
 *
 * TODO this file is causing multiple Jest issues when used in PathologySummaryPanel.tsx. A replacement file is used
 * with the file name of PathologySummaryTable.tsx
 *
 * To reproduce the Jest errors replace PathologySummaryTableV2 with PathologySummaryTable in PathologySummaryPanel.
 *
 * Jest error message:
 * Test suite failed to run
 * Could not find file:
 * 'C:\A\dev\smarthealth\smarthealth-webui-war\src\test\javascript\summary\PathologySummaryTableModelV2Jest.tsx'.
 *
 * @author Thompson 29/07/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
interface PathologySummaryTableProps
{
    model: PathologySummaryPanelModel;
}

export interface TestExpanded
{
    testName: string;
}

@observer
class PathologySummaryTable extends React.Component<PathologySummaryTableProps>
{
    @observable
    private columnSort: ColumnSortDetail | null;

    @observable
    private expandedTests: TestExpanded[] = [];

    @action.bound
    private onExpandTestToggle(testName: string)
    {
        const testAlreadyExpandedIndex = this.expandedTests.findIndex(
            expandedTest => (expandedTest.testName === testName));
        if (testAlreadyExpandedIndex === -1)
        {
            this.expandedTests.push({ testName });
        }
        else
        {
            this.expandedTests.splice(testAlreadyExpandedIndex, 1);
        }
    }

    public render()
    {
        const model = new PathologySummaryTableModel(this.props.model, this.columnSort, this.expandedTests);

        return <RowspanTable cells={model.rowspanCells} columns={model.columns} columnSort={this.columnSort}
            setColumnSort={this.setColumnSort} onExpandToggle={this.onExpandTestToggle} />;
    }

    @action.bound
    private setColumnSort(columnID: string)
    {
        if (!this.columnSort || (this.columnSort.columnID !== columnID))
        {
            this.columnSort = { columnID, sortOrder: 1 };
            return;
        }

        if (this.columnSort.sortOrder === 1)
        {
            this.columnSort.sortOrder = -1;
        }
        else if (this.columnSort.sortOrder === -1)
        {
            this.columnSort = null;
        }
    }
}

export default PathologySummaryTable;
