import ValueSetUtility from 'main/utility/ValueSetUtility';
import ValueSet from 'smarthealth-javascript/ValueSet';
import bodystructureLaterality from 'smarthealth-rest-test/valueset.bodystructure.laterality.json';
import medicationChangeReason from 'smarthealth-rest-test/valueset.medication.changereason.json';

/**
 * ValueSetUtility Jest
 *
 * @author Priyanka 1/03/2019
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2019
 */
test('build valueset options', () =>
{
    expect(ValueSetUtility.buildValueSetOptions(bodystructureLaterality as ValueSet))
        .toEqual([
            {
                label: 'Left',
                value: {
                    code: 'L',
                    codeSet: 'http://meteor.aihw.gov.au/content/index.phtml/itemId/422769',
                    value: 'Left'
                }
            },
            {
                label: 'Right',
                value: {
                    code: 'R',
                    codeSet: 'http://meteor.aihw.gov.au/content/index.phtml/itemId/422769',
                    value: 'Right'
                }
            },
            {
                label: 'Bilateral',
                value: {
                    code: 'B',
                    codeSet: 'http://meteor.aihw.gov.au/content/index.phtml/itemId/422769',
                    value: 'Bilateral'
                }
            },
            {
                label: 'Not applicable',
                value: {
                    code: 'N',
                    codeSet: 'http://meteor.aihw.gov.au/content/index.phtml/itemId/422769',
                    value: 'Not applicable'
                }
            },
            {
                label: 'Unknown',
                value: {
                    code: 'U',
                    codeSet: 'http://meteor.aihw.gov.au/content/index.phtml/itemId/422769',
                    value: 'Unknown'
                }
            }
        ]);
    expect(ValueSetUtility.buildValueSetOptions(medicationChangeReason as ValueSet))
        .toEqual([
            {
                label: 'Adverse reaction',
                value: {
                    codeSet: 'http://ns.smarthealth.com.au/valueset/Medication.ChangeReason',
                    value: 'Adverse reaction'
                }
            },
            {
                label: 'Ineffective',
                value: {
                    codeSet: 'http://ns.smarthealth.com.au/valueset/Medication.ChangeReason',
                    value: 'Ineffective'
                }
            },
            {
                label: 'Non-compliance',
                value: {
                    codeSet: 'http://ns.smarthealth.com.au/valueset/Medication.ChangeReason',
                    value: 'Non-compliance'
                }
            },
            {
                label: 'Side effects',
                value: {
                    codeSet: 'http://ns.smarthealth.com.au/valueset/Medication.ChangeReason',
                    value: 'Side effects'
                }
            }
        ]);
});
