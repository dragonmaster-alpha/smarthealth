import {action as storybookAction} from '@storybook/addon-actions';
import {storiesOf} from '@storybook/react';
import MonthSelectorOld from 'main/component/MonthSelectorOld';
import React from 'react';

/**
 * Tester for MonthSelectorOld
 *
 * @author Thompson 18/01/2021
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2021
 */
storiesOf('Component/MonthSelectorOld', module)
    .add('Empty', () =>
    {
        return <MonthSelectorOld onSelection={storybookAction('onSelection')}
            value={null} />;
    })
    .add('Selection', () =>
    {
        return <MonthSelectorOld onSelection={storybookAction('onSelection')}
            value={6} />;
    });
