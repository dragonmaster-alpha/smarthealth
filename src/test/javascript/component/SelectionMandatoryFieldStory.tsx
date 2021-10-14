import {storiesOf} from '@storybook/react';
import SelectionMandatoryField from 'main/component/SelectionMandatoryField';
import FieldContext from 'main/field/FieldContext';
import {customFieldRendererAdapter, OnFieldChange} from 'main/form/CustomFieldRenderer';
import FieldValidator from 'main/form/FieldValidator';
import React from 'react';
import EntityData from 'smarthealth-javascript/EntityData';
import FieldEditState from 'smarthealth-javascript/FieldEditState';
import FormField from 'smarthealth-javascript/FormField';
import FormFieldFormSpecific from 'smarthealth-javascript/FormFieldFormSpecific';
import FormFieldType from 'smarthealth-javascript/FormFieldType';
import FieldTester from 'test/field/FieldTester';

/**
 * Allow debugging for SelectionMandatoryField.tsx
 *
 * @author Thompson 24/09/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */

function renderFieldRenderer(options: string[])
{
    const renderer = function renderField(field: FormField, value: any, editing: boolean, disabled: boolean,
        valid: boolean, onFieldChange: OnFieldChange, context: FieldContext, fieldValidator: FieldValidator,
        data: EntityData): React.ReactNode
    {
        return (
            <SelectionMandatoryField context={context} editing={editing} field={field as FormFieldFormSpecific}
                fieldValidator={fieldValidator} onFieldChange={onFieldChange} options={options} value={value} />
        );
    };
    return customFieldRendererAdapter(renderer);
}

const field: FormFieldFormSpecific = {
    id: 'selection',
    label: 'Selection',
    state: { editState: FieldEditState.Enabled },
    type: FormFieldType.FormSpecific
};

const options = ['Panadol Tablets', 'Panadol Gel Caps Tablets', 'Panadol Mini Caps Tablets'];

storiesOf('Component/SelectionMandatoryField', module)
    .add('Empty', () =>
    {
        return <FieldTester field={field} customFieldRenderer={renderFieldRenderer(options)} />;
    })
    .add('Empty with 1 option in list', () =>
    {
        return <FieldTester field={field} customFieldRenderer={renderFieldRenderer(['Panadol Tablets'])} />;
    })
    .add('Value', () =>
    {
        return <FieldTester field={field} customFieldRenderer={renderFieldRenderer(options)}
            value="Panadol Gel Caps Tablets" />;
    });
