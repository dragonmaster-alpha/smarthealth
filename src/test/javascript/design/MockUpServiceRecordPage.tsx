import {background, zIndex} from 'main/application/ThemeConstants';
import Button from 'main/component/Button';
import CloseButton from 'main/component/CloseButton';
import ButtonBar from 'main/container/ButtonBar';
import {px} from 'main/utility/StyleUtility';
import {action, observable} from 'mobx';
import {observer} from 'mobx-react';
import React from 'react';
import EntityData from 'smarthealth-javascript/EntityData';
import FormDescription from 'smarthealth-javascript/FormDescription';
import {MEMBER_JEMMA_HULL} from 'test/data/MedicalGroupMemberAggregateMother';
import MockUpPage from 'test/design/MockUpPage';
import MockUpServiceRecord from 'test/design/MockUpServiceRecord';
import MockUpServiceRecordHistory from 'test/design/MockUpServiceRecordHistory';
import MockUpTabBar from 'test/design/MockUpTabBar';
import MockUpToast from 'test/design/MockUpToast';
import {PATIENT_AGGREGATE_HARRY_POTTER} from 'test/model/PatientMother';

/**
 * Mockup page with service record history
 *
 * @author Larry 8/10/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
interface MockUpServiceRecordPageProps
{
    data: EntityData;
    form: FormDescription;
    navItems: { icon: string, name: string, primary?: boolean }[];
    title: string;
}

@observer
class MockUpServiceRecordPage extends React.Component<MockUpServiceRecordPageProps>
{
    private editButtonBar = (
        <ButtonBar>
            <Button title="Save" primary={true} onClick={this.onSave} />
            <Button title="Cancel" onClick={this.onCancel} />
        </ButtonBar>
    );

    // private editButtons = { Save: this.onSave, Cancel: this.onCancel };

    @observable
    private editing: boolean;

    @observable
    private toast: boolean;

    private viewButtonBar = (
        <ButtonBar>
            <Button title="Edit" primary={true} onClick={this.onEdit} />
            <Button title="Close" onClick={null} />
        </ButtonBar>
    );

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
        const tabs = [
            { name: this.props.title, decoration: <CloseButton onClose={() => null} /> },
            { name: 'Another', decoration: <CloseButton onClose={() => null} /> }
        ];
        return (
            <MockUpPage navItems={this.props.navItems} navTreeSelection="Service Records" pageTitle="Service Records"
                patient={PATIENT_AGGREGATE_HARRY_POTTER}
                provider={MEMBER_JEMMA_HULL}>
                <main
                    style={{
                        backgroundColor: background.main,
                        display: 'grid', gridTemplateColumns: '1fr', gridTemplateRows: 'auto 1fr'
                    }}>
                    <MockUpServiceRecordHistory />
                    <div style={{
                        padding: px(0, 32, 0), display: 'grid', gridTemplateColumns: '1fr',
                        gridTemplateRows: '32px 1fr 56px', marginTop: '-8px'
                    }}>
                        <MockUpTabBar tabs={tabs} />
                        <MockUpServiceRecord title={this.props.title} form={this.props.form} data={this.props.data}
                            editing={this.editing} />
                        {
                            this.toast &&
                            <span style={{ position: 'absolute', bottom: '80px', right: '16px', zIndex: zIndex.toast }}>
                                <MockUpToast onClose={this.onCloseToast} text="Service record has been saved"
                                    title="Save successful" />
                            </span>
                        }
                        {this.editing ? this.editButtonBar : this.viewButtonBar}
                    </div>
                </main>
            </MockUpPage>
        );
    }
}

export default MockUpServiceRecordPage;
