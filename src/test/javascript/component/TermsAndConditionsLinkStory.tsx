import {storiesOf} from '@storybook/react';
import TermsAndConditionsLink from 'main/component/TermsAndConditionsLink';
import React from 'react';

/**
 * Allow testing of TermsAndConditionsLink.tsx
 *
 * @author Thompson 17/10/2019
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2019
 */

storiesOf('Component/TermsAndConditionsLink', module)
    .add('Standard', () =>
    {
        return <TermsAndConditionsLink />;
    });
