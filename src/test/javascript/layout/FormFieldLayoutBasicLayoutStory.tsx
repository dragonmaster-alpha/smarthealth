import {storiesOf} from '@storybook/react';
import React from 'react';
import FormDescription from 'smarthealth-javascript/FormDescription';
import FullScreen from 'test/container/FullScreen';
import FormFieldLayoutTester from 'test/layout/FormFieldLayoutTester';
import FormFieldLayoutFormDescription, {FORM_DESCRIPTION_DATA} from 'test/model/FormDescriptionMother';

/**
 * Tester for BasicLayout in FormFieldLayout.tsx
 *
 * @author Thompson 28/05/2019
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2019
 */

storiesOf('Form/Layout', module)
    .add('Basic Layout', () => (
        <FullScreen>
            <FormFieldLayoutTester formDescription={FormFieldLayoutFormDescription as FormDescription}
                data={FORM_DESCRIPTION_DATA} />
        </FullScreen>
    ));
