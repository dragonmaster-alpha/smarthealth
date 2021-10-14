import {autobind} from 'core-decorators';
import lodash from 'lodash';
import MedicationCeaseMedicationEntityDialog from 'main/dialog/MedicationCeaseMedicationEntityDialog';
import MedicationSummaryStore, {MedicationSummaryFilterField} from 'main/store/MedicationSummaryStore';
import StoreProps from 'main/store/StoreProps';
import MedicationSummaryExpandableEntityTable from 'main/summary/medication/MedicationSummaryExpandableEntityTable';
import DateUtility from 'main/utility/DateUtility';
import {inject, observer} from 'mobx-react';
import {Button} from 'primereact/button';
import {TriStateCheckbox} from 'primereact/tristatecheckbox';
import React from 'react';
import MedicationSummary from 'smarthealth-javascript/MedicationSummary';
import ServiceTypeEnum from 'smarthealth-javascript/ServiceTypeEnum';

/**
 * Display Medication summary panel in a TableTree presentation with show all medication and show adverse reaction
 * medication filters. Panel also has New, Open, Completed, and Cease action buttons. When a TODO
 *
 * @author Thompson 29/09/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */

@inject('appStore', 'entityCache', 'handlers', 'sessionStore')
@observer
class MedicationSummaryPanel extends React.Component<StoreProps>
{
    constructor(props)
    {
        super(props);

        if (!this.props.sessionStore.medicationSummaryStore)
        {
            this.props.sessionStore.medicationSummaryStore = new MedicationSummaryStore();
        }
    }

    private isMedicationSummaryCompleted(medicationSummary: MedicationSummary): boolean
    {
        return !!medicationSummary.finishDate && DateUtility.isAfterDay(this.props.appStore.dateTime.today(),
            medicationSummary.finishDate);
    }

    @autobind
    private async onClickCeaseMedication()
    {
        const medicationSummary = this.props.sessionStore.medicationSummaryStore.medicationSummarySelected;
        const ceaseSuccessful = this.props.componentStore.modalDialog.showAndWait(
            <MedicationCeaseMedicationEntityDialog productFormulationStrength={medicationSummary.prodFormStrength}
                serviceID={medicationSummary.serviceID} />
        );
        if (ceaseSuccessful)
        {
            this.props.sessionStore.medicationSummaryStore.setMedicationSummarySelected(null);
        }
    }

    @autobind
    private async onClickCompleteMedication()
    {
        const completedSuccessful = await this.props.handlers.medicationHandler.completeMedication(
            this.props.sessionStore.medicationSummaryStore.medicationSummarySelected.product);
        if (completedSuccessful)
        {
            this.props.sessionStore.medicationSummaryStore.setMedicationSummarySelected(null);
        }
    }

    @autobind
    private async onClickCreateMedication()
    {
        const serviceType = await this.props.entityCache.serviceTypes.load(ServiceTypeEnum.Medication);
        this.props.appStore.actionStore.createNewService(serviceType);
    }

    @autobind
    private async onClickOpenMedication()
    {
        const medicationSummary: MedicationSummary = this.props.sessionStore.medicationSummaryStore
            .medicationSummarySelected;

        // it is OK to load this here as it will be loaded when the service is opened below
        const serviceRecord = await this.props.entityCache.serviceRecord.load(medicationSummary.serviceID);

        this.props.appStore.actionStore.openService(serviceRecord.metadata);
    }

    @autobind
    private onMedicationSummaryChange(medicationSummary: MedicationSummary)
    {
        this.props.sessionStore.medicationSummaryStore.setMedicationSummarySelected(medicationSummary);
    }

    @autobind
    private onToggleMedicationFilters(event)
    {
        this.props.sessionStore.medicationSummaryStore.toggleSummaryFilters(event.target.id);
    }

    public render()
    {
        return (
            <div className="cp-MedicationSummaryPanel">
                <MedicationSummaryExpandableEntityTable onMedicationSummaryChange={this.onMedicationSummaryChange} />
                {this.renderSummaryActions()}
            </div>
        );
    }

    private renderSummaryActions(): React.ReactNode
    {
        const medicationSummarySelected = this.props.sessionStore.medicationSummaryStore.medicationSummarySelected;
        const medicationSummarySelectedDisabled = (medicationSummarySelected
            && this.isMedicationSummaryCompleted(medicationSummarySelected))
            || lodash.isNil(this.props.sessionStore.medicationSummaryStore.medicationSummarySelected);

        return (
            <div className="cp-MedicationSummaryPanel-summaryActions">
                <div className="cp-MedicationSummaryPanel-summaryFilters">
                    <span>Show:&nbsp;</span>
                    <TriStateCheckbox id={MedicationSummaryFilterField.allMedication} inputId="allMedicationLabelID"
                        value={this.props.sessionStore.medicationSummaryStore.allMedicationFilter}
                        onChange={this.onToggleMedicationFilters} />
                    <label htmlFor="allMedicationLabelID">&nbsp;all medications&nbsp;&nbsp;&nbsp;</label>
                    <TriStateCheckbox id={MedicationSummaryFilterField.adverseReaction}
                        inputId="adverseReactionsLabelID"
                        value={this.props.sessionStore.medicationSummaryStore.adverseReactionFilter}
                        onChange={this.onToggleMedicationFilters} />
                    <label htmlFor="adverseReactionsLabelID">&nbsp;adverse reactions</label>
                </div>
                <div className="cp-MedicationSummaryPanel-actionButtons">
                    <Button label="New" onClick={this.onClickCreateMedication} />
                    <Button label="Open"
                        disabled={!this.props.sessionStore.medicationSummaryStore.medicationSummarySelected}
                        onClick={this.onClickOpenMedication} />
                    <Button label="Complete" disabled={medicationSummarySelectedDisabled}
                        onClick={this.onClickCompleteMedication} />
                    <Button label="Cease" disabled={medicationSummarySelectedDisabled}
                        onClick={this.onClickCeaseMedication} />
                </div>
            </div>
        );
    }
}

export default MedicationSummaryPanel;
