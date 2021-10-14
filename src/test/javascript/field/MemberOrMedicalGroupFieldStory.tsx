import {storiesOf} from '@storybook/react';
import React from 'react';
import FieldEditState from 'smarthealth-javascript/FieldEditState';
import FormFieldMemberOrMedicalGroup from 'smarthealth-javascript/FormFieldMemberOrMedicalGroup';
import FormFieldType from 'smarthealth-javascript/FormFieldType';
import searchMedicalGroupForm from 'smarthealth-rest-test/formdesc/Form.Dialog.MedicalGroup.Search.json';
import dropdownMedicalGroupForm from 'smarthealth-rest-test/formdesc/Form.Dropdown.MedicalGroup.json';
import dropdownMemberForm from 'smarthealth-rest-test/formdesc/Form.Dropdown.Member.json';
import SetEntities from 'test/component/SetEntities';
import SetStore from 'test/component/SetStore';
import {MEMBER_DOCTOR_DOLITTLE} from 'test/data/MedicalGroupMemberAggregateMother';
import {ST_VASELINE} from 'test/data/MedicalGroupMother';
import FieldTester from 'test/field/FieldTester';
import {fieldUsage} from 'test/field/FieldUsageUtility';
import {findMedicalGroups} from 'test/field/MedicalGroupFieldStory';
import {
    findMedicalGroupMemberByFamilyName, MEDICAL_GROUP_AND_MANY_RECENTS_ENTITIES, MEMBER_AND_MANY_RECENTS_ENTITIES
} from 'test/field/MemberOrMedicalGroupStoryConstants';
import {formDescriptionEntityDetails} from 'test/model/FormDescriptionMother';

/**
 * Allow debugging of MemberOrMedicalGroupField.tsx
 *
 * @author Thompson 1/11/2019
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2019
 */

const entities = [
    formDescriptionEntityDetails(dropdownMemberForm),
    formDescriptionEntityDetails(dropdownMedicalGroupForm),
    formDescriptionEntityDetails(searchMedicalGroupForm),
    ...MEDICAL_GROUP_AND_MANY_RECENTS_ENTITIES,
    ...MEMBER_AND_MANY_RECENTS_ENTITIES
];

const field: FormFieldMemberOrMedicalGroup = {
    id: 'memberOrMedicalGroup',
    label: 'To',
    state: { editState: FieldEditState.Enabled },
    type: FormFieldType.MemberOrMedicalGroup
};

const storyDescriptions = (
    <>
        <h3>Description</h3>
        <ul>
            <li>Provider table: Provider Name filter, filters on Family Name column.</li>
        </ul>
        <h3>Usage</h3>
        <h5>Provider search</h5>
        <ol>
            <li>Click "Provider" radio button.</li>
            <li>Click "Other ..." button.</li>
            <li>Enter the characters "fl" into the User search input.</li>
            <li>Click "Search" button to return a list of Users.</li>
            <li>
                Click "Mr Peter Flower".
            </li>
            <li>
                Click "St Vincent's Hospital ..." (only this row is expected to work others may error
                out).
            </li>
        </ol>
        <h5>Medical Group Search</h5>
        <ol>
            <li>Click "Medical Group" radio button.</li>
            <li>Click "Other ..." button.</li>
            <li>Enter the characters "st" into the search input.</li>
            <li>Click "Search" button to return a list of Medical Groups.</li>
            <li>
                Click "Smart Health System" (only this row is expected to work others may error out).
            </li>
        </ol>
        <h3>TODO</h3>
        <ol>
            <li>
                Medical Group list row selection highlight needs to visually highlight whole row. When
                horizontally scrolled to the right this is not happening.
            </li>
        </ol>
    </>
);

storiesOf('Field/MemberOrMedicalGroupField', module)
    .add('Empty', () =>
    {
        return (
            <SetStore set={appStore =>
            {
                appStore.handlers.medicalGroupHandler.findMedicalGroups = findMedicalGroups;
                appStore.handlers.medicalGroupMemberHandler.findMedicalGroupMemberByFamilyName =
                    findMedicalGroupMemberByFamilyName;
            }}>
                <SetEntities entities={entities}>
                    <FieldTester field={field} value={null} />
                    {storyDescriptions}
                </SetEntities>
            </SetStore>
        );
    })
    .add('Member', () =>
    {
        return (
            <SetEntities entities={entities}>
                <FieldTester field={field} value={{ memberID: MEMBER_DOCTOR_DOLITTLE.member.memberID }} />
                {storyDescriptions}
            </SetEntities>
        );
    })
    .add('Medical Group', () =>
    {
        return (
            <SetEntities entities={entities}>
                <FieldTester field={field} value={{ groupID: ST_VASELINE.groupID }} />
                {storyDescriptions}
            </SetEntities>
        );
    })
    .add('Usage', () => fieldUsage(FormFieldType.MemberOrMedicalGroup));
