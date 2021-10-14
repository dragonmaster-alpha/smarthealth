import MockAdapter from 'axios-mock-adapter';
import FormDescriptionHandler from 'main/handler/FormDescriptionHandler';
import AppStore from 'main/store/AppStore';
import patientSearchFormDesc from 'smarthealth-rest-test/formdesc/Form.Patient.Search.json';

/**
 * Unit Test for FormDescription Handler
 *
 * @author Uditha 12/03/2018
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2018
 */
test('Patient.Search form description', async () =>
{
    const appStore = new AppStore();
    const mock = new MockAdapter(appStore.handlers.axios);

    const formDescID = patientSearchFormDesc.id;
    mock.onGet(`/forms/${formDescID.replace('.', '_')}`)
        .reply(200, patientSearchFormDesc);

    const handler = new FormDescriptionHandler(appStore.handlers);
    const result = await handler.getFormDescription(formDescID);
    return expect(result.id)
        .toEqual(formDescID);
});
