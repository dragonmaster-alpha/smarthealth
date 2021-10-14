import {css} from '@emotion/core';
import {action as storybookAction} from '@storybook/addon-actions';
import {autobind} from 'core-decorators';
import lodash from 'lodash';
import {background, colour, field, font} from 'main/application/ThemeConstants';
import Button from 'main/component/Button';
import ErrorBoundary from 'main/component/ErrorBoundary';
import FieldFactory from 'main/field/FieldFactory';
import SimpleFieldContext from 'main/field/SimpleFieldContext';
import {CustomFieldRenderer} from 'main/form/CustomFieldRenderer';
import FormContext from 'main/form/FormContext';
import AppStore from 'main/store/AppStore';
import FormDataUtility from 'main/utility/FormDataUtility';
import {grid, px} from 'main/utility/StyleUtility';
import {action, observable} from 'mobx';
import {inject, observer} from 'mobx-react';
import React from 'react';
import EntityData from 'smarthealth-javascript/EntityData';
import FieldEditState from 'smarthealth-javascript/FieldEditState';
import FieldState from 'smarthealth-javascript/FieldState';
import FormDescription from 'smarthealth-javascript/FormDescription';
import FormField from 'smarthealth-javascript/FormField';

/**
 * Component to test form fields and implement field change actions
 *
 * @author Larry 27/02/2019
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2019
 */
interface FieldTesterProps
{
    appStore?: AppStore;
    customFieldRenderer?: CustomFieldRenderer<EntityData>;
    data?: any;
    field: FormField;
    // temporary property being used during migration of fields
    useOld?: boolean;
    value?: any;
}

const gridStyle = css({
    ...grid('auto auto 1fr')
});

const labelStyle = css({
    color: colour.label,
    font: font.label,
    padding: px(field.viewPaddingHeightPx, 8)
});

const fieldStyle = css({
    color: colour.text,
    font: font.text
});

const dataStyle = css({
    color: colour.text,
    font: font.text,
    padding: px(field.viewPaddingHeightPx, 8)
});

@inject('appStore')
@observer
class FieldTester extends React.Component<FieldTesterProps>
{
    @observable
    private readonly data: any;

    constructor(props)
    {
        super(props);

        this.data = this.props.data || {};
        // We need to use onFieldChange to set our valid properties.
        this.onFieldChange(this.props.value || null, this.props.field);
    }

    @autobind
    private onClear()
    {
        this.onFieldChange(null, this.props.field);
    }

    @action.bound
    private onFieldChange(value, field: FormField)
    {
        storybookAction('onFieldChange')(value, field);
        FormDataUtility.set(this.data, field, value);
    }

    public render()
    {
        const { field } = this.props;
        return (
            <div css={gridStyle}>
                <div css={labelStyle}>Edit:</div>
                <div css={labelStyle}>{field.label}:</div>
                <div css={fieldStyle}>
                    {this.renderField(true, false, { editState: FieldEditState.Enabled })}
                </div>

                <div css={labelStyle} style={{ backgroundColor: background.gridRow }}>Mandatory:</div>
                <div css={labelStyle} style={{ backgroundColor: background.gridRow }}>{field.label}:</div>
                <div css={fieldStyle} style={{ backgroundColor: background.gridRow }}>
                    {this.renderField(true, false, { editState: FieldEditState.Mandatory })}
                </div>

                <div css={labelStyle}>Mandatory (validated):</div>
                <div css={labelStyle}>{field.label}:</div>
                <div css={fieldStyle}>
                    {this.renderField(true, true, { editState: FieldEditState.Mandatory })}
                </div>

                <div css={labelStyle} style={{ backgroundColor: background.gridRow }}>Read Only:</div>
                <div css={labelStyle} style={{ backgroundColor: background.gridRow }}>{field.label}:</div>
                <div css={fieldStyle} style={{ backgroundColor: background.gridRow }}>
                    {this.renderField(true, false, { editState: FieldEditState.ReadOnly })}
                </div>

                <div css={labelStyle}>View:</div>
                <div css={labelStyle}>{field.label}:</div>
                <div css={fieldStyle}>
                    {this.renderField(false, false, { editState: FieldEditState.Enabled })}
                </div>

                {this.renderDataOrValue()}
            </div>
        );
    }

    private renderDataOrValue()
    {
        if (lodash.isNil(this.props.data))
        {
            return (
                <>
                    <div css={labelStyle} style={{ backgroundColor: background.gridRow }}>Value:</div>
                    <div css={labelStyle} style={{ backgroundColor: background.gridRow }} />
                    <div css={dataStyle} style={{ backgroundColor: background.gridRow }}>
                        {JSON.stringify(FormDataUtility.get(this.data, this.props.field))}
                    </div>
                    <div style={{ padding: '8px' }}><Button title="Clear" onClick={this.onClear} small={true} /></div>
                </>
            );
        }
        else
        {
            return (
                <>
                    <div css={labelStyle} style={{ backgroundColor: background.gridRow }}>Data:</div>
                    <div css={labelStyle} style={{ backgroundColor: background.gridRow }} />
                    <div css={dataStyle} style={{ backgroundColor: background.gridRow }}>
                        {JSON.stringify(this.data)}
                    </div>
                </>
            );
        }
    }

    private renderField(editing: boolean, validateIncludeMandatory: boolean, fieldState: FieldState)
    {
        const field = { ...this.props.field, state: fieldState };
        const formDescription: FormDescription = {
            fieldsAndSections: [{ field }],
            layoutColumns: 1
        };

        const formContext = FormContext.build(this.props.appStore, formDescription);
        formContext.editing = editing;
        formContext.validateIncludeMandatory = validateIncludeMandatory;
        if (this.props.customFieldRenderer)
        {
            formContext.customFields = { [field.id]: this.props.customFieldRenderer };
        }
        const context = SimpleFieldContext.build(formContext, field);

        return (
            <ErrorBoundary>
                <FieldFactory context={context} onFieldChange={this.onFieldChange} data={this.data}
                    useOld={this.props.useOld} />
            </ErrorBoundary>
        );
    }
}

export default FieldTester;
