import FieldContext from 'main/field/FieldContext';
import FormContext from 'main/form/FormContext';
import FormDescriptionUtility from 'main/utility/FormDescriptionUtility';
import {observable} from 'mobx';
import FormField from 'smarthealth-javascript/FormField';

/**
 * Context for rendering a simple field
 *
 * @author Larry 1/12/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
class SimpleFieldContext<F extends FormField = FormField> implements FieldContext<F>
{
    public static build<F extends FormField>(formContext: FormContext, field: F): SimpleFieldContext<F>
    {
        return { formContext, field, id: field.id } as SimpleFieldContext<F>;
    }

    public static buildFromID<F extends FormField>(formContext: FormContext, id: string): SimpleFieldContext<F>
    {
        const field = FormDescriptionUtility.findField(formContext.formDescription, id) as F;
        return SimpleFieldContext.build(formContext, field);
    }

    public readonly field: F;

    @observable
    public formContext: FormContext;

    public readonly id: string;
}

export default SimpleFieldContext;
