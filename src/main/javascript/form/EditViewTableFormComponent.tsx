import {css} from '@emotion/core';
import {autobind} from 'core-decorators';
import lodash from 'lodash';
import LOG from 'loglevel';
import {form} from 'main/application/ThemeConstants';
import Button from 'main/component/Button';
import ErrorBoundary from 'main/component/ErrorBoundary';
import ButtonBar from 'main/container/ButtonBar';
import TableData, {TableRow} from 'main/data/TableData';
import AbandonChangesDialog from 'main/dialog/AbandonChangesDialog';
import MandatoryOrInvalidFieldDialog from 'main/dialog/MandatoryOrInvalidFieldDialog';
import FieldContext from 'main/field/FieldContext';
import FieldFactory from 'main/field/FieldFactory';
import TableFieldOldColumnSortVisitor from 'main/field/TableFieldColumnSortVisitor';
import TableFieldContext from 'main/field/TableFieldContext';
import {customFieldRendererAdapter, OnFieldChange} from 'main/form/CustomFieldRenderer';
import FieldStateEvaluator, {FieldStates} from 'main/form/FieldStateEvaluator';
import FieldValidator from 'main/form/FieldValidator';
import FormComponent from 'main/form/FormComponent';
import FormContext from 'main/form/FormContext';
import StoreProps from 'main/store/StoreProps';
import AutoCloser from 'main/utility/AutoCloser';
import FormDataUtility from 'main/utility/FormDataUtility';
import FormDescriptionUtility from 'main/utility/FormDescriptionUtility';
import {action, observable, runInAction, toJS} from 'mobx';
import {inject, observer} from 'mobx-react';
import {Column} from 'primereact/column';
import {DataTable} from 'primereact/datatable';
import React from 'react';
import EntityData from 'smarthealth-javascript/EntityData';
import FieldState from 'smarthealth-javascript/FieldState';
import FormDescription from 'smarthealth-javascript/FormDescription';
import FormField from 'smarthealth-javascript/FormField';
import FormFieldOrSection from 'smarthealth-javascript/FormFieldOrSection';
import FormFieldTable from 'smarthealth-javascript/FormFieldTable';
import FormFieldType from 'smarthealth-javascript/FormFieldType';
import PatientPAS from 'smarthealth-javascript/PatientPAS';

/**
 * Display a list of data in a Table to be selected. Selected table row is displayed for Viewing and editing.
 *
 * @author Thompson 2/10/2019
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2019
 */
interface EditViewTableFormComponentProps extends StoreProps
{
    // body description for the Form section of EditViewTableFormComponent
    bodyFormDescription: FormDescription;
    data: EntityData;
    // header description for the Table section. Laid above props.bodyFormDescription
    headerFormDescription: FormDescription;
    onEdit?: () => boolean | Promise<boolean>;
    // if defined creates a new row for the table
    onNewRow?: () => TableRow;
    onSave: (editData) => boolean | Promise<boolean>;
    pas?: PatientPAS;
    // ability to inject a custom ReactNode when a form is displayed
    renderBodyFormIndicator?: (rowData: TableRow) => React.ReactNode;
}

const divStyle = css({
    display: 'grid',
    gridTemplateColumns: '1fr',
    gridTemplateRows: `1fr 2fr ${form.buttonBarHeight}`
});

@inject('appStore')
@observer
class EditViewTableFormComponent extends React.Component<EditViewTableFormComponentProps>
{
    private autoCloser = new AutoCloser();

    @observable
    private bodyFieldStates: FieldStates;

    @observable
    private editData: EntityData;

    @observable
    private editing: boolean;

    private readonly fieldValidator: FieldValidator;

    @observable
    private readonly headerFieldStates: FieldStates;

    @observable
    private selectionIndex: number;

    private tableID: string;

    private readonly headerFormCustomFields = {
        [this.tableID]: customFieldRendererAdapter(this.renderTable)
    };

    private headerFormContext: FormContext = FormContext.build(this.props.appStore, this.props.headerFormDescription,
        this.headerFormCustomFields);

    constructor(props)
    {
        super(props);
        this.checkHeaderDescription();
        this.tableID = this.props.headerFormDescription.fieldsAndSections[0].field.id;
        this.editData = this.cloneDeep(this.props.data);
        this.populateTableData();
        this.selectionIndex = null;
        this.fieldValidator = new FieldValidator(this.props.appStore.i18nStore);
        this.headerFieldStates = FieldStateEvaluator.extractInitialFieldStates(this.props.headerFormDescription);
        this.bodyFieldStates = FieldStateEvaluator.extractInitialFieldStates(this.props.bodyFormDescription);
    }

    private get tableData(): TableData
    {
        return this.editData[this.tableID];
    }

    private set tableData(dataList: TableData)
    {
        this.editData[this.tableID] = dataList;
    }

    public componentDidMount()
    {
        this.createAutomaticFieldStateEvaluators();
    }

    public componentDidUpdate(prevProps): void
    {
        if ((this.props.data !== prevProps.data) && !this.editing)
        {
            runInAction(() => this.editData = this.cloneDeep(this.props.data));
            this.populateTableData();
        }

        if (this.props.headerFormDescription !== prevProps.tableFormDescription)
        {
            this.tableID = this.props.headerFormDescription.fieldsAndSections[0].field.id;
        }
    }

    public componentWillUnmount()
    {
        this.autoCloser.onUnmount();
    }

    private checkHeaderDescription(): void
    {
        const tableField: FormFieldOrSection = this.props.headerFormDescription.fieldsAndSections[0];
        if (!tableField.field || (tableField.field.type !== FormFieldType.Table))
        {
            throw Error(
                `First field in HeaderDescription ${this.props.headerFormDescription.id} must be a FormFieldType.Table.`
            );
        }
    }

    private cleanTableData(data: TableData): TableData
    {
        const dataCleaned = data.map((row) => this.removeNullAndEmptyFields(row));
        return dataCleaned.filter((row) => row !== null);
    }

    private cloneDeep(data: EntityData): EntityData
    {
        return lodash.cloneDeep(toJS(data)) || {};
    }

    private createAutomaticFieldStateEvaluators()
    {
        const allFields = FormDescriptionUtility.allFields(this.props.headerFormDescription);
        allFields.forEach(field =>
        {
            if (field.fieldIf)
            {
                this.autoCloser.createMobXAutorun(() =>
                    FieldStateEvaluator.updateFieldState(this.headerFormContext, field, this.editData));
            }
        });
    }

    private createObservableRowWithAllFields(tableRow: TableRow): TableRow
    {
        const newTableRow = lodash.cloneDeep(tableRow);
        FormDataUtility.populateMissingFieldsWithNulls(newTableRow,
            this.props.bodyFormDescription.fieldsAndSections);
        return observable(newTableRow);
    }

    private displayInvalidFormDialog()
    {
        this.props.appStore.componentStore.modalDialog.show(<MandatoryOrInvalidFieldDialog />);
    }

    private hasChanged(data: EntityData, editData: EntityData): boolean
    {
        const dataCleaned = this.removeNullAndEmptyFields(data);
        const editDataCleaned = this.removeNullAndEmptyFields(editData);

        return !lodash.isEqual(dataCleaned, editDataCleaned);
    }

    // We have to manually validate the table field because the table field is a readOnly field. ReadOnly fields cannot
    // be validated by FieldValidator.validate().
    private isTableDataValid(): boolean
    {
        const invalid: boolean = this.tableData.some(
            (row) => this.fieldValidator.validateForm(row, this.props.bodyFormDescription,
                this.bodyFieldStates).size > 0);
        return !invalid;
    }

    @action.bound
    private onClickAddRow(): void
    {
        if (this.selectionIndex !== null)
        {
            const invalidFields: Set<string> = this.fieldValidator.validateForm(this.tableData[0],
                this.props.bodyFormDescription, this.bodyFieldStates);
            if (invalidFields.size)
            {
                this.displayInvalidFormDialog();
                return;
            }
            else
            {
                this.selectionIndex = null;
            }
        }

        const newRow = this.props.onNewRow ? this.props.onNewRow() : {};
        const newRowWithAllFields = this.createObservableRowWithAllFields(newRow);
        this.tableData.unshift(newRowWithAllFields);

        this.onSelectionChange({ value: newRowWithAllFields });
    }

    @action.bound
    private onClickCancel(): void
    {
        if (this.hasChanged(this.props.data, this.editData))
        {
            this.props.appStore.componentStore.modalDialog.show(
                <AbandonChangesDialog onAbandon={() =>
                {
                    runInAction(() =>
                    {
                        this.editing = false;
                        this.editData = this.cloneDeep(this.props.data);
                        this.populateTableData();
                        this.selectionIndex = null;
                    });
                }} />
            );
        }
        else
        {
            this.editing = false;
            this.editData = this.cloneDeep(this.props.data);
            this.populateTableData();
            this.selectionIndex = null;
        }
    }

    @action.bound
    private onClickEdit(): void
    {
        if (!this.props.onEdit)
        {
            this.editing = true;
            return;
        }

        const result = this.props.onEdit();
        if (result instanceof Promise)
        {
            result.then((value: boolean) =>
            {
                runInAction(() =>
                {
                    this.editing = value;
                });
            });
        }
        else if (result)
        {
            this.editing = result;
        }
    }

    @action.bound
    private onClickRemoveRow(): void
    {
        this.tableData.splice(this.selectionIndex, 1);
        this.selectionIndex = null;
    }

    @action.bound
    private async onClickSave(): Promise<void>
    {
        const invalidFields: Set<string> = this.fieldValidator.validateForm(this.editData,
            this.props.headerFormDescription, this.headerFieldStates);
        if (this.isTableDataValid() && (invalidFields.size === 0))
        {
            const newTableData = this.prepareForServer(this.tableData);
            const newData = {
                ...toJS(this.editData),
                [this.tableID]: newTableData
            };
            const result = this.props.onSave(newData);
            if (result instanceof Promise)
            {
                const success = await result;
                if (success)
                {
                    runInAction(() =>
                    {
                        this.editing = false;
                        this.selectionIndex = null;
                    });
                }
            }
            else if (result)
            {
                this.editing = false;
                this.selectionIndex = null;
            }
        }
        else
        {
            LOG.info(`Fields in error: ${Array.from(invalidFields)
                .join(', ')}`);
            this.displayInvalidFormDialog();
        }
    }

    @action.bound
    private onSelectionChange(e)
    {
        if (this.selectionIndex !== null)
        {
            const invalidFields: Set<string> = this.fieldValidator.validateForm(this.tableData[this.selectionIndex],
                this.props.bodyFormDescription, this.bodyFieldStates);
            if (invalidFields.size > 0)
            {
                this.displayInvalidFormDialog();
                return;
            }
        }
        const rowSelectedIndex = this.tableData.findIndex(row => row === e.value);
        this.selectionIndex = (rowSelectedIndex === -1) ? null : rowSelectedIndex;
    }

    @action
    private populateTableData()
    {
        if (this.tableData)
        {
            this.tableData = this.tableData.map(
                (tableRow: TableRow) => this.createObservableRowWithAllFields(tableRow));
        }
        else
        {
            this.tableData = [];
        }
    }

    private prepareForServer(editedTableData: TableData): TableData
    {
        const newTableData: TableData = lodash.cloneDeep(toJS(editedTableData))
            .map((tableRow: TableRow, index: number) =>
            {
                if ((this.props.data[this.tableID] && (index < this.props.data[this.tableID].length))
                    && this.hasChanged(this.props.data[this.tableID][index], tableRow)
                    // @ts-ignore
                    && tableRow.sourcePASID)
                {
                    // @ts-ignore
                    delete tableRow.sourcePASID;
                }
                return tableRow;
            });

        return this.cleanTableData(newTableData);
    }

    private removeNullAndEmptyFields(data: EntityData): EntityData
    {
        return FormDataUtility.prepareObjectForServer(toJS(data));
    }

    public render()
    {
        return (
            <div css={divStyle}>
                {this.renderHeader()}
                <div>
                    {(this.selectionIndex !== null) && (
                        <>
                            {this.props.renderBodyFormIndicator && this.props.renderBodyFormIndicator(
                                this.tableData[this.selectionIndex])}
                            {this.renderBody()}
                        </>
                    )}
                </div>
                {this.renderButtons()}
            </div>
        );
    }

    private renderBody(): React.ReactNode
    {
        const formContext = FormContext.build(this.props.appStore, this.props.bodyFormDescription);
        formContext.editing = this.editing;
        return <FormComponent context={formContext} data={this.tableData[this.selectionIndex]} />;
    }

    private renderButtons(): React.ReactNode
    {
        if (this.editing)
        {
            return (
                <ButtonBar>
                    <Button title="Add" onClick={this.onClickAddRow} />
                    <Button disabled={this.selectionIndex === null} title="Remove" onClick={this.onClickRemoveRow} />
                    <Button title="Save" onClick={this.onClickSave} />
                    <Button title="Cancel" onClick={this.onClickCancel} />
                </ButtonBar>
            );
        }
        else
        {
            return (
                <ButtonBar>
                    <Button title="Edit" onClick={this.onClickEdit} />
                </ButtonBar>
            );
        }
    }

    private renderColumnField(tableContext: FieldContext, field: FormField, rowData: any)
    {
        const context = TableFieldContext.build(tableContext, field);
        return (
            <ErrorBoundary message={`Error with column ${field.id}`}>
                <FieldFactory context={context} data={rowData} onFieldChange={null} />
            </ErrorBoundary>
        );
    }

    private renderHeader(): React.ReactNode
    {
        this.headerFormContext.editing = this.editing;
        return <FormComponent context={this.headerFormContext} data={this.editData} />;
    }

    /*
     * TODO can we integrate TableField so that we can use it here? Problem with TableField is it manages selection
     * internally.
     */
    @autobind
    private renderTable(field: FormField, value: any, editing: boolean, disabled: boolean, valid: boolean,
        onFieldChange: OnFieldChange, context: FieldContext, fieldValidator: FieldValidator, data: TableData,
        fieldState: FieldState)
    {
        const table: FormFieldTable = this.props.headerFormDescription.fieldsAndSections[0].field as FormFieldTable;

        return (
            <DataTable compareSelectionBy={'equals'} onSelectionChange={this.onSelectionChange} selectionMode="single"
                selection={this.tableData[this.selectionIndex]} value={toJS(this.tableData)}>
                {
                    table.columns.map((columnField, index) =>
                    {
                        const columnSortFunction = TableFieldOldColumnSortVisitor.accept(columnField);
                        return <Column body={(rowData) => this.renderColumnField(context, columnField, rowData)}
                            field={columnField.id} header={columnField.label} key={columnField.id}
                            sortable={!!columnSortFunction}
                            sortFunction={(event) => this.sortFunction(event, columnSortFunction)}
                        />;
                    })
                }
            </DataTable>
        );
    }

    private sortFunction(event, columnSortFunction): any[]
    {
        if (event.field && columnSortFunction)
        {
            return columnSortFunction(event.field, event.order, this.tableData);
        }
        else
        {
            return this.tableData;
        }
    }
}

export default EditViewTableFormComponent;
