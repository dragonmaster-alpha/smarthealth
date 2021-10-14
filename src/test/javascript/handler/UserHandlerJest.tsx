import MockAdapter from 'axios-mock-adapter';
import UserHandler from 'main/handler/UserHandler';
import AppStore from 'main/store/AppStore';
import user from 'smarthealth-rest-test/user.json';

/**
 * Test UserHandler
 *
 * @author Larry 18/12/2018
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2018
 */
test('getCache user', async () =>
{
    const appStore = new AppStore();
    const mock = new MockAdapter(appStore.handlers.axios);

    mock.onGet(`/users/${user.userID}`)
        .reply(200, user);

    const handler = new UserHandler(appStore.handlers);
    const result = await handler.getUser(user.userID);
    expect(result)
        .toEqual(user);
});
