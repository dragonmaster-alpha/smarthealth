/**
 * Identifiers formats and validators
 *
 * Requirements source:
 * CF Australia ID: https://rm.smarthealth.com.au/smartrm/#!/PV8/FR1730
 * Health Care Card Number: https://rm.smarthealth.com.au/smartrm/#!/PV8/FR1729
 * Medicare Number:https://rm.smarthealth.com.au/smartrm/#!/PV8/FR1728
 *
 * @author Thompson 25/10/2019
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2019
 */

const CF_AUSTRALIA_CENTRE_CODES: number[] = [
    201, 202, 203, 204, 205, 207, 208, 210,
    301, 302, 303,
    401, 402, 403, 404, 405, 406, 407, 408, 409, 410,
    411, 412, 413,
    501, 502,
    601, 602,
    701, 702, 703
];

export function formatHealthCareCardNumber(healthCareCardNumber: string): string
{
    if (!healthCareCardNumber)
    {
        return healthCareCardNumber;
    }

    const newCardNumber: string = healthCareCardNumber.replace(/[ -]/g, '');
    if (newCardNumber.length !== 10)
    {
        return healthCareCardNumber;
    }

    const firstThreeDigits = newCardNumber.substring(0, 3);
    const secondThreeDigits = newCardNumber.substring(3, 6);
    const fourDigits = newCardNumber.substring(6, 10);

    return `${firstThreeDigits} ${secondThreeDigits} ${fourDigits}`;
}

export function formatMedicareNumber(medicareNumber: string): string
{
    if (!medicareNumber)
    {
        return medicareNumber;
    }

    const newMedicareNumber: string = medicareNumber.replace(/[ -]/g, '');
    if (newMedicareNumber.length !== 10)
    {
        return medicareNumber;
    }

    const fourDigits = newMedicareNumber.substring(0, 4);
    const fiveDigits = newMedicareNumber.substring(4, 9);
    const oneDigit = newMedicareNumber.substring(9, 10);

    return `${fourDigits} ${fiveDigits} ${oneDigit}`;
}

export function validateCFAustraliaID(id: string): boolean
{
    if (!id)
    {
        return false;
    }

    if ((id.length !== 7) && (id.length !== 8))
    {
        return false;
    }

    const centreCode = parseInt(id.substring(0, 3), 10);
    if (!CF_AUSTRALIA_CENTRE_CODES.includes(centreCode))
    {
        return false;
    }

    const characters = id.substring(3, 7);
    if (characters && RegExp(/[^a-zA-Z]/g)
        .test(characters))
    {
        return false;
    }

    const duplicateCountDigit = id.substring(7, 8);
    if ((id.length === 8) && (RegExp(/[^0-9]/)
        .test(duplicateCountDigit)))
    {
        return false;
    }

    return true;
}

export function validateHealthCareCardNumber(healthCareCardNumber: string): boolean
{
    if (!healthCareCardNumber)
    {
        return false;
    }

    const newCardNumber = healthCareCardNumber.replace(/[ -]/g, '');
    if (newCardNumber.length !== 10)
    {
        return false;
    }

    const numberSection = newCardNumber.substring(0, 8);
    if (RegExp(/[^0-9]/g)
        .test(numberSection))
    {
        return false;
    }

    const character = newCardNumber.substring(9, 10);
    if (RegExp(/[^a-zA-Z]/)
        .test(character))
    {
        return false;
    }

    return true;
}

export function validateMedicareNumber(medicareNumber: string): boolean
{
    if (!medicareNumber)
    {
        return false;
    }

    const newMedicareNumber = medicareNumber.replace(/[ -]/g, '');
    if (newMedicareNumber.length !== 10)
    {
        return false;
    }

    if (RegExp(/[^0-9]/g)
        .test(newMedicareNumber))
    {
        return false;
    }

    const numbers: number[] = newMedicareNumber
        .split('')
        .map(number => parseInt(number, 10));
    let total = 0;
    total += numbers[0];
    total += (numbers[1] * 3);
    total += (numbers[2] * 7);
    total += (numbers[3] * 9);
    total += numbers[4];
    total += (numbers[5] * 3);
    total += (numbers[6] * 7);
    total += (numbers[7] * 9);
    const remainder = total % 10;
    if (numbers[8] !== remainder)
    {
        return false;
    }

    return true;
}
