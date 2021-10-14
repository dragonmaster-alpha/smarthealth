import EntityReferenceListType from 'smarthealth-javascript/EntityReferenceListType';
import EntityReferenceListTypeUtility from 'smarthealth-javascript/EntityReferenceListTypeUtility';
import EntityType from 'smarthealth-javascript/EntityType';
import MedicalGroup from 'smarthealth-javascript/MedicalGroup';
import MedicalGroupMemberDigest from 'smarthealth-javascript/MedicalGroupMemberDigest';
import Role from 'smarthealth-javascript/Role';
import {EntityDetails} from 'test/component/SetEntity';
import {
    ALL_MEMBER_ENTITIES, ALL_MEMBERS, MEMBER_DOCTOR_DOLITTLE, memberDigest, memberEntityReferenceList
} from 'test/data/MedicalGroupMemberAggregateMother';
import {
    A_BETTER_IMAGE, ALL_MEDICAL_GROUP_ENTITIES, JAY_STREET_MEDICAL_CENTRE, medicalGroupEntityDetails,
    PHILLIP_GENERAL_PRACTICE, PILLS_PHARMACY, ST_VASELINE, ST_VINCENTS_HOSPITAL
} from 'test/data/MedicalGroupMother';
import {USER_PETER_FLOWER} from 'test/data/UserMother';

/**
 * Constants use in MemberField, MedicalGroupField and MemberOrMedicalGroupField stories
 *
 * @author Larry 13/01/2021
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2021
 */

export const MEDICAL_GROUP_AND_RECENTS_ENTITIES: EntityDetails[] = [
    ...ALL_MEDICAL_GROUP_ENTITIES,
    {
        type: EntityType.EntityReferenceList,
        id: EntityReferenceListTypeUtility.buildID(EntityReferenceListType.MedicalGroupRecents),
        value: {
            id: '/medicalgroups/recents',
            referencedEntityType: EntityType.MedicalGroup,
            references: [
                medicalGroupEntityDetails(PILLS_PHARMACY),
                medicalGroupEntityDetails(ST_VASELINE)
            ]
        }
    }
];

export const MEDICAL_GROUP_AND_MANY_RECENTS_ENTITIES: EntityDetails[] = [
    ...ALL_MEDICAL_GROUP_ENTITIES,
    {
        type: EntityType.EntityReferenceList,
        id: EntityReferenceListTypeUtility.buildID(EntityReferenceListType.MedicalGroupRecents),
        value: {
            id: '/medicalgroups/recents',
            referencedEntityType: EntityType.MedicalGroup,
            references: ALL_MEDICAL_GROUP_ENTITIES
        }
    }
];

export const MEMBER_AND_RECENTS_ENTITIES: EntityDetails[] = [
    ...ALL_MEMBER_ENTITIES,
    memberEntityReferenceList([MEMBER_DOCTOR_DOLITTLE])
];

export const MEMBER_AND_MANY_RECENTS_ENTITIES: EntityDetails[] = [
    ...ALL_MEMBER_ENTITIES,
    memberEntityReferenceList(ALL_MEMBERS)
];

function peterFlowerAt(medicalGroup: MedicalGroup): MedicalGroupMemberDigest
{
    return memberDigest({
        medicalGroup,
        user: USER_PETER_FLOWER,
        member: {
            active: true,
            memberID: { userID: USER_PETER_FLOWER.userID, groupID: medicalGroup.groupID },
            role: Role.GP
        }
    });
}

export async function findMedicalGroupMemberByFamilyName(familyNamePrefix: string): Promise<MedicalGroupMemberDigest[]>
{
    if (familyNamePrefix === 'fl')
    {
        return [
            peterFlowerAt(PHILLIP_GENERAL_PRACTICE),
            peterFlowerAt(ST_VINCENTS_HOSPITAL),
            peterFlowerAt(ST_VASELINE),
            peterFlowerAt(A_BETTER_IMAGE),
            peterFlowerAt(PILLS_PHARMACY),
            peterFlowerAt(JAY_STREET_MEDICAL_CENTRE)
        ];
    }
    else
    {
        return [];
    }
}
