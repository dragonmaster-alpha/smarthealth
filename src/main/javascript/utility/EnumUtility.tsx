import ATSI, {aTSIDescriptions} from 'smarthealth-javascript/ATSI';
import Confidentiality, {confidentialityDescriptions} from 'smarthealth-javascript/Confidentiality';
import MaritalStatus, {maritalStatusDescriptions} from 'smarthealth-javascript/MaritalStatus';
import Program, {programDescriptions} from 'smarthealth-javascript/Program';
import Sex, {sexDescriptions} from 'smarthealth-javascript/Sex';
import TumourStream, {tumourStreamDescriptions} from 'smarthealth-javascript/TumourStream';

/**
 * Utility functions for Enumerations
 *
 * @author Larry 11/01/2019
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2019
 */
class EnumUtility
{
    public static ENUMS = { ATSI, Confidentiality, MaritalStatus, Program, Sex, TumourStream };

    public static ENUM_DESCRIPTIONS = {
        ATSI: aTSIDescriptions,
        Confidentiality: confidentialityDescriptions,
        MaritalStatus: maritalStatusDescriptions,
        Program: programDescriptions,
        Sex: sexDescriptions,
        TumourStream: tumourStreamDescriptions
    };

    public static buildEnumOptions(enumType: string, nullOption?: string): any[]
    {
        // I can't find how to discover an enum from its name, so we need to collect them here
        const theEnum = EnumUtility.ENUMS[enumType];
        if (!theEnum)
        {
            throw new Error(`Unknown enum type: ${enumType}`);
        }
        const descriptions = EnumUtility.ENUM_DESCRIPTIONS[enumType];
        const options = Object.keys(theEnum)
            .map(key => ({ value: key, label: descriptions ? descriptions[key] : key }));
        if (nullOption)
        {
            options.unshift({ value: null, label: nullOption });
        }
        return options;
    }

    public static getEnumSize(enumType: string, nullOption?: string): number
    {
        const theEnum = EnumUtility.ENUMS[enumType];
        if (!theEnum)
        {
            throw new Error(`Unknown enum type: ${enumType}`);
        }
        const size = Object.keys(theEnum)
            .reduce((previousValue, key) =>
            {
                return Math.max(previousValue, this.getEnumText(enumType, key).length);
            }, 0);
        return Math.max(size, nullOption ? nullOption.length : 0);
    }

    public static getEnumText(enumType: string, value): string
    {
        // I can't find how to discover an enum from its name, so we need to collect them here
        const theEnum = EnumUtility.ENUMS[enumType];
        if (!theEnum)
        {
            throw new Error(`Unknown enum type: ${enumType}`);
        }
        const descriptions = EnumUtility.ENUM_DESCRIPTIONS[enumType];
        return descriptions ? descriptions[value] : value;
    }
}

export default EnumUtility;
