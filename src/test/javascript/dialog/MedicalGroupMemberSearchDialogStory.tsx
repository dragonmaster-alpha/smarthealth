import {action as storybookAction} from '@storybook/addon-actions';
import {storiesOf} from '@storybook/react';
import MedicalGroupMemberSearchDialog from 'main/dialog/MedicalGroupMemberSearchDialog';
import React from 'react';
import SetStore from 'test/component/SetStore';
import {findMedicalGroupMemberByFamilyName} from 'test/field/MemberOrMedicalGroupStoryConstants';

/**
 * Allow debugging of MedicalGroupMemberSearchDialogStory.tsx
 *
 * @author Thompson 2/01/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */

storiesOf('Dialog/MedicalGroupMemberSearchDialog', module)
    .add('Dialog', () =>
    {
        return (
            <SetStore set={(appStore) =>
            {
                appStore.componentStore.modalDialog.closeAll();
                appStore.componentStore.modalDialog.show(
                    <MedicalGroupMemberSearchDialog onSelect={storybookAction('onSelect')} />
                );
                appStore.handlers.medicalGroupMemberHandler.findMedicalGroupMemberByFamilyName =
                    findMedicalGroupMemberByFamilyName;
            }}>
                <>
                    <h3>Usage</h3>
                    <ol>
                        <li>enter the characters "fl" into the User search input.</li>
                        <li>click "Search" button to return a list of Users.</li>
                    </ol>
                    <h3>TODO</h3>
                    <ol>
                        <li>
                            Medical Group list row selection highlight needs to visually highlight whole row. When
                            horizontally scrolled to the right this is not happening.
                        </li>
                    </ol>
                </>
            </SetStore>
        );
    });
