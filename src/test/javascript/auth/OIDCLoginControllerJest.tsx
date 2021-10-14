import LOG from 'loglevel';
import OIDCLoginController from 'main/auth/OIDCLoginController';
import AppStore from 'main/store/AppStore';
import {STATE_AUTHENTICATE, STATE_SELECT_MEMBER} from 'main/store/OIDCStore';
import loginResult from 'smarthealth-rest-test/session.login.json';
import loginMultipleResult from 'smarthealth-rest-test/session.login.multiple.json';
import loginSessionResult from 'smarthealth-rest-test/session.webuisession.json';
import oidcData from './oidc.json';

LOG.setLevel('info');

/**
 * Unit Test for OIDCLoginController
 *
 * @author Larry 21/05/2018
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2018
 */
describe('changing window.location', () =>
{
    const { location, sessionStorage } = window;

    beforeAll(() =>
    {
        delete window.location;
        (window as any).location = { href: 'https://localhost', assign: jest.fn() };

        delete (window as any).sessionStorage;
        (window as any).sessionStorage = { oidcNonce: 'oidcNonce', oidcState: 'oidcState' };
    });

    afterAll(() =>
    {
        window.location = location;
        (window as any).sessionStorage = sessionStorage;
    });

    test('redirectToOIDC function assign correct built url path to window.location', () =>
    {
        const appStore = new AppStore();
        const loginController = new OIDCLoginController(appStore);
        loginController.fetchOIDCSettingsResult({
            clientID: 'abcDEFghiJKLmnoPQRst',
            authorizationEndpointUri: 'https://localhost/smartauth/',
            redirectUri: 'https://localhost/login'
        });
        loginController.redirectToOIDC();

        expect(window.location.assign)
            .toBeCalledWith('https://localhost/smartauth/?response_type=code&client_id=abcDEFghiJKLmnoPQRst'
                + '&redirect_uri=https%3A%2F%2Flocalhost&nonce=oidcNonce&state=oidcState');
    });
});

test('fetchOIDCSettingsResult', () =>
{
    const appStore = new AppStore();
    const loginController = new OIDCLoginController(appStore);
    loginController.fetchOIDCSettingsResult(oidcData);
    expect(appStore.sessionStore.oidcStore.state)
        .toBe(STATE_AUTHENTICATE);
});

test('loginToSmartHealthResult with single medical group and no locations', () =>
{
    const appStore = new AppStore();
    const loginController = new OIDCLoginController(appStore);
    loginController.setGroupAndLocation = jest.fn();
    loginController.loginToSmartHealthResult(loginResult);

    expect(loginController.setGroupAndLocation)
        .toBeCalledWith(34, -2);
});

test('loginToSmartHealthResult with multiple medical groups', () =>
{
    const appStore = new AppStore();
    const controller = new OIDCLoginController(appStore);
    controller.loginToSmartHealthResult(loginMultipleResult);
    expect(appStore.sessionStore.oidcStore.state)
        .toBe(STATE_SELECT_MEMBER);
});

test('setGroupAndLocationResult', () =>
{
    const appStore = new AppStore();
    const controller = new OIDCLoginController(appStore);
    controller.setGroupAndLocationResult(loginSessionResult);
    expect(appStore.sessionStore.currentUserID)
        .toEqual(loginSessionResult.userID);
    expect(appStore.sessionStore.currentGroupID)
        .toEqual(loginSessionResult.groupID);
});
