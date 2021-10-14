import {action as storybookAction} from '@storybook/addon-actions';
import {storiesOf} from '@storybook/react';
import MedicalGroupSearchDialog from 'main/dialog/MedicalGroupSearchDialog';
import React from 'react';
import EntityType from 'smarthealth-javascript/EntityType';
import medicalGroupSearch from 'smarthealth-rest-test/formdesc/Form.Dialog.MedicalGroup.Search.json';
import SetEntity from 'test/component/SetEntity';
import SetStore from 'test/component/SetStore';
import {findMedicalGroups} from 'test/field/MedicalGroupFieldStory';

/**
 * Tester for Medical Group Search Dialog
 *
 * @author Larry 6/05/2019
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2019
 */

storiesOf('Dialog/MedicalGroupSearchDialog', module)
    .add('Dialog', () =>
    {
        return (
            <SetStore set={appStore =>
            {
                appStore.componentStore.modalDialog.closeAll();
                appStore.handlers.medicalGroupHandler.findMedicalGroups = findMedicalGroups;
            }}>
                <SetEntity type={EntityType.FormDescription} id="Dialog.MedicalGroup.Search"
                    value={medicalGroupSearch}>
                    <MedicalGroupSearchDialog onSelect={medicalGroup => storybookAction('onSelect')(medicalGroup)} />
                    <h3>Usage</h3>
                    <ol>
                        <li>enter the characters "st" into the search input</li>
                        <li>click "Search" button to return a list of search results</li>
                    </ol>
                </SetEntity>
            </SetStore>
        );
    });
