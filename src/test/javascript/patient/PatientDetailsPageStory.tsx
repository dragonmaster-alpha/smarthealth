import {storiesOf} from '@storybook/react';
import PatientDetailsPage from 'main/patient/PatientDetailsPage';
import React from 'react';
import EntityType from 'smarthealth-javascript/EntityType';
import SetEntities from 'test/component/SetEntities';
import SetSession from 'test/component/SetSession';
import FullScreen from 'test/container/FullScreen';
import {
    MEMBER_BILL_GOLFALOT, MEMBER_JEMMA_HULL, memberEntityDetails
} from 'test/data/MedicalGroupMemberAggregateMother';
import {allPatientFormDescEntityDetails} from 'test/model/PatientFormDescriptionMother';
import {
    PATIENT_AGGREGATE_HARRY_POTTER, PATIENT_CLINICAL_HARRY_POTTER, PATIENTID_HARRY_POTTER
} from 'test/model/PatientMother';
import {patientProvidersAssociations, serviceRecord2511} from 'test/patient/PatientProvidersAndConsentsStory';

/**
 * Test for PatientDetailsPage
 *
 * @author Larry 10/11/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
storiesOf('Patient/PatientDetailsPage', module)
    .add('Standard', () =>
    {
        const entities = [
            ...allPatientFormDescEntityDetails(),
            {
                type: EntityType.PatientClinical,
                id: PATIENTID_HARRY_POTTER,
                value: PATIENT_CLINICAL_HARRY_POTTER
            },
            {
                type: EntityType.PatientFamilySocial,
                id: PATIENTID_HARRY_POTTER,
                value: {}
            },
            {
                type: EntityType.EntityReferenceList,
                id: '/patients/3/medicalgroups',
                value: {
                    id: '/patients/3/medicalgroups', referencedEntityType: 'PatientMedicalGroupAssociation',
                    references: []
                }
            },
            {
                type: EntityType.PatientClinical,
                id: PATIENTID_HARRY_POTTER,
                value: PATIENT_CLINICAL_HARRY_POTTER
            },
            {
                type: EntityType.PatientProviderAssociation,
                id: PATIENTID_HARRY_POTTER,
                value: patientProvidersAssociations
            },
            {
                type: EntityType.ServiceRecord,
                id: 2511,
                value: serviceRecord2511
            },
            {
                type: EntityType.PatientPAS,
                id: PATIENTID_HARRY_POTTER,
                // not under PAS control
                value: { patientID: PATIENTID_HARRY_POTTER }
            },
            ...memberEntityDetails(MEMBER_JEMMA_HULL)
        ];
        return (
            <FullScreen>
                <SetEntities entities={entities}>
                    <SetSession member={MEMBER_BILL_GOLFALOT} patient={PATIENT_AGGREGATE_HARRY_POTTER}>
                        <PatientDetailsPage />
                    </SetSession>
                </SetEntities>
                <div>
                    <hr />
                    <p>NOTE: Some tab contents do not load</p>
                </div>
            </FullScreen>
        );
    });
