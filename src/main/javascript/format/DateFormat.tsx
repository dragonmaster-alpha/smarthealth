import DateUtility from 'main/utility/DateUtility';
import EventDateTime from 'smarthealth-javascript/EventDateTime';

/**
 * Date formats
 *
 * @author Larry 29/11/2018
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2018
 */

export function formatAge(fromDate: EventDateTime, toDate: EventDateTime): string
{
    const years = DateUtility.determineDifferenceInYears(fromDate, toDate);
    if (years >= 2)
    {
        return `${years}y`;
    }
    const months = DateUtility.determineDifferenceInMonths(fromDate, toDate);
    if (months >= 1)
    {
        return `${months}m`;
    }
    const days = DateUtility.determineDifferenceInDays(fromDate, toDate);
    if (days >= 0)
    {
        return `${days}d`;
    }

}

export function formatAgeDate(fromDate: EventDateTime, toDate: EventDateTime): string
{
    const years = DateUtility.determineDifferenceInYears(fromDate, toDate);
    if (years < 0)
    {
        return '?';
    }
    if (years >= 2)
    {
        return `${years}y`;
    }
    const months = DateUtility.determineDifferenceInMonths(fromDate, toDate);
    if (months >= 1)
    {
        return `${months}m`;
    }
    const days = DateUtility.determineDifferenceInDays(fromDate, toDate);
    return `${days}d`;
}
