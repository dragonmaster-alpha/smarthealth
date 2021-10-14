import lodash from 'lodash';
import React from 'react';

/**
 * Utility methods for styles
 *
 * @author Larry 13/10/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */

/**
 * Format a string for use as a border in CSS
 */
export function border(colour: string, sizePx: number = 1, style: string = 'solid')
{
    return `${style} ${pxOrZero(sizePx)} ${colour}`;
}

/**
 * Format a string for use in CSS with 1 to 4 values in pixels. This can be used for values such as height and padding.
 */
export function px(topPx: number, rightPx?: number, bottomPx?: number, leftPx?: number): string
{
    const sizes = [pxOrZero(topPx)];
    if (!lodash.isNil(rightPx))
    {
        sizes.push(pxOrZero(rightPx));
        if (!lodash.isNil(bottomPx))
        {
            sizes.push(pxOrZero(bottomPx));
            if (!lodash.isNil(leftPx))
            {
                sizes.push(pxOrZero(leftPx));
            }
        }
    }
    return lodash.join(sizes, ' ');
}

function pxOrZero(sizePx: number): string
{
    if (sizePx === 0)
    {
        return '0';
    }
    else
    {
        return `${sizePx}px`;
    }
}

export function grid(columns?: string, rows?: string): React.CSSProperties
{
    return {
        display: 'grid',
        gridTemplateColumns: columns || '1fr',
        gridTemplateRows: rows || '1fr'
    };
}
