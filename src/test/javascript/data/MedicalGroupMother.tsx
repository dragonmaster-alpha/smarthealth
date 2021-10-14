import lodash from 'lodash';
import EntityType from 'smarthealth-javascript/EntityType';
import MedicalGroup from 'smarthealth-javascript/MedicalGroup';
import MedicalGroupDigest from 'smarthealth-javascript/MedicalGroupDigest';
import {EntityDetails} from 'test/component/SetEntity';

/**
 * Medical Groups for testing
 *
 * @author Larry 29/04/2019
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2019
 */
export function medicalGroupDigest(medicalGroup: MedicalGroup): MedicalGroupDigest
{
    return {
        city: medicalGroup.address.city,
        groupID: medicalGroup.groupID,
        name: medicalGroup.name,
        participating: medicalGroup.participating,
        phone: medicalGroup.phone,
        practiceSettingCode: medicalGroup.practiceSettingCode,
        state: medicalGroup.address.state
    };
}

export function medicalGroupEntityDetails(medicalGroup: MedicalGroup): EntityDetails
{
    return { type: EntityType.MedicalGroup, id: medicalGroup.groupID, value: medicalGroup };
}

export const A_BETTER_IMAGE: MedicalGroup = {
    address: {
        address1: '2020 Vista Parade',
        city: 'Sydney',
        state: 'NSW',
        postcode: '2000',
        country: 'Australia'
    },
    enabled: true,
    groupID: 1765,
    name: 'A Better Image',
    participating: false,
    phone: '+61 2 9247 3799',
    practiceSettingCode: '8520-1',
    timeZone: 'Australia/Sydney'
};

export const JAY_STREET_MEDICAL_CENTRE = {
    address: {
        address1: '15 Jay Dr',
        address2: '',
        city: 'Telopea',
        country: 'Australia',
        postcode: '2117',
        state: 'NSW'
    },
    enabled: true,
    fax: '',
    groupID: 37,
    locations: [],
    name: 'Jay Street Medical Centre',
    participating: true,
    phone: '(02) 9999 2222',
    practiceSettingCode: '8511-2',
    programs: [],
    timeZone: 'Australia/Sydney',
    version: 1
};

export const PHILLIP_GENERAL_PRACTICE: MedicalGroup = {
    address: {
        address1: '1 Phillip Street',
        city: 'Sydney',
        state: 'NSW',
        postcode: '2000',
        country: 'Australia'
    },
    enabled: true,
    groupID: 4,
    name: 'Phillip General Practice',
    participating: true,
    phone: '+61 2 9247 3799',
    practiceSettingCode: '8511-2',
    timeZone: 'Australia/Sydney'
};

export const PILLS_PHARMACY: MedicalGroup = {
    address: {
        address1: '3 Down Street',
        city: 'Sydney',
        state: 'NSW',
        postcode: '2000',
        country: 'Australia'
    },
    enabled: true,
    groupID: 720,
    name: 'Pills Pharmacy',
    participating: false,
    phone: '+61 2 9247 3799',
    practiceSettingCode: '4271-1',
    timeZone: 'Australia/Sydney'
};

export const PLAIN_PATHOLOGY: MedicalGroup = {
    address: {
        address1: '567 Success St',
        city: 'Sydney',
        state: 'NSW',
        postcode: '2000',
        country: 'Australia'
    },
    enabled: true,
    groupID: 1764,
    name: 'Plain Pathology',
    participating: false,
    phone: '+61 2 9247 3799',
    practiceSettingCode: '8520-3',
    timeZone: 'Australia/Sydney'
};

export const SMART_HEALTH_SYSTEM = {
    address: {
        address1: '39 Phillip St',
        address2: '',
        city: 'Sydney',
        country: 'Australia',
        postcode: '2000',
        state: 'NSW'
    },
    enabled: true,
    fax: '(02) 9247 3899',
    groupID: 1,
    locations: [],
    name: 'Smart Health System',
    participating: true,
    phone: '(02) 9247 3799',
    practiceSettingCode: '5921-2',
    programs: [],
    timeZone: 'Australia/Sydney'
};

export const ST_VASELINE: MedicalGroup = {
    address: {
        address1: '1 Slip Street',
        city: 'Sydney',
        state: 'NSW',
        postcode: '2000',
        country: 'Australia'
    },
    enabled: true,
    groupID: 23,
    name: 'St Vaseline Intensive Care',
    participating: true,
    phone: '+61 2 9247 3799',
    practiceSettingCode: '8401-5',
    timeZone: 'Australia/Sydney'
};

export const ST_VINCENTS_HOSPITAL: MedicalGroup = {
    address: {
        address1: '390 Victoria Street',
        address2: '',
        city: 'Darlinghurst',
        country: 'Australia',
        postcode: '2010',
        state: 'NSW'
    },
    enabled: true,
    fax: '(02) 9332 4142',
    groupID: 26,
    locations: [],
    name: 'St Vincent\'s Hospital',
    participating: true,
    phone: '(02) 8382 1111',
    practiceSettingCode: '8401-5',
    programs: [],
    timeZone: 'Australia/Sydney',
    version: 0
};

export const ALL_MEDICAL_GROUPS = [A_BETTER_IMAGE, JAY_STREET_MEDICAL_CENTRE, PHILLIP_GENERAL_PRACTICE, PILLS_PHARMACY,
    PLAIN_PATHOLOGY, SMART_HEALTH_SYSTEM, ST_VASELINE, ST_VINCENTS_HOSPITAL];

export const ALL_MEDICAL_GROUP_ENTITIES = lodash.flatten(
    ALL_MEDICAL_GROUPS.map(medicalGroup => medicalGroupEntityDetails(medicalGroup))
);
