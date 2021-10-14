import {storiesOf} from '@storybook/react';
import React from 'react';
import FormDescription from 'smarthealth-javascript/FormDescription';
import FullScreen from 'test/container/FullScreen';
import FormFieldLayoutTester from 'test/layout/FormFieldLayoutTester';
import FORM_DESCRIPTION, {FORM_DESCRIPTION_DATA} from 'test/model/FormDescriptionMother';

/**
 * Tester for Section and End in SectionFormFieldLayout.tsx
 *
 *
 * @author Thompson 30/05/2019
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2019
 */

storiesOf('Form/Layout', module)
    .add('Section and End Section', () =>
    {
        const sectionAndEndSectionFormDescription = {
            ...FORM_DESCRIPTION,
            fieldsAndSections: [...FORM_DESCRIPTION.fieldsAndSections]
        };
        sectionAndEndSectionFormDescription.fieldsAndSections.unshift({
            // @ts-ignore
            field: {
                size: 50,
                id: 'before',
                label: 'Before',
                type: 'Text'
            }
        });
        sectionAndEndSectionFormDescription.fieldsAndSections.push({
            // @ts-ignore
            field: {
                size: 200,
                id: 'demographics.alsoKnownAs',
                label: 'Also known as',
                type: 'Text'
            }
        });
        return (
            <FullScreen>
                <FormFieldLayoutTester data={FORM_DESCRIPTION_DATA}
                    formDescription={sectionAndEndSectionFormDescription as FormDescription} />
            </FullScreen>
        );
    });
