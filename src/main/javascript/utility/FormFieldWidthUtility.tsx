import {EMPTY} from 'main/field/FieldConstants';
import FormFieldWidthVisitor from 'main/field/FormFieldWidthVisitor';
import ShouldNeverGetHereError from 'main/utility/ShouldNeverGetHereError';
import FieldState from 'smarthealth-javascript/FieldState';
import FormField from 'smarthealth-javascript/FormField';
import FormFieldNumber from 'smarthealth-javascript/FormFieldNumber';
import Precision from 'smarthealth-javascript/Precision';

/**
 * Methods to determine width of fields
 *
 * @author Larry 15/05/2019
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2019
 */
class FormFieldWidthUtility
{
    // // TODO button size potentially in two places here and in the style sheet.
    // public static readonly DATETIME_ICON_BUTTON_WIDTH_EM = 2.5;
    //
    // public static readonly ENTITY_STANDARD_WIDTH_EM = 20;
    //
    // // number of characters in the string "(Empty)", which is the default value for non-mandatory Selection and
    //
    // public static readonly FORM_SPECIFIC_STANDARD_WIDTH_EM = 25;

    public static readonly MINIMUM_CHARACTER_LENGTH = 5;

    // if SelectionField multiple=true, each selection is in a Chip component which has side padding and delete button
    private static SELECTION_CHIP_EXTRA_WIDTH_EM = 1;

    private static SELECTION_DROPDOWN_BUTTON_WIDTH_EM = 3;

    // TODO button size potentially in two places here and in the style sheet.
    // public static readonly SERVICE_RECORD_REFERENCE_BUTTON_WIDTH_EM = 2.357;

    // public static readonly SERVICE_RECORD_REFERENCE_CHARACTER_LENGTH = 50;

    public static readonly TEXT_MAXIMUM_WIDTH = 40;

    public static adjustWidth(size: number): number
    {
        if (size <= FormFieldWidthUtility.MINIMUM_CHARACTER_LENGTH)
        {
            // size too small to adjustWidth with algorithm
            return FormFieldWidthUtility.MINIMUM_CHARACTER_LENGTH - 1;
        }
        else
        {
            return Math.floor((size * 11) / 15);
        }
    }

    public static dateTimeFieldWidth(precision: Precision): number
    {
        switch (precision)
        {
        case Precision.Minute:
            return this.adjustWidth(16);
        case Precision.Day:
            return this.adjustWidth(10);
        case Precision.Month:
            return this.adjustWidth(7);
        case Precision.Year:
            return this.adjustWidth(4);
        default:
            throw new ShouldNeverGetHereError();
        }
    }

    public static determineSelectionWidth(size: number, multiple: boolean, mandatory: boolean): number
    {
        const chipWidthEM = multiple ? FormFieldWidthUtility.SELECTION_CHIP_EXTRA_WIDTH_EM : 0;
        if (!mandatory && (size < EMPTY.length))
        {
            return FormFieldWidthUtility.adjustWidth(EMPTY.length)
                + FormFieldWidthUtility.SELECTION_DROPDOWN_BUTTON_WIDTH_EM + chipWidthEM;
        }
        else
        {
            return FormFieldWidthUtility.adjustWidth(size)
                + FormFieldWidthUtility.SELECTION_DROPDOWN_BUTTON_WIDTH_EM + chipWidthEM;
        }
    }

    public static maxLengthFormFieldNumber(field: FormFieldNumber): number
    {
        return field.acceptNegative
            ? ((field.scale !== 0) ? field.precision + 2 : field.precision + 1)
            : ((field.scale !== 0) ? field.precision + 1 : field.precision);
    }

    public static textFieldWidth(size: number): number
    {
        if (size > FormFieldWidthUtility.TEXT_MAXIMUM_WIDTH)
        {
            return FormFieldWidthUtility.TEXT_MAXIMUM_WIDTH;
        }
        else
        {
            return FormFieldWidthUtility.adjustWidth(size);
        }
    }

    public static widthEM(field: FormField, fieldState: FieldState): string
    {
        const width = FormFieldWidthVisitor.accept(field, fieldState);
        if (width < FormFieldWidthUtility.TEXT_MAXIMUM_WIDTH)
        {
            return `${width}em`;
        }
        else
        {
            return '100%';
        }
    }
}

export default FormFieldWidthUtility;
