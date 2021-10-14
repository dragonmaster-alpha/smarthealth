import {storiesOf} from '@storybook/react';
import FormDescriptionUtility from 'main/utility/FormDescriptionUtility';
import React from 'react';
import FieldEditState from 'smarthealth-javascript/FieldEditState';
import FormDescription from 'smarthealth-javascript/FormDescription';
import FormFieldFormatted from 'smarthealth-javascript/FormFieldFormatted';
import FormFieldFormattedFormat from 'smarthealth-javascript/FormFieldFormattedFormat';
import FormFieldType from 'smarthealth-javascript/FormFieldType';
import consultationNotes from 'smarthealth-rest-test/formdesc/service/Form.Service.ConsultationNote.json';
import FieldTester from 'test/field/FieldTester';

/**
 * Allow debugging of FormattedField component
 *
 * @author Larry 6/03/2019
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2019
 */
storiesOf('Field/FormattedField', module)
    .add('Blood Pressure',
        () =>
        {
            const field: FormFieldFormatted = FormDescriptionUtility.findField(consultationNotes as FormDescription,
                'ClinicalMeasures.BPSitting') as FormFieldFormatted;
            return <FieldTester field={field} />;
        })
    .add('CF Australia ID',
        () =>
        {
            const field: FormFieldFormatted = {
                id: 'formattedField',
                label: 'CF Australia ID',
                type: FormFieldType.Formatted,
                format: FormFieldFormattedFormat.CFAustraliaIdentifier,
                size: 8,
                state: { editState: FieldEditState.Enabled }
            };
            return <FieldTester field={field} />;
        })
    .add('Health Care Card',
        () =>
        {
            const field: FormFieldFormatted = {
                id: 'formattedField',
                label: 'Health Care Card',
                type: FormFieldType.Formatted,
                format: FormFieldFormattedFormat.HealthCareCardNumber,
                size: 12,
                state: { editState: FieldEditState.Enabled }
            };
            return <FieldTester field={field} />;
        })
    .add('Medicare Number',
        () =>
        {
            const field: FormFieldFormatted = {
                id: 'formattedField',
                label: 'Medicare Number',
                type: FormFieldType.Formatted,
                format: FormFieldFormattedFormat.MedicareNumber,
                size: 12,
                state: { editState: FieldEditState.Enabled }
            };
            return <FieldTester field={field} />;
        })
    .add('Time',
        () =>
        {
            const field: FormFieldFormatted = {
                id: 'formattedField',
                label: 'Time',
                type: FormFieldType.Formatted,
                format: FormFieldFormattedFormat.Time,
                size: 5,
                state: { editState: FieldEditState.Enabled }
            };
            return <FieldTester field={field} />;
        });
