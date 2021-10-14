import {storiesOf} from '@storybook/react';
import RowspanTable, {RowspanCell, RowspanColumn} from 'main/component/RowspanTable';
import React from 'react';

/**
 * Allow debugging of RowspanTableStory.tsx
 *
 * @author Thompson 23/07/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
const columns: RowspanColumn[] = [
    {
        Header: 'Test',
        accessor: 'test',
        groupRows: true,
        Cell: (cell) => (cell.value && cell.value.value)
    },
    {
        Header: 'Result',
        accessor: 'result',
        Cell: (cell) => (cell.value && cell.value.value)
    },
    {
        Header: 'Units',
        accessor: 'units',
        disableSortBy: true,
        Cell: (cell) => (cell.value && cell.value.value)
    },
    {
        Header: 'Range',
        accessor: 'range',
        disableSortBy: true,
        Cell: (cell) => (cell.value && cell.value.value)
    }
];
storiesOf('Component/RowspanTable', module)
    .add('Empty',
        () =>
        {
            return (
                <RowspanTable columns={columns} cells={[]} />
            );
        })
    .add('With data',
        () =>
        {
            const cells: RowspanCell[][] = [
                [{ value: 'HIV', rowSpan: 2 }, { value: 'CD4 Count' }, { value: 'mg' }, { value: '123' }],
                [{ value: 'HIV' }, { value: 'Viral Load' }, { value: null }, { value: '456' }],
                [{ value: 'Sweat Test', rowSpan: 1 }, { value: 'Sodium result' }, { value: 'mmol/L' }, { value: null }],
                [{ value: 'TFT', rowSpan: 3 }, { value: 'TSH' }, { value: 'mIU/L' }, { value: '0.40-4.80' }],
                [{ value: 'TFT' }, { value: 'Free T4"' }, { value: 'pmol/L' }, { value: '8.0-16.0' }],
                [{ value: 'TFT' }, { value: 'More Information' }, { value: null }, { value: null }]
            ];
            return (
                <RowspanTable columns={columns} cells={cells} />
            );
        });
