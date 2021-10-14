import {css} from '@emotion/core';
import {storiesOf} from '@storybook/react';
import {background, dropdownBoxShadow, field} from 'main/application/ThemeConstants';
import FieldContext from 'main/field/FieldContext';
import DropdownFieldComponent from 'main/fieldcomponent/DropdownFieldComponent';
import InputFieldComponent from 'main/fieldcomponent/InputFieldComponent';
import {OnFieldChange} from 'main/form/CustomFieldRenderer';
import FieldContextUtility from 'main/utility/FieldContextUtility';
import {px} from 'main/utility/StyleUtility';
import React from 'react';
import FormFieldSelection from 'smarthealth-javascript/FormFieldSelection';
import FormFieldType from 'smarthealth-javascript/FormFieldType';
import FieldTester from 'test/field/FieldTester';

/**
 * Story for InputWithDropdown
 *
 * @author Larry 22/12/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
const overlayStyle = css({
    ...field.hover,
    backgroundColor: background.white,
    borderRadius: field.borderRadius,
    boxShadow: dropdownBoxShadow,
    padding: px(8)
});

function createRenderer(editable: boolean, maxLength: number)
{
    return function (context: FieldContext, value: any, data: any, onFieldChange: OnFieldChange): React.ReactNode
    {
        const formField = context.field;
        const { editing } = context.formContext;
        if (editing)
        {
            function renderContent(ref: React.RefObject<any>, onFocus: (focus: boolean) => void): React.ReactNode
            {
                return <InputFieldComponent context={context} editable={editable} maxLength={maxLength}
                    onFocus={onFocus} onValueChange={value => onFieldChange(value, formField)}
                    ref={editable ? ref : null} value={value} />;
            }

            function renderOverlay(onExit: () => void): React.ReactNode
            {
                return <div css={overlayStyle}>Overlay goes here</div>;
            }

            const valid = FieldContextUtility.isValid(context, value);

            return (
                <DropdownFieldComponent context={context} renderContent={renderContent} renderOverlay={renderOverlay}
                    valid={valid} />
            );
        }
        else
        {
            return <div style={{ padding: px(8) }}>Not supported</div>;
        }
    };
}

storiesOf('FieldComponent/DropdownFieldComponent', module)
    .add('Standard', () =>
    {
        const field: FormFieldSelection = {
            id: 'field',
            label: 'Field',
            type: FormFieldType.Selection,
            options: ['Yes', 'No', 'Maybe'],
            size: 5
        };
        return <FieldTester field={field} customFieldRenderer={createRenderer(false, field.size)} />;
    })
    .add('Standard, initialised', () =>
    {
        const field: FormFieldSelection = {
            id: 'field',
            label: 'Field',
            type: FormFieldType.Selection,
            options: ['Yes', 'No', 'Maybe'],
            size: 5
        };
        return <FieldTester field={field} value={'Yes'} customFieldRenderer={createRenderer(false, field.size)} />;
    })
    .add('Editable', () =>
    {
        const field: FormFieldSelection = {
            id: 'field',
            label: 'Field',
            type: FormFieldType.Selection,
            editable: true,
            options: ['ACT', 'NSW', 'NT', 'QLD', 'SA', 'Tas', 'Vic', 'WA'],
            size: 5
        };
        return <FieldTester field={field} customFieldRenderer={createRenderer(true, field.size)} />;
    })
    .add('Tool tip', () =>
    {
        const field: FormFieldSelection = {
            id: 'field',
            label: 'Field',
            type: FormFieldType.Selection,
            options: ['Yes', 'No', 'Maybe'],
            size: 5,
            toolTip: 'This is the tool tip for the field component.'
        };
        return <FieldTester field={field} customFieldRenderer={createRenderer(false, field.size)} />;
    });
