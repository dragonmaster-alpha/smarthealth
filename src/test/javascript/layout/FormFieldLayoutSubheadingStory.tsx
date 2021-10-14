import {storiesOf} from '@storybook/react';
import React from 'react';
import FormDescription from 'smarthealth-javascript/FormDescription';
import FullScreen from 'test/container/FullScreen';
import FormFieldLayoutTester from 'test/layout/FormFieldLayoutTester';
import FORM_DESCRIPTION, {FORM_DESCRIPTION_DATA} from 'test/model/FormDescriptionMother';

/**
 * Tester for Subheading in FormFieldLayout.tsx
 *
 * @author Thompson 31/05/2019
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2019
 */
storiesOf('Form/Layout', module)
    .add('Subheading: This is a SUBHEADING',
        () =>
        {
            const subheadingFormDescription = {
                ...FORM_DESCRIPTION,
                fieldsAndSections: [...FORM_DESCRIPTION.fieldsAndSections]
            };
            subheadingFormDescription.fieldsAndSections.push({
                // @ts-ignore
                subheading: 'This is a SUBHEADING'
            });
            subheadingFormDescription.fieldsAndSections.push({
                // @ts-ignore
                field: {
                    size: 50,
                    id: 'after',
                    label: 'After',
                    type: 'Text'
                }
            });
            return (
                <FullScreen>
                    <FormFieldLayoutTester data={FORM_DESCRIPTION_DATA}
                        formDescription={subheadingFormDescription as FormDescription} />)
                </FullScreen>
            );
        });
