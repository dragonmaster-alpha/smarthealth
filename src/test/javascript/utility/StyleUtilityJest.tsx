import {px} from 'main/utility/StyleUtility';

/**
 * Test StyleUtility
 *
 * @author Larry 13/10/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
describe('StyleUtility', () =>
{
    test('px()', () =>
    {
        expect(px(0))
            .toEqual('0');
        expect(px(32))
            .toEqual('32px');

        expect(px(0, 8))
            .toEqual('0 8px');
        expect(px(32, 16))
            .toEqual('32px 16px');

        expect(px(0, 8, 16))
            .toEqual('0 8px 16px');
        expect(px(32, 16, 16))
            .toEqual('32px 16px 16px');

        expect(px(0, 8, 16, 32))
            .toEqual('0 8px 16px 32px');
        expect(px(32, 16, 8, 4))
            .toEqual('32px 16px 8px 4px');
    });
});
