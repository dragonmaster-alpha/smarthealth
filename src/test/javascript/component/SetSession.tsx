import MedicalGroupMemberAggregate from 'main/data/MedicalGroupMemberAggregate';
import StoreProps from 'main/store/StoreProps';
import {inject} from 'mobx-react';
import * as React from 'react';
import PatientAggregate from 'smarthealth-javascript/PatientAggregate';
import PatientIdentifier from 'smarthealth-javascript/PatientIdentifier';
import PatientIdentifiers from 'smarthealth-javascript/PatientIdentifiers';
import Permissions from 'smarthealth-javascript/Permissions';
import WebUISession from 'smarthealth-javascript/WebUISession';
import {EntityDetails} from 'test/component/SetEntity';
import {allPermissions} from 'test/data/PermissionsMother';

/**
 * Component for Storybook allowing common session states to be set.
 *
 * @author Larry 28/10/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
interface SetSessionProps extends StoreProps
{
    entities?: EntityDetails[];
    hasAlerts?: boolean;
    member?: MedicalGroupMemberAggregate;
    patient?: PatientAggregate;
    permissions?: Permissions;
}

@inject('componentStore', 'entityCache', 'sessionStore')
class SetSession extends React.Component<SetSessionProps>
{
    constructor(props)
    {
        super(props);
        this.setSession();
    }

    public componentDidUpdate(prevProps: Readonly<SetSessionProps>, prevState: Readonly<{}>, snapshot?: any): void
    {
        this.setSession();
    }

    private buildIdentifiers(patientID: number, identifierArray: PatientIdentifier[]): PatientIdentifiers
    {
        const identifiers: PatientIdentifiers = { patientID, identifiers: {} };
        identifierArray.forEach(identifier => identifiers.identifiers[identifier.identifierType] = identifier);
        return identifiers;
    }

    public render(): React.ReactNode
    {
        return this.props.children;
    }

    private setSession()
    {
        const { sessionStore, entityCache, componentStore } = this.props;
        const { member, permissions, patient, entities } = this.props;
        if (member)
        {
            const session: WebUISession = {
                userID: member.user.userID,
                groupID: member.medicalGroup.groupID,
                permissions: permissions || allPermissions(),
                timeZone: member.medicalGroup.timeZone
            };
            sessionStore.setLoggedIn(session);
            entityCache.users.set(member.user.userID, member.user);
            entityCache.medicalGroups.set(member.medicalGroup.groupID, member.medicalGroup);
            entityCache.medicalGroupMembers.set(member.member.memberID, member.member);
            sessionStore.memberAlerts = this.props.hasAlerts ? ['one'] : [];
        }
        else
        {
            sessionStore.loggedOut();
        }

        if (patient)
        {
            const patientID = patient.patient.patientID;
            sessionStore.currentPatientID = patientID;
            entityCache.patients.set(patientID, patient.patient);
            entityCache.patientContacts.set(patientID, patient.contacts);
            entityCache.patientIdentifiers.set(patientID, this.buildIdentifiers(patientID, patient.identifiers));
            entityCache.patientMedicalGroupAssociations.set(
                { id: patientID, associatedID: patient.patientMedicalGroupAssociation.groupID },
                patient.patientMedicalGroupAssociation);
            if (sessionStore.currentGroupID)
            {
                // create an extra association with the current medical group
                entityCache.patientMedicalGroupAssociations.set(
                    { id: patientID, associatedID: sessionStore.currentGroupID },
                    patient.patientMedicalGroupAssociation);
            }
            componentStore.userSidebarCollapsed = true;
            sessionStore.patientAlerts = this.props.hasAlerts ? ['one'] : [];
            componentStore.selectPatientHomePage();
        }
        else
        {
            sessionStore.closePatient();
            componentStore.userSidebarCollapsed = false;
            componentStore.selectUserHomePage();
        }
        if (entities)
        {
            entities.forEach(entity =>
            {
                entityCache.getCache(entity.type)
                    .set(entity.id, entity.value);
            });
        }
    }
}

export default SetSession;
