import DateUtility from 'main/utility/DateUtility';
import Locales from 'main/utility/Locales';
import moment from 'moment';
import EventDateTime from 'smarthealth-javascript/EventDateTime';
import Precision from 'smarthealth-javascript/Precision';

/**
 * Test for DateUtility
 *
 * @author Thompson 24/04/2019
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2019
 */
describe('Date conversion to another form of date', () =>
{
    test('unixEpochMilliSecondsToEventDateTime', () =>
    {
        expect(DateUtility.unixEpochMilliSecondsToEventDateTimeDay(moment('2020-01-02')
            .valueOf()))
            .toEqual({ iso: '2020-01-02' });
        expect(DateUtility.unixEpochMilliSecondsToEventDateTimeDay(moment('2020-12-25')
            .valueOf()))
            .toEqual({ iso: '2020-12-25' });
        expect(DateUtility.unixEpochMilliSecondsToEventDateTimeDay(moment('2023-05-19')
            .valueOf()))
            .toEqual({ iso: '2023-05-19' });
    });

    test('eventDateTimeToUnixEpochMilliSeconds', () =>
    {
        expect(DateUtility.eventDateTimeToUnixEpochMilliSeconds({ iso: '2020-01-02' }))
            .toEqual(moment('2020-01-02')
                .valueOf());
        expect(DateUtility.eventDateTimeToUnixEpochMilliSeconds({ iso: '2020-12-25' }))
            .toEqual(moment('2020-12-25')
                .valueOf());
        expect(DateUtility.eventDateTimeToUnixEpochMilliSeconds({ iso: '2023-05-19' }))
            .toEqual(moment('2023-05-19')
                .valueOf());
    });

    test('dateToEventDateTime', () =>
    {
        expect(DateUtility.dateToEventDateTime(new Date('1995-12-17T03:24+1100'), Precision.Minute))
            .toEqual({ iso: '1995-12-17T03:24' });
        expect(DateUtility.dateToEventDateTime(new Date(2010, 6 - 1, 30, 12, 34),
            Precision.Minute))
            .toEqual({ iso: '2010-06-30T12:34' });
        expect(DateUtility.dateToEventDateTime(new Date(2095, 1 - 1, 31), Precision.Day))
            .toEqual({ iso: '2095-01-31' });
        expect(DateUtility.dateToEventDateTime(new Date('2095-01-31'), Precision.Day))
            .toEqual({ iso: '2095-01-31' });
        expect(DateUtility.dateToEventDateTime(new Date(1995, 12 - 1), Precision.Month))
            .toEqual({ iso: '1995-12' });
        expect(DateUtility.dateToEventDateTime(new Date('1995'), Precision.Year))
            .toEqual({ iso: '1995' });
    });
});

describe('formatEventDateTime', () =>
{
    test(Locales.AUSTRALIA, () =>
    {
        expect(DateUtility.formatEventDateTime({ iso: '2001-06-02T12:34' }, Locales.AUSTRALIA))
            .toEqual('02/06/2001 12:34');
        expect(DateUtility.formatEventDateTime({ iso: '2001-06-02' }, Locales.AUSTRALIA))
            .toEqual('02/06/2001');
        expect(DateUtility.formatEventDateTime({ iso: '2019-12-30' }, Locales.AUSTRALIA))
            .toEqual('30/12/2019');
        expect(DateUtility.formatEventDateTime({ iso: '2001-06' }, Locales.AUSTRALIA))
            .toEqual('06/2001');
        expect(DateUtility.formatEventDateTime({ iso: '2019-12' }, Locales.AUSTRALIA))
            .toEqual('12/2019');
        expect(DateUtility.formatEventDateTime({ iso: '2001' }, Locales.AUSTRALIA))
            .toEqual('2001');
    });
});

describe('Validation of dateTime string', () =>
{
    describe(Locales.AUSTRALIA, () =>
    {
        test('Without precision', () =>
        {
            expect(DateUtility.isValidDateTimeString(null, Locales.AUSTRALIA))
                .toEqual(false);
            expect(DateUtility.isValidDateTimeString('', Locales.AUSTRALIA))
                .toEqual(false);

            expect(DateUtility.isValidDateTimeString('2020-12-20', Locales.AUSTRALIA))
                .toEqual(true);
            expect(DateUtility.isValidDateTimeString('20201220', Locales.AUSTRALIA))
                .toEqual(true);

            expect(DateUtility.isValidDateTimeString('02062001 1234', Locales.AUSTRALIA))
                .toEqual(true);
            expect(DateUtility.isValidDateTimeString('02062001 123', Locales.AUSTRALIA))
                .toEqual(true);
            expect(DateUtility.isValidDateTimeString('02062001 12:34', Locales.AUSTRALIA))
                .toEqual(true);
            expect(DateUtility.isValidDateTimeString('02062001 1:23', Locales.AUSTRALIA))
                .toEqual(true);
            expect(DateUtility.isValidDateTimeString('02/06/2001 2010', Locales.AUSTRALIA))
                .toEqual(true);
            expect(DateUtility.isValidDateTimeString('02/06/2001 201', Locales.AUSTRALIA))
                .toEqual(true);
            expect(DateUtility.isValidDateTimeString('02/06/2001 20:10', Locales.AUSTRALIA))
                .toEqual(true);
            expect(DateUtility.isValidDateTimeString('02/06/2001 2:01', Locales.AUSTRALIA))
                .toEqual(true);
            expect(DateUtility.isValidDateTimeString('02062001 2:01', Locales.AUSTRALIA))
                .toEqual(true);
            expect(DateUtility.isValidDateTimeString('02/06/2001 2:01', Locales.AUSTRALIA))
                .toEqual(true);
            expect(DateUtility.isValidDateTimeString('020620011234', Locales.AUSTRALIA))
                .toEqual(false);

            expect(DateUtility.isValidDateTimeString('02062001', Locales.AUSTRALIA))
                .toEqual(true);
            expect(DateUtility.isValidDateTimeString('2062001', Locales.AUSTRALIA))
                .toEqual(false);
            expect(DateUtility.isValidDateTimeString('2/06/2001', Locales.AUSTRALIA))
                .toEqual(true);
            expect(DateUtility.isValidDateTimeString('2/6/2001', Locales.AUSTRALIA))
                .toEqual(true);
            expect(DateUtility.isValidDateTimeString('02.06.2001', Locales.AUSTRALIA))
                .toEqual(true);
            expect(DateUtility.isValidDateTimeString('2.06.2001', Locales.AUSTRALIA))
                .toEqual(true);
            expect(DateUtility.isValidDateTimeString('2.6.2001', Locales.AUSTRALIA))
                .toEqual(true);
            expect(DateUtility.isValidDateTimeString('30-12-2019', Locales.AUSTRALIA))
                .toEqual(true);
            expect(DateUtility.isValidDateTimeString('30 12 2019', Locales.AUSTRALIA))
                .toEqual(true);

            expect(DateUtility.isValidDateTimeString('30Dec2019', Locales.AUSTRALIA))
                .toEqual(true);
            expect(DateUtility.isValidDateTimeString('30-dec-2019', Locales.AUSTRALIA))
                .toEqual(true);
            expect(DateUtility.isValidDateTimeString('30 DEC 2019', Locales.AUSTRALIA))
                .toEqual(true);
            expect(DateUtility.isValidDateTimeString('30.dEc.2019', Locales.AUSTRALIA))
                .toEqual(true);
            expect(DateUtility.isValidDateTimeString('30/dec/2019', Locales.AUSTRALIA))
                .toEqual(true);

            expect(DateUtility.isValidDateTimeString('30Dec19', Locales.AUSTRALIA))
                .toEqual(true);
            expect(DateUtility.isValidDateTimeString('30-dec-19', Locales.AUSTRALIA))
                .toEqual(true);
            expect(DateUtility.isValidDateTimeString('30 DEC 19', Locales.AUSTRALIA))
                .toEqual(true);
            expect(DateUtility.isValidDateTimeString('30.dEc.19', Locales.AUSTRALIA))
                .toEqual(true);
            expect(DateUtility.isValidDateTimeString('30/dec/19', Locales.AUSTRALIA))
                .toEqual(true);

            expect(DateUtility.isValidDateTimeString('35/12/2000', Locales.AUSTRALIA))
                .toEqual(false);
            expect(DateUtility.isValidDateTimeString('020620011', Locales.AUSTRALIA))
                .toEqual(false);
            expect(DateUtility.isValidDateTimeString('32/12/2019', Locales.AUSTRALIA))
                .toEqual(false);

            expect(DateUtility.isValidDateTimeString('062001', Locales.AUSTRALIA))
                .toEqual(true);
            expect(DateUtility.isValidDateTimeString('62001', Locales.AUSTRALIA))
                .toEqual(false);
            expect(DateUtility.isValidDateTimeString('06/2001', Locales.AUSTRALIA))
                .toEqual(true);
            expect(DateUtility.isValidDateTimeString('06.2001', Locales.AUSTRALIA))
                .toEqual(true);
            expect(DateUtility.isValidDateTimeString('12.2019', Locales.AUSTRALIA))
                .toEqual(true);
            expect(DateUtility.isValidDateTimeString('2/2019', Locales.AUSTRALIA))
                .toEqual(true);
            expect(DateUtility.isValidDateTimeString('2.2019', Locales.AUSTRALIA))
                .toEqual(true);
            expect(DateUtility.isValidDateTimeString('02-2019', Locales.AUSTRALIA))
                .toEqual(true);
            expect(DateUtility.isValidDateTimeString('02 2019', Locales.AUSTRALIA))
                .toEqual(true);

            expect(DateUtility.isValidDateTimeString('aug2019', Locales.AUSTRALIA))
                .toEqual(true);
            expect(DateUtility.isValidDateTimeString('jan/2019', Locales.AUSTRALIA))
                .toEqual(true);
            expect(DateUtility.isValidDateTimeString('Jan.2019', Locales.AUSTRALIA))
                .toEqual(true);
            expect(DateUtility.isValidDateTimeString('JAN-2019', Locales.AUSTRALIA))
                .toEqual(true);
            expect(DateUtility.isValidDateTimeString('dec 2019', Locales.AUSTRALIA))
                .toEqual(true);
            expect(DateUtility.isValidDateTimeString('Jun 2019', Locales.AUSTRALIA))
                .toEqual(true);

            expect(DateUtility.isValidDateTimeString('2001', Locales.AUSTRALIA))
                .toEqual(true);
            expect(DateUtility.isValidDateTimeString('019', Locales.AUSTRALIA))
                .toEqual(false);
            expect(DateUtility.isValidDateTimeString('19', Locales.AUSTRALIA))
                .toEqual(false);

            expect(DateUtility.isValidDateTimeString('30\\12\\2000', Locales.AUSTRALIA))
                .toEqual(false);
            expect(DateUtility.isValidDateTimeString('30/December/2000', Locales.AUSTRALIA))
                .toEqual(false);
            expect(DateUtility.isValidDateTimeString('30/13/2000', Locales.AUSTRALIA))
                .toEqual(false);
            expect(DateUtility.isValidDateTimeString('30/02/2020', Locales.AUSTRALIA))
                .toEqual(false);
        });

        test('With precision', () =>
        {
            expect(DateUtility.isValidDateTimeString('02062001 1234', Locales.AUSTRALIA, Precision.Minute))
                .toEqual(true);
            expect(DateUtility.isValidDateTimeString('02062001 123', Locales.AUSTRALIA, Precision.Minute))
                .toEqual(true);
            expect(DateUtility.isValidDateTimeString('02062001 12:34', Locales.AUSTRALIA, Precision.Minute))
                .toEqual(true);
            expect(DateUtility.isValidDateTimeString('02062001 1:23', Locales.AUSTRALIA, Precision.Minute))
                .toEqual(true);
            expect(DateUtility.isValidDateTimeString('02/06/2001 2010', Locales.AUSTRALIA, Precision.Minute))
                .toEqual(true);
            expect(DateUtility.isValidDateTimeString('02/06/2001 201', Locales.AUSTRALIA, Precision.Minute))
                .toEqual(true);
            expect(DateUtility.isValidDateTimeString('02/06/2001 20:10', Locales.AUSTRALIA, Precision.Minute))
                .toEqual(true);
            expect(DateUtility.isValidDateTimeString('02/06/2001 2:01', Locales.AUSTRALIA, Precision.Minute))
                .toEqual(true);

            expect(DateUtility.isValidDateTimeString('02062001', Locales.AUSTRALIA, Precision.Day))
                .toEqual(true);
            expect(DateUtility.isValidDateTimeString('02/06/2001', Locales.AUSTRALIA, Precision.Day))
                .toEqual(true);
            expect(DateUtility.isValidDateTimeString('02.06.2001', Locales.AUSTRALIA, Precision.Day))
                .toEqual(true);
            expect(DateUtility.isValidDateTimeString('30/12/2019', Locales.AUSTRALIA, Precision.Day))
                .toEqual(true);
            expect(DateUtility.isValidDateTimeString('12.2019', Locales.AUSTRALIA, Precision.Day))
                .toEqual(false);
            expect(DateUtility.isValidDateTimeString('35/12/2000', Locales.AUSTRALIA, Precision.Day))
                .toEqual(false);
            expect(DateUtility.isValidDateTimeString('020620011', Locales.AUSTRALIA, Precision.Day))
                .toEqual(false);
            expect(DateUtility.isValidDateTimeString('111/12/2019', Locales.AUSTRALIA, Precision.Day))
                .toEqual(false);

            expect(DateUtility.isValidDateTimeString('062001', Locales.AUSTRALIA, Precision.Month))
                .toEqual(true);
            expect(DateUtility.isValidDateTimeString('06/2001', Locales.AUSTRALIA, Precision.Month))
                .toEqual(true);
            expect(DateUtility.isValidDateTimeString('06.2001', Locales.AUSTRALIA, Precision.Month))
                .toEqual(true);
            expect(DateUtility.isValidDateTimeString('12.2019', Locales.AUSTRALIA, Precision.Month))
                .toEqual(true);
            expect(DateUtility.isValidDateTimeString('2/2019', Locales.AUSTRALIA, Precision.Month))
                .toEqual(true);
            expect(DateUtility.isValidDateTimeString('aug2019', Locales.AUSTRALIA, Precision.Month))
                .toEqual(true);
            expect(DateUtility.isValidDateTimeString('jan/2019', Locales.AUSTRALIA, Precision.Month))
                .toEqual(true);
            expect(DateUtility.isValidDateTimeString('Jan.2019', Locales.AUSTRALIA, Precision.Month))
                .toEqual(true);
            expect(DateUtility.isValidDateTimeString('JAN-2019', Locales.AUSTRALIA, Precision.Month))
                .toEqual(true);
            expect(DateUtility.isValidDateTimeString('dec 2019', Locales.AUSTRALIA, Precision.Month))
                .toEqual(true);
            expect(DateUtility.isValidDateTimeString('Jun 2019', Locales.AUSTRALIA, Precision.Month))
                .toEqual(true);

            expect(DateUtility.isValidDateTimeString('2001', Locales.AUSTRALIA, Precision.Year))
                .toEqual(true);
            expect(DateUtility.isValidDateTimeString('019', Locales.AUSTRALIA, Precision.Year))
                .toEqual(false);
            expect(DateUtility.isValidDateTimeString('19', Locales.AUSTRALIA, Precision.Year))
                .toEqual(false);

            expect(DateUtility.isValidDateTimeString('02/06/2001', Locales.AUSTRALIA, Precision.Minute))
                .toEqual(false);
            expect(DateUtility.isValidDateTimeString('02/06/2001', Locales.AUSTRALIA, Precision.Day))
                .toEqual(true);
            expect(DateUtility.isValidDateTimeString('02/06/2001', Locales.AUSTRALIA, Precision.Month))
                .toEqual(false);
            expect(DateUtility.isValidDateTimeString('02/06/2001', Locales.AUSTRALIA, Precision.Year))
                .toEqual(false);

            expect(DateUtility.isValidDateTimeString('06/2001', Locales.AUSTRALIA, Precision.Minute))
                .toEqual(false);
            expect(DateUtility.isValidDateTimeString('06/2001', Locales.AUSTRALIA, Precision.Day))
                .toEqual(false);
            expect(DateUtility.isValidDateTimeString('06/2001', Locales.AUSTRALIA, Precision.Month))
                .toEqual(true);
            expect(DateUtility.isValidDateTimeString('06/2001', Locales.AUSTRALIA, Precision.Year))
                .toEqual(false);

            expect(DateUtility.isValidDateTimeString('2001', Locales.AUSTRALIA, Precision.Minute))
                .toEqual(false);
            expect(DateUtility.isValidDateTimeString('2001', Locales.AUSTRALIA, Precision.Day))
                .toEqual(false);
            expect(DateUtility.isValidDateTimeString('2001', Locales.AUSTRALIA, Precision.Month))
                .toEqual(false);
            expect(DateUtility.isValidDateTimeString('2001', Locales.AUSTRALIA, Precision.Year))
                .toEqual(true);

            expect(DateUtility.isValidDateTimeString('20000', Locales.AUSTRALIA, Precision.Year))
                .toEqual(false);
            expect(DateUtility.isValidDateTimeString('13/2000', Locales.AUSTRALIA, Precision.Month))
                .toEqual(false);
            expect(DateUtility.isValidDateTimeString('30/02/2020', Locales.AUSTRALIA, Precision.Day))
                .toEqual(false);
            expect(DateUtility.isValidDateTimeString('30\\12\\2000', Locales.AUSTRALIA, Precision.Day))
                .toEqual(false);
            expect(DateUtility.isValidDateTimeString('30/December/2000', Locales.AUSTRALIA, Precision.Day))
                .toEqual(false);
            expect(DateUtility.isValidDateTimeString('30/13/2000', Locales.AUSTRALIA, Precision.Day))
                .toEqual(false);
        });
    });
});

describe('isValidTimeString', () =>
{
    test(Locales.AUSTRALIA, () =>
    {
        expect(DateUtility.isValidTimeString(null, Locales.AUSTRALIA))
            .toEqual(false);
        expect(DateUtility.isValidTimeString('', Locales.AUSTRALIA))
            .toEqual(false);

        expect(DateUtility.isValidTimeString('1234', Locales.AUSTRALIA))
            .toEqual(true);
        expect(DateUtility.isValidTimeString('123', Locales.AUSTRALIA))
            .toEqual(true);
        expect(DateUtility.isValidTimeString('12:34', Locales.AUSTRALIA))
            .toEqual(true);
        expect(DateUtility.isValidTimeString('1:23', Locales.AUSTRALIA))
            .toEqual(true);
        expect(DateUtility.isValidTimeString('01:23', Locales.AUSTRALIA))
            .toEqual(true);
        expect(DateUtility.isValidTimeString('1.23', Locales.AUSTRALIA))
            .toEqual(true);
        expect(DateUtility.isValidTimeString('01.23', Locales.AUSTRALIA))
            .toEqual(true);
        expect(DateUtility.isValidTimeString('020620011234', Locales.AUSTRALIA))
            .toEqual(false);
        expect(DateUtility.isValidTimeString('2001', Locales.AUSTRALIA))
            .toEqual(true);
        expect(DateUtility.isValidTimeString('019', Locales.AUSTRALIA))
            .toEqual(true);
        expect(DateUtility.isValidTimeString('19', Locales.AUSTRALIA))
            .toEqual(false);

        // TODO Thompson invalid characters
        // TODO Thompson extra spaces
    });
});

describe('reformatTimeString', () =>
{
    test(Locales.AUSTRALIA, () =>
    {
        expect(DateUtility.reformatTimeString('1234', Locales.AUSTRALIA))
            .toEqual('12:34');
        expect(DateUtility.reformatTimeString('123', Locales.AUSTRALIA))
            .toEqual('01:23');
        expect(DateUtility.reformatTimeString('12:34', Locales.AUSTRALIA))
            .toEqual('12:34');
        expect(DateUtility.reformatTimeString('1:23', Locales.AUSTRALIA))
            .toEqual('01:23');
        expect(DateUtility.reformatTimeString('01:23', Locales.AUSTRALIA))
            .toEqual('01:23');
        expect(DateUtility.reformatTimeString('1.23', Locales.AUSTRALIA))
            .toEqual('01:23');
        expect(DateUtility.reformatTimeString('01.23', Locales.AUSTRALIA))
            .toEqual('01:23');
        expect(DateUtility.reformatTimeString('20:01', Locales.AUSTRALIA))
            .toEqual('20:01');
        expect(DateUtility.reformatTimeString('2001', Locales.AUSTRALIA))
            .toEqual('20:01');
        expect(DateUtility.reformatTimeString('019', Locales.AUSTRALIA))
            .toEqual('00:19');
    });
});

describe('toEventDateTimeOrString', () =>
{
    test('strings with invalid date string return the string unchanged', () =>
    {
        expect(DateUtility.toEventDateTimeOrString('35/12/2000', Locales.AUSTRALIA))
            .toEqual('35/12/2000');
        expect(DateUtility.toEventDateTimeOrString('020620011', Locales.AUSTRALIA))
            .toEqual('020620011');
        expect(DateUtility.toEventDateTimeOrString('111/12/2019', Locales.AUSTRALIA))
            .toEqual('111/12/2019');
        expect(DateUtility.toEventDateTimeOrString('22/2019', Locales.AUSTRALIA))
            .toEqual('22/2019');
        expect(DateUtility.toEventDateTimeOrString('22019', Locales.AUSTRALIA))
            .toEqual('22019');
        expect(DateUtility.toEventDateTimeOrString('019', Locales.AUSTRALIA))
            .toEqual('019');
        // TODO invalid characters
        // TODO precision minute
    });
    test('return EventDateTime', () =>
    {
        expect(DateUtility.toEventDateTimeOrString('02062001', Locales.AUSTRALIA))
            .toEqual({ iso: '2001-06-02' });
        expect(DateUtility.toEventDateTimeOrString('02/06/2001', Locales.AUSTRALIA))
            .toEqual({ iso: '2001-06-02' });
        expect(DateUtility.toEventDateTimeOrString('02.06.2001', Locales.AUSTRALIA))
            .toEqual({ iso: '2001-06-02' });
        expect(DateUtility.toEventDateTimeOrString('062001', Locales.AUSTRALIA))
            .toEqual({ iso: '2001-06' });
        expect(DateUtility.toEventDateTimeOrString('06/2001', Locales.AUSTRALIA))
            .toEqual({ iso: '2001-06' });
        expect(DateUtility.toEventDateTimeOrString('06.2001', Locales.AUSTRALIA))
            .toEqual({ iso: '2001-06' });
        expect(DateUtility.toEventDateTimeOrString('2001', Locales.AUSTRALIA))
            .toEqual({ iso: '2001' });
        expect(DateUtility.toEventDateTimeOrString('30/12/2019', Locales.AUSTRALIA))
            .toEqual({ iso: '2019-12-30' });
        expect(DateUtility.toEventDateTimeOrString('12.2019', Locales.AUSTRALIA))
            .toEqual({ iso: '2019-12' });
    });
    test('input is EventDateTime', () =>
    {
        expect(DateUtility.toEventDateTimeOrString({ iso: '2001-06-02T12:34' }, Locales.AUSTRALIA))
            .toEqual({ iso: '2001-06-02T12:34' });
        expect(DateUtility.toEventDateTimeOrString({ iso: '2001-06-02' }, Locales.AUSTRALIA))
            .toEqual({ iso: '2001-06-02' });
        expect(DateUtility.toEventDateTimeOrString({ iso: '2019-12-30' }, Locales.AUSTRALIA))
            .toEqual({ iso: '2019-12-30' });
        expect(DateUtility.toEventDateTimeOrString({ iso: '2001-06' }, Locales.AUSTRALIA))
            .toEqual({ iso: '2001-06' });
        expect(DateUtility.toEventDateTimeOrString({ iso: '2019-12' }, Locales.AUSTRALIA))
            .toEqual({ iso: '2019-12' });
        expect(DateUtility.toEventDateTimeOrString({ iso: '2001' }, Locales.AUSTRALIA))
            .toEqual({ iso: '2001' });
    });
});

test('reducePrecision', () =>
{
    expect(DateUtility.reducePrecision({ iso: '2001-06-02T12:34' }, Precision.Minute))
        .toEqual({ iso: '2001-06-02T12:34' });
    expect(DateUtility.reducePrecision({ iso: '2001-06-02T12:34' }, Precision.Day))
        .toEqual({ iso: '2001-06-02' });
    expect(DateUtility.reducePrecision({ iso: '2001-06-02T12:34' }, Precision.Month))
        .toEqual({ iso: '2001-06' });
    expect(DateUtility.reducePrecision({ iso: '2001-06-02T12:34' }, Precision.Year))
        .toEqual({ iso: '2001' });
    expect(DateUtility.reducePrecision({ iso: '2001-06-02' }, Precision.Minute))
        .toEqual({ iso: '2001-06-02' });
    expect(DateUtility.reducePrecision({ iso: '2001-06-02' }, Precision.Day))
        .toEqual({ iso: '2001-06-02' });
    expect(DateUtility.reducePrecision({ iso: '2001-06-02' }, Precision.Month))
        .toEqual({ iso: '2001-06' });
    expect(DateUtility.reducePrecision({ iso: '2001-06-02' }, Precision.Year))
        .toEqual({ iso: '2001' });
    expect(DateUtility.reducePrecision({ iso: '2001-06' }, Precision.Minute))
        .toEqual({ iso: '2001-06' });
    expect(DateUtility.reducePrecision({ iso: '2001-06' }, Precision.Day))
        .toEqual({ iso: '2001-06' });
    expect(DateUtility.reducePrecision({ iso: '2001-06' }, Precision.Month))
        .toEqual({ iso: '2001-06' });
    expect(DateUtility.reducePrecision({ iso: '2001-06' }, Precision.Year))
        .toEqual({ iso: '2001' });
    expect(DateUtility.reducePrecision({ iso: '2001' }, Precision.Minute))
        .toEqual({ iso: '2001' });
    expect(DateUtility.reducePrecision({ iso: '2001' }, Precision.Day))
        .toEqual({ iso: '2001' });
    expect(DateUtility.reducePrecision({ iso: '2001' }, Precision.Month))
        .toEqual({ iso: '2001' });
    expect(DateUtility.reducePrecision({ iso: '2001' }, Precision.Year))
        .toEqual({ iso: '2001' });
});

describe('eventDateTimeToDate convert ISO with timezone to the respective date and time', () =>
{
    test('+2 UTC', () =>
    {
        const eventDateTime: EventDateTime = { iso: '1990-02-01T12:34+2' };
        const [dateString, timezone] = eventDateTime.iso.split('+');
        const date: Date = new Date(dateString);
        expect(DateUtility.eventDateTimeToDate(eventDateTime))
            .not
            .toEqual(date);
        date.setUTCHours(parseFloat(timezone));
        expect(DateUtility.eventDateTimeToDate(eventDateTime))
            .toEqual(date);
    });

    test('+5 UTC', () =>
    {
        const eventDateTime: EventDateTime = { iso: '1990-02-01T12:34+5' };
        const [dateString, timezone] = eventDateTime.iso.split('+');
        const date: Date = new Date(dateString);
        expect(DateUtility.eventDateTimeToDate(eventDateTime))
            .not
            .toEqual(date);
        date.setUTCHours(parseFloat(timezone));
        expect(DateUtility.eventDateTimeToDate(eventDateTime))
            .toEqual(date);
    });

    test('+10 UTC', () =>
    {
        const eventDateTime: EventDateTime = { iso: '1990-02-01T12:34+10' };
        const [dateString, timezone] = eventDateTime.iso.split('+');
        const date: Date = new Date(dateString);
        expect(DateUtility.eventDateTimeToDate(eventDateTime))
            .not
            .toEqual(date);
        date.setUTCHours(parseFloat(timezone));
        expect(DateUtility.eventDateTimeToDate(eventDateTime))
            .toEqual(date);
    });
});

describe('isEventDateTimePrecisionEqualOrHigher', () =>
{
    test('Precision.Minute return true for minute and false otherwise', () =>
    {
        expect(DateUtility.isPrecisionEqualOrHigher(Precision.Minute, { iso: '2001-09-03T12:34' }))
            .toEqual(true);

        expect(DateUtility.isPrecisionEqualOrHigher(Precision.Minute, { iso: '2012-01-13' }))
            .toEqual(false);
        expect(DateUtility.isPrecisionEqualOrHigher(Precision.Minute, { iso: '2012-01' }))
            .toEqual(false);
        expect(DateUtility.isPrecisionEqualOrHigher(Precision.Minute, { iso: '2012' }))
            .toEqual(false);
        expect(DateUtility.isPrecisionEqualOrHigher(Precision.Minute, null))
            .toEqual(false);
    });

    test('Precision.Day return true for day or higher, false otherwise', () =>
    {
        expect(DateUtility.isPrecisionEqualOrHigher(Precision.Day, { iso: '2001-09-03' }))
            .toEqual(true);
        expect(DateUtility.isPrecisionEqualOrHigher(Precision.Day, { iso: '2001-09-03T12:34' }))
            .toEqual(true);

        expect(DateUtility.isPrecisionEqualOrHigher(Precision.Day, { iso: '2012-01' }))
            .toEqual(false);
        expect(DateUtility.isPrecisionEqualOrHigher(Precision.Day, { iso: '2012' }))
            .toEqual(false);
        expect(DateUtility.isPrecisionEqualOrHigher(Precision.Day, null))
            .toEqual(false);
    });

    test('Precision.Month return true for month or higher, false otherwise', () =>
    {
        expect(DateUtility.isPrecisionEqualOrHigher(Precision.Month, { iso: '2001-09' }))
            .toEqual(true);
        expect(DateUtility.isPrecisionEqualOrHigher(Precision.Month, { iso: '2001-09-03' }))
            .toEqual(true);
        expect(DateUtility.isPrecisionEqualOrHigher(Precision.Month, { iso: '2001-09-03T12:34' }))
            .toEqual(true);

        expect(DateUtility.isPrecisionEqualOrHigher(Precision.Month, { iso: '2012' }))
            .toEqual(false);
        expect(DateUtility.isPrecisionEqualOrHigher(Precision.Month, null))
            .toEqual(false);
    });

    test('Precision.Year return true for year, month, day and minute precision', () =>
    {
        expect(DateUtility.isPrecisionEqualOrHigher(Precision.Year, { iso: '2001' }))
            .toEqual(true);
        expect(DateUtility.isPrecisionEqualOrHigher(Precision.Year, { iso: '2001-09' }))
            .toEqual(true);
        expect(DateUtility.isPrecisionEqualOrHigher(Precision.Year, { iso: '2001-09-03' }))
            .toEqual(true);
        expect(DateUtility.isPrecisionEqualOrHigher(Precision.Year, { iso: '2001-09-03T12:34' }))
            .toEqual(true);

        expect(DateUtility.isPrecisionEqualOrHigher(Precision.Year, null))
            .toEqual(false);
    });
});

describe('date compare utilities', () =>
{
    test('check endDate EventDateTime is after startDate EventDateTime', () =>
    {
        expect(() => DateUtility.isAfterDay({ iso: '2000-07' }, { iso: '2000-12-02' }))
            .toThrowError(new Error('date1 must be at least Precision.Day: 2000-07'));
        expect(() => DateUtility.isAfterDay({ iso: '2000-12-02' }, { iso: '2000' }))
            .toThrowError(new Error('date2 must be at least Precision.Day: 2000'));

        expect(DateUtility.isAfterDay({ iso: '2020-01-25' }, { iso: '2020-01-25' }))
            .toEqual(false);
        expect(DateUtility.isAfterDay({ iso: '2020-01-25T15:00' }, { iso: '2020-01-25T12:00' }))
            .toEqual(false);
        expect(DateUtility.isAfterDay({ iso: '2020-01-25T10:00' }, { iso: '2020-01-25T12:00' }))
            .toEqual(false);

        expect(DateUtility.isAfterDay({ iso: '2020-01-26' }, { iso: '2020-01-25' }))
            .toEqual(true);
        expect(DateUtility.isAfterDay({ iso: '2020-01-26' }, { iso: '2020-01-25T23:59' }))
            .toEqual(true);
        expect(DateUtility.isAfterDay({ iso: '2020-01-26T15:10' }, { iso: '2020-01-25T23:59' }))
            .toEqual(true);
    });

    test('check the 2 dates are the same', () =>
    {
        expect(() => DateUtility.isSameDay({ iso: '2000-07' }, { iso: '2000-12-02' }))
            .toThrowError(new Error('date1 or date2 does not have a minimum Precision of Precision.Day.'));
        expect(() => DateUtility.isSameDay({ iso: '2000-12-02' }, { iso: '2000' }))
            .toThrowError(new Error('date1 or date2 does not have a minimum Precision of Precision.Day.'));

        expect(DateUtility.isSameDay({ iso: '2020-01-02' }, { iso: '2020-01-03' }))
            .toEqual(false);
        expect(DateUtility.isSameDay({ iso: '2020-01-25T15:00' }, { iso: '2020-01-26T12:00' }))
            .toEqual(false);
        expect(DateUtility.isSameDay({ iso: '2021-01-25T10:00' }, { iso: '2004-01-25T12:00' }))
            .toEqual(false);

        expect(DateUtility.isSameDay({ iso: '2000-06-05' }, { iso: '2000-06-05' }))
            .toEqual(true);
        expect(DateUtility.isSameDay({ iso: '2000-06-05T10:00' }, { iso: '2000-06-05' }))
            .toEqual(true);
        expect(DateUtility.isSameDay({ iso: '2000-06-05' }, { iso: '2000-06-05T23:59' }))
            .toEqual(true);
        expect(DateUtility.isSameDay({ iso: '2000-06-05T10:00' }, { iso: '2000-06-05T23:59' }))
            .toEqual(true);
    });

    test('compare 2 dates to see if first parameter is less than, equal or greater than.', () =>
    {
        expect(DateUtility.compareAscending({ iso: '2013' }, { iso: '2013-01' }))
            .toEqual(-1);
        expect(DateUtility.compareAscending({ iso: '2013' }, { iso: '2013-01-01' }))
            .toEqual(-1);
        expect(DateUtility.compareAscending({ iso: '2013-01' }, { iso: '2013-01-01' }))
            .toEqual(-1);
        expect(DateUtility.compareAscending({ iso: '2013-05-10' }, { iso: '2013-05-11' }))
            .toEqual(-1);
        expect(DateUtility.compareAscending({ iso: '2013-05-10' }, { iso: '2013-05-10T01:00' }))
            .toEqual(-1);
        expect(DateUtility.compareAscending({ iso: '2013-05-10T01:00' }, { iso: '2013-05-10T12:00' }))
            .toEqual(-1);

        expect(DateUtility.compareAscending({ iso: '2013' }, { iso: '2013' }))
            .toEqual(0);
        expect(DateUtility.compareAscending({ iso: '2013-05' }, { iso: '2013-05' }))
            .toEqual(0);
        expect(DateUtility.compareAscending({ iso: '2013-05-10' }, { iso: '2013-05-10' }))
            .toEqual(0);
        expect(DateUtility.compareAscending({ iso: '2013-05-11T12:34' }, { iso: '2013-05-11T12:34' }))
            .toEqual(0);

        expect(DateUtility.compareAscending({ iso: '2013-01' }, { iso: '2013' }))
            .toEqual(1);
        expect(DateUtility.compareAscending({ iso: '2013-01-01' }, { iso: '2013' }))
            .toEqual(1);
        expect(DateUtility.compareAscending({ iso: '2013-01-01' }, { iso: '2013-01' }))
            .toEqual(1);
        expect(DateUtility.compareAscending({ iso: '2013-05-11' }, { iso: '2013-05-10' }))
            .toEqual(1);
        expect(DateUtility.compareAscending({ iso: '2013-05-10T01:00' }, { iso: '2013-05-10' }))
            .toEqual(1);
        expect(DateUtility.compareAscending({ iso: '2013-05-10T01:00' }, { iso: '2013-05-10T00:01' }))
            .toEqual(1);
    });

    test('compare 2 dates to see if first parameter is less than, equal or greater than.', () =>
    {
        expect(DateUtility.compareDescending({ iso: '2013' }, { iso: '2013-01' }))
            .toEqual(1);
        expect(DateUtility.compareDescending({ iso: '2013' }, { iso: '2013-01-01' }))
            .toEqual(1);
        expect(DateUtility.compareDescending({ iso: '2013-01' }, { iso: '2013-01-01' }))
            .toEqual(1);
        expect(DateUtility.compareDescending({ iso: '2013-05-10' }, { iso: '2013-05-11' }))
            .toEqual(1);
        expect(DateUtility.compareDescending({ iso: '2013-05-10' }, { iso: '2013-05-10T01:00' }))
            .toEqual(1);
        expect(DateUtility.compareDescending({ iso: '2013-05-10T01:00' }, { iso: '2013-05-10T12:00' }))
            .toEqual(1);

        expect(DateUtility.compareDescending({ iso: '2013' }, { iso: '2013' }))
            .toEqual(0);
        expect(DateUtility.compareDescending({ iso: '2013-05' }, { iso: '2013-05' }))
            .toEqual(0);
        expect(DateUtility.compareDescending({ iso: '2013-05-10' }, { iso: '2013-05-10' }))
            .toEqual(0);
        expect(DateUtility.compareDescending({ iso: '2013-05-11T12:34' }, { iso: '2013-05-11T12:34' }))
            .toEqual(0);

        expect(DateUtility.compareDescending({ iso: '2013-01' }, { iso: '2013' }))
            .toEqual(-1);
        expect(DateUtility.compareDescending({ iso: '2013-01-01' }, { iso: '2013' }))
            .toEqual(-1);
        expect(DateUtility.compareDescending({ iso: '2013-01-01' }, { iso: '2013-01' }))
            .toEqual(-1);
        expect(DateUtility.compareDescending({ iso: '2013-05-11' }, { iso: '2013-05-10' }))
            .toEqual(-1);
        expect(DateUtility.compareDescending({ iso: '2013-05-10T01:00' }, { iso: '2013-05-10' }))
            .toEqual(-1);
        expect(DateUtility.compareDescending({ iso: '2013-05-10T01:00' }, { iso: '2013-05-10T00:01' }))
            .toEqual(-1);
    });
});

describe('determine difference between two EventDateTime dates', () =>
{
    test('difference in hours', () =>
    {
        expect(DateUtility.determineDifferenceInHours({ iso: '2000-12-15T10:00Z' }, { iso: '2000-12-15T10:00Z' }))
            .toEqual(0);
        expect(DateUtility.determineDifferenceInHours({ iso: '2000-12-15T10:00Z' }, { iso: '2000-12-15T11:00Z' }))
            .toEqual(1);
        expect(DateUtility.determineDifferenceInHours({ iso: '2000-12-15T10:00Z' }, { iso: '2000-12-15T15:00Z' }))
            .toEqual(5);
        expect(DateUtility.determineDifferenceInHours({ iso: '2000-12-15T10:00Z' }, { iso: '2000-12-15T23:00Z' }))
            .toEqual(13);
        expect(DateUtility.determineDifferenceInHours({ iso: '2000-12-15T10:00Z' }, { iso: '2000-12-16T10:00Z' }))
            .toEqual(24);
        expect(DateUtility.determineDifferenceInHours({ iso: '2000-12-15T10:00Z' }, { iso: '2000-12-20T10:00Z' }))
            .toEqual(120);

        expect(DateUtility.determineDifferenceInHours({ iso: '2000-12-15T11:00Z' }, { iso: '2000-12-15T10:00Z' }))
            .toEqual(-1);
        expect(DateUtility.determineDifferenceInHours({ iso: '2000-12-15T11:00Z' }, { iso: '2000-12-10T11:00Z' }))
            .toEqual(-120);

        expect(() => DateUtility.determineDifferenceInHours({ iso: '2000-12-15' }, { iso: '2000-12-20' }))
            .toThrow(new Error('fromDate and toDate Precision must be Precision.Minute'));
        expect(() => DateUtility.determineDifferenceInHours({ iso: '2000-12-15T10:00Z' }, { iso: '2000-12-20' }))
            .toThrow(new Error('fromDate and toDate Precision must be Precision.Minute'));
        expect(() => DateUtility.determineDifferenceInHours({ iso: '2000-12-15' }, { iso: '2000-12-20T11:00Z' }))
            .toThrow(new Error('fromDate and toDate Precision must be Precision.Minute'));
        expect(() => DateUtility.determineDifferenceInHours({ iso: '2000-12' }, { iso: '2000-12-20T11:00Z' }))
            .toThrow(new Error('fromDate and toDate Precision must be Precision.Minute'));
        expect(() => DateUtility.determineDifferenceInHours({ iso: '2000-12-20T11:00Z' }, { iso: '2000' }))
            .toThrow(new Error('fromDate and toDate Precision must be Precision.Minute'));
    });

    test('difference in days', () =>
    {
        expect(DateUtility.determineDifferenceInDays({ iso: '2001-02-11' }, { iso: '2001-02-11T23:30Z' }))
            .toEqual(0);
        expect(DateUtility.determineDifferenceInDays({ iso: '2001-02-11' }, { iso: '2001-02-12' }))
            .toEqual(1);
        expect(DateUtility.determineDifferenceInDays({ iso: '2001-02-11' }, { iso: '2001-02-12T23:30Z' }))
            .toEqual(1);
        expect(DateUtility.determineDifferenceInDays({ iso: '2001-02-11' }, { iso: '2001-02-16' }))
            .toEqual(5);
        expect(DateUtility.determineDifferenceInDays({ iso: '2001-02-11' }, { iso: '2001-02-26' }))
            .toEqual(15);
        expect(DateUtility.determineDifferenceInDays({ iso: '2001-02-11T23:30Z' }, { iso: '2001-02-26' }))
            .toEqual(15);
        expect(DateUtility.determineDifferenceInDays({ iso: '2001-02-11' }, { iso: '2001-04-01' }))
            .toEqual(49);
        expect(
            DateUtility.determineDifferenceInDays({ iso: '2001-02-11T23:30Z' }, { iso: '2001-04-01T23:29Z' }))
            .toEqual(49);

        expect(DateUtility.determineDifferenceInDays({ iso: '2000-12-15' }, { iso: '2000-12-14' }))
            .toEqual(-1);
        expect(DateUtility.determineDifferenceInDays({ iso: '2000-12-15' }, { iso: '2000-12-01' }))
            .toEqual(-14);

        expect(() => DateUtility.determineDifferenceInDays({ iso: '2000-12' }, { iso: '2000-12-20' }))
            .toThrow(new Error('fromDate and toDate Precision must be Precision.Day or higher.'));
        expect(() => DateUtility.determineDifferenceInDays({ iso: '2000-12-15' }, { iso: '2000-12' }))
            .toThrow(new Error('fromDate and toDate Precision must be Precision.Day or higher.'));
        expect(() => DateUtility.determineDifferenceInDays({ iso: '2000' }, { iso: '2000-12-20' }))
            .toThrow(new Error('fromDate and toDate Precision must be Precision.Day or higher.'));
        expect(() => DateUtility.determineDifferenceInDays({ iso: '2000-12-15' }, { iso: '2000' }))
            .toThrow(new Error('fromDate and toDate Precision must be Precision.Day or higher.'));
    });

    test('difference in months', () =>
    {
        expect(DateUtility.determineDifferenceInMonths({ iso: '2020-05-10' }, { iso: '2020-05-10' }))
            .toEqual(0);
        expect(DateUtility.determineDifferenceInMonths({ iso: '2020-05-10' }, { iso: '2020-06-09' }))
            .toEqual(0);
        expect(DateUtility.determineDifferenceInMonths({ iso: '2020-05-10' }, { iso: '2020-06-10' }))
            .toEqual(1);
        expect(DateUtility.determineDifferenceInMonths({ iso: '2020-05-10T12:30Z' }, { iso: '2020-06-10' }))
            .toEqual(1);
        expect(DateUtility.determineDifferenceInMonths({ iso: '2020-05-10T12:30Z' }, { iso: '2021-02-10T12:30Z' }))
            .toEqual(9);

        expect(DateUtility.determineDifferenceInMonths({ iso: '2020-06-01' }, { iso: '2020-05-01' }))
            .toEqual(-1);
        expect(DateUtility.determineDifferenceInMonths({ iso: '2020-07-01' }, { iso: '2020-05-01' }))
            .toEqual(-2);
        expect(DateUtility.determineDifferenceInMonths({ iso: '2022-05-10' }, { iso: '2020-05-09' }))
            .toEqual(-24);

        expect(() => DateUtility.determineDifferenceInMonths({ iso: '2000-12' }, { iso: '2000-12-20' }))
            .toThrow(new Error('fromDate and toDate Precision must be Precision.Day or higher.'));
        expect(() => DateUtility.determineDifferenceInMonths({ iso: '2000-12-15' }, { iso: '2000-12' }))
            .toThrow(new Error('fromDate and toDate Precision must be Precision.Day or higher.'));
        expect(() => DateUtility.determineDifferenceInMonths({ iso: '2000' }, { iso: '2000-12-20' }))
            .toThrow(new Error('fromDate and toDate Precision must be Precision.Day or higher.'));
        expect(() => DateUtility.determineDifferenceInMonths({ iso: '2000-12-15' }, { iso: '2000' }))
            .toThrow(new Error('fromDate and toDate Precision must be Precision.Day or higher.'));
    });

    test('difference in years', () =>
    {
        expect(DateUtility.determineDifferenceInYears({ iso: '2020-01-02' }, { iso: '2021-01-01' }))
            .toEqual(0);
        expect(DateUtility.determineDifferenceInYears({ iso: '2020-01-02' }, { iso: '2021-01-02' }))
            .toEqual(1);
        expect(DateUtility.determineDifferenceInYears({ iso: '2020-01-02' }, { iso: '2021-01-02T12:30Z' }))
            .toEqual(1);
        expect(DateUtility.determineDifferenceInYears({ iso: '2020-01-01' }, { iso: '2023-06-20' }))
            .toEqual(3);
        expect(DateUtility.determineDifferenceInYears({ iso: '2020-01-01' }, { iso: '2033-12-25' }))
            .toEqual(13);

        expect(DateUtility.determineDifferenceInYears({ iso: '2020-09-06' }, { iso: '2018-01-02' }))
            .toEqual(-2);
        expect(DateUtility.determineDifferenceInYears({ iso: '2020-09-06' }, { iso: '2010-01-02' }))
            .toEqual(-10);

        expect(() => DateUtility.determineDifferenceInMonths({ iso: '2000-12' }, { iso: '2000-12-20' }))
            .toThrow(new Error('fromDate and toDate Precision must be Precision.Day or higher.'));
        expect(() => DateUtility.determineDifferenceInMonths({ iso: '2000-12-15' }, { iso: '2000-12' }))
            .toThrow(new Error('fromDate and toDate Precision must be Precision.Day or higher.'));
        expect(() => DateUtility.determineDifferenceInMonths({ iso: '2000' }, { iso: '2000-12-20' }))
            .toThrow(new Error('fromDate and toDate Precision must be Precision.Day or higher.'));
        expect(() => DateUtility.determineDifferenceInMonths({ iso: '2000-12-15' }, { iso: '2000' }))
            .toThrow(new Error('fromDate and toDate Precision must be Precision.Day or higher.'));
    });
});

describe('Adding to date', () =>
{
    test('addDays', () =>
    {
        expect(DateUtility.addDays({ iso: '2030-12-25T22:00' }, 0))
            .toEqual({ iso: '2030-12-25T22:00+11' });
        expect(DateUtility.addDays({ iso: '2030-12-25T22:00' }, 1))
            .toEqual({ iso: '2030-12-26T22:00+11' });
        expect(DateUtility.addDays({ iso: '2030-12-25' }, 0))
            .toEqual({ iso: '2030-12-25' });
        expect(DateUtility.addDays({ iso: '2030-12-25' }, 1))
            .toEqual({ iso: '2030-12-26' });
        expect(DateUtility.addDays({ iso: '2030-12-25' }, 6))
            .toEqual({ iso: '2030-12-31' });
        expect(DateUtility.addDays({ iso: '2030-12-25' }, 100))
            .toEqual({ iso: '2031-04-04' });
        expect(DateUtility.addDays({ iso: '2030-12-25' }, 365))
            .toEqual({ iso: '2031-12-25' });

        expect(DateUtility.addDays({ iso: '2030-12-25' }, -1))
            .toEqual({ iso: '2030-12-24' });
        expect(DateUtility.addDays({ iso: '2030-12-25' }, -50))
            .toEqual({ iso: '2030-11-05' });

        expect(() => DateUtility.addDays({ iso: '2030' }, 1))
            .toThrow(new Error('Value EventDateTime Precision is expected to be Precision.Day or higher.'));
        expect(() => DateUtility.addDays({ iso: '2030-12' }, -1))
            .toThrow(new Error('Value EventDateTime Precision is expected to be Precision.Day or higher.'));
    });

    test('addMonths', () =>
    {
        expect(DateUtility.addMonths({ iso: '2020-12-25T22:00' }, 0))
            .toEqual({ iso: '2020-12-25T22:00+11' });
        expect(DateUtility.addMonths({ iso: '2020-12-25' }, 0))
            .toEqual({ iso: '2020-12-25' });
        expect(DateUtility.addMonths({ iso: '2020-12' }, 0))
            .toEqual({ iso: '2020-12' });
        expect(DateUtility.addMonths({ iso: '2020-12-25' }, 1))
            .toEqual({ iso: '2021-01-25' });
        expect(DateUtility.addMonths({ iso: '2020-12-25' }, 3))
            .toEqual({ iso: '2021-03-25' });
        expect(DateUtility.addMonths({ iso: '2020-12-25' }, 7))
            .toEqual({ iso: '2021-07-25' });
        expect(DateUtility.addMonths({ iso: '2020-12-25' }, 14))
            .toEqual({ iso: '2022-02-25' });
        expect(DateUtility.addMonths({ iso: '2020-12' }, 10))
            .toEqual({ iso: '2021-10' });

        expect(DateUtility.addMonths({ iso: '2020-12-25T12:34' }, -1))
            .toEqual({ iso: '2020-11-25T12:34+11' });
        expect(DateUtility.addMonths({ iso: '2020-12-25' }, -1))
            .toEqual({ iso: '2020-11-25' });
        expect(DateUtility.addMonths({ iso: '2020-12-25' }, -10))
            .toEqual({ iso: '2020-02-25' });

        expect(DateUtility.addMonths({ iso: '2020-12' }, -14))
            .toEqual({ iso: '2019-10' });
        expect(DateUtility.addMonths({ iso: '2020-12' }, -5))
            .toEqual({ iso: '2020-07' });

        expect(() => DateUtility.addMonths({ iso: '2020' }, 1))
            .toThrow(new Error('Value EventDateTime Precision is expected to be Precision.Month or higher.'));
    });

    test('addYears', () =>
    {
        expect(DateUtility.addYears({ iso: '2010-06-01T22:00' }, 0))
            .toEqual({ iso: '2010-06-01T22:00+10' });
        expect(DateUtility.addYears({ iso: '2010-06-01T22:00' }, 1))
            .toEqual({ iso: '2011-06-01T22:00+10' });
        expect(DateUtility.addYears({ iso: '2010-06-01' }, 1))
            .toEqual({ iso: '2011-06-01' });
        expect(DateUtility.addYears({ iso: '2010-06-01' }, 3))
            .toEqual({ iso: '2013-06-01' });
        expect(DateUtility.addYears({ iso: '2010-06-01' }, 9))
            .toEqual({ iso: '2019-06-01' });
        expect(DateUtility.addYears({ iso: '2010-06' }, 4))
            .toEqual({ iso: '2014-06' });
        expect(DateUtility.addYears({ iso: '2010-06' }, 8))
            .toEqual({ iso: '2018-06' });
        expect(DateUtility.addYears({ iso: '2010-06' }, 12))
            .toEqual({ iso: '2022-06' });
        expect(DateUtility.addYears({ iso: '2010' }, 0))
            .toEqual({ iso: '2010' });
        expect(DateUtility.addYears({ iso: '2010' }, 2))
            .toEqual({ iso: '2012' });
        expect(DateUtility.addYears({ iso: '2010' }, 5))
            .toEqual({ iso: '2015' });

        expect(DateUtility.addYears({ iso: '2010-06-01T22:00' }, -7))
            .toEqual({ iso: '2003-06-01T22:00+10' });
        expect(DateUtility.addYears({ iso: '2010-06-01T22:00' }, -15))
            .toEqual({ iso: '1995-06-01T22:00+10' });
        expect(DateUtility.addYears({ iso: '2010-06-01' }, -1))
            .toEqual({ iso: '2009-06-01' });
        expect(DateUtility.addYears({ iso: '2010-06-01' }, -16))
            .toEqual({ iso: '1994-06-01' });
        expect(DateUtility.addYears({ iso: '2010-06' }, -2))
            .toEqual({ iso: '2008-06' });
        expect(DateUtility.addYears({ iso: '2010-06' }, -8))
            .toEqual({ iso: '2002-06' });
        expect(DateUtility.addYears({ iso: '2010' }, -3))
            .toEqual({ iso: '2007' });
        expect(DateUtility.addYears({ iso: '2010' }, -4))
            .toEqual({ iso: '2006' });
    });
});

describe('createEventDateTime', () =>
{
    test('creating year precision EventDateTime', () =>
    {
        expect(DateUtility.createEventDateTime(2000))
            .toEqual({ iso: '2000' });
        expect(DateUtility.createEventDateTime(2020))
            .toEqual({ iso: '2020' });

        expect(() => DateUtility.createEventDateTime(900))
            .toThrow(new Error('Invalid parameters passed to createEventDateTime.'));
    });

    test('creating month precision EventDateTime', () =>
    {
        expect(DateUtility.createEventDateTime(2020, 1))
            .toEqual({ iso: '2020-01' });
        expect(DateUtility.createEventDateTime(2020, 8))
            .toEqual({ iso: '2020-08' });
        expect(DateUtility.createEventDateTime(2010, 12))
            .toEqual({ iso: '2010-12' });

        expect(() => DateUtility.createEventDateTime(2026, -5))
            .toThrow(new Error('Invalid parameters passed to createEventDateTime.'));
        expect(() => DateUtility.createEventDateTime(2026, 0))
            .toThrow(new Error('Invalid parameters passed to createEventDateTime.'));
        expect(() => DateUtility.createEventDateTime(2019, 13))
            .toThrow(new Error('Invalid parameters passed to createEventDateTime.'));
    });

    test('creating day precision EventDateTime', () =>
    {
        expect(DateUtility.createEventDateTime(2020, 2, 29))
            .toEqual({ iso: '2020-02-29' });
        expect(DateUtility.createEventDateTime(2021, 12, 25))
            .toEqual({ iso: '2021-12-25' });

        expect(() => DateUtility.createEventDateTime(2021, 2, 0))
            .toThrow(new Error('Invalid parameters passed to createEventDateTime.'));
        expect(() => DateUtility.createEventDateTime(2021, 2, 29))
            .toThrow(new Error('Invalid parameters passed to createEventDateTime.'));
        expect(() => DateUtility.createEventDateTime(2026, -5))
            .toThrow(new Error('Invalid parameters passed to createEventDateTime.'));
        expect(() => DateUtility.createEventDateTime(2026, 0))
            .toThrow(new Error('Invalid parameters passed to createEventDateTime.'));
        expect(() => DateUtility.createEventDateTime(2019, 13))
            .toThrow(new Error('Invalid parameters passed to createEventDateTime.'));
    });
});

/*
    Daylight Saving Time begins at 2am on the first Sunday in October, when clocks are put forward one hour.
    It ends at 3am Daylight Saving Time on the first Sunday in April, when clocks are put back one hour.

    In Australia, Daylight saving is observed in New South Wales, Victoria, South Australia, Tasmania,
    the Australian Capital Territory and Norfolk Island.

    Daylight saving is not observed in Queensland, the Northern Territory, Western Australia, Christmas Island or
    the Cocos (Keeling) Islands.
    https://info.australia.gov.au/about-australia/facts-and-figures/time-zones-and-daylight-saving
 */
describe('Joining an EventDateTime Precision Day or higher with a time and timezone', () =>
{
    test('Australia/Adelaide', () =>
    {
        expect(DateUtility.joinTimeToDay({ iso: '2020-12-25' }, '00:00', 'Australia/Adelaide'))
            .toEqual({ iso: '2020-12-25T00:00+10:30' });
        expect(DateUtility.joinTimeToDay({ iso: '2021-01-24' }, '10:00', 'Australia/Adelaide'))
            .toEqual({ iso: '2021-01-24T10:00+10:30' });
        expect(DateUtility.joinTimeToDay({ iso: '2021-01-24T10:30' }, '22:30', 'Australia/Adelaide'))
            .toEqual({ iso: '2021-01-24T22:30+10:30' });

        expect(DateUtility.joinTimeToDay({ iso: '2021-04-04' }, '02:59', 'Australia/Adelaide'))
            .toEqual({ iso: '2021-04-04T02:59+10:30' });
        expect(DateUtility.joinTimeToDay({ iso: '2021-04-04' }, '03:00', 'Australia/Adelaide'))
            .toEqual({ iso: '2021-04-04T03:00+09:30' });

        expect(DateUtility.joinTimeToDay({ iso: '2021-10-03' }, '01:59', 'Australia/Adelaide'))
            .toEqual({ iso: '2021-10-03T01:59+09:30' });
        expect(DateUtility.joinTimeToDay({ iso: '2021-10-03' }, '03:00', 'Australia/Adelaide'))
            .toEqual({ iso: '2021-10-03T03:00+10:30' });
    });

    test('Australia/Melbourne', () =>
    {
        expect(DateUtility.joinTimeToDay({ iso: '2020-12-25' }, '00:00', 'Australia/Melbourne'))
            .toEqual({ iso: '2020-12-25T00:00+11' });
        expect(DateUtility.joinTimeToDay({ iso: '2021-01-24' }, '01:23', 'Australia/Melbourne'))
            .toEqual({ iso: '2021-01-24T01:23+11' });
        expect(DateUtility.joinTimeToDay({ iso: '2021-01-24T10:30' }, '01:23', 'Australia/Melbourne'))
            .toEqual({ iso: '2021-01-24T01:23+11' });

        expect(DateUtility.joinTimeToDay({ iso: '2021-04-04' }, '02:59', 'Australia/Melbourne'))
            .toEqual({ iso: '2021-04-04T02:59+11' });
        expect(DateUtility.joinTimeToDay({ iso: '2021-04-04' }, '03:00', 'Australia/Melbourne'))
            .toEqual({ iso: '2021-04-04T03:00+10' });

        expect(DateUtility.joinTimeToDay({ iso: '2021-10-03' }, '01:59', 'Australia/Melbourne'))
            .toEqual({ iso: '2021-10-03T01:59+10' });
        expect(DateUtility.joinTimeToDay({ iso: '2021-10-03' }, '03:00', 'Australia/Melbourne'))
            .toEqual({ iso: '2021-10-03T03:00+11' });
    });

    test('Australia/Queensland', () =>
    {
        expect(DateUtility.joinTimeToDay({ iso: '2020-12-25' }, '00:00', 'Australia/Queensland'))
            .toEqual({ iso: '2020-12-25T00:00+10' });
        expect(DateUtility.joinTimeToDay({ iso: '2021-01-24' }, '01:23', 'Australia/Queensland'))
            .toEqual({ iso: '2021-01-24T01:23+10' });
        expect(DateUtility.joinTimeToDay({ iso: '2021-01-24T10:30' }, '01:23', 'Australia/Queensland'))
            .toEqual({ iso: '2021-01-24T01:23+10' });

        expect(DateUtility.joinTimeToDay({ iso: '2021-04-04' }, '02:59', 'Australia/Queensland'))
            .toEqual({ iso: '2021-04-04T02:59+10' });
        expect(DateUtility.joinTimeToDay({ iso: '2021-04-04' }, '03:00', 'Australia/Queensland'))
            .toEqual({ iso: '2021-04-04T03:00+10' });

        expect(DateUtility.joinTimeToDay({ iso: '2021-10-03' }, '01:59', 'Australia/Queensland'))
            .toEqual({ iso: '2021-10-03T01:59+10' });
        expect(DateUtility.joinTimeToDay({ iso: '2021-10-03' }, '03:00', 'Australia/Queensland'))
            .toEqual({ iso: '2021-10-03T03:00+10' });
    });

    test('Australia/Sydney', () =>
    {
        expect(DateUtility.joinTimeToDay({ iso: '2020-12-25' }, '00:00', 'Australia/Sydney'))
            .toEqual({ iso: '2020-12-25T00:00+11' });
        expect(DateUtility.joinTimeToDay({ iso: '2021-01-24' }, '01:23', 'Australia/Sydney'))
            .toEqual({ iso: '2021-01-24T01:23+11' });
        expect(DateUtility.joinTimeToDay({ iso: '2021-01-24T10:30' }, '01:23', 'Australia/Sydney'))
            .toEqual({ iso: '2021-01-24T01:23+11' });

        expect(DateUtility.joinTimeToDay({ iso: '2021-04-04' }, '02:59', 'Australia/Sydney'))
            .toEqual({ iso: '2021-04-04T02:59+11' });
        expect(DateUtility.joinTimeToDay({ iso: '2021-04-04' }, '03:00', 'Australia/Sydney'))
            .toEqual({ iso: '2021-04-04T03:00+10' });

        expect(DateUtility.joinTimeToDay({ iso: '2021-10-03' }, '01:59', 'Australia/Sydney'))
            .toEqual({ iso: '2021-10-03T01:59+10' });
        expect(DateUtility.joinTimeToDay({ iso: '2021-10-03' }, '03:00', 'Australia/Sydney'))
            .toEqual({ iso: '2021-10-03T03:00+11' });
    });
});

describe('Extraction of information about an EventDateTime', () =>
{
    test('Time extraction', () =>
    {
        expect(DateUtility.extractTime({ iso: '2021-01-28T10:00+11' }, Locales.AUSTRALIA))
            .toEqual('10:00');

        expect(DateUtility.extractTime(null, Locales.AUSTRALIA))
            .toEqual(null);
        expect(DateUtility.extractTime({ iso: '2021-01-28' }, Locales.AUSTRALIA))
            .toEqual(null);
        expect(DateUtility.extractTime({ iso: '2021-01' }, Locales.AUSTRALIA))
            .toEqual(null);
        expect(DateUtility.extractTime({ iso: '2021' }, Locales.AUSTRALIA))
            .toEqual(null);
    });

    test('Time extraction', () =>
    {
        expect(DateUtility.extractYear({ iso: '2021-01-28T10:00+11' }, Locales.AUSTRALIA))
            .toEqual('2021');
        expect(DateUtility.extractYear({ iso: '2021-01-28' }, Locales.AUSTRALIA))
            .toEqual('2021');
        expect(DateUtility.extractYear({ iso: '2021-01' }, Locales.AUSTRALIA))
            .toEqual('2021');
        expect(DateUtility.extractYear({ iso: '2021' }, Locales.AUSTRALIA))
            .toEqual('2021');

        expect(DateUtility.extractYear(null, Locales.AUSTRALIA))
            .toEqual(null);
    });
});

test('Validate EventDateTime ISO string', () =>
{
    expect(DateUtility.isValidEventDateTimeISO('2020'))
        .toEqual(true);
    expect(DateUtility.isValidEventDateTimeISO('2020-01'))
        .toEqual(true);
    expect(DateUtility.isValidEventDateTimeISO('2020-01-10'))
        .toEqual(true);
    expect(DateUtility.isValidEventDateTimeISO('2020-02-29'))
        .toEqual(true);
    expect(DateUtility.isValidEventDateTimeISO('2020-01-10T10:30+10'))
        .toEqual(true);

    expect(DateUtility.isValidEventDateTimeISO('20205'))
        .toEqual(false);
    expect(DateUtility.isValidEventDateTimeISO('2020-13'))
        .toEqual(false);
    expect(DateUtility.isValidEventDateTimeISO('2020-13-10'))
        .toEqual(false);
    expect(DateUtility.isValidEventDateTimeISO('2020-01-32'))
        .toEqual(false);
    expect(DateUtility.isValidEventDateTimeISO('2021-02-29'))
        .toEqual(false);
    expect(DateUtility.isValidEventDateTimeISO('2020-13-10T10T10:30+10'))
        .toEqual(false);
    expect(DateUtility.isValidEventDateTimeISO('2020-12-10T24:30+10'))
        .toEqual(false);
});
