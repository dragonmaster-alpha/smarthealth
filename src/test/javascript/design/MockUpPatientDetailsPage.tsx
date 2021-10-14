import {background} from 'main/application/ThemeConstants';
import Button from 'main/component/Button';
import ButtonBar from 'main/container/ButtonBar';
import Scroll from 'main/container/Scroll';
import {action, observable} from 'mobx';
import {observer} from 'mobx-react';
import React from 'react';
import FormDescription from 'smarthealth-javascript/FormDescription';
import formPatientDemographics from 'smarthealth-rest-test/formdesc/Form.Patient.Demographics.json';
import {MEMBER_JEMMA_HULL} from 'test/data/MedicalGroupMemberAggregateMother';
import MockUpForm from 'test/design/MockUpForm';
import MockUpPage from 'test/design/MockUpPage';
import MockUpTabBar, {Tab} from 'test/design/MockUpTabBar';
import MockUpToast from 'test/design/MockUpToast';
import {PATIENT_AGGREGATE_HARRY_POTTER, PATIENT_HARRY_POTTER} from 'test/model/PatientMother';

/**
 * Mock up of the page that includes a patient details form.
 *
 * @author Larry 6/10/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
interface MockUpPatientDetailsPageProps
{
    navItems: { icon: string, name: string, primary?: boolean }[];
    tabs: Tab[];
}

@observer
class MockUpPatientDetailsPage extends React.Component<MockUpPatientDetailsPageProps>
{
    private editButtons = (
        <ButtonBar>
            <Button title="Save" primary={true} onClick={this.onSave} />
            <Button title="Cancel" onClick={this.onCancel} />
        </ButtonBar>
    );

    @observable
    private editing: boolean;

    // { Save: this.onSave, Cancel: this.onCancel };

    @observable
    private toast: boolean;

    private viewButtons = (
        <ButtonBar>
            <Button title="Edit" primary={true} onClick={this.onEdit} />
            <Button title="Consent" onClick={null} />
            <Button title="Refresh from PAS" onClick={null} />
        </ButtonBar>
    );

    // private viewButtons = { Edit: this.onEdit, Consent: null, 'Refresh from PAS': null };

    @action.bound
    private onCancel()
    {
        this.editing = false;
        this.toast = false;
    }

    @action.bound
    private onCloseToast()
    {
        this.toast = false;
    }

    @action.bound
    private onEdit()
    {
        this.editing = true;
        this.toast = false;
    }

    @action.bound
    private onSave()
    {
        this.editing = false;
        this.toast = true;
        setTimeout(this.onCloseToast, 5000);
    }

    public render(): React.ReactNode
    {
        return (
            <MockUpPage navItems={this.props.navItems} navTreeSelection="Patient Details" pageTitle="Patient Details"
                patient={PATIENT_AGGREGATE_HARRY_POTTER}
                provider={MEMBER_JEMMA_HULL}>
                <main
                    style={{
                        backgroundColor: background.main,
                        display: 'grid', gridTemplateColumns: '1fr', gridTemplateRows: '1fr'
                    }}>
                    <div style={{
                        padding: '0px 32px',
                        display: 'grid', gridTemplateColumns: '1fr', gridTemplateRows: '44px 1fr 56px'
                    }}>
                        <MockUpTabBar tabs={this.props.tabs} selectedIndex={1} />
                        <Scroll>
                            <MockUpForm form={formPatientDemographics as FormDescription} data={PATIENT_HARRY_POTTER}
                                editing={this.editing} />
                        </Scroll>
                        {this.editing ? this.editButtons : this.viewButtons}
                    </div>
                    {
                        this.toast &&
                        <span style={{ position: 'absolute', bottom: '80px', right: '32px' }}>
                                <MockUpToast onClose={this.onCloseToast} text="Patient has been saved"
                                    title="Save successful" />
                            </span>
                    }
                </main>
            </MockUpPage>
        );
    }
}

export default MockUpPatientDetailsPage;
