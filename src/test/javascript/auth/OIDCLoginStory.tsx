import {storiesOf} from '@storybook/react';
import OIDCLogin from 'main/auth/OIDCLogin';
import SplashComponent from 'main/component/SplashComponent';
import React from 'react';
import SetStore from 'test/component/SetStore';

/**
 * Storybook for OIDCLogin
 *
 * TODO more stories
 *
 * @author Larry 4/01/2021
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2021
 */
storiesOf('Auth/OIDCLogin', module)
    .add('Initial State', () =>
    {
        return (
            <SetStore set={appStore =>
            {
                appStore.sessionStore.oidcStore.clear();
            }}>
                <SplashComponent><OIDCLogin /></SplashComponent>
            </SetStore>
        );
    })
    .add('Session timeout', () =>
    {
        return (
            <SetStore set={appStore =>
            {
                appStore.sessionStore.oidcStore.error = 'Smart Health is not available. Please try again in a minute.';
            }}>
                <SplashComponent><OIDCLogin /></SplashComponent>
            </SetStore>
        );
    })
    .add('Logged out', () =>
    {
        return (
            <SetStore set={appStore =>
            {
                appStore.sessionStore.oidcStore.error = 'The session has been logged out';
            }}>
                <SplashComponent><OIDCLogin /></SplashComponent>
            </SetStore>
        );
    });
