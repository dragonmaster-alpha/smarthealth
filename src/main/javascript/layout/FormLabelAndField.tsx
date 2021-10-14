import {css} from '@emotion/core';
import {field, rowBackgroundColour} from 'main/application/ThemeConstants';
import FieldContext from 'main/field/FieldContext';
import FieldLabel from 'main/field/FieldLabel';
import {px} from 'main/utility/StyleUtility';
import * as React from 'react';
import FieldLabelPosition from 'smarthealth-javascript/FieldLabelPosition';
import FormFieldTypes from 'smarthealth-javascript/FormFieldTypes';

/**
 * Layout a label and a field
 *
 * @author Larry 10/12/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
interface FormLabelAndFieldProps
{
    fieldContext: FieldContext;
    gridColumns: number;
    oddRow: boolean;
}

const labelAboveStyle = css({
    padding: px(field.viewPaddingHeightPx, 8, 0, 8)
});

const labelBeforeStyle = css({
    padding: px(field.viewPaddingHeightPx, 8, field.viewPaddingHeightPx, 16),
    textAlign: 'right'
});

const labelBeforeTopStyle = css(labelBeforeStyle, {
    verticalAlign: 'top'
});

class FormLabelAndField extends React.Component<FormLabelAndFieldProps>
{
    public render(): React.ReactNode
    {
        const { layout } = this.props.fieldContext.field;
        const labelPosition = layout && layout.labelPosition;

        const components = [];
        if (labelPosition === FieldLabelPosition.Above)
        {
            components.push(this.renderLabelAboveAndField(this.props.gridColumns, this.props.oddRow));
        }
        else if (labelPosition === FieldLabelPosition.Omit)
        {
            components.push(this.renderField(this.props.gridColumns, this.props.oddRow));
        }
        else
        {
            components.push(this.renderLabel(this.props.oddRow));
            components.push(this.renderField(this.props.gridColumns - 1, this.props.oddRow));
        }
        return components;
    }

    private renderField(gridColumns: number, oddRow: boolean): React.ReactNode
    {
        const style: React.CSSProperties = { backgroundColor: rowBackgroundColour(oddRow) };
        if (gridColumns > 1)
        {
            style.gridColumnEnd = this.span(gridColumns);
        }
        return <div style={style}>{this.props.children}</div>;
    }

    private renderLabel(oddRow: boolean): React.ReactNode
    {
        const { fieldContext } = this.props;
        const { layout } = fieldContext.field;
        const labelPosition = layout && layout.labelPosition;

        return (
            <div css={labelPosition === FieldLabelPosition.BeforeTop ? labelBeforeTopStyle : labelBeforeStyle}
                style={{ backgroundColor: rowBackgroundColour(oddRow) }}>
                <FieldLabel context={this.props.fieldContext} />
            </div>
        );
    }

    private renderLabelAboveAndField(gridColumns: number, oddRow: boolean): React.ReactNode
    {
        const marginBottom = this.props.fieldContext.formContext.editing ? 0 :
            FormFieldTypes.isTable(this.props.fieldContext.field) ? 0 : '-8px';
        return (
            <div style={{
                backgroundColor: rowBackgroundColour(oddRow),
                gridColumnEnd: this.span(gridColumns),
                paddingLeft: '8px'
            }}>
                <div css={labelAboveStyle} style={{ marginBottom }}>
                    <FieldLabel context={this.props.fieldContext} />
                </div>
                <div>
                    {this.props.children}
                </div>
            </div>
        );
    }

    private span(gridColumns)
    {
        return `span ${gridColumns}`;
    }
}

export default FormLabelAndField;
