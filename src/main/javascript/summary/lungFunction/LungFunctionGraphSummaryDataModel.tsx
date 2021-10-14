import DateUtility from 'main/utility/DateUtility';
import MultiMap from 'main/utility/MultiMap';
import {determineNewestObservation} from 'main/utility/ObservationsUtility';
import ShouldNeverGetHereError from 'main/utility/ShouldNeverGetHereError';
import EventDateTime from 'smarthealth-javascript/EventDateTime';
import Observation from 'smarthealth-javascript/Observation';
import ObservationType from 'smarthealth-javascript/ObservationType';
import Precision from 'smarthealth-javascript/Precision';

/**
 * Extract observations which are graphable. Graphable observations are observations of observationType Pre-BD FEV1 %
 * Predicted, Pre-BD FEV1, Pre-BD FVC % Predicted and Pre-BD FVC. The extracted observations is transformed into chart
 * data (only the necessary values for charting). And, sorted in ascending order by date.
 *
 * There may be multiple observations with the same observationType and observationDate. Only the latest observation
 * must be used. The latest observation is determined by comparing the observationDate. If they are the same then
 * serviceID is used.
 *
 * https://rm.smarthealth.com.au/smartrm/#!/PV8/FR1885
 *
 * @author Thompson 27/05/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
export enum GraphPeriod
{
    last12Months,
    last2Years,
    last5Years,
    last10Years,
    lifeTime
}

export interface ChartPoint
{
    date: EventDateTime;
    unixEpochMilliSeconds: number;

    [observationTypeKey: string]: any;
}

class LungFunctionGraphSummaryDataModel
{
    public data: ChartPoint[];

    private readonly today: EventDateTime;

    constructor(lungFunctionObservations: Observation[], period: GraphPeriod, today: EventDateTime)
    {
        this.today = today;

        const dateBeginningOfPeriod: EventDateTime | null = this.dateBeginningOfPeriod(period);
        // if period is lifeTime no filter is needed
        const observationsWithinPeriod = dateBeginningOfPeriod
            ? lungFunctionObservations.filter(observation =>
                DateUtility.isBeforeDay(dateBeginningOfPeriod, observation.observationDate))
            : lungFunctionObservations;
        const observationsGraphable = observationsWithinPeriod.filter(this.isObservationGraphable);
        // There can be two or more observations with the same date and observationType
        const observationWithLatestVersion = this.removeOutdatedObservations(observationsGraphable);

        const groupedByDate: MultiMap<string, Observation> = new MultiMap<string, Observation>();
        observationWithLatestVersion.forEach(observation =>
        {
            groupedByDate.add(DateUtility.reducePrecision(observation.observationDate, Precision.Day).iso,
                observation);
        });

        const data = [];
        groupedByDate.forEach((values: Observation[], dayPrecisionISO: string) =>
        {
            const date: EventDateTime = { iso: dayPrecisionISO };
            const datePoints: ChartPoint = {
                date,
                unixEpochMilliSeconds: DateUtility.eventDateTimeToUnixEpochMilliSeconds(date)
            };
            values.forEach(observation =>
            {
                datePoints[observation.observationType] = observation.valueNumber;
            });
            data.push(datePoints);
        });

        this.data = data;
    }

    // if period is lifeTime then null is returned
    private dateBeginningOfPeriod(period: GraphPeriod): EventDateTime | null
    {
        if (period === GraphPeriod.last12Months)
        {
            return DateUtility.addYears(this.today, -1);
        }
        else if (period === GraphPeriod.last2Years)
        {
            return DateUtility.addYears(this.today, -2);
        }
        else if (period === GraphPeriod.last5Years)
        {
            return DateUtility.addYears(this.today, -5);
        }
        else if (period === GraphPeriod.last10Years)
        {
            return DateUtility.addYears(this.today, -10);
        }
        else if (period === GraphPeriod.lifeTime)
        {
            return null;
        }
        else
        {
            throw new ShouldNeverGetHereError();
        }
    }

    private isObservationGraphable(observation: Observation)
    {
        return (observation.observationType === ObservationType.PreBDFVC
            || observation.observationType === ObservationType.PreBDFVCPredicted
            || observation.observationType === ObservationType.PreBDFEV1
            || observation.observationType === ObservationType.PreBDFEV1Predicted);
    }

    private removeOutdatedObservations(observations: Observation[]): Observation[]
    {
        const latestObservationMapping: { [precisionDayISO: string]: Observation[] } = {};
        observations.forEach(observation =>
        {
            const observationEventDateTimeDay = DateUtility.reducePrecision(observation.observationDate,
                Precision.Day);
            const latestObservationsForDate = latestObservationMapping[observationEventDateTimeDay.iso];
            if (latestObservationsForDate)
            {
                const latestObservationToCheckIndex = latestObservationsForDate.findIndex(
                    currentLatestObservation =>
                        (currentLatestObservation.observationType === observation.observationType));
                if (latestObservationToCheckIndex > -1)
                {
                    // There is an existing observation with the same type in latestObservationMapping.
                    // Check which observation is newer and set newest observation to latestObservationMapping.
                    latestObservationMapping[observationEventDateTimeDay.iso][latestObservationToCheckIndex] =
                        determineNewestObservation(latestObservationsForDate[latestObservationToCheckIndex],
                            observation);
                }
                else
                {
                    // There was no existing observation with the same type in latestObservationMapping.
                    // Determining the newest observation is not needed, just adding observation is adequate.
                    latestObservationMapping[observationEventDateTimeDay.iso].push(observation);
                }
            }
            else
            {
                // This is the first observation found for this date. Create a new list.
                latestObservationMapping[observationEventDateTimeDay.iso] = [observation];
            }
        });

        const latestObservations = [];
        Object.keys(latestObservationMapping)
            .forEach(dateISO =>
            {
                latestObservations.push(...latestObservationMapping[dateISO]);
            });
        return latestObservations;
    }
}

export default LungFunctionGraphSummaryDataModel;
