import {storiesOf} from '@storybook/react';
import React from 'react';
import FieldEditState from 'smarthealth-javascript/FieldEditState';
import FormFieldDateTime from 'smarthealth-javascript/FormFieldDateTime';
import FormFieldType from 'smarthealth-javascript/FormFieldType';
import FormFieldTypes from 'smarthealth-javascript/FormFieldTypes';
import Locale from 'test/component/Locale';
import FieldTester from 'test/field/FieldTester';
import {fieldUsagePredicate} from 'test/field/FieldUsageUtility';

/**
 * Allow debugging of DateTimeField component
 *
 * @author Larry 27/03/2018
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2018
 */
storiesOf('Field/DateTimeField', module)
    .add('Precision day',
        () =>
        {
            const field: FormFieldDateTime = {
                id: 'Date',
                label: 'Date',
                type: FormFieldType.DateTime,
                precisionDay: true,
                state: { editState: FieldEditState.Enabled }
            };
            return (
                <>
                    <div className="p-grid">
                        <div className="p-col-1">Locale:</div>
                        <div className="p-col-1"><Locale /></div>
                    </div>
                    <FieldTester field={field} />
                </>
            );
        })
    .add('Precision month',
        () =>
        {
            const field: FormFieldDateTime = {
                id: 'Date',
                label: 'Date',
                type: FormFieldType.DateTime,
                precisionMonth: true,
                state: { editState: FieldEditState.Enabled }
            };
            // TODO add knobs for initialised value
            return (
                <>
                    <div className="p-grid">
                        <div className="p-col-1">Locale:</div>
                        <div className="p-col-1"><Locale /></div>
                    </div>
                    <FieldTester field={field} />
                </>
            );
        })
    .add('Precision year',
        () =>
        {
            const field: FormFieldDateTime = {
                id: 'Date',
                label: 'Date',
                type: FormFieldType.DateTime,
                precisionYear: true,
                state: { editState: FieldEditState.Enabled }
            };
            // TODO add knobs for initialised value
            return (
                <>
                    <div className="p-grid">
                        <div className="p-col-1">Locale:</div>
                        <div className="p-col-1"><Locale /></div>
                    </div>
                    <FieldTester field={field} />
                </>
            );
        })
    .add('Precision minute',
        () =>
        {
            const field: FormFieldDateTime = {
                id: 'Date',
                label: 'Date',
                type: FormFieldType.DateTime,
                precisionMinute: true,
                state: { editState: FieldEditState.Enabled }
            };
            return (
                <>
                    <div className="p-grid">
                        <div className="p-col-1">Locale:</div>
                        <div className="p-col-1"><Locale /></div>
                    </div>
                    <FieldTester field={field} />
                </>
            );
        })
    .add('Precision day, month, year',
        () =>
        {
            const field: FormFieldDateTime = {
                id: 'Date',
                label: 'Date',
                type: FormFieldType.DateTime,
                precisionDay: true,
                precisionMonth: true,
                precisionYear: true,
                state: { editState: FieldEditState.Enabled }
            };
            return (
                <>
                    <div className="p-grid">
                        <div className="p-col-1">Locale:</div>
                        <div className="p-col-1"><Locale /></div>
                    </div>
                    <FieldTester field={field} />
                </>
            );
        })
    .add('Precision day or minute',
        () =>
        {
            const field: FormFieldDateTime = {
                id: 'Date',
                label: 'Date',
                type: FormFieldType.DateTime,
                precisionDay: true,
                precisionMinute: true,
                state: { editState: FieldEditState.Enabled }
            };
            return (
                <>
                    <div className="p-grid">
                        <div className="p-col-1">Locale:</div>
                        <div className="p-col-1"><Locale /></div>
                    </div>
                    <FieldTester field={field} />
                </>
            );
        })
    .add('Usage: Precision minute', () => fieldUsagePredicate('Field DateTime, precision minute',
        field => FormFieldTypes.isDateTime(field) && field.precisionMinute))
    .add('Usage: Precision day', () => fieldUsagePredicate('Field DateTime, precision day',
        field => FormFieldTypes.isDateTime(field) && field.precisionDay))
    .add('Usage: Precision month', () => fieldUsagePredicate('Field DateTime, precision month',
        field => FormFieldTypes.isDateTime(field) && field.precisionMonth))
    .add('Usage: Precision year', () => fieldUsagePredicate('Field DateTime, precision year',
        field => FormFieldTypes.isDateTime(field) && field.precisionYear));
