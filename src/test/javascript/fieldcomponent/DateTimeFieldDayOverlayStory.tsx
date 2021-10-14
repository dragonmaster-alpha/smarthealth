import {action as storybookAction} from '@storybook/addon-actions';
import {storiesOf} from '@storybook/react';
import OverlayBorder from 'main/component/OverlayBorder';
import OverlayPanel from 'main/container/OverlayPanel';
import DateTimeFieldDayOverlay from 'main/fieldcomponent/DateTimeFieldDayOverlay';
import React from 'react';

/**
 * Tester for DateTimeFieldDayOverlay
 *
 * @author Thompson 19/01/2021
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2021
 */
storiesOf('FieldComponent/DateTimeFieldDayOverlay', module)
    .add('Empty', () =>
    {
        return (
            <div style={{ margin: '8px' }}>
                <OverlayPanel onExit={storybookAction('onExit')}>
                    <OverlayBorder>
                        <DateTimeFieldDayOverlay onChange={storybookAction('onChange')}
                            onExit={storybookAction('onExit')} value={null} />
                    </OverlayBorder>
                </OverlayPanel>
            </div>
        );
    })
    .add('Year', () =>
    {
        return (
            <div style={{ margin: '8px' }}>
                <OverlayPanel onExit={storybookAction('onExit')}>
                    <OverlayBorder>
                        <DateTimeFieldDayOverlay onChange={storybookAction('onChange')}
                            onExit={storybookAction('onExit')} value={{ iso: '2020' }} />
                    </OverlayBorder>
                </OverlayPanel>
            </div>
        );
    })
    .add('Year and Month', () =>
    {
        return (
            <div style={{ margin: '8px' }}>
                <OverlayPanel onExit={storybookAction('onExit')}>
                    <OverlayBorder>
                        <DateTimeFieldDayOverlay onChange={storybookAction('onChange')}
                            onExit={storybookAction('onExit')} value={{ iso: '2020-12' }} />
                    </OverlayBorder>
                </OverlayPanel>
            </div>
        );
    })
    .add('Selected', () =>
    {
        return (
            <div style={{ margin: '8px' }}>
                <OverlayPanel onExit={storybookAction('OverlayPanel.onExit')}>
                    <OverlayBorder>
                        <DateTimeFieldDayOverlay onChange={storybookAction('onChange')}
                            onExit={storybookAction('onExit')} value={{ iso: '2020-12-25' }} />
                    </OverlayBorder>
                </OverlayPanel>
            </div>
        );
    })
    .add('Selected in previous month', () =>
    {
        return (
            <>
                <div style={{ height: '250px', margin: '8px' }}>
                    <OverlayPanel onExit={storybookAction('onExit')}>
                        <OverlayBorder>
                            <DateTimeFieldDayOverlay onChange={storybookAction('onChange')}
                                onExit={storybookAction('onExit')} value={{ iso: '2020-01-29' }} />
                        </OverlayBorder>
                    </OverlayPanel>
                </div>
                <h3>Description</h3>
                <ul>
                    <li>
                        If date selected is the last few dates of a month (January) and the user navigates to the next
                        month (February). If the selected date is visible in the next month greyed out section then it
                        should be selected.
                    </li>
                </ul>
                <h3>Usage</h3>
                <ul>
                    <li>Click on the next month button.</li>
                </ul>
            </>
        );
    })
    .add('Selected in post month', () =>
    {
        return (
            <>
                <div style={{ height: '250px', margin: '8px' }}>
                    <OverlayPanel onExit={storybookAction('onExit')}>
                        <OverlayBorder>
                            <DateTimeFieldDayOverlay onChange={storybookAction('onChange')}
                                onExit={storybookAction('onExit')} value={{ iso: '2020-01-02' }} />
                        </OverlayBorder>
                    </OverlayPanel>
                </div>
                <h3>Description</h3>
                <ul>
                    <li>
                        If date selected is the first few dates of a month (January) and the user navigates to the
                        previous month (December). If the selected date is visible in the previous month greyed out
                        section then it should be selected.
                    </li>
                </ul>
                <h3>Usage</h3>
                <ul>
                    <li>Click on the previous month button.</li>
                </ul>
            </>
        );
    });
