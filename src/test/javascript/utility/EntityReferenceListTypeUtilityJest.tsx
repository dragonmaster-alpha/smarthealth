import EntityReferenceListType from 'smarthealth-javascript/EntityReferenceListType';
import EntityReferenceListTypeUtility from 'smarthealth-javascript/EntityReferenceListTypeUtility';

/**
 * Test generated class EntityReferenceListTypeUtility
 *
 * @author Larry 16/10/2019
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2019
 */
test.skip('id generation', () =>
{
    expect(EntityReferenceListTypeUtility.buildID(EntityReferenceListType.MedicalGroupRecents))
        .toEqual('/medicalgroups/recents');

    expect(EntityReferenceListTypeUtility.buildID(EntityReferenceListType.MedicalGroupMemberRecents))
        .toEqual('/medicalgroupmembers/recents');

    expect(EntityReferenceListTypeUtility.buildID(EntityReferenceListType.MedicalGroupAssociations, { patientID: 42 }))
        .toEqual('/patients/42/medicalgroups');

    // TODO encodeURI name property string
    expect(EntityReferenceListTypeUtility.buildID(EntityReferenceListType.MedicationHistoryByName,
        { name: 'Panadol Rapid' }))
        .toEqual('/medications/history?name=Panadol%20Rapid');
    expect(EntityReferenceListTypeUtility.buildID(EntityReferenceListType.MedicationHistoryByName,
        { name: 'Patent blue V' }))
        .toEqual('/medications/history?name=Patent%20blue%20V');
    expect(EntityReferenceListTypeUtility.buildID(EntityReferenceListType.MedicationHistoryByName,
        {
            name: 'Amino acids - Calcium - Carbohydrate - Casein - Chloride - Fat - Potassium - Lactose monohydrate ...'
        }))
        .toEqual('/medications/history?name=Amino%20acids%20-%20Calcium%20-%20Carbohydrate%20-%20Casein%20-'
            + '%20Chloride%20-%20Fat%20-%20Potassium%20-%20Lactose%20monohydrate%20...');
});
