import {storiesOf} from '@storybook/react';
import FieldContext from 'main/field/FieldContext';
import MultipleFieldComponent from 'main/fieldcomponent/MultipleFieldComponent';
import {OnFieldChange} from 'main/form/CustomFieldRenderer';
import {px} from 'main/utility/StyleUtility';
import React from 'react';
import FormFieldSelection from 'smarthealth-javascript/FormFieldSelection';
import FormFieldType from 'smarthealth-javascript/FormFieldType';
import FieldTester from 'test/field/FieldTester';

/**
 * Story for MultipleFieldComponent
 *
 * @author Larry 22/12/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
function createRenderer(editable: boolean, maxLength: number)
{
    return function (context: FieldContext, value: any, data: any, onFieldChange: OnFieldChange): React.ReactNode
    {
        const formField = context.field;
        const { editing } = context.formContext;
        const padding = editing ? px(6) : px(8);
        if (editing)
        {
            return (
                <div style={{ padding }}>
                    <MultipleFieldComponent context={context} onValueChange={value => onFieldChange(value, formField)}
                        value={value} />
                </div>
            );
        }
        else
        {
            return <div style={{ padding }}>Not supported</div>;
        }
    };
}

storiesOf('FieldComponent/MultipleFieldComponent', module)
    .add('Empty', () =>
    {
        const field: FormFieldSelection = {
            id: 'field',
            label: 'Field',
            type: FormFieldType.Selection,
            multiple: true,
            options: ['Surgical', 'Endoscopic', 'Laparoscopic', 'Radiological'],
            size: 20
        };
        return <FieldTester field={field} customFieldRenderer={createRenderer(true, field.size)} />;
    })
    .add('Initialised', () =>
    {
        const field: FormFieldSelection = {
            id: 'field',
            label: 'Field',
            type: FormFieldType.Selection,
            multiple: true,
            options: ['Surgical', 'Endoscopic', 'Laparoscopic', 'Radiological'],
            size: 20
        };
        return <FieldTester field={field} value={[field.options[0], field.options[2]]}
            customFieldRenderer={createRenderer(true, field.size)} />;
    })
    .add('Initialised, other', () =>
    {
        const field: FormFieldSelection = {
            id: 'field',
            label: 'Field',
            type: FormFieldType.Selection,
            multiple: true,
            options: ['Surgical', 'Endoscopic', 'Laparoscopic', 'Radiological'],
            size: 20
        };
        return <FieldTester field={field} value={[field.options[0], field.options[2], 'Other']}
            customFieldRenderer={createRenderer(true, field.size)} />;
    });
