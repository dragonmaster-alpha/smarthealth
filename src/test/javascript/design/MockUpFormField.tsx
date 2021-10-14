import {css} from '@emotion/core';
import lodash from 'lodash';
import {field} from 'main/application/ThemeConstants';
import ErrorBoundary from 'main/component/ErrorBoundary';
import DateUtility from 'main/utility/DateUtility';
import {jsonify} from 'main/utility/Jsonify';
import {px} from 'main/utility/StyleUtility';
import React from 'react';
import FormField from 'smarthealth-javascript/FormField';
import FormFieldTypes from 'smarthealth-javascript/FormFieldTypes';
import FormFieldUnsupported from 'smarthealth-javascript/FormFieldUnsupported';
import MockUpCheckboxField from 'test/design/MockUpCheckboxField';
import MockUpDateTimeField from 'test/design/MockUpDateTimeField';
import MockUpEnumField from 'test/design/MockUpEnumField';
import MockUpLocationField from 'test/design/MockUpLocationField';
import MockUpMemberField from 'test/design/MockUpMemberField';
import MockUpNumberField from 'test/design/MockUpNumberField';
import MockUpSelectionField from 'test/design/MockUpSelectionField';
import MockUpTableField from 'test/design/MockUpTableField';
import MockUpTextField from 'test/design/MockUpTextField';

/**
 * Mockup field in a form
 *
 * @author Larry 9/10/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
interface MockUpFormFieldProps
{
    editing?: boolean;
    field: FormField;
    value: any;
}

const unknownStyle = css({
    lineHeight: px(field.heightPx),
    padding: '0 8px'
});

class MockUpFormField extends React.Component<MockUpFormFieldProps>
{
    public render(): React.ReactNode
    {
        return <ErrorBoundary>{this.renderField()}</ErrorBoundary>;
    }

    private renderField()
    {
        const { field, value } = this.props;
        if (FormFieldTypes.isBoolean(field))
        {
            return <MockUpCheckboxField editing={this.props.editing} value={value} />;
        }
        else if (FormFieldTypes.isDateTime(field))
        {
            return <MockUpDateTimeField editing={this.props.editing} field={field}
                value={value && DateUtility.formatEventDateTime(value, 'en-AU')} />;
        }
        else if (FormFieldTypes.isEnum(field))
        {
            return <MockUpEnumField editing={this.props.editing} field={field} value={value} />;
        }
        else if (FormFieldTypes.isNumber(field))
        {
            return <MockUpNumberField value={value} editing={this.props.editing} field={field} />;
        }
        else if (FormFieldTypes.isSelection(field))
        {
            return <MockUpSelectionField editing={this.props.editing} size={field.size} value={value} />;
        }
        else if (FormFieldTypes.isMedicalGroupLocation(field))
        {
            return <MockUpLocationField value={value} editing={this.props.editing} />;
        }
        else if (FormFieldTypes.isTable(field))
        {
            return <MockUpTableField editing={this.props.editing} field={field} value={value} />;
        }
        else if (FormFieldTypes.isText(field))
        {
            return <MockUpTextField value={value} editing={this.props.editing} field={field} />;
        }
        else if (FormFieldTypes.isMember(field))
        {
            return <MockUpMemberField value={value} editing={this.props.editing} field={field} />;
        }
        else
        {
            if (this.props.editing)
            {
                return <div css={unknownStyle}>Unknown field type: {(field as FormFieldUnsupported).type}</div>;
            }
            else if (!value)
            {
                return <div css={unknownStyle}>-</div>;
            }
            else if (lodash.isString(value))
            {
                return <div css={unknownStyle}>{value}</div>;
            }
            else
            {
                return <div css={unknownStyle}>{jsonify(value)}</div>;
            }
        }
    }
}

export default MockUpFormField;
