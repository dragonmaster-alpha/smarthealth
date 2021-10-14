import {css} from '@emotion/core';
import {colour, field, font} from 'main/application/ThemeConstants';
import FieldContext from 'main/field/FieldContext';
import {px} from 'main/utility/StyleUtility';
import React from 'react';
import FieldLabelPosition from 'smarthealth-javascript/FieldLabelPosition';

/**
 * Render the label for a field.
 *
 * @author Larry 4/12/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
interface FieldLabelProps
{
    context: FieldContext;
    omitSuffix?: boolean;
}

const labelStyle = css({
    color: colour.label,
    font: font.label
});

const labelBeforeStyle = css(labelStyle, {
    verticalAlign: 'middle',
    textAlign: 'right'
});

const labelAboveStyle = css(labelStyle, {
    textAlign: 'left'
});

const labelBeforeTopStyle = css(labelStyle, {
    verticalAlign: 'top'
});

class FieldLabel extends React.Component<FieldLabelProps>
{
    private addSuffix(label: string): string
    {
        if (this.props.omitSuffix || label.endsWith('?') || label.endsWith(':'))
        {
            return label;
        }
        else
        {
            return `${label}:`;
        }
    }

    public render(): React.ReactNode
    {
        const { context } = this.props;
        const { layout } = context.field;

        const labelPosition = (layout && layout.labelPosition) || FieldLabelPosition.Before;
        // @ts-ignore
        const labelPadding = (labelPosition === FieldLabelPosition.Above) ?
            px(field.viewPaddingHeightPx, 8, 0, 8) :
            px(field.viewPaddingHeightPx, 8, field.viewPaddingHeightPx, 16);
        // @ts-ignore
        const style = (labelPosition === FieldLabelPosition.Above) ? labelAboveStyle
            : (labelPosition === FieldLabelPosition.BeforeTop) ? labelBeforeTopStyle
                : labelBeforeStyle;

        return <label css={labelStyle} htmlFor={context.id}>{this.addSuffix(context.field.label)}</label>;
    }
}

export default FieldLabel;
