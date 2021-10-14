import {storiesOf} from '@storybook/react';
import EditViewFormComponent from 'main/form/EditViewFormComponent';
import React from 'react';
import FieldCalculationType from 'smarthealth-javascript/FieldCalculationType';
import FieldEditState from 'smarthealth-javascript/FieldEditState';
import FormDescription from 'smarthealth-javascript/FormDescription';
import FormFieldOrSection from 'smarthealth-javascript/FormFieldOrSection';
import FormFieldType from 'smarthealth-javascript/FormFieldType';
import FullScreen from 'test/container/FullScreen';

/**
 * Test form calculations
 *
 * @author Thompson 16/03/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
const bmiFormFields: FormFieldOrSection[] = [
    {
        field: {
            id: 'height',
            label: 'Height',
            state: { editState: FieldEditState.Enabled },
            type: FormFieldType.Number,
            precision: 5,
            scale: 0
        }
    },
    {
        field: {
            id: 'weight',
            label: 'Weight',
            state: { editState: FieldEditState.Enabled },
            type: FormFieldType.Number,
            precision: 5,
            scale: 0
        }
    },
    {
        field: {
            id: 'bmi',
            label: 'BMI',
            state: { editState: FieldEditState.Enabled },
            type: FormFieldType.Number,
            precision: 5,
            scale: 1,
            calculation: {
                type: FieldCalculationType.BMI,
                paramFieldIDs: ['height', 'weight']
            }
        }
    }
];

storiesOf('Form/FormCalculations', module)
    .add('BMI', () =>
    {
        const formDescription: FormDescription = {
            fieldsAndSections: [
                ...bmiFormFields
            ],
            layoutColumns: 3
        };

        return (
            <FullScreen>
                <EditViewFormComponent formDescription={formDescription} data={{}} onSave={() => true} />
            </FullScreen>
        );
    })
    .add('BMI and differenceInDays', () =>
    {
        const formDescription: FormDescription = {
            fieldsAndSections: [
                ...bmiFormFields,
                {
                    field: {
                        id: 'before',
                        label: 'Before',
                        state: { editState: FieldEditState.Enabled },
                        type: FormFieldType.DateTime,
                        precisionDay: true
                    }
                },
                {
                    field: {
                        id: 'after',
                        label: 'After',
                        state: { editState: FieldEditState.Enabled },
                        type: FormFieldType.DateTime,
                        precisionDay: true
                    }
                },
                {
                    field: {
                        id: 'difference',
                        label: 'Difference in days',
                        type: FormFieldType.Number,
                        acceptNegative: true,
                        precision: 2,
                        scale: 0,
                        state: { editState: FieldEditState.Enabled },
                        calculation: {
                            type: FieldCalculationType.DIFFERENCE_IN_DAYS,
                            paramFieldIDs: ['before', 'after']
                        }
                    }
                }
            ],
            layoutColumns: 3
        };

        return (
            <FullScreen>
                <EditViewFormComponent formDescription={formDescription} data={{}} onSave={() => true} />
            </FullScreen>
        );
    });
