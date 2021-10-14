import EntityType from 'smarthealth-javascript/EntityType';
import FieldLayout from 'smarthealth-javascript/FieldLayout';
import FormDescription from 'smarthealth-javascript/FormDescription';
import FormFieldType from 'smarthealth-javascript/FormFieldType';
import {EntityDetails} from 'test/component/SetEntity';

/**
 * Create test Form Description for testing with addLayoutHelper function
 * TODO potentially not needed and should be replaced with FormFieldMother implementation
 * @author Thompson 6/06/2019
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2019
 */
export function formDescriptionEntityDetails(formDescription: any): EntityDetails
{
    const fd = formDescription as FormDescription;
    const formId = fd.id.replace(/\.WebUI$/, '');
    return { type: EntityType.FormDescription, id: formId, value: fd };
}

const FORM_DESCRIPTION = {
    fieldsAndSections: [
        {
            section: {
                id: 'demographics',
                layoutShow: true,
                title: 'Demographics',
                fieldsAndSections: [
                    {
                        field: {
                            size: 40,
                            id: 'name',
                            label: 'Name',
                            type: FormFieldType.Text
                        }
                    },
                    {
                        field: {
                            size: 200,
                            id: 'alsoKnownAs',
                            label: 'Also known as',
                            type: FormFieldType.Text
                        }
                    },
                    {
                        field: {
                            enumType: 'Sex',
                            id: 'sex',
                            label: 'Sex',
                            mandatory: true,
                            type: 'Enum'
                        }
                    },
                    {
                        field: {
                            id: 'dateOfBirth',
                            label: 'Date of birth',
                            type: FormFieldType.Text,
                            size: 10
                        }
                    },
                    {
                        field: {
                            id: 'address',
                            label: 'Address',
                            type: FormFieldType.Text,
                            size: 100
                        }
                    },
                    {
                        field: {
                            id: 'contactDetails',
                            label: 'Phone',
                            type: FormFieldType.Text,
                            size: 10
                        }
                    },
                    {
                        field: {
                            id: 'email',
                            label: 'Email',
                            type: FormFieldType.Text,
                            size: 100
                        }
                    },
                    {
                        field: {
                            enumType: 'ATSI',
                            id: 'atsi',
                            label: 'Aboriginal/TSI',
                            type: 'Enum'
                        }
                    },
                    {
                        field: {
                            editable: true,
                            options: [
                                'Arabic',
                                'Chinese',
                                'English',
                                'French',
                                'German',
                                'Hindi/Urdu',
                                'Japanese',
                                'Portuguese',
                                'Russian',
                                'Spanish'
                            ],
                            size: 40,
                            id: 'language',
                            label: 'Language',
                            type: 'Selection'
                        }
                    },
                    {
                        field: {
                            id: 'interpreterRequired',
                            label: 'Interpreter required',
                            type: 'Boolean'
                        }
                    }
                ]
            }
        }
    ],
    id: 'FormDescription.Mother',
    layoutColumns: 2
};

export const FORM_DESCRIPTION_DATA = {
    name: 'Harry Potter',
    alsoKnownAs: 'Hazza',
    sex: 'Male',
    dateOfBirth: '02/06/1990',
    address: '31 Oxford st',
    contactDetails: '0411214555',
    email: 'harry@smarthealth.com.au',
    atsi: 'NeitherAboriginalNorTSI',
    language: 'English',
    interpreterRequired: false,
    summary: 'A kitten can hardly be considered an intellectual pear without also being a pineapple! ' +
        'The blackberries could be said to resemble calm raspberries? ' +
        'However, few can name a successful pineapple that isn\'t an intellectual camel? ' +
        'The pomegranates could be said to resemble fabulous grapes. ' +
        'A romantic sheep\'s cat comes with it the thought that the courteous hamster is a snail.'
};

export const createFormDescriptionWithLayout = (fieldId: string, layout: FieldLayout) =>
{
    const formDescription = {
        ...FORM_DESCRIPTION,
        fieldsAndSections: [...FORM_DESCRIPTION.fieldsAndSections]
    };

    formDescription.fieldsAndSections[0] = {
        ...FORM_DESCRIPTION.fieldsAndSections[0],
        section: {
            ...FORM_DESCRIPTION.fieldsAndSections[0].section,
            fieldsAndSections: [...FORM_DESCRIPTION.fieldsAndSections[0].section.fieldsAndSections]
        }
    };

    const { fieldsAndSections } = formDescription.fieldsAndSections[0].section;
    const targetFieldIndex = fieldsAndSections.findIndex(
        (fieldOrSection) =>
        {
            return fieldOrSection.field.id === fieldId;
        });

    formDescription.fieldsAndSections[0].section.fieldsAndSections[targetFieldIndex] = {
        ...formDescription.fieldsAndSections[0].section.fieldsAndSections[targetFieldIndex],
        field: {
            ...formDescription.fieldsAndSections[0].section.fieldsAndSections[targetFieldIndex].field,
            // @ts-ignore
            layout: { ...layout }
        }
    };

    return formDescription;
};

export default FORM_DESCRIPTION;
