import {oneLineAddress} from 'main/format/AddressFormat';
import {ADDRESS_OFFICE, ADDRESS_SIMPLE} from 'test/model/AddressMother';

/**
 * Unit Test AddressFormat
 *
 * @author Larry 13/03/2018
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2018
 */
test('Address with all fields', () =>
{
    expect(oneLineAddress(ADDRESS_OFFICE))
        .toBe('Suite 39, 94 Oxford St, Darlinghurst, NSW, 2010');
});

test('Address with no address2', () =>
{
    expect(oneLineAddress(ADDRESS_SIMPLE))
        .toBe('94 Oxford St, Darlinghurst, NSW, 2010');
});
