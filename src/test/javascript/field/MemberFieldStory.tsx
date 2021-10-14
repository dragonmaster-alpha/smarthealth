import React from 'react';
import EntityType from 'smarthealth-javascript/EntityType';
import FormFieldMember from 'smarthealth-javascript/FormFieldMember';
import FormFieldType from 'smarthealth-javascript/FormFieldType';
import dropdownMemberForm from 'smarthealth-rest-test/formdesc/Form.Dropdown.Member.json';
import SetEntities from 'test/component/SetEntities';
import {EntityDetails} from 'test/component/SetEntity';
import SetStore from 'test/component/SetStore';
import {MEMBER_DOCTOR_DOLITTLE} from 'test/data/MedicalGroupMemberAggregateMother';
import FieldTester from 'test/field/FieldTester';
import {fieldUsage} from 'test/field/FieldUsageUtility';
import {
    findMedicalGroupMemberByFamilyName, MEMBER_AND_MANY_RECENTS_ENTITIES, MEMBER_AND_RECENTS_ENTITIES
} from 'test/field/MemberOrMedicalGroupStoryConstants';

/**
 * Allow debugging of MemberField component
 *
 * @author Larry 27/03/2018
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2018
 */
export default {
    title: 'Field/MemberField'
};

const field: FormFieldMember = {
    id: 'Member',
    label: 'Member',
    type: FormFieldType.Member
};

const storyDescription = (
    <>
        <h3>Usage</h3>
        <h5>Provider search</h5>
        <ol>
            <li>Click "Search ..." button in the dropdown.</li>
            <li>Enter the characters "fl" into the User search input.</li>
            <li>Click "Search" button to return a list of Users.</li>
            <li>
                Click "Mr Peter Flower".
            </li>
            <li>
                Click "St Vincent's Hospital ..." (only this row is expected to work others may error out).
            </li>
        </ol>
    </>
);

export const standard = () =>
{
    const entities: EntityDetails[] = [
        ...MEMBER_AND_RECENTS_ENTITIES,
        {
            type: EntityType.FormDescription,
            id: dropdownMemberForm.id,
            value: dropdownMemberForm
        }
    ];
    return (
        <>
            <SetStore set={appStore =>
            {
                appStore.handlers.medicalGroupMemberHandler.findMedicalGroupMemberByFamilyName =
                    findMedicalGroupMemberByFamilyName;
            }}>
                <SetEntities entities={entities}>
                    <FieldTester field={field} />
                    {storyDescription}
                </SetEntities>
            </SetStore>
        </>
    );
};

export const initialised = () =>
{
    return (
        <>
            <SetEntities entities={MEMBER_AND_RECENTS_ENTITIES}>
                <FieldTester field={field} value={MEMBER_DOCTOR_DOLITTLE.member.memberID} />
                {storyDescription}
            </SetEntities>
        </>
    );
};

export const standardScrollable = () =>
{
    return (
        <SetStore set={appStore =>
        {
            appStore.handlers.medicalGroupMemberHandler.findMedicalGroupMemberByFamilyName =
                findMedicalGroupMemberByFamilyName;
        }}>
            <SetEntities entities={MEMBER_AND_MANY_RECENTS_ENTITIES}>
                <FieldTester field={field} />
                {storyDescription}
            </SetEntities>
        </SetStore>
    );
};

export const initialisedScrollable = () =>
{
    return (
        <SetStore set={appStore =>
        {
            appStore.handlers.medicalGroupMemberHandler.findMedicalGroupMemberByFamilyName =
                findMedicalGroupMemberByFamilyName;
        }}>
            <SetEntities entities={MEMBER_AND_MANY_RECENTS_ENTITIES}>
                <FieldTester field={field} value={MEMBER_DOCTOR_DOLITTLE.member.memberID} />
                {storyDescription}
            </SetEntities>
        </SetStore>
    );
};

export const usage = () => fieldUsage(FormFieldType.Member);
