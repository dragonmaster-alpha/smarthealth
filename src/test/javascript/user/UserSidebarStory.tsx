import {storiesOf} from '@storybook/react';
import {sidebar} from 'main/application/ThemeConstants';
import UserSidebar from 'main/user/UserSidebar';
import React from 'react';
import SetSession from 'test/component/SetSession';
import {MEMBER_BILL_GOLFALOT} from 'test/data/MedicalGroupMemberAggregateMother';
import {PATIENT_AGGREGATE_HARRY_POTTER} from 'test/model/PatientMother';

/**
 * Allow debugging of PatientSidebarPanel component
 *
 * @author Larry 08/03/2018
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2018
 */
storiesOf('User/UserSidebar', module)
    .add('Expanded', () => (
        <SetSession member={MEMBER_BILL_GOLFALOT}>
            <div style={{ maxWidth: sidebar.width }}>
                <UserSidebar />
            </div>
        </SetSession>
    ))
    .add('Collapsed', () => (
        <SetSession member={MEMBER_BILL_GOLFALOT} patient={PATIENT_AGGREGATE_HARRY_POTTER}>
            <div style={{ maxWidth: sidebar.width }}>
                <UserSidebar />
            </div>
        </SetSession>
    ));
