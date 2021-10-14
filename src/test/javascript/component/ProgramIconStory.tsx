import {storiesOf} from '@storybook/react';
import React from 'react';
import Program from 'smarthealth-javascript/Program';
import ProgramIcon from '../../../main/javascript/component/ProgramIcon';

/**
 * Tester for ProgramButton
 *
 * @author Larry 25/11/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
storiesOf('Component/ProgramIcon', module)
    .add('with Program', () =>
    {
        return (
            <div style={{ display: 'flex', gap: '4px', padding: '16px' }}>
                <ProgramIcon program={Program.CANCER} />
                <ProgramIcon program={Program.CYSTIC_FIBROSIS} />
                <ProgramIcon program={Program.IMMUNOLOGY} />
                <ProgramIcon program={Program.PATIENT_WATCH} />
                <ProgramIcon program={Program.RENAL_DISEASE} />
                <ProgramIcon program={Program.VASCULAR} />
            </div>
        );
    })
    .add('with string', () =>
    {
        return (
            <div style={{ display: 'flex', gap: '4px', padding: '16px' }}>
                <ProgramIcon program="CANCER" />
                <ProgramIcon program="CYSTIC_FIBROSIS" />
                <ProgramIcon program="IMMUNOLOGY" />
                <ProgramIcon program="PATIENT_WATCH" />
                <ProgramIcon program="RENAL_DISEASE" />
                <ProgramIcon program="UNKNOWN" />
            </div>
        );
    });
