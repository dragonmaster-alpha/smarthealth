import {storiesOf} from '@storybook/react';
import React from 'react';
import FieldLabelPosition from 'smarthealth-javascript/FieldLabelPosition';
import FormDescription from 'smarthealth-javascript/FormDescription';
import FormField from 'smarthealth-javascript/FormField';
import FormFieldTable from 'smarthealth-javascript/FormFieldTable';
import FormFieldText from 'smarthealth-javascript/FormFieldText';
import FullScreen from 'test/container/FullScreen';
import FormTester from 'test/form/FormTester';
import {
    BOOLEAN_INTERPRETER, createFormDescription, DATE_TIME_DATE, FORM_FIELD_MOTHER_DATA, SELECTION_SEX,
    TABLE_NAME_AND_SEX, TEXT_EMAIL, TEXT_NAME, TEXT_SUMMARY
} from 'test/model/FormFieldMother';

/**
 * Tester for FillHeight in FormFieldLayout.tsx
 *
 * @author Thompson 28/05/2019
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2019
 */
// TODO use <FormFieldLayoutTester/>
storiesOf('Form/Layout', module)
    .add('fillHeight: Table', () =>
    {
        // TODO need to make table fillHeight, PrimeReact Table may not have capability
        const tableField: FormFieldTable = {
            ...TABLE_NAME_AND_SEX,
            layout: {
                labelPosition: FieldLabelPosition.Above,
                fillHeight: true,
                newLine: true
            }
        };
        const fields: FormField[] = [
            TEXT_NAME,
            SELECTION_SEX,
            DATE_TIME_DATE,
            TEXT_EMAIL,
            BOOLEAN_INTERPRETER,
            tableField
        ];
        const fillHeightTable = createFormDescription(fields);

        return (
            <FullScreen>
                <FormTester data={FORM_FIELD_MOTHER_DATA} formDescription={{
                    ...fillHeightTable,
                    layoutColumns: 2
                } as FormDescription} readOnly={false} />
                <div>
                    <h3>TODO</h3>
                    <ol>
                        <li>Make form take 100% height so the Names and Email table field can fillHeight.</li>
                    </ol>
                </div>
            </FullScreen>
        );
    })
    .add('fillHeight: TextArea', () =>
    {
        const textAreaField: FormFieldText = {
            ...TEXT_SUMMARY,
            layout: {
                labelPosition: FieldLabelPosition.Above,
                fillHeight: true,
                newLine: true
            }
        };
        const fields: FormField[] = [
            TEXT_NAME,
            SELECTION_SEX,
            DATE_TIME_DATE,
            TEXT_EMAIL,
            BOOLEAN_INTERPRETER,
            textAreaField
        ];
        const fillHeightTextArea = createFormDescription(fields);

        const data = {
            ...FORM_FIELD_MOTHER_DATA,
            summary: 'The camels could be said to resemble lively kangaroos. ' +
                'The zeitgeist contends that few can name a fearless pear that isn\'t a bright watermelon. ' +
                'However, a hamster of the fish is assumed to be a punctual pomegranate? ' +
                'Few can name a selective peach that isn\'t a sedate kumquat. ' +
                'It\'s very tricky, if not impossible, ' +
                'an orange can hardly be considered an excellent deer without also being a monkey.'
        };
        return (
            <FullScreen>
                <FormTester data={data} formDescription={{
                    ...fillHeightTextArea,
                    layoutColumns: 2
                } as FormDescription} readOnly={false} />
                <div>
                    <h3>TODO</h3>
                    <ol>
                        <li>Make form take 100% height so the Summary field can fillHeight.</li>
                    </ol>
                </div>
            </FullScreen>
        );
    });
