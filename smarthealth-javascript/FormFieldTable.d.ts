import FieldTableAction from './FieldTableAction';
import FormField from './FormField';
import FieldCalculation from './FieldCalculation';
import FieldConditional from './FieldConditional';
import FieldLayout from './FieldLayout';
import FieldState from './FieldState';
import FormFieldType from './FormFieldType';
/**
 * Transfer object created from Java object au.com.smarthealth.server.rest.form.FormFieldTable
 * Generated by Maven. See Java class GenerateTypeScript.
 */
interface FormFieldTable {
    actions?: FieldTableAction[];
    columns: FormField[];
    fixedRows?: boolean;
    layoutRows?: number;
    rowSelectionInViewMode?: boolean;
    calculation?: FieldCalculation;
    description?: string;
    fieldIf?: FieldConditional;
    id: string;
    label: string;
    layout?: FieldLayout;
    /** For a table indicates that all columns are sortable. For a table column indicates that column is sortable. */
    sortable?: boolean;
    /** Defaults to FieldEditState.Enabled */
    state?: FieldState;
    toolTip?: string;
    type: FormFieldType;
    units?: string;
    /** If present, path to the data. Otherwise use fieldID. */
    valuePath?: string;
}
export default FormFieldTable;
