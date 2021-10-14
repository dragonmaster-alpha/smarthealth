import classNames from 'classnames';
import AbnormalResult from 'main/component/AbnormalResult';
import TableData, {TableRow} from 'main/data/TableData';
import StoreProps from 'main/store/StoreProps';
import React from 'react';
// import {Cell, Column, HeaderGroup, Row, useSortBy, useTable} from 'react-table';
import {Column, HeaderGroup, useSortBy, useTable} from 'react-table';


/**
 * A table which is capable of having rowspan on Test and Date columns, row selection, sorting and abnormal value
 * display.
 *
 * NOTE: This component should not be used directly, DiagnosticResultsTableTransform should be used instead.
 *
 * @author Thompson 27/05/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
interface DiagnosticResultsTableProps extends StoreProps
{
    data: TableData;
    rowSpans: number[];
}

// tslint disable in the line below because function names cannot start with a capital letter.
function DiagnosticResultsTable(props: DiagnosticResultsTableProps) // tslint:disable-line
{
    function renderDate(renderDateProps): React.ReactNode
    {
        return renderDateProps.value
            ? props.appStore.i18nStore.formatEventDateTime(renderDateProps.value)
            : null;
    }

    function renderValueWithAbnormal(cell)
    {
        return <AbnormalResult abnormalFlag={cell.row.values.Abnormal} value={cell.value} />;
    }

    // const [rowSelectionIndex, setRowSelectionIndex] = React.useState<number | null>(null);

    const columns = React.useMemo<Column[]>(() => [
        { Header: 'Test', accessor: 'test', groupRows: true },
        { Header: 'Date', accessor: 'date', Cell: renderDate, groupRows: true },
        { Header: 'Result', accessor: 'Name', Cell: renderValueWithAbnormal },
        { Header: 'Value', accessor: 'Value', Cell: renderValueWithAbnormal, disableSortBy: true },
        { Header: 'Units', accessor: 'Units', Cell: renderValueWithAbnormal, disableSortBy: true },
        { Header: 'Abnormal flags', accessor: 'Abnormal', Cell: renderValueWithAbnormal, disableSortBy: true },
        { Header: 'Range', accessor: 'Range', Cell: renderValueWithAbnormal, disableSortBy: true }
    ], []);

    const data: TableRow[] = React.useMemo<TableRow[]>(() => props.data, []);

    const table = useTable({
        columns,
        data,
        // Typescript definitions do not include these names
        // @ts-ignore
        disableMultiSort: true
    }, useSortBy);

    // function isGroupRows(): boolean
    // {
    //     if (table.state.sortBy.length === 0)
    //     {
    //         return true;
    //     }
    //     const accessor = table.state.sortBy[0].id;
    //     const column = columns.find(column => column.accessor === accessor);
    //     return column && column['groupRows'];
    // }

    function renderSortIndicatorIcon(column: HeaderGroup<{}>): React.ReactNode
    {
        // TODO icon arrow colour and spacing
        return (
            <i className={classNames({
                // Typescript definitions do not include these names
                // @ts-ignore
                'pi pi-sort': column.canSort && !column.isSorted,
                // Typescript definitions do not include these names
                // @ts-ignore
                'pi pi-sort-down': column.isSorted && column.isSortedDesc,
                // Typescript definitions do not include these names
                // @ts-ignore
                'pi pi-sort-up': column.isSorted && !column.isSortedDesc
            })} />
        );
    }

    function renderHeaderCell(column: HeaderGroup<{}>): React.ReactNode
    {
        return (
            <>
                {column.render('Header')}
                {renderSortIndicatorIcon(column)}
            </>
        );
    }

    function renderHeader(headerGroup: HeaderGroup<{}>): React.ReactNode
    {
        return (
            <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) =>
                {
                    return (
                        <th className={classNames({
                            // Typescript definitions do not include these names
                            // @ts-ignore
                            'p-highlight': column.isSorted,
                            // Typescript definitions do not include these names
                            // @ts-ignore
                            'p-sortable-column': column.canSort
                        })}
                            // Typescript definitions do not include these names
                            // @ts-ignore
                            {...column.getHeaderProps(column.getSortByToggleProps())}>
                            {renderHeaderCell(column)}
                        </th>
                    );
                })}
            </tr>
        );
    }

    // function renderCell(cell: Cell<{}>, rowSpan: number)
    // {
    //     if (cell.column['groupRows'])
    //     {
    //         // For a case where a row is selected within a rowspan that is not the first. The Test and Date column does
    //         // not highlight because their respective cells do not render. rowSpanNeedsMissingHighlight will ensure
    //         // Test and Date rowspan will also highlight.
    //         const rowSpanNeedsMissingHighlight = (rowSelectionIndex !== null)
    //             && (cell.row.original['test'] === props.data[rowSelectionIndex]['test'])
    //             && (cell.row.original['date'] === props.data[rowSelectionIndex]['date']);

    //         if (rowSpan > 0)
    //         {
    //             return (
    //                 <td {...cell.getCellProps()}
    //                     className={classNames(
    //                         { 'DiagnosticResultsTable-rowspan-highlight': rowSpanNeedsMissingHighlight })}
    //                     rowSpan={rowSpan}>
    //                     {cell.render('Cell')}
    //                 </td>
    //             );
    //         }
    //         else
    //         {
    //             return null;
    //         }
    //     }
    //     else
    //     {
    //         return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
    //     }
    // }

    // function renderRow(row: Row<{}>, rowSpan: number)
    // {
    //     table.prepareRow(row);
    //     return (
    //         <tr className={classNames('p-datatable-row', { 'p-highlight': row.index === rowSelectionIndex })}
    //             onClick={() => setRowSelectionIndex(row.index)} {...row.getRowProps()}>
    //             {row.cells.map(cell => renderCell(cell, rowSpan))}
    //         </tr>
    //     );
    // }

    // let testID = null;
    return (
        <div className="p-datatable p-datatable-hoverable-rows">
            <table {...table.getTableProps()}>
                <thead className="p-datatable-thead">
                {table.headerGroups.map(renderHeader)}
                </thead>
                <tbody className="p-datatable-tbody" {...table.getTableBodyProps()}>
                {/* {table.rows.map((row) =>
                {
                    if (testID === row.original.testID)
                    {
                        return renderRow(row, 0);
                    }
                    else
                    {
                        testID = row.original.testID;
                        return renderRow(row, props.rowSpans[testID]);
                    }
                })} */}
                </tbody>
            </table>
        </div>
    );
}

export default DiagnosticResultsTable;
