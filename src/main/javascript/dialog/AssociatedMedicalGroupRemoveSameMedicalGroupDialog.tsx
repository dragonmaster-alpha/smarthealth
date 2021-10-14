import OKCancelDialog from 'main/dialog/OKCancelDialog';
import {action} from 'mobx';
import React from 'react';

/**
 * Modal dialog to warn a User if they are removing a Medical Group who is also associated with the User's Medical
 * Group.
 *
 * @author Thompson 15/11/2019
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2019
 */
class AssociatedMedicalGroupRemoveSameMedicalGroupDialog extends React.Component
{
    @action.bound
    private onOK(): boolean
    {
        return true;
    }

    public render()
    {
        return (
            <OKCancelDialog header="Remove Associated Medical Group"
                message="The association between the patient and this medical group is being removed.
                The patient's record will no longer be accessible from this medical group. The patient will be closed."
                onOK={this.onOK} />
        );
    }
}

export default AssociatedMedicalGroupRemoveSameMedicalGroupDialog;
