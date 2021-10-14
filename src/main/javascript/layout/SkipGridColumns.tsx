import {rowBackgroundColour} from 'main/application/ThemeConstants';
import React from 'react';

/**
 * Skip a number of columns in the grid
 *
 * @author Larry 4/02/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
interface SkipGridColumnProps
{
    columns: number;
    oddRow: boolean;
}

class SkipGridColumns extends React.Component<SkipGridColumnProps>
{
    public render(): React.ReactNode
    {
        if (!this.props.columns)
        {
            return null;
        }

        return <div style={{
            backgroundColor: rowBackgroundColour(this.props.oddRow),
            gridColumnEnd: `span ${this.props.columns}`
        }} />;
    }
}

export default SkipGridColumns;
