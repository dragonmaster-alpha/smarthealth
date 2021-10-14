import {action as storybookAction} from '@storybook/addon-actions';
import IconButton from 'main/component/IconButton';
import React from 'react';

/**
 * Tester for IconButton
 *
 * @author Larry 20/11/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
export default {
    title: 'Component/IconButton',
    component: IconButton
};

export const buttons = () => (
    <div style={{ display: 'flex', gap: '4px', padding: '16px' }}>
        <IconButton icon="program-cancer" primary={true} onClick={storybookAction('Clicked Primary')} />
        <IconButton icon="program-cf" onClick={storybookAction('Clicked Secondary')} />
        <IconButton icon="program-imm" onClick={storybookAction('Clicked Another')} />
        <IconButton icon="program-watch" onClick={storybookAction('Clicked Patient Watch')} />
        <IconButton icon="program-renal" onClick={storybookAction('Clicked Disabled')} disabled={true} />
    </div>
);

export const smallButtons = () => (
    <div style={{ display: 'flex', gap: '4px', padding: '16px' }}>
        <IconButton icon="program-cancer" primary={true} small={true} onClick={storybookAction('Clicked Primary')} />
        <IconButton icon="program-cf" onClick={storybookAction('Clicked Secondary')} small={true} />
        <IconButton icon="program-imm" onClick={storybookAction('Clicked Another')} small={true} />
        <IconButton icon="program-watch" onClick={storybookAction('Clicked Patient Watch')} small={true} />
        <IconButton icon="program-renal" onClick={storybookAction('Clicked Disabled')} disabled={true} small={true} />
    </div>
);

export const withToolTip = () => (
    <div style={{ display: 'flex', gap: '4px', padding: '16px' }}>
        <IconButton icon="program-cancer" toolTip="Cancer" primary={true}
            onClick={storybookAction('Clicked Primary')} />
        <IconButton icon="program-cf" toolTip="Cystic Fibrosis" onClick={storybookAction('Clicked Secondary')} />
        <IconButton icon="program-renal" toolTip="Disabled" onClick={storybookAction('Clicked Disabled')}
            disabled={true} />
    </div>
);
