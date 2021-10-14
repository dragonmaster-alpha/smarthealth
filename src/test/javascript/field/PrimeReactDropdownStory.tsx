import {storiesOf} from '@storybook/react';
import {Dropdown} from 'primereact/dropdown';
import React from 'react';
import './PrimeReactDropdownStory.scss';

/**
 * Allow for debugging of PrimeReact Dropdown element
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

storiesOf('PrimeReact/Dropdown', module)
    .add('Working Dropdown',
        () =>
        {
            return (
                <>
                    <Dropdown value="NY" options={citySelectItems} onChange={(e) =>
                    {
                    }} placeholder="Select a City" />
                    <h3>Description</h3>
                    <ol>
                        <li>
                            Demonstrate what a working Dropdown should look like to be compared with "Dropdown inside
                            overflow: auto div" story.
                        </li>
                    </ol>
                </>
            );
        })
    .add('Dropdown inside overflow: auto div',
        () =>
        {
            return (
                <>
                    <div style={{ overflow: 'auto', height: '2ex' }}>
                        <Dropdown panelClassName="PrimeReactDropdownStory-itemsWrapper" value="NY"
                            options={citySelectItems}
                            onChange={(e) =>
                            {
                            }} placeholder="Select a City" />
                    </div>
                    <h3>Description</h3>
                    <ol>
                        <li>Demonstrate current issues with PrimeReact.</li>
                    </ol>
                    <h3>Usage</h3>
                    <ol>
                        <li>Select the dropdown to reveal the dropdown options.</li>
                        <li>Scroll on the dropdown to reveal the hidden dropdown options.</li>
                    </ol>
                    <h3>Issues</h3>
                    <ol>
                        <li>Dropdown options are hidden under div containment.</li>
                    </ol>
                </>
            );
        });
