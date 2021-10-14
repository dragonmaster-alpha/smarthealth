import {autobind} from 'core-decorators';
import FieldStateUtility from 'main/utility/FieldStateUtility';
import FormFieldWidthUtility from 'main/utility/FormFieldWidthUtility';
import NumberUtility from 'main/utility/NumberUtility';
import {InputText} from 'primereact/inputtext';
import React from 'react';
import FormFieldNumber from 'smarthealth-javascript/FormFieldNumber';
import BaseFieldOld from './BaseFieldOld';

/**
 * Number form field
 *
 * @author Larry 16/01/2019
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2019
 */
class NumberField extends BaseFieldOld<FormFieldNumber, number>
{
    private keyfilter: string;

    private maxLength: any;

    private tooltip: string;

    constructor(props)
    {
        super(props);

        const { field } = this.props;
        this.keyfilter = field.acceptNegative
            ? ((field.scale === 0) ? 'int' : 'num')
            : ((field.scale === 0) ? 'pint' : 'pnum');
        this.maxLength = FormFieldWidthUtility.maxLengthFormFieldNumber(field);
        this.tooltip = NumberUtility.buildToolTip(field);
    }

    @autobind
    private onBlur(e)
    {
        const { value } = e.target;
        const { field } = this.props;
        if ((value === '') || (value === null))
        {
            this.props.onFieldChange(null, field);
        }
        else
        {
            const numberValue: number = parseFloat(value);
            const fixedPointValue: number = NumberUtility.toFixedLength(numberValue, field.scale);
            this.props.onFieldChange(fixedPointValue, field);
        }
    }

    protected renderEditing()
    {
        const fixedPointOrEmptyString: string = (this.props.value === null) ? '' : this.toFixedPoint(this.props.value);
        return (
            <InputText className={this.classNames()}
                disabled={FieldStateUtility.isReadOnly(this.props.fieldState)} keyfilter={this.keyfilter}
                maxLength={this.maxLength} onChange={this.onChange} onBlur={this.onBlur}
                style={this.fieldWidthStyles()} tooltip={this.tooltip} value={fixedPointOrEmptyString} />
        );
    }

    protected renderValue()
    {
        const { value } = this.props;
        return this.toFixedPoint(value);
    }

    private toFixedPoint(value: string | number): string
    {
        if (typeof value === 'number')
        {
            return value.toFixed(this.props.field.scale);
        }
        else
        {
            return value;
        }
    }
}

export default NumberField;
