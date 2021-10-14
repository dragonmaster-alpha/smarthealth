import css from '@emotion/css';
import {colour, field, font} from 'main/application/ThemeConstants';
import {px} from 'main/utility/StyleUtility';
import React from 'react';
import FieldLabelPosition from 'smarthealth-javascript/FieldLabelPosition';

/**
 * Label for a field in a form.
 *
 * @author Thompson 1/10/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
interface MockUpFieldLabelProps
{
    label: string;
    labelPosition?: FieldLabelPosition;
}

class MockUpFieldLabel extends React.Component<MockUpFieldLabelProps>
{
    public render()
    {
        const labelPosition = this.props.labelPosition || FieldLabelPosition.Before;
        const labelPadding = (labelPosition === FieldLabelPosition.Above) ?
            px(0) :
            px(field.viewPaddingHeightPx, 8, field.viewPaddingHeightPx, 16);
        const style = css({
            color: colour.label,
            display: 'inline-block',
            font: font.label,
            verticalAlign: (labelPosition === FieldLabelPosition.BeforeTop) ? 'top' : 'middle',
            padding: labelPadding,
            textAlign: (labelPosition === FieldLabelPosition.Above) ? 'left' : 'right',
            width: '100%'
        });

        const suffix = this.props.label.endsWith('?') ? '' : ':';

        return <span css={style}>{this.props.label}{suffix}</span>;
    }
}

export default MockUpFieldLabel;
