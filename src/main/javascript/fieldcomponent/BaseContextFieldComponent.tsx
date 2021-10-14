import {REQUIRED} from 'main/field/FieldConstants';
import FieldContext from 'main/field/FieldContext';
import FieldContextUtility from 'main/utility/FieldContextUtility';
import FieldStateUtility from 'main/utility/FieldStateUtility';
import {computed} from 'mobx';
import React from 'react';
import FieldState from 'smarthealth-javascript/FieldState';
import FormField from 'smarthealth-javascript/FormField';

/**
 * Base class for components that support fields that require only a context
 *
 * @author Larry 31/12/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
export interface BaseContextFieldComponentProps
{
    context: FieldContext;
}

abstract class BaseContextFieldComponent<T extends BaseContextFieldComponentProps = BaseContextFieldComponentProps>
    extends React.Component<T>
{
    @computed
    protected get editing(): boolean
    {
        return this.props.context.formContext.editing;
    }

    @computed
    protected get field(): FormField
    {
        return this.props.context.field as FormField;
    }

    @computed
    protected get fieldState(): FieldState
    {
        return FieldContextUtility.getFieldState(this.props.context);
    }

    @computed
    protected get mandatory(): boolean
    {
        return FieldStateUtility.isMandatory(this.fieldState);
    }

    @computed
    protected get placeholder(): string
    {
        return this.mandatory ? REQUIRED : null;
    }

    @computed
    protected get readOnly(): boolean
    {
        return FieldStateUtility.isReadOnly(this.fieldState);
    }

    @computed
    protected get toolTip(): string
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
}

export default BaseContextFieldComponent;
