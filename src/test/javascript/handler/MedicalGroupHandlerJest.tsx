import MockAdapter from 'axios-mock-adapter';
import MedicalGroupHandler from 'main/handler/MedicalGroupHandler';
import AppStore from 'main/store/AppStore';
import medicalGroup from 'smarthealth-rest-test/medicalgroup.json';

/**
 * Test MedicalGroupHandler
 *
 * @author Larry 18/12/2018
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2018
 */
test('getCache medical group', async () =>
{
    const appStore = new AppStore();
    const mock = new MockAdapter(appStore.handlers.axios);

    mock.onGet(`/medicalgroups/${medicalGroup.groupID}`)
        .reply(200, medicalGroup);

    const handler = new MedicalGroupHandler(appStore.handlers);
    const result = await handler.getMedicalGroup(medicalGroup.groupID);
    expect(result)
        .toEqual(medicalGroup);
});
