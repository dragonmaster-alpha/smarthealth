import {storiesOf} from '@storybook/react';
import React from 'react';
import FieldLabelPosition from 'smarthealth-javascript/FieldLabelPosition';
import FormDescription from 'smarthealth-javascript/FormDescription';
import FullScreen from 'test/container/FullScreen';
import FormFieldLayoutTester from 'test/layout/FormFieldLayoutTester';
import {createFormDescriptionWithLayout, FORM_DESCRIPTION_DATA} from 'test/model/FormDescriptionMother';

/**
 * Tester for Span in FormFieldLayout.tsx
 *
 * @author Thompson 28/05/2019
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2019
 */
storiesOf('Form/Layout', module)
    .add('Span 2: Name', () =>
    {
        const spanFormDescription = createFormDescriptionWithLayout('name', {
            span: 2,
            labelPosition: FieldLabelPosition.Before
        });

        const data = { ...FORM_DESCRIPTION_DATA, name: 'This is a long name that spans 2 columns' };
        return (
            <FullScreen>
                <FormFieldLayoutTester data={data}
                    formDescription={spanFormDescription as FormDescription} />
            </FullScreen>
        );
    });
