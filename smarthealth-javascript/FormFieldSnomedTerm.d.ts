import FieldCalculation from './FieldCalculation';
import FieldConditional from './FieldConditional';
import FieldLayout from './FieldLayout';
import FieldState from './FieldState';
import FormFieldType from './FormFieldType';
/**
 * Transfer object created from Java object au.com.smarthealth.server.rest.form.FormFieldSnomedTerm
 * Generated by Maven. See Java class GenerateTypeScript.
 */
interface FormFieldSnomedTerm {
    /** Which SNOMED CT subset. Taken from ExtraInfo in the XML. */
    subset: string;
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
export default FormFieldSnomedTerm;
