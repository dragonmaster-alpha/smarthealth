import DateUtility from 'main/utility/DateUtility';
import NumberUtility from 'main/utility/NumberUtility';
import EventDateTime from 'smarthealth-javascript/EventDateTime';
import FieldCalculationType from 'smarthealth-javascript/FieldCalculationType';
import Precision from 'smarthealth-javascript/Precision';

/**
 * Contains the standard form calculation calculators to be used for form calculation
 *
 * @author Thompson 15/04/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */

export type Calculator = (values: any[]) => any | Promise<any>;

export function calculatorFactory(type: FieldCalculationType): Calculator
{
    switch (type)
    {
    case FieldCalculationType.BMI:
        return calculateBMI;
    case FieldCalculationType.DIFFERENCE_IN_HOURS:
        return calculateDifferenceInHours;
    case FieldCalculationType.DIFFERENCE_IN_DAYS:
        return calculateDifferenceInDays;
    case FieldCalculationType.DIFFERENCE_IN_MONTHS:
        return calculateDifferenceInMonths;
    default:
        throw new Error(`Calculator not implemented: ${type}`);
    }
}

export function calculateBMI([height, weight]: any[]): number
{
    if (typeof height !== 'number' || typeof weight !== 'number')
    {
        return null;
    }

    // BMI = weight / (height / 100)^2
    // https://rm.smarthealth.com.au/smartrm/#!/PV8/FR3357
    const bmi: number = (weight / Math.pow(height / 100, 2));
    /*
    * TODO We need to work out where to apply the scale to the BMI.
    * Current implementation doesn't work because the scale is only applied during onBlur()
    *
    * Refer to Web UI Features, Form Tab.
    */
    const bmiToOneDecimalPlace: number = NumberUtility.toFixedLength(bmi, 1);
    return bmiToOneDecimalPlace;
}

export function calculateDifferenceInDays([start, end]: any[]): number
{
    if (!DateUtility.isEventDateTime(start) || !DateUtility.isEventDateTime(end))
    {
        return null;
    }

    validateDatePrecision(Precision.Day, start);
    validateDatePrecision(Precision.Day, end);

    const startDate: Date = DateUtility.eventDateTimeToDate(start);
    const endDate: Date = DateUtility.eventDateTimeToDate(end);

    const differenceInMilliseconds: number = endDate.getTime() - startDate.getTime();
    const differenceInSeconds: number = differenceInMilliseconds / 1000;
    const differenceInMinutes: number = differenceInSeconds / 60;
    const differenceInHours: number = differenceInMinutes / 60;
    // Math.floor to ignore potential time difference in the two date values.
    const differenceInDays: number = Math.floor(differenceInHours / 24);

    return differenceInDays > 0 ? differenceInDays : null;
}

export function calculateDifferenceInHours([start, end]: any[]): number
{
    if (!DateUtility.isEventDateTime(start) || !DateUtility.isEventDateTime(end)
        || !DateUtility.isPrecisionEqualOrHigher(Precision.Minute, start)
        || !DateUtility.isPrecisionEqualOrHigher(Precision.Minute, end))
    {
        return null;
    }

    return DateUtility.determineDifferenceInHours(start, end);
}

export function calculateDifferenceInMonths([start, end]: any[]): number
{
    if (!DateUtility.isEventDateTime(start) || !DateUtility.isEventDateTime(end))
    {
        return null;
    }

    validateDatePrecision(Precision.Month, start);
    validateDatePrecision(Precision.Month, end);

    const startDate: Date = DateUtility.eventDateTimeToDate(start);
    const endDate: Date = DateUtility.eventDateTimeToDate(end);

    const yearDifference = endDate.getFullYear() - startDate.getFullYear();
    const monthDifference = endDate.getMonth() - startDate.getMonth();

    const totalMonthDifference = (yearDifference * 12) + monthDifference;

    return totalMonthDifference > 0 ? totalMonthDifference : null;
}

function validateDatePrecision(minimumPrecision: Precision, value: EventDateTime)
{
    if (!DateUtility.isPrecisionEqualOrHigher(minimumPrecision, value))
    {
        throw new Error(`${value.iso} - precision must be at least ${minimumPrecision}`);
    }
}
