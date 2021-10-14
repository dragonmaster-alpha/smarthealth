import MockAdapter from 'axios-mock-adapter';
import ServiceRecordHandler from 'main/handler/ServiceRecordHandler';
import AppStore from 'main/store/AppStore';
import Program from 'smarthealth-javascript/Program';
import ServiceRecord from 'smarthealth-javascript/ServiceRecord';
import ServiceSummary from 'smarthealth-javascript/ServiceSummary';

/**
 * Test ServiceRecordHandler
 *
 * @author Larry 13/09/2019
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2019
 */
describe('prepareNewServiceRecord()', () =>
{
    const appStore = new AppStore();
    const mock = new MockAdapter(appStore.handlers.axios);
    const handler = new ServiceRecordHandler(appStore.handlers);

    const service: ServiceRecord = { data: {}, metadata: {} as ServiceSummary, version: 0 };

    test('one param', async () =>
    {
        mock.onPost('/services/$prepare')
            .reply(200, service);
        const result = await handler.prepareNewServiceRecord({
            serviceTypeID: 1,
            extraData: undefined,
            program: undefined
        });
        expect(result)
            .toEqual(service);
    });
    test('two params', async () =>
    {
        mock.onPost('/services/$prepare')
            .reply(200, service);
        const result = await handler.prepareNewServiceRecord(
            { serviceTypeID: 1, extraData: undefined, program: Program.PATIENT_WATCH });
        expect(result)
            .toEqual(service);
    });
});
