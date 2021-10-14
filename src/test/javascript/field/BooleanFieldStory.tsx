import {storiesOf} from '@storybook/react';
import React from 'react';
import FieldEditState from 'smarthealth-javascript/FieldEditState';
import FormFieldBoolean from 'smarthealth-javascript/FormFieldBoolean';
import FormFieldType from 'smarthealth-javascript/FormFieldType';
import FieldTester from 'test/field/FieldTester';
import {fieldUsage} from 'test/field/FieldUsageUtility';

/**
 * Allow debugging of BooleanField component
 *
 * @author Priyanka 22/02/2019
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2019
 */
storiesOf('Field/BooleanField', module)
    .add('Yes/No', () =>
    {
        const field: FormFieldBoolean = {
            id: 'field',
            label: 'Field',
            state: { editState: FieldEditState.Enabled },
            type: FormFieldType.Boolean
        };
        return <FieldTester field={field} />;
    })
    .add('True/False', () =>
    {
        const field: FormFieldBoolean = {
            id: 'field',
            label: 'Field',
            state: { editState: FieldEditState.Enabled },
            type: FormFieldType.Boolean,
            trueDisplayText: 'True',
            falseDisplayText: 'False'
        };
        return <FieldTester field={field} />;
    })
    .add('Present/Not Present, tooltip', () =>
    {
        const field: FormFieldBoolean = {
            id: 'field',
            label: 'Field',
            state: { editState: FieldEditState.Enabled },
            type: FormFieldType.Boolean,
            trueDisplayText: 'Present',
            falseDisplayText: 'Not Present',
            toolTip: 'Will I get any presents for Christmas?'
        };
        return <FieldTester field={field} />;
    })
    .add('Usage', () => fieldUsage(FormFieldType.Boolean));
