import Address from 'smarthealth-javascript/Address';

/**
 * Formatting for addresses
 *
 * @author Uditha 05/03/2018
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2018
 */
const DEFAULT_COUNTRY = 'Australia';

export function oneLineAddress(address: Address): string
{
    return [address.address1, address.address2, address.city, address.state, address.postcode,
        (address.country === DEFAULT_COUNTRY) ? null : address.country]
        .filter(Boolean)
        .join(', ');
}
