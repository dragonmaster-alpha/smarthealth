import {css} from '@emotion/core';
import {colour, field, rowBackgroundColour} from 'main/application/ThemeConstants';
import {border, px} from 'main/utility/StyleUtility';
import * as React from 'react';

/**
 * Display a layout error
 *
 * @author Larry 10/12/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
interface FormFieldLayoutErrorProps
{
    fieldID: string;
    gridColumns: number;
    message: string;
    oddRow: boolean;
}

const componentErrorStyle = css({
    border: border(colour.error),
    padding: px(field.viewPaddingHeightPx - 1)
});

class FormFieldLayoutError extends React.Component<FormFieldLayoutErrorProps>
{
    public render(): React.ReactNode
    {
        return (
            <div css={componentErrorStyle} style={{
                backgroundColor: rowBackgroundColour(this.props.oddRow),
                gridColumnEnd: `span ${this.props.gridColumns}`
            }}>
                <i><b>Component Error:</b> {this.props.fieldID} - {this.props.message}</i>
            </div>
        );
    }
}

export default FormFieldLayoutError;
