import {storiesOf} from '@storybook/react';
import ApplicationLayout from 'main/application/ApplicationLayout';
import React from 'react';
import SetSession from 'test/component/SetSession';
import {MEMBER_BILL_GOLFALOT} from 'test/data/MedicalGroupMemberAggregateMother';
import {PATIENT_AGGREGATE_HARRY_POTTER} from 'test/model/PatientMother';

/**
 * Storybook story for ApplicationLayout component
 *
 * @author Larry 28/10/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
storiesOf('Application/ApplicationLayout', module)
    .add('Without patient', () => (
        <SetSession member={MEMBER_BILL_GOLFALOT}>
            <ApplicationLayout />
        </SetSession>
    ))
    .add('With patient', () => (
        <SetSession member={MEMBER_BILL_GOLFALOT} patient={PATIENT_AGGREGATE_HARRY_POTTER}>
            <ApplicationLayout />
        </SetSession>
    ));
