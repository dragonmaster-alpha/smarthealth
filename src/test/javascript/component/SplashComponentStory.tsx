import {action as storybookAction} from '@storybook/addon-actions';
import {storiesOf} from '@storybook/react';
import Button from 'main/component/Button';
import SplashComponent from 'main/component/SplashComponent';
import React from 'react';

/**
 * Test SplashComponent
 *
 * @author Larry 4/01/2021
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2021
 */
storiesOf('Component/SplashComponent', module)
    .add('with simple string', () =>
    {
        return <SplashComponent>Loading OIDC Settings...</SplashComponent>;
    })
    .add('with components', () =>
    {
        return (
            <SplashComponent>
                <span>You have been logged out: </span>
                <Button title="Login" small={true} onClick={storybookAction('Login')} />
            </SplashComponent>
        );
    });
