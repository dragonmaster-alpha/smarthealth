import {storiesOf} from '@storybook/react';
import StoreProps from 'main/store/StoreProps';
import {inject, observer} from 'mobx-react';
import React from 'react';
import EntityType from 'smarthealth-javascript/EntityType';
import PagedResults from 'smarthealth-javascript/PagedResults';
import ServiceSummary from 'smarthealth-javascript/ServiceSummary';
import ServiceType from 'smarthealth-javascript/ServiceType';
import SERVICE_TYPES from 'smarthealth-rest-test/servicetypes.json';
import SetEntities from 'test/component/SetEntities';
import {EntityDetails} from 'test/component/SetEntity';
import SetStore from 'test/component/SetStore';
import {ST_VINCENTS_HOSPITAL} from 'test/data/MedicalGroupMother';
import SERVICE_SUMMARIES from 'test/service/ServiceRecordListStory.ServiceSummaries.json';
import ServiceRecordList from '../../../main/javascript/service/ServiceRecordList';

/**
 * Tester for ServiceRecordList.tsx
 *
 * @author Thompson 3/12/2019
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2019
 */

@inject('appStore')
@observer
class ServiceRecordListSize extends React.Component<StoreProps>
{
    public render(): React.ReactNode
    {
        const { filteredLength } = this.props.appStore.sessionStore.serviceRecordListStore;

        return <>Length: {filteredLength}</>;
    }
}

export function getAllServiceTypes(): Promise<ServiceType[]>
{
    return new Promise<ServiceType[]>(resolve => resolve(SERVICE_TYPES as ServiceType[]));
}

export function getServices(patientID: number, offset: number,
    count: number): Promise<PagedResults<ServiceSummary>>
{
    const serviceSummaryItems = SERVICE_SUMMARIES as ServiceSummary[];
    return new Promise<PagedResults<ServiceSummary>>(resolve => resolve({
        offset,
        count,
        items: serviceSummaryItems.slice(offset, offset + count),
        more: (offset + count) < serviceSummaryItems.length,
        total: serviceSummaryItems.length
    }));
}

storiesOf('Service', module)
    .add('ServiceRecordList', () =>
    {
        const entities: EntityDetails[] = [
            { id: 26, type: EntityType.MedicalGroup, value: ST_VINCENTS_HOSPITAL }
        ];
        return (
            <SetEntities entities={entities}>
                <SetStore set={(appStore) =>
                {
                    appStore.sessionStore.serviceRecordListStore.clear();
                    appStore.sessionStore.currentPatientID = 35;
                    appStore.handlers.patientHandler.getServices = getServices;
                    appStore.handlers.serviceTypeHandler.getAllServiceTypes = getAllServiceTypes;
                }}>
                    <ServiceRecordList showFilters={false} />
                    <ServiceRecordListSize />
                </SetStore>
            </SetEntities>
        );
    });
