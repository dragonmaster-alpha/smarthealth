import REST_TESTER from 'main/component/RestTesterFormDescription';
import FormDataUtility from 'main/utility/FormDataUtility';
import FieldEditState from 'smarthealth-javascript/FieldEditState';
import FormDescription from 'smarthealth-javascript/FormDescription';
import FormFieldGroup from 'smarthealth-javascript/FormFieldGroup';
import FormFieldType from 'smarthealth-javascript/FormFieldType';
import {createFormDescription, NUMBER_WEIGHT, TEXT_NAME} from 'test/model/FormFieldMother';

/**
 * Test FormDataUtility
 *
 * @author Larry 11/12/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
describe('adds missing property to data object that is found in FormDescription field', () =>
{
    const formDescription = REST_TESTER as FormDescription;
    test('empty data object, set all missing field data to null', () =>
    {
        const data = {};
        FormDataUtility.populateMissingFieldsWithNulls(data, formDescription.fieldsAndSections);
        const result = {
            baseUrl: null,
            requestMethod: null,
            requestUrl: null,
            requestBody: null,
            responseStatus: null,
            response: null
        };
        expect(data)
            .toEqual(result);
        expect(Object.keys(data).length)
            .toEqual(6);
        expect(Object.keys(result)
            .some((fieldKey => result[fieldKey] !== null)))
            .toEqual(false);
    });
    test('two property in data object, set all missing field data to null', () =>
    {
        const data = {
            baseUrl: 'data',
            requestUrl: 'data'
        };
        FormDataUtility.populateMissingFieldsWithNulls(data, formDescription.fieldsAndSections);
        const result: any = {
            baseUrl: 'data',
            requestMethod: null,
            requestUrl: 'data',
            requestBody: null,
            responseStatus: null,
            response: null
        };

        expect(Object.keys(data).length)
            .toEqual(6);

        const findOutlierData = function (fieldKey)
        {
            if (fieldKey === 'baseUrl')
            {
                return result.baseUrl !== data.baseUrl;
            }
            else if (fieldKey === 'requestUrl')
            {
                return result.requestUrl !== data.requestUrl;
            }
            else
            {
                return result[fieldKey] !== null;
            }

        };
        expect(Object.keys(result)
            .some(findOutlierData))
            .toEqual(false);
    });
    test('populate GroupField fields values with null', () =>
    {
        const data = {};
        const GROUP_NAME_WEIGHT: FormFieldGroup = {
            fields: [
                TEXT_NAME,
                NUMBER_WEIGHT
            ],
            id: 'nameWeightGroup',
            label: 'Name and Weight',
            state: { editState: FieldEditState.Enabled },
            type: FormFieldType.Group
        };
        const descriptionWithGroupField: FormDescription = createFormDescription([GROUP_NAME_WEIGHT]);
        FormDataUtility.populateMissingFieldsWithNulls(data, descriptionWithGroupField.fieldsAndSections);

        expect(Object.keys(data).length)
            .toEqual(2);
        expect(Object.keys(data)
            .some((fieldKey => data[fieldKey] !== null)))
            .toEqual(false);
    });
    test('does not add extra property to fully populated REST_TESTER formDescription data', () =>
    {
        const data = {
            baseUrl: 'www.smarthealth.com/webui',
            requestUrl: '/services',
            requestMethod: 'get',
            requestBody: null,
            responseStatus: '',
            response: ''
        };
        FormDataUtility.populateMissingFieldsWithNulls(data, formDescription.fieldsAndSections);
        const result = {
            baseUrl: 'www.smarthealth.com/webui',
            requestUrl: '/services',
            requestMethod: 'get',
            requestBody: null,
            responseStatus: '',
            response: ''
        };

        expect(data)
            .toEqual(result);
        expect(Object.keys(data).length)
            .toEqual(6);

    });
});

describe('prepareObjectForServer return object with all null values removed', () =>
{
    test('one level nest', () =>
    {
        const nestedWithNulls: {} = {
            removeMe1: null,
            hello1: 'hello',
            removeMe2: null,
            hello2: 'hello'
        };
        expect(FormDataUtility.prepareObjectForServer(nestedWithNulls))
            .toEqual({ hello1: 'hello', hello2: 'hello' });
    });
    test('two level nest', () =>
    {
        const nestedWithNulls: {} = {
            note1: { start: 1000, finish: null },
            hello1: 'hello',
            note2: { start: null, finish: null },
            hello2: 'hello',
            stay: { start: 900, finish: 1700 }
        };
        expect(FormDataUtility.prepareObjectForServer(nestedWithNulls))
            .toEqual({
                note1: { start: 1000 },
                hello1: 'hello',
                hello2: 'hello',
                stay: { start: 900, finish: 1700 }
            });
    });
    test('three level nest', () =>
    {
        const nestedWithNulls: {} = {
            note1: { start: 1000, finish: null, note3: { start: null, finish: null } },
            hello1: 'hello',
            note2: { start: null, finish: null, note4: { start: 800, finish: 1500 } },
            hello2: 'hello',
            stay: { start: 900, finish: 1700, note5: { start: 100, finish: null } }
        };
        expect(FormDataUtility.prepareObjectForServer(nestedWithNulls))
            .toEqual({
                note1: { start: 1000 },
                hello1: 'hello',
                note2: { note4: { start: 800, finish: 1500 } },
                hello2: 'hello',
                stay: { start: 900, finish: 1700, note5: { start: 100 } }
            });
    });

    test('Dont remove tables', () =>
    {
        const dataWithTable: {} = {
            table: [
                { start: 1000, finish: 1100 },
                { start: 1200, finish: 1300 }
            ]
        };
        expect(FormDataUtility.prepareObjectForServer(dataWithTable))
            .toEqual(dataWithTable);
    });

    test('Remove tables with no rows', () =>
    {
        const dataWithEmptyTable = {
            field: 'Data',
            table: []
        };
        const expected = { field: 'Data' };
        expect(FormDataUtility.prepareObjectForServer(dataWithEmptyTable))
            .toEqual(expected);
    });

    test('Remove Transplant Assessment empty data', () =>
    {
        const dataWithNullFields = {
            ServiceDate: {
                iso: '2019-09-12'
            },
            TransplantReferral: {
                ReferringHospital: 26,
                DialysisStartDate: null,
                InitialAppointmentDate: null,
                ReferralDate: null
            },
            AssessmentSection: {
                ClinicalReviews: [
                    {
                        Test: 'Chest X-ray'
                    },
                    {
                        Test: 'Cystoscopy and retrograde pyelogram'
                    },
                    {
                        Test: 'Dental review'
                    },
                    {
                        Test: 'Dermatology review'
                    },
                    {
                        Test: 'DEXA scan'
                    },
                    {
                        Test: 'Medical review'
                    },
                    {
                        Test: 'PSA'
                    },
                    {
                        Test: 'Psychological review'
                    },
                    {
                        Test: 'Renal CT'
                    },
                    {
                        Test: 'Surgical review'
                    },
                    {
                        Test: 'Transplant education'
                    },
                    {
                        Test: 'Urine cytology'
                    }
                ],
                Cardiac: null,
                Anthropometry: null,
                TissueTyping: null,
                MicrobiologicalStudies: null,
                ThrombophillsScreen: null,
                OtherPathology: null,
                Antibodies: null
            },
            Patient: 2,
            Provider: {
                groupID: 26,
                userID: 50
            },
            Summary: 's',
            History: {
                PrimaryRenalDisease: null,
                BloodGroup: null,
                HLAA: null,
                HLAB: null,
                HLADR: null,
                DSA: null,
                PreviousGrafts: null,
                PreviousTransfusions: null,
                UrologicalIssues: null,
                UrologicalIssuesDetails: null,
                HistoryRelevantToTransplantation: null
            },
            Notes: {
                PatientSpecificIssues: null,
                SurgicalIssues: null
            },
            TransplantPlan: {
                Basiliximab: null,
                Immunosuppressio: null,
                Desensitisation: null,
                Details: null
            }
        };

        const expected = {
            AssessmentSection: {
                ClinicalReviews: [
                    {
                        Test: 'Chest X-ray'
                    },
                    {
                        Test: 'Cystoscopy and retrograde pyelogram'
                    },
                    {
                        Test: 'Dental review'
                    },
                    {
                        Test: 'Dermatology review'
                    },
                    {
                        Test: 'DEXA scan'
                    },
                    {
                        Test: 'Medical review'
                    },
                    {
                        Test: 'PSA'
                    },
                    {
                        Test: 'Psychological review'
                    },
                    {
                        Test: 'Renal CT'
                    },
                    {
                        Test: 'Surgical review'
                    },
                    {
                        Test: 'Transplant education'
                    },
                    {
                        Test: 'Urine cytology'
                    }
                ]
            },
            Patient: 2,
            Provider: {
                groupID: 26,
                userID: 50
            },
            ServiceDate: {
                iso: '2019-09-12'
            },
            Summary: 's',
            TransplantReferral: {
                ReferringHospital: 26
            }
        };

        expect(FormDataUtility.prepareObjectForServer(dataWithNullFields))
            .toEqual(expected);
    });

    test('remove null fields out of nested object array elements', () =>
    {
        const data = {
            contacts: [
                {
                    address: {
                        address1: '12 Hogwarts ',
                        address2: null
                    }
                }
            ]
        };
        const expected = {
            contacts: [
                {
                    address: {
                        address1: '12 Hogwarts '
                    }
                }
            ]
        };

        expect(FormDataUtility.prepareObjectForServer(data))
            .toEqual(expected);
    });

    test('remove null values out of array', () =>
    {
        expect(FormDataUtility.prepareObjectForServer({
            aliases: ['Harry', null, 'Pot', 'Harry Potter', null, null, 'Har', null, 'Wizard']
        }))
            .toEqual({
                aliases: ['Harry', 'Pot', 'Harry Potter', 'Har', 'Wizard']
            });
        expect(FormDataUtility.prepareObjectForServer({
            aliases: [null, null, null, null]
        }))
            .toEqual(null);
    });
});
