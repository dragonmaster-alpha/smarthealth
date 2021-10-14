import AppStore from 'main/store/AppStore';
import HandlerStore from 'main/store/HandlerStore';
import ServiceRecordTabStore from 'main/store/ServiceRecordTabStore';
import {runInAction} from 'mobx';
import ServiceSummary from 'smarthealth-javascript/ServiceSummary';
import {ALL_SERVICE_TYPES} from 'test/data/ServiceTypeMother';
import SERVICE_SUMMARIES from 'test/service/ServiceRecordListStory.ServiceSummaries.json';

/**
 * Test ServiceRecordTabStore, particularly the selection index
 *
 * @author Larry 6/07/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
async function preloadServiceTypes(handlers: HandlerStore): Promise<void>
{
    runInAction(() =>
    {
        const { serviceTypes } = handlers.appStore.entityCache;
        ALL_SERVICE_TYPES.forEach((serviceType) =>
        {
            serviceTypes.set(serviceType.serviceTypeID, serviceType);
        });
    });
}

describe('ServiceRecordTabStore', () =>
{
    test('Get selectedIndex when opening and closing services', async () =>
    {
        const appStore = new AppStore();
        appStore.handlers.serviceTypeHandler.preloadServiceTypes = async () => preloadServiceTypes(appStore.handlers);
        await appStore.handlers.serviceTypeHandler.preloadServiceTypes();

        const store = new ServiceRecordTabStore(appStore);
        await store.showExistingService(SERVICE_SUMMARIES[0] as ServiceSummary);
        expect(store.selectedIndex)
            .toEqual(0);

        await store.showExistingService(SERVICE_SUMMARIES[4] as ServiceSummary);
        expect(store.selectedIndex)
            .toEqual(1);

        store.onTabChange({ originalEvent: null, index: 0 });
        expect(store.selectedIndex)
            .toEqual(0);

        store.closeService(SERVICE_SUMMARIES[0].serviceID);
        expect(store.selectedIndex)
            .toEqual(0);
    });

    test('Get selectedIndex when changing tabs', async () =>
    {
        const appStore = new AppStore();
        appStore.handlers.serviceTypeHandler.preloadServiceTypes = async () => preloadServiceTypes(appStore.handlers);
        await appStore.handlers.serviceTypeHandler.preloadServiceTypes();

        const store = new ServiceRecordTabStore(appStore);
        for (let i = 0; i < 10; i += 1)
        {
            await store.showExistingService(SERVICE_SUMMARIES[i] as ServiceSummary);
        }
        expect(store.selectedIndex)
            .toEqual(9);

        store.onTabChange({ originalEvent: null, index: 3 });
        expect(store.selectedIndex)
            .toEqual(3);

        store.onTabChange({ originalEvent: null, index: 0 });
        expect(store.selectedIndex)
            .toEqual(0);

        store.onTabChange({ originalEvent: null, index: 4 });
        expect(store.selectedIndex)
            .toEqual(4);
    });

    test('Get selectedIndex with services and summaries', async () =>
    {
        const appStore = new AppStore();
        appStore.handlers.serviceTypeHandler.preloadServiceTypes = async () => preloadServiceTypes(appStore.handlers);
        await appStore.handlers.serviceTypeHandler.preloadServiceTypes();

        const store = new ServiceRecordTabStore(appStore);
        for (let i = 0; i < 10; i += 1)
        {
            await store.showExistingService(SERVICE_SUMMARIES[i] as ServiceSummary);
        }
        expect(store.selectedIndex)
            .toEqual(9);

        store.addSummary({ key: 's', title: 'Summary 1', visible: true, render: () => 'Summary 1' });

        store.addSummary({ key: 's', title: 'Summary 2', visible: true, render: () => 'Summary 2' });

        store.onTabChange({ originalEvent: null, index: 3 });
        expect(store.selectedIndex)
            .toEqual(3);

        store.onTabChange({ originalEvent: null, index: 0 });
        expect(store.selectedIndex)
            .toEqual(0);

        store.onTabChange({ originalEvent: null, index: 4 });
        expect(store.selectedIndex)
            .toEqual(4);
    });
});
