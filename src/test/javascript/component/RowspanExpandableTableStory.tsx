import {storiesOf} from '@storybook/react';
import RowspanExpandableTable from 'main/component/RowspanExpandableTable';
import {RowspanColumn} from 'main/component/RowspanTable';
import React from 'react';

/**
 * Allow debugging of RowspanExpandableTable.tsx
 *
 *  TODO fix RowspanExpandableTable.tsx with new RowspanTable implementation
 *
 * @author Thompson 23/07/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
const columns: RowspanColumn[] = [
    {
        Header: 'Test',
        accessor: 'test',
        groupRows: true
    },
    {
        Header: 'Result',
        accessor: 'result'
    },
    {
        Header: '20/01/2020',
        accessor: 'value',
        disableSortBy: true
    },
    {
        Header: 'Units',
        accessor: 'units',
        disableSortBy: true
    },
    {
        Header: 'Range',
        accessor: 'range',
        disableSortBy: true
    }
];
storiesOf('Component/RowspanExpandableTable', module)
    .add('groupRows undefined error',
        () =>
        {
            return (
                <RowspanExpandableTable columns={[{
                    Header: 'Test',
                    accessor: 'test'
                }, {
                    Header: 'Result',
                    accessor: 'result'
                }]} data={[]} />
            );
        })
    .add('Empty data',
        () =>
        {
            return (
                <RowspanExpandableTable columns={columns} data={[]} />
            );
        })
    .add('With data',
        () =>
        {
            return (
                <RowspanExpandableTable columns={columns} data={[
                    {
                        test: 'Coag Screen',
                        rowspanRowData: [
                            { result: 'Prothrombin Time', value: 12, units: 's', range: '11-15' },
                            { result: 'INR', value: 0.9 },
                            { result: 'APTT', value: 33, units: 's', range: '25-35' }]
                    },
                    {
                        test: 'HIV',
                        rowspanRowData: [
                            { result: 'CD4 Count', value: 9, units: 'mg', range: '32' },
                            { result: 'Viral Load', value: 39 }]
                    },
                    {
                        test: 'AFP',
                        rowspanRowData: [
                            { result: 'AFP (Beckman)', value: '2.1', units: 'ug/L', range: '0.0-9.0' },
                            { result: 'More Information', value: 'see report' }]
                    },
                    {
                        test: 'LFT',
                        rowspanRowData: [
                            { result: 'Total protein', value: 36, units: 'g/L', range: '60-80' },
                            { result: 'Albumin', value: 33, units: 'ug/L', range: '33-48' },
                            { result: 'Bilirubin total', value: 6, units: 'umol/L', range: '0-20' },
                            { result: 'Alkaline phosphate', value: 77, units: 'U/L', range: '30-110' },
                            { result: 'ALT', value: 105, units: 'U/L', range: '0-40' }]
                    }
                ]} />
            );
        });
