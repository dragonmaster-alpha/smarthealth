import {I18nProvider} from '@lingui/react';
import {withConsole} from '@storybook/addon-console';
import {addDecorator} from '@storybook/react';
import 'font-awesome/css/font-awesome.css';
import AppStoreProviders from 'main/application/AppStoreProviders';
import MessagesComponent from 'main/application/MessagesComponent';
import ModalDialogs from 'main/application/ModalDialogs';
import 'primeicons/primeicons.css';
import 'primereact/resources/primereact.css';
import 'primereact/resources/themes/nova-light/theme.css';
import React from 'react';
import DisableWebsocketHandler from 'test/storybook/DisableWebsocketHandler';
import '../../../main/styles/main.scss';

/**
 * Configure Storybook.
 * <p>
 * Automatically imports all files in the test project with name *Story.tsx or *Story.js
 *
 * @author Larry 25/02/2019
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2019
 */

// setup stores and internationalisation
const decorators = storyRender => (
    <>
        <AppStoreProviders>
            <DisableWebsocketHandler>
                <I18nProvider language="en">
                    {storyRender()}
                    <ModalDialogs />
                    <MessagesComponent />
                </I18nProvider>
            </DisableWebsocketHandler>
        </AppStoreProviders>
    </>
);
addDecorator(decorators);
addDecorator((storyFn, context) => withConsole()(storyFn)(context));

// const req = require.context('../..', true, /Story\.(js|tsx)$/);
//
// function loadStories()
// {
//     req.keys()
//         .forEach(filename => req(filename));
// }
//
// configure(loadStories, module);
