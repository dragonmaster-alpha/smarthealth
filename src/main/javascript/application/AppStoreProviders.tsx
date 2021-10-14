import AppStore from 'main/store/AppStore';
import {Provider} from 'mobx-react';
import React from 'react';

/**
 * Higher Order Component to provide all the mobx stores for the application
 *
 * @author Larry 18/12/2018
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2018
 */
const appStore = new AppStore();

// tslint:disable-next-line:variable-name
const AppStoreProviders: React.FC = (props) => (
    <Provider actionStore={appStore.actionStore} appStore={appStore} componentStore={appStore.componentStore}
        entityCache={appStore.entityCache} handlers={appStore.handlers} sessionStore={appStore.sessionStore}>
        {props.children}
    </Provider>
);

export default AppStoreProviders;
