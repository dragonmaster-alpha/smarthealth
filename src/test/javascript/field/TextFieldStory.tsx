import {storiesOf} from '@storybook/react';
import React from 'react';
import FieldEditState from 'smarthealth-javascript/FieldEditState';
import FormFieldText from 'smarthealth-javascript/FormFieldText';
import FormFieldType from 'smarthealth-javascript/FormFieldType';
import FieldTester from 'test/field/FieldTester';
import {fieldUsage} from 'test/field/FieldUsageUtility';

/**
 * Allow debugging of TextField component
 *
 * @author Priyanka 25/02/2019
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2019
 */

storiesOf('Field/TextField', module)
    .add('Size=10', () =>
    {
        const field: FormFieldText = {
            id: 'field',
            label: 'Field',
            type: FormFieldType.Text,
            size: 10,
            state: { editState: FieldEditState.Enabled }
        };
        return <FieldTester field={field} />;
    })
    .add('Mini (40)', () =>
    {
        const field: FormFieldText = {
            id: 'field',
            label: 'Field',
            type: FormFieldType.Text,
            size: 40,
            state: { editState: FieldEditState.Enabled }
        };
        return <FieldTester field={field} />;
    })
    .add('Short (100)', () =>
    {
        const field: FormFieldText = {
            id: 'field',
            label: 'Field',
            type: FormFieldType.Text,
            size: 100,
            state: { editState: FieldEditState.Enabled }
        };
        return <FieldTester field={field} />;
    })
    .add('Medium (500)', () =>
    {
        const field: FormFieldText = {
            id: 'field',
            label: 'Field',
            type: FormFieldType.Text,
            size: 500,
            state: { editState: FieldEditState.Enabled }
        };
        return <FieldTester field={field} />;
    })
    .add('Long (5000)', () =>
    {
        const field: FormFieldText = {
            id: 'field',
            label: 'Field',
            type: FormFieldType.Text,
            size: 5000,
            state: { editState: FieldEditState.Enabled }
        };
        return <FieldTester field={field} />;
    })
    .add('minimumLength=2', () =>
    {
        const field: FormFieldText = {
            id: 'field',
            label: 'Field',
            type: FormFieldType.Text,
            minimumLength: 2,
            size: 40,
            state: { editState: FieldEditState.Enabled }
        };
        return <FieldTester field={field} />;
    })
    .add('abbreviate, size: 10', () =>
    {
        const field: FormFieldText = {
            id: 'field',
            label: 'Field',
            type: FormFieldType.Text,
            size: 10,
            state: { editState: FieldEditState.Enabled },
            abbreviate: true
        };
        return <FieldTester field={field} value="123456789012345" />;
    })
    .add('layoutMultiline=true with size<100', () =>
    {
        const field: FormFieldText = {
            id: 'field',
            label: 'Field',
            type: FormFieldType.Text,
            size: 40,
            state: { editState: FieldEditState.Enabled },
            layoutMultiline: true
        };
        return <FieldTester field={field} />;
    })
    .add('layoutMultiline=false with size>100', () =>
    {
        const field: FormFieldText = {
            id: 'field',
            label: 'Field',
            type: FormFieldType.Text,
            size: 200,
            state: { editState: FieldEditState.Enabled },
            layoutMultiline: false
        };
        return <FieldTester field={field} />;
    })
    .add('Mini with tooltip', () =>
    {
        const field: FormFieldText = {
            id: 'field',
            label: 'Field',
            type: FormFieldType.Text,
            size: 40,
            state: { editState: FieldEditState.Enabled },
            toolTip: 'Description of the contents of this field.'
        };
        return <FieldTester field={field} />;
    })
    .add('Mini with tooltip and minimum length', () =>
    {
        const field: FormFieldText = {
            id: 'field',
            label: 'Field',
            type: FormFieldType.Text,
            minimumLength: 2,
            size: 40,
            state: { editState: FieldEditState.Enabled },
            toolTip: 'Description of the contents of this field.'
        };
        return <FieldTester field={field} />;
    })
    .add('units', () =>
    {
        const field: FormFieldText = {
            id: 'field',
            label: 'Field',
            type: FormFieldType.Text,
            size: 10,
            units: 'units'
        };
        return <FieldTester field={field} />;
    })
    .add('Usage', () => fieldUsage(FormFieldType.Text));
