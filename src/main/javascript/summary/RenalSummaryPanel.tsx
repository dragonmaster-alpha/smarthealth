import {autobind} from 'core-decorators';
import FieldContext from 'main/field/FieldContext';
import TableFieldOld, {FilterMatchMode, OnFilterChange, TableColumnFilter} from 'main/field/TableFieldOld';
import {customFieldRendererAdapter, OnFieldChange} from 'main/form/CustomFieldRenderer';
import FieldValidator from 'main/form/FieldValidator';
import FormComponent from 'main/form/FormComponent';
import FormContext from 'main/form/FormContext';
import {SummaryPanelProps} from 'main/summary/SummaryPanel';
import {observable} from 'mobx';
import {inject, observer} from 'mobx-react';
import {Dropdown} from 'primereact/dropdown';
import React from 'react';
import EntityData from 'smarthealth-javascript/EntityData';
import FormField from 'smarthealth-javascript/FormField';
import FormFieldTable from 'smarthealth-javascript/FormFieldTable';

/**
 * Render Renal summary with custom fields
 *
 * TODO PrimaryRenalDisease field needs a button that connects to Conditions
 *
 * @author Thompson 17/01/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
@inject('appStore')
@observer
class RenalSummaryPanel extends React.Component<SummaryPanelProps>
{
    @observable
    private readonly fieldContext: FormContext<EntityData>;

    constructor(props)
    {
        super(props);
        const customFields = {
            'AccessCarePlan.Accesses': customFieldRendererAdapter(this.accessesTableField)
        };
        this.fieldContext = FormContext.build(props.appStore, props.formDescription, customFields);
    }

    @autobind
    private accessesTableField(field: FormField, value: any, editing: boolean, disabled: boolean, valid: boolean,
        onFieldChange: OnFieldChange, context: FieldContext, fieldValidator: FieldValidator, data): React.ReactNode
    {
        const columnFilters: TableColumnFilter[] = [{
            columnFieldID: 'Dialysis',
            filterMatchMode: FilterMatchMode.Equals,
            filterElementRenderer: this.renderDialysisFilterDropdown
        }];
        return (
            <TableFieldOld context={context as FieldContext<FormFieldTable>} columnFilters={columnFilters}
                field={field as FormFieldTable} fieldValidator={fieldValidator} onFieldChange={onFieldChange}
                value={value} />
        );
    }

    public render()
    {
        return <FormComponent context={this.fieldContext} data={this.props.data} />;
    }

    private renderDialysisFilterDropdown(value: string, onFilterChange: OnFilterChange): React.ReactElement
    {
        const options = [
            { label: 'All types', value: null },
            { label: 'Haemodialysis', value: 'Haemodialysis' },
            { label: 'Peritoneal Dialysis', value: 'Peritoneal Dialysis' }
        ];
        return <Dropdown appendTo={document.body} options={options} onChange={onFilterChange} value={value} />;
    }
}

export default RenalSummaryPanel;
