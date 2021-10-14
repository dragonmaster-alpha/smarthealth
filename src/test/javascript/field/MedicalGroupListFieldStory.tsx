import {storiesOf} from '@storybook/react';
import IDPair from 'main/data/IDPair';
import React from 'react';
import EntityType from 'smarthealth-javascript/EntityType';
import FormFieldMedicalGroupList from 'smarthealth-javascript/FormFieldMedicalGroupList';
import FormFieldType from 'smarthealth-javascript/FormFieldType';
import MedicalGroupListType from 'smarthealth-javascript/MedicalGroupListType';
import medicalGroupList from 'smarthealth-rest-test/medicalgrouplist.json';
import SetEntity from 'test/component/SetEntity';
import SetSession from 'test/component/SetSession';
import {MEMBER_BILL_GOLFALOT} from 'test/data/MedicalGroupMemberAggregateMother';
import FieldTester from 'test/field/FieldTester';
import {fieldUsage} from 'test/field/FieldUsageUtility';

/**
 * Allow debugging of MedicalGroupListField component
 *
 * @author Priyanka 1/03/2019
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2019
 */
storiesOf('Field/MedicalGroupListField', module)
    .add('Care team', () =>
    {
        const field: FormFieldMedicalGroupList = {
            id: 'CareTeam.CareTeam',
            label: 'Care team',
            medicalGroupListType: MedicalGroupListType.PATIENT_WATCH_CARE_TEAM,
            size: 20,
            type: FormFieldType.MedicalGroupList
        };

        const id: IDPair = {
            id: MEMBER_BILL_GOLFALOT.medicalGroup.groupID,
            associatedID: field.medicalGroupListType
        };

        const careTeams = ['Team 1', 'Team 2', 'Team 3'];
        return (
            <SetSession member={MEMBER_BILL_GOLFALOT}>
                <SetEntity type={EntityType.MedicalGroupList} id={id} value={careTeams}>
                    <FieldTester field={field} />
                </SetEntity>
            </SetSession>
        );
    })
    .add('Care model', () =>
    {
        const field: FormFieldMedicalGroupList = {
            id: 'CareTeam.CareModel',
            label: 'Care model',
            medicalGroupListType: MedicalGroupListType.PATIENT_WATCH_CARE_MODEL,
            size: 100,
            type: FormFieldType.MedicalGroupList
        };

        const id: IDPair = {
            id: MEMBER_BILL_GOLFALOT.medicalGroup.groupID,
            associatedID: field.medicalGroupListType
        };

        return (
            <SetSession member={MEMBER_BILL_GOLFALOT}>
                <SetEntity type={EntityType.MedicalGroupList} id={id} value={medicalGroupList}>
                    <FieldTester field={field} />
                </SetEntity>
            </SetSession>
        );
    })
    .add('Care model, initialised', () =>
    {
        const field: FormFieldMedicalGroupList = {
            id: 'CareTeam.CareModel',
            label: 'Care model',
            medicalGroupListType: MedicalGroupListType.PATIENT_WATCH_CARE_MODEL,
            size: 100,
            type: FormFieldType.MedicalGroupList
        };

        const id: IDPair = {
            id: MEMBER_BILL_GOLFALOT.medicalGroup.groupID,
            associatedID: field.medicalGroupListType
        };

        return (
            <SetSession member={MEMBER_BILL_GOLFALOT}>
                <SetEntity type={EntityType.MedicalGroupList} id={id} value={medicalGroupList}>
                    <FieldTester field={field} value="Trial 1" />
                </SetEntity>
            </SetSession>
        );
    })
    .add('Usage', () => fieldUsage(FormFieldType.MedicalGroupList));
