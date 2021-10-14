import User from 'smarthealth-javascript/User';
import UserDigest from 'smarthealth-javascript/UserDigest';
import {
    JAY_STREET_MEDICAL_CENTRE, PHILLIP_GENERAL_PRACTICE, ST_VASELINE, ST_VINCENTS_HOSPITAL
} from 'test/data/MedicalGroupMother';
import {
    BARNEY_STINSON, BILL_GOLFALOT, JOHN_DOLITTLE, MARSHALL_ERIKSEN, MARSHALL_STINSON, TED_ERIKSEN, TED_MOSBY
} from 'test/model/NameMother';

/**
 * User Mother
 *
 * @author Thompson 20/01/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
export function userDigest(user: User): UserDigest
{
    return {
        name: user.name,
        participating: user.participating,
        userID: user.userID
    };
}

export const USER_BARNEY_STINSON: User = {
    active: true,
    homeMedicalGroupID: PHILLIP_GENERAL_PRACTICE.groupID,
    name: BARNEY_STINSON,
    userID: 2
};

export const USER_BILL_GOLFALOT: User = {
    active: true,
    homeMedicalGroupID: ST_VINCENTS_HOSPITAL.groupID,
    name: BILL_GOLFALOT,
    participating: true,
    userID: 19
};

export const USER_DOCTOR_DOLITTLE: User = {
    active: true,
    homeMedicalGroupID: ST_VASELINE.groupID,
    name: JOHN_DOLITTLE,
    userID: 1
};

export const USER_JEMMA_HULL: User = {
    active: true,
    homeMedicalGroupID: JAY_STREET_MEDICAL_CENTRE.groupID,
    name: {
        familyName: 'Hull',
        givenName: 'Jemma',
        title: 'Dr'
    },
    participating: true,
    userID: 73
};

export const USER_MARSHALL_ERIKSEN = {
    active: true,
    homeMedicalGroupID: ST_VASELINE.groupID,
    name: MARSHALL_ERIKSEN,
    userID: 5
};

export const USER_MARSHALL_STINSON = {
    active: true,
    homeMedicalGroupID: ST_VASELINE.groupID,
    name: MARSHALL_STINSON,
    userID: 6
};

export const USER_NON_PARTICIPATING: User = {
    active: true,
    homeMedicalGroupID: PHILLIP_GENERAL_PRACTICE.groupID,
    name: {
        familyName: 'Participating',
        givenName: 'Non',
        title: 'Dr'
    },
    participating: false,
    userID: 33
};

export const USER_PETER_FLOWER: User = {
    active: true,
    homeMedicalGroupID: PHILLIP_GENERAL_PRACTICE.groupID,
    name: {
        familyName: 'Flower',
        givenName: 'Peter',
        title: 'Mr'
    },
    participating: true,
    userID: 14
};

export const USER_TED_ERIKSEN = {
    active: true,
    homeMedicalGroupID:
    PHILLIP_GENERAL_PRACTICE.groupID,
    name: TED_ERIKSEN,
    userID: 3
};

export const USER_TED_MOSBY = {
    active: true,
    homeMedicalGroupID: PHILLIP_GENERAL_PRACTICE.groupID,
    name: TED_MOSBY,
    userID: 4
};

export const USER_WILLIAM_WENG: User = {
    active: true,
    email: 'william.weng@smarthealth.com.au',
    homeMedicalGroupID: PHILLIP_GENERAL_PRACTICE.groupID,
    name: {
        familyName: 'Weng',
        givenName: 'William',
        title: 'Mr'
    },
    participating: true,
    phoneMobile: '0400 000 000',
    userID: 18
};
