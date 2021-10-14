import {storiesOf} from '@storybook/react';
import AssociatedMedicalGroupRemoveSameMedicalGroupDialog
    from 'main/dialog/AssociatedMedicalGroupRemoveSameMedicalGroupDialog';
import React from 'react';
import SetStore from 'test/component/SetStore';

/**
 * Allow debugging of AssociatedMedicalGroupRemoveSameMedicalGroupDialog.tsx
 *
 * @author Thompson 20/11/2019
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2019
 */
storiesOf('Dialog/AssociatedMedicalGroupRemoveSameMedicalGroupDialog', module)
    .add('Dialog', () =>
    {

        return (
            <SetStore set={(appStore) =>
            {
                appStore.componentStore.modalDialog.closeAll();
                appStore.componentStore.modalDialog.show(
                    <AssociatedMedicalGroupRemoveSameMedicalGroupDialog />
                );
            }}>
                <></>
            </SetStore>
        );
    });
