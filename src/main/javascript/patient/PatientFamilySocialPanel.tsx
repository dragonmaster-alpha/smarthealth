import {autobind} from 'core-decorators';
import EditViewFormComponent from 'main/form/EditViewFormComponent';
import PatientIDProps from 'main/patient/PatientIDProps';
import {inject} from 'mobx-react';
import React from 'react';
import FormDescription from 'smarthealth-javascript/FormDescription';
import PatientFamilySocial from 'smarthealth-javascript/PatientFamilySocial';

/**
 * Form to view and edit Patient Family / Social
 *
 * @author Thompson 1/10/2019
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2019
 */
interface PatientFamilySocialPanelProps extends PatientIDProps
{
    data: PatientFamilySocial;
    formDescription: FormDescription;
}

@inject('appStore')
class PatientFamilySocialPanel extends React.Component<PatientFamilySocialPanelProps>
{
    @autobind
    private onSave(familySocial: PatientFamilySocial): Promise<boolean>
    {
        const success: Promise<boolean> = this.props.appStore.handlers.patientHandler.updatePatientFamilySocial(
            this.props.patientID, familySocial);
        return success;
    }

    public render()
    {
        return (
            <EditViewFormComponent data={this.props.data} formDescription={this.props.formDescription}
                onSave={this.onSave} />
        );
    }
}

export default PatientFamilySocialPanel;
