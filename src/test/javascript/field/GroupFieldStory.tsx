import {storiesOf} from '@storybook/react';
import FormDescriptionUtility from 'main/utility/FormDescriptionUtility';
import React from 'react';
import FieldLabelPosition from 'smarthealth-javascript/FieldLabelPosition';
import FormDescription from 'smarthealth-javascript/FormDescription';
import FormFieldGroup from 'smarthealth-javascript/FormFieldGroup';
import FormFieldType from 'smarthealth-javascript/FormFieldType';
import imagingFormDescription from 'smarthealth-rest-test/formdesc/service/Form.Service.Imaging.json';
import cysticFibrosisSummary from 'smarthealth-rest-test/formdesc/summary/Form.Summary.CysticFibrosisSummary.json';
import FieldTester from 'test/field/FieldTester';
import {fieldUsage} from 'test/field/FieldUsageUtility';

/**
 * Allow debugging of TextField component
 *
 * @author Priyanka 25/02/2019
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2019
 */
storiesOf('Field/GroupField', module)
    .add('Weight range', () =>
    {
        const field: FormFieldGroup = {
            fields: [
                {
                    id: 'weightFrom',
                    label: '',
                    layout: { labelPosition: FieldLabelPosition.Omit },
                    precision: 4,
                    scale: 1,
                    type: FormFieldType.Number,
                    units: 'kg'
                },
                {
                    id: 'weightTo',
                    label: 'to',
                    precision: 4,
                    scale: 1,
                    type: FormFieldType.Number,
                    units: 'kg'
                }
            ],
            id: 'weightRange',
            label: 'Weight',
            type: FormFieldType.Group
        };
        return (
            <>
                <FieldTester field={field} data={{ weightFrom: null, weightTo: null }} />
                <div>Note: fieldState for group does not affect contained fields</div>
            </>
        );
    })
    .add('Weight range, initialised', () =>
    {
        const field: FormFieldGroup = {
            fields: [
                {
                    id: 'weightFrom',
                    label: '',
                    layout: { labelPosition: FieldLabelPosition.Omit },
                    precision: 4,
                    scale: 1,
                    type: FormFieldType.Number,
                    units: 'kg'
                },
                {
                    id: 'weightTo',
                    label: 'to',
                    precision: 4,
                    scale: 1,
                    type: FormFieldType.Number,
                    units: 'kg'
                }
            ],
            id: 'weightRange',
            label: 'Weight',
            type: FormFieldType.Group
        };
        return (
            <>
                <FieldTester field={field} data={{ weightFrom: 65.0, weightTo: 70.0 }} />
                <div>Note: fieldState for group does not affect contained fields</div>
            </>
        );
    })
    .add('Number and Service record reference (CF Summary)', () =>
    {
        const field = FormDescriptionUtility.findField(cysticFibrosisSummary as FormDescription,
            'LatestFEV1Group');
        return (
            <>
                <FieldTester field={field} data={{ LatestFEV1: null }} />
                <div>Note: fieldState for group does not affect contained fields</div>
            </>
        );
    })
    .add('URL and button (Imaging)', () =>
    {
        const field = FormDescriptionUtility.findField(imagingFormDescription as FormDescription, 'ImageURLGroup');
        return (
            <>
                <FieldTester field={field} data={{ ImageURL: null }} />
                <div>Note: fieldState for group does not affect contained fields</div>
            </>
        );
    })
    .add('3 text fields', () =>
    {
        const field: FormFieldGroup = {
            fields: [
                {
                    id: 'field1',
                    label: '',
                    layout: { labelPosition: FieldLabelPosition.Omit },
                    size: 10,
                    type: FormFieldType.Text
                },
                {
                    id: 'field2',
                    label: 'for',
                    size: 10,
                    type: FormFieldType.Text
                },
                {
                    id: 'field3',
                    label: 'with',
                    size: 10,
                    type: FormFieldType.Text
                }
            ],
            id: 'field',
            label: 'Field',
            type: FormFieldType.Group
        };
        return (
            <>
                <FieldTester field={field} data={{ weightFrom: null, weightTo: null }} />
                <div>Note: fieldState for group does not affect contained fields</div>
            </>
        );
    })
    .add('Usage', () => fieldUsage(FormFieldType.Group));
