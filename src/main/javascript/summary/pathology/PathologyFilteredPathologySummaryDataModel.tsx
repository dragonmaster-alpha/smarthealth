import AppStore from 'main/store/AppStore';
import DateUtility from 'main/utility/DateUtility';
import {ColumnProps} from 'primereact/column';
import EventDateTime from 'smarthealth-javascript/EventDateTime';
import FilteredPathologySummaryData from 'smarthealth-javascript/FilteredPathologySummaryData';
import PathologyResultAndService from 'smarthealth-javascript/PathologyResultAndService';
import PathologyResultAndServiceAtDate from 'smarthealth-javascript/PathologyResultAndServiceAtDate';
import Precision from 'smarthealth-javascript/Precision';

/**
 * Create columns for filtered pathology table, which includes Results, Date/s (dynamic date for results), Units and
 * Range columns. To be used in Renal Pathology and Renal Transplant Pathology tables in Pathology Summary.
 *
 * Date/s columns are limited to up to 12 filtered pathology results for each measure in FilteredPathologySummaryData.
 *
 * https://rm.smarthealth.com.au/smartrm/#!/PV8/FR3390
 * https://rm.smarthealth.com.au/smartrm/#!/PV8/FR3467
 *
 * @author Thompson 13/05/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
class PathologyFilteredPathologySummaryDataModel
{
    private readonly appStore: AppStore;

    private readonly filteredPathologySummary: FilteredPathologySummaryData;

    private readonly latest12DateColumns: EventDateTime[];

    constructor(appStore: AppStore, filteredPathologySummaryData: FilteredPathologySummaryData)
    {
        this.appStore = appStore;
        this.filteredPathologySummary = filteredPathologySummaryData;
        this.latest12DateColumns = this.extractLatest12ResultDates();
    }

    public get columns(): ColumnProps[]
    {
        const columns = [];
        columns.push({ field: 'result', header: 'Result', key: 'Result' });
        columns.push(
            ...this.buildLatest12DatesColumnProps()
        );
        columns.push({ field: 'units', header: 'Units', key: 'Units' });
        columns.push({ field: 'range', header: 'Range', key: 'Range' });

        return columns;
    }

    public get values(): any[]
    {
        if (!this.filteredPathologySummary)
        {
            return [];
        }

        const valuesWithAllResultTypes = this.filteredPathologySummary.resultTypes.map(
            resultTypeName => ({ result: resultTypeName }));
        this.filteredPathologySummary.results.forEach(result =>
        {
            if (this.hasResultDateWithLatest12Dates(result))
            {
                for (const resultName in result.results)
                {
                    const resultRowData: { [key: string]: any } = valuesWithAllResultTypes.find(
                        rowData => rowData.result === resultName);
                    this.populateResultRowData(resultRowData, result.results[resultName]);
                }
            }
        });

        const valuesWithUnpopulatedResultsRemoved = valuesWithAllResultTypes.filter(
            valueResultType => Object.keys(valueResultType).length > 1);

        return valuesWithUnpopulatedResultsRemoved;
    }

    private buildLatest12DatesColumnProps(): ColumnProps[]
    {
        const latest12DateColumns: ColumnProps[] = this.latest12DateColumns.map(date =>
        {
            const dateDay = DateUtility.reducePrecision(date, Precision.Day);
            const headerFormattedDate = this.appStore.i18nStore.formatEventDateTime(dateDay);
            const columnFieldKey = dateDay.iso;
            return { field: columnFieldKey, header: headerFormattedDate, key: headerFormattedDate };
        });

        return latest12DateColumns;
    }

    private extractLatest12ResultDates(): EventDateTime[]
    {
        if (!this.filteredPathologySummary)
        {
            return [];
        }

        const resultDates: Map<string, EventDateTime> = new Map();

        this.filteredPathologySummary.results.forEach(result =>
        {
            const resultDateDayPrecision = DateUtility.reducePrecision(result.date, Precision.Day);
            if (!resultDates.has(resultDateDayPrecision.iso))
            {
                resultDates.set(resultDateDayPrecision.iso, resultDateDayPrecision);
            }
        });

        const resultDatesDescendingSort = [...resultDates.entries()].sort()
            .reverse();
        const latest12ResultDates = resultDatesDescendingSort.map(resultDateEntry => resultDateEntry[1])
            .slice(0, 12);
        return latest12ResultDates;
    }

    private hasResultDateWithLatest12Dates(result: PathologyResultAndServiceAtDate): boolean
    {
        return this.latest12DateColumns.some(latestDate =>
        {
            const resultDateDayPrecision = DateUtility.reducePrecision(result.date, Precision.Day);
            return DateUtility.isSameDay(latestDate, resultDateDayPrecision);
        });
    }

    private populateResultRowData(resultRowData: { [key: string]: any }, resultAndService: PathologyResultAndService)
    {
        if (!resultRowData.units)
        {
            resultRowData.units = resultAndService.result.units;
        }
        if (!resultRowData.range)
        {
            resultRowData.range = resultAndService.result.range;
        }

        const columnFieldKey = DateUtility.reducePrecision(resultAndService.service.serviceDate,
            Precision.Day).iso;
        resultRowData[columnFieldKey] = resultAndService;
    }
}

export default PathologyFilteredPathologySummaryDataModel;
