import {storiesOf} from '@storybook/react';
import React from 'react';
import FieldLabelPosition from 'smarthealth-javascript/FieldLabelPosition';
import FormField from 'smarthealth-javascript/FormField';
import FormFieldText from 'smarthealth-javascript/FormFieldText';
import FullScreen from 'test/container/FullScreen';
import FormFieldLayoutTester from 'test/layout/FormFieldLayoutTester';
import {FORM_DESCRIPTION_DATA} from 'test/model/FormDescriptionMother';
import {
    BOOLEAN_INTERPRETER, createFormDescription, DATE_OF_BIRTH, SELECTION_SEX, TEXT_EMAIL, TEXT_NAME, TEXT_SUMMARY
} from 'test/model/FormFieldMother';

/**
 * Tester for FormFieldLayout.tsx layout.labelPosition.Above
 *
 * @author Thompson 29/05/2019
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2019
 */

function createLabelFormDescription(labelPosition: FieldLabelPosition)
{
    const textAreaField: FormFieldText = {
        ...TEXT_SUMMARY,
        layout: {
            labelPosition,
            fillHeight: true,
            newLine: true,
            spanLine: true
        }
    };
    const fields: FormField[] = [
        TEXT_NAME,
        SELECTION_SEX,
        DATE_OF_BIRTH,
        TEXT_EMAIL,
        BOOLEAN_INTERPRETER,
        textAreaField
    ];
    return createFormDescription(fields);
}

storiesOf('Form/Layout', module)
    .add('Label Position: Above', () =>
    {
        return (
            <FullScreen>
                <FormFieldLayoutTester formDescription={createLabelFormDescription(FieldLabelPosition.Above)}
                    data={FORM_DESCRIPTION_DATA} />
            </FullScreen>
        );
    })
    .add('Label Position: Before', () =>
    {
        return (
            <FullScreen>
                <FormFieldLayoutTester formDescription={createLabelFormDescription(FieldLabelPosition.Before)}
                    data={FORM_DESCRIPTION_DATA} />
            </FullScreen>
        );
    })
    .add('Label Position: Before Top', () =>
    {
        return (
            <FullScreen>
                <FormFieldLayoutTester formDescription={createLabelFormDescription(FieldLabelPosition.BeforeTop)}
                    data={FORM_DESCRIPTION_DATA} />
            </FullScreen>
        );
    })
    .add('Label Position: Omit', () =>
    {
        return (
            <FullScreen>
                <FormFieldLayoutTester formDescription={createLabelFormDescription(FieldLabelPosition.Omit)}
                    data={FORM_DESCRIPTION_DATA} />
            </FullScreen>
        );
    });
