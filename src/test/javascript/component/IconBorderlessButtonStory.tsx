import {action as storybookAction} from '@storybook/addon-actions';
import IconBordelessButton from 'main/component/IconBordelessButton';
import React from 'react';

/**
 * Tester for IconBorderlessButton
 *
 * @author Larry 20/01/2021
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2021
 */
export default {
    title: 'Component/IconBorderlessButton'
};

export const buttons = () => (
    <div style={{ display: 'flex', gap: '4px', padding: '16px' }}>
        <IconBordelessButton icon="program-cancer" onClick={storybookAction('Clicked Cancer')} />
        <IconBordelessButton icon="program-cf" onClick={storybookAction('Clicked Secondary')} />
        <IconBordelessButton icon="program-imm" onClick={storybookAction('Clicked Another')} />
        <IconBordelessButton icon="program-watch" onClick={storybookAction('Clicked Patient Watch')} />
        <IconBordelessButton icon="program-renal" onClick={storybookAction('Clicked Disabled')} disabled={true} />
    </div>
);

export const withToolTip = () => (
    <div style={{ display: 'flex', gap: '4px', padding: '16px' }}>
        <IconBordelessButton icon="program-cancer" toolTip="Cancer" onClick={storybookAction('Clicked Primary')} />
        <IconBordelessButton icon="program-cf" toolTip="Cystic Fibrosis"
            onClick={storybookAction('Clicked Secondary')} />
        <IconBordelessButton icon="program-renal" toolTip="Disabled" onClick={storybookAction('Clicked Disabled')}
            disabled={true} />
    </div>
);
