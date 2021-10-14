import {action as storybookAction} from '@storybook/addon-actions';
import {storiesOf} from '@storybook/react';
import CalendarDropdownButton from 'main/component/CalendarDropdownButton';
import React from 'react';

/**
 * Tester for CalendarDropdownButton.
 *
 * @author Thompson 13/01/2021
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2021
 */
storiesOf('Component/CalendarDropdownButton', module)
    .add('enabled', () =>
    {
        return (
            <CalendarDropdownButton disabled={false} onToggle={storybookAction('onToggle')} />
        );
    })
    .add('disabled', () =>
    {
        return (
            <CalendarDropdownButton disabled={true} onToggle={storybookAction('onToggle')} />
        );
    });
