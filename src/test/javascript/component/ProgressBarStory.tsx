import {storiesOf} from '@storybook/react';
import ProgressBar from 'main/component/ProgressBar';
import React from 'react';

/**
 * Story for ProgressBar
 *
 * @author Larry 5/01/2021
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2021
 */
storiesOf('Component/ProgressBar', module)
    .add('Indeterminate', () =>
    {
        return (
            <div style={{ padding: '8px', width: '400px' }}>
                <ProgressBar indeterminate={true} />
            </div>
        );
    });
