import HandlerStore from 'main/store/HandlerStore';
import ValueSet from 'smarthealth-javascript/ValueSet';

/**
 * Client access to server Value Set Handler
 *
 * @author Larry 27/02/2019
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2019
 */
class ValueSetHandler
{
    private readonly handlers: HandlerStore;

    constructor(handlers: HandlerStore)
    {
        this.handlers = handlers;
    }

    public async getValueSet(valueSetID: string): Promise<ValueSet>
    {
        const id = valueSetID.replace(/\./g, '_');
        const result = await this.handlers.axios.get(`/valuesets/${id}`);
        return result.data;
    }
}

export default ValueSetHandler;
