import {I18n} from '@lingui/core';
import DateUtility from 'main/utility/DateUtility';
import Locales from 'main/utility/Locales';
import {action, observable} from 'mobx';
import EventDateTime from 'smarthealth-javascript/EventDateTime';
import Precision from 'smarthealth-javascript/Precision';

/**
 * Internationalisation settings and methods
 *
 * @author Larry 30/01/2019
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2019
 */
class I18nStore
{
    private static readonly PRIMEREACT_DATE_FORMATS = {
        [Locales.AUSTRALIA]: {
            // TODO Precision.Minute works without hours:minutes format this means there would be confusing between
            // using the day and minute Precision for formatting
            [Precision.Minute]: 'dd/mm/yy',
            [Precision.Day]: 'dd/mm/yy',
            [Precision.Month]: 'mm/yy',
            [Precision.Year]: 'yy'
        }
    };

    @observable
    public i18n: I18n;

    // TODO Larry - initialised for testing - work out how to make this work in Storybook
    public locale: string = Locales.AUSTRALIA;

    public extractTime(value: EventDateTime): string
    {
        return DateUtility.extractTime(value, this.locale);
    }

    public extractYear(value: EventDateTime): string
    {
        return DateUtility.extractYear(value, this.locale);
    }

    public formatEventDateTime(value: EventDateTime): string
    {
        // TODO temporary fix for locale issues
        if (!this.locale)
        {
            this.locale = Locales.AUSTRALIA;
        }
        return DateUtility.formatEventDateTime(value, this.locale);
    }

    public getPrimeReactDateFormat(precision: Precision): string
    {
        // TODO temporary fix for locale issues
        if (!this.locale)
        {
            this.locale = Locales.AUSTRALIA;
        }
        if (!I18nStore.PRIMEREACT_DATE_FORMATS[this.locale])
        {
            throw new Error(`No PrimeReact date formats for ${this.locale}`);
        }
        const format = I18nStore.PRIMEREACT_DATE_FORMATS[this.locale][precision];
        if (!format)
        {
            throw new Error(`Missing Prime React date format: ${this.locale}, ${precision}`);
        }
        return format;
    }

    /**
     * @param precision if specified then the value must have the specified precision, otherwise it may have any
     *     precision
     */
    public isValidDateTimeString(value: string, precision?: Precision): boolean
    {
        return DateUtility.isValidDateTimeString(value, this.locale, precision);
    }

    public isValidTimeString(value: string): boolean
    {
        return DateUtility.isValidDateTimeString(value, this.locale);
    }

    public reformatTimeString(value: string): string
    {
        return DateUtility.reformatTimeString(value, this.locale);
    }

    @action
    public setI18n(i18n: I18n, locale: string)
    {
        this.i18n = i18n;
        this.locale = locale;
    }

    /**
     * If the value is a string and is a valid date/time for the current locale then it is converted to an
     * EventDateTime. If it is not a valid date string then it is returned as a string.
     */
    public toEventDateTimeOrString(value: EventDateTime | string): EventDateTime | string
    {
        return DateUtility.toEventDateTimeOrString(value, this.locale);
    }
}

export default I18nStore;
