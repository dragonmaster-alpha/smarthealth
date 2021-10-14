import EntityType from 'smarthealth-javascript/EntityType';
import Program from 'smarthealth-javascript/Program';
import ServiceRecordCategory from 'smarthealth-javascript/ServiceRecordCategory';
import ServiceType from 'smarthealth-javascript/ServiceType';
import servicetypes from 'smarthealth-rest-test/servicetypes.json';
import {EntityDetails} from 'test/component/SetEntity';

/**
 * Load instances of service types (not lite servicetypes) from generated JSON
 *
 * @author Thompson 20/01/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
export const ALL_SERVICE_TYPES: ServiceType[] = servicetypes as ServiceType[];

export function loadServiceType(serviceTypeID: number): ServiceType
{
    return ALL_SERVICE_TYPES.find(serviceType => serviceType.serviceTypeID === serviceTypeID);
}

export function serviceTypeEntityDetails(serviceTypeID: number): EntityDetails
{
    return { type: EntityType.ServiceType, id: serviceTypeID, value: loadServiceType(serviceTypeID) };
}

// TODO Thompson replace all the definitions below with calls to the methods above
export const SERVICE_TYPE_CONSULTATION_NOTES: ServiceType = {
    serviceTypeID: 1,
    name: 'Consultation Notes',
    abbreviation: 'Consultation',
    category: ServiceRecordCategory.ConsultationNote,
    formDescriptionID: 'Service.ConsultationNote'
};

export const SERVICE_TYPE_37: ServiceType = {
    abbreviation: 'CF Physician',
    category: ServiceRecordCategory.ConsultationNote,
    formDescriptionID: 'CysticFibrosis.RespiratoryPhysicianNotes',
    name: 'CF Respiratory Physician Notes',
    program: Program.CYSTIC_FIBROSIS,
    serviceTypeID: 37,
    supportDraft: false
};

export const SERVICE_TYPE_43: ServiceType = {
    abbreviation: 'CF Physiotherapist',
    category: ServiceRecordCategory.ConsultationNote,
    formDescriptionID: 'CysticFibrosis.PhysiotherapistNotes',
    name: 'CF Physiotherapist Notes',
    program: Program.CYSTIC_FIBROSIS,
    serviceTypeID: 43,
    supportDraft: false
};

export const SERVICE_TYPE_RENAL_HAEMODIALYSIS: ServiceType = {
    serviceTypeID: 58,
    name: 'Haemodialysis',
    abbreviation: 'Haemodialysis',
    category: ServiceRecordCategory.ProcedureNote,
    program: Program.RENAL_DISEASE,
    formDescriptionID: 'Renal.Haemodialysis',
    supportDraft: true
};

export const SERVICE_TYPE_185: ServiceType = {
    abbreviation: 'CF Treatment Status',
    category: ServiceRecordCategory.TreatmentStatus,
    formDescriptionID: 'CysticFibrosis.TreatmentStatus',
    name: 'CF Treatment Status',
    program: Program.CYSTIC_FIBROSIS,
    serviceTypeID: 185,
    supportDraft: false
};

export const SERVICE_TYPE_PATIENT_WATCH_TREATMENT_STATUS: ServiceType = {
    serviceTypeID: 191,
    name: 'Patient Watch Treatment Status',
    abbreviation: 'Treatment Status',
    category: ServiceRecordCategory.TreatmentStatus,
    program: Program.PATIENT_WATCH,
    formDescriptionID: 'PatientWatch.TreatmentStatus'
};
