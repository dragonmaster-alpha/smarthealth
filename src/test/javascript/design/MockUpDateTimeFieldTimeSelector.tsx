import {css} from '@emotion/core';
import {colour, field, font} from 'main/application/ThemeConstants';
import React from 'react';

/**
 * Time component (hours and minutes) for DateTimeField overlay. Clicking on hours or minutes input will put focus and
 * select all values in the input.
 *
 * @author Thompson 8/01/2021
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2021
 */
const timeStyle = css({
    input: {
        border: field.border,
        borderRadius: field.borderRadius,
        color: colour.text,
        font: font.text,
        textAlign: 'right',
        ':hover': {
            ...field.hover
        },
        ':focus': {
            ...field.focus
        }
    },
    span: {
        color: colour.label,
        font: font.label,
        paddingRight: '8px'
    }
});

class MockUpDateTimeFieldTimeSelector extends React.Component
{
    private onInputFocus(e)
    {
        e.target.select();
    }

    public render()
    {
        return (
            <div css={timeStyle}>
                <span>Time:</span>
                <input type="text" defaultValue="00" onFocus={this.onInputFocus} size={2} maxLength={2} title="Hours" />
                &nbsp;:&nbsp;
                <input type="text" defaultValue="00" onFocus={this.onInputFocus} size={2} maxLength={2}
                    title="Minutes" />
            </div>
        );
    }
}

export default MockUpDateTimeFieldTimeSelector;
