/* tslint:disable:no-console */
import {storiesOf} from '@storybook/react';
import Button from 'main/component/Button';
import React from 'react';

/**
 * Tester for Button
 *
 * @author Larry 22/03/2018
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2018
 */
storiesOf('Component/Button', module)
    .add('buttons', () =>
    {
        return (
            <div style={{ display: 'flex', gap: '16px', padding: '16px' }}>
                <Button title="Primary" primary={true} onClick={() => console.log('Primary')} />
                <Button title="Secondary" onClick={() => console.log('Secondary')} />
                <Button title="Another" onClick={() => console.log('Another')} />
                <Button title="Disabled" onClick={() => console.log('Disabled')} disabled={true} />
            </div>
        );
    })
    .add('small', () =>
    {
        return (
            <div style={{ display: 'flex', gap: '16px', padding: '16px' }}>
                <Button title="Primary" primary={true} small={true} onClick={() => console.log('Primary')} />
                <Button title="Secondary" small={true} onClick={() => console.log('Secondary')} />
                <Button title="Another" small={true} onClick={() => console.log('Another')} />
                <Button title="Disabled" small={true} onClick={() => console.log('Disabled')} disabled={true} />
            </div>
        );
    });
