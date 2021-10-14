import {storiesOf} from '@storybook/react';
import PatientFamilySocialEntityPanel from 'main/patient/PatientFamilySocialEntityPanel';
import React from 'react';
import EntityType from 'smarthealth-javascript/EntityType';
import FamilySocialFormDescription from 'smarthealth-rest-test/formdesc/Form.Patient.FamilySocial.json';
import {EntityDetails} from 'test/component/SetEntity';
import SetSession from 'test/component/SetSession';
import FullScreen from 'test/container/FullScreen';
import {MEMBER_BILL_GOLFALOT} from 'test/data/MedicalGroupMemberAggregateMother';
import {patientFormDescEntityDetails} from 'test/model/PatientFormDescriptionMother';
import {PATIENT_AGGREGATE_HARRY_POTTER, PATIENT_HARRY_POTTER} from 'test/model/PatientMother';

/**
 * Allow for Testing of PatientFamilySocialPanel.tsx
 *
 * @author Thompson 9/10/2019
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2019
 */

storiesOf('Patient/PatientFamilySocialPanel', module)
    .add('Empty', () =>
    {
        const entities: EntityDetails[] = [
            {
                type: EntityType.PatientFamilySocial,
                id: PATIENT_HARRY_POTTER.patientID,
                value: {}
            },
            patientFormDescEntityDetails('Patient.FamilySocial')
        ];
        return (
            <FullScreen>
                <SetSession member={MEMBER_BILL_GOLFALOT} patient={PATIENT_AGGREGATE_HARRY_POTTER} entities={entities}>
                    <PatientFamilySocialEntityPanel patientID={PATIENT_HARRY_POTTER.patientID} />
                </SetSession>
            </FullScreen>
        );
    })
    .add('With Data', () =>
    {
        const value = {
            audit: {
                auditDateTime: '2019-10-11T09:21:50',
                auditUserId: 50,
                auditIPAddress: '127.0.0.1',
                auditMedicalGroupId: 26
            },
            childrenDetails: 'aaa12',
            educationAttended: 'Junior Secondary (year 10)',
            educationCompleted: 'Junior Secondary (year 10)',
            educationCompletedDate: {
                iso: '2019-09-01'
            },
            employmentStatus: 'Casual',
            fromMultipleBirth: true,
            livingArrangements: '1',
            noOfChildren: 1,
            noOfChildrenInMultiBirth: 3,
            noOfSiblings: 1,
            noOfSiblingsDeceased: 1,
            occupation: 'Student',
            orderOfBirth: 1,
            partner: '1',
            transgender: false,
            version: 8,
            patientID: PATIENT_HARRY_POTTER.patientID
        };
        const entities: EntityDetails[] = [
            {
                value,
                type: EntityType.PatientFamilySocial,
                id: PATIENT_HARRY_POTTER.patientID
            },
            {
                type: EntityType.FormDescription,
                id: 'Patient.FamilySocial',
                value: FamilySocialFormDescription
            }
        ];
        return (
            <FullScreen>
                <SetSession member={MEMBER_BILL_GOLFALOT} patient={PATIENT_AGGREGATE_HARRY_POTTER} entities={entities}>
                    <PatientFamilySocialEntityPanel patientID={PATIENT_HARRY_POTTER.patientID} />
                </SetSession>
            </FullScreen>
        );
    });
