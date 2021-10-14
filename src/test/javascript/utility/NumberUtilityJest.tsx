import NumberUtility from 'main/utility/NumberUtility';
import FieldEditState from 'smarthealth-javascript/FieldEditState';
import FormFieldNumber from 'smarthealth-javascript/FormFieldNumber';
import FormFieldType from 'smarthealth-javascript/FormFieldType';

/**
 * ToolTipUitily Jest
 *
 * @author Priyanka 27/02/2019
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2019
 */
describe('buildToolTip', () =>
{
    test('Accept Negative Numbers ', () =>
    {
        const field: FormFieldNumber = {
            id: 'field',
            label: 'Field',
            type: FormFieldType.Number,
            acceptNegative: true,
            precision: 5,
            scale: 2,
            state: { editState: FieldEditState.Enabled }
        };
        expect(NumberUtility.buildToolTip(field))
            .toEqual('-999.99 &le; value &le; 999.99');

    });
    test('Do Not Accept Negative Numbers ', () =>
    {
        const field: FormFieldNumber = {
            id: 'field',
            label: 'Field',
            type: FormFieldType.Number,
            acceptNegative: false,
            precision: 5,
            scale: 2,
            state: { editState: FieldEditState.Enabled }
        };
        expect(NumberUtility.buildToolTip(field))
            .toEqual('0 &le; value &le; 999.99');

    });
    test('With Precision 4 and scale 0', () =>
    {
        const field: FormFieldNumber = {
            id: 'field',
            label: 'Field',
            type: FormFieldType.Number,
            acceptNegative: false,
            precision: 4,
            scale: 0,
            state: { editState: FieldEditState.Enabled }
        };
        expect(NumberUtility.buildToolTip(field))
            .toEqual('0 &le; value &le; 9999');

    });
    test('With Precision 4 and scale 0 and accept negative', () =>
    {
        const field: FormFieldNumber = {
            id: 'field',
            label: 'Field',
            type: FormFieldType.Number,
            acceptNegative: true,
            precision: 4,
            scale: 0,
            state: { editState: FieldEditState.Enabled }
        };
        expect(NumberUtility.buildToolTip(field))
            .toEqual('-9999 &le; value &le; 9999');

    });
    test('With maximum value from formfieldnumber', () =>
    {
        const field: FormFieldNumber = {
            id: 'field',
            label: 'Field',
            type: FormFieldType.Number,
            acceptNegative: false,
            precision: 4,
            scale: 0,
            state: { editState: FieldEditState.Enabled },
            maximum: 20
        };
        expect(NumberUtility.buildToolTip(field))
            .toEqual('0 &le; value &le; 20');

    });
    test('With minimum value from formfieldnumber', () =>
    {
        const field: FormFieldNumber = {
            id: 'field',
            label: 'Field',
            type: FormFieldType.Number,
            acceptNegative: false,
            precision: 4,
            scale: 1,
            state: { editState: FieldEditState.Enabled },
            minimum: 20
        };
        expect(NumberUtility.buildToolTip(field))
            .toEqual('20 &le; value &le; 999.9');

    });
});

test('toNumber', () =>
{
    expect(NumberUtility.toNumber(null))
        .toBe(null);
    expect(NumberUtility.toNumber(undefined))
        .toBe(null);
    expect(NumberUtility.toNumber(''))
        .toBe(null);
    expect(NumberUtility.toNumber('  '))
        .toBe(null);
    expect(NumberUtility.toNumber('123'))
        .toBe(123);
    expect(NumberUtility.toNumber('21.54'))
        .toBe(21.54);
});

describe('toFixedLength', () =>
{
    test('round number to the nearest decimal place', () =>
    {
        expect(NumberUtility.toFixedLength(-13053.5465432, 0))
            .toEqual(-13054);
        expect(NumberUtility.toFixedLength(3053.5465432, 0))
            .toEqual(3054);
        expect(NumberUtility.toFixedLength(1.99, 1))
            .toEqual(2);
    });

    test('return whole number', () =>
    {
        expect(NumberUtility.toFixedLength(Math.PI, 0))
            .toEqual(3);
        expect(NumberUtility.toFixedLength(-13053.4465432, 0))
            .toEqual(-13053);
    });

    test('return digit decimal place', () =>
    {
        expect(NumberUtility.toFixedLength(24.453, 1))
            .toEqual(24.5);
        expect(NumberUtility.toFixedLength(375.9842135468415156, 2))
            .toEqual(375.98);
        expect(NumberUtility.toFixedLength(-10.493245, 5))
            .toEqual(-10.49324);
        expect(NumberUtility.toFixedLength(3.141592653589793238462, 20))
            .toEqual(3.14159265358979323846);
    });
});
