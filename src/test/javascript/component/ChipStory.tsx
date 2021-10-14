import {action as storybookAction} from '@storybook/addon-actions';
import {storiesOf} from '@storybook/react';
import Chip from 'main/component/Chip';
import React from 'react';

/**
 * Tester for Chip
 *
 * @author Larry 16/12/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
storiesOf('Component/Chip', module)
    .add('chips', () =>
    {
        function onClose(value)
        {
            storybookAction('onClose')(value);
        }

        const values = ['Acidophilus', 'Egg White Powder', 'Fish Oil Omega 3', 'Nepro'];
        return (
            <div style={{ display: 'flex', gap: '16px', padding: '16px' }}>
                {values.map(value => <Chip text={value} onClose={() => onClose(value)} />)}
                <Chip text="Disabled" onClose={() => onClose('Disabled')} disabled={true} />
            </div>
        );
    });
