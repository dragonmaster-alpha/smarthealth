import {css} from '@emotion/core';
import {background, colour, font, sidebar} from 'main/application/ThemeConstants';
import DateTime from 'main/component/DateTime';
import Entities from 'main/component/Entities';
import SHIcon from 'main/component/SHIcon';
import SidebarHeading from 'main/component/SidebarHeading';
import {fullName} from 'main/format/NameFormat';
import DateOfBirthAndAge from 'main/patient/DateOfBirthAndAge';
import StoreProps from 'main/store/StoreProps';
import {px} from 'main/utility/StyleUtility';
import {inject, observer} from 'mobx-react';
import React from 'react';
import EntityType from 'smarthealth-javascript/EntityType';
import Patient from 'smarthealth-javascript/Patient';

/**
 * Display a few patient details in the sidebar
 *
 * @author Larry 28/02/2018
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2018
 */
const sectionStyle = css({
    backgroundColor: background.navigation,
    borderBottom: sidebar.border,
    padding: px(8, 24, 16),
    h1: {
        paddingBottom: '4px'
    },
    '& .shicon': {
        display: 'inline-block',
        color: colour.navigation,
        fontSize: '24px',
        paddingRight: '12px',
        verticalAlign: 'top'
    },
    '>div': {
        display: 'inline-block',
        '>div': {
            color: colour.navigation2,
            font: font.navItem2,
            paddingTop: '4px'
        },
        '& :first-child': {
            color: colour.white,
            font: font.navItem1,
            paddingTop: 0
        }
    }
});

@inject('appStore')
@observer
class PatientSidebar extends React.Component<StoreProps>
{
    public render()
    {
        // PatientStatusPanel.java renders: Emergency access, name with preferred name in larger font, date of birth,
        // Clinic ID,  and age, UR/MRN, IHI, Medicare, GP, EHR Consent or EHR Consent: not given, Linked to My Health
        // Record, Deceased
        const { sessionStore } = this.props.appStore;
        const { currentPatientID } = sessionStore;
        if (!sessionStore.loggedIn || !currentPatientID)
        {
            return (
                <section css={sectionStyle}>
                    <SidebarHeading title="Patient" />
                    <div style={{ color: colour.navigation2, font: font.navItem2 }}>No Patient</div>
                </section>
            );
        }

        const entities = {};
        entities['demographics'] = { type: EntityType.Patient, id: currentPatientID };
        entities['identifiers'] = { type: EntityType.PatientIdentifiers, id: currentPatientID };
        entities['association'] = {
            type: EntityType.PatientMedicalGroupAssociation,
            id: { id: currentPatientID, associatedID: sessionStore.currentGroupID }
        };

        return (
            <section css={sectionStyle}>
                <SidebarHeading title="Patient" />
                <Entities entities={entities} render=
                    {(data: any) => (
                        <>
                            <SHIcon icon="patient" />
                            <div>
                                <div>{fullName(data.demographics.name, data.demographics.preferredName)}</div>
                                <div>DOB: <DateOfBirthAndAge patient={data.demographics} /></div>
                                <div>UR/MRN: {data.association.urmrn}</div>
                                <div>EHR Consent: {this.renderEHRConsentDate(data.demographics)}</div>
                                {this.renderDeceased(data.demographics)}
                            </div>
                        </>
                    )}
                />
            </section>
        );
    }

    private renderDeceased(patient: Patient): React.ReactNode
    {
        return patient.deceasedDate &&
            <div style={{ color: colour.error }}>Deceased: <DateTime date={patient.deceasedDate} /></div>;
    }

    private renderEHRConsentDate(patient: Patient): React.ReactNode
    {
        return patient.ehrConsentDate ? <DateTime date={patient.ehrConsentDate} /> : 'not given';
    }
}

export default PatientSidebar;
