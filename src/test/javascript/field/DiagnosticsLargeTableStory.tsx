import {storiesOf} from '@storybook/react';
import {Column} from 'primereact/column';
import {DataTable} from 'primereact/datatable';
import React from 'react';

/**
 * Allow test implementation of a smaller Diagnostics Table in Advanced Liver Disease Assessment
 *
 * @author Thompson 15/04/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
// Text Field maxLength values for columns
// name=50
// value=50
// units=50
// range=50
const data = [{
    name: '1234567890 1234567890',
    date: '',
    value: '1234567890 1234567890',
    units: '1234567890 1234567890',
    range: '1234567890 1234567890'
}];

storiesOf('Field/Custom/Advanced Liver Disease Assessment Diagnostics table', module)
    .add('original large table (fillWidth)',
        () =>
        {
            return (
                <div>
                    <DataTable value={data}>
                        <Column field="name" header="Name" style={{ width: '10em' }} />
                        <Column field="date" header="Date" style={{ width: '13.1em' }} />
                        <Column field="value" header="Value" style={{ width: '22em' }} />
                        <Column field="units" header="Units" style={{ width: '22em' }} />
                        <Column field="range" header="Range" style={{ width: '22em' }} />
                    </DataTable>
                </div>
            );
        })
    .add('table without fillWidth',
        () =>
        {
            return (
                <div>
                    <DataTable value={data} tableStyle={{ width: 'auto' }} style={{ display: 'inline-block' }}>
                        <Column field="name" header="Name" style={{ width: '10em' }} />
                        <Column field="date" header="Date" style={{ width: '13.1em' }} />
                        <Column field="value" header="Value" style={{ width: '22em' }} />
                        <Column field="units" header="Units" style={{ width: '22em' }} />
                        <Column field="range" header="Range" style={{ width: '22em' }} />
                    </DataTable>
                </div>
            );
        });
