import {autobind} from 'core-decorators';
import DateTime from 'main/component/DateTime';
import FormFieldWidthVisitor from 'main/field/FormFieldWidthVisitor';
import DateUtility from 'main/utility/DateUtility';
import FieldContextUtility from 'main/utility/FieldContextUtility';
import FormDescriptionUtility from 'main/utility/FormDescriptionUtility';
import ShouldNeverGetHereError from 'main/utility/ShouldNeverGetHereError';
import {inject} from 'mobx-react';
import {Calendar} from 'primereact/calendar';
import React from 'react';
import EventDateTime from 'smarthealth-javascript/EventDateTime';
import FormFieldDateTime from 'smarthealth-javascript/FormFieldDateTime';
import Precision from 'smarthealth-javascript/Precision';
import BaseFieldOld from './BaseFieldOld';

/**
 * Date/Time form field
 *
 * <p>
 *     If this has the focus then we expect value to be a Date or string
 *     else if the value is valid then we expect value to also be Date or string, ready to invoke onBlur
 *     else return the string
 *
 *     If value is a Date invoke onFieldChange with an EventDateTime
 *     else if value is a string invoke onFieldChange with a string
 * </p>
 *
 * TODO PrimeReact Calendar datepicker button has position: absolute. This is causing other elements to hide underneath
 * this datepicker button. When position: relative; the button height isn't what we expected.
 *
 * TODO Prime React Calendar component has updated its internal workings in v4.0.0. In that the onChange of Calender
 * will not give a Date and string values. Instead the updated onChange in Calendar component will only give null or
 * Date values.
 *
 * @author Larry 16/01/2019
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2019
 */
@inject('appStore')
class DateTimeFieldOld extends BaseFieldOld<FormFieldDateTime, EventDateTime>
{
    private determineDateFormat(): string
    {
        /*
         * TODO do we need a DateTimeFieldOld of Precision.Day and Precision.Minute
         * Problem with when using Precision.Day and Precision.Minute
         * PrimeReact Calendar dateFormat property can interprets dateFormat “dd/mm/yy” as
         * dd/mm/yy or if it’s a Precision.Minute dd/mm/yy HH:mm.
         * Even though we specified dd/mm/yy it suddenly gives us dd/mm/yy HH:mm if the PrimeReact Calendar showTime
         * property is set to true (Precision.Minute).
         */
        const { appStore, value } = this.props;
        let currentPrecision: Precision = null;
        if (typeof value === 'string')
        {
            currentPrecision = DateUtility.determineDateTimeStringPrecision(value, appStore.i18nStore.locale);
        }
        else if (DateUtility.isEventDateTime(value))
        {
            currentPrecision = DateUtility.determineEventDateTimePrecision(value);
        }

        if (currentPrecision)
        {
            return this.props.appStore.i18nStore.getPrimeReactDateFormat(currentPrecision);
        }
        else
        {
            return this.props.appStore.i18nStore.getPrimeReactDateFormat(
                FormDescriptionUtility.determineHighestPrecision(this.props.field));
        }
    }

    @autobind
    private getViewType(): string | undefined
    {
        const { field } = this.props;
        if (field.precisionDay && !field.precisionMonth && !field.precisionYear)
        {
            return 'date';
        }
        else if (!field.precisionDay && field.precisionMonth && !field.precisionYear)
        {
            return 'month';
        }
        return undefined;
    }

    @autobind
    private onBlur(e)
    {
        const { value } = e.target;
        // TODO implement into Story 7766 -  before converting value into an EventDateTime, check if the field can
        // convert that string value precision. e.g. string value 2000 with field precision=Day, cannot convert because
        // string value precision is Year and field precision is Day.
        const newValue = this.props.appStore.i18nStore.toEventDateTimeOrString(value);
        if (value !== newValue)
        {
            this.props.onFieldChange(newValue, this.props.field);
        }
    }

    @autobind
    protected onChange(e)
    {
        // If user clicks on a calendar date we get a Date and the field never gets focus
        // If user types something we get their input as a string
        const value: Date | string = e.target.value;
        if (value instanceof Date)
        {
            const newValue: EventDateTime | string = DateUtility.dateToEventDateTime(value,
                FormDescriptionUtility.determineHighestPrecision(this.props.field));
            this.props.onFieldChange(newValue, this.props.field);
        }
        else
        {
            this.props.onFieldChange(value, this.props.field);
        }
    }

    protected renderEditing()
    {
        const { field } = this.props;
        // TODO Larry determine yearRange
        const yearRange = '1900:2070';
        const dateFormat = this.determineDateFormat();
        /*
         * if we have an EventDateTime editableValue should be a Date or datepicker like Hour and Minute stepper
         * wont work
         */
        const editableValue = this.toEditableValue(this.props.value);

        const isShowIcon = field.precisionMinute || field.precisionDay || field.precisionMonth ? true : false;
        return (
            <Calendar appendTo={document.body} className={this.classNames()} dateFormat={dateFormat}
                disabled={FieldContextUtility.isReadOnly(this.props.context)}
                inputStyle={{
                    width: `calc(100% - ${FormFieldWidthVisitor.DATETIME_ICON_BUTTON_WIDTH_EM}em)`
                }} monthNavigator={true} onChange={this.onChange} onBlur={this.onBlur} showIcon={isShowIcon}
                showOnFocus={false} showTime={field.precisionMinute} style={this.fieldWidthStyles()}
                /*
                * TODO rework Calendar as we are passing a string to value.
                * It should not be receiving a value of type string.
                * PrimeReact Calendar property value is of type Date | Date[].
                *
                * NOTE: PrimeReact Calendar can accept value as strings but not on initial render. It will also
                * convert string into Date object if string is parsable.
                * e.g. user types in strings as values
                */
                // @ts-ignore
                value={editableValue} view={this.getViewType()} yearNavigator={true} yearRange={yearRange} />
        );
    }

    protected renderValue()
    {
        const value: EventDateTime | string = this.props.value;
        if (!value)
        {
            return null;
        }
        else if (typeof value === 'string')
        {
            return value;
        }
        else if (DateUtility.isEventDateTime(value))
        {
            return <DateTime date={value} />;
        }
        else
        {
            throw new ShouldNeverGetHereError();
        }
    }

    private toEditableValue(value: string | EventDateTime | Date): string | Date
    {
        if (!value)
        {
            return null;
        }
        else if (typeof value === 'string')
        {
            return value;
        }
        else if (value instanceof Date)
        {
            return value;
        }
        else if (DateUtility.isEventDateTime(value))
        {
            return DateUtility.eventDateTimeToDate(value);
        }
        else
        {
            throw new ShouldNeverGetHereError();
        }
    }
}

export default DateTimeFieldOld;
