import {storiesOf} from '@storybook/react';
import FieldContext from 'main/field/FieldContext';
import TimeFieldComponent from 'main/fieldcomponent/TimeFieldComponent';
import {OnFieldChange} from 'main/form/CustomFieldRenderer';
import DateUtility from 'main/utility/DateUtility';
import Locales from 'main/utility/Locales';
import React from 'react';
import EntityData from 'smarthealth-javascript/EntityData';
import FormFieldDateTime from 'smarthealth-javascript/FormFieldDateTime';
import FormFieldType from 'smarthealth-javascript/FormFieldType';
import FieldTester from 'test/field/FieldTester';

/**
 * Tester for TimeFieldComponent
 *
 * @author Thompson 21/01/2021
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2021
 */
function createRenderer()
{
    return function (context: FieldContext, value: any, data: EntityData, onFieldChange: OnFieldChange): React.ReactNode
    {
        return <TimeFieldComponent characterFilter="0-9:." context={context}
            format={(value) => DateUtility.reformatTimeString(value, Locales.AUSTRALIA)} maxLength={5}
            onValueChange={(value) => onFieldChange(value, context.field)} placeholder="hh:mm"
            // TODO Thompson - review - validation string copied from FieldValidator
            validation="^(0[0-9]|1[0-9]|2[0-3]|[0-9])[:.]?[0-5][0-9]$" value={value} />;
    };
}

storiesOf('FieldComponent/TimeFieldComponent', module)
    .add('Standard', () =>
    {
        const field: FormFieldDateTime = {
            id: 'field',
            label: 'Field',
            type: FormFieldType.DateTime,
            precisionMinute: true
        };
        return <FieldTester customFieldRenderer={createRenderer()} field={field} />;
    })
    .add('Standard, initialised', () =>
    {
        const field: FormFieldDateTime = {
            id: 'field',
            label: 'Field',
            type: FormFieldType.DateTime,
            precisionMinute: true
        };
        return <FieldTester customFieldRenderer={createRenderer()} field={field} value="13:30" />;
    });
