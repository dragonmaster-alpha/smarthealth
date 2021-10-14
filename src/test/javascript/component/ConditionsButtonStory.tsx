import {storiesOf} from '@storybook/react';
import ConditionsButton from 'main/component/ConditionsButton';
import React from 'react';

/**
 * Allow debugging of ConditionsButton.tsx
 *
 * @author Thompson 27/03/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
storiesOf('Component/ConditionsButton', module)
    .add('standard', () => (
        <>
            <ConditionsButton />
        </>
    ));
