import {autobind} from 'core-decorators';
import lodash from 'lodash';
import BaseField from 'main/field/BaseField';
import DateFieldComponent from 'main/fieldcomponent/DateFieldComponent';
import MonthFieldComponent from 'main/fieldcomponent/MonthFieldComponent';
import TimeFieldComponent from 'main/fieldcomponent/TimeFieldComponent';
import YearFieldComponent from 'main/fieldcomponent/YearFieldComponent';
import DateUtility from 'main/utility/DateUtility';
import ShouldNeverGetHereError from 'main/utility/ShouldNeverGetHereError';
import {computed} from 'mobx';
import {inject, observer} from 'mobx-react';
import React from 'react';
import EventDateTime from 'smarthealth-javascript/EventDateTime';
import FormFieldDateTime from 'smarthealth-javascript/FormFieldDateTime';
import Precision from 'smarthealth-javascript/Precision';

/**
 * Date/Time form field
 *
 * @author Thompson 11/01/2021
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2021
 */
interface EditableDateTime
{
    date: string;
    time?: string;
}

@inject('appStore')
@observer
class DateTimeField extends BaseField<FormFieldDateTime, EventDateTime | EditableDateTime>
{
    private static TIME_MAX_LENGTH: number = 5;

    private static determineFieldHighestPrecision(field: FormFieldDateTime): Precision
    {
        if (field.precisionMinute)
        {
            return Precision.Minute;
        }
        else if (field.precisionDay)
        {
            return Precision.Day;
        }
        else if (field.precisionMonth)
        {
            return Precision.Month;
        }
        else if (field.precisionYear)
        {
            return Precision.Year;
        }
        else
        {
            throw new ShouldNeverGetHereError();
        }
    }

    @computed
    private get highestPrecision(): Precision
    {
        return DateTimeField.determineFieldHighestPrecision(this.field);
    }

    private isEditableDateTimeValid(value: EditableDateTime): boolean
    {
        if (this.field.precisionYear
            && this.props.appStore.i18nStore.isValidDateTimeString(value.date, Precision.Year))
        {
            return true;
        }
        else if (this.field.precisionMonth
            && this.props.appStore.i18nStore.isValidDateTimeString(value.date, Precision.Month))
        {
            return true;
        }
        else if (this.field.precisionDay
            && this.props.appStore.i18nStore.isValidDateTimeString(value.date, Precision.Day))
        {
            return true;
        }
        else if (this.field.precisionMinute)
        {
            if (this.props.appStore.i18nStore.isValidDateTimeString(value.date, Precision.Day)
                && DateUtility.isValid24HourTime(value.time))
            {
                return true;
            }
        }

        return false;
    }

    @autobind
    private onDateValueChange(dateString: string, hasFocus: boolean)
    {
        // TODO Thompson - replace with new EditableDateTime class.
        // determine EditableDateTime
        // update EditableDateTime
        // if hasFocus
        //  onValueChange
        // else
        //  if EditableDateTime is valid for Precision
        //      convert to EventDateTime
        //      onValueChange
        //  else
        //      onValueChange with EditableDateTime

        const isEventDateTimeWithNoTime: boolean = (DateUtility.isEventDateTime(this.props.value)
            && !DateUtility.isPrecisionEqualOrHigher(Precision.Minute, this.props.value));
        const isEditableDateTimeWithNoTime = this.props.value
            && (!DateUtility.isEventDateTime(this.props.value) && lodash.isNil(this.props.value.time));
        if (lodash.isNil(this.props.value) || isEventDateTimeWithNoTime || isEditableDateTimeWithNoTime)
        {
            const date: EditableDateTime = { date: dateString };
            this.onValueChange(date);
            if (!hasFocus && this.props.appStore.i18nStore.isValidDateTimeString(date.date, Precision.Day))
            {
                this.updateFieldValue(date);
            }
            return;
        }

        if (DateUtility.isEventDateTime(this.props.value)
            && DateUtility.isPrecisionEqualOrHigher(Precision.Minute, this.props.value))
        {
            const time: string = DateUtility.extractTime(this.props.value, this.props.appStore.i18nStore.locale);
            const dateTime: EditableDateTime = { time, date: dateString };
            this.onValueChange(dateTime);
            if (!hasFocus && this.isEditableDateTimeValid(dateTime))
            {
                this.updateFieldValue(dateTime);
            }
            return;
        }

        if (DateUtility.isEventDateTime(this.props.value))
        {
            throw new ShouldNeverGetHereError();
        }
        const value: EditableDateTime = this.props.value;
        if (value.time)
        {
            const dateTime: EditableDateTime = { date: dateString, time: value.time };
            this.onValueChange(dateTime);
            if (!hasFocus && this.isEditableDateTimeValid(dateTime))
            {
                this.updateFieldValue(dateTime);
            }
            return;
        }
        else
        {
            throw new ShouldNeverGetHereError();
        }
    }

    @autobind
    private onTimeValueChange(timeString: string)
    {
        // TODO Thompson - set time value
    }

    public renderEditing(): React.ReactNode
    {
        const date: string = DateUtility.isEventDateTime(this.props.value)
            ? this.props.appStore.i18nStore.formatEventDateTime(this.props.value)
            : this.props.value
                ? this.props.value.date
                : null;
        const time: string = DateUtility.isEventDateTime(this.props.value)
            ? this.props.appStore.i18nStore.extractTime(this.props.value)
            : this.props.value
                ? this.props.value.time
                : null;
        if (this.highestPrecision === Precision.Year)
        {
            return <YearFieldComponent context={this.props.context} onValueChange={this.onDateValueChange}
                value={date} />;
        }
        else if (this.highestPrecision === Precision.Month)
        {
            // TODO Thompson - when user select a date with overlay, convert string value to EventDateTime after
            return <MonthFieldComponent context={this.props.context} onValueChange={this.onDateValueChange} value={date}
                yearAllowed={this.field.precisionYear} />;
        }
        else if (this.highestPrecision === Precision.Day)
        {
            // TODO Thompson - when user select a date with overlay, convert string value to EventDateTime after
            return <DateFieldComponent context={this.props.context} monthAllowed={this.field.precisionMonth}
                onValueChange={this.onDateValueChange} value={date} yearAllowed={this.field.precisionYear} />;
        }
        else if (this.highestPrecision === Precision.Minute)
        {
            return (
                <>
                    <DateFieldComponent context={this.props.context} monthAllowed={this.field.precisionMonth}
                        onValueChange={this.onDateValueChange} value={date} yearAllowed={this.field.precisionYear} />
                    <TimeFieldComponent characterFilter="0-9:." context={this.props.context}
                        format={this.props.appStore.i18nStore.reformatTimeString}
                        maxLength={DateTimeField.TIME_MAX_LENGTH} onValueChange={this.onTimeValueChange}
                        // TODO Thompson - review - validation string copied from FieldValidator
                        placeholder="hh:mm" validation="^(0[0-9]|1[0-9]|2[0-3]|[0-9])[:.]?[0-5][0-9]$"
                        value={time} />
                </>
            );
        }
        else
        {
            throw new ShouldNeverGetHereError();
        }
    }

    protected renderObject(value: EventDateTime | EditableDateTime): React.ReactNode
    {
        if (DateUtility.isEventDateTime(value))
        {
            return this.props.appStore.i18nStore.formatEventDateTime(value);
        }
        else
        {
            return null;
        }
    }

    private updateFieldValue(value: EditableDateTime)
    {
        const date: EventDateTime | string = this.props.appStore.i18nStore.toEventDateTimeOrString(value.date);
        if (typeof date === 'string')
        {
            throw new ShouldNeverGetHereError();
        }

        if (this.field.precisionMinute && DateUtility.isValid24HourTime(value.time))
        {
            const dateTime: EventDateTime = DateUtility.joinTimeToDay(date, value.time);
            this.onValueChange(dateTime);
            return;
        }
        else
        {
            this.onValueChange(date);
        }
    }
}

export default DateTimeField;
