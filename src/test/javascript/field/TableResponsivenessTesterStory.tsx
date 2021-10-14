import {storiesOf} from '@storybook/react';
import classNames from 'classnames';
import {Button} from 'primereact/button';
import {InputTextarea} from 'primereact/inputtextarea';
import React, {CSSProperties} from 'react';

/**
 * Tester for Table column responsiveness
 *
 * @author Thompson 19/02/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */

export const renderMedicalGroupField = (value: string = 'Mr Stuart angus', styles: CSSProperties = { width: '20em' }) =>
{
    // responsive style to copy and paste: { width: '100%', maxWidth: '20em' }
    return (
        <div className={classNames('p-inputgroup')}>
            <div style={styles}>
                {value}
            </div>
            <Button icon="pi pi-chevron-down" />
        </div>
    );
};

export const renderTextField = (value: string = 'General Practice', styles: CSSProperties = { width: '22em' }) =>
{
    // responsive style to copy and paste: { width: '100%', maxWidth: '22em' }
    return (
        <input className="p-inputtext p-component p-filled" style={styles} value={value} />
    );
};

export const renderSelectionField = (value: string = 'New York', styles: CSSProperties = { width: '10em' }) =>
{
    // responsive style to copy and paste: { width: '100%', maxWidth: '10em', minWidth: 0 }
    return (
        <div className="p-dropdown p-component" style={styles}>
            <div className="p-hidden-accessible">
                <input type="text" role="listbox" />
            </div>
            <div className="p-hidden-accessible p-dropdown-hidden-select">
                <select tabIndex={-1} aria-hidden="true">
                    <option value=""></option>
                    <option value="NY">New York</option>
                </select>
            </div>
            <label className="p-dropdown-label p-inputtext">{value}</label>
            <div className="p-dropdown-trigger">
                <span className="p-dropdown-trigger-icon pi pi-chevron-down p-clickable">
                </span>
            </div>
        </div>
    );
};

export const renderDateTimeField = (value: Date = new Date(), styles: CSSProperties = { width: '9em' }) =>
{
    // - 2.5em because 2.5em is the button width
    // style to copy and paste: { maxWidth: '9em', width: 'calc(100% - 2.5em)' }
    return (
        <span className="p-calendar p-calendar-w-btn p-inputwrapper-filled">
            <input type="text" className="p-inputtext p-component p-inputtext p-component p-filled" style={styles}
                autoComplete="off" value="02/20/2020" />
                <button type="button" tabIndex={-1}
                    className="p-button p-component p-datepicker-trigger p-calendar-button p-button-icon-only">
                    <span className="pi pi-calendar p-c p-button-icon-left"></span>
                    <span className="p-button-text p-c">p-btn</span>
                </button>
        </span>
    );
};

export const renderTextAreaField = (value: string = 'General Practitioner') =>
{
    return (
        <InputTextarea style={{ width: '100%' }} value={value} />
    );
};

storiesOf('HTML/Table Responsiveness', module)
    .add('standard', () =>
    {
        return (
            <div style={{ margin: '40px 0 0 0' }}>
                <h2>Resize window width</h2>
                <div className="p-datatable p-component" style={{ paddingBottom: '5ex' }}>
                    <div className="p-datatable-wrapper">
                        <table>
                            <thead className="p-datatable-thead">
                            <tr>
                                <th style={{ width: '30%' }}>
                                    <span className="p-column-title">Name</span>
                                </th>
                                <th style={{ width: '30%' }}>
                                    <span className="p-column-title">Role</span>
                                </th>
                                <th style={{ width: '25%' }}>
                                    <span className="p-column-title">City</span>
                                </th>
                                <th style={{ width: '15%' }}>
                                    <span className="p-column-title">Date</span>
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>
                                    {renderMedicalGroupField()}
                                </td>
                                <td>
                                    {renderTextField()}
                                </td>
                                <td>
                                    {renderSelectionField()}
                                </td>
                                <td>
                                    {renderDateTimeField()}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Field: width: '20em'<br />
                                    Col: 30%
                                </td>
                                <td>
                                    Field: width: '22em'<br />
                                    Col: 30%
                                </td>
                                <td>
                                    Field: width: '10em'<br />
                                    Col: 25%
                                </td>
                                <td>
                                    Field: width: '9em'<br />
                                    Col: 15%
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    })
    .add('minWidth columns and fields with width: 100% and maxWidth: (input width)em',
        () =>
        {
            const minColumnMedicalGroupWidth = '15em';
            const minColumnTextWidth = '15em';
            const minColumnSelectionWidth = '10em';
            const minColumnDateTimeWidth = '9em';

            return (
                <div style={{ margin: '40px 0 0 0' }}>
                    <h2>Resize window width</h2>
                    <div className="p-datatable p-component" style={{ paddingBottom: '5ex' }}>
                        <div className="p-datatable-wrapper">
                            <table>
                                <thead className="p-datatable-thead">
                                <tr>
                                    <th style={{ width: minColumnMedicalGroupWidth }}>
                                        <span className="p-column-title">Name</span>
                                    </th>
                                    <th style={{ width: minColumnTextWidth }}>
                                        <span className="p-column-title">Role</span>
                                    </th>
                                    <th style={{ width: minColumnSelectionWidth }}>
                                        <span className="p-column-title">City</span>
                                    </th>
                                    <th style={{ width: minColumnDateTimeWidth }}>
                                        <span className="p-column-title">Date</span>
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>
                                        {renderMedicalGroupField(undefined, { width: '100%', maxWidth: '20em' })}
                                    </td>
                                    <td>
                                        {renderTextField(undefined, { width: '100%', maxWidth: '22em' })}
                                    </td>
                                    <td>
                                        {renderSelectionField(undefined,
                                            { width: '100%', maxWidth: '10em', minWidth: 0 })}
                                    </td>
                                    <td>
                                        {renderDateTimeField(undefined,
                                            { maxWidth: '9em', width: 'calc(100% - 2.5em)' })}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Field: width: '100%', maxWidth: '20em'<br />
                                        Col: 15em
                                    </td>
                                    <td>
                                        Field: width: '100%', maxWidth: '22em'<br />
                                        Col: 15em
                                    </td>
                                    <td>
                                        Field: width: '100%', maxWidth: '10em', minWidth: 0<br />
                                        Col: 10em
                                    </td>
                                    <td>
                                        Field: maxWidth: '9em', width: 'calc(100% - 2.5em)'<br />
                                        Col: 9em
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            );
        })
    .add('Long Summary cell wrap',
        () =>
        {
            const minColumnMedicalGroupWidth = '15em';
            const minColumnTextWidth = '15em';
            const minColumnSelectionWidth = '10em';
            const minColumnDateTimeWidth = '9em';

            return (
                <div style={{ margin: '40px 0 0 0' }}>
                    <h2>Resize window width</h2>
                    <div className="p-datatable p-component">
                        <div className="p-datatable-wrapper">
                            <table>
                                <thead className="p-datatable-thead">
                                <tr>
                                    <th style={{ width: minColumnMedicalGroupWidth }}>
                                        <span className="p-column-title">Name</span>
                                    </th>
                                    <th style={{ width: minColumnTextWidth }}>
                                        <span className="p-column-title">Role</span>
                                    </th>
                                    <th style={{ width: minColumnSelectionWidth }}>
                                        <span className="p-column-title">Summary</span>
                                    </th>
                                    <th style={{ width: minColumnDateTimeWidth }}>
                                        <span className="p-column-title">Date</span>
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>
                                        {renderMedicalGroupField(undefined, { width: '100%', maxWidth: '20em' })}
                                    </td>
                                    <td>
                                        {renderTextField(undefined, { width: '100%', maxWidth: '22em' })}
                                    </td>
                                    <td>
                                        <span className="ct-formfieldcomponent-view">
                                            <span style={{ whiteSpace: 'pre-wrap' }}>
                                                Referring Provider: Mr Larry Singer @ St Vincent's Hospital,
                                                Darlinghurst, Referral Target: SydPath Pathology, Darlinghurst
                                            </span>
                                        </span>
                                    </td>
                                    <td>
                                        {renderDateTimeField(undefined,
                                            { maxWidth: '9em', width: 'calc(100% - 2.5em)' })}
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            );
        })
    .add('row1: max-width, row2: no max-width',
        () =>
        {
            return (
                <div style={{ margin: '40px 0 0 0' }}>
                    <h2>Resize window width</h2>
                    <div className="p-datatable p-component" style={{ paddingBottom: '5ex' }}>
                        <div className="p-datatable-wrapper">
                            <table>
                                <thead className="p-datatable-thead">
                                <tr>
                                    <th>
                                        <span className="p-column-title">Name</span>
                                    </th>
                                    <th>
                                        <span className="p-column-title">Role</span>
                                    </th>
                                    <th>
                                        <span className="p-column-title">City</span>
                                    </th>
                                    <th>
                                        <span className="p-column-title">Date</span>
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>
                                        {renderMedicalGroupField(undefined,
                                            { width: '100%', maxWidth: '20em', minWidth: '10em' })}
                                    </td>
                                    <td>
                                        {renderTextField(undefined,
                                            { width: '100%', maxWidth: '22em', minWidth: '11em' })}
                                    </td>
                                    <td>
                                        {renderSelectionField(undefined,
                                            { width: '100%', maxWidth: '10em', minWidth: '5em' })}
                                    </td>
                                    <td>
                                        {renderDateTimeField(undefined,
                                            { width: 'calc(100% - 2.5em)', maxWidth: '9em', minWidth: '4.5em' })}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        {renderMedicalGroupField(undefined,
                                            { width: '100%', minWidth: '10em' })}
                                    </td>
                                    <td>
                                        {renderTextField(undefined,
                                            { width: '100%', minWidth: '11em' })}
                                    </td>
                                    <td>
                                        {renderSelectionField(undefined,
                                            { width: '100%', minWidth: '5em' })}
                                    </td>
                                    <td>
                                        {renderDateTimeField(undefined,
                                            { width: 'calc(100% - 2.5em)', minWidth: '4.5em' })}
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            );
        })
    .add('row1: max-width, row2: no max-width with Column width = minWidth',
        () =>
        {

            const minColumnMedicalGroupWidth = '13em';
            const minColumnTextWidth = '13em';
            const minColumnSelectionWidth = '7em';
            const minColumnDateTimeWidth = '8em';

            return (
                <div style={{ margin: '40px 0 0 0' }}>
                    <h2>Resize window width</h2>
                    <div className="p-datatable p-component" style={{ paddingBottom: '5ex' }}>
                        <div className="p-datatable-wrapper">
                            <table>
                                <thead className="p-datatable-thead">
                                <tr>
                                    <th style={{ width: minColumnMedicalGroupWidth }}>
                                        <span className="p-column-title">Name</span>
                                    </th>
                                    <th style={{ width: minColumnTextWidth }}>
                                        <span className="p-column-title">Role</span>
                                    </th>
                                    <th style={{ width: minColumnSelectionWidth }}>
                                        <span className="p-column-title">City</span>
                                    </th>
                                    <th style={{ width: minColumnDateTimeWidth }}>
                                        <span className="p-column-title">Date</span>
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>
                                        {renderMedicalGroupField(undefined,
                                            { width: '100%', maxWidth: '20em', minWidth: '10em' })}
                                    </td>
                                    <td>
                                        {renderTextField(undefined,
                                            { width: '100%', maxWidth: '22em', minWidth: '11em' })}
                                    </td>
                                    <td>
                                        {renderSelectionField(undefined,
                                            { width: '100%', maxWidth: '10em', minWidth: '5em' })}
                                    </td>
                                    <td>
                                        {renderDateTimeField(undefined,
                                            { width: 'calc(100% - 2.5em)', maxWidth: '9em', minWidth: '4.5em' })}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        {renderMedicalGroupField(undefined,
                                            { width: '100%', minWidth: '10em' })}
                                    </td>
                                    <td>
                                        {renderTextField(undefined,
                                            { width: '100%', minWidth: '11em' })}
                                    </td>
                                    <td>
                                        {renderSelectionField(undefined,
                                            { width: '100%', minWidth: '5em' })}
                                    </td>
                                    <td>
                                        {renderDateTimeField(undefined,
                                            { width: 'calc(100% - 2.5em)', minWidth: '4.5em' })}
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            );
        });
