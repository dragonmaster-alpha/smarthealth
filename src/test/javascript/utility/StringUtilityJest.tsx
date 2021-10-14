import StringUtility from 'main/utility/StringUtility';

/**
 * Jest for StringUtility.tsx
 *
 * @author Thompson 21/10/2019
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2019
 */

test('compareString', () =>
{
    expect(StringUtility.compareStringsIgnoreCase('Hello', 'hello'))
        .toEqual(true);
    expect(StringUtility.compareStringsIgnoreCase('', ''))
        .toEqual(true);
    expect(StringUtility.compareStringsIgnoreCase('WoRlD', 'wOrLd'))
        .toEqual(true);
    expect(StringUtility.compareStringsIgnoreCase('HeLlO WoRlD wItH Spaces', 'hElLo wOrLd WiTh Spaces'))
        .toEqual(true);
    expect(StringUtility.compareStringsIgnoreCase(null, 'wOrLd'))
        .toEqual(false);
    expect(StringUtility.compareStringsIgnoreCase(undefined, 'wOrLd'))
        .toEqual(false);
    expect(StringUtility.compareStringsIgnoreCase('WoRlD', null))
        .toEqual(false);
    expect(StringUtility.compareStringsIgnoreCase('WoRlD', undefined))
        .toEqual(false);
});

test('compare 2 strings to see if first parameter is less than, equal or greater than.', () =>
{
    expect(StringUtility.compareAscending('Apple', 'apple'))
        .toEqual(-1);
    expect(StringUtility.compareAscending('Banana', 'apple'))
        .toEqual(-1);
    expect(StringUtility.compareAscending('1apple', 'apple'))
        .toEqual(-1);

    expect(StringUtility.compareAscending('apple', 'apple'))
        .toEqual(0);
    expect(StringUtility.compareAscending('Banana', 'Banana'))
        .toEqual(0);

    expect(StringUtility.compareAscending('banana', 'apple'))
        .toEqual(1);
    expect(StringUtility.compareAscending('apple Apple', 'apple'))
        .toEqual(1);
    expect(StringUtility.compareAscending('apple Banana', 'apple'))
        .toEqual(1);
    expect(StringUtility.compareAscending('apple 1apple', 'apple'))
        .toEqual(1);
});

test('Removes a substring only if it is at the end of a source string, otherwise returns the source string', () =>
{
    expect(StringUtility.removeEnd('www.google.com', '.com'))
        .toEqual('www.google');
    expect(StringUtility.removeEnd('www.google.com', 'www.google.com'))
        .toEqual('');

    expect(StringUtility.removeEnd('www.google.com', '.com.'))
        .toEqual('www.google.com');
    expect(StringUtility.removeEnd('www.google.com', 'google'))
        .toEqual('www.google.com');
    expect(StringUtility.removeEnd('www.google.com', ''))
        .toEqual('www.google.com');
    expect(StringUtility.removeEnd('www.google.com', null))
        .toEqual('www.google.com');
    expect(StringUtility.removeEnd(null, '.com'))
        .toEqual(null);
    expect(StringUtility.removeEnd('', '.com'))
        .toEqual('');

});
