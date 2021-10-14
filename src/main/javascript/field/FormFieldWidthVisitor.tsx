import {EMPTY} from 'main/field/FieldConstants';
import EnumUtility from 'main/utility/EnumUtility';
import FieldStateUtility from 'main/utility/FieldStateUtility';
import FormDescriptionUtility from 'main/utility/FormDescriptionUtility';
import FormFieldWidthUtility from 'main/utility/FormFieldWidthUtility';
import ShouldNeverGetHereError from 'main/utility/ShouldNeverGetHereError';
import FieldState from 'smarthealth-javascript/FieldState';
import FormField from 'smarthealth-javascript/FormField';
import FormFieldBoolean from 'smarthealth-javascript/FormFieldBoolean';
import FormFieldButton from 'smarthealth-javascript/FormFieldButton';
import FormFieldConditionsTable from 'smarthealth-javascript/FormFieldConditionsTable';
import FormFieldDateTime from 'smarthealth-javascript/FormFieldDateTime';
import FormFieldEnum from 'smarthealth-javascript/FormFieldEnum';
import FormFieldFormatted from 'smarthealth-javascript/FormFieldFormatted';
import FormFieldFormSpecific from 'smarthealth-javascript/FormFieldFormSpecific';
import FormFieldGroup from 'smarthealth-javascript/FormFieldGroup';
import FormFieldMedicalGroup from 'smarthealth-javascript/FormFieldMedicalGroup';
import FormFieldMedicalGroupList from 'smarthealth-javascript/FormFieldMedicalGroupList';
import FormFieldMedicalGroupLocation from 'smarthealth-javascript/FormFieldMedicalGroupLocation';
import FormFieldMember from 'smarthealth-javascript/FormFieldMember';
import FormFieldMemberOrMedicalGroup from 'smarthealth-javascript/FormFieldMemberOrMedicalGroup';
import FormFieldNumber from 'smarthealth-javascript/FormFieldNumber';
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
import ServiceRecordReferenceDisplayType from 'smarthealth-javascript/ServiceRecordReferenceDisplayType';

/**
 * Determine the width of a field in characters.
 *
 * @author Larry 15/05/2019
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2019
 */
class FormFieldWidthVisitor implements FormFieldVisitor<number>
{
    // TODO button size potentially in two places here and in the style sheet.
    public static readonly DATETIME_ICON_BUTTON_WIDTH_EM = 2.5;

    public static readonly ENTITY_STANDARD_WIDTH_EM = 20;

    public static readonly FORM_SPECIFIC_STANDARD_WIDTH_EM = 25;

    private static SELECTION_DROPDOWN_BUTTON_WIDTH_EM = 3;

    // TODO button size potentially in two places here and in the style sheet.
    public static readonly SERVICE_RECORD_REFERENCE_BUTTON_WIDTH_EM = 2.357;

    public static readonly SERVICE_RECORD_REFERENCE_CHARACTER_LENGTH = 50;

    public static readonly UNSUPPORTED_STANDARD_WIDTH_EM = 25;

    public static readonly VALUE_SET_STANDARD_WIDTH_EM = 18;

    public static accept(field: FormField, fieldState: FieldState): number
    {
        return FormFieldTypes.accept(field, new FormFieldWidthVisitor(fieldState));
    }

    private readonly fieldState: FieldState;

    private constructor(fieldState: FieldState)
    {
        this.fieldState = fieldState;
    }

    public visitFormFieldBoolean(field: FormFieldBoolean): number
    {
        const trueLength = field.trueDisplayText ? field.trueDisplayText.length : 3;
        const falseLength = field.falseDisplayText ? field.falseDisplayText.length : 2;
        return Math.max(trueLength, falseLength) + 2;
    }

    public visitFormFieldButton(field: FormFieldButton): number
    {
        throw new Error('TODO');
    }

    public visitFormFieldConditionsTable(field: FormFieldConditionsTable): number
    {
        throw new Error('TODO');
    }

    public visitFormFieldDateTime(field: FormFieldDateTime): number
    {
        return FormFieldWidthUtility.dateTimeFieldWidth(FormDescriptionUtility.determineHighestPrecision(
            field)) + FormFieldWidthVisitor.DATETIME_ICON_BUTTON_WIDTH_EM;
    }

    public visitFormFieldEnum(field: FormFieldEnum): number
    {
        const nullOption = FieldStateUtility.isMandatory(field.state) ? null : EMPTY;
        return FormFieldWidthUtility.adjustWidth(EnumUtility.getEnumSize(field.enumType,
            nullOption)) + FormFieldWidthVisitor.SELECTION_DROPDOWN_BUTTON_WIDTH_EM;
    }

    public visitFormFieldFormSpecific(field: FormFieldFormSpecific): number
    {
        return FormFieldWidthVisitor.FORM_SPECIFIC_STANDARD_WIDTH_EM;
    }

    public visitFormFieldFormatted(field: FormFieldFormatted): number
    {
        return FormFieldWidthUtility.adjustWidth(field.size);
    }

    public visitFormFieldGroup(field: FormFieldGroup): number
    {
        // TODO implement
        throw new ShouldNeverGetHereError();
    }

    public visitFormFieldMedicalGroup(field: FormFieldMedicalGroup): number
    {
        return FormFieldWidthVisitor.ENTITY_STANDARD_WIDTH_EM;
    }

    public visitFormFieldMedicalGroupList(field: FormFieldMedicalGroupList): number
    {
        // TODO Larry - should have a size
        return FormFieldWidthVisitor.ENTITY_STANDARD_WIDTH_EM;
    }

    public visitFormFieldMedicalGroupLocation(field: FormFieldMedicalGroupLocation): number
    {
        return FormFieldWidthVisitor.ENTITY_STANDARD_WIDTH_EM;
    }

    public visitFormFieldMember(field: FormFieldMember): number
    {
        return FormFieldWidthVisitor.ENTITY_STANDARD_WIDTH_EM;
    }

    public visitFormFieldMemberOrMedicalGroup(field: FormFieldMemberOrMedicalGroup): number
    {
        return FormFieldWidthVisitor.ENTITY_STANDARD_WIDTH_EM;
    }

    public visitFormFieldNumber(field: FormFieldNumber): number
    {
        return FormFieldWidthUtility.adjustWidth(FormFieldWidthUtility.maxLengthFormFieldNumber(field));
    }

    public visitFormFieldSelection(field: FormFieldSelection): number
    {
        return FormFieldWidthUtility.determineSelectionWidth(field.size, field.multiple,
            FieldStateUtility.isMandatory(this.fieldState));
    }

    public visitFormFieldServiceRecordReference(field: FormFieldServiceRecordReference): number
    {
        if (field.displayType === ServiceRecordReferenceDisplayType.ButtonOnly)
        {
            return FormFieldWidthVisitor.SERVICE_RECORD_REFERENCE_BUTTON_WIDTH_EM;
        }
        else if (field.displayType === ServiceRecordReferenceDisplayType.ServiceDate)
        {
            return FormFieldWidthUtility.dateTimeFieldWidth(
                Precision.Minute) + FormFieldWidthVisitor.SERVICE_RECORD_REFERENCE_BUTTON_WIDTH_EM;
        }
        else if (field.displayType === ServiceRecordReferenceDisplayType.Summary)
        {
            return FormFieldWidthUtility.textFieldWidth(
                FormFieldWidthVisitor.SERVICE_RECORD_REFERENCE_CHARACTER_LENGTH
            ) + FormFieldWidthVisitor.SERVICE_RECORD_REFERENCE_BUTTON_WIDTH_EM;
        }
        else
        {
            throw new ShouldNeverGetHereError();
        }
    }

    public visitFormFieldSnomedTerm(field: FormFieldSnomedTerm): number
    {
        throw new Error('TODO');
    }

    public visitFormFieldTable(field: FormFieldTable): number
    {
        throw new Error('TODO');
    }

    public visitFormFieldText(field: FormFieldText): number
    {
        return FormFieldWidthUtility.textFieldWidth(field.size);
    }

    public visitFormFieldUnsupported(field: FormFieldUnsupported): number
    {
        return FormFieldWidthVisitor.UNSUPPORTED_STANDARD_WIDTH_EM;
    }

    public visitFormFieldValueSet(field: FormFieldValueSet): number
    {
        // TODO Larry - put the size in the field so we don't need to fetch the value set
        return FormFieldWidthVisitor.VALUE_SET_STANDARD_WIDTH_EM;
    }
}

export default FormFieldWidthVisitor;
