import Entities, {EntityReferences} from 'main/component/Entities';
import {BaseFieldProps} from 'main/field/BaseField';
import React from 'react';
import EntityType from 'smarthealth-javascript/EntityType';
import FormFieldMember from 'smarthealth-javascript/FormFieldMember';
import MemberID from 'smarthealth-javascript/MemberID';
import MemberField from './MemberField';

/**
 * Fetch MedicalGroupMemberAggregate to be rendered
 *
 * @author Thompson 31/07/2019
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2019
 */
class MemberEntityField extends React.Component<BaseFieldProps<FormFieldMember, MemberID>>
{
    public render(): React.ReactNode
    {
        const memberID: MemberID = this.props.value;
        const entities: EntityReferences = {};
        if (memberID)
        {
            entities.medicalGroup = { id: memberID.groupID, type: EntityType.MedicalGroup };
            entities.member = { id: memberID, type: EntityType.MedicalGroupMember };
            entities.user = { id: memberID.userID, type: EntityType.User };
        }
        return (
            <Entities entities={entities} render={(member) => (
                <MemberField context={this.props.context} onFieldChange={this.props.onFieldChange} value={member} />
            )} />
        );
    }
}

export default MemberEntityField;
