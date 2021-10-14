import {action as storybookAction} from '@storybook/addon-actions';
import {storiesOf} from '@storybook/react';
import MonthSelector from 'main/component/MonthSelector';
import React from 'react';

/**
 * Tester for MonthSelectorOld
 *
 * @author Thompson 19/01/2021
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2021
 */
storiesOf('Component/MonthSelector', module)
    .add('Empty', () =>
    {
        return <MonthSelector onSelection={storybookAction('onSelection')}
            value={null} />;
    })
    .add('Selection', () =>
    {
        return <MonthSelector onSelection={storybookAction('onSelection')}
            value={6} />;
    });
