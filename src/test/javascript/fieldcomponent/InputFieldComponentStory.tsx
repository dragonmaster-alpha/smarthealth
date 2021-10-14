import {action as storybookAction} from '@storybook/addon-actions';
import {storiesOf} from '@storybook/react';
import FieldContext from 'main/field/FieldContext';
import InputFieldComponent from 'main/fieldcomponent/InputFieldComponent';
import {OnFieldChange} from 'main/form/CustomFieldRenderer';
import {px} from 'main/utility/StyleUtility';
import React from 'react';
import FormFieldSelection from 'smarthealth-javascript/FormFieldSelection';
import FormFieldType from 'smarthealth-javascript/FormFieldType';
import FieldTester from 'test/field/FieldTester';

/**
 * Story for InputWithDropdown
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
                    <InputFieldComponent context={context} editable={editable} maxLength={maxLength}
                        onFocus={focus => storybookAction('onFocus')(focus)}
                        onValueChange={value => onFieldChange(value, formField)} value={value} />
                </div>
            );
        }
        else
        {
            return <div style={{ padding }}>Not supported</div>;
        }
    };
}

storiesOf('FieldComponent/InputFieldComponent', module)
    .add('Editable', () =>
    {
        const field: FormFieldSelection = {
            id: 'field',
            label: 'Field',
            type: FormFieldType.Selection,
            editable: true,
            options: ['ACT', 'NSW', 'NT', 'QLD', 'SA', 'Tas', 'Vic', 'WA'],
            size: 5
        };
        return <FieldTester field={field} customFieldRenderer={createRenderer(true, field.size)} />;
    })
    .add('Editable, long', () =>
    {
        const field: FormFieldSelection = {
            id: 'field',
            label: 'Field',
            type: FormFieldType.Selection,
            options: ['Adenocarcinoma', 'Adenoid cystic carcinoma'],
            size: 50
        };
        return <FieldTester field={field} customFieldRenderer={createRenderer(true, field.size)} />;
    })
    .add('Not editable', () =>
    {
        const field: FormFieldSelection = {
            id: 'field',
            label: 'Field',
            type: FormFieldType.Selection,
            options: ['Yes', 'No', 'Maybe'],
            size: 5
        };
        return <FieldTester field={field} customFieldRenderer={createRenderer(false, field.size)} />;
    })
    .add('Not editable, initialised', () =>
    {
        const field: FormFieldSelection = {
            id: 'field',
            label: 'Field',
            type: FormFieldType.Selection,
            options: ['Yes', 'No', 'Maybe'],
            size: 5
        };
        return <FieldTester field={field} value={'Yes'} customFieldRenderer={createRenderer(false, field.size)} />;
    })
    .add('Not editable, long', () =>
    {
        const field: FormFieldSelection = {
            id: 'field',
            label: 'Field',
            type: FormFieldType.Selection,
            options: ['Adenocarcinoma', 'Adenoid cystic carcinoma'],
            size: 50
        };
        return <FieldTester field={field} customFieldRenderer={createRenderer(false, field.size)} />;
    });
