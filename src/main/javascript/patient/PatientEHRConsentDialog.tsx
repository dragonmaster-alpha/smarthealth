import {autobind} from 'core-decorators';
import ErrorBoundary from 'main/component/ErrorBoundary';
import TermsAndConditionsLink from 'main/component/TermsAndConditionsLink';

import DateTimeFieldOld from 'main/field/DateTimeFieldOld';
import SimpleFieldContext from 'main/field/SimpleFieldContext';
import FieldValidator from 'main/form/FieldValidator';
import FormContext from 'main/form/FormContext';
import AppStore from 'main/store/AppStore';
import {action, observable} from 'mobx';
import {inject, observer} from 'mobx-react';
import {Button} from 'primereact/button';
import {Dialog} from 'primereact/dialog';
import React from 'react';
import FieldEditState from 'smarthealth-javascript/FieldEditState';
import FormDescription from 'smarthealth-javascript/FormDescription';
import FormField from 'smarthealth-javascript/FormField';
import FormFieldType from 'smarthealth-javascript/FormFieldType';
import Patient from 'smarthealth-javascript/Patient';

/**
 * Display Patient EHR Consent Dialog
 *
 * TODO create a form description
 *
 * @author Thompson 1/10/2019
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2019
 */
interface PatientEHRConsentDialogProps
{
    appStore?: AppStore;
    data: Patient;
}

@inject('appStore')
@observer
class PatientEHRConsentDialog extends React.Component<PatientEHRConsentDialogProps>
{
    @observable
    private consentDate = this.props.appStore.dateTime.today();

    private readonly dialogTitle: string = 'Consent to Participate in EHR';

    private fieldValidator: FieldValidator = new FieldValidator(this.props.appStore.i18nStore);

    private formDescription: FormDescription = {
        fieldsAndSections: [{
            field: {
                id: 'consentDateTime',
                label: 'Consent Date',
                precisionDay: true,
                type: FormFieldType.DateTime,
                state: { editState: FieldEditState.Enabled }
            }
        }], layoutColumns: 1
    };

    @autobind
    private onAgreeTermsAndConditions()
    {
        const patientWithConsent: Patient = {
            ...this.props.data,
            ehrConsentDate: this.consentDate
        };
        const success = this.props.appStore.handlers.patientHandler.updatePatientDemographics(patientWithConsent);
        if (success)
        {
            this.onCancel();
        }
    }

    @autobind
    private onCancel()
    {
        this.props.appStore.componentStore.modalDialog.close();
    }

    @action.bound
    private onFieldChange(value: any, field: FormField)
    {
        this.consentDate = value;
    }

    public render()
    {
        const footerButtons = (
            <div>
                <Button label="OK" onClick={this.onAgreeTermsAndConditions} />
                <Button label="Cancel" onClick={this.onCancel} />
            </div>
        );

        const formContext = FormContext.build(this.props.appStore, this.formDescription);
        const fieldContext = SimpleFieldContext.buildFromID(formContext, 'consentDateTime');
        return (
            <Dialog className="cp-patientEHRConsentDialog" footer={footerButtons} header={this.dialogTitle}
                onHide={this.onCancel} visible={true}>
                <p>
                    The patient agrees to participate in this multi-practice, cross-sector electronic health record
                    program. Only the patient can choose which practices have access to the patient's health records.:
                </p>
                <TermsAndConditionsLink />
                <div>
                    Consent Date
                    <span>
                        <ErrorBoundary message="Error in DateTimeField">
                            <DateTimeFieldOld context={fieldContext} editing={true}
                                field={this.formDescription.fieldsAndSections[0].field}
                                fieldValidator={this.fieldValidator} onFieldChange={this.onFieldChange}
                                value={this.consentDate} />
                        </ErrorBoundary>
                    </span>
                </div>
            </Dialog>
        );
    }
}

export default PatientEHRConsentDialog;
