import FieldContext from 'main/field/FieldContext';
import FormContext from 'main/form/FormContext';
import {observable} from 'mobx';
import FormField from 'smarthealth-javascript/FormField';
import FormFieldTable from 'smarthealth-javascript/FormFieldTable';

/**
 * The context for rendering and managing a field.
 *
 * F is the type of the field definition
 *
 * @author Larry 1/12/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
class TableFieldContext<F extends FormField = FormField> implements FieldContext<F>
{
    public static build<F extends FormField>(tableContext: FieldContext<FormFieldTable> | FieldContext,
        columnField: FormField): FieldContext<F>
    {
        return {
            formContext: tableContext.formContext,
            field: columnField,
            id: columnField.id,
            tableContext: tableContext as FieldContext<FormFieldTable>
        } as TableFieldContext<F>;
    }

    public readonly field: F;

    @observable
    public formContext: FormContext;

    public readonly id: string;

    public readonly tableContext: FieldContext<FormFieldTable>;
}

export function isTableFieldContext(context: FieldContext): context is TableFieldContext
{
    return 'tableContext' in context;
}

export default TableFieldContext;
