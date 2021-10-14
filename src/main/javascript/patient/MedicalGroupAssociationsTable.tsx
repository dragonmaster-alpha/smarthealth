import {autobind} from 'core-decorators';
import TableData, {TableRow} from 'main/data/TableData';
import AssociatedMedicalGroupEntityAddDialog from 'main/dialog/AssociatedMedicalGroupEntityAddDialog';
import AssociatedMedicalGroupRemoveSameMedicalGroupDialog
    from 'main/dialog/AssociatedMedicalGroupRemoveSameMedicalGroupDialog';
import TableFieldOld from 'main/field/TableFieldOld';
import {PatientProvidersAndConsentsPanelData} from 'main/patient/PatientProvidersAndConsentsPanel';
import StoreProps from 'main/store/StoreProps';
import {toJS} from 'mobx';
import {inject} from 'mobx-react';
import React from 'react';
import FormDescription from 'smarthealth-javascript/FormDescription';
import FormFieldTable from 'smarthealth-javascript/FormFieldTable';
import PatientMedicalGroupAssociation from 'smarthealth-javascript/PatientMedicalGroupAssociation';
import {BaseFieldOldProps} from '../field/BaseFieldOld';

/**
 * Display Medical Group Associations Table
 *
 *
 * @author Thompson 19/11/2019
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2019
 */
interface MedicalGroupAssociationsTableProps extends BaseFieldOldProps<FormFieldTable, TableData>, StoreProps
{
    data: PatientProvidersAndConsentsPanelData;
    formDescription: FormDescription;
    medicalGroupAssociationViewMode: PatientMedicalGroupAssociation[];
    onSave: (data: PatientProvidersAndConsentsPanelData) => Promise<boolean>;
}

@inject('appStore', 'sessionStore')
class MedicalGroupAssociationsTable extends React.Component<MedicalGroupAssociationsTableProps>
{
    @autobind
    private async canRemoveRow(tableRow: TableRow): Promise<boolean>
    {
        if (tableRow && (this.props.appStore.sessionStore.currentGroupID === tableRow['groupID']))
        {
            const remove = await this.props.appStore.componentStore.modalDialog.showAndWait(
                <AssociatedMedicalGroupRemoveSameMedicalGroupDialog />);
            if (remove)
            {
                const newMedicalGroupAssociations = this.props.data.medicalGroupAssociations.filter(medicalGroup => (
                    tableRow !== medicalGroup
                ));

                const dataToSave: PatientProvidersAndConsentsPanelData = {
                    ...this.props.data,
                    medicalGroupAssociations: newMedicalGroupAssociations
                };
                const success = await this.props.onSave(toJS(dataToSave));
                if (success)
                {
                    await this.props.appStore.actionStore.closePatient();
                }
                else
                {
                    return false;
                }
            }
            return remove;
        }
        else
        {
            return true;
        }
    }

    @autobind
    private async createTableRow(): Promise<TableRow>
    {
        const combinedValue = [...this.props.value, ...this.props.medicalGroupAssociationViewMode];

        const newRow = await this.props.appStore.componentStore.modalDialog.showAndWait(
            <AssociatedMedicalGroupEntityAddDialog combinedValue={combinedValue} />
        );

        if (!newRow)
        {
            return null;
        }

        newRow.patientID = this.props.data.patient.patientID;
        newRow.consentType = 'Patient';
        return newRow;
    }

    private isRemoveButtonDisabled(tableData: TableData): boolean
    {
        return tableData.length <= 1;
    }

    public render()
    {
        const { context, disabled, editing, field, fieldValidator, onFieldChange, value } = this.props;
        // TODO find and fix warning about observable when adding a new Medical Group Association
        return (

            <TableFieldOld canRemoveRow={this.canRemoveRow} createTableRow={this.createTableRow} context={context}
                disabled={disabled} editing={editing} field={field} fieldValidator={fieldValidator}
                isRemoveButtonDisabled={this.isRemoveButtonDisabled} onFieldChange={onFieldChange} value={value} />
        );
    }
}

export default MedicalGroupAssociationsTable;
