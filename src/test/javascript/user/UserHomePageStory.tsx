import {storiesOf} from '@storybook/react';
import AppStore from 'main/store/AppStore';
import UserHomePage from 'main/user/UserHomePage';
import React from 'react';
import SetStore from 'test/component/SetStore';
import {allPermissions} from 'test/data/PermissionsMother';

/**
 * Allow debugging of UserHomePage component
 *
 * @author Larry 22/03/2018
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2018
 */
storiesOf('User/UserHomePage', module)
    .add('All permissions', () =>
    {
        return (
            <SetStore set={(appStore: AppStore) =>
            {
                appStore.sessionStore.permissions = allPermissions();
                appStore.sessionStore.memberAlerts = null;
            }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gridTemplateRows: '1fr', height: '100vh' }}>
                    <UserHomePage />
                </div>
            </SetStore>
        );
    })
    .add('Unread alerts', () =>
    {
        return (
            <SetStore set={(appStore: AppStore) =>
            {
                appStore.sessionStore.permissions = allPermissions();
                appStore.sessionStore.memberAlerts = ['one'];
            }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gridTemplateRows: '1fr', height: '100vh' }}>
                    <UserHomePage />
                </div>
            </SetStore>
        );
    });
