import {background, colour} from 'main/application/ThemeConstants';
import React from 'react';

/**
 * Display label or field cell with row guide background and padding style used for CSS grid.
 *
 * NOTE:
 * - There does not seem to be any clean solutions for row guide background in CSS grid other then applying it for each
 * cell.
 *
 * Solutions tried:
 *      ~ using CSS selector nth() to select cell (won't work because there is no consistent column layout in form
 *              e.g. a row can have labels and fields with default span of span 1 or a field that spanLine).
 *      ~ wrapping all the cells belonging to a row (didn't work because labels and fields couldn't align in their
 *              respective column).
 *
 * @author Thompson 1/10/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
interface MockUpGridCellProps
{
    children: React.ReactNode;
    rowGuideBackground: boolean;
}

class MockUpGridCell extends React.Component<MockUpGridCellProps>
{
    public render()
    {
        return (
            <div style={{
                backgroundColor: this.props.rowGuideBackground ? background.gridRow : colour.white,
                height: '100%',
                padding: '4px 0px 4px 8px'
            }}>
                {this.props.children}
            </div>
        );
    }
}

export default MockUpGridCell;
