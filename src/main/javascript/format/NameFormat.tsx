import Name from 'smarthealth-javascript/Name';

/**
 * Formatting for names
 *
 * @author Larry 28/02/2018
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2018
 */
export function fullName(name: Name, preferred?: string): string
{
    return [name.title, name.givenName, preferred && `(${preferred})`, name.otherGivenNames, name.familyName]
        .filter(Boolean)
        .join(' ');
}

export function shortName(name: Name): string
{
    return [name.title, name.givenName, name.familyName]
        .filter(Boolean)
        .join(' ');
}
