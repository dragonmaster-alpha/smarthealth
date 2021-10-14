import {CustomFields} from 'main/form/CustomFieldRenderer';
import FieldStateEvaluator, {FieldStates} from 'main/form/FieldStateEvaluator';
import FieldValidator from 'main/form/FieldValidator';
import AppStore from 'main/store/AppStore';
import {observable} from 'mobx';
import EntityData from 'smarthealth-javascript/EntityData';
import FormDescription from 'smarthealth-javascript/FormDescription';

/**
 * Context in which a form is displayed
 *
 * T is the type of the data for the form
 *
 * @author Larry 30/11/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
class FormContext<T = EntityData>
{
    public static build<T>(appStore: AppStore, formDescription: FormDescription,
        customFields?: CustomFields<T>): FormContext<T>
    {
        return {
            formDescription,
            customFields,
            editing: false,
            fieldStates: FieldStateEvaluator.extractInitialFieldStates(formDescription),
            // TODO allows appStore to be null for testing
            fieldValidator: new FieldValidator(appStore ? appStore.i18nStore : null),
            formDescriptionID: formDescription.id,
            validateIncludeMandatory: false
        };
    }

    public customFields?: CustomFields<T>;

    @observable
    public editing: boolean;

    @observable
    public fieldStates: FieldStates;

    public fieldValidator: FieldValidator;

    public formDescription: FormDescription;

    public formDescriptionID: string;

    /**
     * Indicates validation should include checking for mandatory. This usually happens after the
     * first attempt to save a form. It allows new forms to be created that are not showing mandatory as errors.
     */
    @observable
    public validateIncludeMandatory: boolean;
}

export default FormContext;
