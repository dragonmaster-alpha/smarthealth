import MockAdapter from 'axios-mock-adapter';
import AppStore from 'main/store/AppStore';
import Confidentiality from 'smarthealth-javascript/Confidentiality';
import MedicalGroup from 'smarthealth-javascript/MedicalGroup';
import Program from 'smarthealth-javascript/Program';
import ServiceStatus from 'smarthealth-javascript/ServiceStatus';
import {PLAIN_PATHOLOGY} from 'test/data/MedicalGroupMother';

/**
 * Jest for ServiceRecordListStore.tsx
 *
 * @author Thompson 4/12/2019
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2019
 */

test('Load data one page', async () =>
{
    const appStore = new AppStore();
    appStore.handlers.websocketHandler.subscribe = () =>
    {
        // ignore this call
    };

    const mockAxios = new MockAdapter(appStore.handlers.axios);
    mockAxios.onGet('/servicetypes')
        .reply(200, [{
            abbreviation: 'Consultation',
            category: 'ConsultationNote',
            formDescriptionID: 'Service.ConsultationNote',
            name: 'Consultation Notes',
            serviceTypeID: 1
        }]);

    const patientID = 35;

    const item0 = {
        patientID, confidentiality: Confidentiality.Normal, owningGroupID: 1, program: Program.CANCER,
        providerID: null, serviceDate: { iso: '2019-12-04' }, serviceID: 357, serviceType: 1,
        status: ServiceStatus.FINAL, summaryLine: 'This is a sample service'
    };
    const items = [item0];

    appStore.handlers.patientHandler.getServices = (id: number, offset: number, count: number) =>
    {
        return new Promise((resolve) => resolve({
            items,
            count: items.length,
            more: false,
            offset: 0,
            total: items.length
        }));
    };
    appStore.handlers.medicalGroupHandler.getMedicalGroup = (id: number): Promise<MedicalGroup> =>
    {
        return new Promise((resolve) => resolve(PLAIN_PATHOLOGY));
    };

    const { serviceRecordListStore } = appStore.sessionStore;
    await serviceRecordListStore.load();
    expect(serviceRecordListStore.sortedItems)
        .toEqual([item0]);
    await serviceRecordListStore.load();
    expect(serviceRecordListStore.sortedItems)
        .toEqual([item0]);
    serviceRecordListStore.clear();
    await serviceRecordListStore.load();
    expect(serviceRecordListStore.sortedItems)
        .toEqual([item0]);
});
