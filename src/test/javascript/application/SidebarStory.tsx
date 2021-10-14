import {css} from '@emotion/core';
import {storiesOf} from '@storybook/react';
import Sidebar from 'main/application/Sidebar';
import {sidebar} from 'main/application/ThemeConstants';
import React from 'react';
import SetSession from 'test/component/SetSession';
import {MEMBER_BILL_GOLFALOT} from 'test/data/MedicalGroupMemberAggregateMother';
import {PATIENT_AGGREGATE_HARRY_POTTER} from 'test/model/PatientMother';

/**
 * Allow debugging of Sidebar component
 *
 * @author Larry 22/03/2018
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2018
 */
const divStyle = css({
    display: 'grid',
    gridTemplateColumns: sidebar.width,
    gridTemplateRows: '1fr',
    height: '100vh'
});

storiesOf('Application/Sidebar', module)
    .add('Without patient', () => (
        <SetSession member={MEMBER_BILL_GOLFALOT}>
            <div css={divStyle}>
                <Sidebar />
            </div>
        </SetSession>
    ))
    .add('With patient', () => (
        <SetSession member={MEMBER_BILL_GOLFALOT} patient={PATIENT_AGGREGATE_HARRY_POTTER}>
            <div css={divStyle}>
                <Sidebar />
            </div>
        </SetSession>
    ));
