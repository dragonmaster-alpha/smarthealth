import Entity from 'main/component/Entity';
import MedicationCeaseMedicationDialog from 'main/dialog/MedicationCeaseMedicationDialog';
import React from 'react';
import EntityType from 'smarthealth-javascript/EntityType';
import FormDescription from 'smarthealth-javascript/FormDescription';

/**
 * Entity component to load MedicationCeaseMedicationDialog.tsx
 *
 * @author Thompson 24/11/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
export interface MedicationCeaseMedicationEntityDialogProps
{
    productFormulationStrength: string;
    serviceID: number;
}

class MedicationCeaseMedicationEntityDialog extends React.Component<MedicationCeaseMedicationEntityDialogProps>
{
    public render()
    {
        return (
            <Entity<FormDescription> id="Dialog.CeaseMedication" type={EntityType.FormDescription} render={(data) =>
                <MedicationCeaseMedicationDialog formDescription={data} {...this.props} />
            } />
        );
    }
}

export default MedicationCeaseMedicationEntityDialog;
