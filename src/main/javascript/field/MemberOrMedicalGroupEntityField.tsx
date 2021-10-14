import Entities, {EntityReferences} from 'main/component/Entities';
import {BaseFieldProps} from 'main/field/BaseField';
import ShouldNeverGetHereError from 'main/utility/ShouldNeverGetHereError';
import React from 'react';
import EntityType from 'smarthealth-javascript/EntityType';
import FormFieldMember from 'smarthealth-javascript/FormFieldMember';
import MemberOrGroupID from 'smarthealth-javascript/MemberOrGroupID';
import MemberOrMedicalGroupField from './MemberOrMedicalGroupField';

/**
 * Entity to fetch MemberOrMedicalGroup to be rendered
 *
 * @author Thompson 4/11/2019
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2019
 */
class MemberOrMedicalGroupEntityField extends React.Component<BaseFieldProps<FormFieldMember, MemberOrGroupID>>
{
    public render()
    {
        const { value } = this.props;

        if (!value || value.groupID || value.memberID)
        {
            const entities: EntityReferences = {};
            if (value && value.memberID)
            {
                entities.medicalGroup = { id: value.memberID.groupID, type: EntityType.MedicalGroup };
                entities.member = { id: value.memberID, type: EntityType.MedicalGroupMember };
                entities.user = { id: value.memberID.userID, type: EntityType.User };
            }
            else if (value && value.groupID)
            {
                entities.medicalGroup = { id: value.groupID, type: EntityType.MedicalGroup };
            }

            return (
                <Entities entities={entities} render={(data) =>
                {
                    const memberOrMedicalGroupData = (value && value.groupID) ? { ...data.medicalGroup } : data;
                    return (
                        <MemberOrMedicalGroupField context={this.props.context} onFieldChange={this.props.onFieldChange}
                            value={memberOrMedicalGroupData} />
                    );
                }} />
            );
        }
        else
        {
            throw new ShouldNeverGetHereError();
        }
    }
}

export default MemberOrMedicalGroupEntityField;
