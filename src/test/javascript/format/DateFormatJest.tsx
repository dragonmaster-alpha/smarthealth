import {formatAge, formatAgeDate} from 'main/format/DateFormat';
import EventDateTime from 'smarthealth-javascript/EventDateTime';

/**
 * Test DateFormat
 *
 * @author Larry 14/01/2019
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2019
 */
function edt(iso: string): EventDateTime
{
    return { iso };
}

test('Age in years', () =>
{
    expect(formatAgeDate(edt('1970-04-01'), edt('2019-01-01')))
        .toBe('48y');
    expect(formatAgeDate(edt('1970-04-01'), edt('2019-03-31')))
        .toBe('48y');
    expect(formatAgeDate(edt('1970-04-01'), edt('2019-04-01')))
        .toBe('49y');
    expect(formatAgeDate(edt('1970-04-01'), edt('2019-04-02')))
        .toBe('49y');
    expect(formatAgeDate(edt('1970-04-01'), edt('2019-12-25')))
        .toBe('49y');
});

test('Age in years EventDateTime', () =>
{
    expect(formatAge(edt('1970-04-01'), edt('2019-01-01')))
        .toBe('48y');
    expect(formatAge(edt('1970-04-01'), edt('2019-03-31')))
        .toBe('48y');
    expect(formatAge(edt('1970-04-01'), edt('2019-04-01')))
        .toBe('49y');
    expect(formatAge(edt('1970-04-01'), edt('2019-04-02')))
        .toBe('49y');
    expect(formatAge(edt('1970-04-01'), edt('2019-12-25')))
        .toBe('49y');
});

test('Age in months EventDateTime', () =>
{
    expect(formatAge(edt('2018-04-01'), edt('2019-01-01')))
        .toBe('9m');
    expect(formatAge(edt('2018-04-01'), edt('2019-03-31')))
        .toBe('11m');
    expect(formatAge(edt('2018-04-01'), edt('2019-04-01')))
        .toBe('12m');
    expect(formatAge(edt('2018-04-01'), edt('2019-04-02')))
        .toBe('12m');
    expect(formatAge(edt('2018-04-01'), edt('2019-08-18')))
        .toBe('16m');
    expect(formatAge(edt('2018-04-01'), edt('2019-12-25')))
        .toBe('20m');
    expect(formatAge(edt('2018-04-01'), edt('2020-01-01')))
        .toBe('21m');
    expect(formatAge(edt('2018-04-01'), edt('2020-04-01')))
        .toBe('2y');
});

test('Age in days EventDateTime', () =>
{
    expect(formatAge(edt('2019-01-14'), edt('2019-01-14')))
        .toBe('0d');
    expect(formatAge(edt('2019-01-14'), edt('2019-01-15')))
        .toBe('1d');
    expect(formatAge(edt('2019-01-14'), edt('2019-01-16')))
        .toBe('2d');
    expect(formatAge(edt('2019-01-14'), edt('2019-01-19')))
        .toBe('5d');
    expect(formatAge(edt('2019-01-14'), edt('2019-01-24')))
        .toBe('10d');
    expect(formatAge(edt('2019-01-14'), edt('2019-02-03')))
        .toBe('20d');
    expect(formatAge(edt('2019-01-14'), edt('2019-02-14')))
        .toBe('1m');
});
