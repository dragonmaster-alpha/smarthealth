import {storiesOf} from '@storybook/react';
import FieldContext from 'main/field/FieldContext';
import MonthFieldComponent from 'main/fieldcomponent/MonthFieldComponent';
import {CustomFieldRenderer, OnFieldChange} from 'main/form/CustomFieldRenderer';
import React from 'react';
import EntityData from 'smarthealth-javascript/EntityData';
import FormFieldDateTime from 'smarthealth-javascript/FormFieldDateTime';
import FormFieldType from 'smarthealth-javascript/FormFieldType';
import FieldTester from 'test/field/FieldTester';

/**
 * Story for MonthFieldComponent
 *
 * @author Thompson 1/02/2021
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2021
 */
function createRenderer(yearAllowed: boolean): CustomFieldRenderer<EntityData>
{
    return function (context: FieldContext, value: any, data: EntityData, onFieldChange: OnFieldChange): React.ReactNode
    {
        return <MonthFieldComponent context={context} onValueChange={value => onFieldChange(value, context.field)}
            value={value} yearAllowed={yearAllowed} />;
    };
}

storiesOf('FieldComponent/MonthFieldComponent', module)
    .add('Empty', () =>
    {
        const field: FormFieldDateTime = {
            id: 'field',
            label: 'Field',
            type: FormFieldType.DateTime,
            precisionMonth: true
        };
        return <FieldTester field={field} customFieldRenderer={createRenderer(false)} />;
    })
    .add('Initialised', () =>
    {
        const field: FormFieldDateTime = {
            id: 'field',
            label: 'Field',
            type: FormFieldType.DateTime,
            precisionMonth: true
        };
        return <FieldTester field={field} customFieldRenderer={createRenderer(false)} value="01/2002" />;
    })
    .add('Accept Month & Year', () =>
    {
        const field: FormFieldDateTime = {
            id: 'field',
            label: 'Field',
            type: FormFieldType.DateTime,
            precisionMonth: true,
            precisionYear: true
        };
        return <FieldTester field={field} customFieldRenderer={createRenderer(true)} />;
    });
