import PatientContact from 'smarthealth-javascript/PatientContact';

/**
 * Patient Contact Mother for testing
 *
 * @author Thompson 20/02/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
export const MA_POTTER_PAS: PatientContact = {
    address: {
        address1: '12 Hogwarts ',
        address2: '',
        city: 'asdf',
        country: 'Australia',
        postcode: '1234',
        state: 'NT'
    },
    contactDetails: {
        email: '',
        phoneHome: '',
        phoneMobile: '',
        phoneWork: ''
    },
    headOfFamily: true,
    id: 5,
    name: {
        familyName: 'Potter',
        givenName: 'Ma',
        otherGivenNames: '',
        title: 'Mrs'
    },
    patientID: 2,
    relationship: 'Parent',
    sourcePASID: 1,
    version: 9
};

export const MA_POTTER: PatientContact = {
    address: {
        address1: '12 Hogwarts ',
        address2: '',
        city: 'asdf',
        country: 'Australia',
        postcode: '1234',
        state: 'NT'
    },
    contactDetails: {
        email: '',
        phoneHome: '',
        phoneMobile: '',
        phoneWork: ''
    },
    headOfFamily: true,
    id: 5,
    name: {
        familyName: 'Potter',
        givenName: 'Ma',
        otherGivenNames: '',
        title: 'Mrs'
    },
    patientID: 2,
    relationship: 'Parent',
    version: 9
};

export const PA_POTTER: PatientContact = {
    address: {
        address1: 'a',
        address2: '',
        city: 'x',
        country: 'Australia',
        postcode: '1234',
        state: 'ACT'
    },
    contactDetails: {
        email: '',
        phoneHome: '',
        phoneMobile: '',
        phoneWork: ''
    },
    id: 13,
    name: {
        familyName: 'Potter',
        givenName: 'Pa',
        otherGivenNames: '',
        title: 'Mr'
    },
    patientID: 2,
    relationship: 'Parent',
    version: 2
};
