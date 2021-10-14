import {storiesOf} from '@storybook/react';
import PatientHomePage from 'main/patient/PatientHomePage';
import React from 'react';
import SetSession from 'test/component/SetSession';
import FullScreen from 'test/container/FullScreen';
import {MEMBER_BILL_GOLFALOT} from 'test/data/MedicalGroupMemberAggregateMother';
import {PATIENT_AGGREGATE_HARRY_POTTER} from 'test/model/PatientMother';

/**
 * Allow debugging of PatientHomePage component
 *
 * @author Larry 22/03/2018
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2018
 */
storiesOf('Patient/PatientHomePage', module)
    .add('Standard', () =>
    {
        return (
            <FullScreen>
                <SetSession member={MEMBER_BILL_GOLFALOT} patient={PATIENT_AGGREGATE_HARRY_POTTER}>
                    <PatientHomePage />
                </SetSession>
            </FullScreen>
        );
    });
