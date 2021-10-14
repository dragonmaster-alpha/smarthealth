import HandlerStore from 'main/store/HandlerStore';
import Observation from 'smarthealth-javascript/Observation';
import ObservationGroup from 'smarthealth-javascript/ObservationGroup';

/**
 * Client access to Observations REST Interfaces
 *
 * @author Thompson 8/05/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
class ObservationsHandler
{
    private readonly handlers: HandlerStore;

    constructor(handlers: HandlerStore)
    {
        this.handlers = handlers;
    }

    public async getObservations(observationGroup: ObservationGroup): Promise<Observation[]>
    {
        const result = await this.handlers.axios.get(`/observations/${observationGroup}`);
        return result.data;
    }
}

export default ObservationsHandler;
