import ValueSet from 'smarthealth-javascript/ValueSet';

/**
 * ValueSet Utility
 *
 * @author Priyanka 1/03/2019
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2019
 */
class ValueSetUtility
{
    public static buildValueSetOptions(valueSet: ValueSet, nullOption?: string): any[]
    {
        const values = valueSet.values;
        const options = values.map(v => ({ value: v, label: v.value }));
        if (nullOption)
        {
            options.unshift({ value: null, label: nullOption });
        }
        return options;
    }
}

export default ValueSetUtility;
