import FieldStateEvaluator from 'main/form/FieldStateEvaluator';
import FormContext from 'main/form/FormContext';
import FormDescriptionUtility from 'main/utility/FormDescriptionUtility';
import FieldEditState from 'smarthealth-javascript/FieldEditState';
import FormDescription from 'smarthealth-javascript/FormDescription';
import FormField from 'smarthealth-javascript/FormField';
import consultationNoteForm from 'smarthealth-rest-test/formdesc/service/Form.Service.ConsultationNote.json';
import medicationForm from 'smarthealth-rest-test/formdesc/service/Form.Service.Medication.json';
import patientWatchQuestionnaire from 'smarthealth-rest-test/handler/Form.PatientWatch.Questionnaire.json';
import fieldStatesConsultationNote from 'test/form/FieldStates.ConsultationNote.json';
import fieldStatesMedication from 'test/form/FieldStates.Medication.json';

/**
 * Jest for FieldStateEvaluator.tsx
 *
 * @author Thompson 4/11/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
describe('FieldStateEvaluator for Patient Watch Questionnaire service', () =>
{
    let formContext: FormContext;
    beforeEach(() =>
    {
        formContext = FormContext.build(null,
            patientWatchQuestionnaire as FormDescription);
    });
    test('Call.Respondent field', () =>
    {
        const field: FormField = FormDescriptionUtility.findField(
            patientWatchQuestionnaire as FormDescription, 'Call.Respondent');
        expect(FieldStateEvaluator.evaluate(formContext, field, { 'Call.Outcome': 'Answered by respondent' }))
            .toEqual({ editState: 'Mandatory' });
        expect(FieldStateEvaluator.evaluate(formContext, field, { 'Call.Outcome': 'Call received' }))
            .toEqual({ editState: 'Mandatory' });

        expect(FieldStateEvaluator.evaluate(formContext, field, { 'Call.Outcome': 'No answer' }))
            .toEqual({ clearValue: true, editState: 'Hidden', viewStateHidden: true });
    });

    test('PaJR.Submitted field', () =>
    {
        const field: FormField = FormDescriptionUtility.findField(
            patientWatchQuestionnaire as FormDescription, 'PaJR.Submitted');
        expect(FieldStateEvaluator.evaluate(formContext, field, { 'PaJR.PaJROffline': true }))
            .toEqual({ editState: 'Hidden', viewStateHidden: true });

        expect(FieldStateEvaluator.evaluate(formContext, field, { 'PaJR.PaJROffline': false }))
            .toEqual({ editState: 'ReadOnly' });
    });

    test('PatientQuestionnaire.Q1a field', () =>
    {
        const field: FormField = FormDescriptionUtility.findField(
            patientWatchQuestionnaire as FormDescription, 'PatientQuestionnaire.Q1a');
        expect(FieldStateEvaluator.evaluate(formContext, field, {
            'Call.Respondent': 'Answered by respondent',
            'PaJR.PaJROffline': false
        }))
            .toEqual({ editState: 'Mandatory' });

        expect(FieldStateEvaluator.evaluate(formContext, field, {
            'Call.Respondent': null,
            'PaJR.PaJROffline': false
        }))
            .toEqual({ clearValue: true, editState: 'Hidden', viewStateHidden: true });
        expect(FieldStateEvaluator.evaluate(formContext, field, {
            'Call.Respondent': 'Answered by respondent',
            'PaJR.PaJROffline': true
        }))
            .toEqual({ clearValue: true, editState: 'Hidden', viewStateHidden: true });
    });

    test('PatientQuestionnaire.Q1c field', () =>
    {
        const field: FormField = FormDescriptionUtility.findField(
            patientWatchQuestionnaire as FormDescription, 'PatientQuestionnaire.Q1c');
        expect(FieldStateEvaluator.evaluate(formContext, field, {
            'PatientQuestionnaire.Q1a': true
        }))
            .toEqual({ editState: 'Mandatory' });

        expect(FieldStateEvaluator.evaluate(formContext, field, {
            'PatientQuestionnaire.Q1a': false
        }))
            .toEqual({ editState: 'Enabled' });

        formContext.fieldStates['PatientQuestionnaire.Q1a'] = { editState: FieldEditState.Hidden };
        expect(FieldStateEvaluator.evaluate(formContext, field,
            {
                'PatientQuestionnaire.Q1a': null
            }))
            .toEqual({ clearValue: true, editState: 'Hidden', viewStateHidden: true });
        formContext.fieldStates['PatientQuestionnaire.Q1a'] = { editState: FieldEditState.ReadOnly };
        expect(FieldStateEvaluator.evaluate(formContext, field,
            {
                'PatientQuestionnaire.Q1a': null
            }))
            .toEqual({ clearValue: true, editState: 'Hidden', viewStateHidden: true });

    });

    test('PatientQuestionnaire.Q10a field', () =>
    {
        const field: FormField = FormDescriptionUtility.findField(
            patientWatchQuestionnaire as FormDescription, 'PatientQuestionnaire.Q10a');

        formContext.fieldStates['PatientQuestionnaire.Q4a'] = { editState: FieldEditState.Enabled };
        formContext.fieldStates['PatientQuestionnaire.Q9c'] = { editState: FieldEditState.Enabled };
        formContext.fieldStates['PatientQuestionnaire.Q1c'] = { editState: FieldEditState.Enabled };
        formContext.fieldStates['PatientQuestionnaire.Q2c'] = { editState: FieldEditState.Enabled };
        formContext.fieldStates['PatientQuestionnaire.Q3a'] = { editState: FieldEditState.Enabled };

        expect(FieldStateEvaluator.evaluate(formContext, field,
            {
                'PatientQuestionnaire.Q4a': null,
                'PatientQuestionnaire.Q9c': false,
                'PatientQuestionnaire.Q1c': [
                    {
                        codeSet: 'http://ns.smarthealth.com.au/valueset/Patientwatch.Classification',
                        value: 'Illness'
                    }
                ],
                'PatientQuestionnaire.Q2c': null,
                'PatientQuestionnaire.Q3a': null
            }))
            .toEqual({ editState: 'Mandatory' });
        expect(FieldStateEvaluator.evaluate(formContext, field,
            {
                'PatientQuestionnaire.Q4a': null,
                'PatientQuestionnaire.Q9c': false,
                'PatientQuestionnaire.Q1c': [
                    {
                        codeSet: 'http://ns.smarthealth.com.au/valueset/Patientwatch.Classification',
                        value: 'Illness'
                    }
                ],
                'PatientQuestionnaire.Q2c': null,
                'PatientQuestionnaire.Q3a': null
            }))
            .toEqual({ editState: 'Mandatory' });
        expect(FieldStateEvaluator.evaluate(formContext, field,
            {
                'PatientQuestionnaire.Q4a': null,
                'PatientQuestionnaire.Q9c': false,
                'PatientQuestionnaire.Q1c': null,
                'PatientQuestionnaire.Q2c': [
                    'Depression, mental health or behavioural issues'
                ],
                'PatientQuestionnaire.Q3a': null
            }))
            .toEqual({ editState: 'Mandatory' });
        expect(FieldStateEvaluator.evaluate(formContext, field,
            {
                'PatientQuestionnaire.Q4a': null,
                'PatientQuestionnaire.Q9c': false,
                'PatientQuestionnaire.Q1c': null,
                'PatientQuestionnaire.Q2c': null,
                'PatientQuestionnaire.Q3a': ['Poor']
            }))
            .toEqual({ editState: 'Mandatory' });

        expect(FieldStateEvaluator.evaluate(formContext, field,
            {
                'PatientQuestionnaire.Q4a': null,
                'PatientQuestionnaire.Q9c': null,
                'PatientQuestionnaire.Q1c': null,
                'PatientQuestionnaire.Q2c': null,
                'PatientQuestionnaire.Q3a': null
            }))
            .toEqual({ clearValue: true, editState: 'Hidden', viewStateHidden: true });
        expect(FieldStateEvaluator.evaluate(formContext, field,
            {
                'PatientQuestionnaire.Q4a': null,
                'PatientQuestionnaire.Q9c': true,
                'PatientQuestionnaire.Q1c': null,
                'PatientQuestionnaire.Q2c': null,
                'PatientQuestionnaire.Q3a': ['Very poor']
            }))
            .toEqual({ clearValue: true, editState: 'Hidden', viewStateHidden: true });
        formContext.fieldStates['PatientQuestionnaire.Q4a'] = { editState: FieldEditState.ReadOnly };
        expect(FieldStateEvaluator.evaluate(formContext, field,
            {
                'PatientQuestionnaire.Q4a': null,
                'PatientQuestionnaire.Q9c': null,
                'PatientQuestionnaire.Q1c': [
                    {
                        codeSet: 'http://ns.smarthealth.com.au/valueset/Patientwatch.Classification',
                        value: 'Illness'
                    }
                ],
                'PatientQuestionnaire.Q2c': null,
                'PatientQuestionnaire.Q3a': null
            }))
            .toEqual({ clearValue: true, editState: 'Hidden', viewStateHidden: true });
        formContext.fieldStates['PatientQuestionnaire.Q4a'] = { editState: FieldEditState.Hidden };
        expect(FieldStateEvaluator.evaluate(formContext, field,
            {
                'PatientQuestionnaire.Q4a': null,
                'PatientQuestionnaire.Q9c': null,
                'PatientQuestionnaire.Q1c': [
                    {
                        codeSet: 'http://ns.smarthealth.com.au/valueset/Patientwatch.Classification',
                        value: 'Illness'
                    }
                ],
                'PatientQuestionnaire.Q2c': null,
                'PatientQuestionnaire.Q3a': null
            }))
            .toEqual({ clearValue: true, editState: 'Hidden', viewStateHidden: true });
        formContext.fieldStates['PatientQuestionnaire.Q4a'] = { editState: FieldEditState.Mandatory };
        expect(FieldStateEvaluator.evaluate(formContext, field,
            {
                'PatientQuestionnaire.Q4a': null,
                'PatientQuestionnaire.Q9c': null,
                'PatientQuestionnaire.Q1c': [
                    {
                        codeSet: 'http://ns.smarthealth.com.au/valueset/Patientwatch.Classification',
                        value: 'Illness'
                    }
                ],
                'PatientQuestionnaire.Q2c': null,
                'PatientQuestionnaire.Q3a': null
            }))
            .toEqual({ clearValue: true, editState: 'Hidden', viewStateHidden: true });
    });

    test('PatientQuestionnaire.Q20a field', () =>
    {
        const field = FormDescriptionUtility.findField(patientWatchQuestionnaire as FormDescription,
            'PatientQuestionnaire.Q20a');
        expect(FieldStateEvaluator.evaluate(formContext, field, {
            'PatientQuestionnaire.Q16a': null,
            'PatientQuestionnaire.Q8a': true
        }))
            .toEqual({ editState: 'Mandatory' });

        expect(FieldStateEvaluator.evaluate(formContext, field, {
            'PatientQuestionnaire.Q16a': null,
            'PatientQuestionnaire.Q8a': false
        }))
            .toEqual({ editState: 'Enabled' });

        formContext.fieldStates['PatientQuestionnaire.Q16a'] = { editState: FieldEditState.Hidden };
        formContext.fieldStates['PatientQuestionnaire.Q8a'] = { editState: FieldEditState.Enabled };
        expect(FieldStateEvaluator.evaluate(formContext, field,
            {
                'PatientQuestionnaire.Q16a': null,
                'PatientQuestionnaire.Q8a': null
            }))
            .toEqual({ clearValue: true, editState: 'Hidden', viewStateHidden: true });
        formContext.fieldStates['PatientQuestionnaire.Q16a'] = { editState: FieldEditState.ReadOnly };
        expect(FieldStateEvaluator.evaluate(formContext, field,
            {
                'PatientQuestionnaire.Q16a': null,
                'PatientQuestionnaire.Q8a': null
            }))
            .toEqual({ clearValue: true, editState: 'Hidden', viewStateHidden: true });
    });
});

describe('Extract initial field states from form description', () =>
{
    test('Consultation Note', () =>
    {
        expect(FieldStateEvaluator.extractInitialFieldStates(consultationNoteForm as FormDescription))
            .toEqual(fieldStatesConsultationNote);
    });
    test('Medication Service', () =>
    {
        expect(FieldStateEvaluator.extractInitialFieldStates(medicationForm as FormDescription))
            .toEqual(fieldStatesMedication);
    });
});
