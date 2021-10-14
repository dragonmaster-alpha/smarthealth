import lodash from 'lodash';
import StringUtility from 'main/utility/StringUtility';
import FormFieldNumber from 'smarthealth-javascript/FormFieldNumber';

/**
 * Utility for the Number Field
 *
 * @author Priyanka 27/02/2019
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2019
 */
class NumberUtility
{
    public static buildToolTip(field: FormFieldNumber): string
    {
        return `${NumberUtility.minimum(field)} &le; value &le; ${NumberUtility.maximum(field)}`;
    }

    public static maximum(field: FormFieldNumber): number
    {
        if (field.maximum)
        {
            return field.maximum;
        }
        else
        {
            return this.maximumPossible(field.precision, field.scale);
        }
    }

    public static maximumPossible(precision: number, scale: number): number
    {
        if (scale === 0)
        {
            return parseInt('9'.repeat(precision), 10);
        }
        else
        {
            return parseFloat(`${'9'.repeat(precision - scale)}.${'9'.repeat(scale)}`);
        }
    }

    public static minimum(field: FormFieldNumber): number
    {
        if (field.minimum)
        {
            return field.minimum;
        }
        else if (field.acceptNegative)
        {
            return -this.maximumPossible(field.precision, field.scale);
        }
        else
        {
            return 0;
        }
    }

    public static toFixedLength(value: number, scale: number): number
    {
        const fixedValue: string = value.toFixed(scale);
        return parseFloat(fixedValue);
    }

    public static toNumber(string: string): number
    {
        if (StringUtility.isBlank(string))
        {
            return null;
        }
        const trimmed = lodash.trim(string);
        return parseFloat(trimmed);
    }
}

export default NumberUtility;
