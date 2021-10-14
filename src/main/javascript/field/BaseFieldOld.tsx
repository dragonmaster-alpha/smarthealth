import classNames from 'classnames';
import {autobind} from 'core-decorators';
import lodash from 'lodash';
import FieldContext from 'main/field/FieldContext';
import {isTableFieldContext} from 'main/field/TableFieldContext';
import {OnFieldChange} from 'main/form/CustomFieldRenderer';
import FieldValidator from 'main/form/FieldValidator';
import StoreProps from 'main/store/StoreProps';
import FormFieldWidthUtility from 'main/utility/FormFieldWidthUtility';
import {computed} from 'mobx';
import React, {CSSProperties} from 'react';
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
export interface BaseFieldOldProps<F extends FormField, T = string> extends StoreProps
{
    // TODO consider context: FieldContext<F>; - this may require lots of casts
    context: FieldContext;
    disabled?: boolean;
    editing?: boolean;
    field: F;
    fieldState?: FieldState;
    fieldValidator: FieldValidator;
    onFieldChange: OnFieldChange;
    value: any;
}

abstract class BaseFieldOld<F extends FormField, T = string,
    P extends BaseFieldOldProps<F, T> = BaseFieldOldProps<F, T>>
    extends React.Component<P>
{
    @computed
    protected get valid(): boolean
    {
        // @ts-ignore
        const { context, field, fieldState, value } = this.props;
        return context.formContext.fieldValidator.validate(value, field, fieldState);
    }

    protected classNames(): string
    {
        const { disabled } = this.props;
        return classNames({ 'p-error': !this.valid, 'is-disabled': disabled });
    }

    protected fieldWidthStyles(): CSSProperties
    {
        return { width: '100%', maxWidth: this.maxWidth() };
    }

    protected maxWidth(): string
    {
        const maxWidth = (this.props.field.layout && this.props.field.layout.fillWidth)
            ? 'none'
            : FormFieldWidthUtility.widthEM(this.props.field, this.props.fieldState);
        return maxWidth;
    }

    @autobind
    protected onChange(e)
    {
        if (this.props.disabled)
        {
            return;
        }

        const { value } = e.target;
        this.props.onFieldChange(value, this.props.field);
    }

    public render(): React.ReactNode
    {
        const { editing } = this.props;
        if (editing)
        {
            return (
                <>
                    {this.renderEditing()}
                    <span>{this.renderUnits(editing)}</span>
                </>
            );
        }
        else
        {
            return (
                <span className={classNames('ct-formfieldcomponent-view')}>
                    {this.renderValue()} {this.renderUnits(editing)}
                </span>
            );
        }
    }

    protected abstract renderEditing(): React.ReactNode;

    private renderUnits(editing: boolean): string
    {
        if (!editing && !this.props.value)
        {
            return null;
        }
        else if (isTableFieldContext(this.props.context))
        {
            return null;
        }
        else
        {
            return this.props.field.units;
        }
    }

    protected renderValue(): React.ReactNode
    {
        const { value } = this.props;
        if (lodash.isObject(value))
        {
            return 'Cannot render an object';
        }
        else if (lodash.isArray(value))
        {
            return 'Cannot render an array';
        }
        else
        {
            return value;
        }
    }
}

export default BaseFieldOld;
