import HomePage from 'main/component/HomePage';
import PageDescription from 'main/page/PageDescription';
import PageDescriptions from 'main/page/PageDescriptions';
import {PATIENT_DETAILS_PAGE} from 'main/patient/PatientDetailsPage';
import {SERVICE_RECORDS_PAGE} from 'main/service/ServiceRecordsPage';
import StoreProps from 'main/store/StoreProps';
import React from 'react';

/**
 * Home page for the patient
 *
 * @author Larry 09/03/2018
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2018
 */
export const PATIENT_HOME_PAGE: PageDescription = {
    key: 'Patient',
    title: 'Patient',
    primary: true,
    icon: 'patient',
    renderPanel: () => <PatientHomePage />,
    visible: ({ sessionStore }) => !!sessionStore.currentPatientID
};

const PATIENT_HOME_BUTTONS = [PATIENT_DETAILS_PAGE, PageDescriptions.patientAlerts,
    PageDescriptions.patientMedications, PageDescriptions.patientConditions, PageDescriptions.patientClinicalMeasures,
    PageDescriptions.patientPathology, PageDescriptions.patientLungFunction, SERVICE_RECORDS_PAGE
];

class PatientHomePage extends React.Component<StoreProps>
{
    public render(): React.ReactNode
    {
        return <HomePage buttons={PATIENT_HOME_BUTTONS} />;
    }
}

export default PatientHomePage;
