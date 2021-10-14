import {storiesOf} from '@storybook/react';
import PatientDemographicsEntityPanel from 'main/patient/PatientDemographicsEntityPanel';
import React from 'react';
import EntityType from 'smarthealth-javascript/EntityType';
import SetEntities from 'test/component/SetEntities';
import {EntityDetails} from 'test/component/SetEntity';
import SetSession from 'test/component/SetSession';
import FullScreen from 'test/container/FullScreen';
import {MEMBER_BILL_GOLFALOT} from 'test/data/MedicalGroupMemberAggregateMother';
import {patientFormDescEntityDetails} from 'test/model/PatientFormDescriptionMother';
import {PATIENT_AGGREGATE_HARRY_POTTER, PATIENT_HARRY_POTTER} from 'test/model/PatientMother';

/**
 * Allow debugging of PatientDemographicsPanel component
 *
 * @author Uditha 01/03/2018
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2018
 */
storiesOf('Patient/PatientDemographicsPanel', module)
    .add('With PAS Control', () =>
    {
        const entitiesWithPAS: EntityDetails[] = [
            patientFormDescEntityDetails('Patient.Demographics'),
            {
                type: EntityType.PatientPAS,
                id: PATIENT_HARRY_POTTER.patientID,
                value: {
                    patientID: PATIENT_HARRY_POTTER.patientID,
                    pasName: 'Test PAS',
                    pasID: 1
                }
            }
        ];

        return (
            <SetEntities entities={entitiesWithPAS}>
                <SetSession member={MEMBER_BILL_GOLFALOT} patient={PATIENT_AGGREGATE_HARRY_POTTER}>
                    <FullScreen>
                        <PatientDemographicsEntityPanel patientID={PATIENT_HARRY_POTTER.patientID} />
                    </FullScreen>
                </SetSession>
            </SetEntities>
        );
    })
    .add('Without PAS Control', () =>
    {
        const entitiesWithoutPAS: EntityDetails[] = [
            patientFormDescEntityDetails('Patient.Demographics'),
            {
                type: EntityType.PatientPAS,
                id: PATIENT_HARRY_POTTER.patientID,
                value: {
                    patientID: PATIENT_HARRY_POTTER.patientID
                }
            }
        ];
        return (
            <SetEntities entities={entitiesWithoutPAS}>
                <SetSession member={MEMBER_BILL_GOLFALOT} patient={PATIENT_AGGREGATE_HARRY_POTTER}>
                    <FullScreen>
                        <PatientDemographicsEntityPanel patientID={PATIENT_HARRY_POTTER.patientID} />
                    </FullScreen>
                </SetSession>
            </SetEntities>
        );
    });
