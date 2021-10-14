import {storiesOf} from '@storybook/react';
import PatientMedicalAlertsEntitiesPanel from 'main/patient/PatientMedicalAlertsEntitiesPanel';
import React from 'react';
import EntityType from 'smarthealth-javascript/EntityType';
import ValueSetMedicalAlert from 'smarthealth-rest-test/valueset/ValueSet.Patient.MedicalAlert.json';
import SetEntities from 'test/component/SetEntities';
import {EntityDetails} from 'test/component/SetEntity';
import FullScreen from 'test/container/FullScreen';
import {patientFormDescEntityDetails} from 'test/model/PatientFormDescriptionMother';

/**
 * Storybook story to test and debug PatientMedicalAlertsPanel.tsx
 *
 * @author Thompson 14/10/2019
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2019
 */
// TODO fix eslint with JSON files and place patientClinicalResponse in its own .json file.
const patientClinicalResponse = {
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
    allergiesExclusionReason: 'None supplied',
    audit: {
        auditDateTime: '2019-10-30T09:35:03',
        auditUserId: 50,
        auditIPAddress: '127.0.0.1',
        auditMedicalGroupId: 26
    },
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
    patientID: 2,
    version: 80
};

const entities = [
    patientFormDescEntityDetails('Patient.MedicalAlerts.Table'),
    patientFormDescEntityDetails('Patient.MedicalAlerts.Form'),
    {
        type: EntityType.ValueSet,
        id: 'Patient.MedicalAlert',
        value: ValueSetMedicalAlert
    }
];
storiesOf('Patient/PatientMedicalAlertsPanel', module)
    .add('Standard', () =>
    {
        const standardEntities: EntityDetails[] = [
            ...entities,
            {
                type: EntityType.PatientClinical,
                id: 2,
                value: patientClinicalResponse
            }
        ];
        return (
            <FullScreen>
                <SetEntities entities={standardEntities}>
                    <PatientMedicalAlertsEntitiesPanel patientID={2} />
                </SetEntities>
            </FullScreen>
        );
    })
    .add('Empty Patient Clinical', () =>
    {
        const emptyEntities: EntityDetails[] = [
            {
                ...entities,
                type: EntityType.PatientClinical,
                id: 2,
                value: {}
            }
        ];
        return (
            <FullScreen>
                <SetEntities entities={emptyEntities}>
                    <PatientMedicalAlertsEntitiesPanel patientID={2} />
                </SetEntities>
            </FullScreen>
        );
    });
