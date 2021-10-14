import TableData from 'main/data/TableData';
import FieldStateEvaluator, {FieldStates} from 'main/form/FieldStateEvaluator';
import FieldValidator from 'main/form/FieldValidator';
import FormContext from 'main/form/FormContext';
import I18nStore from 'main/store/I18nStore';
import FormDescriptionUtility from 'main/utility/FormDescriptionUtility';
import EntityData from 'smarthealth-javascript/EntityData';
import FieldEditState from 'smarthealth-javascript/FieldEditState';
import FieldState from 'smarthealth-javascript/FieldState';
import FormDescription from 'smarthealth-javascript/FormDescription';
import FormFieldBoolean from 'smarthealth-javascript/FormFieldBoolean';
import FormFieldDateTime from 'smarthealth-javascript/FormFieldDateTime';
import FormFieldEnum from 'smarthealth-javascript/FormFieldEnum';
import FormFieldFormatted from 'smarthealth-javascript/FormFieldFormatted';
import FormFieldFormattedFormat from 'smarthealth-javascript/FormFieldFormattedFormat';
import FormFieldMedicalGroupList from 'smarthealth-javascript/FormFieldMedicalGroupList';
import FormFieldMedicalGroupLocation from 'smarthealth-javascript/FormFieldMedicalGroupLocation';
import FormFieldNumber from 'smarthealth-javascript/FormFieldNumber';
import FormFieldSelection from 'smarthealth-javascript/FormFieldSelection';
import FormFieldTable from 'smarthealth-javascript/FormFieldTable';
import FormFieldText from 'smarthealth-javascript/FormFieldText';
import FormFieldType from 'smarthealth-javascript/FormFieldType';
import MedicalGroupListType from 'smarthealth-javascript/MedicalGroupListType';
import advanceLiverDiseaseAssessmentForm
    from 'smarthealth-rest-test/formdesc/service/Form.Immunology.AdvancedLiverDiseaseAssessment.json';
import hivAssessmentForm from 'smarthealth-rest-test/formdesc/service/Form.Immunology.HIVAssessment.json';
import treatmentStatus from 'smarthealth-rest-test/formdesc/service/Form.PatientWatch.TreatmentStatus.json';
import {TEXT_NAME} from 'test/model/FormFieldMother';

/**
 * FieldValidator Jest
 *
 * @author Priyanka 1/03/2019
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2019
 */
const i18nStore = new I18nStore();
i18nStore.setI18n(null, 'en-AU');
const fieldValidator = new FieldValidator(i18nStore);

function updateFieldStates(formDescription: FormDescription, fieldStates: FieldStates, data: EntityData)
{
    const formContext: FormContext = FormContext.build(null, formDescription);
    const fields = FormDescriptionUtility.allFields(formDescription);
    fields.forEach(field =>
    {
        const fieldState = FieldStateEvaluator.evaluate(formContext, field, data);
        fieldStates[field.id] = fieldState;
    });
}

describe('Boolean', () =>
{
    test('enabled', () =>
    {
        const field: FormFieldBoolean = {
            id: 'field',
            label: 'Field',
            state: { editState: FieldEditState.Enabled },
            type: FormFieldType.Boolean
        };
        expect(fieldValidator.validate(null, field, field.state))
            .toEqual(true);
        expect(fieldValidator.validate(undefined, field, field.state))
            .toEqual(true);
        expect(fieldValidator.validate(true, field, field.state))
            .toEqual(true);
        expect(fieldValidator.validate(false, field, field.state))
            .toEqual(true);
    });

    test('mandatory', () =>
    {
        const field: FormFieldBoolean = {
            id: 'field',
            label: 'Field',
            state: { editState: FieldEditState.Mandatory },
            type: FormFieldType.Boolean
        };
        expect(fieldValidator.validate(null, field, field.state))
            .toEqual(false);
        expect(fieldValidator.validate(undefined, field, field.state))
            .toEqual(false);
        expect(fieldValidator.validate(true, field, field.state))
            .toEqual(true);
        expect(fieldValidator.validate(false, field, field.state))
            .toEqual(true);
    });
});

describe('DateTime', () =>
{
    test('enabled', () =>
    {
        const field: FormFieldDateTime = {
            id: 'field',
            label: 'Field',
            type: FormFieldType.DateTime,
            precisionDay: true,
            state: { editState: FieldEditState.Enabled }
        };
        expect(fieldValidator.validate(null, field, field.state))
            .toEqual(true);
        expect(fieldValidator.validate(undefined, field, field.state))
            .toEqual(true);
        expect(fieldValidator.validate({ iso: '2020-12-25' }, field, field.state))
            .toEqual(true);
    });

    test('mandatory', () =>
    {
        const field: FormFieldDateTime = {
            id: 'field',
            label: 'Field',
            type: FormFieldType.DateTime,
            precisionDay: true,
            state: { editState: FieldEditState.Mandatory }
        };
        expect(fieldValidator.validate(null, field, field.state))
            .toEqual(false);
        expect(fieldValidator.validate(undefined, field, field.state))
            .toEqual(false);
        expect(fieldValidator.validate({ iso: '2020-12-25' }, field, field.state))
            .toEqual(true);
    });

    test('checks if date is invalid without any precision', () =>
    {
        const field: FormFieldDateTime = {
            id: 'Date',
            label: 'Date',
            type: FormFieldType.DateTime,
            state: { editState: FieldEditState.Mandatory }
        };
        expect(fieldValidator.validate('28/12/1920 23:59', field, field.state))
            .toEqual(false);
        expect(fieldValidator.validate('28/12/1920 23:60', field, field.state))
            .toEqual(false);
        expect(fieldValidator.validate('28/12/1920', field, field.state))
            .toEqual(false);
        expect(fieldValidator.validate('12/1920', field, field.state))
            .toEqual(false);
        expect(fieldValidator.validate('1920', field, field.state))
            .toEqual(false);
        expect(fieldValidator.validate('', field, field.state))
            .toEqual(false);
    });

    test('check if date is valid precisionMinute format', () =>
    {
        const field: FormFieldDateTime = {
            id: 'Date',
            label: 'Date',
            type: FormFieldType.DateTime,
            precisionMinute: true,
            state: { editState: FieldEditState.Mandatory }
        };
        expect(fieldValidator.validate('28/12/1920 23:59', field, field.state))
            .toEqual(true);
        expect(fieldValidator.validate('28/12/1920 23:60', field, field.state))
            .toEqual(false);
        expect(fieldValidator.validate('28/12/1920', field, field.state))
            .toEqual(false);
        expect(fieldValidator.validate('12/1920', field, field.state))
            .toEqual(false);
        expect(fieldValidator.validate('1920', field, field.state))
            .toEqual(false);
        expect(fieldValidator.validate('', field, field.state))
            .toEqual(false);
    });

    test('check if date is valid precisionDay format', () =>
    {
        const field: FormFieldDateTime = {
            id: 'Date',
            label: 'Date',
            type: FormFieldType.DateTime,
            precisionDay: true,
            state: { editState: FieldEditState.Mandatory }
        };
        expect(fieldValidator.validate('28/12/1920', field, field.state))
            .toEqual(true);
        expect(fieldValidator.validate({ iso: '1920-12-28' }, field, field.state))
            .toEqual(true);
        expect(fieldValidator.validate('28/12/1920 23:59', field, field.state))
            .toEqual(false);
        expect(fieldValidator.validate('02/1920', field, field.state))
            .toEqual(false);
        expect(fieldValidator.validate({ iso: '1920-12' }, field, field.state))
            .toEqual(false);
        expect(fieldValidator.validate('1920', field, field.state))
            .toEqual(false);
        expect(fieldValidator.validate({ iso: '1920' }, field, field.state))
            .toEqual(false);
        expect(fieldValidator.validate('', field, field.state))
            .toEqual(false);
    });

    test('check if date is valid precisionMonth format', () =>
    {
        const field: FormFieldDateTime = {
            id: 'Date',
            label: 'Date',
            type: FormFieldType.DateTime,
            precisionMonth: true,
            state: { editState: FieldEditState.Mandatory }
        };
        expect(fieldValidator.validate('02/1920', field, field.state))
            .toEqual(true);
        expect(fieldValidator.validate({ iso: '1920-12' }, field, field.state))
            .toEqual(true);
        expect(fieldValidator.validate('28/12/1920', field, field.state))
            .toEqual(false);
        expect(fieldValidator.validate({ iso: '1920-12-28' }, field, field.state))
            .toEqual(false);
        expect(fieldValidator.validate('28/12/1920 23:59', field, field.state))
            .toEqual(false);
        expect(fieldValidator.validate('1920', field, field.state))
            .toEqual(false);
        expect(fieldValidator.validate({ iso: '1920' }, field, field.state))
            .toEqual(false);
        expect(fieldValidator.validate('', field, field.state))
            .toEqual(false);
    });

    test('check if date is valid precisionYear format', () =>
    {
        const field: FormFieldDateTime = {
            id: 'Date',
            label: 'Date',
            type: FormFieldType.DateTime,
            precisionYear: true,
            state: { editState: FieldEditState.Mandatory }
        };
        expect(fieldValidator.validate('1920', field, field.state))
            .toEqual(true);
        expect(fieldValidator.validate({ iso: '1920' }, field, field.state))
            .toEqual(true);
        expect(fieldValidator.validate('02/1920', field, field.state))
            .toEqual(false);
        expect(fieldValidator.validate({ iso: '1920-02' }, field, field.state))
            .toEqual(false);
        expect(fieldValidator.validate('01/02/1920', field, field.state))
            .toEqual(false);
        expect(fieldValidator.validate({ iso: '1920-12-28' }, field, field.state))
            .toEqual(false);
        expect(fieldValidator.validate('01/02/1920 23:59', field, field.state))
            .toEqual(false);
        expect(fieldValidator.validate('', field, field.state))
            .toEqual(false);
    });

    test('check if date is valid precisionMinute or precisionDay or precisionMonth or precisionYear', () =>
    {
        const field: FormFieldDateTime = {
            id: 'Date',
            label: 'Date',
            type: FormFieldType.DateTime,
            precisionYear: true,
            precisionMonth: true,
            precisionDay: true,
            precisionMinute: true,
            state: { editState: FieldEditState.Mandatory }
        };
        expect(fieldValidator.validate('01/02/1920 23:59', field, field.state))
            .toEqual(true);
        expect(fieldValidator.validate('01/02/1920', field, field.state))
            .toEqual(true);
        expect(fieldValidator.validate('02/1920', field, field.state))
            .toEqual(true);
        expect(fieldValidator.validate('1920', field, field.state))
            .toEqual(true);
        expect(fieldValidator.validate('28/12/1920 23:60', field, field.state))
            .toEqual(false);
        expect(fieldValidator.validate('', field, field.state))
            .toEqual(false);
    });

    test('check if date is valid precisionMinute or precisionDay', () =>
    {
        const field: FormFieldDateTime = {
            id: 'Date',
            label: 'Date',
            type: FormFieldType.DateTime,
            precisionMinute: true,
            precisionDay: true,
            state: { editState: FieldEditState.Mandatory }
        };
        expect(fieldValidator.validate('01/02/1920 23:59', field, field.state))
            .toEqual(true);
        expect(fieldValidator.validate('01/02/1920', field, field.state))
            .toEqual(true);
        expect(fieldValidator.validate({ iso: '1920-12-28' }, field, field.state))
            .toEqual(true);
        expect(fieldValidator.validate('02/1920', field, field.state))
            .toEqual(false);
        expect(fieldValidator.validate('1920', field, field.state))
            .toEqual(false);
        expect(fieldValidator.validate('28/12/1920 23:60', field, field.state))
            .toEqual(false);
        expect(fieldValidator.validate('', field, field.state))
            .toEqual(false);
    });

    test('check if date is valid precisionMinute or precisionMonth', () =>
    {
        const field: FormFieldDateTime = {
            id: 'Date',
            label: 'Date',
            type: FormFieldType.DateTime,
            precisionMinute: true,
            precisionMonth: true,
            state: { editState: FieldEditState.Mandatory }
        };
        expect(fieldValidator.validate('01/02/1920 23:59', field, field.state))
            .toEqual(true);
        expect(fieldValidator.validate('02/1920', field, field.state))
            .toEqual(true);
        expect(fieldValidator.validate('01/02/1920', field, field.state))
            .toEqual(false);
        expect(fieldValidator.validate('1920', field, field.state))
            .toEqual(false);
        expect(fieldValidator.validate('28/12/1920 23:60', field, field.state))
            .toEqual(false);
        expect(fieldValidator.validate('', field, field.state))
            .toEqual(false);
    });

    test('check if date is valid precisionMinute or precisionDay or precisionMonth', () =>
    {
        const field: FormFieldDateTime = {
            id: 'Date',
            label: 'Date',
            type: FormFieldType.DateTime,
            precisionMinute: true,
            precisionMonth: true,
            precisionDay: true,
            state: { editState: FieldEditState.Mandatory }
        };
        expect(fieldValidator.validate('01/02/1920 23:59', field, field.state))
            .toEqual(true);
        expect(fieldValidator.validate('01/02/1920', field, field.state))
            .toEqual(true);
        expect(fieldValidator.validate('02/1920', field, field.state))
            .toEqual(true);
        expect(fieldValidator.validate('1920', field, field.state))
            .toEqual(false);
        expect(fieldValidator.validate('28/12/1920 23:60', field, field.state))
            .toEqual(false);
        expect(fieldValidator.validate('', field, field.state))
            .toEqual(false);
    });

    test('check if date is valid precisionMinute or precisionMonth or precisionYear', () =>
    {
        const field: FormFieldDateTime = {
            id: 'Date',
            label: 'Date',
            type: FormFieldType.DateTime,
            precisionMinute: true,
            precisionMonth: true,
            precisionYear: true,
            state: { editState: FieldEditState.Mandatory }
        };
        expect(fieldValidator.validate('01/02/1920 23:59', field, field.state))
            .toEqual(true);
        expect(fieldValidator.validate('02/1920', field, field.state))
            .toEqual(true);
        expect(fieldValidator.validate('1920', field, field.state))
            .toEqual(true);
        expect(fieldValidator.validate('01/02/1920', field, field.state))
            .toEqual(false);
        expect(fieldValidator.validate('28/12/1920 23:60', field, field.state))
            .toEqual(false);
        expect(fieldValidator.validate('', field, field.state))
            .toEqual(false);
    });

    test('check if date is valid precisionMinute or precisionDay format', () =>
    {
        const field: FormFieldDateTime = {
            id: 'Date',
            label: 'Date',
            type: FormFieldType.DateTime,
            precisionDay: true,
            precisionMinute: true,
            state: { editState: FieldEditState.Mandatory }
        };
        expect(fieldValidator.validate('01/02/1920 23:59', field, field.state))
            .toEqual(true);
        expect(fieldValidator.validate('01/02/1920', field, field.state))
            .toEqual(true);
        expect(fieldValidator.validate('1920', field, field.state))
            .toEqual(false);
        expect(fieldValidator.validate('28/12/1920 23:60', field, field.state))
            .toEqual(false);
        expect(fieldValidator.validate('02/1920', field, field.state))
            .toEqual(false);
        expect(fieldValidator.validate('', field, field.state))
            .toEqual(false);
    });

    test('check if date is valid precisionDay or precisionMonth format', () =>
    {
        const field: FormFieldDateTime = {
            id: 'Date',
            label: 'Date',
            type: FormFieldType.DateTime,
            precisionDay: true,
            precisionMonth: true,
            state: { editState: FieldEditState.Mandatory }
        };
        expect(fieldValidator.validate('01/02/1920', field, field.state))
            .toEqual(true);
        expect(fieldValidator.validate('02/1920', field, field.state))
            .toEqual(true);
        expect(fieldValidator.validate('1920', field, field.state))
            .toEqual(false);
        expect(fieldValidator.validate('', field, field.state))
            .toEqual(false);
        expect(fieldValidator.validate('01/02/1920 23:59', field, field.state))
            .toEqual(false);
    });

    test('check if date is valid precisionDay or precisionYear format', () =>
    {
        const field: FormFieldDateTime = {
            id: 'Date',
            label: 'Date',
            type: FormFieldType.DateTime,
            precisionDay: true,
            precisionYear: true,
            state: { editState: FieldEditState.Mandatory }
        };
        expect(fieldValidator.validate('01/02/1920', field, field.state))
            .toEqual(true);
        expect(fieldValidator.validate('1920', field, field.state))
            .toEqual(true);
        expect(fieldValidator.validate('02/1920', field, field.state))
            .toEqual(false);
        expect(fieldValidator.validate('', field, field.state))
            .toEqual(false);
        expect(fieldValidator.validate('01/02/1920 23:59', field, field.state))
            .toEqual(false);
    });

    test('check if date is valid precisionDay or precisionMonth or precisionYear format', () =>
    {
        const field: FormFieldDateTime = {
            id: 'Date',
            label: 'Date',
            type: FormFieldType.DateTime,
            precisionDay: true,
            precisionMonth: true,
            precisionYear: true,
            state: { editState: FieldEditState.Mandatory }
        };
        expect(fieldValidator.validate('01/02/1920', field, field.state))
            .toEqual(true);
        expect(fieldValidator.validate('02/1920', field, field.state))
            .toEqual(true);
        expect(fieldValidator.validate('1920', field, field.state))
            .toEqual(true);
        expect(fieldValidator.validate('', field, field.state))
            .toEqual(false);
        expect(fieldValidator.validate('01/02/1920 23:59', field, field.state))
            .toEqual(false);
    });

    test('check if date is valid precisionMonth or precisionYear', () =>
    {
        const field: FormFieldDateTime = {
            id: 'Date',
            label: 'Date',
            type: FormFieldType.DateTime,
            precisionMinute: true,
            precisionYear: true,
            state: { editState: FieldEditState.Mandatory }
        };
        expect(fieldValidator.validate('01/02/1920 23:59', field, field.state))
            .toEqual(true);
        expect(fieldValidator.validate('1920', field, field.state))
            .toEqual(true);
        expect(fieldValidator.validate('02/1920', field, field.state))
            .toEqual(false);
        expect(fieldValidator.validate('01/02/1920', field, field.state))
            .toEqual(false);
        expect(fieldValidator.validate('28/12/1920 23:60', field, field.state))
            .toEqual(false);
        expect(fieldValidator.validate('', field, field.state))
            .toEqual(false);
    });

    test('check if date is valid precisionMinute or precisionMonth or precisionYear', () =>
    {
        const field: FormFieldDateTime = {
            id: 'Date',
            label: 'Date',
            type: FormFieldType.DateTime,
            precisionMinute: true,
            precisionMonth: true,
            precisionYear: true,
            state: { editState: FieldEditState.Mandatory }
        };
        expect(fieldValidator.validate('01/02/1920 23:59', field, field.state))
            .toEqual(true);
        expect(fieldValidator.validate('02/1920', field, field.state))
            .toEqual(true);
        expect(fieldValidator.validate('1920', field, field.state))
            .toEqual(true);
        expect(fieldValidator.validate('01/02/1920', field, field.state))
            .toEqual(false);
        expect(fieldValidator.validate('28/12/1920 23:60', field, field.state))
            .toEqual(false);
        expect(fieldValidator.validate('', field, field.state))
            .toEqual(false);
    });
});

describe('Enum', () =>
{
    test('enabled', () =>
    {
        const field: FormFieldEnum = {
            enumType: '',
            id: 'field',
            label: 'Field',
            type: FormFieldType.Enum,
            state: { editState: FieldEditState.Enabled }
        };
        expect(fieldValidator.validate(null, field, field.state))
            .toEqual(true);
        expect(fieldValidator.validate(undefined, field, field.state))
            .toEqual(true);
        expect(fieldValidator.validate('Aboriginal but not TSI', field, field.state))
            .toEqual(true);
    });

    test('mandatory', () =>
    {
        const field: FormFieldEnum = {
            enumType: 'ATSI',
            id: 'field',
            label: 'Field',
            type: FormFieldType.Enum,
            state: { editState: FieldEditState.Mandatory }
        };
        expect(fieldValidator.validate(null, field, field.state))
            .toEqual(false);
        expect(fieldValidator.validate(undefined, field, field.state))
            .toEqual(false);
        expect(fieldValidator.validate('Aboriginal but not TSI', field, field.state))
            .toEqual(true);
    });
});

describe('Formatted', () =>
{
    test('enabled', () =>
    {
        const field: FormFieldFormatted = {
            id: 'field',
            label: 'Field',
            type: FormFieldType.Formatted,
            format: FormFieldFormattedFormat.CFAustraliaIdentifier,
            size: 8,
            state: { editState: FieldEditState.Enabled }
        };
        expect(fieldValidator.validate(null, field, field.state))
            .toEqual(true);
        expect(fieldValidator.validate(undefined, field, field.state))
            .toEqual(true);
        expect(fieldValidator.validate('201ABCD', field, field.state))
            .toEqual(true);
    });

    test('mandatory', () =>
    {
        const field: FormFieldFormatted = {
            id: 'field',
            label: 'Field',
            type: FormFieldType.Formatted,
            format: FormFieldFormattedFormat.CFAustraliaIdentifier,
            size: 8,
            state: { editState: FieldEditState.Mandatory }
        };
        expect(fieldValidator.validate(null, field, field.state))
            .toEqual(false);
        expect(fieldValidator.validate(undefined, field, field.state))
            .toEqual(false);
        expect(fieldValidator.validate('201ABCD', field, field.state))
            .toEqual(true);
    });

    test('Blood Pressure', () =>
    {
        const field: FormFieldFormatted = {
            format: FormFieldFormattedFormat.BloodPressure,
            size: 7,
            id: 'ClinicalMeasures.BPSitting',
            label: 'BP sitting',
            state: { editState: FieldEditState.Enabled },
            type: FormFieldType.Formatted,
            units: 'mmHg'
        };
        expect(fieldValidator.validate(null, field, field.state))
            .toEqual(true);
        expect(fieldValidator.validate(undefined, field, field.state))
            .toEqual(true);
        expect(fieldValidator.validate('', field, field.state))
            .toEqual(true);
        expect(fieldValidator.validate('120/80', field, field.state))
            .toEqual(true);
        expect(fieldValidator.validate('300/300', field, field.state))
            .toEqual(true);
        expect(fieldValidator.validate('120', field, field.state))
            .toEqual(false);
        expect(fieldValidator.validate('120/', field, field.state))
            .toEqual(false);
        expect(fieldValidator.validate('/120', field, field.state))
            .toEqual(false);
        expect(fieldValidator.validate('301/300', field, field.state))
            .toEqual(false);
        expect(fieldValidator.validate('1200/80', field, field.state))
            .toEqual(false);
        expect(fieldValidator.validate('XXX', field, field.state))
            .toEqual(false);
    });

    test('Time', () =>
    {
        const field: FormFieldFormatted = {
            format: FormFieldFormattedFormat.Time,
            size: 5,
            id: 'timeField',
            label: 'Time',
            state: { editState: FieldEditState.Enabled },
            type: FormFieldType.Formatted
        };
        expect(fieldValidator.validate('00:00', field, field.state))
            .toEqual(true);
        expect(fieldValidator.validate('1:00', field, field.state))
            .toEqual(true);
        expect(fieldValidator.validate('23:59', field, field.state))
            .toEqual(true);
        expect(fieldValidator.validate('24:00', field, field.state))
            .toEqual(false);
        expect(fieldValidator.validate('23:60', field, field.state))
            .toEqual(false);
        expect(fieldValidator.validate('09:0', field, field.state))
            .toEqual(false);
    });
});

describe('MedicalGroupList', () =>
{
    test('enabled', () =>
    {
        const field: FormFieldMedicalGroupList = {
            id: 'field',
            label: 'Field',
            medicalGroupListType: MedicalGroupListType.PATIENT_WATCH_CARE_MODEL,
            size: 100,
            state: { editState: FieldEditState.Enabled },
            type: FormFieldType.MedicalGroupList
        };
        expect(fieldValidator.validate(null, field, field.state))
            .toEqual(true);
        expect(fieldValidator.validate(undefined, field, field.state))
            .toEqual(true);
        expect(fieldValidator.validate('Trial 1', field, field.state))
            .toEqual(true);
    });

    test('mandatory', () =>
    {
        const field: FormFieldMedicalGroupList = {
            id: 'field',
            label: 'Field',
            medicalGroupListType: MedicalGroupListType.PATIENT_WATCH_CARE_MODEL,
            size: 100,
            state: { editState: FieldEditState.Mandatory },
            type: FormFieldType.MedicalGroupList
        };
        expect(fieldValidator.validate(null, field, field.state))
            .toEqual(false);
        expect(fieldValidator.validate(undefined, field, field.state))
            .toEqual(false);
        expect(fieldValidator.validate('Trial 1', field, field.state))
            .toEqual(true);
    });
});

describe('MedicalGroupLocation', () =>
{
    test('enabled', () =>
    {
        const field: FormFieldMedicalGroupLocation = {
            id: 'field',
            label: 'Field',
            state: { editState: FieldEditState.Enabled },
            type: FormFieldType.MedicalGroupLocation
        };
        expect(fieldValidator.validate(null, field, field.state))
            .toEqual(true);
        expect(fieldValidator.validate(undefined, field, field.state))
            .toEqual(true);
        expect(fieldValidator.validate('Pyrmont', field, field.state))
            .toEqual(true);
    });

    test('mandatory', () =>
    {
        const field: FormFieldMedicalGroupLocation = {
            id: 'field',
            label: 'Field',
            state: { editState: FieldEditState.Mandatory },
            type: FormFieldType.MedicalGroupLocation
        };
        expect(fieldValidator.validate(null, field, field.state))
            .toEqual(false);
        expect(fieldValidator.validate(undefined, field, field.state))
            .toEqual(false);
        expect(fieldValidator.validate('Pyrmont', field, field.state))
            .toEqual(true);
    });
});

describe('MemberOrMedicalGroup', () =>
{
    test('enabled', () =>
    {
        const field: FormFieldMedicalGroupLocation = {
            id: 'field',
            label: 'Field',
            state: { editState: FieldEditState.Enabled },
            type: FormFieldType.MemberOrMedicalGroup
        };
        expect(fieldValidator.validate(null, field, field.state))
            .toEqual(true);
        expect(fieldValidator.validate(undefined, field, field.state))
            .toEqual(true);
        expect(fieldValidator.validate({ id: 2, name: 'Pyrmont' }, field, field.state))
            .toEqual(true);
    });

    test('mandatory', () =>
    {
        const field: FormFieldMedicalGroupLocation = {
            id: 'field',
            label: 'Field',
            type: FormFieldType.MemberOrMedicalGroup,
            state: { editState: FieldEditState.Mandatory }
        };
        expect(fieldValidator.validate(null, field, field.state))
            .toEqual(false);
        expect(fieldValidator.validate(undefined, field, field.state))
            .toEqual(false);
        expect(fieldValidator.validate({ id: 2, name: 'Pyrmont' }, field, field.state))
            .toEqual(true);
    });
});

describe('Number', () =>
{
    test('enabled', () =>
    {
        const field: FormFieldNumber = {
            id: 'field',
            label: 'Field',
            type: FormFieldType.Number,
            precision: 5,
            scale: 2,
            state: { editState: FieldEditState.Enabled }
        };
        expect(fieldValidator.validate(null, field, field.state))
            .toEqual(true);
        expect(fieldValidator.validate(undefined, field, field.state))
            .toEqual(true);
        expect(fieldValidator.validate(101.00, field, field.state))
            .toEqual(true);
    });

    test('mandatory', () =>
    {
        const field: FormFieldNumber = {
            id: 'field',
            label: 'Field',
            type: FormFieldType.Number,
            precision: 4,
            scale: 0,
            state: { editState: FieldEditState.Mandatory }
        };
        expect(fieldValidator.validate(null, field, field.state))
            .toEqual(false);
        expect(fieldValidator.validate(undefined, field, field.state))
            .toEqual(false);
        expect(fieldValidator.validate(0, field, field.state))
            .toEqual(true);
        expect(fieldValidator.validate(100, field, field.state))
            .toEqual(true);
    });

    test('precision:5 scale:2 acceptnegative:false', () =>
    {
        const field: FormFieldNumber = {
            id: 'field',
            label: 'Field',
            type: FormFieldType.Number,
            acceptNegative: false,
            precision: 5,
            scale: 2,
            state: { editState: FieldEditState.Enabled }
        };
        expect(fieldValidator.validate(null, field, field.state))
            .toEqual(true);
        expect(fieldValidator.validate(undefined, field, field.state))
            .toEqual(true);
        expect(fieldValidator.validate(999.99, field, field.state))
            .toEqual(true);
        expect(fieldValidator.validate(99.99, field, field.state))
            .toEqual(true);
        expect(fieldValidator.validate(9999.99, field, field.state))
            .toEqual(false);
        expect(fieldValidator.validate(9.99, field, field.state))
            .toEqual(true);
        expect(fieldValidator.validate(9.999, field, field.state))
            .toEqual(false);
        expect(fieldValidator.validate(999, field, field.state))
            .toEqual(true);
        expect(fieldValidator.validate(-999, field, field.state))
            .toEqual(false);
    });

    test('precision:4 scale:3 acceptnegative:true', () =>
    {
        const field: FormFieldNumber = {
            id: 'field',
            label: 'Field',
            type: FormFieldType.Number,
            acceptNegative: true,
            precision: 4,
            scale: 3,
            state: { editState: FieldEditState.Enabled }
        };
        expect(fieldValidator.validate(9.999, field, field.state))
            .toEqual(true);
        expect(fieldValidator.validate(9.99, field, field.state))
            .toEqual(true);
        expect(fieldValidator.validate(99.99, field, field.state))
            .toEqual(false);
        expect(fieldValidator.validate(-9.99, field, field.state))
            .toEqual(true);
        expect(fieldValidator.validate(-9.999, field, field.state))
            .toEqual(true);
        expect(fieldValidator.validate(9.9, field, field.state))
            .toEqual(true);
        expect(fieldValidator.validate(-999, field, field.state))
            .toEqual(false);
    });

    test('precision:5 scale:2 acceptnegative:true maximum:100 minimum:20', () =>
    {
        const field: FormFieldNumber = {
            id: 'field',
            label: 'Field',
            type: FormFieldType.Number,
            acceptNegative: true,
            precision: 5,
            scale: 2,
            state: { editState: FieldEditState.Enabled },
            maximum: 100,
            minimum: 20
        };
        expect(fieldValidator.validate(100, field, field.state))
            .toEqual(true);
        expect(fieldValidator.validate(19, field, field.state))
            .toEqual(false);
        expect(fieldValidator.validate(999.9, field, field.state))
            .toEqual(false);
        expect(fieldValidator.validate(-24, field, field.state))
            .toEqual(false);
        expect(fieldValidator.validate(24, field, field.state))
            .toEqual(true);
    });

    test('precision:4 scale:0 acceptnegative:false', () =>
    {
        const field: FormFieldNumber = {
            id: 'field',
            label: 'Field',
            type: FormFieldType.Number,
            acceptNegative: false,
            precision: 4,
            scale: 0,
            state: { editState: FieldEditState.Enabled }
        };
        expect(fieldValidator.validate(1111, field, field.state))
            .toEqual(true);
        expect(fieldValidator.validate(191, field, field.state))
            .toEqual(true);
        expect(fieldValidator.validate(99.9, field, field.state))
            .toEqual(false);
        expect(fieldValidator.validate(-24, field, field.state))
            .toEqual(false);
        expect(fieldValidator.validate(2.40, field, field.state))
            .toEqual(false);
    });
});

describe('Selection', () =>
{
    test('enabled', () =>
    {
        const field: FormFieldSelection = {
            id: 'field',
            label: 'Field',
            type: FormFieldType.Selection,
            options: [
                'Yes',
                'No'
            ],
            size: 3,
            state: { editState: FieldEditState.Enabled }
        };
        expect(fieldValidator.validate(null, field, field.state))
            .toEqual(true);
        expect(fieldValidator.validate(undefined, field, field.state))
            .toEqual(true);
        expect(fieldValidator.validate('Yes', field, field.state))
            .toEqual(true);
    });

    test('mandatory', () =>
    {
        const field: FormFieldSelection = {
            id: 'field',
            label: 'Field',
            type: FormFieldType.Selection,
            options: [
                'Yes',
                'No'
            ],
            size: 3,
            state: { editState: FieldEditState.Mandatory }
        };
        expect(fieldValidator.validate(null, field, field.state))
            .toEqual(false);
        expect(fieldValidator.validate(undefined, field, field.state))
            .toEqual(false);
        expect(fieldValidator.validate('Yes', field, field.state))
            .toEqual(true);
    });
});

describe('TableField', () =>
{
    test('enabled', () =>
    {
        const field: FormFieldTable = {
            columns: [TEXT_NAME],
            id: 'field',
            label: 'Field',
            state: { editState: FieldEditState.Enabled },
            type: FormFieldType.Table
        };
        expect(fieldValidator.validate(null, field, field.state))
            .toEqual(true);
        expect(fieldValidator.validate(undefined, field, field.state))
            .toEqual(true);
        expect(fieldValidator.validate([], field, field.state))
            .toEqual(true);
        expect(fieldValidator.validate([{ name: 'Mary' }], field, field.state))
            .toEqual(true);
    });

    test('mandatory', () =>
    {
        const field: FormFieldTable = FormDescriptionUtility.findField(treatmentStatus as FormDescription,
            'HealthcareAndSupport.Clinicians') as FormFieldTable;
        const fieldState = { editState: FieldEditState.Mandatory };
        const singleRowValid: TableData = [{
            Provider: 'provider', Reason: 'reason', DateProviderAdded: { iso: '2020-05-28' }
        }];
        expect(fieldValidator.validate(singleRowValid, field, fieldState))
            .toEqual(true);

        const emptyArrayValue = [];
        expect(fieldValidator.validate(emptyArrayValue, field, fieldState))
            .toEqual(false);

        const singleRowInvalidDateProvider: TableData = [{
            Provider: 'provider', Reason: 'reason', DateProviderAdded: ''
        }];
        expect(fieldValidator.validate(singleRowInvalidDateProvider, field, fieldState))
            .toEqual(false);

        const doubleRowInvalidDateProvider: TableData = [
            { Provider: 'provider', Reason: 'reason', DateProviderAdded: { iso: '2001-01-20' } },
            { Provider: 'provider', Reason: 'reason', DateProviderAdded: '' }
        ];
        expect(fieldValidator.validate(doubleRowInvalidDateProvider, field, fieldState))
            .toEqual(false);

        const doubleRowInvalidReason: TableData = [
            { Provider: 'provider', Reason: 'under 100 characters, valid!', DateProviderAdded: { iso: '2001-01-20' } },
            {
                Provider: 'provider',
                Reason: '01234567890123456789012345678901234567890123456789012345678901234567890123456789 OVER LIMIT',
                DateProviderAdded: ''
            }
        ];
        expect(fieldValidator.validate(doubleRowInvalidReason, field, fieldState))
            .toEqual(false);
    });

    test('validate TableField columns when there is missing data', () =>
    {
        const tableField: FormFieldTable = {
            columns: [
                {
                    id: 'Date',
                    label: 'Date',
                    type: FormFieldType.DateTime,
                    precisionYear: true,
                    state: { editState: FieldEditState.Mandatory }
                }
            ],
            id: 'table',
            label: 'Table',
            state: { editState: FieldEditState.Enabled },
            type: FormFieldType.Table
        };
        expect(fieldValidator.validate([], tableField, tableField.state))
            .toEqual(true);
        expect(fieldValidator.validate([{ Date: { iso: '2000' } }], tableField, tableField.state))
            .toEqual(true);
    });

    test('non-mandatory', () =>
    {
        const field: FormFieldTable = FormDescriptionUtility.findField(treatmentStatus as FormDescription,
            'HealthcareAndSupport.Clinicians') as FormFieldTable;
        const fieldState: FieldState = { editState: FieldEditState.Enabled };
        const emptyArrayValue = [];
        expect(fieldValidator.validate(emptyArrayValue, field, fieldState))
            .toEqual(true);

        const singleRowValid: TableData = [{
            Provider: 'provider', Reason: 'reason', DateProviderAdded: { iso: '2020-05-28' }
        }];
        expect(fieldValidator.validate(singleRowValid, field, fieldState))
            .toEqual(true);

        const singleRowInvalid: TableData = [{
            Provider: 'provider', Reason: 'reason', DateProviderAdded: ''
        }];
        expect(fieldValidator.validate(singleRowInvalid, field, fieldState))
            .toEqual(false);

        const doubleRowInvalidDateProvider: TableData = [
            { Provider: 'provider', Reason: 'reason', DateProviderAdded: { iso: '2001-01-20' } },
            { Provider: 'provider', Reason: 'reason', DateProviderAdded: '' }
        ];
        expect(fieldValidator.validate(doubleRowInvalidDateProvider, field, fieldState))
            .toEqual(false);

        const doubleRowInvalidReason: TableData = [
            { Provider: 'provider', Reason: 'under 100 characters, valid!', DateProviderAdded: { iso: '2001-01-20' } },
            {
                Provider: 'provider',
                Reason: '01234567890123456789012345678901234567890123456789012345678901234567890123456789 OVER LIMIT',
                DateProviderAdded: ''
            }
        ];
        expect(fieldValidator.validate(doubleRowInvalidReason, field, fieldState))
            .toEqual(false);

        const extraTableRowData: TableData = [
            { extraData: 'extraData', Provider: 'provider', Reason: 'reason', DateProviderAdded: { iso: '2020-05-28' } }
        ];

        expect(fieldValidator.validate(extraTableRowData, field, fieldState))
            .toEqual(true);
    });
});

describe('Selection', () =>
{
    test('editable', () =>
    {
        const field: FormFieldSelection = {
            editable: true,
            id: 'field',
            label: 'Field',
            type: FormFieldType.Selection,
            options: ['Yes', 'No', 'Maybe'],
            size: 5
        };
        expect(fieldValidator.validate(null, field, field.state))
            .toEqual(true);
        expect(fieldValidator.validate('Yes', field, field.state))
            .toEqual(true);
        expect(fieldValidator.validate('No', field, field.state))
            .toEqual(true);
        expect(fieldValidator.validate('Maybe', field, field.state))
            .toEqual(true);
        expect(fieldValidator.validate('Perhaps', field, field.state))
            .toEqual(true);
    });

    test('not editable', () =>
    {
        const field: FormFieldSelection = {
            id: 'field',
            label: 'Field',
            type: FormFieldType.Selection,
            options: ['Yes', 'No', 'Maybe'],
            size: 5
        };
        expect(fieldValidator.validate(null, field, field.state))
            .toEqual(true);
        expect(fieldValidator.validate('Yes', field, field.state))
            .toEqual(true);
        expect(fieldValidator.validate('No', field, field.state))
            .toEqual(true);
        expect(fieldValidator.validate('Maybe', field, field.state))
            .toEqual(true);
        expect(fieldValidator.validate('Perhaps', field, field.state))
            .toEqual(false);
    });

    test('multiple, editable', () =>
    {
        const field: FormFieldSelection = {
            multiple: true,
            editable: true,
            id: 'field',
            label: 'Field',
            type: FormFieldType.Selection,
            options: ['Yes', 'No', 'Maybe'],
            size: 5
        };
        expect(fieldValidator.validate(null, field, field.state))
            .toEqual(true);
        expect(fieldValidator.validate(['Yes'], field, field.state))
            .toEqual(true);
        expect(fieldValidator.validate(['No'], field, field.state))
            .toEqual(true);
        expect(fieldValidator.validate(['Maybe'], field, field.state))
            .toEqual(true);
        expect(fieldValidator.validate(['Perhaps'], field, field.state))
            .toEqual(true);

        expect(fieldValidator.validate(['Yes', 'No', 'Maybe'], field, field.state))
            .toEqual(true);
        expect(fieldValidator.validate(['Yes', 'No', 'Perhaps'], field, field.state))
            .toEqual(true);
    });

    test('multiple, not editable', () =>
    {
        const field: FormFieldSelection = {
            multiple: true,
            id: 'field',
            label: 'Field',
            type: FormFieldType.Selection,
            options: ['Yes', 'No', 'Maybe'],
            size: 5
        };
        expect(fieldValidator.validate(null, field, field.state))
            .toEqual(true);
        expect(fieldValidator.validate(['Yes'], field, field.state))
            .toEqual(true);
        expect(fieldValidator.validate(['No'], field, field.state))
            .toEqual(true);
        expect(fieldValidator.validate(['Maybe'], field, field.state))
            .toEqual(true);
        expect(fieldValidator.validate(['Perhaps'], field, field.state))
            .toEqual(false);

        expect(fieldValidator.validate(['Yes', 'No', 'Maybe'], field, field.state))
            .toEqual(true);
        expect(fieldValidator.validate(['Yes', 'No', 'Perhaps'], field, field.state))
            .toEqual(false);
    });
});

describe('Text', () =>
{
    test('enabled', () =>
    {
        const field: FormFieldText = {
            id: 'field',
            label: 'Field',
            type: FormFieldType.Text,
            size: 40,
            state: { editState: FieldEditState.Enabled }
        };
        expect(fieldValidator.validate(null, field, field.state))
            .toEqual(true);
        expect(fieldValidator.validate(undefined, field, field.state))
            .toEqual(true);
        expect(fieldValidator.validate(['Mary'], field, field.state))
            .toEqual(true);
    });

    test('mandatory', () =>
    {
        const field: FormFieldText = {
            id: 'field',
            label: 'Field',
            type: FormFieldType.Text,
            size: 40,
            state: { editState: FieldEditState.Mandatory }
        };

        expect(fieldValidator.validate(null, field, field.state))
            .toEqual(false);
        expect(fieldValidator.validate(undefined, field, field.state))
            .toEqual(false);
        expect(fieldValidator.validate('', field, field.state))
            .toEqual(false);
        expect(fieldValidator.validate('A', field, field.state))
            .toEqual(true);
        expect(fieldValidator.validate('ABC', field, field.state))
            .toEqual(true);
        expect(fieldValidator.validate('Once upon a time there were three bears.', field, field.state))
            .toEqual(true);
        expect(
            fieldValidator.validate(
                'Once upon a time there were three bears. A Papa and a Mama and a wee baby bear.',
                field, field.state))
            .toEqual(false);
    });

    test('size: 40', () =>
    {
        const field: FormFieldText = {
            id: 'field',
            label: 'Field',
            type: FormFieldType.Text,
            size: 40,
            state: { editState: FieldEditState.Enabled }
        };
        expect(fieldValidator.validate(null, field, field.state))
            .toEqual(true);
        expect(fieldValidator.validate(undefined, field, field.state))
            .toEqual(true);
        expect(fieldValidator.validate('', field, field.state))
            .toEqual(true);
        expect(fieldValidator.validate('A', field, field.state))
            .toEqual(true);
        expect(fieldValidator.validate('ABC', field, field.state))
            .toEqual(true);
        expect(fieldValidator.validate('Once upon a time there were three bears.', field, field.state))
            .toEqual(true);
        expect(
            fieldValidator.validate(
                'Once upon a time there were three bears. A Papa and a Mama and a wee baby bear.',
                field, field.state))
            .toEqual(false);
    });

    test('minimumLength: 2', () =>
    {
        const field: FormFieldText = {
            id: 'field',
            label: 'Field',
            type: FormFieldType.Text,
            size: 40,
            state: { editState: FieldEditState.Mandatory },
            minimumLength: 2
        };
        expect(fieldValidator.validate(null, field, field.state))
            .toEqual(false);
        expect(fieldValidator.validate(undefined, field, field.state))
            .toEqual(false);
        expect(fieldValidator.validate('', field, field.state))
            .toEqual(false);
        expect(fieldValidator.validate('A', field, field.state))
            .toEqual(false);
        expect(fieldValidator.validate('ABC', field, field.state))
            .toEqual(true);
        expect(fieldValidator.validate('Once upon a time there were three bears.', field, field.state))
            .toEqual(true);
        expect(fieldValidator.validate(
            'Once upon a time there were three bears. A Papa and a Mama and a wee baby bear.', field, field.state))
            .toEqual(false);
    });
});

describe('Form validation', () =>
{
    test('Advance Liver Disease Assessment form validation', () =>
    {
        const fieldStates: FieldStates = FieldStateEvaluator.extractInitialFieldStates(
            advanceLiverDiseaseAssessmentForm as FormDescription);
        {
            const data: EntityData = {};
            updateFieldStates(advanceLiverDiseaseAssessmentForm as FormDescription, fieldStates, data);
            expect(fieldValidator.validateForm(
                data,
                advanceLiverDiseaseAssessmentForm as FormDescription,
                fieldStates
            ))
                .toEqual(new Set([
                    'Confidentiality',
                    'Location',
                    'Provider',
                    'Purpose',
                    'ServiceDate',
                    'Setting',
                    'Summary'
                ]));
        }

        {
            const data: EntityData = {
                Confidentiality: 'Normal',
                Purpose: 'Consultation',
                Summary: 'Brief check up'
            };
            updateFieldStates(advanceLiverDiseaseAssessmentForm as FormDescription, fieldStates, data);
            expect(fieldValidator.validateForm(
                data,
                advanceLiverDiseaseAssessmentForm as FormDescription,
                fieldStates))
                .toEqual(new Set([
                    'Location',
                    'Provider',
                    'ServiceDate',
                    'Setting'
                ]));
        }

        {
            const data: EntityData = {
                Confidentiality: 'Normal',
                Location: 'Darlinghurst',
                Provider: 'Ted Jo',
                Purpose: 'Consultation',
                ServiceDate: '20/03/2020',
                Setting: 'Clinic',
                Summary: 'Brief check up'
            };
            updateFieldStates(advanceLiverDiseaseAssessmentForm as FormDescription, fieldStates, data);
            expect(fieldValidator.validateForm(
                data,
                advanceLiverDiseaseAssessmentForm as FormDescription,
                fieldStates))
                .toEqual(new Set([]));
        }
    });

    test('Form validation that have modifiableIf fields', () =>
    {
        const fieldStates: FieldStates = FieldStateEvaluator.extractInitialFieldStates(
            hivAssessmentForm as FormDescription);
        const mandatoryData: EntityData = {
            Confidentiality: 'Normal',
            Duration: 10,
            'History.DiagnosedDate': { iso: '2020-02-22' },
            Location: 'Darlinghurst',
            Provider: 'Ted Le',
            Purpose: 'Consultation',
            ServiceDate: { iso: '2020-02-22' },
            Setting: 'Clinic'
        };
        {
            updateFieldStates(hivAssessmentForm as FormDescription, fieldStates, mandatoryData);
            expect(fieldValidator.validateForm(
                mandatoryData,
                hivAssessmentForm as FormDescription,
                fieldStates))
                .toEqual(new Set([]));
        }

        {
            const data: EntityData = {
                ...mandatoryData,
                'Examination.BloodPressure': '10'
            };
            updateFieldStates(hivAssessmentForm as FormDescription, fieldStates, data);
            expect(fieldValidator.validateForm(
                data,
                hivAssessmentForm as FormDescription,
                fieldStates))
                .toEqual(new Set([
                    'Examination.BloodPressure',
                    'Examination.BPPosture'
                ]));
        }

        {
            const data: EntityData = {
                ...mandatoryData,
                'Examination.BloodPressure': '100/0'
            };
            updateFieldStates(hivAssessmentForm as FormDescription, fieldStates, data);
            expect(fieldValidator.validateForm(
                data,
                hivAssessmentForm as FormDescription,
                fieldStates))
                .toEqual(new Set([
                    'Examination.BPPosture'
                ]));
        }

        {
            const data: EntityData = {
                ...mandatoryData,
                'Examination.BloodPressure': '100/0',
                'Examination.BPPosture': 'Sitting'
            };
            updateFieldStates(hivAssessmentForm as FormDescription, fieldStates, data);
            expect(fieldValidator.validateForm(
                data,
                hivAssessmentForm as FormDescription,
                fieldStates))
                .toEqual(new Set([]));
        }
    });
});
