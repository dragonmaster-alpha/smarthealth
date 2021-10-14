import {autobind} from 'core-decorators';
import {formatHealthCareCardNumber, formatMedicareNumber} from 'main/format/IdentifierFormat';
import FieldStateUtility from 'main/utility/FieldStateUtility';
import ShouldNeverGetHereError from 'main/utility/ShouldNeverGetHereError';
import {inject} from 'mobx-react';
import {InputText} from 'primereact/inputtext';
import React from 'react';
import FormFieldFormatted from 'smarthealth-javascript/FormFieldFormatted';
import FormFieldFormattedFormat from 'smarthealth-javascript/FormFieldFormattedFormat';
import BaseFieldOld from './BaseFieldOld';

/**
 * Formatted text form field
 *
 * @author Larry 6/03/2019
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2019
 */
@inject('appStore')
class FormattedField extends BaseFieldOld<FormFieldFormatted>
{
    private keyFilter(): RegExp
    {
        switch (this.props.field.format)
        {
        case FormFieldFormattedFormat.BloodPressure:
            return new RegExp('^[0-9/]+$');
        case FormFieldFormattedFormat.CFAustraliaIdentifier:
            return new RegExp(/[ \-a-zA-Z0-9]/);
        case FormFieldFormattedFormat.HealthCareCardNumber:
            return new RegExp(/[ \-a-zA-Z0-9]/);
        case FormFieldFormattedFormat.MedicareNumber:
            return new RegExp(/[ \-a-zA-Z0-9]/);
        case FormFieldFormattedFormat.Time:
            return new RegExp('[0-9:\\.]');
        default:
            throw new ShouldNeverGetHereError();
        }
        return null;
    }

    @autobind
    protected onBlur(e)
    {
        let value: string;
        switch (this.props.field.format)
        {
            // No case for BloodPressure
            // No case for CF Australia ID
        case FormFieldFormattedFormat.HealthCareCardNumber:
            value = formatHealthCareCardNumber(e.target.value);
            break;
        case FormFieldFormattedFormat.MedicareNumber:
            value = formatMedicareNumber(e.target.value);
            break;
        case FormFieldFormattedFormat.Time:
            value = this.props.appStore.i18nStore.reformatTimeString(e.target.value);
            break;
        default:
            value = e.target.value;
        }

        if (value !== e.target.value)
        {
            this.props.onFieldChange(value, this.props.field);
        }
    }

    @autobind
    protected onChange(e)
    {
        if (!this.props.disabled)
        {
            this.props.onFieldChange(e.target.value, this.props.field);
        }
    }

    protected renderEditing()
    {
        const valueOrEmptyString = (this.props.value === null) ? '' : this.props.value;
        return (
            <InputText className={this.classNames()}
                disabled={FieldStateUtility.isReadOnly(this.props.fieldState)}
                keyfilter={this.keyFilter()} onChange={this.onChange} onBlur={this.onBlur}
                maxLength={this.props.field.size} style={this.fieldWidthStyles()} tooltip={this.props.field.toolTip}
                value={valueOrEmptyString} />
        );
    }
}

export default FormattedField;
