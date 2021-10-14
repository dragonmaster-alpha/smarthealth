import {storiesOf} from '@storybook/react';
import FieldContext from 'main/field/FieldContext';
import DateFieldComponent from 'main/fieldcomponent/DateFieldComponent';
import {CustomFieldRenderer, OnFieldChange} from 'main/form/CustomFieldRenderer';
import React from 'react';
import EntityData from 'smarthealth-javascript/EntityData';
import FormFieldDateTime from 'smarthealth-javascript/FormFieldDateTime';
import FormFieldType from 'smarthealth-javascript/FormFieldType';
import FieldTester from 'test/field/FieldTester';

/**
 * Story for DateFieldComponent
 *
 * @author Thompson 1/02/2021
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2021
 */
function createRenderer(monthAllowed: boolean, yearAllowed: boolean): CustomFieldRenderer<EntityData>
{
    return function (context: FieldContext, value: any, data: EntityData, onFieldChange: OnFieldChange): React.ReactNode
    {
        return <DateFieldComponent context={context} monthAllowed={monthAllowed}
            onValueChange={value => onFieldChange(value, context.field)} value={value} yearAllowed={yearAllowed} />;
    };
}

storiesOf('FieldComponent/DateFieldComponent', module)
    .add('Empty', () =>
    {
        const field: FormFieldDateTime = {
            id: 'field',
            label: 'Field',
            type: FormFieldType.DateTime,
            precisionDay: true
        };
        return <FieldTester field={field} customFieldRenderer={createRenderer(false, false)} />;
    })
    .add('Initialised', () =>
    {
        const field: FormFieldDateTime = {
            id: 'field',
            label: 'Field',
            type: FormFieldType.DateTime,
            precisionDay: true
        };
        return <FieldTester field={field} customFieldRenderer={createRenderer(false, false)}
            value="2021-01-20" />;
    })
    .add('Accept Day & Month', () =>
    {
        const field: FormFieldDateTime = {
            id: 'field',
            label: 'Field',
            type: FormFieldType.DateTime,
            precisionDay: true
        };
        return <FieldTester field={field} customFieldRenderer={createRenderer(true, false)} />;
    })
    .add('Accept Day & Year', () =>
    {
        const field: FormFieldDateTime = {
            id: 'field',
            label: 'Field',
            type: FormFieldType.DateTime,
            precisionDay: true
        };
        return <FieldTester field={field} customFieldRenderer={createRenderer(false, true)} />;
    })
    .add('Accept Day, Month & Year', () =>
    {
        const field: FormFieldDateTime = {
            id: 'field',
            label: 'Field',
            type: FormFieldType.DateTime,
            precisionDay: true
        };
        return <FieldTester field={field} customFieldRenderer={createRenderer(true, true)} />;
    });
