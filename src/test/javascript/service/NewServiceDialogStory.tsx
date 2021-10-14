import {storiesOf} from '@storybook/react';
import NewServiceDialog from 'main/service/NewServiceDialog';
import React from 'react';
import NewServiceMenuItem from 'smarthealth-javascript/NewServiceMenuItem';
import MENU_NOCONSENT from 'smarthealth-rest-test/newservicemenu-noehrconsent.json';
import MENU_PERMISSIONS from 'smarthealth-rest-test/newservicemenu-permissions.json';
import MENU from 'smarthealth-rest-test/newservicemenu.json';
import SetStore from 'test/component/SetStore';
import {promiseResolved} from 'test/utility/PromiseUtility';

/**
 * Tester for New Service Dialog
 *
 * @author Larry 28/08/2019
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2019
 */

storiesOf('Service/New Service Dialog', module)
    .add('with EHR consent', () =>
    {
        return (
            <SetStore set={appStore =>
            {
                appStore.handlers.serviceRecordHandler.getMenuItems =
                    () => promiseResolved(MENU as NewServiceMenuItem[]);
            }}>
                <NewServiceDialog />
            </SetStore>
        );
    })
    .add('with few permissions', () =>
    {
        return (
            <SetStore set={appStore =>
            {
                appStore.handlers.serviceRecordHandler.getMenuItems =
                    () => promiseResolved(MENU_PERMISSIONS as NewServiceMenuItem[]);
            }}>
                <NewServiceDialog />
            </SetStore>
        );
    })
    .add('without EHR consent', () =>
    {
        return (
            <SetStore set={appStore =>
            {
                appStore.handlers.serviceRecordHandler.getMenuItems =
                    () => promiseResolved(MENU_NOCONSENT as NewServiceMenuItem[]);
            }}>
                <NewServiceDialog />
            </SetStore>
        );
    });
