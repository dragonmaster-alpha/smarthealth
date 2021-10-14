import {autobind} from 'core-decorators';
import {TableRow} from 'main/data/TableData';
import DialogIcons from 'main/dialog/DialogIcons';
import YesNoDialog from 'main/dialog/YesNoDialog';
import EditViewTableFormComponent from 'main/form/EditViewTableFormComponent';
import PatientIDProps from 'main/patient/PatientIDProps';
import PatientPASIndicator from 'main/patient/PatientPASIndicator';
import {inject} from 'mobx-react';
import React from 'react';
import FormDescription from 'smarthealth-javascript/FormDescription';
import PatientContact from 'smarthealth-javascript/PatientContact';
import PatientContacts from 'smarthealth-javascript/PatientContacts';
import PatientPAS from 'smarthealth-javascript/PatientPAS';

/**
 * Display and edit Patient Contacts
 *
 * @author Thompson 2/10/2019
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2019
 */

interface PatientContactsPanelProps extends PatientIDProps
{
    formDescription: FormDescription;
    pas: PatientPAS;
    patientContacts: PatientContacts;
    tableDescription: FormDescription;
}

@inject('appStore')
class PatientContactsPanel extends React.Component<PatientContactsPanelProps>
{
    private hasContactUnderPAS(): boolean
    {
        return this.props.patientContacts.contacts.some(
            (element: PatientContact) => typeof element.sourcePASID === 'number');
    }

    @autobind
    private async onEdit(): Promise<boolean>
    {
        if (this.hasContactUnderPAS())
        {
            const editable = await this.props.appStore.componentStore.modalDialog.showAndWait(<YesNoDialog
                header="Edit Patient Contacts" icon={DialogIcons.warn}
                message="Some contacts for this patient are under control of a PAS. Editing a contact will remove
                that control. This may result in duplicate contacts. Do you wish to proceed?"
                onYes={() => true} />);

            return editable;
        }
        else
        {
            return true;
        }
    }

    @autobind
    private onGenerateTableRowExtras(): {}
    {
        return { patientID: this.props.patientID };
    }

    @autobind
    private onSave(patientContacts: PatientContacts): Promise<boolean>
    {
        const success = this.props.appStore.handlers.patientHandler.updatePatientContacts(patientContacts);
        return success;
    }

    public render()
    {
        return (
            <EditViewTableFormComponent data={this.props.patientContacts}
                renderBodyFormIndicator={this.renderPatientPASIndicator}
                bodyFormDescription={this.props.formDescription} onEdit={this.onEdit}
                onNewRow={this.onGenerateTableRowExtras} pas={this.props.pas}
                headerFormDescription={this.props.tableDescription} onSave={this.onSave} />
        );
    }

    @autobind
    private renderPatientPASIndicator(rowData: TableRow): React.ReactNode
    {
        // @ts-ignore
        return rowData.sourcePASID
            // @ts-ignore
            ? <PatientPASIndicator pas={this.props.pas} sourcePASID={rowData.sourcePASID} />
            : null;
    }
}

export default PatientContactsPanel;
