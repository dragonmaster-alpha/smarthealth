import MockAdapter from 'axios-mock-adapter';
import SessionHandler from 'main/handler/SessionHandler';
import AppStore from 'main/store/AppStore';
import serverDetails from 'smarthealth-rest-test/serverdetails.json';

/**
 * Unit Test for SessionHandler
 *
 * @author Larry 18/05/2018
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2018
 */
test('get server details', async () =>
{
    const appStore = new AppStore();
    const mock = new MockAdapter(appStore.handlers.axios);

    mock.onGet('info')
        .reply(200, serverDetails);

    const handler = new SessionHandler(appStore.handlers);
    const result = await handler.getServerDetails();
    expect(result)
        .toEqual(serverDetails);
});
