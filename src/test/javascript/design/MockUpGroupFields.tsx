import React from 'react';

/**
 * Combine multiple fields into a form grid cell with vertical center alignments.
 *
 * @author Thompson 7/10/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
class MockUpGroupFields extends React.Component
{
    public render()
    {
        return (
            <div style={{
                display: 'flex',
                alignItems: 'center'
            }}>
                {this.props.children}
            </div>
        );
    }
}

export default MockUpGroupFields;
