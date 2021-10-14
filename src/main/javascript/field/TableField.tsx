import {css} from '@emotion/core';
import lodash from 'lodash';
import {background, colour, field, font, table} from 'main/application/ThemeConstants';
import ColumnSortButton, {SortOrder} from 'main/component/ColumnSortButton';
import ErrorBoundary from 'main/component/ErrorBoundary';
import IconButton from 'main/component/IconButton';
import TableData, {TableRow} from 'main/data/TableData';
import BaseField from 'main/field/BaseField';
import FieldFactory from 'main/field/FieldFactory';
import TableFieldColumnSortVisitor from 'main/field/TableFieldColumnSortVisitor';
import TableFieldContext from 'main/field/TableFieldContext';
import TableFieldMinimumWidthVisitor from 'main/field/TableFieldMinimumWidthVisitor';
import FieldStateUtility from 'main/utility/FieldStateUtility';
import FormDataUtility from 'main/utility/FormDataUtility';
import RowTracker from 'main/utility/RowTracker';
import {border, px} from 'main/utility/StyleUtility';
import {action, observable, runInAction} from 'mobx';
import {observer} from 'mobx-react';
import React from 'react';
import FormField from 'smarthealth-javascript/FormField';
import FormFieldTable from 'smarthealth-javascript/FormFieldTable';

/**
 * A form field that is a table
 *
 * @author Thompson 10/05/2019
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2019
 */
const tableStyle = css({
    border: table.border,
    borderCollapse: 'separate',
    borderSpacing: 0,
    backgroundColor: colour.white,
    margin: px(2, 8),
    textAlign: 'left',
    'thead tr': {
        th: {
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
        td: {
            padding: 0
        }
    }
});

const tableMissingMandatoryStyle = css(tableStyle, {
    border: field.borderInvalid
});

const placeholderStyle = css({
    color: colour.placeholder,
    font: font.text,
    minHeight: px(field.heightPx - 4),
    padding: px(field.viewPaddingHeightPx, field.viewPaddingWidthPx)
});

@observer
class TableField extends BaseField<FormFieldTable, TableData>
{
    @observable
    private rowTracker: RowTracker;

    @observable
    private sortOrders: { [id: string]: SortOrder } = {};

    /**
     * If the table is sorted this maps from row in the UI to row in the data
     */
    @observable
    private sortedOrder: number[];

    public constructor(props)
    {
        super(props);
        this.rowTracker = new RowTracker(props.value ? props.value.length : 0);
    }

    private get visibleColumns(): FormField[]
    {
        return this.field.columns.filter(column => FieldStateUtility.isVisible(this.editing, column.state));
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
    private onAddRow()
    {
        const row = {};
        this.visibleColumns.forEach(column => FormDataUtility.set(row, column, null));
        if (lodash.isNil(this.props.value))
        {
            this.onValueChange([row]);
        }
        else
        {
            this.onValueChange([row, ...this.props.value]);
        }
        this.rowTracker.insert(0);
        if (this.sortedOrder)
        {
            this.sortedOrder = this.sortedOrder.map(rowIndex => rowIndex + 1);
        }
        // TODO set focus to first field in the row
    }

    @action.bound
    private onCellChange(row: TableRow, value: any, column: FormField)
    {
        FormDataUtility.set(row, column, value);
    }

    @action.bound
    private onRemoveRow(rowNumber: number)
    {
        this.props.value.splice(rowNumber, 1);
        this.rowTracker.remove(rowNumber);
        this.resort();
    }

    @action.bound
    private onSortOrder(newSort: SortOrder, column: FormField)
    {
        this.sortOrders = { [column.id]: newSort };
        this.resort();
    }

    private renderCell(row: TableRow, column: FormField)
    {
        const cellContext = TableFieldContext.build(this.props.context, column);
        return (
            <ErrorBoundary>
                <FieldFactory context={cellContext} data={row}
                    onFieldChange={(value, field) => this.onCellChange(row, value, column)} />
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

    protected renderEditing(): React.ReactNode
    {
        const missingMandatory = this.editing && this.mandatory
            && this.props.context.formContext.validateIncludeMandatory && lodash.isEmpty(this.props.value);
        const showButtons = !this.readOnly && !this.field.fixedRows;

        return (
            <table css={missingMandatory ? tableMissingMandatoryStyle : tableStyle}>
                {this.renderHeaders(showButtons)}
                <tbody>
                {this.renderRows(showButtons)}
                </tbody>
            </table>
        );
    }

    private renderHeaders(showAddButton: boolean): React.ReactNode
    {
        return (
            <thead>
            <tr>
                {this.visibleColumns.map(column => this.renderCellHeader(column))}
                {showAddButton &&
                <th style={{ padding: px(4, 4) }}>
                    <IconButton icon="add" toolTip="Add row" small={true} onClick={() => this.onAddRow()} />
                </th>
                }
            </tr>
            </thead>
        );
    }

    private renderRemoveButton(rowNumber: number)
    {
        return (
            <td style={{ padding: px(4, 4) }}>
                <IconButton icon="cross" toolTip="Remove row" small={true}
                    onClick={() => this.onRemoveRow(rowNumber)} />
            </td>
        );
    }

    private renderRow(row: TableRow, rowNumber: number, showRemoveButton: boolean)
    {
        const padding = this.editing ? px(0, 2) : 0;
        return (
            <tr key={this.rowTracker.getKey(rowNumber)}>
                {this.visibleColumns.map(column => <td style={{ padding }}>{this.renderCell(row, column)}</td>)}
                {showRemoveButton && this.renderRemoveButton(rowNumber)}
            </tr>
        );
    }

    private renderRows(showRemoveButtons: boolean): React.ReactNode
    {
        if (!this.props.value || lodash.isEmpty(this.props.value))
        {
            return (
                <tr>
                    <td colSpan={this.visibleColumns.length + (showRemoveButtons ? 1 : 0)}>
                        <div css={placeholderStyle}>{this.placeholder}</div>
                    </td>
                </tr>
            );
        }
        else if (this.sortedOrder)
        {
            return this.sortedOrder.map(
                rowNumber => this.renderRow(this.props.value[rowNumber], rowNumber, showRemoveButtons)
            );
        }
        else
        {
            return this.props.value.map(
                (row, rowNumber) => this.renderRow(row, rowNumber, showRemoveButtons)
            );
        }
    }

    protected renderView(): React.ReactNode
    {
        return (
            <table css={tableStyle}>
                {this.renderHeaders(false)}
                <tbody>
                {this.renderRows(false)}
                </tbody>
            </table>
        );
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

export default TableField;
