import DateTime from 'main/component/DateTime';
import {ColumnSortDetail, RowspanCell, RowspanColumn} from 'main/component/RowspanTable';
import PathologySummaryPanelModel, {
    PathologySummaryTest, PathologySummaryValue
} from 'main/summary/pathology/PathologySummaryPanelModel';
import PathologySummaryResult from 'main/summary/pathology/PathologySummaryResult';
import {TestExpanded} from 'main/summary/pathology/PathologySummaryTable';
import DateUtility from 'main/utility/DateUtility';
import React from 'react';
import EventDateTime from 'smarthealth-javascript/EventDateTime';

/**
 * PathologySummaryTableModel file name seems to be causing Jest errors when importing into a Jest file.
 *
 * Empty class to demonstrate this error with PathologySummaryTableModelFailedJest.tsx.
 *
 * @author Thompson 3/08/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
class PathologySummaryTableModel
{
    private static readonly resultColumnKey: string = '1';

    private static readonly testColumnKey: string = '0';

    // [test][result][column]
    public readonly cells: (string | PathologySummaryValue)[][][];

    public readonly columns: RowspanColumn[];

    private readonly expandedTests: TestExpanded[];

    // [row][column]
    public readonly rowspanCells: RowspanCell[][] = [];

    constructor(model: PathologySummaryPanelModel, columnSort: ColumnSortDetail, expandedTests: TestExpanded[])
    {
        this.expandedTests = expandedTests;
        this.cells = this.buildCells(model);
        if (columnSort && (columnSort.columnID === PathologySummaryTableModel.resultColumnKey))
        {
            this.columns = this.buildColumns(model.dates);
            this.rowspanCells = this.buildResultRowCells();
            this.sortResult(this.rowspanCells, columnSort.sortOrder);
        }
        else
        {
            const visibleDates = this.determineVisibleResultDates(model.tests, model.values);
            this.columns = this.buildColumns(visibleDates);
            if (columnSort && (columnSort.columnID === PathologySummaryTableModel.testColumnKey))
            {
                this.sortTest(this.cells, columnSort.sortOrder);
            }
            const dateHiddenIndexes: number[] = [];
            model.dates.forEach((date, dateIndex) =>
            {
                const dateVisible = visibleDates.some(visibleDate => DateUtility.isSameDay(visibleDate, date));
                if (!dateVisible)
                {
                    dateHiddenIndexes.push(dateIndex);
                }
            });
            this.rowspanCells = this.buildRowSpanCells(dateHiddenIndexes);
        }
    }

    private buildCells(model: PathologySummaryPanelModel): (string | PathologySummaryValue)[][][]
    {
        const cells: (string | PathologySummaryValue)[][][] = [];
        model.tests.forEach((test, testIndex) =>
        {
            // create a test array
            cells.push([]);
            model.results[testIndex].forEach((result, resultIndex) =>
            {
                // create result array
                cells[testIndex].push([]);
                const resultRow = cells[testIndex][resultIndex];
                resultRow.push(model.tests[testIndex].name);
                resultRow.push(model.results[testIndex][resultIndex].name);
                let units = null;
                let range = null;
                model.dates.forEach((date, dateIndex) =>
                {
                    const result = model.values[testIndex][resultIndex][dateIndex];
                    resultRow.push(result);

                    if (!units && result && result.units)
                    {
                        units = result.units;
                    }
                    if (!range && result && result.range)
                    {
                        range = result.range;
                    }
                });
                resultRow.push(units);
                resultRow.push(range);
            });
        });

        return cells;
    }

    private buildColumns(dates: EventDateTime[]): RowspanColumn[]
    {
        const columns: RowspanColumn[] = [
            {
                Header: 'Test',
                accessor: PathologySummaryTableModel.testColumnKey,
                groupRows: true,
                Cell: (cell) => (cell.value && cell.value.value)
            },
            {
                Header: 'Result',
                accessor: PathologySummaryTableModel.resultColumnKey,
                Cell: (cell) => (cell.value && cell.value.value)
            }
        ];
        let accessorIndex: number = 1;
        const dateColumns = dates.map<RowspanColumn>(date =>
        {
            accessorIndex += 1;
            return {
                Header: <DateTime date={date} />,
                accessor: `${accessorIndex}`,
                disableSortBy: true,
                button: true,
                Cell: (cell) =>
                {
                    const rowspanCell = cell.value;
                    const pathologySummaryValue = rowspanCell && rowspanCell.value;
                    return (
                        pathologySummaryValue &&
                        <PathologySummaryResult abnormalFlags={pathologySummaryValue.abnormalFlags}
                            service={pathologySummaryValue.service} value={pathologySummaryValue.value} />
                    );
                }
            };
        });
        columns.push(...dateColumns);
        accessorIndex += 1;
        columns.push({
            Header: 'Units',
            accessor: `${accessorIndex}`,
            disableSortBy: true,
            Cell: (cell) => (cell.value && cell.value.value)
        });
        accessorIndex += 1;
        columns.push({
            Header: 'Range',
            accessor: `${accessorIndex}`,
            disableSortBy: true,
            Cell: (cell) => (cell.value && cell.value.value)
        });
        return columns;
    }

    public buildResultRowCells(): RowspanCell[][]
    {
        const rowCells: RowspanCell[][] = [];
        let rowIndex = 0;
        this.cells.forEach((testRowspan) =>
        {
            testRowspan.forEach((testResultRow) =>
            {
                rowCells.push([]);
                this.columns.forEach((column, columnIndex) =>
                {
                    rowCells[rowIndex].push({
                        value: testResultRow ? testResultRow[columnIndex] : null
                    });
                });
                rowIndex += 1;
            });
        });
        return rowCells;
    }

    public buildRowSpanCells(dateHiddenIndexes: number[]): RowspanCell[][]
    {
        const rowspanCells: RowspanCell[][] = [];
        let currentRowIndex = 0;
        this.cells.forEach((testRowspan) =>
        {
            const testName = testRowspan[0][0];
            if ((typeof testName === 'string') && this.isTestRowspanExpanded(testName))
            {
                testRowspan.forEach((testResultRow, testResultRowIndex) =>
                {
                    const rowWithHiddenDatesRemoved = this.filterHiddenDateResults(testResultRow, dateHiddenIndexes);
                    rowspanCells.push([]);
                    this.columns.forEach((column, columnIndex) =>
                    {
                        rowspanCells[currentRowIndex].push({
                            value: rowWithHiddenDatesRemoved ? rowWithHiddenDatesRemoved[columnIndex] : null
                        });

                        if (columnIndex === 0 && testResultRowIndex === 0)
                        {
                            rowspanCells[currentRowIndex][PathologySummaryTableModel.testColumnKey].rowSpan
                                = testRowspan.length;
                            rowspanCells[currentRowIndex][PathologySummaryTableModel.testColumnKey].expanded
                                = true;
                        }
                    });
                    currentRowIndex += 1;
                });
            }
            else
            {
                rowspanCells.push([]);
                rowspanCells[currentRowIndex].push(...Array(this.columns.length)
                    .fill({ value: null }));
                rowspanCells[currentRowIndex][PathologySummaryTableModel.testColumnKey] = {
                    value: testName,
                    rowSpan: 1
                };
                currentRowIndex += 1;
            }
        });
        return rowspanCells;
    }

    private determineVisibleResultDates(tests: PathologySummaryTest[],
        values: PathologySummaryValue[][][]): EventDateTime[]
    {
        const visibleDates = new Map<string, EventDateTime>();
        values.forEach((test, testIndex) =>
        {
            const testName = tests[testIndex].name;
            const testExpanded = this.expandedTests.some(expandedTest => expandedTest.testName === testName);
            if (testExpanded)
            {
                test.forEach((testResultDateValue) =>
                {
                    testResultDateValue.forEach(dateResultValue =>
                    {
                        if (dateResultValue !== null)
                        {
                            visibleDates.set(dateResultValue.testDate.iso, dateResultValue.testDate);
                        }
                    });
                });
            }
        });
        const visibleDatesSortedDescending = [...visibleDates.entries()]
            .map(visibleEntry => visibleEntry[1])
            .sort(DateUtility.compareDescending);
        return visibleDatesSortedDescending;
    }

    private filterHiddenDateResults(testResultRow: (string | PathologySummaryValue)[],
        dateHiddenIndexes: number[]): (string | PathologySummaryValue)[]
    {
        // substract 2 from column index to help align column index with date index.
        // since date index starts at 0
        // and date index in column starts at 2 because 0 is for Test and 1 is for Result.
        const columnIndexRebaseSubtractor = 2;
        return testResultRow.filter((column, columnIndex) =>
            // if column rebased index === any date index in dateHiddenIndexes then filter out from return
            !dateHiddenIndexes.some(dateHiddenIndex =>
                (dateHiddenIndex === (columnIndex - columnIndexRebaseSubtractor))));
    }

    private isTestRowspanExpanded(testName: string): boolean
    {
        return this.expandedTests.some(testExpanded => (testExpanded.testName === testName));
    }

    private sortResult(rowspanCells: RowspanCell[][], sortOrder: -1 | 1)
    {
        const RESULT_COLUMN_INDEX = 1;

        rowspanCells.sort((rowA, rowB) =>
        {
            const resultAToLowerCase = rowA[RESULT_COLUMN_INDEX].value.toLowerCase();
            const resultBToLowerCase = rowB[RESULT_COLUMN_INDEX].value.toLowerCase();

            if (resultAToLowerCase < resultBToLowerCase)
            {
                return -1 * sortOrder;
            }
            else if (resultAToLowerCase > resultBToLowerCase)
            {
                return 1 * sortOrder;
            }
            else
            {
                return 0;
            }
        });
    }

    private sortTest(cells: (string | PathologySummaryValue)[][][], sortOrder: -1 | 1)
    {
        const FIRST_TEST_RESULT_INDEX = 0;

        cells.sort((testA, testB) =>
        {
            const testAToLowerCase = testA[FIRST_TEST_RESULT_INDEX][PathologySummaryTableModel.testColumnKey]
                .toLowerCase();
            const testBToLowerCase = testB[FIRST_TEST_RESULT_INDEX][PathologySummaryTableModel.testColumnKey]
                .toLowerCase();

            if (testAToLowerCase < testBToLowerCase)
            {
                return -1 * sortOrder;
            }
            else if (testAToLowerCase > testBToLowerCase)
            {
                return 1 * sortOrder;
            }
            else
            {
                return 0;
            }
        });
    }
}

export default PathologySummaryTableModel;
