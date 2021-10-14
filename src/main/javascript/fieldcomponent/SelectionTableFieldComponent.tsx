import {css} from '@emotion/core';
import lodash from 'lodash';
import {background, colour, field, font, table} from 'main/application/ThemeConstants';
import ColumnSortButton, {SortOrder} from 'main/component/ColumnSortButton';
import ErrorBoundary from 'main/component/ErrorBoundary';
import TableData, {TableRow} from 'main/data/TableData';
import FieldFactory from 'main/field/FieldFactory';
import TableFieldColumnSortVisitor from 'main/field/TableFieldColumnSortVisitor';
import TableFieldContext from 'main/field/TableFieldContext';
import TableFieldMinimumWidthVisitor from 'main/field/TableFieldMinimumWidthVisitor';
import BaseContextFieldComponent, {BaseContextFieldComponentProps} from 'main/fieldcomponent/BaseContextFieldComponent';
import FieldStateUtility from 'main/utility/FieldStateUtility';
import {border, px} from 'main/utility/StyleUtility';
import {action, observable, runInAction} from 'mobx';
import {observer} from 'mobx-react';
import React from 'react';
import FormField from 'smarthealth-javascript/FormField';
import FormFieldTable from 'smarthealth-javascript/FormFieldTable';

/**
 * Display a table define by a form field and allow selection of a row from the table.
 *
 * TODO Larry extract common table code
 *
 * @author Larry 13/01/2021
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2021
 */
interface SelectionTableFieldComponentProps extends BaseContextFieldComponentProps
{
    // text to display of the table is empty
    emptyText?: string;
    onSelection: (row: TableRow) => void;
    value: TableData;
}

const divStyle = css({
    overflow: 'auto'
});

const tableStyle = css({
    border: table.border,
    borderTop: 'none',
    borderCollapse: 'separate',
    borderSpacing: 0,
    backgroundColor: colour.white,
    textAlign: 'left',
    overflow: 'auto',
    width: '100%',
    'thead tr': {
        backgroundColor: colour.white,
        top: 0,
        position: 'sticky',
        th: {
            borderTop: table.border,
            borderBottom: table.cell.border,
            color: colour.label,
            font: font.label,
            padding: px(4, 8),
            ':not(:first-of-type)': {
                borderLeft: table.cell.border
            },
            '>span': {
                // pushes the column sort button to the right
                display: 'flex',
                justifyContent: 'space-between',
                '>span:last-of-type': {
                    marginLeft: '4px'
                }
            }
        }
    },
    'tbody tr': {
        ':nth-of-type(even)': {
            backgroundColor: background.gridRow,
            'td:not(:first-of-type)': {
                borderLeft: border(background.gridRow)
            }
        },
        ':nth-of-type(odd) td:not(:first-of-type)': {
            borderLeft: table.cell.border
        },
        ':hover': {
            backgroundColor: background.section
        },
        td: {
            font: font.text,
            padding: 0
        }
    }
});

const placeholderStyle = css({
    color: colour.placeholder,
    font: font.text,
    minHeight: px(field.heightPx - 4),
    padding: px(field.viewPaddingHeightPx, field.viewPaddingWidthPx)
});

@observer
class SelectionTableFieldComponent extends BaseContextFieldComponent<SelectionTableFieldComponentProps>
{
    @observable
    private sortOrders: { [id: string]: SortOrder } = {};

    /**
     * If the table is sorted this maps from row in the UI to row in the data
     */
    @observable
    private sortedOrder: number[];

    protected get field(): FormFieldTable
    {
        return super.field as FormFieldTable;
    }

    private get visibleColumns(): FormField[]
    {
        return this.field.columns.filter(column => FieldStateUtility.isVisible(this.editing, column.state));
    }

    public componentDidUpdate(prevProps, prevState)
    {
        if (this.props.value !== prevProps.value)
        {
            this.resort();
        }
    }

    private minWidth(column: FormField)
    {
        if (!this.editing)
        {
            return null;
        }

        const width = new TableFieldMinimumWidthVisitor().accept(column);
        return width ? `${width}em` : null;
    }

    @action.bound
    private onSortOrder(newSort: SortOrder, column: FormField)
    {
        this.sortOrders = { [column.id]: newSort };
        this.resort();
    }

    public render(): React.ReactNode
    {
        return (
            <div css={divStyle}>
                <table css={tableStyle}>
                    {this.renderHeaders(false)}
                    <tbody>
                    {this.renderRows(false)}
                    </tbody>
                </table>
            </div>
        );
    }

    private renderCell(row: TableRow, column: FormField)
    {
        const cellContext = TableFieldContext.build(this.props.context, column);
        return (
            <ErrorBoundary>
                <FieldFactory context={cellContext} data={row} onFieldChange={() => null} />
            </ErrorBoundary>
        );
    }

    private renderCellHeader(column: FormField)
    {
        return (
            <th key={column.id} style={{ minWidth: this.minWidth(column) }}>
                <span>
                    <span>
                        {column.label}
                        {column.units && <> ({column.units})</>}
                    </span>
                    {(this.field.sortable || column.sortable) && TableFieldColumnSortVisitor.accept(column) &&
                    <span>
                        <ColumnSortButton sortOrder={this.sortOrders[column.id] || SortOrder.none}
                            onClick={newSort => this.onSortOrder(newSort, column)} />
                    </span>
                    }
                </span>
            </th>
        );
    }

    private renderHeaders(showAddButton: boolean): React.ReactNode
    {
        return (
            <thead>
            <tr>
                {this.visibleColumns.map(column => this.renderCellHeader(column))}
            </tr>
            </thead>
        );
    }

    private renderRow(row: TableRow)
    {
        const padding = this.editing ? px(0, 2) : 0;
        return (
            <tr onClick={() => this.props.onSelection(row)}>
                {this.visibleColumns.map(column => <td style={{ padding }}>{this.renderCell(row, column)}</td>)}
            </tr>
        );
    }

    private renderRows(showRemoveButtons: boolean): React.ReactNode
    {
        if (!this.props.value || lodash.isEmpty(this.props.value))
        {
            return (
                <tr>
                    <td colSpan={this.visibleColumns.length}>
                        <div css={placeholderStyle}>{this.props.emptyText}</div>
                    </td>
                </tr>
            );
        }
        else if (this.sortedOrder)
        {
            return this.sortedOrder.map(rowNumber => this.renderRow(this.props.value[rowNumber]));
        }
        else
        {
            return this.props.value.map(row => this.renderRow(row));
        }
    }

    private resort()
    {
        if (!this.props.value)
        {
            return;
        }

        let sorted = this.props.value;
        let changed = false;
        this.visibleColumns.forEach(column =>
        {
            if (this.field.sortable || column.sortable)
            {
                if ((this.sortOrders[column.id] === SortOrder.up) || (this.sortOrders[column.id] === SortOrder.down))
                {
                    const sortFunction = TableFieldColumnSortVisitor.accept(column);
                    if (sortFunction)
                    {
                        sorted = sortFunction(column, this.sortOrders[column.id], sorted);
                        changed = true;
                    }
                }
            }
        });

        if (changed)
        {
            // convert the sorted value to an indirection array
            const newOrder = sorted.map(row => this.props.value.indexOf(row));
            runInAction(() => this.sortedOrder = newOrder);
        }
        else
        {
            runInAction(() => this.sortedOrder = null);
        }
    }
}

export default SelectionTableFieldComponent;
