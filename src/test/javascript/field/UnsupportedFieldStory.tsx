import {storiesOf} from '@storybook/react';
import React from 'react';
import FieldEditState from 'smarthealth-javascript/FieldEditState';
import FormFieldType from 'smarthealth-javascript/FormFieldType';
import FormFieldUnsupported from 'smarthealth-javascript/FormFieldUnsupported';
import FieldTester from 'test/field/FieldTester';

/**
 * Allow debugging of UnsupportedField component
 *
 * @author Larry 27/03/2018
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2018
 */
storiesOf('Field/UnsupportedField', module)
    .add('Standard',
        () =>
        {
            const field: FormFieldUnsupported = {
                id: 'Unsupported',
                label: 'Unsupported',
                name: 'Something not implemented',
                state: { editState: FieldEditState.Enabled },
                type: FormFieldType.Unsupported
            };
            return (
                <>
                    <FieldTester field={field} />
                    <h3>Description</h3>
                    <ol>
                        <li>
                            Show unsupported text when a new field type is added to the form description that WebUI
                            hasn't yet supported/implemented.
                        </li>
                    </ol>
                </>
            );
        });
