import {action as storybookAction} from '@storybook/addon-actions';
import {storiesOf} from '@storybook/react';
import MedicationCeaseMedicationEntityDialog from 'main/dialog/MedicationCeaseMedicationEntityDialog';
import React from 'react';
import EntityType from 'smarthealth-javascript/EntityType';
import ceaseMedicationDialog from 'smarthealth-rest-test/formdesc/Form.Dialog.CeaseMedication.json';
import SetEntity from 'test/component/SetEntity';
import SetStore from 'test/component/SetStore';
import {MEDICATION_4_PANADOL_RAPID, MEDICATION_5_AMINO_ACIDS} from 'test/model/MedicationSummaryMother';
/**
 * Allow debugging of MedicationCeaseMediationDialog.tsx
 *
 * @author Thompson 6/10/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */

storiesOf('Dialog/MedicationCeaseMedicationDialog', module)
    .add('Product: Panadol Rapid', () =>
    {
        return (
            <SetStore set={async (appStore) =>
            {
                appStore.componentStore.modalDialog.closeAll();
                const response = await appStore.componentStore.modalDialog.showAndWait(
                    <SetEntity type={EntityType.FormDescription} id="Dialog.CeaseMedication"
                        value={ceaseMedicationDialog}>
                        <MedicationCeaseMedicationEntityDialog
                            productFormulationStrength={MEDICATION_4_PANADOL_RAPID.prodFormStrength}
                            serviceID={MEDICATION_4_PANADOL_RAPID.serviceID} />
                    </SetEntity>
                );
                storybookAction('Cease Medication')(response ? 'Successful' : 'Unsuccessful');
            }}>
                <></>
            </SetStore>
        );
    })
    .add('Generic: Amino Acids', () =>
    {
        return (
            <SetStore set={async (appStore) =>
            {
                appStore.componentStore.modalDialog.closeAll();
                const response = await appStore.componentStore.modalDialog.showAndWait(
                    <SetEntity type={EntityType.FormDescription} id="Dialog.CeaseMedication"
                        value={ceaseMedicationDialog}>
                        <MedicationCeaseMedicationEntityDialog
                            productFormulationStrength={MEDICATION_5_AMINO_ACIDS.prodFormStrength}
                            serviceID={MEDICATION_5_AMINO_ACIDS.serviceID} />
                    </SetEntity>
                );
                storybookAction('Cease Medication')(response ? 'Successful' : 'Unsuccessful');
            }}>
                <></>
            </SetStore>
        );
    });
