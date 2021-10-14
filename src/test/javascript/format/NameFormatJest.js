import {fullName, shortName} from 'main/format/NameFormat';
import {HARRY_POTTER, RON_WEASLEY} from 'test/model/NameMother';

/**
 * Unit Test NameFormat object
 *
 * @author Uditha 26/02/2018
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2018
 */
test('Full name', () =>
{
    expect(fullName(HARRY_POTTER))
        .toBe('Mr Harry James Potter');
    expect(fullName(HARRY_POTTER, 'Hazza'))
        .toBe('Mr Harry (Hazza) James Potter');
    expect(fullName(HARRY_POTTER, null))
        .toBe('Mr Harry James Potter');
    expect(fullName(HARRY_POTTER, undefined))
        .toBe('Mr Harry James Potter');

    expect(fullName(RON_WEASLEY))
        .toBe('Mr Ron Weasley');
    expect(fullName(RON_WEASLEY, 'Ronny'))
        .toBe('Mr Ron (Ronny) Weasley');
});

test('Short name', () =>
{
    expect(shortName(HARRY_POTTER))
        .toBe('Mr Harry Potter');

    expect(shortName(RON_WEASLEY))
        .toBe('Mr Ron Weasley');
});
