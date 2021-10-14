import {storiesOf} from '@storybook/react';
import React from 'react';
import FieldLabelPosition from 'smarthealth-javascript/FieldLabelPosition';
import FormDescription from 'smarthealth-javascript/FormDescription';
import FullScreen from 'test/container/FullScreen';
import FormFieldLayoutTester from 'test/layout/FormFieldLayoutTester';
import {createFormDescriptionWithLayout, FORM_DESCRIPTION_DATA} from 'test/model/FormDescriptionMother';

/**
 * Tester for groupWithNext in FormFieldLayout.tsx
 *
 * @author Thompson 31/05/2019
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2019
 */

storiesOf('Form/Layout', module)
    .add('groupWithNext: Sex with Date of birth - TODO fix', () =>
    {
        const groupWithNext = createFormDescriptionWithLayout('sex', {
            labelPosition: FieldLabelPosition.Before
        });
        return (
            <FullScreen>
                <FormFieldLayoutTester data={FORM_DESCRIPTION_DATA}
                    formDescription={groupWithNext as FormDescription} />
            </FullScreen>
        );
    });
