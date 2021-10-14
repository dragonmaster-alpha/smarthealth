import {css} from '@emotion/core';
import {autobind} from 'core-decorators';
import FieldContext from 'main/field/FieldContext';
import TableFieldOld from 'main/field/TableFieldOld';
import {customFieldRendererAdapter, OnFieldChange} from 'main/form/CustomFieldRenderer';
import FieldValidator from 'main/form/FieldValidator';
import FormComponent from 'main/form/FormComponent';
import FormContext from 'main/form/FormContext';
import {SummaryPanelProps} from 'main/summary/SummaryPanel';
import {observable} from 'mobx';
import {inject, observer} from 'mobx-react';
import {Button} from 'primereact/button';
import React from 'react';
import FormField from 'smarthealth-javascript/FormField';
import FormFieldTable from 'smarthealth-javascript/FormFieldTable';
import Program from 'smarthealth-javascript/Program';
import ServiceRecordCategory from 'smarthealth-javascript/ServiceRecordCategory';
import ServiceType from 'smarthealth-javascript/ServiceType';

/**
 * Render Haemodialysis summary with custom fields
 *
 * @author Thompson 16/01/2020
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
class HaemodialysisSummaryPanel extends React.Component<SummaryPanelProps>
{
    @observable
    private readonly formContext: FormContext<any>;

    constructor(props)
    {
        super(props);

        const customFields = {
            Haemodialysis: customFieldRendererAdapter(this.renderHaemodialysisField)
        };
        this.formContext = FormContext.build(props.appStore, props.formDescription, customFields);
    }

    // @autobind
    // private doHaemodialysisRowDoubleClick()
    // {
    //     this.openServiceRecord();
    // }

    @autobind
    private onClickCreateNewHaemodialysisService()
    {
        const serviceType: ServiceType = {
            abbreviation: 'Haemodialysis',
            category: ServiceRecordCategory.ProcedureNote,
            formDescriptionID: 'Renal.Haemodialysis',
            name: 'Haemodialysis',
            program: Program.RENAL_DISEASE,
            serviceTypeID: 58,
            supportDraft: true
        };
        this.props.appStore.actionStore.createNewService(serviceType);
    }

    public render()
    {
        return <FormComponent context={this.formContext} data={this.props.data} />;
    }

    @autobind
    private renderHaemodialysisField(field: FormField, value: any, editing: boolean, disabled: boolean, valid: boolean,
        onFieldChange: OnFieldChange, context: FieldContext, fieldValidator: FieldValidator, data): React.ReactNode
    {
        return (
            <>
                <TableFieldOld context={context as FieldContext<FormFieldTable>} field={field as FormFieldTable}
                    fieldValidator={fieldValidator} onFieldChange={onFieldChange} value={value}
                    // doRowDoubleClick={this.doHaemodialysisRowDoubleClick}
                />
                <div css={buttonsStyle} className="p-col-12">
                    <Button label="Add" onClick={this.onClickCreateNewHaemodialysisService} />
                </div>
            </>
        );
    }
}

export default HaemodialysisSummaryPanel;
