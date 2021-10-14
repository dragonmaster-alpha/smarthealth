import FieldEditState from 'smarthealth-javascript/FieldEditState';
import FormDescription from 'smarthealth-javascript/FormDescription';
import FormField from 'smarthealth-javascript/FormField';
import FormFieldBoolean from 'smarthealth-javascript/FormFieldBoolean';
import FormFieldDateTime from 'smarthealth-javascript/FormFieldDateTime';
import FormFieldFormatted from 'smarthealth-javascript/FormFieldFormatted';
import FormFieldFormattedFormat from 'smarthealth-javascript/FormFieldFormattedFormat';
import FormFieldNumber from 'smarthealth-javascript/FormFieldNumber';
import FormFieldSelection from 'smarthealth-javascript/FormFieldSelection';
import FormFieldServiceRecordReference from 'smarthealth-javascript/FormFieldServiceRecordReference';
import FormFieldTable from 'smarthealth-javascript/FormFieldTable';
import FormFieldText from 'smarthealth-javascript/FormFieldText';
import FormFieldType from 'smarthealth-javascript/FormFieldType';
import ServiceRecordReferenceDisplayType from 'smarthealth-javascript/ServiceRecordReferenceDisplayType';

/**
 * Create test FormFields for testing or combined to generate a FormDescription
 *
 * @author Thompson 3/02/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
export const FORM_FIELD_MOTHER_DATA = {
    name: 'Harry',
    sex: 'Male',
    date: { iso: '2000-01-20' },
    email: 'harry@smarthealth.com.au',
    interpreter: true,
    summary: 'Harry Potter, student at Hogwarts School',
    nameAndEmail: [{ name: 'Potter', email: 'harry@smarthealth.com.au' }],
    serviceRecordReferenceButtonOnlyID: {
        owningGroupID: 26, program: 'CYSTIC_FIBROSIS', serviceDate: { iso: '2020-01-08T12:02' },
        serviceID: 11474, serviceType: 185, summary: 'Cystic Fibrosis Summary'
    },
    weight: 66
};

export const BOOLEAN_INTERPRETER: FormFieldBoolean = {
    id: 'interpreter',
    label: 'Interpreter required',
    type: FormFieldType.Boolean,
    state: { editState: FieldEditState.Enabled }
};

export const DATE_TIME_DATE: FormFieldDateTime = {
    id: 'date',
    label: 'Date',
    type: FormFieldType.DateTime,
    precisionDay: true,
    precisionMinute: false,
    state: { editState: FieldEditState.Enabled }
};

export const DATE_OF_BIRTH: FormFieldDateTime = {
    id: 'dateOfBirth',
    label: 'Date of birth',
    type: FormFieldType.DateTime,
    precisionDay: true,
    precisionMinute: false,
    state: { editState: FieldEditState.Enabled }
};

export const FORMATTED_FIELD_TIME: FormFieldFormatted = {
    format: FormFieldFormattedFormat.Time,
    id: 'formattedTime',
    label: 'Formatted Time',
    size: 5,
    type: FormFieldType.Formatted
};

export const NUMBER_WEIGHT: FormFieldNumber = {
    id: 'weight',
    label: 'Weight',
    precision: 4,
    scale: 1,
    state: { editState: FieldEditState.Enabled },
    type: FormFieldType.Number,
    units: 'kg'
};

export const SELECTION_SEX: FormFieldSelection = {
    id: 'sex',
    label: 'Sex',
    options: ['Male', 'Female'],
    size: 0,
    state: { editState: FieldEditState.Enabled },
    type: FormFieldType.Selection
};

export const SELECTION_ILLNESS_NAME: FormFieldSelection = {
    id: 'illnessName',
    label: 'Illness name',
    options: [
        'Aspergillosis, invasive',
        'Bartonellosis',
        'Candidiasis of oesophagus',
        'HSV: bronchitis',
        'Wasting syndrome attributed to HIV'
    ],
    size: 35,
    state: { editState: FieldEditState.Enabled },
    type: FormFieldType.Selection
};

export const SERVICE_RECORD_REFERENCE_BUTTON_ONLY: FormFieldServiceRecordReference = {
    displayType: ServiceRecordReferenceDisplayType.ButtonOnly,
    id: 'serviceRecordReferenceButtonOnlyID',
    label: '',
    state: { editState: FieldEditState.Enabled },
    type: FormFieldType.ServiceRecordReference
};

export const TEXT_NAME: FormFieldText = {
    id: 'name',
    label: 'Name',
    size: 30,
    state: { editState: FieldEditState.Enabled },
    type: FormFieldType.Text
};

export const TEXT_EMAIL: FormFieldText = {
    id: 'email',
    label: 'Email',
    size: 100,
    state: { editState: FieldEditState.Enabled },
    type: FormFieldType.Text
};

export const TEXT_SUMMARY: FormFieldText = {
    id: 'summary',
    label: 'Summary',
    size: 400,
    state: { editState: FieldEditState.Enabled },
    type: FormFieldType.Text
};

export const TABLE_NAME_AND_SEX: FormFieldTable = {
    columns: [
        TEXT_NAME,
        TEXT_EMAIL
    ],
    id: 'nameAndEmail',
    label: 'Names and Email',
    state: { editState: FieldEditState.Enabled },
    type: FormFieldType.Table
};

export function createFormDescription(fields: FormField[]): FormDescription
{
    const fieldsAndSections = fields.map(field => ({ field }));
    const formDescription: FormDescription = {
        fieldsAndSections,
        description: 'generated form description',
        layoutColumns: 2
    };

    return formDescription;
}
