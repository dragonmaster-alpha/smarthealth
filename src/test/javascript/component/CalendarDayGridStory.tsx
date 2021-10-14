import {action as storybookAction} from '@storybook/addon-actions';
import {storiesOf} from '@storybook/react';
import CalendarDayGrid from 'main/component/CalendarDayGrid';
import React from 'react';

/**
 * Tester for CalendarDayGrid
 *
 * @author Thompson 13/01/2021
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2021
 */
storiesOf('Component/CalendarDayGrid', module)
    .add('Empty', () =>
    {
        return <CalendarDayGrid onSelection={storybookAction('onSelection')} />;
    })
    .add('Standard month', () =>
    {
        return <>
            <CalendarDayGrid year={2020} month={1} onSelection={storybookAction('onSelection')} />
            <h3>
                Description
            </h3>
            <ul>
                <li>For calendar 2020-01</li>
            </ul>
        </>;
    })
    .add('Date selected', () =>
    {
        return <>
            <CalendarDayGrid year={2021} month={5} onSelection={storybookAction('onSelection')}
                value={{ iso: '2021-05-15' }} />
            <h3>
                Description
            </h3>
            <ul>
                <li>For calendar 2021-05 with date selection on 15th</li>
            </ul>
        </>;
    })
    .add('Leap month', () =>
    {
        return <>
            <CalendarDayGrid year={2020} month={2} onSelection={storybookAction('onSelection')} />
            <h3>
                Description
            </h3>
            <ul>
                <li>For calendar 2020-02</li>
            </ul>
        </>;
    })
    .add('6 rows of dates', () =>
    {
        return <>
            <CalendarDayGrid year={2021} month={1} onSelection={storybookAction('onSelection')} />
            <h3>
                Description
            </h3>
            <ul>
                <li>For calendar 2021-01</li>
            </ul>
        </>;
    })
    .add('Year only', () =>
    {
        return <CalendarDayGrid year={2020} onSelection={storybookAction('onSelection')} />;
    });
