import {EMPTY} from 'main/field/FieldConstants';
import EnumUtility from 'main/utility/EnumUtility';
import ATSI from 'smarthealth-javascript/ATSI';
import Sex from 'smarthealth-javascript/Sex';

/**
 * Test EnumUtility
 *
 * @author Larry 11/01/2019
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2019
 */
describe('EnumUtility', () =>
{
    test('build enum options', () =>
    {
        expect(EnumUtility.buildEnumOptions('Sex'))
            .toEqual([
                { label: 'Female', value: Sex.Female },
                { label: 'Male', value: Sex.Male },
                { label: 'Intersex', value: Sex.Intersex }
            ]);

        expect(EnumUtility.buildEnumOptions('ATSI'))
            .toEqual([
                { label: 'Aboriginal but not TSI', value: ATSI.Aboriginal },
                { label: 'TSI but not Aboriginal', value: ATSI.TSI },
                { label: 'Both Aboriginal and TSI', value: ATSI.AboriginalAndTSI },
                { label: 'Neither Aboriginal nor TSI', value: ATSI.NeitherAboriginalNorTSI }
            ]);

        expect(EnumUtility.buildEnumOptions('ATSI', '(Empty)'))
            .toEqual([
                { label: '(Empty)', value: null },
                { label: 'Aboriginal but not TSI', value: ATSI.Aboriginal },
                { label: 'TSI but not Aboriginal', value: ATSI.TSI },
                { label: 'Both Aboriginal and TSI', value: ATSI.AboriginalAndTSI },
                { label: 'Neither Aboriginal nor TSI', value: ATSI.NeitherAboriginalNorTSI }
            ]);
    });

    test('getEnumSize', () =>
    {
        expect(EnumUtility.getEnumSize('Sex'))
            .toEqual(8);

        expect(EnumUtility.getEnumSize('ATSI'))
            .toEqual(26);
        expect(EnumUtility.getEnumSize('ATSI', EMPTY))
            .toEqual(26);

        expect(EnumUtility.getEnumSize('MaritalStatus', EMPTY))
            .toEqual(9);
    });
});
