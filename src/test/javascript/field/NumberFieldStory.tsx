import {storiesOf} from '@storybook/react';
import React from 'react';
import FieldEditState from 'smarthealth-javascript/FieldEditState';
import FormFieldNumber from 'smarthealth-javascript/FormFieldNumber';
import FormFieldType from 'smarthealth-javascript/FormFieldType';
import FieldTester from 'test/field/FieldTester';
import {fieldUsage} from 'test/field/FieldUsageUtility';

/**
 * Allow debugging of NumberField component
 *
 * @author Priyanka 25/02/2019
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2019
 */
storiesOf('Field/NumberField', module)
    .add('Precision:5 Scale:2 AcceptNegative:true',
        () =>
        {
            const field: FormFieldNumber = {
                id: 'field',
                label: 'Field',
                type: FormFieldType.Number,
                acceptNegative: true,
                precision: 5,
                scale: 2,
                state: { editState: FieldEditState.Enabled }
            };
            return <FieldTester field={field} />;
        })
    .add('Precision:5 Scale:2 AcceptNegative:false',
        () =>
        {
            const field: FormFieldNumber = {
                id: 'field',
                label: 'Field',
                type: FormFieldType.Number,
                acceptNegative: false,
                precision: 5,
                scale: 2,
                state: { editState: FieldEditState.Enabled }
            };
            return <FieldTester field={field} />;
        })
    .add('Precision:5 Scale:2 AcceptNegative:false Maximum:100 Minimum:20',
        () =>
        {
            const field: FormFieldNumber = {
                id: 'field',
                label: 'Field',
                type: FormFieldType.Number,
                acceptNegative: false,
                precision: 5,
                scale: 2,
                state: { editState: FieldEditState.Enabled },
                minimum: 20,
                maximum: 100
            };
            return <FieldTester field={field} />;
        })
    .add('Precision:5 Scale:2 AcceptNegative:true Maximum:100 Minimum:20',
        () =>
        {
            const field: FormFieldNumber = {
                id: 'field',
                label: 'Field',
                type: FormFieldType.Number,
                acceptNegative: true,
                precision: 5,
                scale: 2,
                state: { editState: FieldEditState.Enabled },
                minimum: 20,
                maximum: 100
            };
            return <FieldTester field={field} />;
        })
    .add('Precision:5 Scale:0 AcceptNegative:false',
        () =>
        {
            const field: FormFieldNumber = {
                id: 'field',
                label: 'Field',
                type: FormFieldType.Number,
                acceptNegative: false,
                precision: 5,
                scale: 0,
                state: { editState: FieldEditState.Enabled }
            };
            return <FieldTester field={field} />;
        })
    .add('Usage', () => fieldUsage(FormFieldType.Number));
