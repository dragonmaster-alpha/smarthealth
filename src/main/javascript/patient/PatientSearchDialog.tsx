import {autobind} from 'core-decorators';
import lodash from 'lodash';
import DialogIcons from 'main/dialog/DialogIcons';
import OKDialog from 'main/dialog/OKDialog';
import StoreProps from 'main/store/StoreProps';
import FormDescriptionUtility from 'main/utility/FormDescriptionUtility';
import {modalWait} from 'main/wait/WaitModalComponent';
import {action, observable, toJS} from 'mobx';
import {inject, observer} from 'mobx-react';
import {Button} from 'primereact/button';
import {Checkbox} from 'primereact/checkbox';
import {Dialog} from 'primereact/dialog';
import {Dropdown} from 'primereact/dropdown';
import {InputText} from 'primereact/inputtext';
import {ListBox} from 'primereact/listbox';
import React from 'react';
import FormDescription from 'smarthealth-javascript/FormDescription';
import PatientSearchTarget from 'smarthealth-javascript/PatientSearchTarget';
import PatientSummary from 'smarthealth-javascript/PatientSummary';

/**
 * Patient Search Dialog
 *
 * TODO rewrite without state and moving results out of sessionStore
 *
 * Note: Form Description is only used a bit. It should be used for the whole form.
 *
 * @author Uditha 26/02/2018
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2018
 */
interface PatientSearchDialogProps extends StoreProps
{
    formDescription: FormDescription;
    showSettingPurpose?: boolean;
}

interface PatientSearchDialogState
{
    familyNamePrefix: string;
    givenNamePrefix: string;
    includeDeceased: boolean;
    mrn: string;
    purpose: string;
    selectedPatient: any;
    setting: string;
}

@inject('sessionStore', 'handlers', 'appStore', 'componentStore')
@observer
class PatientSearchDialog extends React.Component<PatientSearchDialogProps, PatientSearchDialogState>
{
    public static defaultProps = {
        showSettingPurpose: true
    };

    @observable
    private patientSearchResults;

    constructor(props)
    {
        super(props);
        this.state = {
            familyNamePrefix: '',
            givenNamePrefix: '',
            mrn: '',
            includeDeceased: false,
            selectedPatient: null,
            setting: props.sessionStore.setting,
            purpose: props.sessionStore.purpose
        };
    }

    private checkValidInput()
    {
        if (this.containsValidInput())
        {
            return true;
        }
        else
        {
            this.props.componentStore.modalDialog.show(<OKDialog icon={DialogIcons.error}
                message="Please complete the search criteria. Either MRN or Family name must be specified."
                header="Patient Search" />);
            return false;
        }
    }

    private containsValidInput()
    {
        if (!lodash.isEmpty(this.state.mrn))
        {
            this.setState({ familyNamePrefix: '', givenNamePrefix: '' });
            return true;
        }

        return !lodash.isEmpty(this.state.familyNamePrefix);
    }

    @action.bound
    private formatSearchResults(patientResults: PatientSummary[])
    {
        const results = patientResults.map(patient => ({
            label: `${patient.name.familyName}, ${patient.name.givenName},
                ${this.props.appStore.i18nStore.formatEventDateTime(patient.dateOfBirth)}`,
            value: patient
        }));
        return results;
    }

    @autobind
    private onCancel()
    {
        this.props.componentStore.modalDialog.close();
    }

    @autobind
    private onOpenPatient()
    {
        // TODO can't open patient from PAS because they don't have a Smart Health id
        // - need to take note of the source of the patient details and call the appropriate method
        const { selectedPatient } = this.state;
        if (selectedPatient)
        {
            const { handlers, sessionStore } = this.props;
            const { purpose, setting } = this.state;

            sessionStore.setPurposeAndSettings(purpose, setting);

            const promise = handlers.sessionHandler.openPatient(selectedPatient.patientID, purpose, setting);
            modalWait(promise, this.props.sessionStore)
                .then(this.openPatientSuccess);
        }
    }

    @autobind
    private onSearchPatientHealthService()
    {
        if (!this.checkValidInput())
        {
            return;
        }

        const { mrn, familyNamePrefix, givenNamePrefix, includeDeceased } = this.state;
        const promise = this.props.handlers.patientHandler.searchPatient(PatientSearchTarget.HealthService, mrn,
            familyNamePrefix,
            givenNamePrefix, includeDeceased);
        modalWait(promise, this.props.sessionStore)
            .then(this.searchPatientSuccess);
    }

    @autobind
    private onSearchPatientMedicalGroup()
    {
        if (!this.checkValidInput())
        {
            return;
        }

        const { mrn, familyNamePrefix, givenNamePrefix, includeDeceased } = this.state;
        const promise = this.props.handlers.patientHandler.searchPatient(PatientSearchTarget.MedicalGroup, mrn,
            familyNamePrefix,
            givenNamePrefix, includeDeceased);
        modalWait(promise, this.props.sessionStore)
            .then(this.searchPatientSuccess);
    }

    @autobind
    private onSearchPatientPAS()
    {
        if (!this.checkValidInput())
        {
            return;
        }

        const { mrn, familyNamePrefix, givenNamePrefix, includeDeceased } = this.state;
        const promise = this.props.handlers.patientHandler.searchPatient(PatientSearchTarget.PAS, mrn, familyNamePrefix,
            givenNamePrefix, includeDeceased);
        modalWait(promise, this.props.sessionStore)
            .then(this.searchPatientSuccess);
    }

    @action.bound
    private openPatientSuccess(session)
    {
        const { appStore } = this.props;
        const { purpose, setting } = this.state;

        appStore.actionStore.completeOpenPatient(session.patientID, purpose, setting);
        appStore.componentStore.modalDialog.close();
    }

    public render()
    {
        const patientSearchResults = this.patientSearchResults ? toJS(this.patientSearchResults) : [];

        // TODO get these from the server
        const healthService = 'Health Service';
        const allowHealthServiceMRNSearch = true;
        const showSearchPAS = true;

        const showSettingPurpose = this.props;

        const actions = (
            <>
                <Button label="Open" onClick={this.onOpenPatient} disabled={!this.state.selectedPatient} />
                <Button label="Cancel" onClick={this.onCancel} />
            </>
        );

        const form = this.props.formDescription;
        const settingsOptions = FormDescriptionUtility.buildFieldOptions(form, 'Setting');
        const purposeOptions = FormDescriptionUtility.buildFieldOptions(form, 'Purpose');
        const settingsPurpose = (
            <>
                <div className="p-col-2">
                    <label htmlFor=" setting">Settings</label>
                </div>
                <div className="p-col-4">
                    <Dropdown id="setting" value={this.state.setting} options={settingsOptions} autoWidth
                        onChange={e => this.setState({ setting: e.value })} />
                </div>
                <div className="p-col-2">
                    <label htmlFor=" purpose">Purpose</label>
                </div>
                <div className="p-col-4">
                    <Dropdown id="purpose" value={this.state.purpose} options={purposeOptions} autoWidth
                        onChange={e => this.setState({ purpose: e.value })} />
                </div>
            </>
        );

        return (
            <Dialog header="Patient Search" visible={true} style={{ width: '45em' }} modal={true}
                onHide={this.onCancel} footer={actions} closable={false} className="ct-patient-search-dialog">
                <div className="p-grid">
                    <div className="p-col-3">
                        <label htmlFor="familyName">Family name</label>
                    </div>
                    <div className="p-col-9">
                        <InputText id="familyName" type="text"
                            onChange={e => this.setState({ familyNamePrefix: (e.target as HTMLInputElement).value })}
                            value={this.state.familyNamePrefix} autoFocus />
                    </div>
                    <div className="p-col-3">
                        <label htmlFor="givenName">Given name</label>
                    </div>
                    <div className="p-col-9">
                        <InputText id="givenName" type="text"
                            onChange={e => this.setState({ givenNamePrefix: (e.target as HTMLInputElement).value })}
                            value={this.state.givenNamePrefix} />
                    </div>
                    <div className="p-col-3">
                        <label htmlFor="urMrn">UR/MRN</label>
                    </div>
                    <div className="p-col-9">
                        <InputText id="urMrn" type="text"
                            onChange={e => this.setState({ mrn: (e.target as HTMLInputElement).value })}
                            value={this.state.mrn} />
                    </div>
                    <div className="p-col-3" />
                    <div className="p-col-9">
                        <Checkbox inputId="deceased" checked={this.state.includeDeceased}
                            onChange={e => this.setState({ includeDeceased: e.checked })} />
                        &nbsp;<label htmlFor="deceased">Include deceased patients</label>
                    </div>
                    <div className="p-col-4">
                        <Button label="Search" className="is-full-width" onClick={this.onSearchPatientMedicalGroup} />
                    </div>
                    <div className="p-col-4">
                        <Button label={`Search ${healthService}`} className="is-full-width"
                            onClick={this.onSearchPatientHealthService}
                            disabled={!allowHealthServiceMRNSearch} />
                    </div>
                    <div className="p-col-4">
                        {showSearchPAS && (
                            <Button label="Search PAS"
                                className="is-full-width" onClick={this.onSearchPatientPAS} />
                        )}
                    </div>
                    <div className="p-col-12">
                        <ListBox value={this.state.selectedPatient}
                            options={patientSearchResults}
                            onChange={e => this.setState({ selectedPatient: e.value })}
                            className="ct-patient-search-dialog-list is-full-width" />
                    </div>
                    {showSettingPurpose && settingsPurpose}
                </div>
            </Dialog>
        );
    }

    @action.bound
    private searchPatientSuccess(response)
    {
        if (lodash.isEmpty(response))
        {
            this.patientSearchResults = [];
            this.props.componentStore.modalDialog.show(<OKDialog icon={DialogIcons.warn}
                message="No matching patients found."
                header="Patient Search" />);
            return;
        }

        this.setState({ selectedPatient: response[0] });
        this.patientSearchResults = this.formatSearchResults(response);
    }
}

export default PatientSearchDialog;
