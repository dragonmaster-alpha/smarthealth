import RestTester from 'main/component/RestTester';
import PageDescription from 'main/page/PageDescription';
import PatientAlertCount from 'main/patient/PatientAlertCount';
import ClinicalMeasuresSummariesEntitiesPanel
    from 'main/summary/clinicalMeasures/ClinicalMeasuresSummariesEntitiesPanel';
import LungFunctionSummaryMainPanel from 'main/summary/lungFunction/LungFunctionSummaryMainPanel';
import MedicationSummaryMainPanel from 'main/summary/medication/MedicationSummaryMainPanel';
import PathologyHistoryAndSummary from 'main/summary/pathology/PathologyHistoryAndSummary';
import SummaryViewEvaluator from 'main/summary/SummaryViewEvaluator';
import UserAlertCount from 'main/user/UserAlertCount';
import UserAlertsPanel from 'main/user/UserAlertsPanel';
import React from 'react';
import ClinicalPermission, {ClinicalPermissionViewAnyPatientList} from 'smarthealth-javascript/ClinicalPermission';

/**
 * Definitions of individual pages in the applications.
 *
 * TODO move descriptions to the components that implement them
 * TODO build program navTreeItems
 * TODO handle permissions
 * TODO more panels
 *
 * @author Larry 26/02/2018
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2018
 */
class PageDescriptions
{
    public static advisories: PageDescription = {
        key: 'Advisories',
        title: 'News/Advisories',
        icon: 'advisories',
        visible: ({ sessionStore }) => !!sessionStore.advisories
    };

    public static meetings: PageDescription = {
        key: 'Meetings',
        title: 'Meetings',
        icon: 'meetings',
        visible: ({ sessionStore }) => sessionStore.hasClinicalPermission(ClinicalPermission.ViewMeetings)
    };

    public static patientAlerts: PageDescription = {
        key: 'PatientAlerts',
        title: 'Alerts',
        icon: 'alert',
        annotation: <PatientAlertCount />,
        visible: ({ sessionStore }) => !!sessionStore.currentPatientID
    };

    public static patientClinicalMeasures: PageDescription = {
        key: 'ClinicalMeasures',
        title: 'Clinical Measures',
        icon: 'clinicalmeasures',
        renderPanel: () => <ClinicalMeasuresSummariesEntitiesPanel />,
        visible: ({ sessionStore }) => !!sessionStore.currentPatientID
    };

    public static patientConditions: PageDescription = {
        key: 'Conditions',
        title: 'Conditions',
        icon: 'conditions',
        visible: ({ sessionStore }) => !!sessionStore.currentPatientID
    };

    public static patientList: PageDescription = {
        key: 'PatientList',
        title: 'Patient List',
        icon: 'patientlist',
        visible: ({ sessionStore }) => sessionStore.hasAnyClinicalPermission(ClinicalPermissionViewAnyPatientList)
    };

    public static patientLungFunction: PageDescription = {
        hasServiceRecordList: true,
        key: 'LungFunction',
        title: 'Lung Function',
        icon: 'lungfunction',
        renderPanel: () => <LungFunctionSummaryMainPanel />,
        visible: (appStore) => SummaryViewEvaluator.isLungFunctionVisible(appStore)
    };

    public static patientMedications: PageDescription = {
        hasServiceRecordList: true,
        key: 'Medications',
        title: 'Medications',
        icon: 'medications',
        renderPanel: () => <MedicationSummaryMainPanel />,
        visible: ({ sessionStore }) => !!sessionStore.currentPatientID
    };

    public static patientPathology: PageDescription = {
        hasServiceRecordList: true,
        key: 'Pathology',
        title: 'Pathology',
        icon: 'pathology',
        renderPanel: () => <PathologyHistoryAndSummary />,
        visible: (appStore) => SummaryViewEvaluator.isPathologyVisible(appStore)
    };

    public static providerAlerts: PageDescription = {
        title: 'Alerts',
        key: 'ProviderAlerts',
        icon: 'alert',
        annotation: <UserAlertCount />,
        renderPanel: () => <UserAlertsPanel />
    };

    public static restTester: PageDescription = {
        key: 'RestTester',
        title: 'REST Tester',
        renderPanel: () => <RestTester />
    };
}

export default PageDescriptions;
