import {storiesOf} from '@storybook/react';
import lodash from 'lodash';
import PatientInsurersAndIdentifiersEntityPanel from 'main/patient/PatientInsurersAndIdentifiersEntityPanel';
import React from 'react';
import PatientIdentifierType from 'smarthealth-javascript/PatientIdentifierType';
import {EntityDetails} from 'test/component/SetEntity';
import SetSession from 'test/component/SetSession';
import FullScreen from 'test/container/FullScreen';
import {MEMBER_BILL_GOLFALOT} from 'test/data/MedicalGroupMemberAggregateMother';
import {patientFormDescEntityDetails} from 'test/model/PatientFormDescriptionMother';
import {PATIENT_AGGREGATE_HARRY_POTTER, PATIENTID_HARRY_POTTER} from 'test/model/PatientMother';
/**
 * Storybook story to test and debug PatientInsurersAndIdentifiersPanel.tsx
 *
 * @author Thompson 10/10/2019
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2019
 */

storiesOf('Patient/PatientInsurersAndIdentifiersPanel', module)
    .add('Empty', () =>
    {
        const entities: EntityDetails[] = [
            patientFormDescEntityDetails('Patient.InsurersAndIdentifiers')
        ];
        return (
            <FullScreen>
                <SetSession member={MEMBER_BILL_GOLFALOT} patient={PATIENT_AGGREGATE_HARRY_POTTER} entities={entities}>
                    <PatientInsurersAndIdentifiersEntityPanel patientID={PATIENTID_HARRY_POTTER} />
                </SetSession>
            </FullScreen>
        );
    })
    .add('With Data', () =>
    {
        const patient = lodash.cloneDeep(PATIENT_AGGREGATE_HARRY_POTTER);
        patient.identifiers = [
            {
                id: 5,
                identifier: '123',
                identifierType: PatientIdentifierType.Pension,
                patientID: PATIENTID_HARRY_POTTER,
                version: 0
            },
            {
                expiryDate: {
                    iso: '2019-12'
                },
                id: 6,
                identifier: '2123 45670 1',
                identifierType: PatientIdentifierType.Medicare,
                patientID: PATIENTID_HARRY_POTTER,
                qualifier: '1',
                version: 0
            },
            {
                id: 4,
                identifier: '123',
                identifierType: PatientIdentifierType.HealthFund,
                patientID: PATIENTID_HARRY_POTTER,
                qualifier: 'ACA Health Benefits Fund Limited',
                version: 0
            },
            {
                id: 7,
                identifier: '1',
                identifierType: PatientIdentifierType.SafetyNet,
                patientID: PATIENTID_HARRY_POTTER,
                version: 0
            },
            {
                id: 3,
                identifier: '354',
                identifierType: PatientIdentifierType.DVA,
                patientID: PATIENTID_HARRY_POTTER,
                qualifier: 'Gold',
                version: 0
            }
        ];
        const entities: EntityDetails[] = [
            patientFormDescEntityDetails('Patient.InsurersAndIdentifiers')
        ];
        return (
            <FullScreen>
                <SetSession member={MEMBER_BILL_GOLFALOT} patient={patient} entities={entities}>
                    <PatientInsurersAndIdentifiersEntityPanel patientID={PATIENTID_HARRY_POTTER} />
                </SetSession>
            </FullScreen>
        );
    });
