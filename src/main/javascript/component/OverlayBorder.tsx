import {css} from '@emotion/core';
import {colour, dropdownBoxShadow, field} from 'main/application/ThemeConstants';
import {grid} from 'main/utility/StyleUtility';
import React from 'react';

/**
 * Draw a border around an overlay
 *
 * @author Larry 18/01/2021
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2021
 */
const borderStyle = css({
    backgroundColor: colour.white,
    borderStyle: colour.white,
    border: field.border,
    borderRadius: field.borderRadius,
    boxShadow: dropdownBoxShadow,
    ...grid()
});

class OverlayBorder extends React.Component
{
    public render(): React.ReactNode
    {
        return (
            <div css={borderStyle}>
                {this.props.children}
            </div>
        );
    }

}

export default OverlayBorder;
