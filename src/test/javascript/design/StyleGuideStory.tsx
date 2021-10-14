import {css} from '@emotion/core';
import {storiesOf} from '@storybook/react';
import {background, colour, field, font} from 'main/application/ThemeConstants';
import FieldContext from 'main/field/FieldContext';
import FormContext from 'main/form/FormContext';
import {borderStyle} from 'main/utility/BorderUtility';
import {grid, px} from 'main/utility/StyleUtility';
import React from 'react';
import FieldEditState from 'smarthealth-javascript/FieldEditState';

/**
 * Capture basic styles for the application from the Digital Garden Style Guide
 *
 * @author Larry 21/09/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */

// tslint:disable-next-line:variable-name
const ColourBlock: React.FC<{ colour: string; name: string; }> = (props) =>
{
    return (
        <div style={{ textAlign: 'center' }}>
            <div style={{
                height: '100px', width: '100px', borderRadius: '20px', backgroundColor: props.colour
            }}>
            </div>
            <div>{props.name}</div>
            <div>{props.colour}</div>
        </div>
    );
};

storiesOf('Design/Style Guide', module)
    .add('Colours', () =>
    {
        return (
            <div style={{
                display: 'grid', gridTemplateColumns: '150px 150px 150px 150px 150px 150px', justifyItems: 'center',
                rowGap: '20px'
            }}>
                {Object.keys(colour)
                    .map((name) => <ColourBlock key={name} colour={colour[name]} name={name} />)}
            </div>
        );
    })
    .add('Backgrounds', () =>
    {
        return (
            <div style={{
                display: 'grid', gridTemplateColumns: '150px 150px 150px 150px 150px 150px', justifyItems: 'center',
                rowGap: '20px'
            }}>
                {Object.keys(background)
                    .map((name) => <ColourBlock key={name} colour={background[name]} name={name} />)}
            </div>
        );
    })
    .add('Text', () =>
    {
        return (
            <>
                {Object.keys(font)
                    .map((name) => <div key={name} style={{ font: font[name] }}>{name}: {font[name]}</div>)}
            </>
        );
    })
    .add('Fields', () =>
    {
        const formContext: FormContext = {
            editing: true, fieldStates: { readOnly: { editState: FieldEditState.ReadOnly } }, fieldValidator: null,
            formDescription: undefined, formDescriptionID: '', validateIncludeMandatory: false
        };
        const context: FieldContext = { formContext, field: null, id: 'field' };
        const contextReadOnly: FieldContext = { formContext, field: null, id: 'readOnly' };

        const formStyle = css({
            ...grid('auto 1fr'),
            '>div:nth-of-type(4n+3), div:nth-of-type(4n+4)': {
                backgroundColor: background.gridRow
            }
        });

        const labelStyle = css({
            color: colour.label,
            font: font.label,
            padding: px(field.viewPaddingHeightPx, field.viewPaddingWidthPx, field.viewPaddingHeightPx, 16),
            textAlign: 'right'
        });

        const fieldStyle = css({
            color: colour.text,
            display: 'inline-block',
            font: font.text,
            margin: px(field.marginHeightPx, 0),
            padding: px(field.paddingHeightPx, field.viewPaddingWidthPx)
        });

        const fieldViewStyle = css({
            color: colour.text,
            display: 'inline-block',
            font: font.text,
            padding: px(field.viewPaddingHeightPx, field.viewPaddingWidthPx)
        });

        return (
            <div css={formStyle}>
                <div css={labelStyle}>Default:</div>
                <div>
                    <div css={[fieldStyle, borderStyle(context, true, false)]}>Value</div>
                </div>
                <div css={labelStyle}>Focus:</div>
                <div>
                    <div css={[fieldStyle, borderStyle(context, true, true)]}>Value</div>
                </div>
                <div css={labelStyle}>Error:</div>
                <div>
                    <div css={[fieldStyle, borderStyle(context, false, false)]}>Value</div>
                </div>
                <div css={labelStyle}>Error, Focus:</div>
                <div>
                    <div css={[fieldStyle, borderStyle(context, false, true)]}>Value</div>
                </div>
                <div css={labelStyle}>Placeholder:</div>
                <div>
                    <div css={[fieldStyle, borderStyle(context, true, false)]}
                        style={{ color: colour.placeholder }}>Required
                    </div>
                </div>
                <div css={labelStyle}>Read only:</div>
                <div>
                    <div css={[fieldStyle, borderStyle(contextReadOnly, true, false)]}
                        style={{ color: colour.disabled }}>Value
                    </div>
                </div>
                <div css={labelStyle}>View:</div>
                <div>
                    <div css={fieldViewStyle}>Value</div>
                </div>
                <div css={labelStyle}>Note:</div>
                <div>
                    <div css={fieldViewStyle}>
                        :hover is implemented for the above fields. :focus should take precedence over :hover.
                    </div>
                </div>
            </div>
        );
    });
