import {InputText} from 'primereact/inputtext';
import React from 'react';

/**
 * Render the label and filter input in MedicalGroupSelectionTable.tsx and MemberselectionTable.tsx with styles
 *
 * @author Thompson 17/12/2019
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2019
 */
interface SelectionTableFilterInputProps
{
    id: string;
    label: string;
    onChange: (event) => void;
    value: string;
}

class SelectionTableFilterInput extends React.Component<SelectionTableFilterInputProps>
{
    public render()
    {
        return (
            <div className="cp-selectionTableFilterInput">
                <label className="cp-selectionTableFilterInput-label">{this.props.label}</label>
                <InputText className="cp-selectionTableFilterInput-input" id={this.props.id}
                    onChange={this.props.onChange} value={this.props.value} />
            </div>
        );
    }
}

export default SelectionTableFilterInput;
