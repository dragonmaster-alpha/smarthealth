import {storiesOf} from '@storybook/react';
import React from 'react';
import FieldLabelPosition from 'smarthealth-javascript/FieldLabelPosition';
import FieldLayout from 'smarthealth-javascript/FieldLayout';
import FormField from 'smarthealth-javascript/FormField';
import FormFieldTable from 'smarthealth-javascript/FormFieldTable';
import FullScreen from 'test/container/FullScreen';
import FormFieldLayoutTester from 'test/layout/FormFieldLayoutTester';
import {
    BOOLEAN_INTERPRETER, createFormDescription, FORM_FIELD_MOTHER_DATA, SELECTION_SEX, TABLE_NAME_AND_SEX, TEXT_EMAIL,
    TEXT_NAME
} from 'test/model/FormFieldMother';

/**
 * Tester for fillWidth in FormFieldLayout.tsx
 *
 * @author Thompson 31/05/2019
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2019
 */
const createFillWidthDescription = function (layout: FieldLayout)
{
    const tableField: FormFieldTable = {
        ...TABLE_NAME_AND_SEX,
        layout
    };
    const fields: FormField[] = [
        TEXT_NAME,
        SELECTION_SEX,
        TEXT_EMAIL,
        BOOLEAN_INTERPRETER,
        tableField
    ];
    return createFormDescription(fields);
};
storiesOf('Form/Layout', module)
    .add('fillWidth: Table', () =>
    {
        const description = createFillWidthDescription({
            labelPosition: FieldLabelPosition.Above,
            fillWidth: true,
            newLine: true
        });
        return (
            <FullScreen>
                <FormFieldLayoutTester data={FORM_FIELD_MOTHER_DATA} formDescription={description} />
            </FullScreen>
        );
    })
    .add('fillWidth: Table Span 2', () =>
    {
        const description = createFillWidthDescription({
            labelPosition: FieldLabelPosition.Above,
            fillWidth: true,
            newLine: true,
            span: 2
        });
        return (
            <FullScreen>
                <FormFieldLayoutTester data={FORM_FIELD_MOTHER_DATA} formDescription={description} />
            </FullScreen>
        );
    })
    .add('fillWidth: Table spanLine', () =>
    {
        const description = createFillWidthDescription({
            labelPosition: FieldLabelPosition.Above,
            fillWidth: true,
            newLine: true,
            spanLine: true
        });
        return (
            <FullScreen>
                <FormFieldLayoutTester data={FORM_FIELD_MOTHER_DATA} formDescription={description} />
            </FullScreen>
        );
    });
