import {storiesOf} from '@storybook/react';
import React from 'react';
import FieldLabelPosition from 'smarthealth-javascript/FieldLabelPosition';
import FormField from 'smarthealth-javascript/FormField';
import FormFieldText from 'smarthealth-javascript/FormFieldText';
import FullScreen from 'test/container/FullScreen';
import FormFieldLayoutTester from 'test/layout/FormFieldLayoutTester';
import {
    BOOLEAN_INTERPRETER, createFormDescription, DATE_TIME_DATE, FORM_FIELD_MOTHER_DATA, SELECTION_SEX, TEXT_EMAIL,
    TEXT_NAME, TEXT_SUMMARY
} from 'test/model/FormFieldMother';

/**
 * Tester for FillHeight and FillWidth combined
 *
 * @author Thompson 7/02/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
storiesOf('Form/Layout', module)
    .add('fillHeight fillWidth: Text Area', () =>
    {
        const textAreaField: FormFieldText = {
            ...TEXT_SUMMARY,
            layout: {
                labelPosition: FieldLabelPosition.Above,
                fillHeight: true,
                fillWidth: true,
                newLine: true,
                spanLine: true
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
        const description = createFormDescription(fields);
        const data = {
            ...FORM_FIELD_MOTHER_DATA,
            summary: 'The first fair-minded fox is, in its own way, a pomegranate; The fig is a banana? ' +
                'In recent years, a sedate orange without wolfs is truly a crocodile of good snakes. ' +
                'A zebra is the lion of a frog! ' +
                'It\'s an undeniable fact, really; few can name a successful wolf that isn\'t a gregarious cheetah. ' +
                'Far from the truth, the diligent tiger comes from an impartial duck. ' +
                'To be more specific, the kangaroo is a goat. Those bananas are nothing more than raspberries.'
        };
        return (
            <FullScreen>
                <FormFieldLayoutTester data={data} formDescription={description} />
            </FullScreen>
        );
    });
