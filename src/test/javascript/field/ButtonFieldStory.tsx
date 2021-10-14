import {action as storybookAction} from '@storybook/addon-actions';
import {storiesOf} from '@storybook/react';
import ButtonField from 'main/field/ButtonField';
import FieldContext from 'main/field/FieldContext';
import {OnFieldChange} from 'main/form/CustomFieldRenderer';
import React from 'react';
import FormFieldButton from 'smarthealth-javascript/FormFieldButton';
import FormFieldType from 'smarthealth-javascript/FormFieldType';
import FieldTester from 'test/field/FieldTester';

/**
 * Tester for ButtonField.tsx
 *
 * @author Thompson 20/03/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */

function onClick()
{
    storybookAction('Submit button')('clicked');
}

function createRenderer(small?: boolean)
{
    return function (context: FieldContext, value: any, data: any, onFieldChange: OnFieldChange)
    {
        return <ButtonField context={context} onClick={onClick} onFieldChange={onFieldChange} small={small}
            value={value} />;
    };
}

storiesOf('Field/ButtonField', module)
    .add('disabled in view', () =>
    {
        const fieldDisabledInView: FormFieldButton = {
            id: 'submit',
            label: 'Submit',
            type: FormFieldType.Button
        };
        return <FieldTester customFieldRenderer={createRenderer()} field={fieldDisabledInView} />;
    })
    .add('enabled in view', () =>
    {
        const fieldEnabledInView: FormFieldButton = {
            id: 'submit',
            label: 'Submit',
            type: FormFieldType.Button,
            enableInView: true
        };
        return <FieldTester customFieldRenderer={createRenderer()} field={fieldEnabledInView} />;
    })
    .add('small', () =>
    {
        const fieldDisabledInView: FormFieldButton = {
            id: 'submit',
            label: 'Submit',
            type: FormFieldType.Button
        };
        return <FieldTester customFieldRenderer={createRenderer(true)} field={fieldDisabledInView} />;
    });
