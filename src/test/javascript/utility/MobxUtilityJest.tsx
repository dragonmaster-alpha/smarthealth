import lodash from 'lodash';
import {extendObservableByPath} from 'main/utility/MobxUtility';
import {observable} from 'mobx';
import {PATIENT_HARRY_POTTER} from 'test/model/PatientMother';

/**
 * Test MobxUtility
 *
 * @author Larry 17/01/2019
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2019
 */
test('extend the object with a property', () =>
{
    const ob = observable(lodash.cloneDeep(PATIENT_HARRY_POTTER));
    extendObservableByPath(ob, 'newProperty');
    expect(lodash.has(ob, 'newProperty'))
        .toBe(true);
    expect(ob['newProperty'])
        .toBeNull();
});

test('extend the object with an object', () =>
{
    const ob = observable(lodash.cloneDeep(PATIENT_HARRY_POTTER));
    extendObservableByPath(ob, 'newObject.newProperty');
    expect(lodash.has(ob, 'newObject.newProperty'))
        .toBe(true);
    expect(ob['newObject']['newProperty'])
        .toBeNull();
});

test('extend existing object with new property', () =>
{
    const ob = observable(lodash.cloneDeep(PATIENT_HARRY_POTTER));
    extendObservableByPath(ob, 'name.newProperty');
    expect(lodash.has(ob, 'name.newProperty'))
        .toBe(true);
});
