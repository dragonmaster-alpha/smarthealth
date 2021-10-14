import {colour, font, sidebar} from 'main/application/ThemeConstants';
import DateTime from 'main/component/DateTime';
import {fullName} from 'main/format/NameFormat';
import DateOfBirthAndAge from 'main/patient/DateOfBirthAndAge';
import React from 'react';
import PatientAggregate from 'smarthealth-javascript/PatientAggregate';
import MockUpSidebarHeading from 'test/design/MockUpSidebarHeading';

/**
 * Details of current patient in sidebar
 *
 * @author Larry 23/09/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
interface MockUpPatientSidebarProps
{
    patient: PatientAggregate;
}

class MockUpPatientSidebar extends React.Component<MockUpPatientSidebarProps>
{
    public render(): React.ReactNode
    {
        const { patient } = this.props;
        return (
            <section style={{ padding: '1em 1.5em', borderBottom: sidebar.border }}>
                <MockUpSidebarHeading title="Patient" />
                <div style={{ paddingTop: '0.5em' }}>
                    <span className="shicon sh-patient"
                        style={{ color: colour.navigation, fontSize: '120%', verticalAlign: 'top' }}></span>
                    <span style={{ paddingLeft: '1em', display: 'inline-block' }}>
                        <div style={{ color: colour.white }}>{fullName(patient.patient.name)}</div>
                        <div style={{
                            font: font.navItem2, color: colour.navigation2
                        }}>DOB: <DateOfBirthAndAge patient={patient.patient} /></div>
                        {patient.patientMedicalGroupAssociation &&
                        <div style={{
                            font: font.navItem2, color: colour.navigation2
                        }}>UR/MRN: {patient.patientMedicalGroupAssociation.urmrn}</div>
                        }
                        <div style={{
                            font: font.navItem2, color: colour.navigation2
                        }}>EHR Consent: {patient.patient.ehrConsentDate ?
                            <DateTime date={patient.patient.ehrConsentDate} /> : 'not given'}</div>
                    </span>
                </div>
            </section>
        );
    }
}

export default MockUpPatientSidebar;
