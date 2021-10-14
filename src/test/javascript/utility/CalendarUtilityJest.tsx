import CalendarUtility from 'main/utility/CalendarUtility';

/**
 * Jest for CalendarUtility
 *
 * @author Thompson 15/01/2021
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2021
 */
test('Month options list', () =>
{
    expect(CalendarUtility.MONTH_OPTIONS)
        .toEqual([
            { label: 'January', value: 1 },
            { label: 'February', value: 2 },
            { label: 'March', value: 3 },
            { label: 'April', value: 4 },
            { label: 'May', value: 5 },
            { label: 'June', value: 6 },
            { label: 'July', value: 7 },
            { label: 'August', value: 8 },
            { label: 'September', value: 9 },
            { label: 'October', value: 10 },
            { label: 'November', value: 11 },
            { label: 'December', value: 12 }
        ]);
});

test('Convert month number to month string', () =>
{
    expect(CalendarUtility.convertToMonth(1))
        .toEqual('January');
    expect(CalendarUtility.convertToMonth(6))
        .toEqual('June');
    expect(CalendarUtility.convertToMonth(12))
        .toEqual('December');

    expect(CalendarUtility.convertToMonth(null))
        .toEqual(undefined);
    expect(CalendarUtility.convertToMonth(0))
        .toEqual(undefined);
    expect(CalendarUtility.convertToMonth(13))
        .toEqual(undefined);
});

test('Number of days in a specific year and month', () =>
{
    expect(CalendarUtility.daysInMonth(2017, 1))
        .toEqual(31);
    expect(CalendarUtility.daysInMonth(2018, 6))
        .toEqual(30);

    expect(CalendarUtility.daysInMonth(2017, 1))
        .toEqual(31);
    expect(CalendarUtility.daysInMonth(2018, 6))
        .toEqual(30);
    expect(CalendarUtility.daysInMonth(2017, 1))
        .toEqual(31);
    expect(CalendarUtility.daysInMonth(2018, 6))
        .toEqual(30);
    expect(CalendarUtility.daysInMonth(2019, 2))
        .toEqual(28);
    // leap year month
    expect(CalendarUtility.daysInMonth(2020, 2))
        .toEqual(29);

    expect(() => CalendarUtility.daysInMonth(null, null))
        .toThrow(new Error('Invalid year or month'));
    expect(() => CalendarUtility.daysInMonth(2000, null))
        .toThrow(new Error('Invalid year or month'));
    expect(() => CalendarUtility.daysInMonth(null, 1))
        .toThrow(new Error('Invalid year or month'));
    expect(() => CalendarUtility.daysInMonth(2017, 0))
        .toThrow(new Error('Invalid year or month'));
    expect(() => CalendarUtility.daysInMonth(2017, 13))
        .toThrow(new Error('Invalid year or month'));
});

describe('addMonth', () =>
{
    test('increase month', () =>
    {
        expect(CalendarUtility.addMonth(1, 2008, 12))
            .toEqual({ year: 2009, month: 1 });
        expect(CalendarUtility.addMonth(5, 2008, 12))
            .toEqual({ year: 2009, month: 5 });
        expect(CalendarUtility.addMonth(1, 2007, 1))
            .toEqual({ year: 2007, month: 2 });
        expect(CalendarUtility.addMonth(8, 2007, 1))
            .toEqual({ year: 2007, month: 9 });
        expect(CalendarUtility.addMonth(1, 2007, 8))
            .toEqual({ year: 2007, month: 9 });

        expect(() => CalendarUtility.addMonth(1, null, null))
            .toThrow(new Error('Invalid year or month'));
        expect(() => CalendarUtility.addMonth(1, 2007, 0))
            .toThrow(new Error('Invalid year or month'));
        expect(() => CalendarUtility.addMonth(1, 2007, 13))
            .toThrow(new Error('Invalid year or month'));
    });

    test('decrease month', () =>
    {
        expect(CalendarUtility.addMonth(-1, 2008, 2))
            .toEqual({ year: 2008, month: 1 });
        expect(CalendarUtility.addMonth(-1, 2008, 1))
            .toEqual({ year: 2007, month: 12 });
        expect(CalendarUtility.addMonth(-7, 2008, 2))
            .toEqual({ year: 2007, month: 7 });
        expect(CalendarUtility.addMonth(-1, 2007, 8))
            .toEqual({ year: 2007, month: 7 });

        expect(() => CalendarUtility.addMonth(-1, null, null))
            .toThrow(new Error('Invalid year or month'));
        expect(() => CalendarUtility.addMonth(-1, 2007, 0))
            .toThrow(new Error('Invalid year or month'));
        expect(() => CalendarUtility.addMonth(-1, 2007, 13))
            .toThrow(new Error('Invalid year or month'));
    });
});

describe('Extract data from an EventDateTime', () =>
{
    test('extract date', () =>
    {
        expect(CalendarUtility.extractDateFromEventDateTime({ iso: '2021' }))
            .toEqual(null);
        expect(CalendarUtility.extractDateFromEventDateTime({ iso: '2021-12' }))
            .toEqual(null);
        expect(CalendarUtility.extractDateFromEventDateTime({ iso: '2021-12-25' }))
            .toEqual(25);
        expect(CalendarUtility.extractDateFromEventDateTime({ iso: '2021-12-25T12:34+10:00' }))
            .toEqual(25);

        expect(CalendarUtility.extractDateFromEventDateTime(null))
            .toEqual(null);
    });

    test('extract month', () =>
    {
        expect(CalendarUtility.extractMonthFromEventDateTime({ iso: '2021' }))
            .toEqual(null);
        expect(CalendarUtility.extractMonthFromEventDateTime({ iso: '2021-12' }))
            .toEqual(12);
        expect(CalendarUtility.extractMonthFromEventDateTime({ iso: '2021-12-25' }))
            .toEqual(12);
        expect(CalendarUtility.extractMonthFromEventDateTime({ iso: '2021-12-25T12:34+10:00' }))
            .toEqual(12);

        expect(CalendarUtility.extractMonthFromEventDateTime(null))
            .toEqual(null);
    });

    test('extract year', () =>
    {
        expect(CalendarUtility.extractYearFromEventDateTime({ iso: '2021' }))
            .toEqual(2021);
        expect(CalendarUtility.extractYearFromEventDateTime({ iso: '2021-12' }))
            .toEqual(2021);
        expect(CalendarUtility.extractYearFromEventDateTime({ iso: '2021-12-25' }))
            .toEqual(2021);
        expect(CalendarUtility.extractYearFromEventDateTime({ iso: '2021-12-25T12:34+10:00' }))
            .toEqual(2021);

        expect(CalendarUtility.extractYearFromEventDateTime(null))
            .toEqual(null);
    });
});
