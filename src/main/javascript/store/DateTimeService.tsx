/**
 * The only place to get dates and times from.
 *
 * This must be retrieved from AppStore. Never create an instance of this.
 *
 * @author Larry 11/12/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
import DateUtility from 'main/utility/DateUtility';
import EventDateTime from 'smarthealth-javascript/EventDateTime';
import Precision from 'smarthealth-javascript/Precision';

class DateTimeService
{
    public now(): EventDateTime
    {
        return DateUtility.dateToEventDateTime(new Date(), Precision.Minute);
    }

    public today(): EventDateTime
    {
        return DateUtility.reducePrecision(this.now(), Precision.Day);
    }
}

export default DateTimeService;
