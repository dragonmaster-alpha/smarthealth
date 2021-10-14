import {action as storybookAction} from '@storybook/addon-actions';
import {storiesOf} from '@storybook/react';
import OverlayBorder from 'main/component/OverlayBorder';
import OverlayPanel from 'main/container/OverlayPanel';
import DateTimeFieldMonthOverlay from 'main/fieldcomponent/DateTimeFieldMonthOverlay';
import React from 'react';

/**
 * Tester for DateTimeFieldMonthOverlay
 *
 * @author Thompson 19/01/2021
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2021
 */
storiesOf('FieldComponent/DateTimeFieldMonthOverlay', module)
    .add('Empty', () =>
    {
        return (
            <div style={{ margin: '8px' }}>
                <OverlayPanel onExit={storybookAction('onExit')}>
                    <OverlayBorder>
                        <DateTimeFieldMonthOverlay onChange={storybookAction('onChange')}
                            onExit={storybookAction('onExit')} value={null} />
                    </OverlayBorder>
                </OverlayPanel>
            </div>
        );
    })
    .add('Year only', () =>
    {
        return (
            <div style={{ margin: '8px' }}>
                <OverlayPanel onExit={storybookAction('onExit')}>
                    <OverlayBorder>
                        <DateTimeFieldMonthOverlay onChange={storybookAction('onChange')}
                            onExit={storybookAction('onExit')} value={{ iso: '2010' }} />
                    </OverlayBorder>
                </OverlayPanel>
            </div>
        );
    })
    .add('Month selected', () =>
    {
        return (
            <div style={{ margin: '8px' }}>
                <OverlayPanel onExit={storybookAction('onExit')}>
                    <OverlayBorder>
                        <DateTimeFieldMonthOverlay onChange={storybookAction('onChange')}
                            onExit={storybookAction('onExit')} value={{ iso: '2010-05' }} />
                    </OverlayBorder>
                </OverlayPanel>
            </div>
        );
    });
