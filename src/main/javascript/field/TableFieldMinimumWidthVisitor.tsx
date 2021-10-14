import FormFieldWidthVisitor from 'main/field/FormFieldWidthVisitor';
import FormDescriptionUtility from 'main/utility/FormDescriptionUtility';
import FormFieldWidthUtility from 'main/utility/FormFieldWidthUtility';
import ShouldNeverGetHereError from 'main/utility/ShouldNeverGetHereError';
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
 * Determine the minimum width of a field in a table in em.
 *
 * @author Thompson 21/02/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */

class TableFieldMinimumWidthVisitor implements FormFieldVisitor<number>
{
    private static SERVICE_RECORD_REFERENCE_SERVICE_DATE_MINIMUM_FACTOR = 1.2;

    public accept(field: FormField): number
    {
        return FormFieldTypes.accept(field, this);
    }

    public visitFormFieldBoolean(field: FormFieldBoolean): number
    {
        const trueLength = field.trueDisplayText ? field.trueDisplayText.length : 3;
        const falseLength = field.falseDisplayText ? field.falseDisplayText.length : 2;
        return (Math.max(trueLength, falseLength) + 2) / 2;
    }

    public visitFormFieldButton(field: FormFieldButton): number
    {
        throw new Error('TODO');
    }

    public visitFormFieldConditionsTable(field: FormFieldConditionsTable): number
    {
        throw new ShouldNeverGetHereError();
    }

    public visitFormFieldDateTime(field: FormFieldDateTime): number
    {
        return FormFieldWidthUtility.dateTimeFieldWidth(FormDescriptionUtility.determineHighestPrecision(
            field)) + FormFieldWidthVisitor.DATETIME_ICON_BUTTON_WIDTH_EM;
    }

    public visitFormFieldEnum(field: FormFieldEnum): number
    {
        return FormFieldWidthVisitor.accept(field, field.state) / 2;
    }

    public visitFormFieldFormSpecific(field: FormFieldFormSpecific): number
    {
        return FormFieldWidthVisitor.FORM_SPECIFIC_STANDARD_WIDTH_EM;
    }

    public visitFormFieldFormatted(field: FormFieldFormatted): number
    {
        return FormFieldWidthUtility.adjustWidth(field.size) / 2;
    }

    public visitFormFieldGroup(field: FormFieldGroup): number
    {
        throw Error('TODO');
    }

    public visitFormFieldMedicalGroup(field: FormFieldMedicalGroup): number
    {
        return FormFieldWidthVisitor.ENTITY_STANDARD_WIDTH_EM / 2;
    }

    public visitFormFieldMedicalGroupList(field: FormFieldMedicalGroupList): number
    {
        return FormFieldWidthVisitor.ENTITY_STANDARD_WIDTH_EM / 2;
    }

    public visitFormFieldMedicalGroupLocation(field: FormFieldMedicalGroupLocation): number
    {
        return FormFieldWidthVisitor.ENTITY_STANDARD_WIDTH_EM / 2;
    }

    public visitFormFieldMember(field: FormFieldMember): number
    {
        return FormFieldWidthVisitor.ENTITY_STANDARD_WIDTH_EM / 2;
    }

    public visitFormFieldMemberOrMedicalGroup(field: FormFieldMemberOrMedicalGroup): number
    {
        return FormFieldWidthVisitor.ENTITY_STANDARD_WIDTH_EM / 2;
    }

    public visitFormFieldNumber(field: FormFieldNumber): number
    {
        return FormFieldWidthUtility.adjustWidth(FormFieldWidthUtility.maxLengthFormFieldNumber(field)) / 2;
    }

    public visitFormFieldSelection(field: FormFieldSelection): number
    {
        return FormFieldWidthUtility.adjustWidth(field.size);
    }

    public visitFormFieldServiceRecordReference(field: FormFieldServiceRecordReference): number
    {
        if (field.displayType === ServiceRecordReferenceDisplayType.ButtonOnly)
        {
            return FormFieldWidthVisitor.SERVICE_RECORD_REFERENCE_BUTTON_WIDTH_EM;
        }
        else if (field.displayType === ServiceRecordReferenceDisplayType.ServiceDate)
        {
            return (FormFieldWidthUtility.dateTimeFieldWidth(Precision.Minute)
                / TableFieldMinimumWidthVisitor.SERVICE_RECORD_REFERENCE_SERVICE_DATE_MINIMUM_FACTOR
            ) + FormFieldWidthVisitor.SERVICE_RECORD_REFERENCE_BUTTON_WIDTH_EM;
        }
        else if (field.displayType === ServiceRecordReferenceDisplayType.Summary)
        {
            return (FormFieldWidthUtility.textFieldWidth(
                    FormFieldWidthVisitor.SERVICE_RECORD_REFERENCE_CHARACTER_LENGTH) / 2
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
        throw new ShouldNeverGetHereError();
    }

    public visitFormFieldText(field: FormFieldText): number
    {
        return FormFieldWidthUtility.textFieldWidth(field.size) / 2;
    }

    public visitFormFieldUnsupported(field: FormFieldUnsupported): number
    {
        return FormFieldWidthVisitor.UNSUPPORTED_STANDARD_WIDTH_EM / 2;
    }

    public visitFormFieldValueSet(field: FormFieldValueSet): number
    {
        return FormFieldWidthVisitor.VALUE_SET_STANDARD_WIDTH_EM / 2;
    }
}

export default TableFieldMinimumWidthVisitor;
