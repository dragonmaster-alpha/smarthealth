import lodash from 'lodash';
import FormDescriptionUtility from 'main/utility/FormDescriptionUtility';
import {action} from 'mobx';
import FormField from 'smarthealth-javascript/FormField';
import FormFieldOrSection from 'smarthealth-javascript/FormFieldOrSection';
import FormFieldTypes from 'smarthealth-javascript/FormFieldTypes';

/**
 * Access field values in form data
 *
 * @author Larry 11/12/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
class FormDataUtility
{
    private static addNullToMissingFieldData(data: {}, field): void
    {
        if (FormFieldTypes.isGroup(field))
        {
            field.fields.forEach(fieldInGroup => this.addNullToMissingFieldData(data, fieldInGroup));
        }
        else if (!FormDataUtility.contains(data, field))
        {
            FormDataUtility.set(data, field, null);
        }
    }

    public static contains(data: any, field: FormField): boolean
    {
        return FormDataUtility.get(data, field) !== undefined;
    }

    public static get(data: any, field: FormField): any
    {
        return FormDataUtility.getByPath(data, field.valuePath || field.id);
    }

    public static getByPath(data: any, path: string): any
    {
        return lodash.get(data, path);
    }

    private static isNonEmptyArray(value: any): boolean
    {
        if ((value !== null) && (typeof value === 'object') && Array.isArray(value) && (value.length > 0))
        {
            return true;
        }
        else
        {
            return false;
        }
    }

    public static populateMissingFieldsWithNulls(data: {}, fieldsAndSections: FormFieldOrSection[]): void
    {
        FormDescriptionUtility.traverseFieldsSectionsAndSubheadings(fieldsAndSections,
            (fieldOrSection) => FormDataUtility.addNullToMissingFieldData(data, fieldOrSection.field));
    }

    private static prepareArrayForServer(array: any[]): any[]
    {
        const arrayElementsCleaned = array.map((element) =>
        {
            if ((element !== null) && (typeof element === 'object'))
            {
                return this.prepareObjectForServer(element);
            }
            else
            {
                return element;
            }
        });
        const newArrayWithOmittedNulls = arrayElementsCleaned.filter(element => element !== null);
        return newArrayWithOmittedNulls;
    }

    public static prepareObjectForServer(object: {}): {}
    {
        const objectWithOmittedNulls = {};
        Object.keys(object)
            .forEach((key: string) =>
            {
                const value = object[key];
                // value type is Object-Array
                if (FormDataUtility.isNonEmptyArray(value))
                {
                    const arrayCleaned = this.prepareArrayForServer(value);
                    if ((arrayCleaned !== null) && (arrayCleaned.length > 0))
                    {
                        objectWithOmittedNulls[key] = arrayCleaned;
                    }
                }
                // value type is Object-Object
                else if ((value !== null) && (typeof value === 'object')
                    && (Object.keys(value).length > 0))
                {
                    const objectCleaned = this.prepareObjectForServer(value);
                    if (objectCleaned !== null)
                    {
                        objectWithOmittedNulls[key] = objectCleaned;
                    }
                }
                else if ((value !== null) && (typeof value !== 'object'))
                {
                    objectWithOmittedNulls[key] = value;
                }
            });

        return Object.keys(objectWithOmittedNulls).length > 0 ? objectWithOmittedNulls : null;
    }

    @action
    public static set(data: any, field: FormField, value: any)
    {
        lodash.set(data, field.valuePath || field.id, value);
    }
}

export default FormDataUtility;
