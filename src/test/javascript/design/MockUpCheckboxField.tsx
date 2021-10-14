import {colour, field, font} from 'main/application/ThemeConstants';
import React from 'react';

/**
 * Checkbox field with Edit and View mode.
 *
 * @author Thompson 5/10/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
interface MockUpCheckboxProps
{
    editing: boolean;
    value: boolean;
}

class MockUpCheckboxField extends React.Component<MockUpCheckboxProps>
{
    public render()
    {
        if (this.props.editing)
        {
            return (
                <div style={{
                    alignItems: 'center', display: 'flex', height: '100%'
                }}>
                    <div style={{
                        alignItems: 'center', backgroundColor: colour.white,
                        border: this.props.value ? 'solid 1px #003ade' : field.border, borderRadius: '2px',
                        display: 'flex', font: font.text, height: '20px', justifyContent: 'center', width: '20px'
                    }}>
                        {this.props.value
                        && <span className={'shicon sh-tick'} style={{
                            color: colour.primary2a, fontSize: '8.5px', height: '10px', width: '14px'
                        }} />}
                    </div>
                </div>
            );
        }

        return (
            <span style={{
                alignItems: 'center', color: colour.text, display: 'flex', font: font.text, height: '32px',
                padding: '0 8px'
            }}>
                {this.props.value ? 'Yes' : 'No'}
            </span>
        );
    }
}

export default MockUpCheckboxField;
