import {action as storybookAction} from '@storybook/addon-actions';
import {storiesOf} from '@storybook/react';
import ServiceRecordsPage from 'main/service/ServiceRecordsPage';
import React from 'react';
import FormDescription from 'smarthealth-javascript/FormDescription';
import NewServiceMenuItem from 'smarthealth-javascript/NewServiceMenuItem';
import PagedResults from 'smarthealth-javascript/PagedResults';
import ServiceRecord from 'smarthealth-javascript/ServiceRecord';
import ServiceSummary from 'smarthealth-javascript/ServiceSummary';
import ServiceType from 'smarthealth-javascript/ServiceType';
import ServiceFormDescriptions from 'smarthealth-rest-test/formdesc/service/ServiceFormDescriptions';
import MENU from 'smarthealth-rest-test/newservicemenu.json';
import SERVICE_TYPES from 'smarthealth-rest-test/servicetypes.json';
import SetSession from 'test/component/SetSession';
import SetStore from 'test/component/SetStore';
import FullScreen from 'test/container/FullScreen';
import {MEMBER_BILL_GOLFALOT} from 'test/data/MedicalGroupMemberAggregateMother';
import {PATIENT_AGGREGATE_HARRY_POTTER} from 'test/model/PatientMother';
import SERVICE_SUMMARIES from 'test/service/ServiceRecordListStory.ServiceSummaries.json';
import ServiceRecordMother from 'test/service/ServiceRecordMother';
import {promiseResolved} from 'test/utility/PromiseUtility';

/**
 * Tester for ServiceHistoryPanel
 *
 * @author Larry 17/11/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
export function getAllServiceTypes(): Promise<ServiceType[]>
{
    return new Promise<ServiceType[]>(resolve => resolve(SERVICE_TYPES as ServiceType[]));
}

export function getFormDescription(formDescID: string): Promise<FormDescription>
{
    storybookAction('getFormDescription')(formDescID);
    const serviceType = SERVICE_TYPES.find(serviceType => serviceType.formDescriptionID === formDescID);
    const formDescription = ServiceFormDescriptions.find(
        entry => entry.id === serviceType.serviceTypeID).formDesc;
    return new Promise<FormDescription>(resolve => resolve(formDescription));
}

export function getServices(patientID: number, offset: number,
    count: number): Promise<PagedResults<ServiceSummary>>
{
    const serviceSummaries = SERVICE_SUMMARIES as ServiceSummary[];
    return new Promise<PagedResults<ServiceSummary>>(resolve => resolve({
        offset,
        count,
        items: serviceSummaries.slice(offset, offset + count),
        more: (offset + count) < serviceSummaries.length,
        total: serviceSummaries.length
    }));
}

export function getServiceRecord(serviceID: number): Promise<ServiceRecord>
{
    const serviceSummaries = SERVICE_SUMMARIES as ServiceSummary[];
    const serviceSummary = serviceSummaries.find(serviceSummary => serviceSummary.serviceID === serviceID);
    const formDescription = ServiceFormDescriptions.find(
        entry => entry.id === serviceSummary.serviceType).formDesc;
    const serviceData = ServiceRecordMother.createRandomData(formDescription);
    const serviceRecord = { metadata: serviceSummary, data: serviceData, version: 0 };
    return new Promise<ServiceRecord>(resolve => resolve(serviceRecord));
}

export function getServiceType(serviceTypeID: number): Promise<ServiceType>
{
    const serviceType = SERVICE_TYPES.find(serviceType => serviceType.serviceTypeID === serviceTypeID) as ServiceType;
    return new Promise<ServiceType>(resolve => resolve(serviceType));
}

storiesOf('Service/ServiceRecordsPage', module)
    .add('empty', () =>
    {
        return (
            <SetSession member={MEMBER_BILL_GOLFALOT} patient={PATIENT_AGGREGATE_HARRY_POTTER}>
                <FullScreen>
                    <ServiceRecordsPage />
                </FullScreen>
            </SetSession>
        );
    })
    .add('with services', () =>
    {
        return (
            <SetStore set={(appStore) =>
            {
                appStore.handlers.patientHandler.getServices = getServices;
                appStore.handlers.serviceTypeHandler.getAllServiceTypes = getAllServiceTypes;
                appStore.handlers.serviceTypeHandler.getServiceType = getServiceType;
                appStore.handlers.serviceRecordHandler.getServiceRecord = getServiceRecord;
                appStore.handlers.formDescriptionHandler.getFormDescription = getFormDescription;
                appStore.handlers.serviceRecordHandler.getMenuItems =
                    () => promiseResolved(MENU as NewServiceMenuItem[]);
            }}>
                <SetSession member={MEMBER_BILL_GOLFALOT} patient={PATIENT_AGGREGATE_HARRY_POTTER}>
                    <FullScreen>
                        <ServiceRecordsPage />
                    </FullScreen>
                </SetSession>
            </SetStore>
        );
    });
