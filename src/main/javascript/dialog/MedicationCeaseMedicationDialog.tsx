import {autobind} from 'core-decorators';
import MandatoryOrInvalidFieldDialog from 'main/dialog/MandatoryOrInvalidFieldDialog';
import {MedicationCeaseMedicationEntityDialogProps} from 'main/dialog/MedicationCeaseMedicationEntityDialog';
import FormComponent from 'main/form/FormComponent';
import FormContext from 'main/form/FormContext';
import StoreProps from 'main/store/StoreProps';
import DateUtility from 'main/utility/DateUtility';
import {observable} from 'mobx';
import {inject, observer} from 'mobx-react';
import {Button} from 'primereact/button';
import {Dialog} from 'primereact/dialog';
import React from 'react';
import FormDescription from 'smarthealth-javascript/FormDescription';
import MedicationCeaseParameters from 'smarthealth-javascript/MedicationCeaseParameters';

/**
 * Cease medication dialog which makes a cease medication REST call if user proceeds by clicking on the OK button.
 *
 * @author Thompson 6/10/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
interface MedicationCeaseMedicationDialogProps extends StoreProps, MedicationCeaseMedicationEntityDialogProps
{
    formDescription: FormDescription;
}

@inject('appStore', 'entityCache', 'handlers', 'sessionStore')
@observer
class MedicationCeaseMedicationDialog extends React.Component<MedicationCeaseMedicationDialogProps>
{
    // Width of 55em is enough to show all 100 characters needed for Medication text field.
    private static width: string = '55em';

    @observable
    private data = {
        Medication: this.props.productFormulationStrength,
        // The default cease date should be yesterday's date. see Bug 4531 - Diabetes Letter - Completed
        // medications stay on letter
        CeaseDate: DateUtility.addDays(this.props.appStore.dateTime.today(), -1),
        CeaseReason: null
    };

    @observable
    private formContext: FormContext;

    constructor(props)
    {
        super(props);
        this.formContext = FormContext.build(props.appStore, props.formDescription);
        this.formContext.editing = true;
    }

    @autobind
    private doClose()
    {
        this.props.appStore.componentStore.modalDialog.close(false);
    }

    @autobind
    private async onClickCeaseMedication()
    {
        const invalidFields: Set<string> = this.formContext.fieldValidator.validateForm(this.data,
            this.props.formDescription, this.formContext.fieldStates);
        if (invalidFields.size > 0)
        {
            this.props.appStore.componentStore.modalDialog.show(<MandatoryOrInvalidFieldDialog />);
            return;
        }

        const medicationCeaseParameters: MedicationCeaseParameters = {
            ceaseDate: this.data.CeaseDate,
            ceaseReason: this.data.CeaseReason,
            serviceID: this.props.serviceID
        };
        const hasCeasedMedication = this.props.handlers.medicationHandler.ceaseMedication(medicationCeaseParameters);
        this.props.appStore.componentStore.modalDialog.close(hasCeasedMedication);
    }

    public render()
    {
        return (
            <Dialog contentStyle={{ height: '200px' }} closable={false} footer={this.renderFooterButtons()}
                header="Cease Medication" onHide={this.doClose}
                style={{ width: MedicationCeaseMedicationDialog.width }} visible={true}>
                <FormComponent context={this.formContext} data={this.data} />
            </Dialog>
        );
    }

    private renderFooterButtons(): React.ReactNode
    {
        return (
            <>
                <Button label="OK" onClick={this.onClickCeaseMedication} />
                <Button label="Cancel" onClick={this.doClose} />
            </>
        );
    }
}

export default MedicationCeaseMedicationDialog;
