import {css} from '@emotion/core';
import {background} from 'main/application/ThemeConstants';
import TabPane from 'main/container/TabPane';
import PageDescription from 'main/page/PageDescription';
import PatientAllergiesEntitiesPanel from 'main/patient/PatientAllergiesEntitiesPanel';
import PatientContactsEntitiesPanel from 'main/patient/PatientContactsEntitiesPanel';
import PatientDemographicsEntityPanel from 'main/patient/PatientDemographicsEntityPanel';
import PatientFamilySocialEntityPanel from 'main/patient/PatientFamilySocialEntityPanel';
import PatientInsurersAndIdentifiersEntityPanel from 'main/patient/PatientInsurersAndIdentifiersEntityPanel';
import PatientMedicalAlertsEntitiesPanel from 'main/patient/PatientMedicalAlertsEntitiesPanel';
import PatientOverviewEntitiesPanel from 'main/patient/PatientOverviewEntitiesPanel';
import PatientProvidersAndConsentsEntitiesPanel from 'main/patient/PatientProvidersAndConsentsEntitiesPanel';
import StoreProps from 'main/store/StoreProps';
import {px} from 'main/utility/StyleUtility';
import {inject} from 'mobx-react';
import React from 'react';

/**
 * Page with tabs for various patient details forms
 *
 * @author Uditha 26/02/2018
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2018
 */
export const PATIENT_DETAILS_PAGE: PageDescription = {
    key: 'PatientDetails',
    title: 'Patient Details',
    icon: 'patient',
    renderPanel: () => <PatientDetailsPage />,
    visible: ({ sessionStore }) => !!sessionStore.currentPatientID
};

const pageStyle = css({
    backgroundColor: background.main,
    display: 'grid',
    gridTemplateColumns: '1fr',
    gridTemplateRows: '1fr',
    padding: px(16, 16, 0)
});

@inject('sessionStore')
class PatientDetailsPage extends React.Component<StoreProps>
{
    public render()
    {
        const patientID = this.props.sessionStore.currentPatientID;
        const tabs = [
            { title: 'Overview', content: <PatientOverviewEntitiesPanel patientID={patientID} /> },
            { title: 'Demographics', content: <PatientDemographicsEntityPanel patientID={patientID} /> },
            {
                title: 'Insurers and Identifiers',
                content: <PatientInsurersAndIdentifiersEntityPanel patientID={patientID} />
            },
            { title: 'Contacts', content: <PatientContactsEntitiesPanel patientID={patientID} /> },
            { title: 'Family / Social', content: <PatientFamilySocialEntityPanel patientID={patientID} /> },
            { title: 'Medical Alerts', content: <PatientMedicalAlertsEntitiesPanel patientID={patientID} /> },
            { title: 'Allergies', content: <PatientAllergiesEntitiesPanel patientID={patientID} /> },
            {
                title: 'Providers and Consents',
                content: <PatientProvidersAndConsentsEntitiesPanel patientID={patientID} />
            }
        ];
        return (
            <main css={pageStyle}>
                <TabPane tabs={tabs} />
            </main>
        );
    }
}

export default PatientDetailsPage;
