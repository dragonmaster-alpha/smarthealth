import HandlerStore from 'main/store/HandlerStore';
import {runInAction} from 'mobx';
import ServiceType from 'smarthealth-javascript/ServiceType';

/**
 * Access service type information
 *
 * @author Larry 1/02/2019
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2019
 */
class ServiceTypeHandler
{
    private readonly handlers: HandlerStore;

    private preloaded: boolean;

    constructor(handlers: HandlerStore)
    {
        this.handlers = handlers;
        this.preloaded = false;
    }

    public async getAllServiceTypes(): Promise<ServiceType[]>
    {
        const result = await this.handlers.axios.get('/servicetypes');
        return result.data;
    }

    public async getServiceType(serviceTypeID: number): Promise<ServiceType>
    {
        const result = await this.handlers.axios.get(`/servicetypes/${serviceTypeID}`);
        return result.data;
    }

    // TODO review where this should be put
    public async loadAllServiceTypes(): Promise<void>
    {
        const all: ServiceType[] = await this.getAllServiceTypes();
        runInAction(() =>
        {
            const { serviceTypes } = this.handlers.appStore.entityCache;
            all.forEach((serviceType) =>
            {
                serviceTypes.set(serviceType.serviceTypeID, serviceType);
            });
        });
    }

    public async preloadServiceTypes(): Promise<void>
    {
        if (!this.preloaded)
        {
            await this.loadAllServiceTypes();
            this.preloaded = true;
        }
        return Promise.resolve();
    }
}

export default ServiceTypeHandler;
