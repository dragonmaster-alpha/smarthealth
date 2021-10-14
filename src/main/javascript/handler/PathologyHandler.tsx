import HandlerStore from 'main/store/HandlerStore';
import FilteredPathologySummaryData from 'smarthealth-javascript/FilteredPathologySummaryData';
import FilteredPathologyType from 'smarthealth-javascript/FilteredPathologyType';
import PathologySummaryData from 'smarthealth-javascript/PathologySummaryData';

/**
 * Client access to Pathology REST Interfaces
 *
 * @author Thompson 13/05/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
class PathologyHandler
{
    private readonly handlers: HandlerStore;

    constructor(handlers: HandlerStore)
    {
        this.handlers = handlers;
    }

    public async getPathology(): Promise<PathologySummaryData>
    {
        const result = await this.handlers.axios.get('/pathology');
        return result.data;
    }

    public async getPathologyFilteredBy(filteredType: FilteredPathologyType): Promise<FilteredPathologySummaryData>
    {
        const result = await this.handlers.axios.get(`/pathology/${filteredType}`);
        return result.data;
    }
}

export default PathologyHandler;
