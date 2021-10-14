import DateUtility from 'main/utility/DateUtility';
import {determineNewestObservation} from 'main/utility/ObservationsUtility';
import EventDateTime from 'smarthealth-javascript/EventDateTime';
import Observation from 'smarthealth-javascript/Observation';
import ObservationType from 'smarthealth-javascript/ObservationType';
import Precision from 'smarthealth-javascript/Precision';

/**
 * Extract values data points and BMI weights for Adult Weight Chart. BMI weights are calculated for BMI numbers 25, 25
 * and 18.5. The chart display all weights recorded while the patient has been an Adult (18 years or older).
 *
 * https://rm.smarthealth.com.au/smartrm/#!/PV8/FR2103
 *
 * @author Thompson 20/08/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
interface WeightDataPoint
{
    unixEpochMilliSeconds: number;
    weight: number;
}

class ClinicalMeasuresAdultWeightChartModel
{
    public static determine18thBirthdayDate(dateOfBirth: EventDateTime): EventDateTime
    {
        return DateUtility.addYears(dateOfBirth, 18);
    }

    public static determineMostRecentHeight(observations: Observation[]): number | null
    {
        const mostRecentObservationHeight = observations.reduce((mostRecentObservationHeight, currentValue) =>
        {
            if (currentValue.observationType !== ObservationType.Height)
            {
                return mostRecentObservationHeight;
            }

            if (!mostRecentObservationHeight)
            {
                return currentValue;
            }

            if (DateUtility.isAfterDay(currentValue.observationDate, mostRecentObservationHeight.observationDate))
            {
                return currentValue;
            }
            else if (DateUtility.isSameDay(currentValue.observationDate, mostRecentObservationHeight.observationDate)
                && (currentValue.serviceRecordReference.serviceID
                    > mostRecentObservationHeight.serviceRecordReference.serviceID))
            {
                return currentValue;
            }
            else
            {
                return mostRecentObservationHeight;
            }
        }, null);

        return mostRecentObservationHeight
            ? mostRecentObservationHeight.valueNumber
            : null;
    }

    public static generateWeightDataPoints(cutOffDate: EventDateTime, observations: Observation[]): WeightDataPoint[]
    {
        const weightObservations = observations.filter(
            observation => (observation.observationType === ObservationType.Weight) && observation.valueNumber);
        const latestWeightObservations: Map<string, Observation> = new Map();
        weightObservations.forEach(weightObservation =>
        {
            const weightObservationDateDayPrecision = DateUtility.reducePrecision(
                weightObservation.observationDate, Precision.Day);
            if (DateUtility.isAfterDay(cutOffDate, weightObservationDateDayPrecision))
            {
                // we do not chart weights when patients were under 18 years old.
                return;
            }

            if (!latestWeightObservations.has(weightObservationDateDayPrecision.iso))
            {
                latestWeightObservations.set(weightObservationDateDayPrecision.iso, weightObservation);
            }
            else
            {
                const currentLatestWeightObservation = latestWeightObservations.get(
                    weightObservationDateDayPrecision.iso);
                const latestWeightObservation = determineNewestObservation(currentLatestWeightObservation,
                    weightObservation);
                const latestWeightObservationsDateDayPrecision = DateUtility.reducePrecision(
                    latestWeightObservation.observationDate, Precision.Day);
                latestWeightObservations.set(latestWeightObservationsDateDayPrecision.iso, latestWeightObservation);
            }
        });

        const weightDataPoints = [...latestWeightObservations.entries()].map(
            weightObservationEntry => ({
                weight: weightObservationEntry[1].valueNumber,
                unixEpochMilliSeconds: DateUtility.eventDateTimeToUnixEpochMilliSeconds(
                    DateUtility.reducePrecision(weightObservationEntry[1].observationDate, Precision.Day))
            }));
        return weightDataPoints;
    }

    private readonly mostRecentHeight: number;

    private readonly weightDataPoints: WeightDataPoint[];

    constructor(observations: Observation[], patientDateOfBirth: EventDateTime)
    {
        // BMI charts do not apply for observations under 18 years old.
        const cutOffDate = ClinicalMeasuresAdultWeightChartModel.determine18thBirthdayDate(patientDateOfBirth);
        this.weightDataPoints = ClinicalMeasuresAdultWeightChartModel.generateWeightDataPoints(cutOffDate,
            observations);
        this.mostRecentHeight = ClinicalMeasuresAdultWeightChartModel.determineMostRecentHeight(observations);
    }

    // BMI 18.5 line
    public get bmi18AndAHalfWeight(): number
    {
        return this.calculateWeightForBMIAndHeight(18.5);
    }

    public get bmi20Weight(): number
    {
        return this.calculateWeightForBMIAndHeight(20);
    }

    public get bmi25Weight(): number
    {
        return this.calculateWeightForBMIAndHeight(25);
    }

    public get values()
    {
        return this.weightDataPoints;
    }

    private calculateWeightForBMIAndHeight(BMI: number): number
    {
        // weight (rounded to the nearest 2 decimal place) = BMI * (height / 100)^2
        // Formula was made by making weight the subject from the BMI formula in smartRM.
        // https://rm.smarthealth.com.au/smartrm/#!/PV8/FR3357
        return Math.round((BMI * Math.pow((this.mostRecentHeight / 100), 2)) * 100) / 100;
    }
}

export default ClinicalMeasuresAdultWeightChartModel;
