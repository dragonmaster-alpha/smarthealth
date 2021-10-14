import TableData from 'main/data/TableData';
import AppStore from 'main/store/AppStore';
// tslint:disable-next-line
import {getClinicalMeasuresTableInitialTableData} from 'main/summary/clinicalMeasures/ClinicalMeasuresTableInitialTableData';
import {calculateBMI} from 'main/utility/Calculator';
import DateUtility from 'main/utility/DateUtility';
import {determineNewestObservation} from 'main/utility/ObservationsUtility';
import ShouldNeverGetHereError from 'main/utility/ShouldNeverGetHereError';
import {ColumnProps} from 'primereact/components/column/Column';
import EventDateTime from 'smarthealth-javascript/EventDateTime';
import Observation from 'smarthealth-javascript/Observation';
import ObservationType from 'smarthealth-javascript/ObservationType';
import Precision from 'smarthealth-javascript/Precision';

/**
 * Extract columns and values from Clinical Measures observations for ClinicalMeasuresTable.
 *
 * @author Thompson 19/08/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
class ClinicalMeasuresTableModel
{
    private appStore: AppStore;

    private latest12ColumnDates: EventDateTime[];

    private observations: Observation[];

    constructor(appStore: AppStore, observations: Observation[])
    {
        this.appStore = appStore;
        this.observations = observations || [];
        this.latest12ColumnDates = this.buildLatest12ColumnDates();
    }

    public get columns(): ColumnProps[]
    {
        const columns = [{
            header: 'Measure',
            field: 'measure'
        }];
        this.latest12ColumnDates.forEach(date => columns.push({
            header: this.appStore.i18nStore.formatEventDateTime(date),
            field: date.iso
        }));
        return columns;
    }

    public get values(): TableData
    {
        const values = getClinicalMeasuresTableInitialTableData();
        this.observations.forEach(observation =>
        {
            const rowData = values.find(value => value['measure'] === observation.observationType);
            const columnFieldKey = DateUtility.reducePrecision(observation.observationDate,
                Precision.Day).iso;

            const newestObservation = determineNewestObservation(rowData[columnFieldKey], observation);
            rowData[columnFieldKey] = newestObservation;
        });
        this.addBMICalculatedValues(values);

        return values;
    }

    // BMI is still calculated if there is a weight and a recorded height on or before the measured weight date.
    private addBMICalculatedValues(values: TableData)
    {
        const bmiRowData = values.find(value => value['measure'] === 'BMI');
        if (!bmiRowData)
        {
            throw new ShouldNeverGetHereError();
        }

        const heightRowData = values.find(value => value['measure'] === ObservationType.Height);
        const weightRowData = values.find(value => value['measure'] === ObservationType.Weight);

        const allDateKeys: Set<string> = new Set();
        Object.keys(heightRowData)
            .forEach(columnKey => (columnKey !== 'measure') && allDateKeys.add(columnKey));
        Object.keys(weightRowData)
            .forEach(columnKey => (columnKey !== 'measure') && allDateKeys.add(columnKey));

        const allDateKeysSortedAscending = [...allDateKeys].sort();
        let currentHeight: number;
        allDateKeysSortedAscending.forEach(dateKey =>
        {
            // record height to be used on the next BMI calculation
            if (heightRowData[dateKey])
            {
                currentHeight = heightRowData[dateKey].valueNumber;
            }

            if (weightRowData[dateKey] && currentHeight)
            {
                bmiRowData[dateKey] = calculateBMI([currentHeight, weightRowData[dateKey].valueNumber]);
            }
        });
    }

    private buildLatest12ColumnDates(): EventDateTime[]
    {
        const dates: Map<string, EventDateTime> = new Map();
        this.observations.forEach(observation =>
        {
            const observationDateDayPrecision = DateUtility.reducePrecision(observation.observationDate,
                Precision.Day);
            if (!dates.has(observationDateDayPrecision.iso))
            {
                dates.set(observationDateDayPrecision.iso, observationDateDayPrecision);
            }
        });

        const datesDescendingOrder = [...dates.entries()].sort((dateA, dateB) =>
            DateUtility.compareDescending(dateA[1], dateB[1]));
        const latest12ColumnDates = datesDescendingOrder.slice(0, 12)
            .map(date => date[1]);
        return latest12ColumnDates;
    }
}

export default ClinicalMeasuresTableModel;
