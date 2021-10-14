import {storiesOf} from '@storybook/react';
import React from 'react';
import FieldEditState from 'smarthealth-javascript/FieldEditState';
import FormFieldSnomedTerm from 'smarthealth-javascript/FormFieldSnomedTerm';
import FormFieldType from 'smarthealth-javascript/FormFieldType';
import FieldTester from 'test/field/FieldTester';

/**
 * Tester for SnomedTermField.tsx
 *
 * @author Thompson 27/02/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */

storiesOf('Field/SnomedTermField', module)
    .add('Standard',
        () =>
        {
            // TODO subset
            const field: FormFieldSnomedTerm = {
                id: 'immunisation',
                label: 'Immunisation',
                state: { editState: FieldEditState.Enabled },
                subset: '',
                type: FormFieldType.SnomedTerm
            };
            return (
                <>
                    <FieldTester field={field} />
                    <h3>TODO</h3>
                    <ul>
                        <li>Field is still under development</li>
                    </ul>
                </>);
        });
