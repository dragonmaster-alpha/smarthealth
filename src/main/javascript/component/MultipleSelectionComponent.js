import MultipleFieldSelectionLabel from 'main/component/MultipleSelectionFieldLabel';
import {Dropdown} from 'primereact/dropdown';
import React from 'react';

/**
 *
 * WARNING!!!
 * This depends on the internal structure of the parent class in PrimeReact and may break with upgrades
 *
 * TODO potential re-implement this field to make multiple and editable work
 * TODO when clicking "X" on chip to removing it. The click action invokes the dropdown as if we are clicking the
 * dropdown arrow.
 *
 * @author Thompson 30/04/2019
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2019
 */
class MultipleSelectionComponent extends Dropdown
{
    renderFilter()
    {
        if (this.props.editable)
        {
            return (
                <div className="p-dropdown-filter-container">
                    <input type="text" autoComplete="off" className="p-dropdown-filter p-inputtext p-component"
                        placeholder={this.props.filterPlaceholder} onKeyDown={this.onFilterInputKeyDown}
                        onChange={this.onFilterInputChange}
                        // ref expended like this to avoid lint error
                        ref={(el) =>
                        {
                            this.filterInput = el;
                        }} />
                    <span className="p-dropdown-filter-icon pi pi-search" />
                </div>
            );
        }
        else
        {
            return null;
        }
    }

    renderLabel()
    {
        let { value } = this.props;
        if (!this.props.value || this.props.value.length === 0)
        {
            value = [];
        }
        return (
            <MultipleFieldSelectionLabel className="cp-multipleselectionfield-label"
                onValueChange={(value) => this.props.onChange({target: { value }})} readOnly={this.props.readOnly}
                value={value} />
        );
    }
}

export default MultipleSelectionComponent;
