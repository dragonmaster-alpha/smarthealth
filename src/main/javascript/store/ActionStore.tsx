import LOG from 'loglevel';
import MIMSTermsOfUseDialog from 'main/dialog/MIMSTermsOfUseDialog';
import ActionDescription from 'main/page/ActionDescription';
import NewPatientDialog from 'main/patient/NewPatientDialog';
import PatientSearchDialog from 'main/patient/PatientSearchDialog';
import AppStore from 'main/store/AppStore';
import {isServiceRecordReference, isServiceSummary} from 'main/utility/ServiceUtility';
import ShouldNeverGetHereError from 'main/utility/ShouldNeverGetHereError';
import {modalWait} from 'main/wait/WaitModalComponent';
import {runInAction} from 'mobx';
import React from 'react';
import NewServiceRecordRequest from 'smarthealth-javascript/NewServiceRecordRequest';
import ServiceRecord from 'smarthealth-javascript/ServiceRecord';
import ServiceRecordReference from 'smarthealth-javascript/ServiceRecordReference';
import ServiceSummary from 'smarthealth-javascript/ServiceSummary';
import ServiceType from 'smarthealth-javascript/ServiceType';
import ServiceTypeEnum from 'smarthealth-javascript/ServiceTypeEnum';
import WebUISession from 'smarthealth-javascript/WebUISession';

/**
 * Actions to be performed in the application that are triggered by the user.
 *
 * @author Larry 3/02/2021
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2021
 */

export const CLOSE_PATIENT_ACTION: ActionDescription = {
    key: 'ClosePatient',
    title: 'Close Patient',
    doAction: (appStore) => appStore.actionStore.closePatient()
};

export const NEW_PATIENT_ACTION: ActionDescription = {
    key: 'NewPatient',
    title: 'New Patient',
    icon: 'patient-new',
    doAction: (appStore) => appStore.actionStore.createNewPatient(),
    visible: (appStore) => !appStore.sessionStore.session.usePAS
};

export const OPEN_HARRY_POTTER_ACTION: ActionDescription = {
    key: 'OpenHarryPotter',
    title: 'Open Harry Potter',
    icon: 'patient',
    doAction: (appStore) => appStore.actionStore.openHarryPotter()
};

export const OPEN_PATIENT_ACTION: ActionDescription = {
    key: 'OpenPatient',
    title: 'Open Patient',
    icon: 'patient',
    doAction: (appStore) => appStore.actionStore.openPatient()
};

class ActionStore
{
    private readonly appStore: AppStore;

    constructor(appStore: AppStore)
    {
        this.appStore = appStore;
    }

    private async canCreateNewService(serviceType: ServiceType): Promise<boolean>
    {
        if (serviceType.serviceTypeID === ServiceTypeEnum.Medication)
        {
            const mimsLicenceAccepted = await this.appStore.sessionStore.isMIMSLicenceAccepted();
            if (!mimsLicenceAccepted)
            {
                const userLicenceAgreement = await this.appStore.componentStore.modalDialog.showAndWait(
                    <MIMSTermsOfUseDialog />);
                if (!userLicenceAgreement)
                {
                    // If user does not accept MIMS licence then we cannot create the Medication service record.
                    return false;
                }
            }
        }

        return true;
    }

    public async closePatient(): Promise<void>
    {
        if (this.appStore.sessionStore.currentPatientID)
        {
            const promise = this.appStore.handlers.sessionHandler.closePatient();
            return modalWait(promise, this.appStore.sessionStore)
                .then(() =>
                {
                    this.appStore.componentStore.selectUserHomePage();
                    this.appStore.componentStore.closePatient();
                    this.appStore.sessionStore.closePatient();
                    this.appStore.entityCache.clearPatient();
                });
        }
        else
        {
            return Promise.resolve();
        }
    }

    public completeLogin(webUISession: WebUISession)
    {
        this.appStore.sessionStore.setLoggedIn(webUISession);
        this.appStore.componentStore.selectUserHomePage();
        this.appStore.handlers.serviceTypeHandler.loadAllServiceTypes();
    }

    public completeOpenPatient(patientID: number, purpose: string, setting: string)
    {
        this.appStore.sessionStore.openedPatient(patientID);
        this.appStore.sessionStore.setPurposeAndSettings(purpose, setting);
        this.appStore.componentStore.selectPatientHomePage();
    }

    public async createNewPatient(): Promise<void>
    {
        this.closePatient()
            .then(() =>
            {
                this.appStore.componentStore.modalDialog.show(<NewPatientDialog />);
            });
    }

    /**
     * If the currently rendered content has a Service Record List then open service record otherwise navigate to
     * History panel and then open service record for viewing.
     */
    public async createNewService(serviceType: ServiceType)
    {
        const canCreate = await this.canCreateNewService(serviceType);
        if (!canCreate)
        {
            return;
        }

        this.appStore.componentStore.selectServiceHistoryPage();

        const newServiceRecordRequest: NewServiceRecordRequest = {
            extraData: undefined,
            program: serviceType.program,
            serviceTypeID: serviceType.serviceTypeID,
            sourceServiceID: undefined
        };
        const serviceRecord: ServiceRecord = await this.appStore.handlers.serviceRecordHandler.prepareNewServiceRecord(
            newServiceRecordRequest);
        const serviceSummary: ServiceSummary = { ...serviceRecord.metadata };
        runInAction(() => this.appStore.componentStore.serviceToOpenInTabStore = { serviceSummary, serviceRecord });
    }

    public logout()
    {
        const promise = this.appStore.handlers.sessionHandler.sendLogout();
        modalWait(promise, this.appStore.sessionStore)
            .then(() =>
            {
                LOG.info('logged out');
                this.appStore.sessionStore.loggedOut();
            });
    }

    public openHarryPotter()
    {
        this.closePatient()
            .then(() =>
            {
                // for testing - patient id -42 is a special code that searches for patient Harry Potter
                const patientID = -42;
                const purpose = 'Consultation';
                const setting = 'Clinic';
                const promise = this.appStore.handlers.sessionHandler.openPatient(patientID, purpose, setting);
                modalWait(promise, this.appStore.sessionStore)
                    .then((response: WebUISession) =>
                    {
                        this.completeOpenPatient(response.patientID, purpose, setting);
                    });
            });
    }

    public async openPatient()
    {
        await this.closePatient();

        const formDescription = await this.appStore.entityCache.formDescriptions.load('Patient.Search');

        this.appStore.componentStore.modalDialog.show(
            <PatientSearchDialog showSettingPurpose={true} formDescription={formDescription} />
        );
    }

    /**
     * If the currently rendered content has a Service Record List then open service record otherwise navigate to
     * History panel and then open service record for viewing.
     */
    public async openService(service: ServiceRecordReference | ServiceSummary)
    {
        if (isServiceSummary(service))
        {
            await this.openServiceFromServiceSummary(service);
        }
        else if (isServiceRecordReference(service))
        {
            await this.openServiceFromServiceRecordReference(service);
        }
        else
        {
            throw new ShouldNeverGetHereError();
        }
    }

    private openServiceFromServiceRecordReference(serviceRecordReference: ServiceRecordReference)
    {
        const serviceSummary: ServiceSummary = {
            confidentiality: serviceRecordReference.confidentiality,
            owningGroupID: serviceRecordReference.owningGroupID,
            patientID: this.appStore.sessionStore.currentPatientID, program: serviceRecordReference.program,
            providerID: undefined, serviceDate: serviceRecordReference.serviceDate,
            serviceID: serviceRecordReference.serviceID, serviceType: serviceRecordReference.serviceType,
            status: undefined,
            summaryLine: serviceRecordReference.summary
        };

        this.openServiceFromServiceSummary(serviceSummary);
    }

    private async openServiceFromServiceSummary(serviceSummary: ServiceSummary)
    {
        this.appStore.componentStore.selectServiceHistoryPage();
        runInAction(() => this.appStore.componentStore.serviceToOpenInTabStore = { serviceSummary });
    }
}

export default ActionStore;
