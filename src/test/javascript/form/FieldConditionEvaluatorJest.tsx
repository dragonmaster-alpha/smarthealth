import FieldConditionEvaluator from 'main/form/FieldConditionEvaluator';
import FormContext from 'main/form/FormContext';
import AppStore from 'main/store/AppStore';
import EntityData from 'smarthealth-javascript/EntityData';
import EventDateTime from 'smarthealth-javascript/EventDateTime';
import FieldCondition from 'smarthealth-javascript/FieldCondition';
import FieldConditionAnd from 'smarthealth-javascript/FieldConditionAnd';
import FieldConditionField from 'smarthealth-javascript/FieldConditionField';
import FieldConditionNot from 'smarthealth-javascript/FieldConditionNot';
import FieldConditionOr from 'smarthealth-javascript/FieldConditionOr';
import FieldEditState from 'smarthealth-javascript/FieldEditState';
import FormDescription from 'smarthealth-javascript/FormDescription';
import FormFieldSelection from 'smarthealth-javascript/FormFieldSelection';
import FormFieldType from 'smarthealth-javascript/FormFieldType';
import CFInpatientNotesForm from 'smarthealth-rest-test/formdesc/service/Form.CysticFibrosis.InpatientNotes.json';
import patientWatchQuestionnaire from 'smarthealth-rest-test/formdesc/service/Form.PatientWatch.Questionnaire.json';
import patientWatchTreatmentStatus from 'smarthealth-rest-test/formdesc/service/Form.PatientWatch.TreatmentStatus.json';
import {
    createFormDescription, DATE_TIME_DATE, FORMATTED_FIELD_TIME, NUMBER_WEIGHT, TEXT_NAME
} from 'test/model/FormFieldMother';

/**
 * Jest for FieldConditionEvaluator.tsx
 *
 * @author Thompson 29/10/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
describe('FieldConditionEvaluator.evaluate()', () =>
{
    describe('FieldConditionField with testValid', () =>
    {
        test('readOnly field', () =>
        {
            function evaluateReadonlyField(value: any): boolean
            {
                const fieldCondition: FieldCondition = {
                    fieldID: TEXT_NAME.id,
                    testValid: true
                };
                const formDescription = createFormDescription([TEXT_NAME]);
                const formContext: FormContext = FormContext.build(null, formDescription);
                formContext.fieldStates[TEXT_NAME.id] = { editState: FieldEditState.ReadOnly };
                const data: EntityData = { [TEXT_NAME.id]: value };
                return FieldConditionEvaluator.evaluate(formContext, fieldCondition, data);
            }

            expect(evaluateReadonlyField('Jay'))
                .toEqual(true);
            expect(evaluateReadonlyField(['Jay']))
                .toEqual(true);
            expect(evaluateReadonlyField(null))
                .toEqual(true);
            expect(evaluateReadonlyField(undefined))
                .toEqual(true);
            expect(evaluateReadonlyField(''))
                .toEqual(true);
            expect(evaluateReadonlyField([]))
                .toEqual(true);
        });

        test('mandatory field', () =>
        {
            function evaluateMandatoryField(value: any): boolean
            {
                const fieldCondition: FieldCondition = {
                    fieldID: TEXT_NAME.id,
                    testValid: true
                };
                const formDescription = createFormDescription([TEXT_NAME]);
                const formContext: FormContext = FormContext.build(null, formDescription);
                formContext.fieldStates[TEXT_NAME.id] = { editState: FieldEditState.Mandatory };
                const data: EntityData = { [TEXT_NAME.id]: value };
                return FieldConditionEvaluator.evaluate(formContext, fieldCondition, data);
            }

            expect(evaluateMandatoryField('Cancer'))
                .toEqual(true);
            expect(evaluateMandatoryField(['Cancer']))
                .toEqual(true);
            expect(evaluateMandatoryField(null))
                .toEqual(true);
            expect(evaluateMandatoryField(undefined))
                .toEqual(true);
            expect(evaluateMandatoryField(''))
                .toEqual(true);
            expect(evaluateMandatoryField([]))
                .toEqual(true);
        });

        test('mandatory field, validateIncludeMandatory', () =>
        {
            function evaluateMandatoryField(value: any): boolean
            {
                const fieldCondition: FieldCondition = {
                    fieldID: TEXT_NAME.id,
                    testValid: true
                };
                const formDescription = createFormDescription([TEXT_NAME]);
                const formContext: FormContext = FormContext.build(null, formDescription);
                formContext.validateIncludeMandatory = true;
                formContext.fieldStates[TEXT_NAME.id] = { editState: FieldEditState.Mandatory };
                const data: EntityData = { [TEXT_NAME.id]: value };
                return FieldConditionEvaluator.evaluate(formContext, fieldCondition, data);
            }

            expect(evaluateMandatoryField('Cancer'))
                .toEqual(true);
            expect(evaluateMandatoryField(['Cancer']))
                .toEqual(true);

            expect(evaluateMandatoryField(null))
                .toEqual(false);
            expect(evaluateMandatoryField(undefined))
                .toEqual(false);
            expect(evaluateMandatoryField(''))
                .toEqual(false);
            expect(evaluateMandatoryField([]))
                .toEqual(false);
        });

        test('DateTime field', () =>
        {
            function evaluateDateTimeField(value: EventDateTime | string): boolean
            {
                const fieldCondition: FieldCondition = {
                    fieldID: DATE_TIME_DATE.id,
                    testValid: true
                };
                const formDescription = createFormDescription([DATE_TIME_DATE]);
                // TODO Larry - review new AppStore()
                const formContext: FormContext = FormContext.build(new AppStore(), formDescription);
                formContext.fieldStates[DATE_TIME_DATE.id] = { editState: FieldEditState.Enabled };
                const data: EntityData = { [DATE_TIME_DATE.id]: value };
                return FieldConditionEvaluator.evaluate(formContext, fieldCondition, data);
            }

            expect(evaluateDateTimeField({ iso: '2000-12-25' }))
                .toEqual(true);
            expect(evaluateDateTimeField('25/12/2000'))
                .toEqual(true);
            expect(evaluateDateTimeField('25.12.2000'))
                .toEqual(true);
            expect(evaluateDateTimeField('25122000'))
                .toEqual(true);
            expect(evaluateDateTimeField(null))
                .toEqual(true);
            expect(evaluateDateTimeField('25-12-2000'))
                .toEqual(true);

            expect(evaluateDateTimeField('2000.12.25'))
                .toEqual(false);
            expect(evaluateDateTimeField('12.2000'))
                .toEqual(false);
            expect(evaluateDateTimeField('12/2000'))
                .toEqual(false);
            expect(evaluateDateTimeField('2000'))
                .toEqual(false);
        });

        describe('Formatted field', () =>
        {
            test('time format', () =>
            {
                function evaluateFormattedField(value: string): boolean
                {
                    const fieldCondition: FieldCondition = {
                        fieldID: FORMATTED_FIELD_TIME.id,
                        testValid: true
                    };
                    const formDescription = createFormDescription([FORMATTED_FIELD_TIME]);
                    const formContext: FormContext = FormContext.build(null, formDescription);
                    formContext.fieldStates[FORMATTED_FIELD_TIME.id] = { editState: FieldEditState.Enabled };
                    const data: EntityData = { [FORMATTED_FIELD_TIME.id]: value };
                    return FieldConditionEvaluator.evaluate(formContext, fieldCondition, data);
                }

                expect(evaluateFormattedField('01:23'))
                    .toEqual(true);
                expect(evaluateFormattedField('1:23'))
                    .toEqual(true);
                expect(evaluateFormattedField('01.23'))
                    .toEqual(true);
                expect(evaluateFormattedField('1.23'))
                    .toEqual(true);
                expect(evaluateFormattedField('123'))
                    .toEqual(true);
                expect(evaluateFormattedField('0123'))
                    .toEqual(true);
                expect(evaluateFormattedField(null))
                    .toEqual(true);

                expect(evaluateFormattedField('2423'))
                    .toEqual(false);
                expect(evaluateFormattedField('0160'))
                    .toEqual(false);
                expect(evaluateFormattedField('16'))
                    .toEqual(false);
            });
        });

        describe('Number field', () =>
        {
            test('maximum number of 200', () =>
            {
                function evaluateMaximumWeightField(value: number): boolean
                {
                    const fieldCondition: FieldCondition = {
                        fieldID: NUMBER_WEIGHT.id,
                        testValid: true
                    };
                    const formDescription = createFormDescription([{ ...NUMBER_WEIGHT, maximum: 200 }]);
                    const formContext: FormContext = FormContext.build(null, formDescription);
                    formContext.fieldStates[NUMBER_WEIGHT.id] = { editState: FieldEditState.Enabled };
                    const data: EntityData = { [NUMBER_WEIGHT.id]: value };
                    return FieldConditionEvaluator.evaluate(formContext, fieldCondition, data);
                }

                expect(evaluateMaximumWeightField(1))
                    .toEqual(true);
                expect(evaluateMaximumWeightField(199))
                    .toEqual(true);
                expect(evaluateMaximumWeightField(199.9))
                    .toEqual(true);
                expect(evaluateMaximumWeightField(200))
                    .toEqual(true);

                expect(evaluateMaximumWeightField(200.1))
                    .toEqual(false);
                expect(evaluateMaximumWeightField(201))
                    .toEqual(false);
            });

            test('minimum number of 18', () =>
            {
                function evaluateMinimumWeightField(value: number): boolean
                {
                    const fieldCondition: FieldCondition = {
                        fieldID: NUMBER_WEIGHT.id,
                        testValid: true
                    };
                    const formDescription = createFormDescription([{ ...NUMBER_WEIGHT, minimum: 18 }]);
                    const formContext: FormContext = FormContext.build(null, formDescription);
                    formContext.fieldStates[NUMBER_WEIGHT.id] = { editState: FieldEditState.Enabled };
                    const data: EntityData = { [NUMBER_WEIGHT.id]: value };
                    return FieldConditionEvaluator.evaluate(formContext, fieldCondition, data);
                }

                expect(evaluateMinimumWeightField(18))
                    .toEqual(true);
                expect(evaluateMinimumWeightField(19))
                    .toEqual(true);
                expect(evaluateMinimumWeightField(50))
                    .toEqual(true);

                expect(evaluateMinimumWeightField(17))
                    .toEqual(false);
            });
        });

        test('Table field', () =>
        {
            function evaluateTableField(value: any): boolean
            {
                const fieldCondition: FieldCondition = {
                    fieldID: 'Admission.TreatingClinicians',
                    testValid: true
                };
                const formContext: FormContext = FormContext.build(null,
                    CFInpatientNotesForm as FormDescription);
                formContext.fieldStates['Admission.TreatingClinicians'] = { editState: FieldEditState.Enabled };
                const data: EntityData = { 'Admission.TreatingClinicians': value };
                return FieldConditionEvaluator.evaluate(formContext, fieldCondition, data);
            }

            expect(evaluateTableField([{ Provider: { groupID: 1, userID: 2 } }]))
                .toEqual(true);
            // table with zero rows
            expect(evaluateTableField([]))
                .toEqual(true);

            expect(evaluateTableField([{}]))
                .toEqual(false);
        });

        describe('Text field', () =>
        {
            test('minimum length 2 character', () =>
            {
                function evaluateMinimumLength(value: string): boolean
                {
                    const fieldCondition: FieldCondition = {
                        fieldID: TEXT_NAME.id,
                        testValid: true
                    };
                    const formDescription = createFormDescription([{ ...TEXT_NAME, minimumLength: 2 }]);
                    const formContext: FormContext = FormContext.build(null, formDescription);
                    formContext.fieldStates[TEXT_NAME.id] = { editState: FieldEditState.Enabled };
                    const data: EntityData = { [TEXT_NAME.id]: value };
                    return FieldConditionEvaluator.evaluate(formContext, fieldCondition, data);
                }

                expect(evaluateMinimumLength('Te'))
                    .toEqual(true);
                expect(evaluateMinimumLength('Tee'))
                    .toEqual(true);
                expect(evaluateMinimumLength(''))
                    .toEqual(true);
                expect(evaluateMinimumLength(null))
                    .toEqual(true);

                expect(evaluateMinimumLength('T'))
                    .toEqual(false);
            });

            test('size: 5', () =>
            {
                function evaluateSize(value: string): boolean
                {
                    const fieldCondition: FieldCondition = {
                        fieldID: TEXT_NAME.id,
                        testValid: true
                    };
                    const formDescription = createFormDescription([{ ...TEXT_NAME, size: 5 }]);
                    const formContext: FormContext = FormContext.build(null, formDescription);
                    formContext.fieldStates[TEXT_NAME.id] = { editState: FieldEditState.Enabled };
                    const data: EntityData = { [TEXT_NAME.id]: value };
                    return FieldConditionEvaluator.evaluate(formContext, fieldCondition, data);
                }

                expect(evaluateSize('T'))
                    .toEqual(true);
                expect(evaluateSize('Tee'))
                    .toEqual(true);
                expect(evaluateSize(''))
                    .toEqual(true);
                expect(evaluateSize(null))
                    .toEqual(true);
                expect(evaluateSize('Harry'))
                    .toEqual(true);
                expect(evaluateSize('Harrie'))
                    .toEqual(false);
            });
        });
    });

    describe('FieldConditionField with equals', () =>
    {
        test('Match single field value with a single equals value', () =>
        {
            function evaluateParticipationStatus(value: any): boolean
            {
                const fieldCondition: FieldConditionField = {
                    equals: ['VIP'],
                    fieldID: 'PatientStatus.ParticipationStatus'
                };
                const formContext: FormContext = FormContext.build(null,
                    patientWatchTreatmentStatus as FormDescription);
                formContext.fieldStates['PatientStatus.ParticipantStatus'] = { editState: FieldEditState.Enabled };
                const data = {
                    'PatientStatus.ParticipationStatus': value
                };
                return FieldConditionEvaluator.evaluate(formContext, fieldCondition, data);
            }

            expect(evaluateParticipationStatus('VIP'))
                .toEqual(true);
            expect(evaluateParticipationStatus('vip'))
                .toEqual(true);
            expect(evaluateParticipationStatus({ code: 'VIP', value: 'Very import person' }))
                .toEqual(true);
            expect(evaluateParticipationStatus({ value: 'VIP' }))
                .toEqual(true);

            expect(evaluateParticipationStatus(null))
                .toEqual(false);
            expect(evaluateParticipationStatus(undefined))
                .toEqual(false);
            expect(evaluateParticipationStatus(''))
                .toEqual(false);
            expect(evaluateParticipationStatus('None'))
                .toEqual(false);

            expect(() => evaluateParticipationStatus(false))
                .toThrow(new Error('Value is not of type string or CodedValue.'));
            expect(() => evaluateParticipationStatus(true))
                .toThrow(new Error('Value is not of type string or CodedValue.'));
            expect(() => evaluateParticipationStatus(23))
                .toThrow(new Error('Value is not of type string or CodedValue.'));
        });

        test('Match a single field value with multiple equals value', () =>
        {
            function evaluatePatientQuestionnaireQ2(value: any): boolean
            {
                const fieldCondition: FieldConditionField = {
                    equals: [
                        'Breathlessness',
                        'Chest pain or tightness',
                        'Unusual or heaving bleeding'
                    ],
                    fieldID: 'PatientQuestionnaire.Q2c'
                };
                const formContext: FormContext = FormContext.build(null,
                    patientWatchQuestionnaire as FormDescription);
                formContext.fieldStates['PatientQuestionnaire.Q2c'] = { editState: FieldEditState.Enabled };
                const data = { 'PatientQuestionnaire.Q2c': value };
                return FieldConditionEvaluator.evaluate(formContext, fieldCondition, data);
            }

            expect(evaluatePatientQuestionnaireQ2('Breathlessness'))
                .toEqual(true);
            expect(evaluatePatientQuestionnaireQ2('Chest pain or tightness'))
                .toEqual(true);
            expect(evaluatePatientQuestionnaireQ2('Unusual or heaving bleeding'))
                .toEqual(true);
            expect(evaluatePatientQuestionnaireQ2('breathlessness'))
                .toEqual(true);
            expect(evaluatePatientQuestionnaireQ2('chest pain or tightness'))
                .toEqual(true);
            expect(evaluatePatientQuestionnaireQ2('unusual or heaving bleeding'))
                .toEqual(true);

            expect(evaluatePatientQuestionnaireQ2(null))
                .toEqual(false);
            expect(evaluatePatientQuestionnaireQ2(''))
                .toEqual(false);
            expect(evaluatePatientQuestionnaireQ2('None'))
                .toEqual(false);
        });

        test('Match an array field value with multiple equals value', () =>
        {
            function evaluateDirection(value: any): boolean
            {
                const fieldCondition: FieldConditionField = {
                    equals: [
                        'East',
                        'West'
                    ],
                    fieldID: 'direction'
                };
                const selectionField: FormFieldSelection = {
                    id: 'direction',
                    label: 'Direction',
                    multiple: true,
                    options: ['North, East, South, West'],
                    size: 5,
                    type: FormFieldType.Selection
                };
                const formDescription = createFormDescription([selectionField]);
                const formContext: FormContext = FormContext.build(null, formDescription);
                formContext.fieldStates['direction'] = { editState: FieldEditState.Enabled };
                const data: EntityData = { direction: value };
                return FieldConditionEvaluator.evaluate(formContext, fieldCondition, data);
            }

            expect(evaluateDirection(['East']))
                .toEqual(true);
            expect(evaluateDirection(['east']))
                .toEqual(true);
            expect(evaluateDirection(['West']))
                .toEqual(true);
            expect(evaluateDirection(['west']))
                .toEqual(true);
            expect(evaluateDirection(['wrong direction', 'East']))
                .toEqual(true);
            expect(evaluateDirection(['wrong direction', 'west']))
                .toEqual(true);

            expect(evaluateDirection([]))
                .toEqual(false);
            expect(evaluateDirection(['North']))
                .toEqual(false);
            expect(evaluateDirection(['North', 'South']))
                .toEqual(false);
        });
    });

    test('FieldConditionField with testNotEmpty', () =>
    {
        function evaluateCareTeam(value: any): boolean
        {
            const fieldCondition: FieldConditionField = {
                fieldID: 'CareTeam.TelecareGuide',
                testNotEmpty: true
            };
            const formContext: FormContext = FormContext.build(null,
                patientWatchTreatmentStatus as FormDescription);
            formContext.fieldStates['CareTeam.TelecareGuide'] = { editState: FieldEditState.Enabled };
            const data: EntityData = { 'CareTeam.TelecareGuide': value };
            return FieldConditionEvaluator.evaluate(formContext, fieldCondition, data);
        }

        expect(evaluateCareTeam('Guide value'))
            .toEqual(true);
        expect(evaluateCareTeam(true))
            .toEqual(true);
        expect(evaluateCareTeam(false))
            .toEqual(true);
        expect(evaluateCareTeam(0))
            .toEqual(true);
        expect(evaluateCareTeam(['Guide value']))
            .toEqual(true);
        expect(evaluateCareTeam({ value: 'Guide value' }))
            .toEqual(true);

        expect(evaluateCareTeam(''))
            .toEqual(false);
        expect(evaluateCareTeam(null))
            .toEqual(false);
        expect(evaluateCareTeam(undefined))
            .toEqual(false);
        expect(evaluateCareTeam([]))
            .toEqual(false);
    });

    test('FieldConditionField with testEmpty', () =>
    {
        function evaluateCareTeam(value: any): boolean
        {
            const fieldCondition: FieldConditionField = {
                fieldID: 'CareTeam.TelecareGuide',
                testEmpty: true
            };
            const formContext: FormContext = FormContext.build(null,
                patientWatchTreatmentStatus as FormDescription);
            formContext.fieldStates['CareTeam.TelecareGuide'] = { editState: FieldEditState.Enabled };
            const data: EntityData = { 'CareTeam.TelecareGuide': value };
            return FieldConditionEvaluator.evaluate(formContext, fieldCondition, data);
        }

        expect(evaluateCareTeam(''))
            .toEqual(true);
        expect(evaluateCareTeam(null))
            .toEqual(true);
        expect(evaluateCareTeam(undefined))
            .toEqual(true);
        expect(evaluateCareTeam([]))
            .toEqual(true);

        expect(evaluateCareTeam('Guide value'))
            .toEqual(false);
        expect(evaluateCareTeam(true))
            .toEqual(false);
        expect(evaluateCareTeam(false))
            .toEqual(false);
        expect(evaluateCareTeam(0))
            .toEqual(false);
        expect(evaluateCareTeam(['Guide value']))
            .toEqual(false);
        expect(evaluateCareTeam({ value: 'Guide value' }))
            .toEqual(false);
    });

    test('FieldConditionField with testTrue', () =>
    {
        function evaluateSuspendCalls(value: any): boolean
        {
            const fieldCondition: FieldConditionField = {
                fieldID: 'TelecareCalls.SuspendCalls',
                testTrue: true
            };
            const formContext: FormContext = FormContext.build(null,
                patientWatchTreatmentStatus as FormDescription);
            formContext.fieldStates['TelecareCalls.SuspendCalls'] = { editState: FieldEditState.Enabled };
            const data: EntityData = { 'TelecareCalls.SuspendCalls': value };
            return FieldConditionEvaluator.evaluate(formContext, fieldCondition, data);
        }

        expect(evaluateSuspendCalls(true))
            .toEqual(true);

        expect(evaluateSuspendCalls(null))
            .toEqual(false);
        expect(evaluateSuspendCalls(undefined))
            .toEqual(false);
        expect(evaluateSuspendCalls(false))
            .toEqual(false);

        expect(() => evaluateSuspendCalls(''))
            .toThrow(new Error('Value is not of type boolean.'));
        expect(() => evaluateSuspendCalls('Suspend the call'))
            .toThrow(new Error('Value is not of type boolean.'));
        expect(() => evaluateSuspendCalls(0))
            .toThrow(new Error('Value is not of type boolean.'));
        expect(() => evaluateSuspendCalls([]))
            .toThrow(new Error('Value is not of type boolean.'));
    });

    test('FieldConditionField with testFalse', () =>
    {
        function evaluateSuspendCalls(value: any): boolean
        {
            const fieldCondition: FieldConditionField = {
                fieldID: 'TelecareCalls.SuspendCalls',
                testFalse: true
            };
            const formContext: FormContext = FormContext.build(null,
                patientWatchTreatmentStatus as FormDescription);
            formContext.fieldStates['TelecareCalls.SuspendCalls'] = { editState: FieldEditState.Enabled };
            const data: EntityData = { 'TelecareCalls.SuspendCalls': value };
            return FieldConditionEvaluator.evaluate(formContext, fieldCondition, data);
        }

        expect(evaluateSuspendCalls(false))
            .toEqual(true);

        expect(evaluateSuspendCalls(null))
            .toEqual(false);
        expect(evaluateSuspendCalls(undefined))
            .toEqual(false);
        expect(evaluateSuspendCalls(true))
            .toEqual(false);

        expect(() => evaluateSuspendCalls(''))
            .toThrow(new Error('Value is not of type boolean.'));
        expect(() => evaluateSuspendCalls('Suspend the call'))
            .toThrow(new Error('Value is not of type boolean.'));
        expect(() => evaluateSuspendCalls(0))
            .toThrow(new Error('Value is not of type boolean.'));
        expect(() => evaluateSuspendCalls([]))
            .toThrow(new Error('Value is not of type boolean.'));
    });

    test('FieldConditionField with testEnabled', () =>
    {
        const fieldCondition: FieldConditionField = {
            fieldID: 'PatientQuestionnaire.Q1a',
            testEnabled: true
        };
        const formContext: FormContext = FormContext.build(null,
            patientWatchQuestionnaire as FormDescription);

        formContext.fieldStates['PatientQuestionnaire.Q1a'] = { editState: FieldEditState.Enabled };
        expect(FieldConditionEvaluator.evaluate(formContext, fieldCondition,
            {}))
            .toEqual(true);

        formContext.fieldStates['PatientQuestionnaire.Q1a'] = { editState: FieldEditState.Hidden };
        expect(FieldConditionEvaluator.evaluate(formContext, fieldCondition,
            {}))
            .toEqual(false);

        formContext.fieldStates['PatientQuestionnaire.Q1a'] = { editState: FieldEditState.Mandatory };
        expect(FieldConditionEvaluator.evaluate(formContext, fieldCondition,
            {}))
            .toEqual(false);

        formContext.fieldStates['PatientQuestionnaire.Q1a'] = { editState: FieldEditState.ReadOnly };
        expect(FieldConditionEvaluator.evaluate(formContext, fieldCondition,
            {}))
            .toEqual(false);

        formContext.fieldStates['PatientQuestionnaire.Q1a'] = null;
        expect(FieldConditionEvaluator.evaluate(formContext, fieldCondition,
            {}))
            .toEqual(false);
    });

    test('FieldConditionField with testDisabled', () =>
    {
        const testDisabledCondition: FieldConditionField = {
            fieldID: 'TelecareCalls.SuspendCalls',
            testDisabled: true
        };
        const formContext: FormContext = FormContext.build(null,
            patientWatchTreatmentStatus as FormDescription);

        formContext.fieldStates['TelecareCalls.SuspendCalls'] = { editState: FieldEditState.ReadOnly };
        expect(FieldConditionEvaluator.evaluate(formContext, testDisabledCondition,
            {}))
            .toEqual(true);

        formContext.fieldStates['TelecareCalls.SuspendCalls'] = { editState: FieldEditState.Hidden };
        expect(FieldConditionEvaluator.evaluate(formContext, testDisabledCondition,
            {}))
            .toEqual(true);

        formContext.fieldStates['TelecareCalls.SuspendCalls'] = { editState: FieldEditState.Mandatory };
        expect(FieldConditionEvaluator.evaluate(formContext, testDisabledCondition,
            {}))
            .toEqual(false);

        formContext.fieldStates['TelecareCalls.SuspendCalls'] = { editState: FieldEditState.Enabled };
        expect(FieldConditionEvaluator.evaluate(formContext, testDisabledCondition,
            {}))
            .toEqual(false);
    });

    test('FieldConditionField with testMandatory', () =>
    {
        const fieldCondition: FieldConditionField = {
            fieldID: 'TelecareCalls.SuspendCalls',
            testMandatory: true
        };
        const formContext: FormContext = FormContext.build(null,
            patientWatchTreatmentStatus as FormDescription);

        formContext.fieldStates['TelecareCalls.SuspendCalls'] = { editState: FieldEditState.Mandatory };
        expect(FieldConditionEvaluator.evaluate(formContext, fieldCondition, {}))
            .toEqual(true);

        formContext.fieldStates['TelecareCalls.SuspendCalls'] = { editState: FieldEditState.ReadOnly };
        expect(FieldConditionEvaluator.evaluate(formContext, fieldCondition, {}))
            .toEqual(false);
        formContext.fieldStates['TelecareCalls.SuspendCalls'] = { editState: FieldEditState.Hidden };
        expect(FieldConditionEvaluator.evaluate(formContext, fieldCondition, {}))
            .toEqual(false);
        formContext.fieldStates['TelecareCalls.SuspendCalls'] = { editState: FieldEditState.Enabled };
        expect(FieldConditionEvaluator.evaluate(formContext, fieldCondition, {}))
            .toEqual(false);
    });

// TODO add more real world multiple tests when encountered
    describe('Field condition evaluator that has multiple tests', () =>
    {
        test('field with testDisabled and testTrue', () =>
        {
            const condition: FieldConditionField = {
                fieldID: 'TelecareCalls.SuspendCalls',
                testDisabled: true,
                testTrue: true
            };
            const formContext: FormContext = FormContext.build(null,
                patientWatchTreatmentStatus as FormDescription);

            formContext.fieldStates['TelecareCalls.SuspendCalls'] = { editState: FieldEditState.Hidden };
            expect(FieldConditionEvaluator.evaluate(formContext, condition,
                { 'TelecareCalls.SuspendCalls': true }))
                .toEqual(true);
            formContext.fieldStates['TelecareCalls.SuspendCalls'] = { editState: FieldEditState.ReadOnly };
            expect(FieldConditionEvaluator.evaluate(formContext, condition,
                { 'TelecareCalls.SuspendCalls': true }))
                .toEqual(true);

            formContext.fieldStates['TelecareCalls.SuspendCalls'] = { editState: FieldEditState.Enabled };
            expect(FieldConditionEvaluator.evaluate(formContext, condition,
                { 'TelecareCalls.SuspendCalls': true }))
                .toEqual(false);
            formContext.fieldStates['TelecareCalls.SuspendCalls'] = { editState: FieldEditState.Mandatory };
            expect(FieldConditionEvaluator.evaluate(formContext, condition,
                { 'TelecareCalls.SuspendCalls': true }))
                .toEqual(false);
            formContext.fieldStates['TelecareCalls.SuspendCalls'] = { editState: FieldEditState.Hidden };
            expect(FieldConditionEvaluator.evaluate(formContext, condition,
                { 'TelecareCalls.SuspendCalls': false }))
                .toEqual(false);
            formContext.fieldStates['TelecareCalls.SuspendCalls'] = { editState: FieldEditState.ReadOnly };
            expect(FieldConditionEvaluator.evaluate(formContext, condition,
                { 'TelecareCalls.SuspendCalls': false }))
                .toEqual(false);
            formContext.fieldStates['TelecareCalls.SuspendCalls'] = { editState: FieldEditState.Hidden };
            expect(FieldConditionEvaluator.evaluate(formContext, condition,
                { 'TelecareCalls.SuspendCalls': null }))
                .toEqual(false);
            formContext.fieldStates['TelecareCalls.SuspendCalls'] = { editState: FieldEditState.ReadOnly };
            expect(FieldConditionEvaluator.evaluate(formContext, condition,
                { 'TelecareCalls.SuspendCalls': null }))
                .toEqual(false);
        });

        test('field with testEnabled and testNotEmpty', () =>
        {
            const condition: FieldConditionField = {
                fieldID: 'PatientQuestionnaire.Q4a',
                testEnabled: true,
                testNotEmpty: true
            };
            const formContext: FormContext = FormContext.build(null,
                patientWatchQuestionnaire as FormDescription);
            formContext.fieldStates['PatientQuestionnaire.Q4a'] = { editState: FieldEditState.Enabled };

            expect(FieldConditionEvaluator.evaluate(formContext, condition,
                { 'PatientQuestionnaire.Q4a': true }))
                .toEqual(true);
            expect(FieldConditionEvaluator.evaluate(formContext, condition,
                { 'PatientQuestionnaire.Q4a': false }))
                .toEqual(true);
            expect(FieldConditionEvaluator.evaluate(formContext, condition,
                { 'PatientQuestionnaire.Q4a': 'Value' }))
                .toEqual(true);
            expect(FieldConditionEvaluator.evaluate(formContext, condition,
                { 'PatientQuestionnaire.Q4a': ['Value'] }))
                .toEqual(true);
            expect(FieldConditionEvaluator.evaluate(formContext, condition,
                { 'PatientQuestionnaire.Q4a': { value: 'value' } }))
                .toEqual(true);
            expect(FieldConditionEvaluator.evaluate(formContext, condition,
                { 'PatientQuestionnaire.Q4a': {} }))
                .toEqual(true);

            expect(FieldConditionEvaluator.evaluate(formContext, condition,
                { 'PatientQuestionnaire.Q4a': null }))
                .toEqual(false);
            expect(FieldConditionEvaluator.evaluate(formContext, condition,
                { 'PatientQuestionnaire.Q4a': [] }))
                .toEqual(false);
            expect(FieldConditionEvaluator.evaluate(formContext, condition,
                { 'PatientQuestionnaire.Q4a': '' }))
                .toEqual(false);
            formContext.fieldStates['PatientQuestionnaire.Q4a'] = { editState: FieldEditState.Hidden };
            expect(FieldConditionEvaluator.evaluate(formContext, condition,
                { 'PatientQuestionnaire.Q4a': 'value' }))
                .toEqual(false);
            formContext.fieldStates['PatientQuestionnaire.Q4a'] = { editState: FieldEditState.ReadOnly };
            expect(FieldConditionEvaluator.evaluate(formContext, condition,
                { 'PatientQuestionnaire.Q4a': 'value' }))
                .toEqual(false);
            formContext.fieldStates['PatientQuestionnaire.Q4a'] = { editState: FieldEditState.Mandatory };
            expect(FieldConditionEvaluator.evaluate(formContext, condition,
                { 'PatientQuestionnaire.Q4a': 'value' }))
                .toEqual(false);
        });
    });

    describe('FieldConditionNot', () =>
    {
        test('field is not equal "VIP" with equals', () =>
        {
            function evaluateFieldNotEqualVIP(value: any): boolean
            {
                const fieldCondition: FieldConditionNot = {
                    not: {
                        equals: ['VIP'],
                        fieldID: 'PatientStatus.ParticipationStatus'
                    }
                };
                const formContext: FormContext = FormContext.build(null,
                    patientWatchTreatmentStatus as FormDescription);
                formContext.fieldStates['PatientStatus.ParticipationStatus'] = { editState: FieldEditState.Enabled };
                const data: EntityData = { 'PatientStatus.ParticipationStatus': value };
                return FieldConditionEvaluator.evaluate(formContext, fieldCondition, data);
            }

            expect(evaluateFieldNotEqualVIP('VIP'))
                .toEqual(false);
            expect(evaluateFieldNotEqualVIP('vip'))
                .toEqual(false);
            expect(evaluateFieldNotEqualVIP(['VIP']))
                .toEqual(false);
            expect(evaluateFieldNotEqualVIP(['vip']))
                .toEqual(false);
            expect(evaluateFieldNotEqualVIP(['Sponsor', 'VIP']))
                .toEqual(false);
            expect(evaluateFieldNotEqualVIP({ value: 'VIP' }))
                .toEqual(false);

            expect(evaluateFieldNotEqualVIP(''))
                .toEqual(true);
            expect(evaluateFieldNotEqualVIP(null))
                .toEqual(true);
            expect(() => evaluateFieldNotEqualVIP(true))
                .toThrow(new Error('Value is not of type string or CodedValue.'));
            expect(() => evaluateFieldNotEqualVIP(false))
                .toThrow(new Error('Value is not of type string or CodedValue.'));
            expect(evaluateFieldNotEqualVIP(['Sponsor']))
                .toEqual(true);
        });

        test('field is not enabled', () =>
        {
            const fieldCondition: FieldConditionNot = {
                not: {
                    fieldID: 'PatientQuestionnaire.Q1a',
                    testEnabled: true
                }
            };
            const formContext: FormContext = FormContext.build(null,
                patientWatchQuestionnaire as FormDescription);

            formContext.fieldStates['PatientQuestionnaire.Q1a'] = { editState: FieldEditState.Enabled };
            expect(FieldConditionEvaluator.evaluate(formContext, fieldCondition, {}))
                .toEqual(false);

            formContext.fieldStates['PatientQuestionnaire.Q1a'] = { editState: FieldEditState.Hidden };
            expect(FieldConditionEvaluator.evaluate(formContext, fieldCondition, {}))
                .toEqual(true);
            formContext.fieldStates['PatientQuestionnaire.Q1a'] = { editState: FieldEditState.Mandatory };
            expect(FieldConditionEvaluator.evaluate(formContext, fieldCondition, {}))
                .toEqual(true);
            formContext.fieldStates['PatientQuestionnaire.Q1a'] = { editState: FieldEditState.ReadOnly };
            expect(FieldConditionEvaluator.evaluate(formContext, fieldCondition, {}))
                .toEqual(true);
            formContext.fieldStates['PatientQuestionnaire.Q1a'] = null;
            expect(FieldConditionEvaluator.evaluate(formContext, fieldCondition, {}))
                .toEqual(true);
        });

        test('field is not hidden or not readOnly', () =>
        {
            const conditionNotTestDisabled: FieldConditionNot = {
                not: {
                    fieldID: 'TelecareCalls.SuspendCalls',
                    testDisabled: true
                }
            };
            const formContext: FormContext = FormContext.build(null,
                patientWatchTreatmentStatus as FormDescription);

            formContext.fieldStates['TelecareCalls.SuspendCalls'] = { editState: FieldEditState.Hidden };
            expect(FieldConditionEvaluator.evaluate(formContext, conditionNotTestDisabled, {}))
                .toEqual(false);
            formContext.fieldStates['TelecareCalls.SuspendCalls'] = { editState: FieldEditState.ReadOnly };
            expect(FieldConditionEvaluator.evaluate(formContext, conditionNotTestDisabled, {}))
                .toEqual(false);

            formContext.fieldStates['TelecareCalls.SuspendCalls'] = { editState: FieldEditState.Enabled };
            expect(FieldConditionEvaluator.evaluate(formContext, conditionNotTestDisabled, {}))
                .toEqual(true);
            formContext.fieldStates['TelecareCalls.SuspendCalls'] = { editState: FieldEditState.Mandatory };
            expect(FieldConditionEvaluator.evaluate(formContext, conditionNotTestDisabled, {}))
                .toEqual(true);
        });

        test('field is not mandatory', () =>
        {
            const conditionNotTestMandatory: FieldConditionNot = {
                not: {
                    fieldID: 'TelecareCalls.SuspendCalls',
                    testMandatory: true
                }
            };
            const formContext: FormContext = FormContext.build(null,
                patientWatchTreatmentStatus as FormDescription);

            formContext.fieldStates['TelecareCalls.SuspendCalls'] = { editState: FieldEditState.Mandatory };
            expect(FieldConditionEvaluator.evaluate(formContext, conditionNotTestMandatory, {}))
                .toEqual(false);

            formContext.fieldStates['TelecareCalls.SuspendCalls'] = { editState: FieldEditState.ReadOnly };
            expect(FieldConditionEvaluator.evaluate(formContext, conditionNotTestMandatory, {}))
                .toEqual(true);
            formContext.fieldStates['TelecareCalls.SuspendCalls'] = { editState: FieldEditState.Hidden };
            expect(FieldConditionEvaluator.evaluate(formContext, conditionNotTestMandatory, {}))
                .toEqual(true);
            formContext.fieldStates['TelecareCalls.SuspendCalls'] = { editState: FieldEditState.Enabled };
            expect(FieldConditionEvaluator.evaluate(formContext, conditionNotTestMandatory, {}))
                .toEqual(true);
        });

        test('field is not disabled and not true', () =>
        {
            const conditionNotDisabledAndTrue: FieldConditionNot = {
                not: {
                    fieldID: 'TelecareCalls.SuspendCalls',
                    testDisabled: true,
                    testTrue: true
                }
            };
            const formContext: FormContext = FormContext.build(null,
                patientWatchTreatmentStatus as FormDescription);

            formContext.fieldStates['TelecareCalls.SuspendCalls'] = { editState: FieldEditState.Hidden };
            expect(FieldConditionEvaluator.evaluate(formContext, conditionNotDisabledAndTrue,
                { 'TelecareCalls.SuspendCalls': true }))
                .toEqual(false);
            formContext.fieldStates['TelecareCalls.SuspendCalls'] = { editState: FieldEditState.ReadOnly };
            expect(FieldConditionEvaluator.evaluate(formContext, conditionNotDisabledAndTrue,
                { 'TelecareCalls.SuspendCalls': true }))
                .toEqual(false);

            formContext.fieldStates['TelecareCalls.SuspendCalls'] = { editState: FieldEditState.Hidden };
            expect(FieldConditionEvaluator.evaluate(formContext, conditionNotDisabledAndTrue, {}))
                .toEqual(true);
            formContext.fieldStates['TelecareCalls.SuspendCalls'] = { editState: FieldEditState.ReadOnly };
            expect(FieldConditionEvaluator.evaluate(formContext, conditionNotDisabledAndTrue, {}))
                .toEqual(true);
            formContext.fieldStates['TelecareCalls.SuspendCalls'] = { editState: FieldEditState.Mandatory };
            expect(FieldConditionEvaluator.evaluate(formContext, conditionNotDisabledAndTrue,
                { 'TelecareCalls.SuspendCalls': true }))
                .toEqual(true);
            formContext.fieldStates['TelecareCalls.SuspendCalls'] = { editState: FieldEditState.Enabled };
            expect(FieldConditionEvaluator.evaluate(formContext, conditionNotDisabledAndTrue,
                { 'TelecareCalls.SuspendCalls': true }))
                .toEqual(true);
            formContext.fieldStates['TelecareCalls.SuspendCalls'] = { editState: FieldEditState.Mandatory };
            expect(FieldConditionEvaluator.evaluate(formContext, conditionNotDisabledAndTrue,
                { 'TelecareCalls.SuspendCalls': null }))
                .toEqual(true);
            formContext.fieldStates['TelecareCalls.SuspendCalls'] = { editState: FieldEditState.Enabled };
            expect(() => FieldConditionEvaluator.evaluate(formContext, conditionNotDisabledAndTrue,
                { 'TelecareCalls.SuspendCalls': '' }))
                .toThrow(new Error('Value is not of type boolean.'));
            formContext.fieldStates['TelecareCalls.SuspendCalls'] = { editState: FieldEditState.Enabled };
            expect(() => FieldConditionEvaluator.evaluate(formContext, conditionNotDisabledAndTrue,
                { 'TelecareCalls.SuspendCalls': 'Suspended' }))
                .toThrow(new Error('Value is not of type boolean.'));
            formContext.fieldStates['TelecareCalls.SuspendCalls'] = { editState: FieldEditState.Mandatory };
            expect(() => FieldConditionEvaluator.evaluate(formContext, conditionNotDisabledAndTrue,
                { 'TelecareCalls.SuspendCalls': [] }))
                .toThrow(new Error('Value is not of type boolean.'));
            formContext.fieldStates['TelecareCalls.SuspendCalls'] = { editState: FieldEditState.Enabled };
            expect(() => FieldConditionEvaluator.evaluate(formContext, conditionNotDisabledAndTrue,
                { 'TelecareCalls.SuspendCalls': ['true'] }))
                .toThrow(new Error('Value is not of type boolean.'));
            formContext.fieldStates['TelecareCalls.SuspendCalls'] = { editState: FieldEditState.Mandatory };
            expect(() => FieldConditionEvaluator.evaluate(formContext, conditionNotDisabledAndTrue,
                { 'TelecareCalls.SuspendCalls': 420 }))
                .toThrow(new Error('Value is not of type boolean.'));
        });
    });

    describe('FieldConditionOr', () =>
    {
        test('condition with a single field condition', () =>
        {
            function evaluateOrWithOneFieldCondition(value: any): boolean
            {
                const fieldCondition: FieldConditionOr = {
                    or: [
                        {
                            equals: [
                                'Illness'
                            ],
                            fieldID: 'PatientQuestionnaire.Q1c'
                        }
                    ]
                };
                const formContext: FormContext = FormContext.build(null,
                    patientWatchQuestionnaire as FormDescription);
                formContext.fieldStates['PatientQuestionnaire.Q1c'] = { editState: FieldEditState.Enabled };
                const data: EntityData = { 'PatientQuestionnaire.Q1c': value };
                return FieldConditionEvaluator.evaluate(formContext, fieldCondition, data);
            }

            expect(evaluateOrWithOneFieldCondition('Illness'))
                .toEqual(true);
            expect(evaluateOrWithOneFieldCondition('illness'))
                .toEqual(true);
            expect(evaluateOrWithOneFieldCondition(['Healing', 'Blood test', 'illness']))
                .toEqual(true);

            expect(evaluateOrWithOneFieldCondition('Blood test'))
                .toEqual(false);
            expect(evaluateOrWithOneFieldCondition(''))
                .toEqual(false);
            expect(evaluateOrWithOneFieldCondition(null))
                .toEqual(false);
            expect(evaluateOrWithOneFieldCondition(['Blood test', 'Healing']))
                .toEqual(false);

            expect(() => evaluateOrWithOneFieldCondition(true))
                .toThrow(new Error('Value is not of type string or CodedValue.'));
            expect(() => evaluateOrWithOneFieldCondition(false))
                .toThrow(new Error('Value is not of type string or CodedValue.'));
        });

        test('condition with a 3 FieldConditionField.equals', () =>
        {
            function evaluateOrWithThreeFieldCondition(data: EntityData): boolean
            {
                const fieldCondition: FieldConditionOr = {
                    or: [
                        {
                            equals: [
                                'Illness'
                            ],
                            fieldID: 'PatientQuestionnaire.Q1c'
                        },
                        {
                            equals: [
                                'Depression, mental health or behavioural issues'
                            ],
                            fieldID: 'PatientQuestionnaire.Q2c'
                        },
                        {
                            equals: [
                                'Fair',
                                'Poor',
                                'Very poor'
                            ],
                            fieldID: 'PatientQuestionnaire.Q3a'
                        }
                    ]
                };
                const formContext: FormContext = FormContext.build(null,
                    patientWatchQuestionnaire as FormDescription);
                formContext.fieldStates['PatientQuestionnaire.Q1c'] = { editState: FieldEditState.Enabled };
                formContext.fieldStates['PatientQuestionnaire.Q2c'] = { editState: FieldEditState.Enabled };
                formContext.fieldStates['PatientQuestionnaire.Q3a'] = { editState: FieldEditState.Enabled };
                return FieldConditionEvaluator.evaluate(formContext, fieldCondition, data);
            }

            expect(evaluateOrWithThreeFieldCondition({ 'PatientQuestionnaire.Q1c': 'Illness' }))
                .toEqual(true);
            expect(evaluateOrWithThreeFieldCondition({ 'PatientQuestionnaire.Q1c': 'illness' }))
                .toEqual(true);
            expect(
                evaluateOrWithThreeFieldCondition({
                    'PatientQuestionnaire.Q1c': ['Healing', 'Blood test', 'illness']
                }))
                .toEqual(true);

            expect(evaluateOrWithThreeFieldCondition(
                { 'PatientQuestionnaire.Q2c': 'Depression, mental health or behavioural issues' }))
                .toEqual(true);
            expect(evaluateOrWithThreeFieldCondition(
                { 'PatientQuestionnaire.Q2c': 'depression, mental health or behavioural issues' }))
                .toEqual(true);
            expect(evaluateOrWithThreeFieldCondition({
                'PatientQuestionnaire.Q2c': ['Healing', 'Blood test', 'Depression, mental health or behavioural issues']
            }))
                .toEqual(true);

            expect(evaluateOrWithThreeFieldCondition({ 'PatientQuestionnaire.Q3a': 'Fair' }))
                .toEqual(true);
            expect(evaluateOrWithThreeFieldCondition({ 'PatientQuestionnaire.Q3a': 'Poor' }))
                .toEqual(true);
            expect(evaluateOrWithThreeFieldCondition({ 'PatientQuestionnaire.Q3a': 'Very poor' }))
                .toEqual(true);
            expect(evaluateOrWithThreeFieldCondition({ 'PatientQuestionnaire.Q3a': ['fair'] }))
                .toEqual(true);
            expect(evaluateOrWithThreeFieldCondition({ 'PatientQuestionnaire.Q3a': ['Average', 'poor'] }))
                .toEqual(true);
            expect(evaluateOrWithThreeFieldCondition(
                { 'PatientQuestionnaire.Q3a': ['Average', 'Extremely poor', 'very poor'] }))
                .toEqual(true);
            expect(evaluateOrWithThreeFieldCondition({
                'PatientQuestionnaire.Q3a': ['Average', 'fair', 'very poor']
            }))
                .toEqual(true);

            expect(evaluateOrWithThreeFieldCondition({
                'PatientQuestionnaire.Q1c': 'Illness',
                'PatientQuestionnaire.Q2c': 'Depression, mental health or behavioural issues',
                'PatientQuestionnaire.Q3a': ['Fair', 'Poor', 'Very poor']
            }))
                .toEqual(true);

            expect(evaluateOrWithThreeFieldCondition({
                'PatientQuestionnaire.Q1c': '',
                'PatientQuestionnaire.Q2c': null,
                'PatientQuestionnaire.Q3a': []
            }))
                .toEqual(false);
            expect(evaluateOrWithThreeFieldCondition({
                'PatientQuestionnaire.Q1c': 'Complication',
                'PatientQuestionnaire.Q2c': 'Drug use issues',
                'PatientQuestionnaire.Q3a': ['Good']
            }))
                .toEqual(false);
        });

        test('condition fields have at least one field with enabled and notEmpty', () =>
        {
            const fieldCondition: FieldConditionOr = {
                or: [
                    {
                        fieldID: 'PatientQuestionnaire.Q1a',
                        testEnabled: true,
                        testNotEmpty: true
                    },
                    {
                        fieldID: 'PatientQuestionnaire.Q2a',
                        testEnabled: true,
                        testNotEmpty: true
                    }
                ]
            };
            const formContext: FormContext = FormContext.build(null,
                patientWatchQuestionnaire as FormDescription);
            formContext.fieldStates['PatientQuestionnaire.Q1a'] = { editState: FieldEditState.Enabled };
            formContext.fieldStates['PatientQuestionnaire.Q2a'] = { editState: FieldEditState.Enabled };

            expect(FieldConditionEvaluator.evaluate(formContext, fieldCondition,
                { 'PatientQuestionnaire.Q1a': false }))
                .toEqual(true);
            expect(FieldConditionEvaluator.evaluate(formContext, fieldCondition,
                { 'PatientQuestionnaire.Q2a': true }))
                .toEqual(true);
            expect(FieldConditionEvaluator.evaluate(formContext, fieldCondition,
                {
                    'PatientQuestionnaire.Q1a': false,
                    'PatientQuestionnaire.Q2a': false
                }))
                .toEqual(true);

            expect(FieldConditionEvaluator.evaluate(formContext, fieldCondition,
                { 'PatientQuestionnaire.Q1a': null }))
                .toEqual(false);
            expect(FieldConditionEvaluator.evaluate(formContext, fieldCondition,
                { 'PatientQuestionnaire.Q2a': null }))
                .toEqual(false);

            formContext.fieldStates['PatientQuestionnaire.Q1a'] = { editState: FieldEditState.Mandatory };
            expect(FieldConditionEvaluator.evaluate(formContext, fieldCondition,
                { 'PatientQuestionnaire.Q1a': false }))
                .toEqual(false);
            formContext.fieldStates['PatientQuestionnaire.Q1a'] = { editState: FieldEditState.Enabled };
            formContext.fieldStates['PatientQuestionnaire.Q2a'] = { editState: FieldEditState.Hidden };
            expect(FieldConditionEvaluator.evaluate(formContext, fieldCondition,
                { 'PatientQuestionnaire.Q2a': true }))
                .toEqual(false);
            formContext.fieldStates['PatientQuestionnaire.Q1a'] = { editState: FieldEditState.ReadOnly };
            formContext.fieldStates['PatientQuestionnaire.Q2a'] = { editState: FieldEditState.Enabled };
            expect(FieldConditionEvaluator.evaluate(formContext, fieldCondition,
                { 'PatientQuestionnaire.Q1a': true }))
                .toEqual(false);
        });
    });

    describe('FieldConditionAnd', () =>
    {
        test('evaluate one condition', () =>
        {
            function evaluateANDWithOneFieldCondition(value: any): boolean
            {
                const fieldID = 'Call.Respondent';
                const fieldCondition: FieldConditionAnd = {
                    and: [
                        {
                            fieldID,
                            testNotEmpty: true
                        }
                    ]
                };
                const formContext: FormContext = FormContext.build(null,
                    patientWatchQuestionnaire as FormDescription);
                formContext.fieldStates[fieldID] = { editState: FieldEditState.Enabled };
                const data: EntityData = { [fieldID]: value };
                return FieldConditionEvaluator.evaluate(formContext, fieldCondition, data);
            }

            expect(evaluateANDWithOneFieldCondition(null))
                .toEqual(false);
            expect(evaluateANDWithOneFieldCondition([]))
                .toEqual(false);
            expect(evaluateANDWithOneFieldCondition(''))
                .toEqual(false);

            expect(evaluateANDWithOneFieldCondition('Mother'))
                .toEqual(true);
            expect(evaluateANDWithOneFieldCondition(['Mother']))
                .toEqual(true);
            expect(evaluateANDWithOneFieldCondition(true))
                .toEqual(true);
            expect(evaluateANDWithOneFieldCondition(false))
                .toEqual(true);
            expect(evaluateANDWithOneFieldCondition({ value: 'Mother' }))
                .toEqual(true);
        });

        test('evaluate two conditions, one field is enabled and the other is true', () =>
        {
            const condition: FieldConditionAnd = {
                and: [
                    {
                        fieldID: 'PatientQuestionnaire.Q4a',
                        testEnabled: true
                    },
                    {
                        fieldID: 'PatientQuestionnaire.Q9c',
                        testTrue: true
                    }
                ]
            };
            const formContext: FormContext = FormContext.build(null,
                patientWatchQuestionnaire as FormDescription);

            formContext.fieldStates['PatientQuestionnaire.Q4a'] = { editState: FieldEditState.Enabled };
            formContext.fieldStates['PatientQuestionnaire.Q9c'] = { editState: FieldEditState.Enabled };
            expect(FieldConditionEvaluator.evaluate(formContext, condition,
                {
                    'PatientQuestionnaire.Q4a': null,
                    'PatientQuestionnaire.Q9c': true
                }))
                .toEqual(true);

            formContext.fieldStates['PatientQuestionnaire.Q4a'] = { editState: FieldEditState.ReadOnly };
            formContext.fieldStates['PatientQuestionnaire.Q9c'] = { editState: FieldEditState.Enabled };
            expect(FieldConditionEvaluator.evaluate(formContext, condition,
                {
                    'PatientQuestionnaire.Q4a': null,
                    'PatientQuestionnaire.Q9c': true
                }))
                .toEqual(false);
            formContext.fieldStates['PatientQuestionnaire.Q4a'] = { editState: FieldEditState.Hidden };
            formContext.fieldStates['PatientQuestionnaire.Q9c'] = { editState: FieldEditState.Enabled };
            expect(FieldConditionEvaluator.evaluate(formContext, condition,
                {
                    'PatientQuestionnaire.Q4a': null,
                    'PatientQuestionnaire.Q9c': true
                }))
                .toEqual(false);
            formContext.fieldStates['PatientQuestionnaire.Q4a'] = { editState: FieldEditState.Mandatory };
            formContext.fieldStates['PatientQuestionnaire.Q9c'] = { editState: FieldEditState.Enabled };
            expect(FieldConditionEvaluator.evaluate(formContext, condition,
                {
                    'PatientQuestionnaire.Q4a': null,
                    'PatientQuestionnaire.Q9c': true
                }))
                .toEqual(false);

            formContext.fieldStates['PatientQuestionnaire.Q4a'] = { editState: FieldEditState.Enabled };
            formContext.fieldStates['PatientQuestionnaire.Q9c'] = { editState: FieldEditState.Enabled };
            expect(() => FieldConditionEvaluator.evaluate(formContext, condition,
                {
                    'PatientQuestionnaire.Q4a': null,
                    'PatientQuestionnaire.Q9c': 'true'
                }))
                .toThrow(new Error('Value is not of type boolean.'));
            expect(() => FieldConditionEvaluator.evaluate(formContext, condition,
                {
                    'PatientQuestionnaire.Q4a': null,
                    'PatientQuestionnaire.Q9c': ''
                }))
                .toThrow(new Error('Value is not of type boolean.'));
            expect(() => FieldConditionEvaluator.evaluate(formContext, condition,
                {
                    'PatientQuestionnaire.Q4a': null,
                    'PatientQuestionnaire.Q9c': ['true']
                }))
                .toThrow(new Error('Value is not of type boolean.'));
            expect(() => FieldConditionEvaluator.evaluate(formContext, condition,
                {
                    'PatientQuestionnaire.Q4a': null,
                    'PatientQuestionnaire.Q9c': { value: 'true' }
                }))
                .toThrow(new Error('Value is not of type boolean.'));
        });
    });

    describe('Nested FieldCondition', () =>
    {
        test('evaluate (fieldA is enabled) AND (fieldB is true OR fieldC is not empty) ', () =>
        {
            const fieldCondition: FieldCondition = {
                and: [
                    {
                        fieldID: 'PatientQuestionnaire.Q3a',
                        testEnabled: true
                    },
                    {
                        or: [
                            {
                                fieldID: 'PatientQuestionnaire.Q3b',
                                testTrue: true
                            },
                            {
                                fieldID: 'PatientQuestionnaire.Q3c',
                                testNotEmpty: true
                            }
                        ]
                    }
                ]
            };
            const formContext: FormContext = FormContext.build(null,
                patientWatchQuestionnaire as FormDescription);
            formContext.fieldStates['PatientQuestionnaire.Q3a'] = { editState: FieldEditState.Enabled };
            formContext.fieldStates['PatientQuestionnaire.Q3b'] = { editState: FieldEditState.Enabled };
            formContext.fieldStates['PatientQuestionnaire.Q3c'] = { editState: FieldEditState.Enabled };

            expect(FieldConditionEvaluator.evaluate(formContext, fieldCondition,
                {
                    'PatientQuestionnaire.Q3a': null,
                    'PatientQuestionnaire.Q3b': true,
                    'PatientQuestionnaire.Q3c': 'Agreed'
                }))
                .toEqual(true);
            expect(FieldConditionEvaluator.evaluate(formContext, fieldCondition,
                {
                    'PatientQuestionnaire.Q3a': null,
                    'PatientQuestionnaire.Q3b': true,
                    'PatientQuestionnaire.Q3c': null
                }))
                .toEqual(true);
            expect(FieldConditionEvaluator.evaluate(formContext, fieldCondition,
                {
                    'PatientQuestionnaire.Q3a': null,
                    'PatientQuestionnaire.Q3b': false,
                    'PatientQuestionnaire.Q3c': 'Agreed'
                }))
                .toEqual(true);
            expect(FieldConditionEvaluator.evaluate(formContext, fieldCondition,
                {
                    'PatientQuestionnaire.Q3a': null,
                    'PatientQuestionnaire.Q3b': false,
                    'PatientQuestionnaire.Q3c': ''
                }))
                .toEqual(false);
            formContext.fieldStates['PatientQuestionnaire.Q3a'] = { editState: FieldEditState.Mandatory };
            expect(FieldConditionEvaluator.evaluate(formContext, fieldCondition,
                {
                    'PatientQuestionnaire.Q3a': null,
                    'PatientQuestionnaire.Q3b': true,
                    'PatientQuestionnaire.Q3c': 'Agreed'
                }))
                .toEqual(false);
        });

        test('evaluate fieldA is not empty AND fieldB is not true', () =>
        {
            const respondentID = 'Call.Respondent';
            const offlineID = 'PaJR.PaJROffline';
            const condition: FieldCondition = {
                and: [
                    {
                        fieldID: respondentID,
                        testNotEmpty: true
                    },
                    {
                        not: {
                            fieldID: offlineID,
                            testTrue: true
                        }
                    }
                ]
            };
            const formContext: FormContext = FormContext.build(null,
                patientWatchQuestionnaire as FormDescription);
            formContext.fieldStates[respondentID] = { editState: FieldEditState.Enabled };
            formContext.fieldStates[offlineID] = { editState: FieldEditState.Enabled };

            expect(FieldConditionEvaluator.evaluate(formContext, condition,
                {
                    [respondentID]: true,
                    [offlineID]: false
                }))
                .toEqual(true);

            expect(FieldConditionEvaluator.evaluate(formContext, condition,
                {
                    [respondentID]: true,
                    [offlineID]: true
                }))
                .toEqual(false);
            expect(FieldConditionEvaluator.evaluate(formContext, condition,
                {
                    [respondentID]: null,
                    [offlineID]: false
                }))
                .toEqual(false);
        });

        test('evaluate (fieldA is enabled and not empty) OR (fieldB equals Consent given AND fieldC is not '
            + 'disabled and not empty ', () =>
        {
            const condition: FieldCondition = {
                or: [
                    {
                        fieldID: 'PatientQuestionnaire.Q1a',
                        testEnabled: true,
                        testNotEmpty: true
                    },
                    {
                        and: [
                            {
                                fieldID: 'PatientQuestionnaire.Q1b',
                                equals: ['Consent given']
                            },
                            {
                                not: {
                                    fieldID: 'PatientQuestionnaire.Q1c',
                                    testDisabled: true,
                                    testEmpty: true
                                }
                            }
                        ]
                    }
                ]
            };
            const formContext: FormContext = FormContext.build(null,
                patientWatchQuestionnaire as FormDescription);

            formContext.fieldStates['PatientQuestionnaire.Q1a'] = { editState: FieldEditState.Enabled };
            formContext.fieldStates['PatientQuestionnaire.Q1b'] = { editState: FieldEditState.Enabled };
            formContext.fieldStates['PatientQuestionnaire.Q1c'] = { editState: FieldEditState.Enabled };
            expect(FieldConditionEvaluator.evaluate(formContext, condition,
                {
                    'PatientQuestionnaire.Q1a': 'Proceed',
                    'PatientQuestionnaire.Q1b': 'Consent given',
                    'PatientQuestionnaire.Q1c': true
                }))
                .toEqual(true);
            formContext.fieldStates['PatientQuestionnaire.Q1a'] = { editState: FieldEditState.ReadOnly };
            formContext.fieldStates['PatientQuestionnaire.Q1b'] = { editState: FieldEditState.Hidden };
            formContext.fieldStates['PatientQuestionnaire.Q1c'] = { editState: FieldEditState.Mandatory };
            expect(FieldConditionEvaluator.evaluate(formContext, condition,
                {
                    'PatientQuestionnaire.Q1a': 'Proceed',
                    'PatientQuestionnaire.Q1b': 'Consent given',
                    'PatientQuestionnaire.Q1c': true
                }))
                .toEqual(true);
            formContext.fieldStates['PatientQuestionnaire.Q1a'] = { editState: FieldEditState.Enabled };
            formContext.fieldStates['PatientQuestionnaire.Q1b'] = { editState: FieldEditState.Hidden };
            formContext.fieldStates['PatientQuestionnaire.Q1c'] = { editState: FieldEditState.Mandatory };
            expect(FieldConditionEvaluator.evaluate(formContext, condition,
                {
                    'PatientQuestionnaire.Q1a': 'Proceed',
                    'PatientQuestionnaire.Q1b': 'No consent',
                    'PatientQuestionnaire.Q1c': true
                }))
                .toEqual(true);
            expect(FieldConditionEvaluator.evaluate(formContext, condition,
                {
                    'PatientQuestionnaire.Q1a': 'Proceed',
                    'PatientQuestionnaire.Q1b': 'Consent given',
                    'PatientQuestionnaire.Q1c': true
                }))
                .toEqual(true);
            formContext.fieldStates['PatientQuestionnaire.Q1a'] = { editState: FieldEditState.Hidden };
            formContext.fieldStates['PatientQuestionnaire.Q1b'] = { editState: FieldEditState.Hidden };
            formContext.fieldStates['PatientQuestionnaire.Q1c'] = { editState: FieldEditState.Mandatory };
            expect(FieldConditionEvaluator.evaluate(formContext, condition,
                {
                    'PatientQuestionnaire.Q1a': null,
                    'PatientQuestionnaire.Q1b': 'No consent',
                    'PatientQuestionnaire.Q1c': true
                }))
                .toEqual(false);
            expect(FieldConditionEvaluator.evaluate(formContext, condition,
                {
                    'PatientQuestionnaire.Q1a': 'Proceed',
                    'PatientQuestionnaire.Q1b': 'No consent',
                    'PatientQuestionnaire.Q1c': true
                }))
                .toEqual(false);
        });
    });
});
