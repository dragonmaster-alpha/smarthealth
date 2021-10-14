/**
 * Client access to Summary REST Interfaces
 *
 * @author Thompson 6/01/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
import HandlerStore from 'main/store/HandlerStore';
import SummaryType from 'smarthealth-javascript/SummaryType';

class SummaryHandler
{
    private readonly handlers: HandlerStore;

    constructor(handlers: HandlerStore)
    {
        this.handlers = handlers;
    }

    public async getSummary(summaryType: SummaryType): Promise<{ [key: string]: any }>
    {
        const result = await this.handlers.axios.get(`/summaries/${summaryType}`);
        return result.data;
    }
}

export default SummaryHandler;
