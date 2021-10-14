import FormContext from 'main/form/FormContext';
import FormField from 'smarthealth-javascript/FormField';

/**
 * The context for rendering and managing a field.
 *
 * F is the type of the field definition
 *
 * @author Larry 1/12/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
interface FieldContext<F extends FormField = FormField>
{
    field: F;
    formContext: FormContext;
    id: string;
}

export default FieldContext;
