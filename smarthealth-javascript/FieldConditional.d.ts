import FieldState from './FieldState';
import FieldConditionalIf from './FieldConditionalIf';
/**
 * Transfer object created from Java object au.com.smarthealth.server.rest.form.FieldConditional
 * Generated by Maven. See Java class GenerateTypeScript.
 */
interface FieldConditional {
    elseState: FieldState;
    ifs: FieldConditionalIf[];
}
export default FieldConditional;