import MedicationSummary from 'smarthealth-javascript/MedicationSummary';

/**
 * Create MedicationSummary for testing.
 *
 * @author Thompson 29/09/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */

export const MEDICATION_4_PANADOL_RAPID: MedicationSummary = {
    ceaseReason: 'Adverse reaction',
    details: 'Details',
    dose: '2',
    finishDate: {
        iso: '2020-12-17'
    },
    firstDate: {
        iso: '2020-12-16'
    },
    frequency: 'Daily',
    id: 4,
    indication: 'Malignant tumour of head and/or neck [S]',
    latest: true,
    patientID: 17,
    prodFormStrength: 'Panadol Rapid Caplets 500 mg',
    product: {
        code: '9844',
        codeSet: 'http://ns.smarthealth.com.au/valueset/MIMS_Product',
        value: 'Panadol Rapid'
    },
    serviceID: 77,
    startDate: {
        iso: '2020-09-03'
    },
    summary: 'Summary'
};

export const MEDICATION_5_AMINO_ACIDS: MedicationSummary = {
    details: 'Details',
    dose: '1',
    finishDate: {
        iso: '2020-12-29'
    },
    firstDate: {
        iso: '2020-12-16'
    },
    frequency: 'Midday',
    id: 5,
    indication: 'Malignant tumour of head and/or neck [S]',
    latest: true,
    patientID: 17,
    prodFormStrength: 'Amino acids - Calcium - Carbohydrate - Casein - Chloride - Fat - Potassium - Lactose'
        + ' monohydrate ...',
    product: {
        code: '7179',
        codeSet: 'http://ns.smarthealth.com.au/valueset/MIMS_Generics',
        value: 'Amino acids - Calcium - Carbohydrate - Casein - Chloride - Fat - Potassium - Lactose monohydrate ...'
    },
    serviceID: 78,
    startDate: {
        iso: '2020-09-09'
    },
    summary: 'Summary'
};

export const MEDICATION_6_PANADOL: MedicationSummary = {
    details: 'Details',
    dose: '2',
    finishDate: {
        iso: '2020-12-19'
    },
    firstDate: {
        iso: '2020-12-16'
    },
    frequency: '2 hourly',
    id: 6,
    indication: 'Malignant tumour of head and/or neck [S]',
    latest: true,
    patientID: 17,
    prodFormStrength: 'Panadol Tablets 500 mg',
    product: {
        code: '391',
        codeSet: 'http://ns.smarthealth.com.au/valueset/MIMS_Product',
        value: 'Panadol'
    },
    serviceID: 78,
    startDate: {
        iso: '2020-09-09'
    },
    summary: 'Summary'
};

export const MEDICATION_7_PATIENT_BLUE_V: MedicationSummary = {
    details: 'Details',
    dose: '2',
    finishDate: {
        iso: '2020-12-21'
    },
    firstDate: {
        iso: '2021-01-02'
    },
    frequency: 'Twice a day',
    id: 7,
    indication: 'Malignant tumour of head and/or neck [S]',
    latest: true,
    patientID: 17,
    prodFormStrength: 'Patent blue V Injection 50 mg/2 mL',
    product: {
        code: '1965',
        codeSet: 'http://ns.smarthealth.com.au/valueset/MIMS_Generics',
        value: 'Patent blue V'
    },
    serviceID: 78,
    startDate: {
        iso: '2020-09-09'
    },
    summary: 'Summary'
};
