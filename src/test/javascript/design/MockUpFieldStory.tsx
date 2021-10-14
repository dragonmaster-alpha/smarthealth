import {storiesOf} from '@storybook/react';
import React from 'react';
import FormDescription from 'smarthealth-javascript/FormDescription';
import FormFieldType from 'smarthealth-javascript/FormFieldType';
import FullScreen from 'test/container/FullScreen';
import MockUpForm from 'test/design/MockUpForm';

/**
 * Translation of Digital Garden mockups into simple HTML
 *
 * @author Larry 21/09/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
storiesOf('Design/Mockups/Fields', module)
    .add('DateTimeField', () =>
    {
        const form: FormDescription = {
            layoutColumns: 1,
            fieldsAndSections: [
                {
                    field: {
                        label: 'Year Precision',
                        id: 'yearField',
                        type: FormFieldType.DateTime,
                        precisionYear: true
                    }
                },
                {
                    field: {
                        label: 'Month Precision',
                        id: 'monthField',
                        type: FormFieldType.DateTime,
                        precisionMonth: true
                    }
                },
                {
                    field: {
                        label: 'Day Precision',
                        id: 'dayField',
                        type: FormFieldType.DateTime,
                        precisionDay: true
                    }
                },
                {
                    field: {
                        label: 'Minute Precision (Option 1)',
                        id: 'minuteFieldOption1',
                        type: FormFieldType.DateTime,
                        precisionMinute: true
                    }
                },
                {
                    field: {
                        label: 'Minute Precision (Option 2)',
                        id: 'minuteFieldOption2',
                        type: FormFieldType.DateTime,
                        precisionMinute: true,
                        // TODO temporary property to allow for easy switching of the minute overlay mock-up in
                        // MockUpDateTimeField.tsx
                        // @ts-ignore
                        minuteOption: 2
                    }
                },
                {
                    field: {
                        label: 'Minute Precision (Option 3)',
                        id: 'minuteFieldOption3',
                        type: FormFieldType.DateTime,
                        precisionMinute: true,
                        // TODO temporary property to allow for easy switching of the minute overlay mock-up in
                        // MockUpDateTimeField.tsx
                        // @ts-ignore
                        minuteOption: 3
                    }
                },
                {
                    field: {
                        label: 'Minute Precision (Option 4)',
                        id: 'minuteFieldOption4',
                        type: FormFieldType.DateTime,
                        precisionMinute: true,
                        // TODO temporary property to allow for easy switching of the minute overlay mock-up in
                        // MockUpDateTimeField.tsx
                        // @ts-ignore
                        minuteOption: 4
                    }
                },
                {
                    field: {
                        label: 'Minute Precision (Option 5)',
                        id: 'minuteFieldOption5',
                        type: FormFieldType.DateTime,
                        precisionMinute: true,
                        // TODO temporary property to allow for easy switching of the minute overlay mock-up in
                        // MockUpDateTimeField.tsx
                        // @ts-ignore
                        minuteOption: 5
                    }
                }
            ]
        };
        const data = {};
        return (
            <FullScreen>
                <MockUpForm form={form} data={data} editing={true} />
            </FullScreen>
        );
    });
