import ShouldNeverGetHereError from 'main/utility/ShouldNeverGetHereError';
import FormDescription from 'smarthealth-javascript/FormDescription';
import FormField from 'smarthealth-javascript/FormField';
import FormFieldDateTime from 'smarthealth-javascript/FormFieldDateTime';
import FormFieldOrSection from 'smarthealth-javascript/FormFieldOrSection';
import FormFieldSelection from 'smarthealth-javascript/FormFieldSelection';
import FormTab from 'smarthealth-javascript/FormTab';
import Precision from 'smarthealth-javascript/Precision';
import ServiceRecord from 'smarthealth-javascript/ServiceRecord';

/**
 * Utility functions for Form Descriptions
 *
 * @author Larry 11/01/2019
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2019
 */
class FormDescriptionUtility
{
    public static allFields(form: FormDescription): FormField[]
    {
        return this.allFieldsInList(form.fieldsAndSections);
    }

    public static allFieldsInList(fieldsAndSections: FormFieldOrSection[]): FormField[]
    {
        const all = [];
        fieldsAndSections.forEach((fieldOrSection: FormFieldOrSection) =>
        {
            if (fieldOrSection.field)
            {
                all.push(fieldOrSection.field);
            }
            else if (fieldOrSection.section)
            {
                all.push(...FormDescriptionUtility.allFieldsInList(fieldOrSection.section.fieldsAndSections));
            }
            else if (fieldOrSection.tabs)
            {
                fieldOrSection.tabs.tabs.forEach(tab =>
                {
                    all.push(...FormDescriptionUtility.allFieldsInList(tab.sections));
                });
            }
        });
        return all;
    }

    public static buildFieldOptions(form: FormDescription, fieldID: string): any[]
    {
        const field = FormDescriptionUtility.findField(form, fieldID);
        return FormDescriptionUtility.buildOptions(field as FormFieldSelection);
    }

    public static buildOptions(field: FormFieldSelection, nullOption?: string): any[]
    {
        const options = field.options.map((option) => ({ value: option, label: option }));
        if (nullOption)
        {
            options.unshift({ value: null, label: nullOption });
        }
        return options;
    }

    public static determineHighestPrecision(field: FormFieldDateTime): Precision
    {
        if (field.precisionMinute)
        {
            return Precision.Minute;
        }
        else if (field.precisionDay)
        {
            return Precision.Day;
        }
        else if (field.precisionMonth)
        {
            return Precision.Month;
        }
        else if (field.precisionYear)
        {
            return Precision.Year;
        }
        else
        {
            throw new ShouldNeverGetHereError();
        }
    }

    public static findField(form: FormDescription, fieldID: string): FormField
    {
        const fields = FormDescriptionUtility.allFields(form);
        return fields.find((field: FormField) => (field.id === fieldID));
    }

    public static hasTabs(form: FormDescription)
    {
        return form.fieldsAndSections.some(fieldOrSection => !!fieldOrSection.tabs);
    }

    public static isEndSection(fieldOrSectionIndex: number, fieldsAndSections: FormFieldOrSection[]): boolean
    {
        return fieldOrSectionIndex < (fieldsAndSections.length - 1)
            ? !!(fieldsAndSections[fieldOrSectionIndex].section && fieldsAndSections[fieldOrSectionIndex + 1].field)
            : false;
    }

    public static isFillHeight(fieldsAndSections: FormFieldOrSection[]): boolean
    {
        return fieldsAndSections.some((fieldOrSection: FormFieldOrSection) =>
        {
            if (fieldOrSection.field)
            {
                return fieldOrSection.field.layout && fieldOrSection.field.layout.fillHeight;
            }
            else if (fieldOrSection.section)
            {
                return FormDescriptionUtility.isFillHeight(fieldOrSection.section.fieldsAndSections);
            }
            else
            {
                return false;
            }
        });
    }

    public static isFillWidth(fieldsAndSections: FormFieldOrSection[]): boolean
    {
        return fieldsAndSections.some((fieldOrSection: FormFieldOrSection) =>
        {
            if (fieldOrSection.field)
            {
                return fieldOrSection.field.layout && fieldOrSection.field.layout.fillWidth;
            }
            else if (fieldOrSection.section)
            {
                return FormDescriptionUtility.isFillWidth(fieldOrSection.section.fieldsAndSections);
            }
            else
            {
                return false;
            }
        });
    }

    // metadata update implementation uses fixed names, blacklist and reserved fieldIDs are:
    public static traverseFieldsSectionsAndSubheadings(fieldsAndSections: FormFieldOrSection[],
        onField?: (fieldOrSection: FormFieldOrSection) => void,
        onSection?: (fieldOrSection: FormFieldOrSection) => void,
        onSubheading?: (fieldOrSection: FormFieldOrSection) => void,
        onSectionEnd?: (fieldOrSection: FormFieldOrSection) => void,
        onTab?: (tab: FormTab) => void): void
    {
        fieldsAndSections.forEach((fieldOrSection, index) =>
        {
            if (fieldOrSection.field)
            {
                onField && onField(fieldOrSection);
                if (FormDescriptionUtility.isEndSection(index, fieldsAndSections))
                {
                    onSectionEnd && onSectionEnd(fieldOrSection);
                }
            }
            else if (fieldOrSection.section)
            {
                onSection && onSection(fieldOrSection);
                FormDescriptionUtility.traverseFieldsSectionsAndSubheadings(fieldOrSection.section.fieldsAndSections,
                    onField, onSection, onSubheading, onSectionEnd);
            }
            else if (fieldOrSection.subheading)
            {
                onSubheading && onSubheading(fieldOrSection);
            }
            else if (fieldOrSection.tabs)
            {
                fieldOrSection.tabs.tabs.forEach(tab =>
                {
                    onTab && onTab(tab);
                    FormDescriptionUtility.traverseFieldsSectionsAndSubheadings(tab.sections,
                        onField, onSection, onSubheading, onSectionEnd);
                });
            }
            else
            {
                throw new ShouldNeverGetHereError();
            }
        });
    }

    // Confidentiality, Program, Provider, ServiceDate
    public static updateServiceRecordMetadata(serviceRecord: ServiceRecord): ServiceRecord
    {
        const { Confidentiality, Program, Provider, ServiceDate } = serviceRecord.data;

        return {
            ...serviceRecord,
            metadata: {
                ...serviceRecord.metadata,
                confidentiality: Confidentiality,
                program: Program,
                providerID: Provider,
                serviceDate: ServiceDate
            }
        };
    }
}

export default FormDescriptionUtility;
