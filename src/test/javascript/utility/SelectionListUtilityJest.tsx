import MedicalGroupLocationUtility from 'main/utility/MedicalGroupLocationUtility';
import SelectionListUtility from 'main/utility/SelectionListUtility';
import MedicalGroup from 'smarthealth-javascript/MedicalGroup';
import medicalGroup from 'smarthealth-rest-test/medicalgroup.json';
import medicalGroupLocations from 'smarthealth-rest-test/medicalgroup.locations.json';

/**
 * MedicalGroupLocationUtility Jest
 *
 * @author Priyanka 5/03/2019
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2019
 */
/**
 * Test SelectionListUtility
 *
 * @author Larry 31/12/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
test('Medical Group Location, suburb', () =>
{
    const options = MedicalGroupLocationUtility.buildLocationOptions(medicalGroup as MedicalGroup, true);
    expect(SelectionListUtility.determineSize(options))
        .toEqual(7);
});

test('Medical Group Location, locations', () =>
{
    const options = MedicalGroupLocationUtility.buildLocationOptions(medicalGroupLocations as MedicalGroup, true);
    expect(SelectionListUtility.determineSize(options))
        .toEqual(5);
});
