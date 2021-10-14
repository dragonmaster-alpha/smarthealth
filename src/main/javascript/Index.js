// Polyfills needs to load before index.js, Therefore Include them as separate entry in webpack.config.js
import LOG from 'loglevel';
import AppComponent from 'main/application/AppComponent';
import AppStoreProviders from 'main/application/AppStoreProviders';
import I18nContainer from 'main/application/I18nContainer';
import SupportedBrowserChecker from 'main/application/SupportedBrowserChecker';
import * as mobx from 'mobx';
import React from 'react';
import ReactDOM from 'react-dom';
import HttpsRedirect from 'react-https-redirect';
import '../styles/main.scss';

/**
 * Root of the application, which loads the React Application in to the DOM
 *
 * TODO Conditionally Set Log level.
 *
 * @author Uditha 26/02/2018
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2018
 */
LOG.setLevel('debug');

// all state modifications must occur inside an action
mobx.configure({ enforceActions: 'observed' });

const Root = () => (
    <HttpsRedirect>
        <SupportedBrowserChecker>
            <AppStoreProviders>
                <I18nContainer>
                    <AppComponent />
                </I18nContainer>
            </AppStoreProviders>
        </SupportedBrowserChecker>
    </HttpsRedirect>
);

ReactDOM.render(<Root />, document.getElementById('root'));
