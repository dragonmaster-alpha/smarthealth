import {storiesOf} from '@storybook/react';
import React from 'react';
import FieldEditState from 'smarthealth-javascript/FieldEditState';
import FormFieldSelection from 'smarthealth-javascript/FormFieldSelection';
import FormFieldType from 'smarthealth-javascript/FormFieldType';
import FormFieldTypes from 'smarthealth-javascript/FormFieldTypes';
import FieldTester from 'test/field/FieldTester';
import {fieldUsagePredicate} from 'test/field/FieldUsageUtility';

/**
 * Allow debugging of SelectionField component
 *
 * @author Priyanka 27/02/2019
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2019
 */
storiesOf('Field/SelectionField', module)
    .add('Standard', () =>
    {
        const field: FormFieldSelection = {
            id: 'field',
            label: 'Field',
            type: FormFieldType.Selection,
            options: ['Yes', 'No', 'Maybe'],
            size: 5,
            state: { editState: FieldEditState.Enabled }
        };
        return <FieldTester field={field} />;
    })
    .add('Standard, initialised', () =>
    {
        const field: FormFieldSelection = {
            id: 'field',
            label: 'Field',
            type: FormFieldType.Selection,
            options: ['Yes', 'No', 'Maybe'],
            size: 5,
            state: { editState: FieldEditState.Enabled }
        };
        return <FieldTester field={field} value={'Yes'} />;
    })
    .add('Standard, initialised, value not an option', () =>
    {
        const field: FormFieldSelection = {
            id: 'field',
            label: 'Field',
            type: FormFieldType.Selection,
            options: ['Yes', 'No', 'Maybe'],
            size: 5,
            state: { editState: FieldEditState.Enabled }
        };
        return <FieldTester field={field} value={'Probably'} />;
    })
    .add('Standard, long list', () =>
    {
        const field: FormFieldSelection = {
            id: 'field',
            label: 'Field',
            type: FormFieldType.Selection,
            options: ['Adenocarcinoma', 'Adenoid cystic carcinoma', 'Adenosarcoma', 'Adenosquamous carcinoma',
                'Basal cell carcinoma', 'Carcinoid tumour', 'Carcinoma NOS', 'Clear cell carcinoma', 'Ductal carcinoma',
                'Endometrial stromal sarcoma', 'Endometrioid adenocarcinoma', 'Epithelioid tumour',
                'Gastrointestinal stromal tumour (GIST)', 'Germ cell tumour', 'Glioma', 'Hepatoma', 'Hodgkin lymphoma',
                'Invasive ductal carcinoma NOS', 'Invasive lobular carcinoma', 'Large cell carcinoma', 'Leukaemia',
                'Lymphoma', 'Medullary carcinoma', 'Melanoma', 'Meningioma', 'Mixed cell carcinoma',
                'Mixed cell tumour', 'Mucinous tumour', 'Mucoepidermoid carcinoma', 'Myeloma',
                'Neuroendocrine carcinoma', 'Non-Hodgkin lymphoma', 'Non-small cell carcinoma', 'Paget\u0027s disease',
                'Papillary tumour', 'Phyllodes tumour', 'Renal cell carcinoma', 'Sarcoma', 'Seminoma',
                'Serous cystadenocarcinoma', 'Signet ring cell carcinoma', 'Small cell carcinoma',
                'Squamous cell carcinoma', 'Teratoma', 'Tubular cell carcinoma', 'Undifferentiated carcinoma',
                'Undifferentiated sarcoma', 'Unknown', 'Urothelial carcinoma', 'Verrucous carcinoma',
                'Villoglandular carcinoma'
            ],
            size: 50,
            state: { editState: FieldEditState.Enabled }
        };
        return <FieldTester field={field} />;
    })
    .add('Editable', () =>
    {
        const field: FormFieldSelection = {
            id: 'field',
            label: 'Field',
            type: FormFieldType.Selection,
            editable: true,
            options: ['ACT', 'NSW', 'NT', 'QLD', 'SA', 'Tas', 'Vic', 'WA'],
            size: 5,
            state: { editState: FieldEditState.Enabled }
        };
        return <FieldTester field={field} />;
    })
    .add('Multiple', () =>
    {
        const field: FormFieldSelection = {
            id: 'field',
            label: 'Field',
            type: FormFieldType.Selection,
            multiple: true,
            options: ['Surgical', 'Endoscopic', 'Laparoscopic', 'Radiological'],
            size: 20,
            state: { editState: FieldEditState.Enabled }
        };
        return <FieldTester field={field} />;
    })
    .add('Multiple, initialised', () =>
    {
        const field: FormFieldSelection = {
            id: 'field',
            label: 'Field',
            type: FormFieldType.Selection,
            multiple: true,
            options: ['Surgical', 'Endoscopic', 'Laparoscopic', 'Radiological'],
            size: 20,
            state: { editState: FieldEditState.Enabled }
        };
        return <FieldTester field={field} value={[field.options[0], field.options[2]]} />;
    })
    .add('Multiple Editable', () =>
    {
        const field: FormFieldSelection = {
            id: 'field',
            label: 'Field',
            type: FormFieldType.Selection,
            multiple: true,
            editable: true,
            options: ['Gastrointestinal', 'Urinary tract', 'Genital tract', 'Lymphatic', 'Wound'],
            size: 20,
            state: { editState: FieldEditState.Enabled }
        };
        return <FieldTester field={field} />;
    })
    .add('Usage: Standard', () => fieldUsagePredicate('Form Field Selection, standard',
        field => FormFieldTypes.isSelection(field) && !field.editable && !field.multiple))
    .add('Usage: Editable', () => fieldUsagePredicate('Form Field Selection, editable',
        field => FormFieldTypes.isSelection(field) && field.editable && !field.multiple))
    .add('Usage: Multiple', () => fieldUsagePredicate('Form Field Selection, multiple',
        field => FormFieldTypes.isSelection(field) && !field.editable && field.multiple))
    .add('Usage: Multiple, editable', () => fieldUsagePredicate('Form Field Selection, multiple, editable',
        field => FormFieldTypes.isSelection(field) && field.editable && field.multiple));
