import buildURL from 'build-url';
import {autobind} from 'core-decorators';
import {truncate} from 'lodash';
import LOG from 'loglevel';
import DialogIcons from 'main/dialog/DialogIcons';
import OKDialog from 'main/dialog/OKDialog';
import TermsOfUseDialog from 'main/dialog/TermsOfUseDialog';
import AppStore from 'main/store/AppStore';
import {
    STATE_AUTHENTICATE, STATE_CHECK_VERSION, STATE_LOGIN, STATE_OIDC_SETTINGS, STATE_SELECT_MEMBER
} from 'main/store/OIDCStore';
import AutoCloser from 'main/utility/AutoCloser';
import {jsonify} from 'main/utility/Jsonify';
import secureToken from 'main/utility/SecureToken';
import {action} from 'mobx';
import qs from 'qs';
import React from 'react';
import MedicalGroupAndLocationsDigest from 'smarthealth-javascript/MedicalGroupAndLocationsDigest';
import OIDCDetails from 'smarthealth-javascript/OIDCDetails';
import {clientVersion} from 'smarthealth-javascript/package.json';
import PossibleLogins from 'smarthealth-javascript/PossibleLogins';

/**
 * OIDC (OpenID Connect) operations for authentication
 *
 * @author Larry 5/04/2018
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2018
 */
class OIDCLoginController
{
    /**
     * Remove the query from the current URL
     */
    private static removeQuery()
    {
        const { href } = window.location;
        if (href.indexOf('?') > 0)
        {
            const url = href.split('?')[0];
            window.history.replaceState('', document.title, url);
        }
    }

    private readonly appStore: AppStore;

    private readonly autoCloser: AutoCloser;

    private oidcSettings: OIDCDetails;

    constructor(appStore: AppStore)
    {
        this.appStore = appStore;
        this.oidcSettings = undefined;
        this.autoCloser = new AutoCloser();
    }

    @autobind
    public async checkVersion()
    {
        LOG.debug('OIDCLoginController.checkVersion()');
        this.appStore.handlers.sessionHandler.getServerDetails()
            .then(result => this.checkVersionResult(result))
            .catch(error => this.handleError(error));
    }

    public checkVersionResult(result)
    {
        if (result.shuttingDown)
        {
            throw new Error('Smart Health is shutting down. Please try later.');
        }
        if (result.version !== clientVersion)
        {
            throw new Error('Version mismatch');
        }

        this.appStore.sessionStore.oidcStore.setState(STATE_OIDC_SETTINGS);
    }

    public close()
    {
        this.autoCloser.onUnmount();
    }

    /**
     * Determine the OIDC state when the OIDCLogin component is initially loaded or loaded after a redirect from Smart
     * Auth.
     */
    public determineState()
    {
        const { oidcStore } = this.appStore.sessionStore;
        const { sessionStorage } = window;
        const { search } = window.location;

        LOG.debug(`determineState: ${search} - ${sessionStorage.oidcState} `);

        if (search)
        {
            // we have returned from the call to Smart Auth
            if (!sessionStorage.oidcState)
            {
                // there is no stored state, so the search is probably due to a refresh - start the login again
                oidcStore.setState(STATE_CHECK_VERSION);
            }
            else
            {
                this.handleAuthenticationResult(search);
            }
        }
        else if (sessionStorage.oidcNonce && sessionStorage.oidcState && sessionStorage.oidcCode)
        {
            LOG.debug('Already authenticated');
            OIDCLoginController.removeQuery();
            oidcStore.setState(STATE_LOGIN);
        }
        else
        {
            oidcStore.setState(STATE_CHECK_VERSION);
        }
    }

    @autobind
    public fetchOIDCSettings()
    {
        LOG.debug('OIDCLoginController.fetchOIDCSettings()');
        this.appStore.handlers.sessionHandler.getOIDCSettings()
            .then(result => this.fetchOIDCSettingsResult(result))
            .catch(error => this.handleError(error));
    }

    public fetchOIDCSettingsResult(result: OIDCDetails)
    {
        if (result)
        {
            LOG.debug(JSON.stringify(result));
            this.oidcSettings = result;
            this.appStore.sessionStore.oidcStore.setState(STATE_AUTHENTICATE);
        }
        else
        {
            LOG.warn('Error getting OIDC');
        }
    }

    public handleAuthenticationResult(search)
    {
        const parsed = qs.parse(search);
        const { oidcStore } = this.appStore.sessionStore;
        const { sessionStorage } = window;

        LOG.debug(`${parsed.state}===${sessionStorage.oidcState}`);
        if (parsed.state !== sessionStorage.oidcState)
        {
            // invalid state - different session
            OIDCLoginController.removeQuery();
            sessionStorage.clear();
            const message = 'Invalid OIDC state';
            this.showError(message);
            oidcStore.setError(message);
            return;
        }

        sessionStorage.oidcCode = parsed['?code'];
        LOG.debug(`code: ${sessionStorage.oidcCode}`);
        // oidcStore.gotCode();
        OIDCLoginController.removeQuery();
        oidcStore.setState(STATE_LOGIN);
    }

    public handleError(error)
    {
        LOG.warn(jsonify(error));
        let message;
        const { code, response } = error;
        if (response)
        {
            message = `Error ${response.status} ${response.statusText} - ${truncate(response.data, { length: 40 })}`;
        }
        else if ((code === 'ECONNABORTED') || (message === 'Network Error'))
        {
            message = 'Smart Health is not available. Please try again in a minute.';
        }
        else
        {
            message = error.message;
        }

        // this.showError(message);
        this.appStore.sessionStore.oidcStore.setError(message);
        window.sessionStorage.clear();
    }

    /**
     * Configure state transitions
     * <p>
     * A separate init function so that unit tests don't trigger mobx
     */
    public initStateMachine()
    {
        const { oidcStore } = this.appStore.sessionStore;
        this.autoCloser.createMobXWhen(() => oidcStore.state === STATE_CHECK_VERSION, this.checkVersion);
        this.autoCloser.createMobXWhen(() => oidcStore.state === STATE_OIDC_SETTINGS, this.fetchOIDCSettings);
        this.autoCloser.createMobXWhen(() => oidcStore.state === STATE_AUTHENTICATE, this.redirectToOIDC);
        this.autoCloser.createMobXWhen(() => oidcStore.state === STATE_LOGIN, this.loginToSmartHealth);
    }

    @autobind
    public loginToSmartHealth()
    {
        LOG.debug('OIDCLoginController.loginToSmartHealth()');
        this.appStore.handlers.sessionHandler.sendLogin()
            .then(result => this.loginToSmartHealthResult(result))
            .catch(error => this.handleError(error));
    }

    @action
    public loginToSmartHealthResult(result: PossibleLogins)
    {
        LOG.debug(`PossibleLogins ${JSON.stringify(result)}`);
        this.appStore.sessionStore.sessionID = result.sessionID;
        // TODO Larry review - do we need this in the sessionStore yet
        if (!this.appStore.sessionStore.session)
        {
            // @ts-ignore
            this.appStore.sessionStore.session = {};
        }
        this.appStore.sessionStore.session.userID = result.user.userID;
        this.appStore.handlers.setAuthToken(result.sessionID);

        const { oidcStore } = this.appStore.sessionStore;
        oidcStore.groupsAndLocations = result.groupsAndLocations;

        if (result.groupsAndLocations.length === 0)
        {
            const message = 'Not a member of any medical groups';
            this.showError(message);
            this.appStore.sessionStore.oidcStore.setError(message);
            window.sessionStorage.clear();
        }
        else if ((result.groupsAndLocations.length === 1)
            && (result.groupsAndLocations[0].locations.length <= 1))
        {
            // no choices, can log in immediately
            const group: MedicalGroupAndLocationsDigest = result.groupsAndLocations[0];
            if (group.locations.length === 1)
            {
                const location = group.locations[0];
                LOG.debug(`Log into ${group.medicalGroup.name} ${location.name}`);
                this.setGroupAndLocation(group.medicalGroup.groupID, location.id);
            }
            else
            {
                LOG.debug(`Log into ${group.medicalGroup.name} ${group.medicalGroup.city}`);
                this.setGroupAndLocation(group.medicalGroup.groupID, -2);
            }
        }
        else
        {
            oidcStore.setState(STATE_SELECT_MEMBER);
        }
    }

    @autobind
    public redirectToOIDC()
    {
        LOG.debug('OIDCLoginController.redirectToOIDC()');
        const { sessionStorage } = window;

        sessionStorage.oidcNonce = sessionStorage.oidcNonce || secureToken(20);
        sessionStorage.oidcState = sessionStorage.oidcState || secureToken(20);

        const redirect = window.location.href.split(/[?#]/)[0];

        const queryParams = {
            response_type: 'code',
            client_id: this.oidcSettings.clientID,
            redirect_uri: redirect,
            nonce: sessionStorage.oidcNonce,
            state: sessionStorage.oidcState
        };
        const url = buildURL(this.oidcSettings.authorizationEndpointUri, { queryParams });
        // assigning window.location will cause a redirection to the URL
        window.location.assign(url);
    }

    public setGroupAndLocation(groupID, locationID)
    {
        if (locationID >= 0)
        {
            const { groupsAndLocations } = this.appStore.sessionStore.oidcStore;
            const group = groupsAndLocations.find(g => groupID === g.medicalGroup.groupID);
            const location = group.locations.find(l => locationID === l.id);
            this.appStore.sessionStore.setLocation(location);
        }

        this.appStore.handlers.sessionHandler.setCurrentMedicalGroupAndLocation(groupID, locationID)
            .then(result => this.setGroupAndLocationResult(result))
            .catch(error => this.handleError(error));
    }

    public setGroupAndLocationResult(result)
    {
        LOG.debug(`WebUISession: ${JSON.stringify(result)}`);
        this.appStore.actionStore.completeLogin(result);
        if (!result.termsOfUseAgreed)
        {
            this.appStore.componentStore.modalDialog.show(<TermsOfUseDialog accepted={false} />);
        }
    }

    public showError(message)
    {
        this.appStore.componentStore.modalDialog.show(
            <OKDialog icon={DialogIcons.error} message={message} header="Login Error" />
        );
    }
}

export default OIDCLoginController;
