import Entity from 'main/component/Entity';
import React from 'react';
import EntityType from 'smarthealth-javascript/EntityType';
import FormDescription from 'smarthealth-javascript/FormDescription';
import PatientMedicalGroupAssociation from 'smarthealth-javascript/PatientMedicalGroupAssociation';
import AssociatedMedicalGroupAddDialog from './AssociatedMedicalGroupAddDialog';

/**
 * Entity component to load FormDescription to AssociatedMedicalGroupAddDialog.tsx
 *
 * @author Thompson 11/11/2019
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2019
 */
export interface AssociatedMedicalGroupEntityAddDialogProps
{
    /*
     * associations value in View mode combined the current associations value in Edit mode.
     *
     * used to determine if a user attempts to:
     * - add an existing association.
     * - delete an association and re-adding the same association before saving.
     */
    combinedValue: PatientMedicalGroupAssociation[];
}

class AssociatedMedicalGroupEntityAddDialog extends React.Component<AssociatedMedicalGroupEntityAddDialogProps>
{
    public render()
    {
        return (
            <Entity<FormDescription> id="Dialog.AssociatedMedicalGroupAdd" type={EntityType.FormDescription}
                render={(data) => (
                    <AssociatedMedicalGroupAddDialog {...this.props} formDescription={data} />
                )}
            />
        );
    }
}

export default AssociatedMedicalGroupEntityAddDialog;
