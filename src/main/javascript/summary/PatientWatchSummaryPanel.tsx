import {css} from '@emotion/core';
import {autobind} from 'core-decorators';
import FieldContext from 'main/field/FieldContext';
import {customFieldRendererAdapter, OnFieldChange} from 'main/form/CustomFieldRenderer';
import FieldValidator from 'main/form/FieldValidator';
import FormComponent from 'main/form/FormComponent';
import FormContext from 'main/form/FormContext';
import {SummaryPanelProps} from 'main/summary/SummaryPanel';
import DateUtility from 'main/utility/DateUtility';
import {inject, observer} from 'mobx-react';
import {Button} from 'primereact/button';
import React from 'react';
import FormField from 'smarthealth-javascript/FormField';
import Program from 'smarthealth-javascript/Program';
import ServiceRecordCategory from 'smarthealth-javascript/ServiceRecordCategory';
import ServiceType from 'smarthealth-javascript/ServiceType';

/**
 * Render Patient Watch Summary with custom fields.
 *
 * @author Thompson 21/01/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
const buttonsStyle = css({
    textAlign: 'center',
    '.p-button': {
        margin: '0 0.5em'
    }
});

@inject('appStore')
@observer
class PatientWatchSummaryPanel extends React.Component<SummaryPanelProps>
{
    private readonly formContext: FormContext;

    constructor(props)
    {
        super(props);

        const customFields = {
            NextCall: customFieldRendererAdapter(this.renderNextCallField)
        };
        this.formContext = FormContext.build(props.appStore, props.formDescription, customFields);
    }

    @autobind
    private onClickCreateQuestionnaires()
    {
        const serviceType: ServiceType = {
            abbreviation: 'PW Questionnaire',
            category: ServiceRecordCategory.Assessment,
            formDescriptionID: 'PatientWatch.Questionnaire',
            name: 'Patient Watch Questionnaire',
            program: Program.PATIENT_WATCH,
            serviceTypeID: 204,
            supportDraft: true
        };
        this.props.appStore.actionStore.createNewService(serviceType);
    }

    public render()
    {
        return (
            <>
                <FormComponent context={this.formContext} data={this.props.data} />
                <div css={buttonsStyle} className="p-col-12">
                    {/*
                        TODO Initiate Call button is enabled when the field in the summary data CallsAllowed is true
                        and the user has Create Questionnaire permission.
                    */}
                    <Button className="p-button-secondary" label="Initiate Call"
                        onClick={this.onClickCreateQuestionnaires} />
                </div>
            </>
        );
    }

    @autobind
    private renderNextCallField(field: FormField, value: any, editing: boolean, disabled: boolean,
        valid: boolean, onFieldChange: OnFieldChange, context: FieldContext, fieldValidator: FieldValidator,
        data): React.ReactNode
    {
        const nextCallDate = data[field.id]
            ? DateUtility.formatEventDateTime(data[field.id], this.props.appStore.i18nStore.locale)
            : null;
        const callWindowTime = data.CallWindow;

        return <span>{nextCallDate} {callWindowTime}</span>;
    }
}

export default PatientWatchSummaryPanel;
