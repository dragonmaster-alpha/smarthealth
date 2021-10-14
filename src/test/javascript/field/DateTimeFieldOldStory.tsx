import {storiesOf} from '@storybook/react';
import DateTimeFieldOld from 'main/field/DateTimeFieldOld';
import FieldContext from 'main/field/FieldContext';
import {customFieldRendererAdapter, OnFieldChange} from 'main/form/CustomFieldRenderer';
import FieldValidator from 'main/form/FieldValidator';
import {px} from 'main/utility/StyleUtility';
import React from 'react';
import EntityData from 'smarthealth-javascript/EntityData';
import FieldEditState from 'smarthealth-javascript/FieldEditState';
import FieldState from 'smarthealth-javascript/FieldState';
import FormFieldDateTime from 'smarthealth-javascript/FormFieldDateTime';
import FormFieldTable from 'smarthealth-javascript/FormFieldTable';
import FormFieldType from 'smarthealth-javascript/FormFieldType';
import Locale from 'test/component/Locale';
import FieldTester from 'test/field/FieldTester';

/**
 * Allow debugging of DateTimeFieldOld component
 *
 * @author Larry 27/03/2018
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2018
 */
function renderDateTimeField(field: FormFieldTable, value: any, editing: boolean, disabled: boolean, valid: boolean,
    onFieldChange: OnFieldChange, context: FieldContext, fieldValidator: FieldValidator, data: EntityData,
    fieldState: FieldState): React.ReactNode
{
    return <div style={{ padding: editing ? px(2) : px(8) }}>
        <DateTimeFieldOld context={context} disabled={disabled} editing={editing} field={field}
            fieldState={fieldState} fieldValidator={fieldValidator} onFieldChange={onFieldChange}
            value={value} />
    </div>;
}

storiesOf('Field/DateTimeFieldOld', module)
    .add('precision day', () =>
    {
        const field: FormFieldDateTime = {
            id: 'Date',
            label: 'Date',
            type: FormFieldType.DateTime,
            precisionDay: true
        };
        return (
            <>
                <div className="p-grid">
                    <div className="p-col-1">Locale:</div>
                    <div className="p-col-1"><Locale /></div>
                </div>
                <FieldTester field={field} customFieldRenderer={customFieldRendererAdapter(renderDateTimeField)} />
            </>
        );
    })
    .add('precision month',
        () =>
        {
            const field: FormFieldDateTime = {
                id: 'Date',
                label: 'Date',
                type: FormFieldType.DateTime,
                precisionMonth: true,
                state: { editState: FieldEditState.Enabled }
            };
            return (
                <>
                    <div className="p-grid">
                        <div className="p-col-1">Locale:</div>
                        <div className="p-col-1"><Locale /></div>
                    </div>
                    <FieldTester field={field} customFieldRenderer={customFieldRendererAdapter(renderDateTimeField)} />
                </>
            );
        })
    .add('precision year',
        () =>
        {
            const field: FormFieldDateTime = {
                id: 'Date',
                label: 'Date',
                type: FormFieldType.DateTime,
                precisionYear: true,
                state: { editState: FieldEditState.Enabled }
            };
            return (
                <>
                    <div className="p-grid">
                        <div className="p-col-1">Locale:</div>
                        <div className="p-col-1"><Locale /></div>
                    </div>
                    <FieldTester field={field} customFieldRenderer={customFieldRendererAdapter(renderDateTimeField)} />
                </>
            );
        })
    .add('precision minute',
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
                    <FieldTester field={field} customFieldRenderer={customFieldRendererAdapter(renderDateTimeField)} />
                </>
            );
        })
    .add('precision day, month, year',
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
                    <FieldTester field={field} customFieldRenderer={customFieldRendererAdapter(renderDateTimeField)} />
                </>
            );
        })
    .add('precision day or minute',
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
                    <FieldTester field={field} customFieldRenderer={customFieldRendererAdapter(renderDateTimeField)} />
                </>
            );
        });
