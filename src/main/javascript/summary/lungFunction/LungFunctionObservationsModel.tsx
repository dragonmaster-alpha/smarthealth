import lodash from 'lodash';
import AppStore from 'main/store/AppStore';
import initialObservationsTableDataJSON from 'main/summary/lungFunction/LungFunctionObservationsInitialTableData.json';
import DateUtility from 'main/utility/DateUtility';
import {determineNewestObservation} from 'main/utility/ObservationsUtility';
import {ColumnProps} from 'primereact/column';
import EventDateTime from 'smarthealth-javascript/EventDateTime';
import Observation from 'smarthealth-javascript/Observation';
import Precision from 'smarthealth-javascript/Precision';

/**
 * Extract update to 12 DataTable columns and values from observations data to be used in Lung Function Summary
 * Observations table.
 *
 * There may be multiple observations with the same observationType and observationDate. Only the latest observation
 * must be used. The latest observation is determined by comparing the observationDate. If they are the same then
 * serviceID is used.
 *
 * @author Thompson 12/05/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */

class LungFunctionObservationsModel
{
    public static readonly BEST_12_MONTH_COLUMN_KEY = 'best12Mon';

    private readonly INITIAL_TABLE_DATA;

    private readonly appStore: AppStore;

    private readonly observations: Observation[];

    constructor(appStore: AppStore, observations: Observation[])
    {
        this.appStore = appStore;
        this.observations = observations;
        this.INITIAL_TABLE_DATA = initialObservationsTableDataJSON;
    }

    public get columns(): ColumnProps[]
    {
        const columns = [];
        columns.push({ field: 'observationType', header: '' });
        columns.push({ field: LungFunctionObservationsModel.BEST_12_MONTH_COLUMN_KEY, header: 'Best 12 mon' });
        columns.push(...this.extractNewDateColumns());

        return columns;
    }

    public get values(): any[]
    {
        if (!this.observations)
        {
            return this.INITIAL_TABLE_DATA;
        }

        const observationsTableData = lodash.cloneDeep(this.INITIAL_TABLE_DATA);
        this.observations.forEach(observation =>
        {
            const rowData = observationsTableData.find(
                observationRowData => observationRowData.observationType === observation.observationType);
            const columnFieldKey = DateUtility.reducePrecision(observation.observationDate,
                Precision.Day).iso;

            const newestObservation = determineNewestObservation(rowData[columnFieldKey], observation);
            rowData[columnFieldKey] = newestObservation;

            const best12MonthObservation = rowData[LungFunctionObservationsModel.BEST_12_MONTH_COLUMN_KEY];
            if ((!best12MonthObservation || (observation.valueNumber > best12MonthObservation.valueNumber))
                && this.isObservationWithinLast12Months(observation))
            {
                const best12MonthObservationNewest = determineNewestObservation(best12MonthObservation, observation);
                rowData[LungFunctionObservationsModel.BEST_12_MONTH_COLUMN_KEY] = best12MonthObservationNewest;
            }
        });

        return observationsTableData;
    }

    private extractNewDateColumns(): ColumnProps[]
    {
        if (!this.observations)
        {
            return [];
        }

        const dateColumns = new Map();
        this.observations.forEach(observation =>
        {
            // TODO Do not format here. Formatting should be done with <DateTime/>
            const headerFormattedDate = this.appStore.i18nStore.formatEventDateTime(
                DateUtility.reducePrecision(observation.observationDate, Precision.Day));
            const dayPrecisionISO = DateUtility.reducePrecision(observation.observationDate,
                Precision.Day).iso;
            dateColumns.set(dayPrecisionISO, { field: dayPrecisionISO, header: headerFormattedDate });
        });

        const dateColumnEntriesInAscendingSort = [...dateColumns.entries()]
            .sort((dateColumnEntryA, dateColumnEntryB) =>
            {
                const dateISOKeyA = dateColumnEntryA[0];
                const dateISOKeyB = dateColumnEntryB[0];
                if (dateISOKeyA > dateISOKeyB)
                {
                    return -1;
                }
                else if (dateISOKeyA < dateISOKeyB)
                {
                    return 1;
                }
                else
                {
                    return 0;
                }
            });

        return dateColumnEntriesInAscendingSort
            .slice(0, 12)
            .map(column => dateColumns.get(column[0]));
    }

    private isObservationWithinLast12Months(observation: Observation): boolean
    {
        if (!observation)
        {
            return false;
        }

        const today12MonthsAgo: EventDateTime = DateUtility.addMonths(this.appStore.dateTime.today(), -12);
        return (DateUtility.isBeforeDay(today12MonthsAgo, observation.observationDate)
            || DateUtility.isSameDay(today12MonthsAgo, observation.observationDate));
    }
}

export default LungFunctionObservationsModel;
