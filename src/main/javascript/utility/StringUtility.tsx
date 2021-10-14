import lodash from 'lodash';

/**
 * Utility methods for strings
 *
 * @author Larry 7/03/2019
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2019
 */
class StringUtility
{
    public static abbreviate(string: string, length: number): string
    {
        if (string.length <= length)
        {
            return string;
        }
        else
        {
            return lodash.truncate(string, { length, separator: ' ' });
        }
    }

    public static compareAscending(value1: string, value2: string): -1 | 0 | 1
    {
        if (value1 < value2)
        {
            return -1;
        }
        else if (value1 > value2)
        {
            return 1;
        }
        else
        {
            return 0;
        }
    }

    public static compareStringsIgnoreCase(string1: string, string2: string): boolean
    {
        if ((typeof string1 !== 'string') || (typeof string2 !== 'string'))
        {
            return false;
        }
        return string1.toLocaleLowerCase() === string2.toLocaleLowerCase();
    }

    public static isBlank(string: string): boolean
    {
        if (StringUtility.isEmpty(string))
        {
            return true;
        }
        const trimmed = lodash.trim(string);
        return trimmed === '';
    }

    public static isEmpty(string: string): boolean
    {
        return lodash.isNil(string) || (string === '');
    }

    public static removeEnd(value: string, removeFromEnd: string): string
    {
        if (!value || !removeFromEnd)
        {
            return value;
        }

        const stringToRemove = value.slice(-removeFromEnd.length);
        if (stringToRemove !== removeFromEnd)
        {
            return value;
        }

        const totalCharactersToKeep = value.length - removeFromEnd.length;
        return value.slice(0, totalCharactersToKeep);
    }
}

export default StringUtility;
