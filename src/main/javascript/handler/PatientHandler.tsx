import HttpStatus from 'http-status-codes';
import LOG from 'loglevel';
import IDPair from 'main/data/IDPair';
import DialogIcons from 'main/dialog/DialogIcons';
import OKDialog from 'main/dialog/OKDialog';
import HandlerStore from 'main/store/HandlerStore';
import React from 'react';
import PagedResults from 'smarthealth-javascript/PagedResults';
import Patient from 'smarthealth-javascript/Patient';
import PatientClinical from 'smarthealth-javascript/PatientClinical';
import PatientContact from 'smarthealth-javascript/PatientContact';
import PatientContacts from 'smarthealth-javascript/PatientContacts';
import PatientFamilySocial from 'smarthealth-javascript/PatientFamilySocial';
import PatientIdentifiers from 'smarthealth-javascript/PatientIdentifiers';
import PatientMedicalGroupAssociation from 'smarthealth-javascript/PatientMedicalGroupAssociation';
import PatientPAS from 'smarthealth-javascript/PatientPAS';
import PatientProviderAssociation from 'smarthealth-javascript/PatientProviderAssociation';
import PatientSearchTarget from 'smarthealth-javascript/PatientSearchTarget';
import PatientSummary from 'smarthealth-javascript/PatientSummary';
import ServiceSummary from 'smarthealth-javascript/ServiceSummary';

/**
 * Client access to server Patient Handler
 *
 * @author Uditha 26/02/2018
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2018
 */
class PatientHandler
{
    private readonly handlers: HandlerStore;

    constructor(handlers: HandlerStore)
    {
        this.handlers = handlers;
    }

    public async getPatient(id: number): Promise<Patient>
    {
        const result = await this.handlers.axios.get(`/patients/${id}/demographics`);
        return result.data;
    }

    public async getPatientClinical(id: number): Promise<PatientClinical>
    {
        const result = await this.handlers.axios.get(`/patients/${id}/clinical`)
            .catch(err => err.response);
        if (result.status === HttpStatus.NOT_FOUND)
        {
            const patientClinical = { patientID: id, version: 0 };
            await this.handlers.patientHandler.updatePatientClinical(patientClinical);

            // the server will trigger a notification to fetch the newly saved PatientClinical
            return null;
        }
        else
        {
            return result.data;
        }
    }

    public async getPatientContacts(id: number): Promise<PatientContact[]>
    {
        const result = await this.handlers.axios.get(`/patients/${id}/contacts`);
        return result.data;
    }

    public async getPatientFamilySocial(id: number): Promise<PatientFamilySocial>
    {
        const result = await this.handlers.axios.get(`/patients/${id}/familysocial`)
            .catch(err => err.response);
        if (result.status === HttpStatus.NOT_FOUND)
        {
            const familySocial = { patientID: id, version: 0 };
            // TODO personID in PatientFamilySocial Type is incorrect and should be patientID fix when interface fixed
            // @ts-ignore
            const result = this.handlers.patientHandler.updatePatientFamilySocial(id, familySocial);
            if (result)
            {
                // @ts-ignore
                return familySocial;
            }
        }
        return result.data;
    }

    public async getPatientIdentifiers(id: number): Promise<PatientIdentifiers>
    {
        const result = await this.handlers.axios.get(`/patients/${id}/identifiers`);
        return result.data;
    }

    public async getPatientMedicalGroupAssociation(ids: IDPair): Promise<PatientMedicalGroupAssociation>
    {
        const result = await this.handlers.axios.get(`/patients/${ids.id}/medicalgroups/${ids.associatedID}`);
        return result.data;
    }

    public async getPatientPAS(id: number): Promise<PatientPAS>
    {
        const result = await this.handlers.axios.get(`/patients/${id}/pas`);
        return result.data;
    }

    public async getPatientProviders(id: number): Promise<PatientProviderAssociation[]>
    {
        const result = await this.handlers.axios.get(`/patients/${id}/providers`);
        return result.data;
    }

    public async getServices(id: number, offset: number, count: number): Promise<PagedResults<ServiceSummary>>
    {
        const result = await this.handlers.axios.get(`/patients/${id}/services?offset=${offset}&count=${count}`);
        return result.data;
    }

    public async refreshPatientFromPAS(id: number): Promise<boolean>
    {
        const result = await this.handlers.axios.post(`/patients/${id}/pas/$refresh`, {})
            .catch(err => err.response);
        if (result.status === HttpStatus.NO_CONTENT)
        {
            return true;
        }
        else
        {
            LOG.warn(`refreshPatientFromPAS error ${JSON.stringify(result)}`);
            this.handlers.appStore.componentStore.modalDialog.show(<OKDialog header="Error" icon={DialogIcons.error}
                message={`Error refresh Patient PAS code: ${result.status
                }. Please contact your local administrator.`} />);
            return false;
        }
    }

    public async searchPatient(target: PatientSearchTarget, mrn: string, familyNamePrefix: string,
        givenNamePrefix: string,
        includeDeceased: boolean): Promise<PatientSummary[]>
    {
        let params = null;
        if (mrn)
        {
            params = { target, mrn, includeDeceased };
        }
        else
        {
            params = { target, familyNamePrefix, givenNamePrefix, includeDeceased };
        }

        const result = await this.handlers.axios.get('/patients/', { params });
        return result.data;
    }

    public async updatePatientClinical(patientClinical: PatientClinical): Promise<boolean>
    {
        const result = await this.handlers.axios.put(`/patients/${patientClinical.patientID}/clinical`,
            patientClinical)
            .catch(err => err.response);
        if (result.status === HttpStatus.NO_CONTENT)
        {
            return true;
        }
        else if (result.status === HttpStatus.CONFLICT)
        {
            this.handlers.appStore.componentStore.modalDialog.show(<OKDialog header="Conflict" icon={DialogIcons.warn}
                message={'The data for this form has been changed by someone else.' +
                ' Please cancel your changes and apply them again.'} />);
            return false;
        }
        else
        {
            LOG.warn(`updatePatientClinical error ${JSON.stringify(result)}`);
            this.handlers.appStore.componentStore.modalDialog.show(<OKDialog header="Error" icon={DialogIcons.error}
                message={`Error updating Patient Clinical code: ${result.status
                }. Please contact your local administrator.`} />);
            return false;
        }
    }

    public async updatePatientContacts(patientContacts: PatientContacts): Promise<boolean>
    {
        const result = await this.handlers.axios.put(`/patients/${patientContacts.patientID}/contacts`,
            patientContacts)
            .catch((err) => err.response);
        if (result.status === HttpStatus.NO_CONTENT)
        {
            return true;
        }
        else if (result.status === HttpStatus.CONFLICT)
        {
            this.handlers.appStore.componentStore.modalDialog.show(<OKDialog header="Conflict" icon={DialogIcons.warn}
                message={'The data for this form has been changed by someone else.' +
                ' Please cancel your changes and apply them again.'} />);
            return false;
        }
        else
        {
            LOG.warn(`updatePatientContacts error ${JSON.stringify(result)}`);
            this.handlers.appStore.componentStore.modalDialog.show(<OKDialog header="Error" icon={DialogIcons.error}
                message={`Error updating Patient Contacts code: ${result.status
                }. Please contact your local administrator.`} />);
            return false;
        }
    }

    public async updatePatientDemographics(patient: Patient): Promise<boolean>
    {
        const result = await this.handlers.axios.put(`/patients/${patient.patientID}/demographics`, patient)
            .catch(err => err.response);
        if (result.status === HttpStatus.NO_CONTENT)
        {
            return true;
        }
        else
        {
            LOG.warn(`updatePatientDemographics error ${JSON.stringify(result)}`);
            this.handlers.appStore.componentStore.modalDialog.show(<OKDialog header="Error" icon={DialogIcons.error}
                message={`Error updating Patient code: ${result.status
                }. Please contact your local administrator.`} />);
            return false;
        }
    }

    public async updatePatientFamilySocial(id: number, familySocial: PatientFamilySocial): Promise<boolean>
    {
        const result = await this.handlers.axios.put(`/patients/${id}/familysocial`, familySocial);
        return result.status === HttpStatus.NO_CONTENT;
    }

    public async updatePatientIdentifiers(id: number, identifiers: PatientIdentifiers): Promise<boolean>
    {
        const result = await this.handlers.axios.put(`/patients/${id}/identifiers`, identifiers)
            .catch(err => err.response);
        if (result.status === HttpStatus.NO_CONTENT)
        {
            return true;
        }
        else
        {
            LOG.warn(`updatePatientIdentifiers error ${JSON.stringify(result)}`);
            this.handlers.appStore.componentStore.modalDialog.show(<OKDialog header="Error" icon={DialogIcons.error}
                message={`Error updating Patient Identifiers code: ${result.status
                }. Please contact your local administrator.`} />);
            return false;
        }
    }
}

export default PatientHandler;
