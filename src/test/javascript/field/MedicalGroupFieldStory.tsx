import {action as storybookAction} from '@storybook/addon-actions';
import {storiesOf} from '@storybook/react';
import React from 'react';
import FieldEditState from 'smarthealth-javascript/FieldEditState';
import FormFieldMedicalGroup from 'smarthealth-javascript/FormFieldMedicalGroup';
import FormFieldType from 'smarthealth-javascript/FormFieldType';
import MedicalGroupDigest from 'smarthealth-javascript/MedicalGroupDigest';
import medicalGroupSearch from 'smarthealth-rest-test/formdesc/Form.Dialog.MedicalGroup.Search.json';
import medicalGroupDropdown from 'smarthealth-rest-test/formdesc/Form.Dropdown.MedicalGroup.json';
import SetEntities from 'test/component/SetEntities';
import {EntityDetails} from 'test/component/SetEntity';
import SetStore from 'test/component/SetStore';
import FieldTester from 'test/field/FieldTester';
import {fieldUsage} from 'test/field/FieldUsageUtility';
import {
    MEDICAL_GROUP_AND_MANY_RECENTS_ENTITIES, MEDICAL_GROUP_AND_RECENTS_ENTITIES
} from 'test/field/MemberOrMedicalGroupStoryConstants';
import {formDescriptionEntityDetails} from 'test/model/FormDescriptionMother';

/**
 * Allow debugging of MedicalGroupFieldOld component
 *
 * @author Larry 27/03/2018
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2018
 */

const field: FormFieldMedicalGroup = {
    id: 'MedicalGroup',
    label: 'Medical group',
    state: { editState: FieldEditState.Enabled },
    type: FormFieldType.MedicalGroup
};

export async function findMedicalGroups(prefix: string): Promise<MedicalGroupDigest[]>
{
    storybookAction('findMedicalGroups')(prefix);
    if (prefix === 'st')
    {
        return [
            {
                city: 'Sydney',
                groupID: 1,
                name: 'Smart Health System',
                participating: true,
                phone: '(02) 2222 3333',
                practiceSettingCode: '5921-2',
                state: 'NSW'
            },
            {
                city: 'Sydney',
                groupID: 2,
                name: 'Unit Test Group',
                participating: true,
                phone: '(02) 2222 3333',
                practiceSettingCode: '5921-2',
                state: 'NSW'
            },
            {
                city: 'Sydney',
                groupID: 5,
                name: 'St Vaseline Intensive Care',
                participating: true,
                phone: '(02) 2222 3333',
                practiceSettingCode: '8401-5',
                state: 'NSW'
            },
            {
                city: 'Sandringham',
                groupID: 20,
                name: 'Sandringham & District Memorial Hospital',
                participating: true,
                phone: '(02) 2222 3333',
                practiceSettingCode: '8401-5',
                state: 'Vic'
            },
            {
                city: 'Melbourne',
                groupID: 21,
                name: 'The Alfred Diagnostic',
                participating: true,
                phone: '(02) 2222 3333',
                practiceSettingCode: '8520-1',
                state: 'Vic'
            },
            {
                city: 'Darlinghurst',
                groupID: 26,
                name: 'St Vincent\'s Hospital',
                participating: true,
                phone: '(02) 2222 3333',
                practiceSettingCode: '8401-5',
                state: 'NSW'
            },
            {
                city: 'Darlinghurst',
                groupID: 27,
                name: 'St Vincent\'s IBAC',
                participating: true,
                phone: '(02) 2222 3333',
                practiceSettingCode: '8401-5',
                state: 'NSW'
            },
            {
                city: 'Darlinghurst',
                groupID: 28,
                name: 'St Vincent\'s Diabetes Service',
                participating: true,
                phone: '(02) 2222 3333',
                practiceSettingCode: '8401-5',
                state: 'NSW'
            },
            {
                city: 'Castle Hill ',
                groupID: 31,
                name: 'Emerging Systems',
                participating: true,
                phone: '(02) 2222 3333',
                practiceSettingCode: '8511-2',
                state: 'NSW'
            }
        ];
    }
    else
    {
        return [];
    }
}

const storyDescription = (
    <>
        <h3>Usage</h3>
        <h5>Medical Group Search</h5>
        <ol>
            <li>Click "Other ..." button.</li>
            <li>Enter the characters "st" into the search input.</li>
            <li>Click "Search" button to return a list of Medical Groups.</li>
            <li>
                Click "Smart Health System" (only this row is expected to work others may display an error).
            </li>
        </ol>
    </>
);

storiesOf('Field/MedicalGroupField', module)
    .add('Standard', () =>
    {
        const entities: EntityDetails[] = [
            formDescriptionEntityDetails(medicalGroupDropdown),
            formDescriptionEntityDetails(medicalGroupSearch),
            ...MEDICAL_GROUP_AND_RECENTS_ENTITIES
        ];

        return (
            <SetStore set={appStore =>
            {
                appStore.handlers.medicalGroupHandler.findMedicalGroups = findMedicalGroups;
            }}>
                <SetEntities entities={entities}>
                    <FieldTester field={field} />
                </SetEntities>
                {storyDescription}
            </SetStore>
        );
    })
    .add('Initialised', () =>
    {
        const entities: EntityDetails[] = [
            formDescriptionEntityDetails(medicalGroupDropdown),
            formDescriptionEntityDetails(medicalGroupSearch),
            ...MEDICAL_GROUP_AND_RECENTS_ENTITIES
        ];

        return (
            <SetStore set={appStore =>
            {
                appStore.handlers.medicalGroupHandler.findMedicalGroups = findMedicalGroups;
            }}>
                <SetEntities entities={entities}>
                    <FieldTester field={field} value={23} />
                </SetEntities>
                {storyDescription}
            </SetStore>
        );
    })
    .add('Standard, long', () =>
    {
        const entities: EntityDetails[] = [
            formDescriptionEntityDetails(medicalGroupDropdown),
            formDescriptionEntityDetails(medicalGroupSearch),
            ...MEDICAL_GROUP_AND_MANY_RECENTS_ENTITIES
        ];

        return (
            <SetStore set={appStore =>
            {
                appStore.handlers.medicalGroupHandler.findMedicalGroups = findMedicalGroups;
            }}>
                <SetEntities entities={entities}>
                    <FieldTester field={field} />
                </SetEntities>
                {storyDescription}
            </SetStore>
        );
    })
    .add('Initialised, long', () =>
    {
        const entities: EntityDetails[] = [
            formDescriptionEntityDetails(medicalGroupDropdown),
            formDescriptionEntityDetails(medicalGroupSearch),
            ...MEDICAL_GROUP_AND_MANY_RECENTS_ENTITIES
        ];

        return (
            <SetStore set={appStore =>
            {
                appStore.handlers.medicalGroupHandler.findMedicalGroups = findMedicalGroups;
            }}>
                <SetEntities entities={entities}>
                    <FieldTester field={field} value={23} />
                </SetEntities>
                {storyDescription}
            </SetStore>
        );
    })
    .add('Usage', () => fieldUsage(FormFieldType.MedicalGroup));
