import {storiesOf} from '@storybook/react';
import React from 'react';
import FieldLabelPosition from 'smarthealth-javascript/FieldLabelPosition';
import FormDescription from 'smarthealth-javascript/FormDescription';
import FullScreen from 'test/container/FullScreen';
import FormFieldLayoutTester from 'test/layout/FormFieldLayoutTester';
import {createFormDescriptionWithLayout, FORM_DESCRIPTION_DATA} from 'test/model/FormDescriptionMother';

/**
 * Tester for Skip in FormFieldLayout.tsx
 *
 * @author Thompson 28/05/2019
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2019
 */
storiesOf('Form/Layout', module)
    .add('Skip 2: Also known as', () =>
    {
        const skipFormDescription = createFormDescriptionWithLayout('alsoKnownAs', {
            skip: 2,
            labelPosition: FieldLabelPosition.Before
        });
        return (
            <FullScreen>
                <FormFieldLayoutTester data={FORM_DESCRIPTION_DATA}
                    formDescription={skipFormDescription as FormDescription} />
            </FullScreen>
        );
    });
