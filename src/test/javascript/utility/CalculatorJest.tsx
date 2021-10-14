import {
    calculateBMI, calculateDifferenceInDays, calculateDifferenceInHours, calculateDifferenceInMonths, calculatorFactory
} from 'main/utility/Calculator';
import FieldCalculationType from 'smarthealth-javascript/FieldCalculationType';

/**
 * Jest for Calculator
 *
 * @author Thompson 19/09/2019
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2019
 */
describe('calculate, FieldCalculationType.Hours', () =>
{
    test('correct difference in hours', () =>
    {
        expect(calculateDifferenceInHours([{ iso: '2012-01-01' }, { iso: '2020-01-01' }]))
            .toEqual(null);
        expect(calculateDifferenceInHours([{ iso: '2020-01-02' }, { iso: '2020-01-02T09:25' }]))
            .toEqual(null);
        expect(calculateDifferenceInHours([{ iso: '2007-03-05T12:25' }, { iso: '2020-01' }]))
            .toEqual(null);
        expect(calculateDifferenceInHours([{ iso: '2007-03-05T12:25' }, { iso: '2020' }]))
            .toEqual(null);
        expect(calculateDifferenceInHours([{ iso: '2016' }, { iso: '2014-08-19T12:25' }]))
            .toEqual(null);
        expect(calculateDifferenceInHours([{ iso: '2020-01-02T00:00' }, { iso: '2020-01-02T09:25' }]))
            .toEqual(9);
        expect(calculateDifferenceInHours([{ iso: '2020-02-20T18:06' }, { iso: '2020-04-01T22:25' }]))
            .toEqual(988);
        expect(calculateDifferenceInHours(
            [{ iso: '2020-01-03T13:25+10' }, { iso: '2020-01-02T09:25+11' }]))
            .toEqual(-29);
        expect(calculateDifferenceInHours(
            [{ iso: '2020-01-01T08:25+11' }, { iso: '2020-01-02T09:25+11' }]))
            .toEqual(25);
        expect(calculateDifferenceInHours(
            [{ iso: '2020-03-18T23:59+11' }, { iso: '2020-04-02T09:25+11' }]))
            .toEqual(345);
    });

    test('calculatorFactory', () =>
    {
        expect(calculatorFactory(FieldCalculationType.DIFFERENCE_IN_HOURS)(
            [{ iso: '2020-01-02T00:00' }, { iso: '2020-01-02T09:25' }]))
            .toEqual(9);
    });
});

describe('calculate, FieldCalculationType.DIFFERENCE_IN_DAYS ', () =>
{
    test('calculate day difference for one day apart', () =>
    {
        expect(calculateDifferenceInDays([{ iso: '1998-12-31' }, { iso: '1999-01-01' }]))
            .toEqual(1);
    });

    test('0 day difference return null', () =>
    {
        expect(calculateDifferenceInDays([{ iso: '2020-01-01' }, { iso: '2020-01-01' }]))
            .toEqual(null);
    });

    test('calculate day difference for dates in same month', () =>
    {
        expect(calculateDifferenceInDays([{ iso: '1998-12-31' }, { iso: '1999-01-31' }]))
            .toEqual(31);
    });

    test('calculate day difference for dates 3 month apart', () =>
    {
        expect(calculateDifferenceInDays([{ iso: '1998-12-31' }, { iso: '1999-03-31' }]))
            .toEqual(90);
    });

    test('calculate day difference for dates 4 month apart', () =>
    {
        expect(calculateDifferenceInDays([{ iso: '1998-12-31' }, { iso: '1999-04-30' }]))
            .toEqual(120);
    });

    test('calculate day difference for dates 5 month apart', () =>
    {
        expect(calculateDifferenceInDays([{ iso: '1998-12-31' }, { iso: '1999-05-31' }]))
            .toEqual(151);
    });

    test('calculate day difference for dates 6 month apart', () =>
    {
        expect(calculateDifferenceInDays([{ iso: '1998-12-31' }, { iso: '1999-06-30' }]))
            .toEqual(181);
    });

    test('calculate day difference with different valid precision value', () =>
    {
        expect(calculateDifferenceInDays([{ iso: '2027-05-01T00:00' }, { iso: '2027-05-02T23:59' }]))
            .toEqual(1);
        expect(calculateDifferenceInDays([{ iso: '2017-05-01' }, { iso: '2017-05-02T13:19' }]))
            .toEqual(1);
    });

    test('calculate day difference for normal year', () =>
    {
        expect(calculateDifferenceInDays([{ iso: '2018-12-31' }, { iso: '2019-12-31' }]))
            .toEqual(365);
    });

    test('calculate day difference for leap year', () =>
    {
        expect(calculateDifferenceInDays([{ iso: '2019-12-31' }, { iso: '2020-12-31' }]))
            .toEqual(366);
    });

    test('calculate day difference over 2 none leap years', () =>
    {
        expect(calculateDifferenceInDays([{ iso: '2017-12-31' }, { iso: '2019-12-31' }]))
            .toEqual(730);
    });

    test('startDate > endDate return null', () =>
    {
        expect(calculateDifferenceInDays([{ iso: '2019-06-05' }, { iso: '2019-06-01' }]))
            .toEqual(null);
    });

    test('return null if one of the value is a string', () =>
    {
        expect(calculateDifferenceInDays(['24/01/2020', '05/03/2020']))
            .toEqual(null);
        expect(calculateDifferenceInDays(['05/12/2014', { iso: '2002-01-06' }]))
            .toEqual(null);
        expect(calculateDifferenceInDays([{ iso: '2012-10-18' }, '06/2009']))
            .toEqual(null);
    });

    test('return null if one of the value is a Date object', () =>
    {
        expect(calculateDifferenceInDays([new Date(), { iso: '2001-01-01' }]))
            .toEqual(null);
        expect(calculateDifferenceInDays([new Date('2020-06-15'), { iso: '2001-01-01' }]))
            .toEqual(null);
        expect(calculateDifferenceInDays([{ iso: '2001-01-01' }, new Date('2002')]))
            .toEqual(null);
        expect(calculateDifferenceInDays([new Date('December 17, 1995 03:24:00'), { iso: '2001-01-01' }]))
            .toEqual(null);
        expect(calculateDifferenceInDays([new Date('December 17, 1995 03:24:00'), '02/06/2019']))
            .toEqual(null);
    });

    test('calculate day difference without a precision Day or above', () =>
    {
        expect(() => calculateDifferenceInDays([{ iso: '2018' }, { iso: '2019' }]))
            .toThrow(new Error('2018 - precision must be at least Day'));
        expect(() => calculateDifferenceInDays([{ iso: '2018-01' }, { iso: '2019-09' }]))
            .toThrow(new Error('2018-01 - precision must be at least Day'));
    });
});

describe('FieldCalculationType.DIFFERENCE_IN_MONTHS', () =>
{
    test('calculate month difference with different valid precision value', () =>
    {
        expect(calculateDifferenceInMonths([{ iso: '2027-04-01T00:00' }, { iso: '2027-05-02T23:59' }]))
            .toEqual(1);
        expect(calculateDifferenceInMonths([{ iso: '2017-06' }, { iso: '2017-09-02T23:59' }]))
            .toEqual(3);
        expect(calculateDifferenceInMonths([{ iso: '2012-06' }, { iso: '2013-06-28T15:00' }]))
            .toEqual(12);
        expect(calculateDifferenceInMonths([{ iso: '2012-06' }, { iso: '2015-06-28T15:00' }]))
            .toEqual(36);
    });

    test('0 month difference return null', () =>
    {
        expect(calculateDifferenceInMonths([{ iso: '2019-06-05' }, { iso: '2019-06-27' }]))
            .toEqual(null);
        expect(calculateDifferenceInMonths([{ iso: '2019-12-05' }, { iso: '2019-12-27' }]))
            .toEqual(null);
        expect(calculateDifferenceInMonths([{ iso: '2019-01-05' }, { iso: '2019-01-27' }]))
            .toEqual(null);
        expect(calculateDifferenceInMonths([{ iso: '2019-06' }, { iso: '2019-06' }]))
            .toEqual(null);
        expect(calculateDifferenceInMonths([{ iso: '2019-12' }, { iso: '2019-12' }]))
            .toEqual(null);
        expect(calculateDifferenceInMonths([{ iso: '2019-01' }, { iso: '2019-01' }]))
            .toEqual(null);
    });

    test('calculate month difference over 1 year', () =>
    {
        expect(calculateDifferenceInMonths([{ iso: '2019-03-05' }, { iso: '2019-07-01' }]))
            .toEqual(4);
        expect(calculateDifferenceInMonths([{ iso: '2019-01-01' }, { iso: '2019-04-28' }]))
            .toEqual(3);
        expect(calculateDifferenceInMonths([{ iso: '2019-06-28' }, { iso: '2019-12-01' }]))
            .toEqual(6);
    });

    test('calculate month difference over 2 years', () =>
    {
        expect(calculateDifferenceInMonths([{ iso: '2018-06-05' }, { iso: '2019-09-01' }]))
            .toEqual(15);
        expect(calculateDifferenceInMonths([{ iso: '2010-03-01' }, { iso: '2011-04-28' }]))
            .toEqual(13);
        expect(calculateDifferenceInMonths([{ iso: '2002-02-28' }, { iso: '2003-12-01' }]))
            .toEqual(22);
    });

    test('return null if startDate > endDate', () =>
    {
        expect(calculateDifferenceInMonths([{ iso: '2003-12-28' }, { iso: '2003-02-01' }]))
            .toEqual(null);
    });

    test('return null if one of the value is a string', () =>
    {
        expect(calculateDifferenceInMonths(['24/01/2020', '05/03/2020']))
            .toEqual(null);
        expect(calculateDifferenceInMonths(['05/12/2014', { iso: '2002-01-06' }]))
            .toEqual(null);
        expect(calculateDifferenceInMonths([{ iso: '2012-10-18' }, '06/2009']))
            .toEqual(null);
    });

    test('return null if one of the value is a Date object', () =>
    {
        expect(calculateDifferenceInMonths([new Date(), { iso: '2001-01-01' }]))
            .toEqual(null);
        expect(calculateDifferenceInMonths([new Date('2020-06-15'), { iso: '2001-01-01' }]))
            .toEqual(null);
        expect(calculateDifferenceInMonths([{ iso: '2001-01-01' }, new Date('2002')]))
            .toEqual(null);
        expect(calculateDifferenceInMonths(
            [new Date('December 17, 1995 03:24:00'), { iso: '2001-01-01' }]))
            .toEqual(null);
        expect(calculateDifferenceInMonths([new Date('December 17, 1995 03:24:00'), '02/06/2019']))
            .toEqual(null);
    });

    test('calculate month difference without precision Month or above', () =>
    {
        expect(() => calculateDifferenceInMonths([{ iso: '2018' }, { iso: '2019' }]))
            .toThrow(new Error('2018 - precision must be at least Month'));
    });
});

describe('calculate, FieldCalculationType.BMI', () =>
{
    test('return correct BMI value', () =>
    {
        expect(calculateBMI(['180', '30']))
            .toEqual(null);
        expect(calculateBMI([180, '30']))
            .toEqual(null);
        expect(calculateBMI(['180', 30]))
            .toEqual(null);
        expect(calculateBMI([null, null]))
            .toEqual(null);
        expect(calculateBMI([undefined, undefined]))
            .toEqual(null);
        expect(calculateBMI([180, null]))
            .toEqual(null);

        expect(calculateBMI([188, 30]))
            .toEqual(8.5);
        expect(calculateBMI([200, 85]))
            .toEqual(21.3);
        expect(calculateBMI([170, 70]))
            .toEqual(24.2);
        expect(calculateBMI([160, 100]))
            .toEqual(39.1);
        expect(calculateBMI([140, 39]))
            .toEqual(19.9);
    });
});
