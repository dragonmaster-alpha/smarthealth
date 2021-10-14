import {storiesOf} from '@storybook/react';
import lodash from 'lodash';
import {sidebar} from 'main/application/ThemeConstants';
import PatientSidebar from 'main/patient/PatientSidebar';
import React from 'react';
import PatientAggregate from 'smarthealth-javascript/PatientAggregate';
import SetSession from 'test/component/SetSession';
import {MEMBER_BILL_GOLFALOT} from 'test/data/MedicalGroupMemberAggregateMother';
import {PATIENT_AGGREGATE_HARRY_POTTER, PATIENT_AGGREGATE_TOM_RIDDLE} from 'test/model/PatientMother';

/**
 * Allow debugging of PatientSidebarPanel component
 *
 * @author Larry 08/03/2018
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2018
 */
storiesOf('Patient/PatientSidebar', module)
    .add('No patient', () => (
        <SetSession member={MEMBER_BILL_GOLFALOT}>
            <div style={{ maxWidth: sidebar.width }}>
                <PatientSidebar />
            </div>
        </SetSession>
    ))
    .add('With patient', () => (
        <SetSession member={MEMBER_BILL_GOLFALOT} patient={PATIENT_AGGREGATE_HARRY_POTTER}>
            <div style={{ maxWidth: sidebar.width }}>
                <PatientSidebar />
            </div>
        </SetSession>
    ))
    .add('With EHR Consent', () =>
    {
        const patient: PatientAggregate = lodash.cloneDeep(PATIENT_AGGREGATE_HARRY_POTTER);
        patient.patient.ehrConsentDate = { iso: '2020-02-02' };
        return (
            <SetSession member={MEMBER_BILL_GOLFALOT} patient={patient}>
                <div style={{ maxWidth: sidebar.width }}>
                    <PatientSidebar />
                </div>
            </SetSession>
        );
    })
    .add('Deceased', () => (
        <SetSession member={MEMBER_BILL_GOLFALOT} patient={PATIENT_AGGREGATE_TOM_RIDDLE}>
            <div style={{ maxWidth: sidebar.width }}>
                <PatientSidebar />
            </div>
        </SetSession>
    ));
