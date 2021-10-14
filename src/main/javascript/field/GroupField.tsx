import {css} from '@emotion/core';
import {autobind} from 'core-decorators';
import {field} from 'main/application/ThemeConstants';
import ErrorBoundary from 'main/component/ErrorBoundary';
import FieldContext from 'main/field/FieldContext';
import FieldFactory from 'main/field/FieldFactory';
import FieldLabel from 'main/field/FieldLabel';
import SimpleFieldContext from 'main/field/SimpleFieldContext';
import {OnFieldChange} from 'main/form/CustomFieldRenderer';
import {px} from 'main/utility/StyleUtility';
import React from 'react';
import FieldLabelPosition from 'smarthealth-javascript/FieldLabelPosition';
import FormField from 'smarthealth-javascript/FormField';
import FormFieldGroup from 'smarthealth-javascript/FormFieldGroup';

/**
 * A field that groups other fields.
 *
 * @author Larry 10/12/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
interface GroupFieldProps
{
    context: FieldContext;
    data: any;
    onFieldChange: OnFieldChange;
}

const labelStyle = css({
    padding: px(field.viewPaddingHeightPx, 0)
});

class GroupField extends React.Component<GroupFieldProps>
{
    public render(): React.ReactNode
    {
        const groupFieldContext = this.props.context;
        const groupField = groupFieldContext.field as FormFieldGroup;
        return <div style={{ display: 'flex' }}>{groupField.fields.map(this.renderField)}</div>;
    }

    @autobind
    private renderField(field: FormField): React.ReactNode
    {
        const { data } = this.props;
        const { formContext } = this.props.context;
        const components = [];
        const fieldContext = SimpleFieldContext.build(formContext, field);
        if (field.label && (!field.layout || (field.layout.labelPosition !== FieldLabelPosition.Omit)))
        {
            components.push(<span css={labelStyle}><FieldLabel context={fieldContext} omitSuffix={true} /></span>);
        }
        components.push(<FieldFactory context={fieldContext} data={data} onFieldChange={this.props.onFieldChange} />);
        return <ErrorBoundary>{components}</ErrorBoundary>;
    }
}

export default GroupField;
