import {AxiosResponse} from 'axios';
import HttpStatus from 'http-status-codes';
import LOG from 'loglevel';
import DialogIcons from 'main/dialog/DialogIcons';
import OKDialog from 'main/dialog/OKDialog';
import HandlerStore from 'main/store/HandlerStore';
import FormDescriptionUtility from 'main/utility/FormDescriptionUtility';
import React from 'react';
import NewServiceMenuItem from 'smarthealth-javascript/NewServiceMenuItem';
import NewServiceRecordRequest from 'smarthealth-javascript/NewServiceRecordRequest';
import ServiceRecord from 'smarthealth-javascript/ServiceRecord';

/**
 *
 * Server calls for Service Record
 *
 * @author Thompson 24/07/2019
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2019
 */
class ServiceRecordHandler
{
    private readonly handlers: HandlerStore;

    constructor(handlers: HandlerStore)
    {
        this.handlers = handlers;
    }

    public async createNewServiceRecord(serviceRecord: ServiceRecord): Promise<number>
    {
        const result = await this.handlers.axios.post('/services', serviceRecord)
            .catch(err => err.response);

        if (result.status === HttpStatus.CREATED)
        {
            return result.data;
        }
        else
        {
            LOG.warn(`createNewServiceRecord error ${JSON.stringify(result)}`);
            this.handlers.appStore.componentStore.modalDialog.show(<OKDialog header="Error" icon={DialogIcons.error}
                message={`Error creating New Service Record code: ${result.status
                }. Please contact your local administrator.`} />);
            return null;
        }
    }

    public async getMenuItems(): Promise<NewServiceMenuItem[]>
    {
        const result = await this.handlers.axios.get('/services/menuitems');
        return result.data;
    }

    public async getServiceRecord(serviceID: number): Promise<ServiceRecord>
    {
        const result = await this.handlers.axios.get(`/services/${serviceID}`);
        return result.data;
    }

    public async prepareNewServiceRecord(newServiceRecordRequest: NewServiceRecordRequest): Promise<ServiceRecord>
    {
        const result = await this.handlers.axios.post('/services/$prepare', newServiceRecordRequest);
        return result.data;
    }

    public async updateServiceRecord(serviceID: number, serviceRecord: ServiceRecord): Promise<boolean>
    {
        const serviceRecordUpdatedMetadata = FormDescriptionUtility.updateServiceRecordMetadata(serviceRecord);
        const response: AxiosResponse = await this.handlers.axios.put(`/services/${serviceID}`,
            serviceRecordUpdatedMetadata)
            .catch(err => err.response);

        if (response.status === HttpStatus.NO_CONTENT)
        {
            this.handlers.appStore.componentStore.message.success('Service record saved');
            return true;
        }
        else
        {
            if (response.status === HttpStatus.CONFLICT)
            {
                this.handlers.appStore.componentStore.modalDialog.show(<OKDialog header="Conflict"
                    icon={DialogIcons.warn}
                    message={'The data for this form has been changed by someone else.' +
                    ' Please cancel your changes and apply them again.'} />);
            }
            else
            {
                LOG.warn(`updateServiceRecord error ${JSON.stringify(response)}`);
                this.handlers.appStore.componentStore.modalDialog.show(<OKDialog header="Error" icon={DialogIcons.error}
                    message={`Error saving the Service Record code: ${response.status
                    }. Please contact your local administrator.`} />);
            }
            return false;
        }
    }
}

export default ServiceRecordHandler;
