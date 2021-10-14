import MedicalGroupLocationUtility from 'main/utility/MedicalGroupLocationUtility';
import MedicalGroup from 'smarthealth-javascript/MedicalGroup';
import MedicalGroupLocationConstants from 'smarthealth-javascript/MedicalGroupLocationConstants';
import medicalGroup from 'smarthealth-rest-test/medicalgroup.json';
import medicalGroupLocations from 'smarthealth-rest-test/medicalgroup.locations.json';

/**
 * MedicalGroupLocationUtility Jest
 *
 * @author Priyanka 5/03/2019
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2019
 */
test('Suburb as Location', () =>
{
    expect(MedicalGroupLocationUtility.buildLocationOptions(medicalGroup as MedicalGroup, true))
        .toEqual([
            { label: 'Pyrmont', value: { id: MedicalGroupLocationConstants.SUBURB, name: 'Pyrmont' } }
        ]);
});

test('With Locations', () =>
{
    expect(MedicalGroupLocationUtility.buildLocationOptions(medicalGroupLocations as MedicalGroup, true))
        .toEqual([
            { label: 'Here', value: { id: 1, name: 'Here' } },
            { label: 'There', value: { id: 2, name: 'There' } }
        ]);
});
