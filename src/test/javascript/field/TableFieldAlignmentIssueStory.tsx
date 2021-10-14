import {storiesOf} from '@storybook/react';
import React from 'react';
import FieldEditState from 'smarthealth-javascript/FieldEditState';
import FieldLabelPosition from 'smarthealth-javascript/FieldLabelPosition';
import FormFieldTable from 'smarthealth-javascript/FormFieldTable';
import FormFieldType from 'smarthealth-javascript/FormFieldType';
import FieldTester from 'test/field/FieldTester';
import {DATE_TIME_DATE, SELECTION_ILLNESS_NAME} from 'test/model/FormFieldMother';

/**
 * Illustrate the 4 cases of a TableField for visualisation and debugging purposes.
 *
 * ISSUE: Table header and table body misalignment with TableField combination, autowidth (not fillWidth) and
 * scrollable (layoutRows).
 *
 * @author Thompson 17/04/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
const tableField: FormFieldTable = {
    columns: [
        SELECTION_ILLNESS_NAME,
        DATE_TIME_DATE
    ],
    id: 'table',
    label: 'Table',
    state: { editState: FieldEditState.Enabled },
    type: FormFieldType.Table,
    layout: {
        labelPosition: FieldLabelPosition.Above
    }
};
const values = [
    { illnessName: 'Aspergillosis, invasive', date: { iso: '2020-01-01' } },
    { illnessName: 'Aspergillosis, invasive', date: { iso: '2020-01-02' } },
    { illnessName: 'Aspergillosis, invasive', date: { iso: '2020-01-03' } }
];
storiesOf('Field/TableFieldOld/Alignment Issue', module)
    .add('autowidth, no alignment issue',
        () =>
        {
            return <FieldTester field={tableField} value={values} />;
        })
    .add('autowidth and scrollable, alignment issue',
        () =>
        {
            const noFillWidthAlignmentIssue: FormFieldTable = {
                ...tableField,
                layout: {
                    ...tableField.layout
                },
                layoutRows: 3
            };
            return (
                <>
                    <FieldTester field={noFillWidthAlignmentIssue} value={values} />
                    <h3>Issues</h3>
                    <ol>
                        <li>When browser window width is resized narrower, the table header and body misalign.</li>
                    </ol>
                </>
            );
        })
    .add('fillWidth, no alignment issue',
        () =>
        {
            const noFillWidthAlignmentIssue: FormFieldTable = {
                ...tableField,
                layout: {
                    ...tableField.layout,
                    fillWidth: true
                }
            };
            return <FieldTester field={noFillWidthAlignmentIssue} value={values} />;
        })
    .add('fillWidth and scrollable, no alignment issue',
        () =>
        {
            const noFillWidthAlignmentIssue: FormFieldTable = {
                ...tableField,
                layout: {
                    ...tableField.layout,
                    fillWidth: true
                },
                layoutRows: 3
            };
            return <FieldTester field={noFillWidthAlignmentIssue} value={values} />;
        });
