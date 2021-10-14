import {storiesOf} from '@storybook/react';
import PatientAllergiesEntitiesPanel from 'main/patient/PatientAllergiesEntitiesPanel';
import React from 'react';
import EntityType from 'smarthealth-javascript/EntityType';
import patientAllergiesValueSet from 'smarthealth-rest-test/valueset/ValueSet.Patient.Allergy.json';
import SetEntities from 'test/component/SetEntities';
import {EntityDetails} from 'test/component/SetEntity';
import SetSession from 'test/component/SetSession';
import FullScreen from 'test/container/FullScreen';
import {MEMBER_BILL_GOLFALOT} from 'test/data/MedicalGroupMemberAggregateMother';
import {patientFormDescEntityDetails} from 'test/model/PatientFormDescriptionMother';
import {PATIENT_AGGREGATE_HARRY_POTTER, PATIENTID_HARRY_POTTER} from 'test/model/PatientMother';

/**
 * Allow debugging of PatientAllergiesPanel.tsx
 *
 * @author Thompson 15/10/2019
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2019
 */
// TODO fix eslint with JSON files and place patientClinicalResponse in its own .json file.
const clinicalWithAllergies = {
    allergies: [
        {
            date: {
                iso: '2019-10-29'
            },
            details: 'Betalocc',
            name: {
                code: 'BETALOC',
                codeSet: 'http://ns.smarthealth.com.au/valueset/Patient.Allergy',
                value: 'Betaloc'
            }
        },
        {
            date: {
                iso: '2019-10-16'
            },
            details: 'Dont give',
            name: {
                code: 'CAPOTEN',
                codeSet: 'http://ns.smarthealth.com.au/valueset/Patient.Allergy',
                value: 'Capoten'
            }
        }
    ],
    medicalAlerts: [
        {
            date: {
                iso: '2019-10-30'
            },
            details: 'Don\'t scannn',
            name: {
                code: 'NO_CRANIAL_MRI',
                codeSet: 'http://ns.smarthealth.com.au/valueset/Patient.MedicalAlert',
                value: 'No Cranial MRI'
            }
        },
        {
            date: {
                iso: '2019-10-31'
            },
            details: 'Need moreee',
            name: {
                code: 'INSULIN_DEPENDENT',
                codeSet: 'http://ns.smarthealth.com.au/valueset/Patient.MedicalAlert',
                value: 'Insulin Dependent'
            }
        }
    ],
    patientID: PATIENTID_HARRY_POTTER,
    version: 80
};

const clinicalWithoutAllergies = {
    allergiesExclusionReason: 'None known',
    patientID: PATIENTID_HARRY_POTTER,
    version: 26
};

const entities: EntityDetails[] = [
    patientFormDescEntityDetails('Patient.Allergies.Form'),
    patientFormDescEntityDetails('Patient.Allergies.Table'),
    {
        type: EntityType.ValueSet,
        id: 'Patient.Allergy',
        value: patientAllergiesValueSet
    }
];
storiesOf('Patient/PatientAllergiesPanel', module)
    .add('With Allergies', () =>
    {
        const entitiesAllergies = [
            ...entities,
            {
                type: EntityType.PatientClinical,
                id: PATIENTID_HARRY_POTTER,
                value: clinicalWithAllergies
            }
        ];
        return (
            <FullScreen>
                <SetSession member={MEMBER_BILL_GOLFALOT} patient={PATIENT_AGGREGATE_HARRY_POTTER}
                    entities={entitiesAllergies}>
                    <PatientAllergiesEntitiesPanel patientID={PATIENTID_HARRY_POTTER} />
                </SetSession>
            </FullScreen>
        );
    })
    .add('Without Allergies with Exclusion Reason', () =>
    {
        const entitiesEmptyAllergies = [
            ...entities,
            {
                type: EntityType.PatientClinical,
                id: PATIENTID_HARRY_POTTER,
                value: clinicalWithoutAllergies
            }
        ];
        return (
            <FullScreen>
                <SetEntities entities={entitiesEmptyAllergies}>
                    <PatientAllergiesEntitiesPanel patientID={PATIENTID_HARRY_POTTER} />
                </SetEntities>
            </FullScreen>
        );
    })
    .add('Without Clinical', () =>
    {
        const entitiesEmptyAllergies = [
            ...entities,
            {
                type: EntityType.PatientClinical,
                id: PATIENTID_HARRY_POTTER,
                value: null
            }
        ];
        return (
            <FullScreen>
                <SetEntities entities={entitiesEmptyAllergies}>
                    <PatientAllergiesEntitiesPanel patientID={PATIENTID_HARRY_POTTER} />
                </SetEntities>
            </FullScreen>
        );
    });
