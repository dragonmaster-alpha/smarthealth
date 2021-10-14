import {css} from '@emotion/core';
import {autobind} from 'core-decorators';
import lodash from 'lodash';
import {field} from 'main/application/ThemeConstants';
import FieldContext from 'main/field/FieldContext';
import {isTableFieldContext} from 'main/field/TableFieldContext';
import {OnFieldChange} from 'main/form/CustomFieldRenderer';
import StoreProps from 'main/store/StoreProps';
import FieldContextUtility from 'main/utility/FieldContextUtility';
import {px} from 'main/utility/StyleUtility';
import {computed} from 'mobx';
import React from 'react';
import FieldState from 'smarthealth-javascript/FieldState';
import FormField from 'smarthealth-javascript/FormField';

/**
 * Base classes for form fields
 * <ul>
 *     <li>F: a subclass of FormField that described the field</li>
 *     <li>T: the type of the data for the field, usually string</li>
 *     <li>P: allow additional props to be passed</li>
 * </ul>
 *
 * @author Larry 16/01/2019
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2019
 */
export interface BaseFieldProps<F extends FormField, T = string> extends StoreProps
{
    // TODO consider context: FieldContext<F>; - this may require lots of casts
    context: FieldContext;
    onFieldChange: OnFieldChange;
    value: T;
}

const viewStyle = css({
    display: 'inline-block',
    verticalAlign: 'middle',
    padding: px(field.viewPaddingHeightPx, 8)
});

const unitsStyle = css({
    marginLeft: px(4)
});

abstract class BaseField<F extends FormField, T = string, P extends BaseFieldProps<F, T> = BaseFieldProps<F, T>>
    extends React.Component<P>
{
    @computed
    protected get editing(): boolean
    {
        return this.props.context.formContext.editing;
    }

    @computed
    protected get field(): F
    {
        return this.props.context.field as F;
    }

    @computed
    protected get fieldState(): FieldState
    {
        return FieldContextUtility.getFieldState(this.props.context);
    }

    @computed
    protected get mandatory(): boolean
    {
        return FieldContextUtility.isMandatory(this.props.context);
    }

    @computed
    protected get placeholder(): string
    {
        return this.mandatory ? 'Required' : null;
    }

    @computed
    protected get readOnly(): boolean
    {
        return FieldContextUtility.isReadOnly(this.props.context);
    }

    @computed
    protected get toolTip(): string
    {
        return this.buildToolTip();
    }

    @computed
    protected get valid(): boolean
    {
        return FieldContextUtility.isValid(this.props.context, this.props.value);
    }

    protected buildToolTip()
    {
        const toolTip = [this.field.toolTip];
        if (this.editing && !this.readOnly)
        {
            toolTip.push(this.getValidationText());
        }
        return toolTip.filter(value => value)
            .join('\r\n');
    }

    protected getValidationText(): string
    {
        return null;
    }

    @autobind
    protected onValueChange(value)
    {
        this.props.onFieldChange(value, this.field);
    }

    public render(): React.ReactNode
    {
        if (this.editing)
        {
            return this.renderEditing();
        }
        else
        {
            return this.renderView();
        }
    }

    protected abstract renderEditing(): React.ReactNode;

    protected renderObject(value): React.ReactNode
    {
        return 'Cannot render an object';
    }

    protected renderUnits(): React.ReactNode
    {
        if (!this.field.units || isTableFieldContext(this.props.context))
        {
            return null;
        }
        if (!this.editing && lodash.isNil(this.props.value))
        {
            return null;
        }

        return <span css={unitsStyle}>{this.field.units}</span>;
    }

    protected renderValue(value, nullValue = '-'): React.ReactNode
    {
        if (lodash.isArray(value))
        {
            const array: any[] = value;
            if (array.length === 0)
            {
                return nullValue;
            }
            return array.map(entry => this.renderValue(entry, nullValue))
                .join(', ');
        }
        else if (lodash.isObject(value))
        {
            return this.renderObject(value);
        }
        else if (value)
        {
            return value;
        }
        else
        {
            return nullValue;
        }
    }

    protected renderView(): React.ReactNode
    {
        return (
            <span css={viewStyle} title={this.toolTip}>
               {this.renderValue(this.props.value)}
                {this.renderUnits()}
            </span>
        );
    }
}

export default BaseField;
