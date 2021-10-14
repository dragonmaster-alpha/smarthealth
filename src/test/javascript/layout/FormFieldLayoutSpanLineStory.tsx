import {storiesOf} from '@storybook/react';
import React from 'react';
import FieldLabelPosition from 'smarthealth-javascript/FieldLabelPosition';
import FormDescription from 'smarthealth-javascript/FormDescription';
import FullScreen from 'test/container/FullScreen';
import FormFieldLayoutTester from 'test/layout/FormFieldLayoutTester';
import {createFormDescriptionWithLayout, FORM_DESCRIPTION_DATA} from 'test/model/FormDescriptionMother';

/**
 * Tester for SpanLine in FormFieldLayout.tsx
 *
 * @author Thompson 28/05/2019
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2019
 */

storiesOf('Form/Layout', module)
    .add('SpanLine: Address', () =>
    {
        const spanLineFormDescription = createFormDescriptionWithLayout('address', {
            spanLine: true,
            labelPosition: FieldLabelPosition.Before
        });
        const data = {
            ...FORM_DESCRIPTION_DATA,
            address: '123456789 Very Long Street, Upper Suburbia Heights West'
        };
        return (
            <FullScreen>
                <FormFieldLayoutTester data={data}
                    formDescription={spanLineFormDescription as FormDescription} />
            </FullScreen>
        );
    });
