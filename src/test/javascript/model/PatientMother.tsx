import Patient from 'smarthealth-javascript/Patient';
import PatientAggregate from 'smarthealth-javascript/PatientAggregate';
import PatientClinical from 'smarthealth-javascript/PatientClinical';
import PatientSummary from 'smarthealth-javascript/PatientSummary';
import Sex from 'smarthealth-javascript/Sex';
import {MEMBER_JEMMA_HULL} from 'test/data/MedicalGroupMemberAggregateMother';
import {ST_VINCENTS_HOSPITAL} from 'test/data/MedicalGroupMother';
import {ADDRESS_SIMPLE, LITTLE_WHINGING} from 'test/model/AddressMother';
import {HARRY_POTTER, RON_WEASLEY} from 'test/model/NameMother';

/**
 * Create test patients for testing
 *
 * @author Larry 13/03/2018
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2018
 */
export const PATIENTID_HARRY_POTTER = 3;

export const PATIENT_HARRY_POTTER: Patient = {
    active: true,
    address: LITTLE_WHINGING,
    contactDetails: { email: 'harry.potter@hogwarts.ed.uk', phoneMobile: 'Hedwig' },
    dateOfBirth: { iso: '1980-07-31' },
    name: HARRY_POTTER,
    notifyAlertsToEmail: false,
    notifyAlertsToMobilePhone: false,
    patientID: PATIENTID_HARRY_POTTER,
    sex: Sex.Male
};

export const PATIENT_SUMMARY_HARRY_POTTER: PatientSummary = {
    patientID: PATIENTID_HARRY_POTTER,
    name: HARRY_POTTER,
    dateOfBirth: { iso: '1980-07-31' },
    address: LITTLE_WHINGING,
    mrn: '70000',
    sex: Sex.Male
};

export const PATIENT_AGGREGATE_HARRY_POTTER: PatientAggregate = {
    patient: PATIENT_HARRY_POTTER,
    contacts: [],
    identifiers: [],
    patientMedicalGroupAssociation: {
        active: true,
        consentDate: { iso: '2015-01-02' },
        consentType: 'Testing',
        groupID: ST_VINCENTS_HOSPITAL.groupID,
        id: 24,
        patientID: PATIENT_HARRY_POTTER.patientID,
        urmrn: '70000'
    }
};

export const PATIENT_CLINICAL_HARRY_POTTER: PatientClinical = {
    patientID: PATIENT_HARRY_POTTER.patientID,
    gp: { memberID: MEMBER_JEMMA_HULL.member.memberID },
    version: 0
};

export const PATIENT_RON_WEASLEY: Patient = {
    active: true,
    address: ADDRESS_SIMPLE,
    contactDetails: {},
    dateOfBirth: { iso: '1980-03-01' },
    name: RON_WEASLEY,
    patientID: 23,
    sex: Sex.Male
};

export const PATIENT_TOM_RIDDLE: Patient = {
    active: true,
    address: ADDRESS_SIMPLE,
    contactDetails: { email: 'tom.riddle@hogwarts.ed.uk' },
    dateOfBirth: { iso: '1926-12-31' },
    deceasedDate: { iso: '1988-05-02' },
    name: { title: 'Lord', givenName: 'Tom', otherGivenNames: 'Marvolo', familyName: 'Riddle' },
    patientID: 34567,
    sex: Sex.Male
};

export const PATIENT_AGGREGATE_TOM_RIDDLE: PatientAggregate = {
    patient: PATIENT_TOM_RIDDLE,
    contacts: [],
    identifiers: [],
    patientMedicalGroupAssociation: {
        active: true,
        consentDate: { iso: '1955-01-01' },
        consentType: 'Testing',
        groupID: ST_VINCENTS_HOSPITAL.groupID,
        id: 78251,
        patientID: PATIENT_TOM_RIDDLE.patientID,
        urmrn: '70099'
    }
};
