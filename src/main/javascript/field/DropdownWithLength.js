/* eslint-disable arrow-parens,no-unused-vars,react/jsx-wrap-multilines,no-return-assign,react/jsx-closing-tag-location,max-len,prefer-const,jsx-a11y/label-has-for,react/forbid-prop-types */
import classNames from 'classnames';
import {Dropdown} from 'primereact/dropdown';
import PropTypes from 'prop-types';
import React from 'react';

/**
 * Dropdown with value max length. Overrides code in the PrimeReact library.
 *
 * @author Thompson 12/04/2019
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2019
 */
class DropdownWithLength extends Dropdown
{
    static defaultProps = {
        id: null,
        value: null,
        options: null,
        optionLabel: null,
        itemTemplate: null,
        style: null,
        className: null,
        scrollHeight: '200px',
        filter: false,
        filterPlaceholder: null,
        editable: false,
        placeholder: null,
        required: false,
        disabled: false,
        appendTo: null,
        tabIndex: null,
        autoFocus: false,
        panelClassName: null,
        panelStyle: null,
        dataKey: null,
        inputId: null,
        showClear: false,
        tooltip: null,
        tooltipOptions: null,
        onChange: null,
        onMouseDown: null,
        onContextMenu: null,
        maxLength: null
    };

    static propTypes = {
        id: PropTypes.string,
        value: PropTypes.any,
        options: PropTypes.array,
        optionLabel: PropTypes.string,
        itemTemplate: PropTypes.func,
        style: PropTypes.object,
        className: PropTypes.string,
        scrollHeight: PropTypes.string,
        filter: PropTypes.bool,
        filterPlaceholder: PropTypes.string,
        editable: PropTypes.bool,
        placeholder: PropTypes.string,
        required: PropTypes.bool,
        disabled: PropTypes.bool,
        appendTo: PropTypes.any,
        tabIndex: PropTypes.number,
        autoFocus: PropTypes.bool,
        lazy: PropTypes.bool,
        panelClassName: PropTypes.string,
        panelstyle: PropTypes.object,
        dataKey: PropTypes.string,
        inputId: PropTypes.string,
        showClear: PropTypes.bool,
        tooltip: PropTypes.string,
        tooltipOptions: PropTypes.object,
        onChange: PropTypes.func,
        onMouseDown: PropTypes.func,
        onContextMenu: PropTypes.func,
        maxLength: PropTypes.number
    };

    renderLabel(label)
    {
        if (this.props.editable)
        {
            let value = label || this.props.value || '';

            return <input ref={(el) => this.editableInput = el} type="text" defaultValue={value}
                className="p-dropdown-label p-inputtext" disabled={this.props.disabled}
                placeholder={this.props.placeholder}
                onClick={this.onEditableInputClick} onInput={this.onEditableInputChange}
                onFocus={this.onEditableInputFocus} onBlur={this.onInputBlur} maxLength={this.props.maxLength} />;
        }
        else
        {
            let className = classNames('p-dropdown-label p-inputtext', {
                'p-placeholder': label === null && this.props.placeholder,
                'p-dropdown-label-empty': label === null && !this.props.placeholder && !this.props.value
            });

            return <label
                className={className}>{label || this.props.value || this.props.placeholder || 'empty'}</label>;
        }
    }
}

export default DropdownWithLength;
