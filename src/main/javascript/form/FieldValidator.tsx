import lodash from 'lodash';
import {FieldStates} from 'main/form/FieldStateEvaluator';
import {
    validateCFAustraliaID, validateHealthCareCardNumber, validateMedicareNumber
} from 'main/format/IdentifierFormat';
import I18nStore from 'main/store/I18nStore';
import DateUtility from 'main/utility/DateUtility';
import FieldStateUtility from 'main/utility/FieldStateUtility';
import FormDataUtility from 'main/utility/FormDataUtility';
import NumberUtility from 'main/utility/NumberUtility';
import ShouldNeverGetHereError from 'main/utility/ShouldNeverGetHereError';
import {isObservableArray} from 'mobx';
import FieldState from 'smarthealth-javascript/FieldState';
import FormDescription from 'smarthealth-javascript/FormDescription';
import FormField from 'smarthealth-javascript/FormField';
import FormFieldBoolean from 'smarthealth-javascript/FormFieldBoolean';
import FormFieldButton from 'smarthealth-javascript/FormFieldButton';
import FormFieldConditionsTable from 'smarthealth-javascript/FormFieldConditionsTable';
import FormFieldDateTime from 'smarthealth-javascript/FormFieldDateTime';
import FormFieldEnum from 'smarthealth-javascript/FormFieldEnum';
import FormFieldFormatted from 'smarthealth-javascript/FormFieldFormatted';
import FormFieldFormattedFormat from 'smarthealth-javascript/FormFieldFormattedFormat';
import FormFieldFormSpecific from 'smarthealth-javascript/FormFieldFormSpecific';
import FormFieldGroup from 'smarthealth-javascript/FormFieldGroup';
import FormFieldMedicalGroup from 'smarthealth-javascript/FormFieldMedicalGroup';
import FormFieldMedicalGroupList from 'smarthealth-javascript/FormFieldMedicalGroupList';
import FormFieldMedicalGroupLocation from 'smarthealth-javascript/FormFieldMedicalGroupLocation';
import FormFieldMember from 'smarthealth-javascript/FormFieldMember';
import FormFieldMemberOrMedicalGroup from 'smarthealth-javascript/FormFieldMemberOrMedicalGroup';
import FormFieldNumber from 'smarthealth-javascript/FormFieldNumber';
import FormFieldOrSection from 'smarthealth-javascript/FormFieldOrSection';
import FormFieldSelection from 'smarthealth-javascript/FormFieldSelection';
import FormFieldServiceRecordReference from 'smarthealth-javascript/FormFieldServiceRecordReference';
import FormFieldSnomedTerm from 'smarthealth-javascript/FormFieldSnomedTerm';
import FormFieldTable from 'smarthealth-javascript/FormFieldTable';
import FormFieldText from 'smarthealth-javascript/FormFieldText';
import FormFieldTypes from 'smarthealth-javascript/FormFieldTypes';
import FormFieldUnsupported from 'smarthealth-javascript/FormFieldUnsupported';
import FormFieldValueSet from 'smarthealth-javascript/FormFieldValueSet';
import FormFieldVisitor from 'smarthealth-javascript/FormFieldVisitor';
import Precision from 'smarthealth-javascript/Precision';

/**
 * Validate the value of a field
 *
 * @author Larry 16/01/2019
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2019
 */
class FieldValidatorVisitor implements FormFieldVisitor<boolean>
{
    // valid values are 0 to 300 inclusive both before and after "/" e.g. max 120/80
    private static readonly BLOOD_PRESSURE_REGEX = new RegExp(
        '^([0-9]|[1-9][0-9]|[1-2][0-9][0-9]|300)/([0-9]|[1-9][0-9]|[1-2][0-9][0-9]|300)$');

    // TODO valid value can have leading 0, 1 and 2 followed by : followed by number 0-59 inclusive
    private static readonly TIME_REGEX = new RegExp('^(0[0-9]|1[0-9]|2[0-3]|[0-9])[:.]?[0-5][0-9]$');

    private readonly validator: FieldValidator;

    private readonly value: any;

    constructor(value: any, validator: FieldValidator)
    {
        this.value = value;
        this.validator = validator;
    }

    private validateTime(string: string)
    {
        return FieldValidatorVisitor.TIME_REGEX.test(string);
    }

    public visitFormFieldBoolean(field: FormFieldBoolean): boolean
    {
        return true;
    }

    public visitFormFieldButton(field: FormFieldButton): boolean
    {
        return true;
    }

    public visitFormFieldConditionsTable(field: FormFieldConditionsTable): boolean
    {
        return true;
    }

    public visitFormFieldDateTime(field: FormFieldDateTime): boolean
    {
        if (DateUtility.isEventDateTime(this.value))
        {
            // The iso string must be valid if it is an EventDateTime, so doesn't need validation.
            const precision = DateUtility.determineEventDateTimePrecision(this.value);
            if (precision === Precision.Year)
            {
                return !!field.precisionYear;
            }
            else if (precision === Precision.Month)
            {
                return !!field.precisionMonth;
            }
            else if (precision === Precision.Day)
            {
                return !!field.precisionDay;
            }
            else if (precision === Precision.Minute)
            {
                return !!field.precisionMinute;
            }
            else
            {
                return false;
            }
        }
        else
        {
            return this.validator.validateDateTimeString(this.value, field);
        }
    }

    public visitFormFieldEnum(field: FormFieldEnum): boolean
    {
        return true;
    }

    public visitFormFieldFormSpecific(field: FormFieldFormSpecific): boolean
    {
        return true;
    }

    public visitFormFieldFormatted(field: FormFieldFormatted): boolean
    {
        const string: string = this.value;
        if (string.length > field.size)
        {
            return false;
        }
        switch (field.format)
        {
        case FormFieldFormattedFormat.BloodPressure:
            return FieldValidatorVisitor.BLOOD_PRESSURE_REGEX.test(string);
        case FormFieldFormattedFormat.CFAustraliaIdentifier:
            return validateCFAustraliaID(string);
        case FormFieldFormattedFormat.HealthCareCardNumber:
            return validateHealthCareCardNumber(string);
        case FormFieldFormattedFormat.MedicareNumber:
            return validateMedicareNumber(string);
        case FormFieldFormattedFormat.Time:
            return this.validateTime(string);
        }
        throw new ShouldNeverGetHereError();
    }

    public visitFormFieldGroup(field: FormFieldGroup): boolean
    {
        return true;
    }

    public visitFormFieldMedicalGroup(field: FormFieldMedicalGroup): boolean
    {
        return true;
    }

    public visitFormFieldMedicalGroupList(field: FormFieldMedicalGroupList): boolean
    {
        return true;
    }

    public visitFormFieldMedicalGroupLocation(field: FormFieldMedicalGroupLocation): boolean
    {
        return true;
    }

    public visitFormFieldMember(field: FormFieldMember): boolean
    {
        return true;
    }

    public visitFormFieldMemberOrMedicalGroup(field: FormFieldMemberOrMedicalGroup): boolean
    {
        return true;
    }

    public visitFormFieldNumber(field: FormFieldNumber): boolean
    {
        if (this.value > NumberUtility.maximum(field))
        {
            return false;
        }
        if (this.value < NumberUtility.minimum(field))
        {
            return false;
        }

        if (field.acceptNegative)
        {
            if (field.scale === 0)
            {
                const regex = new RegExp(`^-?\\d{0,${field.precision}}$`);
                return regex.test(this.value);
            }
            else
            {
                const regex = new RegExp(
                    `^-?\\d{0,${field.precision - field.scale}}(?:\\.\\d{0,${field.scale}})?$`);
                return regex.test(this.value);
            }
        }
        else
        {
            if (field.scale === 0)
            {
                const regex = new RegExp(`^\\d{0,${field.precision}}$`);
                return regex.test(this.value);
            }
            else
            {
                const regex = new RegExp(
                    `^\\d{0,${field.precision - field.scale}}(?:\\.\\d{0,${field.scale}})?$`);
                return regex.test(this.value);
            }
        }
    }

    public visitFormFieldSelection(field: FormFieldSelection): boolean
    {
        if (field.editable)
        {
            return true;
        }

        if (field.multiple)
        {
            const array: string[] = this.value;
            return array.every(value => field.options.indexOf(value) >= 0);
        }
        else
        {
            return field.options.indexOf(this.value) >= 0;
        }
    }

    public visitFormFieldServiceRecordReference(field: FormFieldServiceRecordReference): boolean
    {
        return true;
    }

    public visitFormFieldSnomedTerm(field: FormFieldSnomedTerm): boolean
    {
        return true;
    }

    public visitFormFieldTable(field: FormFieldTable): boolean
    {
        const validRows = this.value.every((rowData) =>
        {
            return field.columns.every(
                columnField => this.validator.validate(rowData[columnField.id], columnField, columnField.state)
            );
        });

        return validRows;
    }

    public visitFormFieldText(field: FormFieldText): boolean
    {
        const string: string = this.value;
        if (field.minimumLength && (string.length < field.minimumLength))
        {
            return false;
        }
        return string.length <= field.size;
    }

    public visitFormFieldUnsupported(field: FormFieldUnsupported): boolean
    {
        return true;
    }

    public visitFormFieldValueSet(field: FormFieldValueSet): boolean
    {
        return true;
    }
}

class FieldValidator
{
    private readonly i18nStore: I18nStore;

    constructor(i18nStore: I18nStore)
    {
        this.i18nStore = i18nStore;
    }

    private checkFieldValidity<T>(data: T, fieldStates: FieldStates, field: FormField): boolean
    {
        const value = FormDataUtility.get(data, field);
        const fieldState = fieldStates[field.id];
        return this.validate(value, field, fieldState);
    }

    public validate(value: any, field: FormField, fieldState: FieldState, ignoreMandatory?: boolean): boolean
    {
        if (FieldStateUtility.isReadOnly(fieldState))
        {
            return true;
        }

        const mandatory = FieldStateUtility.isMandatory(fieldState) && !ignoreMandatory;
        if (lodash.isNil(value))
        {
            return !mandatory;
        }

        if ((typeof value === 'string') && (value === ''))
        {
            return !mandatory;
        }

        if (isObservableArray(value) && (value.length === 0))
        {
            return !mandatory;
        }
        if (Array.isArray(value) && (value.length === 0))
        {
            return !mandatory;
        }

        const visitor = new FieldValidatorVisitor(value, this);
        return FormFieldTypes.accept(field, visitor);
    }

    public validateDateTimeString(value: string, field: FormFieldDateTime): boolean
    {
        if (field.precisionMinute && this.i18nStore.isValidDateTimeString(value, Precision.Minute))
        {
            return true;
        }
        if (field.precisionDay && this.i18nStore.isValidDateTimeString(value, Precision.Day))
        {
            return true;
        }
        if (field.precisionMonth && this.i18nStore.isValidDateTimeString(value, Precision.Month))
        {
            return true;
        }
        if (field.precisionYear && this.i18nStore.isValidDateTimeString(value, Precision.Year))
        {
            return true;
        }

        return false;
    }

    private validateFieldsAndSections<T>(invalidFields: Set<string>, data: T, fieldsAndSections: FormFieldOrSection[],
        fieldStates?: FieldStates)
    {
        fieldsAndSections.forEach((fieldOrSection) =>
        {
            if (fieldOrSection.field)
            {
                const validField = this.checkFieldValidity<T>(data, fieldStates, fieldOrSection.field);
                // TODO include table column row invalid field data
                if (!validField)
                {
                    invalidFields.add(fieldOrSection.field.id);
                }
            }
            else if (fieldOrSection.section)
            {
                this.validateFieldsAndSections(invalidFields, data, fieldOrSection.section.fieldsAndSections,
                    fieldStates);
            }
        });
        return invalidFields;
    }

    public validateForm<T>(data: T, formDescription: FormDescription, fieldStates: FieldStates): Set<string>
    {
        const invalidFields: Set<string> = new Set<string>();
        this.validateFieldsAndSections(invalidFields, data, formDescription.fieldsAndSections, fieldStates);
        return invalidFields;
    }
}

export default FieldValidator;
