import lodash from 'lodash';
import {SelectionListOption} from 'main/component/SelectionList';
import DateUtility from 'main/utility/DateUtility';
import moment from 'moment';
import EventDateTime from 'smarthealth-javascript/EventDateTime';
import Precision from 'smarthealth-javascript/Precision';

/**
 * Utility for operating the calendars in the DateTimeField and associated components.
 *
 * @author Thompson 15/01/2021
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2021
 */
class CalendarUtility
{
    private static readonly DAYS_IN_WEEK: number = 7;

    public static MONTH_OPTIONS: SelectionListOption<number>[] = moment.months()
        .map((month, monthIndex) => ({ label: month, value: monthIndex + 1 }));

    public static addMonth(monthsToAdd: number, year: number, month: number): { year: number; month: number; }
    {
        CalendarUtility.validateYearAndMonth(year, month);

        // moment() uses a zero based month
        const currentMonth = moment()
            .month(month - 1)
            .year(year)
            .add(monthsToAdd, 'month');
        return { year: currentMonth.year(), month: currentMonth.month() + 1 };
    }

    public static convertToMonth(monthNumber: number): string
    {
        const month = CalendarUtility.MONTH_OPTIONS
            .find((monthSelectionOption) => (monthSelectionOption.value === monthNumber));
        return month && month.label;
    }

    public static createDatesForMonth(year: number, month: number): number[]
    {
        return [...Array(CalendarUtility.daysInMonth(year, month))].map(
            (dateElement, dateElementIndex) => dateElementIndex + 1);
    }

    public static daysInMonth(year: number, month: number): number
    {
        CalendarUtility.validateYearAndMonth(year, month);

        return moment()
            .year(year)
            .month(month - 1)
            .daysInMonth();
    }

    public static determineCalendarDatesInPostMonth(year: number, month: number): number[]
    {
        const amountDatesInLastRow = ((CalendarUtility.determineDisplayedDaysInPreviousMonth(year, month)
            + CalendarUtility.daysInMonth(year, month)) % CalendarUtility.DAYS_IN_WEEK);
        if (amountDatesInLastRow === 0)
        {
            return [];
        }

        const postMonth = CalendarUtility.addMonth(1, year, month);
        const datesInPostMonth: number[] = CalendarUtility.createDatesForMonth(postMonth.year, postMonth.month);
        const datesInPostMonthToShow: number[] = datesInPostMonth.slice(0,
            CalendarUtility.DAYS_IN_WEEK - amountDatesInLastRow);
        return datesInPostMonthToShow;
    }

    public static determineCalendarDatesInPreviousMonth(year: number, month: number): number[]
    {
        const daysInPreviousMonthToShow: number = CalendarUtility.determineDisplayedDaysInPreviousMonth(year, month);
        if (daysInPreviousMonthToShow === 0)
        {
            return [];
        }

        const previousMonth = CalendarUtility.addMonth(-1, year, month);
        const datesInPreviousMonth: number[] = CalendarUtility.createDatesForMonth(previousMonth.year,
            previousMonth.month);
        const datesInPreviousMonthToShow: number[] = datesInPreviousMonth.slice(-daysInPreviousMonthToShow);
        return datesInPreviousMonthToShow;
    }

    public static determineDisplayedDaysInPreviousMonth(year: number, month: number): number
    {
        const date = new Date();
        date.setFullYear(year, month - 1, 1);
        // The number of displayed dates in the previous month is the same as the number corresponding to the first day
        // of the month
        // date.getDay() returns 0 = Sunday, ..., 6 = Saturday
        return date.getDay();
    }

    public static extractDateFromEventDateTime(value: EventDateTime): number | null
    {
        if (!value || !DateUtility.isPrecisionEqualOrHigher(Precision.Day, value))
        {
            return null;
        }

        return moment(value.iso)
            .date();
    }

    public static extractMonthFromEventDateTime(value: EventDateTime): number | null
    {
        if (!value || !DateUtility.isPrecisionEqualOrHigher(Precision.Month, value))
        {
            return null;
        }

        return moment(value.iso)
            .month() + 1;
    }

    public static extractYearFromEventDateTime(value: EventDateTime): number
    {
        if (!value)
        {
            return null;
        }

        return moment(value.iso)
            .year();
    }

    private static validateYearAndMonth(year: number, month: number)
    {
        if (lodash.isNil(year) || lodash.isNil(month) || (month < 1) || (month > 12))
        {
            throw new Error('Invalid year or month');
        }
    }
}

export default CalendarUtility;
