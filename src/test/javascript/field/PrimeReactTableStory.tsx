import {storiesOf} from '@storybook/react';
import {Calendar} from 'primereact/calendar';
import {Column} from 'primereact/column';
import {DataTable} from 'primereact/datatable';
import {Dropdown} from 'primereact/dropdown';
import React from 'react';

/**
 * Allow for debugging of PrimeReact DataTable element
 *
 * @author Thompson 31/03/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
const citySelectItems = [
    { label: 'New York', value: 'NY' },
    { label: 'Rome', value: 'RM' },
    { label: 'London', value: 'LDN' },
    { label: 'Istanbul', value: 'IST' },
    { label: 'Paris', value: 'PRS' }
];
const values = [{ city: 'NY', date: new Date() }, { city: 'PRS', date: new Date() }];
storiesOf('PrimeReact/Table', module)
    .add('Visible Dropdown options',
        () =>
        {
            // no LayoutRows
            return (
                <>
                    <DataTable value={values}>
                        <Column header="city"
                            body={(rowData) => <Dropdown value={rowData.city} options={citySelectItems} onChange={(e) =>
                            {
                            }} placeholder="Select a City" />} />
                        <Column header="date" body={(rowData) => <Calendar value={rowData.date} />} />
                    </DataTable>
                    <h3>Description</h3>
                    <ol>
                        <li>
                            Demonstrate what a working Dropdown should look like in a table to be compared with "Hidden
                            dropdown issue" story.
                        </li>
                    </ol>
                </>
            );
        })
    .add('Hidden dropdown issue',
        () =>
        {
            // layoutRows
            return (
                <>
                    <DataTable value={values} scrollable={true} scrollHeight="10ex">
                        <Column header="city"
                            body={() => <Dropdown options={citySelectItems} onChange={(e) =>
                            {
                            }} placeholder="Select a City" />} />
                        <Column header="date" body={(rowData) => <Calendar value={rowData.date} />} />
                    </DataTable>
                    <h3>Description</h3>
                    <ol>
                        <li>Demonstrate current issues with PrimeReact.</li>
                    </ol>
                    <h3>Usage</h3>
                    <ol>
                        <li>Select the dropdown or calendar to reveal the options picker.</li>
                        <li>Scroll on the table body to reveal the hidden options picker.</li>
                    </ol>
                    <h3>Issues</h3>
                    <ol>
                        <li>Dropdown and calendar options are hidden under table body containment.</li>
                    </ol>
                </>
            );
        })
    .add('appendTo solution',
        () =>
        {
            return (
                <>
                    <DataTable value={values} scrollable={true} scrollHeight="10ex">
                        <Column header="city"
                            body={() => <Dropdown appendTo={document.body} options={citySelectItems} onChange={(e) =>
                            {
                            }} placeholder="Select a City" />} />
                        <Column header="date"
                            body={(rowData) => <Calendar appendTo={document.body} value={rowData.date} />} />
                    </DataTable>
                    <h3>Issues</h3>
                    <ol>
                        <li>
                            Dropdown and calendar options appear out of table body containment. However, the options do
                            not follow the field when table body is scrolled.
                        </li>
                    </ol>
                </>
            );
        });
