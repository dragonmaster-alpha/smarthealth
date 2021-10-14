import React from 'react';

/**
 * Arrow down with no background and border button used with custom dropdown fields. Where there border of the parent
 * container will wrap this button.
 *
 * This button allows for our custom dropdown buttons to have consistent presentation with PrimeReact dropdown buttons.
 *
 * @author Thompson 11/09/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
interface FieldDropdownButtonProps
{
    onClick: (event) => void;
}

class FieldDropdownButton extends React.Component<FieldDropdownButtonProps>
{
    public render()
    {
        return (
            <div className="cp-FieldDropdownButton" role="button" onClick={this.props.onClick}>
                <span className="p-dropdown-trigger-icon pi pi-chevron-down p-clickable"></span>
            </div>
        );
    }
}

export default FieldDropdownButton;
