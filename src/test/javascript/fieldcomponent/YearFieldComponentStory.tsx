import {storiesOf} from '@storybook/react';
import FieldContext from 'main/field/FieldContext';
import YearFieldComponent from 'main/fieldcomponent/YearFieldComponent';
import {CustomFieldRenderer, OnFieldChange} from 'main/form/CustomFieldRenderer';
import React from 'react';
import EntityData from 'smarthealth-javascript/EntityData';
import FormFieldDateTime from 'smarthealth-javascript/FormFieldDateTime';
import FormFieldType from 'smarthealth-javascript/FormFieldType';
import FieldTester from 'test/field/FieldTester';

/**
 * Story for YearFieldComponent
 *
 * @author Thompson 30/01/2021
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2021
 */
function createRenderer(): CustomFieldRenderer<EntityData>
{
    return function (context: FieldContext, value: any, data: EntityData, onFieldChange: OnFieldChange): React.ReactNode
    {
        return <YearFieldComponent context={context} onValueChange={value => onFieldChange(value, context.field)}
            value={value} />;
    };
}

storiesOf('FieldComponent/YearFieldComponent', module)
    .add('Empty', () =>
    {
        const field: FormFieldDateTime = {
            id: 'field',
            label: 'Field',
            type: FormFieldType.DateTime,
            precisionYear: true
        };
        return <FieldTester field={field} customFieldRenderer={createRenderer()} />;
    })
    .add('Initialised', () =>
    {
        const field: FormFieldDateTime = {
            id: 'field',
            label: 'Field',
            type: FormFieldType.DateTime,
            precisionYear: true
        };
        return <FieldTester field={field} customFieldRenderer={createRenderer()} value="2021" />;
    });
