import lodash from 'lodash';
import Locales from 'main/utility/Locales';
import ShouldNeverGetHereError from 'main/utility/ShouldNeverGetHereError';
import StringUtility from 'main/utility/StringUtility';
import moment, {Moment} from 'moment-timezone';
import EventDateTime from 'smarthealth-javascript/EventDateTime';
import Precision from 'smarthealth-javascript/Precision';

/**
 * Utility for Date including locale dependent methods.
 *
 * See StickyObjectFormatter.java for allowable date formats
 *
 * @author Thompson 24/04/2019
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2019
 */
class DateUtility
{
    private static ISO_DAY: string = 'YYYY-MM-DD';

    private static ISO_MINUTE: string = 'YYYY-MM-DDTHH:mmZ';

    private static ISO_MONTH: string = 'YYYY-MM';

    private static ISO_YEAR: string = 'YYYY';

    private static readonly MOMENT_OUTPUT_FORMATS = {
        [Locales.AUSTRALIA]: {
            Time: 'HH:mm',
            [Precision.Minute]: 'DD/MM/YYYY HH:mm',
            [Precision.Day]: 'DD/MM/YYYY',
            [Precision.Month]: 'MM/YYYY',
            [Precision.Year]: 'YYYY'
        }
    };

    private static readonly MOMENT_PARSE_FORMATS = {
        [Locales.AUSTRALIA]: {
            Time: ['HH:mm', 'H:mm', 'HH.mm', 'H.mm', 'HHmm', 'Hmm'],
            // TODO Thompson - remove Minute
            [Precision.Minute]: ['DD/MM/YYYY HH:mm', 'DD/MM/YYYY H:mm', 'DD/MM/YYYY HH.mm', 'DD/MM/YYYY H.mm',
                'DD/MM/YYYY HHmm', 'DD/MM/YYYY Hmm', 'D/M/YYYY HH:mm', 'D/M/YYYY H:mm', 'D/M/YYYY HH.mm',
                'D/M/YYYY H.mm', 'D/M/YYYY HHmm', 'D/M/YYYY Hmm', 'DD.MM.YYYY HH:mm', 'DD.MM.YYYY H:mm',
                'DD.MM.YYYY HH.mm', 'DD.MM.YYYY H.mm', 'DD.MM.YYYY HHmm', 'DD.MM.YYYY Hmm', 'D.M.YYYY HH:mm',
                'D.M.YYYY H:mm', 'D.M.YYYY HH.mm', 'D.M.YYYY H.mm', 'D.M.YYYY HHmm', 'D.M.YYYY Hmm', 'DDMMYYYY HH:mm',
                'DDMMYYYY H:mm', 'DDMMYYYY HH.mm', 'DDMMYYYY H.mm', 'DDMMYYYY HHmm', 'DDMMYYYY Hmm'],
            [Precision.Day]: DateUtility.buildAustralianDayFormats(),
            [Precision.Month]: DateUtility.buildAustralianMonthFormats(),
            [Precision.Year]: ['YYYY']
        }
    };

    public static addDays(date: EventDateTime, dayAmount: number): EventDateTime
    {
        if (!DateUtility.isPrecisionEqualOrHigher(Precision.Day, date))
        {
            throw new Error('Value EventDateTime Precision is expected to be Precision.Day or higher.');
        }

        const originalDatePrecision: Precision = DateUtility.determineEventDateTimePrecision(date);
        return DateUtility.momentToEventDateTime(moment(date.iso)
            .add(dayAmount, 'day'), originalDatePrecision);
    }

    public static addMonths(date: EventDateTime, monthsAmount: number): EventDateTime
    {
        if (!DateUtility.isPrecisionEqualOrHigher(Precision.Month, date))
        {
            throw new Error('Value EventDateTime Precision is expected to be Precision.Month or higher.');
        }

        const originalDatePrecision: Precision = DateUtility.determineEventDateTimePrecision(date);
        return DateUtility.momentToEventDateTime(moment(date.iso)
            .add(monthsAmount, 'month'), originalDatePrecision);
    }

    public static addYears(date: EventDateTime, yearAmount: number): EventDateTime
    {
        const originalDatePrecision: Precision = DateUtility.determineEventDateTimePrecision(date);
        return DateUtility.momentToEventDateTime(moment(date.iso)
            .add(yearAmount, 'year'), originalDatePrecision);
    }

    public static buildAustralianDayFormats(): string[]
    {
        const formats = [];
        ['/', '-', '.', ' ', ''].forEach(separator =>
            ['YYYY', 'YY'].forEach(year =>
                ['M', 'MM', 'MMM'].forEach(month =>
                    ['D', 'DD'].forEach(date =>
                        formats.push(`${date}${separator}${month}${separator}${year}`)
                    )
                )
            )
        );
        ['-', ''].forEach(separator =>
            formats.push(`YYYY${separator}MM${separator}DD`)
        );
        return formats;
    }

    public static buildAustralianMonthFormats(): string[]
    {
        const formats = [];
        ['/', '-', '.', ' ', ''].forEach(separator =>
            ['YYYY', 'YY'].forEach(year =>
                ['M', 'MM', 'MMM'].forEach(month =>
                    formats.push(`${month}${separator}${year}`)
                )
            )
        );
        ['-', ''].forEach(separator =>
            formats.push(`YYYY${separator}MM`)
        );
        return formats;
    }

    public static compareAscending(date1: EventDateTime, date2: EventDateTime): -1 | 0 | 1
    {
        if (date1.iso < date2.iso)
        {
            return -1;
        }
        else if (date1.iso > date2.iso)
        {
            return 1;
        }
        else
        {
            return 0;
        }
    }

    public static compareDescending(date1: EventDateTime, date2: EventDateTime): -1 | 0 | 1
    {
        return DateUtility.compareAscending(date2, date1);
    }

    public static createEventDateTime(year: number, month?: number, date?: number): EventDateTime
    {
        if (!lodash.isNil(date))
        {
            const dayPrecision: EventDateTime = {
                iso: `${year}-${DateUtility.formatNumberWithPrependedZeros(month,
                    2)}-${DateUtility.formatNumberWithPrependedZeros(date, 2)}`
            };
            DateUtility.validateEventDateTime(dayPrecision);
            return dayPrecision;
        }
        else if (!lodash.isNil(month))
        {
            const monthPrecision: EventDateTime = {
                iso: `${year}-${DateUtility.formatNumberWithPrependedZeros(month, 2)}`
            };
            DateUtility.validateEventDateTime(monthPrecision);
            return monthPrecision;
        }
        else
        {
            const yearPrecision: EventDateTime = { iso: `${year}` };
            DateUtility.validateEventDateTime(yearPrecision);
            return yearPrecision;
        }
    }

    public static dateToEventDateTime(date: Date, precision: Precision): EventDateTime
    {
        if (!date)
        {
            return null;
        }

        // using moment so that timezone is retained
        const iso = moment(date)
            .format()
            .substr(0, 16);
        return DateUtility.reducePrecision({ iso }, precision);
    }

    public static determineDateTimeStringPrecision(value: string, locale: string): Precision
    {
        if (DateUtility.isValidMinuteString(value, locale))
        {
            return Precision.Minute;
        }
        else if (DateUtility.isValidDayString(value, locale))
        {
            return Precision.Day;
        }
        else if (DateUtility.isValidMonthString(value, locale))
        {
            return Precision.Month;
        }
        else if (DateUtility.isValidYearString(value, locale))
        {
            return Precision.Year;
        }
        else
        {
            return null;
        }
    }

    public static determineDifferenceInDays(fromDate: EventDateTime, toDate: EventDateTime)
    {
        if (!DateUtility.isPrecisionEqualOrHigher(Precision.Day, fromDate)
            || !DateUtility.isPrecisionEqualOrHigher(Precision.Day, toDate))
        {
            throw new Error('fromDate and toDate Precision must be Precision.Day or higher.');
        }

        const fromDay: EventDateTime = DateUtility.reducePrecision(fromDate, Precision.Day);
        const toDay: EventDateTime = DateUtility.reducePrecision(toDate, Precision.Day);
        const from: Moment = moment(fromDay.iso);
        const to: Moment = moment(toDay.iso);
        return to.diff(from, 'days');
    }

    public static determineDifferenceInHours(fromDate: EventDateTime, toDate: EventDateTime): number
    {
        if (!DateUtility.isPrecisionEqualOrHigher(Precision.Minute, fromDate)
            || !DateUtility.isPrecisionEqualOrHigher(Precision.Minute, toDate))
        {
            throw new Error('fromDate and toDate Precision must be Precision.Minute');
        }

        const from: Moment = moment(fromDate.iso);
        const to: Moment = moment(toDate.iso);
        return to.diff(from, 'hours');
    }

    public static determineDifferenceInMonths(fromDate: EventDateTime, toDate: EventDateTime): number
    {
        if (!DateUtility.isPrecisionEqualOrHigher(Precision.Day, fromDate)
            || !DateUtility.isPrecisionEqualOrHigher(Precision.Day, toDate))
        {
            throw new Error('fromDate and toDate Precision must be Precision.Day or higher.');
        }

        const fromDay: EventDateTime = DateUtility.reducePrecision(fromDate, Precision.Day);
        const toDay: EventDateTime = DateUtility.reducePrecision(toDate, Precision.Day);
        const from = moment(fromDay.iso);
        const to = moment(toDay.iso);
        return to.diff(from, 'months');
    }

    public static determineDifferenceInYears(fromDate: EventDateTime, toDate: EventDateTime): number
    {
        if (!DateUtility.isPrecisionEqualOrHigher(Precision.Day, fromDate)
            || !DateUtility.isPrecisionEqualOrHigher(Precision.Day, toDate))
        {
            throw new Error('fromDate and toDate Precision must be Precision.Day or higher.');
        }

        const fromDay: EventDateTime = DateUtility.reducePrecision(fromDate, Precision.Day);
        const toDay: EventDateTime = DateUtility.reducePrecision(toDate, Precision.Day);
        const from: Moment = moment(fromDay.iso);
        const to: Moment = moment(toDay.iso);
        return to.diff(from, 'years');
    }

    public static determineEventDateTimePrecision(value: EventDateTime): Precision
    {
        if (value.iso.length === 4)
        {
            return Precision.Year;
        }
        else if (value.iso.length === 7)
        {
            return Precision.Month;
        }
        else if (value.iso.length === 10)
        {
            return Precision.Day;
        }
        else if (value.iso.length >= 15)
        {
            return Precision.Minute;
        }
        else
        {
            throw new ShouldNeverGetHereError();
        }
    }

    /*
     * JavaScript's Date object tracks time in UTC internally. It doesn't have any facilities for working with time in
     * other time zones.
     * https://stackoverflow.com/questions/15141762/how-to-initialize-a-javascript-date-to-a-particular-time-zone
     */
    public static eventDateTimeToDate(eventDateTime: EventDateTime): Date
    {
        // TODO what happens when you have a -1 UTC how do you split without splitting the - in date
        const [dateString, timezone]: string[] = eventDateTime.iso.split('+');
        const utcDate: Date = new Date(dateString);
        if (timezone)
        {
            utcDate.setUTCHours(parseFloat(timezone));
        }
        return utcDate;
    }

    public static eventDateTimeToUnixEpochMilliSeconds(value: EventDateTime): number
    {
        return moment(value.iso)
            .valueOf();
    }

    public static extractTime(value: EventDateTime, locale: string): string | null
    {
        if (!value || !DateUtility.isPrecisionEqualOrHigher(Precision.Minute, value))
        {
            return null;
        }

        return moment(value.iso)
            .format(this.MOMENT_OUTPUT_FORMATS[locale].Time);
    }

    public static extractYear(value: EventDateTime, locale: string): string | null
    {
        if (!value)
        {
            return null;
        }

        return moment(value.iso)
            .format(this.MOMENT_OUTPUT_FORMATS[locale][Precision.Year]);
    }

    public static formatEventDateTime(value: EventDateTime, locale: string)
    {
        const precision = DateUtility.determineEventDateTimePrecision(value);
        if (!DateUtility.MOMENT_OUTPUT_FORMATS[locale])
        {
            // TODO handle this better
            // throw new Error(`No formats for ${locale}`);
            return `No formats for ${locale}`;
        }
        const format = DateUtility.MOMENT_OUTPUT_FORMATS[locale][precision];
        if (!format)
        {
            throw new Error(`No format for ${locale} and ${precision}`);
        }

        // moment.ISO_8601 doesn't include format YYYY
        return moment(value.iso, ['YYYY', moment.ISO_8601], true)
            .format(format);
    }

    private static formatNumberWithPrependedZeros(value: number, totalDigits: number): string
    {
        const digits = value.toString()
            .split('');
        const amountZerosToPrepend = totalDigits - digits.length;
        if (amountZerosToPrepend < 0)
        {
            throw new Error('Can\'t format number with prepended zeros.');
        }

        digits.unshift(...Array(amountZerosToPrepend)
            .fill('0'));
        return digits.join('');
    }

    private static getDateFormat(locale: string, qualifier: string): string
    {
        if (!DateUtility.MOMENT_OUTPUT_FORMATS[locale])
        {
            throw new Error(`No output date formats for ${locale}`);
        }
        const format: string = DateUtility.MOMENT_OUTPUT_FORMATS[locale][qualifier];
        if (!format)
        {
            throw new Error(`No output date format for ${locale} and ${qualifier}`);
        }
        return format;
    }

    private static getParseFormats(locale: string, qualifier: string): string[]
    {
        if (!DateUtility.MOMENT_PARSE_FORMATS[locale])
        {
            throw new Error(`No parse formats for ${locale}`);
        }
        const formats: string[] = DateUtility.MOMENT_PARSE_FORMATS[locale][qualifier];
        if (!formats)
        {
            throw new Error(`No parse format for ${locale} and ${qualifier}`);
        }
        return formats;
    }

    public static isAfterDay(date1: EventDateTime, date2: EventDateTime): boolean
    {
        if (!DateUtility.isPrecisionEqualOrHigher(Precision.Day, date1))
        {
            throw new Error(`date1 must be at least Precision.Day: ${date1.iso}`);
        }
        if (!DateUtility.isPrecisionEqualOrHigher(Precision.Day, date2))
        {
            throw new Error(`date2 must be at least Precision.Day: ${date2.iso}`);
        }

        const endDateDay = DateUtility.reducePrecision(date1, Precision.Day);
        const startDateDay = DateUtility.reducePrecision(date2, Precision.Day);
        if (endDateDay.iso > startDateDay.iso)
        {
            return true;
        }
        else
        {
            return false;
        }
    }

    public static isBeforeDay(date1: EventDateTime, date2: EventDateTime): boolean
    {
        return DateUtility.isAfterDay(date2, date1);
    }

    public static isEventDateTime(value: any): value is EventDateTime
    {
        return !!(value && value.iso);
    }

    public static isPrecisionEqualOrHigher(minimumPrecision: Precision, value: EventDateTime): boolean
    {
        if (!value)
        {
            return false;
        }

        const valuePrecision: Precision = DateUtility.determineEventDateTimePrecision(value);
        switch (minimumPrecision)
        {
        case Precision.Minute:
            return valuePrecision === Precision.Minute;
        case Precision.Day:
            return valuePrecision === Precision.Day || valuePrecision === Precision.Minute;
        case Precision.Month:
            return (
                valuePrecision === Precision.Month
                || valuePrecision === Precision.Day
                || valuePrecision === Precision.Minute
            );
        case Precision.Year:
            return (
                valuePrecision === Precision.Month
                || valuePrecision === Precision.Day
                || valuePrecision === Precision.Minute
                || valuePrecision === Precision.Year
            );
        default:
            throw new ShouldNeverGetHereError();
        }
    }

    public static isSameDay(date1: EventDateTime, date2: EventDateTime): boolean
    {
        if (!DateUtility.isPrecisionEqualOrHigher(Precision.Day, date1)
            || !DateUtility.isPrecisionEqualOrHigher(Precision.Day, date2))
        {
            throw new Error('date1 or date2 does not have a minimum Precision of Precision.Day.');
        }

        const day1 = DateUtility.reducePrecision(date1, Precision.Day);
        const day2 = DateUtility.reducePrecision(date2, Precision.Day);
        if (day1.iso === day2.iso)
        {
            return true;
        }
        else
        {
            return false;
        }
    }

    public static isValid24HourTime(time: string): boolean
    {
        // Test for 4 digits 24 hour time format with a ":".
        return new RegExp('^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$').test(time);
    }

    public static isValidDateTimeString(value: string, locale: string, precision?: Precision): boolean
    {
        if (!precision)
        {
            return DateUtility.isValidDateTimeString(value, locale, Precision.Year)
                || DateUtility.isValidDateTimeString(value, locale, Precision.Month)
                || DateUtility.isValidDateTimeString(value, locale, Precision.Day)
                || DateUtility.isValidDateTimeString(value, locale, Precision.Minute);
        }
        else if (precision === Precision.Year)
        {
            return DateUtility.isValidYearString(value, locale);
        }
        else if (precision === Precision.Month)
        {
            return DateUtility.isValidMonthString(value, locale);
        }
        else if (precision === Precision.Day)
        {
            return DateUtility.isValidDayString(value, locale);
        }
        else if (precision === Precision.Minute)
        {
            return DateUtility.isValidMinuteString(value, locale);
        }
    }

    private static isValidDayString(value: string, locale: string): boolean
    {
        return DateUtility.isValidFormattedString(value, locale, Precision.Day);
    }

    public static isValidEventDateTimeISO(iso: string): boolean
    {
        if (moment(iso, DateUtility.ISO_YEAR, true)
            .isValid())
        {
            return true;
        }
        else if (moment(iso, DateUtility.ISO_MONTH, true)
            .isValid())
        {
            return true;
        }
        if (moment(iso, DateUtility.ISO_DAY, true)
            .isValid())
        {
            return true;
        }
        else if (moment(iso, DateUtility.ISO_MINUTE, true)
            .isValid())
        {
            return true;
        }
        else
        {
            return false;
        }
    }

    private static isValidFormattedString(string: string, locale: string, qualifier: string): boolean
    {
        const formats = DateUtility.getParseFormats(locale, qualifier);
        return moment(string, formats, true)
            .isValid();
    }

    private static isValidMinuteString(value: string, locale: string): boolean
    {
        const split: string[] = lodash.split(value, ' ', 2);
        if (split.length !== 2)
        {
            return false;
        }
        return DateUtility.isValidDayString(split[0], locale) && DateUtility.isValidTimeString(split[1], locale);
    }

    private static isValidMonthString(value: string, locale: string): boolean
    {
        return DateUtility.isValidFormattedString(value, locale, Precision.Month);
    }

    public static isValidTimeString(value: string, locale: string): boolean
    {
        return DateUtility.isValidFormattedString(value, locale, 'Time');
    }

    private static isValidYearString(value: string, locale: string): boolean
    {
        return DateUtility.isValidFormattedString(value, locale, Precision.Year);
    }

    // TODO Larry - get timezone from MedicalGroup on server
    public static joinTimeToDay(day: EventDateTime, time: string, timezone?: string): EventDateTime | null
    {
        if (!DateUtility.isPrecisionEqualOrHigher(Precision.Day, day) || !DateUtility.isValid24HourTime(time))
        {
            return null;
        }

        const [hours, minutes] = time.split(':');
        const dateTime = moment
            .tz(day.iso, timezone || 'Australia/Sydney')
            .set('hour', parseInt(hours, 10))
            .set('minute', parseInt(minutes, 10));
        return DateUtility.momentToEventDateTime(dateTime, Precision.Minute);
    }

    private static momentToEventDateTime(date: Moment, precision: Precision): EventDateTime
    {
        const iso = moment(date)
            // We don't use moment().toISOString because it returns a timestamp in UTC, even if the moment value
            // is in local time. Therefore, moment().format() is how we display date in local time.
            // https://stackoverflow.com/a/40855188/4728289
            .format(DateUtility.ISO_MINUTE);
        const isoShorten = StringUtility.removeEnd(iso, ':00');
        const eventDateTime: EventDateTime = {
            iso: isoShorten
        };

        return DateUtility.reducePrecision(eventDateTime, precision);
    }

    public static reducePrecision(value: EventDateTime, highestPrecision: Precision): EventDateTime
    {
        if (highestPrecision === Precision.Year)
        {
            return { iso: value.iso.substr(0, 4) };
        }
        else if (highestPrecision === Precision.Month)
        {
            return { iso: value.iso.substr(0, 7) };
        }
        else if (highestPrecision === Precision.Day)
        {
            return { iso: value.iso.substr(0, 10) };
        }
        else
        {
            return value;
        }
    }

    public static reformatTimeString(value: string, locale: string)
    {
        const formats = DateUtility.getParseFormats(locale, 'Time');
        return moment(value, formats, true)
            .format(DateUtility.getDateFormat(locale, 'Time'));
    }

    public static toDate(date: any): Date
    {
        if (!date)
        {
            return null;
        }
        else if (date instanceof Date)
        {
            return date;
        }
        else if (typeof date === 'string')
        {
            return new Date(date);
        }
        else
        {
            return new Date(`${date.year}-${date.month}-${date.day}`);
        }
    }

    /**
     * If the value is a string and is a valid date/time for the current locale then it is converted to an
     * EventDateTime. If it is not a valid date string then it is returned as a string.
     */
    public static toEventDateTimeOrString(value: EventDateTime | string, locale: string): EventDateTime | string
    {
        if (!value)
        {
            return null;
        }

        if (DateUtility.isEventDateTime(value))
        {
            return value;
        }

        if (typeof value !== 'string')
        {
            throw new Error('Unknown date/time type');
        }

        return DateUtility.toEventDateTimeOrStringFromString(value, locale);
    }

    private static toEventDateTimeOrStringFromString(value: string, locale: string): EventDateTime | string
    {
        if (DateUtility.isValidMinuteString(value, locale))
        {
            return DateUtility.momentToEventDateTime(
                moment(value, this.getParseFormats(locale, Precision.Minute), true), Precision.Minute);
        }

        if (DateUtility.isValidDayString(value, locale))
        {
            return DateUtility.momentToEventDateTime(
                moment(value, this.getParseFormats(locale, Precision.Day), true), Precision.Day);
        }

        if (DateUtility.isValidMonthString(value, locale))
        {
            return DateUtility.momentToEventDateTime(
                moment(value, this.getParseFormats(locale, Precision.Month), true), Precision.Month);
        }

        if (DateUtility.isValidYearString(value, locale))
        {
            return DateUtility.momentToEventDateTime(
                moment(value, this.getParseFormats(locale, Precision.Year), true), Precision.Year);
        }

        return value;
    }

    public static unixEpochMilliSecondsToEventDateTimeDay(unixEpochMilliSeconds: number): EventDateTime
    {
        return {
            iso: moment(unixEpochMilliSeconds)
                .format(this.ISO_DAY)
        };
    }

    private static validateEventDateTime(eventDateTime: EventDateTime)
    {
        if (!DateUtility.isValidEventDateTimeISO(eventDateTime.iso))
        {
            throw new Error('Invalid parameters passed to createEventDateTime.');
        }
    }
}

export default DateUtility;
