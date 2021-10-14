import {
    formatHealthCareCardNumber, formatMedicareNumber, validateCFAustraliaID, validateHealthCareCardNumber,
    validateMedicareNumber
} from 'main/format/IdentifierFormat';

/**
 * Jest for IdentifierFormat.tsx
 *
 * @author Thompson 25/10/2019
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2019
 */

// Requirements: https://rm.smarthealth.com.au/smartrm/#!/PV8/FR1728
describe('format and validation for Medicare number', () =>
{
    test('format Medicare number', () =>
    {
        expect(formatMedicareNumber('3500 75985 1'))
            .toEqual('3500 75985 1');
        expect(formatMedicareNumber('3500759851'))
            .toEqual('3500 75985 1');
        expect(formatMedicareNumber('3500-75985-1'))
            .toEqual('3500 75985 1');
        expect(formatMedicareNumber('3500   75985  1'))
            .toEqual('3500 75985 1');
        expect(formatMedicareNumber('3 5 0 0 7 5 9 8 5 1'))
            .toEqual('3500 75985 1');
        expect(formatMedicareNumber('3   50075   985    1'))
            .toEqual('3500 75985 1');
        expect(formatMedicareNumber('  3 5007 5985 1  '))
            .toEqual('3500 75985 1');
        expect(formatMedicareNumber('  3 50-07 - 59-85 1  '))
            .toEqual('3500 75985 1');

        expect(formatMedicareNumber('35007598512'))
            .toEqual('35007598512');
        expect(formatMedicareNumber('3'))
            .toEqual('3');
        expect(formatMedicareNumber('  3 500  '))
            .toEqual('  3 500  ');
        expect(formatMedicareNumber('350AB12345'))
            .toEqual('350A B1234 5');
        expect(formatMedicareNumber('350#9*2)45'))
            .toEqual('350# 9*2)4 5');
        expect(formatMedicareNumber('!@#$  #9*2)4'))
            .toEqual('!@#$ #9*2) 4');
        expect(formatMedicareNumber(''))
            .toEqual('');
        expect(formatMedicareNumber(null))
            .toEqual(null);
    });

    test('medicare number validation', () =>
    {
        expect(validateMedicareNumber('3500759851'))
            .toEqual(true);
        expect(validateMedicareNumber('3500 75985 1'))
            .toEqual(true);
        expect(validateMedicareNumber('3500-75985-1'))
            .toEqual(true);
        expect(validateMedicareNumber('2298 30583 1'))
            .toEqual(true);
        expect(validateMedicareNumber('5500 39392 1'))
            .toEqual(true);
        expect(validateMedicareNumber('3500759851'))
            .toEqual(true);

        // length
        expect(validateMedicareNumber('1234 95678 91011'))
            .toEqual(false);
        expect(validateMedicareNumber('229826483'))
            .toEqual(false);
        expect(validateMedicareNumber('2298 64831'))
            .toEqual(false);
        expect(validateMedicareNumber('1234 '))
            .toEqual(false);
        expect(validateMedicareNumber('12 '))
            .toEqual(false);
        expect(validateMedicareNumber(''))
            .toEqual(false);
        expect(validateMedicareNumber(null))
            .toEqual(false);

        // other separators
        expect(validateMedicareNumber('2298-30583-1'))
            .toEqual(true);

        // test check digits
        expect(validateMedicareNumber('3500759851'))
            .toEqual(true);
        expect(validateMedicareNumber('3500759852'))
            .toEqual(true);
        expect(validateMedicareNumber('3500759821'))
            .toEqual(false);
        expect(validateMedicareNumber('3500759881'))
            .toEqual(false);
    });
});

// Requirements: https://rm.smarthealth.com.au/smartrm/#!/PV8/FR1729
describe('format and validate Health Care Card number', () =>
{
    test('format Health Care Card number', () =>
    {
        expect(formatHealthCareCardNumber('123 456 789T'))
            .toEqual('123 456 789T');
        expect(formatHealthCareCardNumber('123-456-789T'))
            .toEqual('123 456 789T');
        expect(formatHealthCareCardNumber('123  456  789T'))
            .toEqual('123 456 789T');
        expect(formatHealthCareCardNumber('1 2 3 4 5 6 7 8 9 T'))
            .toEqual('123 456 789T');
        expect(formatHealthCareCardNumber('1   23 456 789  T'))
            .toEqual('123 456 789T');
        expect(formatHealthCareCardNumber('    1  23 456 7 -  89T   '))
            .toEqual('123 456 789T');
        expect(formatHealthCareCardNumber(''))
            .toEqual('');
        expect(formatHealthCareCardNumber(null))
            .toEqual(null);
    });

    test('validate for Health Care Card Number', () =>
    {
        expect(validateHealthCareCardNumber('123 456 789T'))
            .toEqual(true);
        expect(validateHealthCareCardNumber('123456 789T'))
            .toEqual(true);
        expect(validateHealthCareCardNumber('123456789T'))
            .toEqual(true);
        expect(validateHealthCareCardNumber('1  23 456 7   89T'))
            .toEqual(true);
        expect(validateHealthCareCardNumber('    1  23 456 7   89T   '))
            .toEqual(true);
        expect(validateHealthCareCardNumber('012 345 678X'))
            .toEqual(true);

        // separator
        expect(validateHealthCareCardNumber('123-456 789T'))
            .toEqual(true);
        expect(validateHealthCareCardNumber('1234-567-89T'))
            .toEqual(true);

        // length
        expect(validateHealthCareCardNumber('0123 456 789T'))
            .toEqual(false);
        expect(validateHealthCareCardNumber('0123456789T'))
            .toEqual(false);

        expect(validateHealthCareCardNumber('123 456 789!'))
            .toEqual(false);
        expect(validateHealthCareCardNumber('123 456 7890'))
            .toEqual(false);
        expect(validateHealthCareCardNumber('123X56X89P'))
            .toEqual(false);
    });
});

// Requirements: https://rm.smarthealth.com.au/smartrm/#!/PV8/FR3537
describe('validation of CF Australia ID', () =>
{
    test('valid CF Australia ID', () =>
    {
        expect(validateCFAustraliaID('201ABCD'))
            .toEqual(true);
        expect(validateCFAustraliaID('202EFGH'))
            .toEqual(true);
        expect(validateCFAustraliaID('406PEFL'))
            .toEqual(true);
        expect(validateCFAustraliaID('601IJKL'))
            .toEqual(true);
        expect(validateCFAustraliaID('602MNOP'))
            .toEqual(true);
        expect(validateCFAustraliaID('701QRST'))
            .toEqual(true);
        expect(validateCFAustraliaID('702UVWX'))
            .toEqual(true);
        expect(validateCFAustraliaID('703YZAB'))
            .toEqual(true);

        // invalid 4 characters
        expect(validateCFAustraliaID('603ZA3R'))
            .toEqual(false);
        expect(validateCFAustraliaID('7041234'))
            .toEqual(false);
        expect(validateCFAustraliaID('603$ADB'))
            .toEqual(false);
        expect(validateCFAustraliaID('704-DRE'))
            .toEqual(false);
        expect(validateCFAustraliaID('7T4DRE'))
            .toEqual(false);

        // length
        expect(validateCFAustraliaID('406'))
            .toEqual(false);
        expect(validateCFAustraliaID('201TDD'))
            .toEqual(false);
        expect(validateCFAustraliaID('305LA'))
            .toEqual(false);
        expect(validateCFAustraliaID('7'))
            .toEqual(false);
        expect(validateCFAustraliaID(''))
            .toEqual(false);
        expect(validateCFAustraliaID(null))
            .toEqual(false);
    });
});
