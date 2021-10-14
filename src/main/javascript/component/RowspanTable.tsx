import classNames from 'classnames';
import React from 'react';
import {Cell, Column, HeaderGroup, Row, useSortBy, useTable} from 'react-table';

/**
 * Renders an expandable rowspan table with sorting and rowspan expand hooks.
 *
 * @author Thompson 23/07/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
export interface ColumnSortDetail
{
    columnID: string;
    sortOrder: -1 | 1;
}

export type RowspanColumn = Column & { groupRows?: boolean; disableSortBy?: boolean };

export interface RowspanCell
{
    // no icon if undefined or null
    expanded?: boolean;
    // 0 is hidden, 1 is default
    rowSpan?: number;
    value: any;
}

interface RowspanTableProps
{
    cells: RowspanCell[][];
    columnSort?: ColumnSortDetail | null;
    columns: RowspanColumn[];
    // TODO it is not testKey
    onExpandToggle?: (testKey: string) => void;
    setColumnSort?: (columnID: string) => void;
}

function RowspanTable(props: RowspanTableProps) // tslint:disable-line
{
    const columns = React.useMemo<Column[]>(() => props.columns, [props.columns]);
    const data = React.useMemo<RowspanCell[][]>(() => props.cells, [props.cells, props.columns]);
    const table = useTable({
        columns,
        data,
        // Typescript definitions do not include these names
        // @ts-ignore
        disableMultiSort: true
    }, useSortBy);

    function isGroupRows(): boolean
    {
        if (!props.columnSort)
        {
            return true;
        }
        const accessor = props.columnSort.columnID;
        const column = columns.find(column => column.accessor === accessor);
        return column && column['groupRows'];
    }

    function onClick(testKey: string)
    {
        props.onExpandToggle && props.onExpandToggle(testKey);
    }

    function renderCell(cell: Cell<{}>, rowSpan: number)
    {
        if (isGroupRows() && cell.column['groupRows'])
        {
            if (rowSpan > 0)
            {
                return (
                    <td {...cell.getCellProps()} rowSpan={rowSpan}>
                        {props.onExpandToggle &&
                        <span className={classNames('cp-RowspanTable-expandArrow', 'p-row-toggler-icon', 'pi',
                            'pi-fw', 'p-clickable',
                            { 'pi-chevron-right': !cell.value.expanded, 'pi-chevron-down': cell.value.expanded })}
                            onClick={() => onClick(cell.value.value)} />}
                        {cell.render('Cell')}
                    </td>
                );
            }
            else
            {
                return null;
            }
        }
        else
        {
            return (
                <td {...cell.getCellProps()}>
                    {cell.render('Cell')}
                </td>
            );
        }
    }

    function renderRow(row: Row<{}>)
    {
        // accessor is not actually of type Accessor, rather it is actually of type string
        // @ts-ignore
        const rowSpanColumnKey: string = props.columns[0].accessor;
        const rowSpan: number = row.original[rowSpanColumnKey]['rowSpan'];
        table.prepareRow(row);
        return (
            <tr className={classNames({ 'p-rowgroup-header': rowSpan > 0 })}>
                {row.cells.map(cell => renderCell(cell, rowSpan))}
            </tr>
        );
    }

    function renderSortIndicatorIcon(column: HeaderGroup<{}>): React.ReactNode
    {
        // Typescript definitions do not include these names
        // @ts-ignore
        const canSort = column.canSort && props.setColumnSort;
        // TODO icon arrow colour and spacing
        return (
            <i className={classNames({
                'pi pi-sort': canSort && (!props.columnSort || (props.columnSort.columnID !== column.id)),
                'pi pi-sort-down': canSort && props.columnSort && (props.columnSort.sortOrder === -1)
                    && (props.columnSort.columnID === column.id),
                'pi pi-sort-up': canSort && props.columnSort && (props.columnSort.sortOrder === 1)
                    && (props.columnSort.columnID === column.id)
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
                    // Typescript definitions do not include these names
                    // @ts-ignore
                    const canSort = column.canSort && props.setColumnSort;
                    return (
                        <th className={classNames({
                            'p-highlight': props.columnSort && (props.columnSort.columnID === column.id),
                            'p-sortable-column': canSort
                        })}
                            // Typescript definitions do not include these names
                            // @ts-ignore
                            {...column.getHeaderProps(column.getSortByToggleProps())}
                            onClick={() => canSort && props.setColumnSort(column.id)}
                        >
                            {renderHeaderCell(column)}
                        </th>
                    );
                })}
            </tr>
        );
    }

    return (
        <div className="p-datatable cp-RowspanTable">
            <table {...table.getTableProps()}>
                <thead className="p-datatable-thead">
                {table.headerGroups.map(renderHeader)}
                </thead>
                <tbody className="p-datatable-tbody" {...table.getTableBodyProps()}>
                {table.rows.map((row) => renderRow(row))}
                </tbody>
            </table>
        </div>
    );
}

export default RowspanTable;
