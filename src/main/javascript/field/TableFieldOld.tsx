import classNames from 'classnames';
import {autobind} from 'core-decorators';
import lodash from 'lodash';
import ErrorBoundary from 'main/component/ErrorBoundary';
import TableData, {TableRow} from 'main/data/TableData';
import FieldFactory from 'main/field/FieldFactory';
import TableFieldContext from 'main/field/TableFieldContext';
import TableFieldMinimumWidthVisitor from 'main/field/TableFieldMinimumWidthVisitor';
import TableFieldOldColumnSortVisitor from 'main/field/TableFieldOldColumnSortVisitor';
import FieldStateUtility from 'main/utility/FieldStateUtility';
import {toNativeArray} from 'main/utility/MobxUtility';
import {action, observable, runInAction, toJS} from 'mobx';
import {observer} from 'mobx-react';
import {Button} from 'primereact/button';
import {Column} from 'primereact/column';
import {DataTable} from 'primereact/datatable';
import React from 'react';
import FieldEditState from 'smarthealth-javascript/FieldEditState';
import FormField from 'smarthealth-javascript/FormField';
import FormFieldTable from 'smarthealth-javascript/FormFieldTable';
import BaseFieldOld, {BaseFieldOldProps} from './BaseFieldOld';

/**
 * Generate table dynamically based on Form Description.
 *
 * Note:
 * Auto width (not fillWidth) table that is scrollable may cause misalignment issues with table header and table body.
 *
 * @author Thompson 10/05/2019
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2019
 */
export type OnFilterChange = (event) => void;

export interface TableColumnFilter
{
    columnFieldID: string;
    filterElementRenderer?: (value: string, onFilterChange: OnFilterChange) => React.ReactElement;
    filterMatchMode: FilterMatchMode;
}

interface TableFieldProps extends BaseFieldOldProps<FormFieldTable, TableData>
{
    canRemoveRow?: (tableRow: TableRow) => Promise<boolean>;
    columnFilters?: TableColumnFilter[];
    createTableRow?: () => TableRow | Promise<TableRow>;
    // TODO not needed yet, will need to re-evaluate functionality
    // doRowDoubleClick?: (selection: TableRow) => void;
    doSelectionChange?: (selection: TableRow) => void;
    isRemoveButtonDisabled?: (tableData: TableData) => boolean;
}

export enum FilterMatchMode
{
    StartsWith = 'startsWith',
    Contains = 'contains',
    EndsWidth = 'endsWidth',
    Equals = 'equals',
    NotEquals = 'notEquals',
    In = 'in',
    Custom = 'custom'
}

@observer
class TableFieldOld extends BaseFieldOld<FormFieldTable, TableData, TableFieldProps>
{
    public static MINIMUM_COLUMN_HEADER_HEIGHT_EX: number = 4.2023;

    // 46px is the CHOSEN height of table row in edit mode.
    // Because, table row with DateTimeField, NumberField, SelectionField, TextField and ValueSet are naturally 46px
    // high. Which contain the most fields.
    // 44px - MedicalGroupFieldOld, MemberField and MemberOrMedicalGroupField.
    // 34px - BooleanField.
    // 1ex equals 7.5px (in table). This was calculated by adding 3 divs of height 1ex, 2ex and 3ex in a cell. When
    // viewed in the browser inspector all 3 div height was an average of 7.5px. When this same calculation was done
    // outside of the table, 1ex equaled 8.5666px. They both have the same font-size of 14 and font-family: "Open
    // Sans", "Helvetica Neue", sans-serif.
    // Conversion, 1ex = 7.5px, 46px / 7.5px = 6.1333ex.
    public static readonly ROW_MIN_HEIGHT_EDIT_MODE_EX: number = 6.1333;

    // 32px is the CHOSEN height of table row in view mode.
    // Because, table row with font-size of 14 had a natural row height of 32px high.
    // 1ex equals 7.5px (in table). This was calculated by adding 3 divs of height 1ex, 2ex and 3ex in a cell. When
    // viewed in the browser inspector all 3 div height was an average of 7.5px. When this same calculation was done
    // outside of the table, 1ex equaled 8.5666px. They both have the same font-size of 14 and font-family: "Open
    // Sans", "Helvetica Neue", sans-serif.
    // Conversion, 1ex = 7.5px (in table), 32px / 7.5px = 4.2666ex
    public static readonly ROW_MIN_HEIGHT_VIEW_MODE_EX: number = 4.2666;

    @observable
    private columnFilterValues: { [columnFieldID: string]: string };

    private scrollable: boolean = !!this.props.field.layoutRows;

    @observable
    private selection: TableRow;

    private tableRef;

    constructor(props)
    {
        super(props);
        if (this.props.columnFilters)
        {
            const initialColumnFilterValues = {};
            this.props.columnFilters.forEach(
                columnFilter => initialColumnFilterValues[columnFilter.columnFieldID] = null);
            this.columnFilterValues = initialColumnFilterValues;
        }
    }

    public componentDidUpdate(prevProps: Readonly<TableFieldProps>, prevState: Readonly<{}>, snapshot?: any): void
    {
        if ((!prevProps.editing && this.props.editing) || (prevProps.editing && !this.props.editing))
        {
            runInAction(() => this.selection = null);
        }
    }

    protected classNames(): string
    {
        const { field } = this.props;
        return classNames(
            super.classNames(),
            {
                'cp-tablefield-autolayout': !field.layout || !field.layout.fillWidth,
                'cp-tablefield-fillHeight': field.layout && field.layout.fillHeight
            }
        );
    }

    private findRowIndex(rowData): number
    {
        return this.props.value.findIndex((rowValue) =>
        {
            return rowData === rowValue;
        });
    }

    private generateActionButtons(): React.ReactNode
    {
        if (this.props.field.fixedRows || FieldStateUtility.isReadOnly(this.props.fieldState)
            || !this.props.editing)
        {
            return null;
        }
        else
        {
            const buttonDisabled = this.props.isRemoveButtonDisabled
                ? this.props.isRemoveButtonDisabled(this.props.value)
                : !this.selection;
            return (
                <div className="is-buttons-with-gaps">
                    <Button label="Add" onClick={this.onAddRow} />
                    <Button disabled={buttonDisabled} label="Remove" onClick={this.onClickRemoveRow} />
                </div>
            );
        }
    }

    private generateCell(rowData, column, columnField): React.ReactNode
    {
        // propagate readOnly from table description to field description
        const newColumnField = FieldStateUtility.isReadOnly(this.props.fieldState)
            ? {
                ...columnField,
                state: { editState: FieldEditState.ReadOnly }
            }
            : columnField;
        // columnField is able to extract nested value with nested ID format

        // const isTableReadOnly = this.props.fieldState.editState === FieldEditState.ReadOnly;
        const columnContext = TableFieldContext.build(this.props.context, newColumnField);
        return (
            /**
             * span wrapper with onClick is a workaround since PrimeReact DataTable TableBody onRowClick() doesn't
             * invoke if element clicked is an 'input', 'button' or 'a' tag. Therefore, we could not get row to
             * select if input field was selection
             * https://github.com/primefaces/primereact/blob/master/src/components/datatable/TableBody.js
             */
            <span onClick={() => this.onSelectionChange({ value: rowData })}>
                <ErrorBoundary message={`Error with column ${columnField.id}`}>
                    <FieldFactory context={columnContext}
                        // TODO work out how to handle this:
                        //  fieldState={isTableReadOnly ? this.props.fieldState : columnField.state}
                        onFieldChange={(value, field) => this.onFieldChange(value, field, rowData)}
                        data={rowData} />
                </ErrorBoundary>
            </span>
        );
    }

    private generateColumns(): React.ReactNode
    {
        const { field } = this.props;

        const tableFieldMinimumWidthVisitor = new TableFieldMinimumWidthVisitor();
        const columnsInTable = field.columns.filter(
            (columnField: FormField) => FieldStateUtility.isVisible(this.props.editing, columnField.state));
        return columnsInTable.map(columnField =>
        {
            const columnSortFunction = TableFieldOldColumnSortVisitor.accept(columnField);

            const columnFilter = this.props.columnFilters && this.props.columnFilters.find(
                columnFilter => columnFilter.columnFieldID === columnField.id);
            const filterElement = columnFilter && columnFilter.filterElementRenderer(
                this.columnFilterValues[columnField.id],
                (event) => this.onFilterChange(columnField.id, event.target.value,
                    columnFilter.filterMatchMode));

            const fieldColumnWidth = tableFieldMinimumWidthVisitor.accept(columnField);
            // Since TableRow has CSS property box-sizing: border-box
            // We need to include the padding in with our columnWidth
            // https://developer.mozilla.org/en-US/docs/Web/CSS/box-sizing
            const horizontalTableCellPaddingEM = 1 + 1;
            const columnWidthWithPadding = fieldColumnWidth + horizontalTableCellPaddingEM;
            return <Column body={(rowData, col) => this.generateCell(rowData, col, columnField)} field={columnField.id}
                header={columnField.label} key={columnField.id}
                sortable={this.props.field.sortable && !!columnSortFunction}
                sortFunction={(event) => columnSortFunction && this.sortFunction(event, columnSortFunction)}
                style={{ width: `${columnWidthWithPadding}em` }} filter={!!columnFilter}
                filterElement={filterElement} />;
        });
    }

    private generateScrollHeightEx(): number
    {
        if (!this.scrollable)
        {
            return null;
        }
        else if (this.props.editing)
        {
            return TableFieldOld.ROW_MIN_HEIGHT_EDIT_MODE_EX * this.props.field.layoutRows;
        }
        else
        {
            return TableFieldOld.ROW_MIN_HEIGHT_VIEW_MODE_EX * this.props.field.layoutRows;
        }
    }

    @autobind
    private async onAddRow()
    {
        const row: TableRow = this.props.createTableRow ? await this.props.createTableRow() : {};
        if ((row === null) || (row === undefined))
        {
            // Don't add row
            return;
        }

        const newTable = this.props.value
            // assumption to add new row at the end of table
            ? [...this.props.value, row]
            : [row];
        this.props.onFieldChange(newTable, this.props.field);
    }

    // TODO not needed yet, will need to re-evaluate functionality
    // @autobind
    // private onRowDoubleClick()
    // {
    //     if (this.props.doRowDoubleClick)
    //     {
    //         this.props.doRowDoubleClick(this.selection);
    //     }
    // }

    @autobind
    private async onClickRemoveRow()
    {
        if (this.props.canRemoveRow)
        {
            const remove = await this.props.canRemoveRow(this.selection);
            remove && this.removeRow();
        }
        else
        {
            this.removeRow();
        }
    }

    private onFieldChange(value, field, rowData): void
    {
        const rowIndex: number = this.findRowIndex(rowData);
        if ((rowIndex !== -1) && !this.props.disabled)
        {
            const newTableData = lodash.cloneDeep(toJS(this.props.value));
            newTableData[rowIndex][field.id] = value;
            this.props.onFieldChange(newTableData, this.props.field);
        }
    }

    @action.bound
    private onFilterChange(columnFieldID: string, value: string, filterMatchMode: FilterMatchMode)
    {
        // set column filter to allow custom column filter to render filter value
        this.columnFilterValues[columnFieldID] = value;
        // Invoke PrimeReact Table to filter column
        this.tableRef.filter(value, columnFieldID, filterMatchMode);
    }

    @action.bound
    private onSelectionChange(e): void
    {
        if (this.selection !== e.value)
        {
            this.selection = e.value;

            if (this.props.doSelectionChange)
            {
                this.props.doSelectionChange(this.selection);
            }
        }
    }

    @action.bound
    private removeRow(): void
    {
        const foundIndex: number = this.findRowIndex(this.selection);
        if (foundIndex !== -1)
        {
            const newValue = [...this.props.value];
            newValue.splice(foundIndex, 1);
            this.props.onFieldChange(newValue, this.props.field);
            this.selection = null;
        }
    }

    protected renderEditing(): React.ReactNode
    {
        const columns = this.generateColumns();
        const isTableInvalid = FieldStateUtility.isMandatory(this.props.fieldState)
            && (!this.props.value || (this.props.value.length === 0));
        return (
            <div className={classNames('cp-tablefield', {
                'is-invalid': isTableInvalid
            })}>
                <DataTable className={this.classNames()} columnResizeMode="expand" compareSelectionBy="equals"
                    onSelectionChange={this.onSelectionChange}
                    // Note: check onRowDoubleClick method comment
                    // onRowDoubleClick={this.onRowDoubleClick}
                    ref={(el) => this.tableRef = el} resizableColumns={true} scrollable={this.scrollable}
                    scrollHeight={`${this.generateScrollHeightEx()}ex`} selection={this.selection}
                    selectionMode="single"
                    style={{
                        minHeight: `${this.generateScrollHeightEx() + TableFieldOld.MINIMUM_COLUMN_HEADER_HEIGHT_EX}ex`
                    }}
                    value={toNativeArray(this.props.value)}>
                    {columns}
                </DataTable>
                <div className="cp-tablefield-footer">
                    {this.generateActionButtons()}
                </div>
            </div>
        );
    }

    protected renderValue(): React.ReactNode
    {
        const columns = this.generateColumns();

        return (
            <DataTable className={this.classNames()} columnResizeMode="expand" compareSelectionBy="equals"
                onSelectionChange={this.onSelectionChange}
                // Note: check onRowDoubleClick method comment
                // onRowDoubleClick={this.onRowDoubleClick}
                ref={(el) => this.tableRef = el} resizableColumns={true} scrollable={this.scrollable}
                scrollHeight={`${this.generateScrollHeightEx()}ex`} selection={this.selection}
                selectionMode={this.props.field.rowSelectionInViewMode && 'single'}
                value={toNativeArray(this.props.value)}>
                {columns}
            </DataTable>
        );
    }

    private sortFunction(event, columnSortFunction): any[]
    {
        if (event.field)
        {
            return columnSortFunction(event.field, event.order, this.props.value);
        }
        else
        {
            return this.props.value;
        }
    }
}

export default TableFieldOld;
