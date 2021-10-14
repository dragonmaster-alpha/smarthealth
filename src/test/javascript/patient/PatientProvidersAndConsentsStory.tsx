import {storiesOf} from '@storybook/react';
import PatientProvidersAndConsentsEntitiesPanel from 'main/patient/PatientProvidersAndConsentsEntitiesPanel';
import React from 'react';
import EntityReferenceListType from 'smarthealth-javascript/EntityReferenceListType';
import EntityReferenceListTypeUtility from 'smarthealth-javascript/EntityReferenceListTypeUtility';
import EntityType from 'smarthealth-javascript/EntityType';
import PatientMedicalGroupAssociation from 'smarthealth-javascript/PatientMedicalGroupAssociation';
import {EntityDetails} from 'test/component/SetEntity';
import SetSession from 'test/component/SetSession';
import FullScreen from 'test/container/FullScreen';
import {
    MEMBER_BILL_GOLFALOT, MEMBER_WILLIAM_WENG, memberEntityDetails
} from 'test/data/MedicalGroupMemberAggregateMother';
import {
    JAY_STREET_MEDICAL_CENTRE, medicalGroupEntityDetails, ST_VASELINE, ST_VINCENTS_HOSPITAL
} from 'test/data/MedicalGroupMother';
import {patientFormDescEntityDetails} from 'test/model/PatientFormDescriptionMother';
import {PATIENT_AGGREGATE_HARRY_POTTER, PATIENTID_HARRY_POTTER} from 'test/model/PatientMother';

/**
 * Allow debugging of PatientProvidersAndConsentsPanel.tsx
 *
 * @author Thompson 11/10/2019
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2018
 */
const patientClinical = {
    gp: { groupID: JAY_STREET_MEDICAL_CENTRE.groupID }, patientID: PATIENTID_HARRY_POTTER, version: 1
};

export const serviceRecord2511 = {
    data: {
        MDTMeetingDate: { iso: '2019-12-01' }, Patient: PATIENTID_HARRY_POTTER, Synopsis: {
            MDTLead: { groupID: 26, userID: 17 }, PresentingClinician: { groupID: 26, userID: 50 }
        }, Provider: MEMBER_WILLIAM_WENG.member.memberID, MDTMeetingID: '3', ServiceDate: { iso: '2019-12-01' },
        DiscussionStatus: 'New', Discussed: false, Confidentiality: 'Normal', Version: 1, MeetingNumber: 1,
        ID: '92d62298-e122-4707-b77f-d44643912b5e', SetID: '064f24fa-8c97-4284-8d0a-9b725f651f9a'
    }, metadata: {
        owningGroupID: 26, patientID: PATIENTID_HARRY_POTTER, program: 'CANCER',
        providerID: MEMBER_WILLIAM_WENG.member.memberID, serviceDate: { iso: '2019-12-01' }, serviceID: 2511,
        serviceType: 170,
        status: 'DRAFT', summaryLine: ''
    }, version: 0
};

export const patientProvidersAssociations = [{
    expiryDate: '2020-12-01T00:00:00',
    id: 2,
    memberID: MEMBER_WILLIAM_WENG.member.memberID,
    patientID: PATIENTID_HARRY_POTTER,
    serviceID: serviceRecord2511.metadata.serviceID
}];

const patientMGAssociation: PatientMedicalGroupAssociation = {
    id: 2345,
    consentDate: { iso: '2019-08-17' },
    consentType: 'Unit Test',
    groupID: ST_VASELINE.groupID,
    patientID: PATIENTID_HARRY_POTTER,
    urmrn: '6272532P'
};

const patientMGAssocERL = {
    id: EntityReferenceListTypeUtility.buildID(EntityReferenceListType.MedicalGroupAssociations,
        { patientID: PATIENTID_HARRY_POTTER }),
    referencedEntityType: 'PatientMedicalGroupAssociation',
    references: [
        {
            associatedID: ST_VASELINE.groupID, id: PATIENTID_HARRY_POTTER,
            type: 'PatientMedicalGroupAssociation'
        }
    ]
};

storiesOf('Patient/PatientProvidersAndConsents', module)
    .add('Harry Potter', () =>
    {
        const entities: EntityDetails[] = [
            {
                type: EntityType.PatientClinical,
                id: PATIENTID_HARRY_POTTER,
                value: patientClinical
            },
            {
                type: EntityType.EntityReferenceList,
                id: patientMGAssocERL.id,
                value: patientMGAssocERL
            },
            {
                type: EntityType.PatientProviderAssociation,
                id: PATIENTID_HARRY_POTTER,
                value: patientProvidersAssociations
            },
            {
                type: EntityType.PatientMedicalGroupAssociation,
                id: { id: PATIENTID_HARRY_POTTER, associatedID: ST_VASELINE.groupID },
                value: patientMGAssociation
            },
            {
                type: EntityType.ServiceRecord,
                id: serviceRecord2511.metadata.serviceID,
                value: serviceRecord2511
            },
            medicalGroupEntityDetails(ST_VASELINE),
            medicalGroupEntityDetails(ST_VINCENTS_HOSPITAL),
            medicalGroupEntityDetails(JAY_STREET_MEDICAL_CENTRE),
            ...memberEntityDetails(MEMBER_WILLIAM_WENG),
            patientFormDescEntityDetails('Patient.ProvidersAndConsents'),
            patientFormDescEntityDetails('Dialog.AssociatedMedicalGroupAdd')
        ];
        // TODO get entity for Provider in Providers table
        return (
            <FullScreen>
                <SetSession member={MEMBER_BILL_GOLFALOT} patient={PATIENT_AGGREGATE_HARRY_POTTER} entities={entities}>
                    <PatientProvidersAndConsentsEntitiesPanel patientID={3} />
                </SetSession>
            </FullScreen>
        );
    });
