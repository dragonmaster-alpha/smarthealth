import {storiesOf} from '@storybook/react';
import EmergencyAccessService from 'main/service/customServices/EmergencyAccessService';
import React from 'react';
import EntityType from 'smarthealth-javascript/EntityType';
import FormDescription from 'smarthealth-javascript/FormDescription';
import EmergencyAccessForm from 'smarthealth-rest-test/formdesc/service/Form.Service.EmergencyAccess.json';
import SetEntities from 'test/component/SetEntities';
import {EntityDetails} from 'test/component/SetEntity';
import FullScreen from 'test/container/FullScreen';
import {MEMBER_WILLIAM_WENG, memberEntityDetails} from 'test/data/MedicalGroupMemberAggregateMother';
import {
    SERVICE_TYPE_CONSULTATION_NOTES, SERVICE_TYPE_PATIENT_WATCH_TREATMENT_STATUS, SERVICE_TYPE_RENAL_HAEMODIALYSIS
} from 'test/data/ServiceTypeMother';

/**
 * Tester for EmergencyAccessService.tsx
 *
 * @author Thompson 3/03/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
const data = {
    Services: [
        {
            Service: {
                confidentiality: 'Normal',
                owningGroupID: 26,
                serviceDate: {
                    iso: '2020-01-09T16:04+11'
                },
                serviceID: 11510,
                serviceType: 1,
                summary: 's'
            }
        },
        {
            Service: {
                confidentiality: 'Normal',
                owningGroupID: 26,
                serviceDate: {
                    iso: '2020-01-08T13:51+11'
                },
                serviceID: 11485,
                serviceType: 1,
                summary: 'bmi'
            }
        },
        {
            Service: {
                owningGroupID: 26,
                program: 'RENAL_DISEASE',
                serviceDate: {
                    iso: '2020-01-23'
                },
                serviceID: 11561,
                serviceType: 58,
                summary: 'Removed: null, Left Upper Arm, Duration - 60 mins'
            }
        },
        {
            Service: {
                owningGroupID: 26,
                program: 'PATIENT_WATCH',
                serviceDate: {
                    iso: '2020-01-23T13:12+11'
                },
                serviceID: 11557,
                serviceType: 191,
                summary: 'Start: 01/09/2019; Funded; VIP'
            }
        }
    ],
    ServiceDate: {
        iso: '2020-02-20T15:20+11'
    },
    AccessReason: 'Consent by next of kin',
    Patient: 2,
    Provider: {
        groupID: 26,
        userID: 18
    },
    metadata: {
        owningGroupID: 26,
        patientID: 2,
        providerID: {
            groupID: 26,
            userID: 47
        },
        serviceDate: {
            iso: '2020-02-20T15:20+11'
        },
        serviceID: 11563,
        serviceType: 119,
        status: 'FINAL',
        summaryLine: 'Consent by next of kin'
    },
    version: 0
};
storiesOf('Form/Service/Custom Service', module)
    .add('EmergencyAccess', () =>
    {
        const entities: EntityDetails[] = [
            { type: EntityType.ServiceType, value: SERVICE_TYPE_CONSULTATION_NOTES, id: 1 },
            { type: EntityType.ServiceType, value: SERVICE_TYPE_RENAL_HAEMODIALYSIS, id: 58 },
            { type: EntityType.ServiceType, value: SERVICE_TYPE_PATIENT_WATCH_TREATMENT_STATUS, id: 191 },
            ...memberEntityDetails(MEMBER_WILLIAM_WENG)
        ];
        return (
            <SetEntities entities={entities}>
                <FullScreen>
                    <EmergencyAccessService data={data}
                        formDescription={EmergencyAccessForm as FormDescription} onSave={() => true} />
                </FullScreen>
            </SetEntities>
        );
    });
