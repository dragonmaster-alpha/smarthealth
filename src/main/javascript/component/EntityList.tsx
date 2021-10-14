import {Trans} from '@lingui/react';
import Loading from 'main/component/Loading';
import MedicalGroupMemberAggregate from 'main/data/MedicalGroupMemberAggregate';
import StoreProps from 'main/store/StoreProps';
import {CachedObject, CachedObjectState} from 'main/utility/Cache';
import {toJS} from 'mobx';
import {inject, observer} from 'mobx-react';
import React from 'react';
import EntityReference from 'smarthealth-javascript/EntityReference';
import EntityReferenceList from 'smarthealth-javascript/EntityReferenceList';
import EntityType from 'smarthealth-javascript/EntityType';
import MedicalGroup from 'smarthealth-javascript/MedicalGroup';
import MedicalGroupMember from 'smarthealth-javascript/MedicalGroupMember';
import MemberID from 'smarthealth-javascript/MemberID';
import User from 'smarthealth-javascript/User';

/**
 * Resolve the entities in an EntityReferenceList
 *
 * @author Larry 17/10/2019
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2019
 */
interface EntityListProps<T> extends StoreProps
{
    references: EntityReferenceList;
    render: (values: T[]) => React.ReactNode;
}

@inject('entityCache')
@observer
class EntityList<T> extends React.Component<EntityListProps<T>>
{
    private get(reference: EntityReference)
    {
        if (reference.type === EntityType.MedicalGroupMember)
        {
            return this.getMedicalGroupMemberAggregate(reference);
        }
        else
        {
            return this.props.entityCache.get(reference);
        }
    }

    private getMedicalGroupMemberAggregate(reference: EntityReference): CachedObject<MemberID,
        MedicalGroupMemberAggregate>
    {
        const memberID: MemberID = { userID: reference.associatedID, groupID: reference.id };
        const medicalGroup: CachedObject<number, MedicalGroup> = this.props.entityCache.medicalGroups.get(
            memberID.groupID);
        const user: CachedObject<number, User> = this.props.entityCache.users.get(memberID.userID);
        const member: CachedObject<MemberID, MedicalGroupMember> = this.props.entityCache.medicalGroupMembers.get(
            memberID);

        const cachedObject = new CachedObject<MemberID, MedicalGroupMemberAggregate>(memberID);

        if (medicalGroup.error || member.error || user.error)
        {
            cachedObject.state = CachedObjectState.error;
        }
        else if (!medicalGroup.loaded || !member.loaded || !user.loaded)
        {
            cachedObject.state = CachedObjectState.loading;
        }
        else
        {
            const aggregate: MedicalGroupMemberAggregate = {
                medicalGroup: medicalGroup.value, member: member.value, user: user.value
            };
            cachedObject.setValue(aggregate);
        }
        return cachedObject;
    }

    public render()
    {
        if (!this.props.references)
        {
            return this.props.render(null);
        }

        const references = toJS(this.props.references);
        const values = [];
        for (const reference of references.references)
        {
            const cachedObject = this.get(reference);
            if (cachedObject.error)
            {
                return <><Trans>Error loading
                    entity</Trans>: {reference.type}, {reference.id}, {reference.associatedID}</>;
            }
            else if (!cachedObject.loaded)
            {
                return <Loading />;
            }
            values.push(cachedObject.value);
        }

        return this.props.render(values);
    }
}

export default EntityList;
