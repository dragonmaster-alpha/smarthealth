import {rowBackgroundColour} from 'main/application/ThemeConstants';
import * as React from 'react';

/**
 * Layout an element that takes a whole line in the form, such as a section header.
 *
 * @author Larry 4/02/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
interface FormLineLayoutProps
{
    gridColumns: number;
    oddRow: boolean;
}

class FormLineLayout extends React.Component<FormLineLayoutProps>
{
    public render(): React.ReactNode
    {
        return (
            <div style={{
                gridColumnEnd: `span ${this.props.gridColumns}`, backgroundColor: rowBackgroundColour(this.props.oddRow)
            }}>
                {this.props.children}
            </div>
        );
    }
}

export default FormLineLayout;
