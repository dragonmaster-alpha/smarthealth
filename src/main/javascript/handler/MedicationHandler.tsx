import HttpStatus from 'http-status-codes';
import LOG from 'loglevel';
import DialogIcons from 'main/dialog/DialogIcons';
import OKDialog from 'main/dialog/OKDialog';
import HandlerStore from 'main/store/HandlerStore';
import React from 'react';
import CodedValue from 'smarthealth-javascript/CodedValue';
import EntityReferenceList from 'smarthealth-javascript/EntityReferenceList';
import MedicationCeaseParameters from 'smarthealth-javascript/MedicationCeaseParameters';
import MedicationSummary from 'smarthealth-javascript/MedicationSummary';
import MIMSFormulation from 'smarthealth-javascript/MIMSFormulation';
import MIMSPack from 'smarthealth-javascript/MIMSPack';

/**
 * Client access to Medication REST Interfaces
 *
 * @author Thompson 4/09/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
class MedicationHandler
{
    private readonly handlers: HandlerStore;

    constructor(handlers: HandlerStore)
    {
        this.handlers = handlers;
    }

    public async acceptMIMSLicence(): Promise<boolean>
    {
        const result = await this.handlers.axios.put('/medications/license/mims')
            .catch(err => err.response);
        if (result.status === HttpStatus.NO_CONTENT)
        {
            return true;
        }
        else
        {
            this.handlers.appStore.componentStore.modalDialog.show(<OKDialog header="Error" icon={DialogIcons.error}
                message={`Error accepting MIMS Licence code: ${result.status
                }. Please try again or contact your local administrator.`} />);
            return false;
        }
    }

    public async addRecentMedicationProduct(codedValue: CodedValue): Promise<boolean>
    {
        const result = await this.handlers.axios.post('/medications/recents', codedValue);
        if (result.status === HttpStatus.NO_CONTENT)
        {
            return true;
        }
        else
        {
            LOG.warn(`addRecentMedicationProduct error ${JSON.stringify(result)}`);
            return false;
        }
    }

    public async ceaseMedication(medicationCeaseParameters: MedicationCeaseParameters): Promise<boolean>
    {
        const result = await this.handlers.axios.post('/medications/$cease', medicationCeaseParameters)
            .catch(err => err.response);
        if (result.status !== HttpStatus.NO_CONTENT)
        {
            LOG.warn(`ceaseMedication error ${JSON.stringify(result)}`);
            this.handlers.appStore.componentStore.modalDialog.show(<OKDialog header="Error" icon={DialogIcons.error}
                message={`Error ceasing the medication code: ${result.status
                }. Please contact your local administrator.`} />);
            return false;
        }

        return true;
    }

    public async completeMedication(codedValue: CodedValue): Promise<boolean>
    {
        const result = await this.handlers.axios.post('/medications/$complete', codedValue)
            .catch(err => err.response);
        if (result.status !== HttpStatus.NO_CONTENT)
        {
            LOG.warn(`completeMedication error ${JSON.stringify(result)}`);
            this.handlers.appStore.componentStore.modalDialog.show(<OKDialog header="Error" icon={DialogIcons.error}
                message={`Error completing the medication code: ${result.status
                }. Please contact your local administrator.`} />);
            return false;
        }

        return true;
    }

    public async getGenericFormulationPacks(product: CodedValue, formulation: CodedValue): Promise<MIMSPack[]>
    {
        const result = await this.handlers.axios.get(encodeURI(
            `/medications/generics/${product.code}/formulations/${formulation.value}/packs`
        ));
        return result.data;
    }

    public async getGenericFormulations(codedValue: CodedValue): Promise<MIMSFormulation[]>
    {
        const result = await this.handlers.axios.get(`/medications/generics/${codedValue.code}/formulations`);
        return result.data;
    }

    public async getLatestMedications(): Promise<EntityReferenceList>
    {
        const result = await this.handlers.axios.get('/medications/latest');
        return result.data;
    }

    public async getMedicationSummary(medicationID: number): Promise<MedicationSummary>
    {
        const result = await this.handlers.axios.get(`/medications/${medicationID}`);
        return result.data;
    }

    public async getProductFormulationPacks(product: CodedValue, formulation: CodedValue): Promise<MIMSPack[]>
    {
        const result = await this.handlers.axios.get(
            `/medications/products/${product.code}/formulations/${formulation.code}/packs`);
        return result.data;
    }

    public async getProductFormulations(codedValue: CodedValue): Promise<MIMSFormulation[]>
    {
        const result = await this.handlers.axios.get(`/medications/products/${codedValue.code}/formulations`);
        return result.data;
    }

    public async getRecentMedicationProducts(): Promise<CodedValue[]>
    {
        const result = await this.handlers.axios.get('/medications/recents');
        return result.data;
    }

    public async hasAcceptedMIMSLicence(): Promise<boolean>
    {
        const result = await this.handlers.axios.get('/medications/license/mims');
        return result.data;
    }

    public async searchMedicationProducts(productPrefix: string): Promise<CodedValue[]>
    {
        const results = await this.handlers.axios.get(`/medications/products?prefix=${productPrefix}`);
        return results.data;
    }
}

export default MedicationHandler;
