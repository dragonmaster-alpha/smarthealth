import lodash from 'lodash';
import MedicalGroupMemberAggregate from 'main/data/MedicalGroupMemberAggregate';
import EntityReferenceListType from 'smarthealth-javascript/EntityReferenceListType';
import EntityReferenceListTypeUtility from 'smarthealth-javascript/EntityReferenceListTypeUtility';
import EntityType from 'smarthealth-javascript/EntityType';
import MedicalGroupMemberDigest from 'smarthealth-javascript/MedicalGroupMemberDigest';
import MemberID from 'smarthealth-javascript/MemberID';
import Role from 'smarthealth-javascript/Role';
import {EntityDetails} from 'test/component/SetEntity';
import {
    JAY_STREET_MEDICAL_CENTRE, medicalGroupDigest, medicalGroupEntityDetails, ST_VASELINE, ST_VINCENTS_HOSPITAL
} from 'test/data/MedicalGroupMother';
import {
    USER_BARNEY_STINSON, USER_BILL_GOLFALOT, USER_DOCTOR_DOLITTLE, USER_JEMMA_HULL, USER_MARSHALL_ERIKSEN,
    USER_MARSHALL_STINSON, USER_PETER_FLOWER, USER_TED_ERIKSEN, USER_TED_MOSBY, USER_WILLIAM_WENG, userDigest
} from 'test/data/UserMother';

/**
 * Medical Groups Member for testing
 *
 * @author Thompson 24/05/2019
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2019
 */
export function memberDigest(member: MedicalGroupMemberAggregate): MedicalGroupMemberDigest
{
    return {
        userDigest: userDigest(member.user),
        medicalGroupDigest: medicalGroupDigest(member.medicalGroup),
        memberID: member.member.memberID,
        providerNumber: member.member.providerNum,
        role: member.member.role && Role[member.member.role],
        speciality: member.member.speciality
    };
}

export function memberEntityDetails(member: MedicalGroupMemberAggregate): EntityDetails[]
{
    return [
        medicalGroupEntityDetails(member.medicalGroup),
        { type: EntityType.User, id: member.user.userID, value: member.user },
        { type: EntityType.MedicalGroupMember, id: member.member.memberID, value: member.member }
    ];
}

export function memberEntityReferenceList(members: MedicalGroupMemberAggregate[]): EntityDetails
{
    const references = members.map(member => ({
        type: EntityType.MedicalGroupMember,
        id: member.medicalGroup.groupID,
        associatedID: member.user.userID
    }));

    return {
        type: EntityType.EntityReferenceList,
        id: EntityReferenceListTypeUtility.buildID(EntityReferenceListType.MedicalGroupMemberRecents),
        value: {
            references,
            id: EntityReferenceListTypeUtility.buildID(EntityReferenceListType.MedicalGroupMemberRecents),
            referencedEntityType: EntityType.MedicalGroupMember
        }
    };
}

export const MEMBERID_BILL_GOLFALOT: MemberID = {
    groupID: ST_VINCENTS_HOSPITAL.groupID,
    userID: USER_BILL_GOLFALOT.userID
};

export const MEMBER_BILL_GOLFALOT: MedicalGroupMemberAggregate = {
    user: USER_BILL_GOLFALOT,
    medicalGroup: ST_VINCENTS_HOSPITAL,
    member: {
        active: true,
        memberID: MEMBERID_BILL_GOLFALOT,
        providerNum: '123456AF',
        role: 'Medical Practitioner'
    }
};

export const MEMBER_DOCTOR_DOLITTLE: MedicalGroupMemberAggregate = {
    user: USER_DOCTOR_DOLITTLE,
    medicalGroup: ST_VASELINE,
    member: {
        active: true,
        memberID: { groupID: ST_VASELINE.groupID, userID: USER_DOCTOR_DOLITTLE.userID },
        providerNum: '123456AF',
        role: 'Medical Practitioner'
    }
};

export const MEMBER_BARNEY_STINSON: MedicalGroupMemberAggregate = {
    user: USER_BARNEY_STINSON,
    medicalGroup: ST_VASELINE,
    member: {
        active: true,
        memberID: { groupID: ST_VASELINE.groupID, userID: USER_BARNEY_STINSON.userID },
        providerNum: '300',
        role: 'Specialist'
    }
};

export const MEMBER_TED_ERIKSEN: MedicalGroupMemberAggregate = {
    user: USER_TED_ERIKSEN,
    medicalGroup: ST_VASELINE,
    member: {
        active: true,
        memberID: { groupID: ST_VASELINE.groupID, userID: USER_TED_ERIKSEN.userID },
        providerNum: '400',
        role: 'Specialist'
    }
};

export const MEMBER_TED_MOSBY: MedicalGroupMemberAggregate = {
    user: USER_TED_MOSBY,
    medicalGroup: ST_VASELINE,
    member: {
        active: true,
        memberID: { groupID: ST_VASELINE.groupID, userID: USER_TED_MOSBY.userID },
        providerNum: '400',
        role: 'Specialist'
    }
};

export const MEMBER_MARSHALL_ERIKSEN: MedicalGroupMemberAggregate = {
    user: USER_MARSHALL_ERIKSEN,
    medicalGroup: ST_VASELINE,
    member: {
        active: true,
        memberID: { groupID: ST_VASELINE.groupID, userID: USER_MARSHALL_ERIKSEN.userID },
        providerNum: '500',
        role: 'Specialist'
    }
};

export const MEMBER_MARSHALL_STINSON: MedicalGroupMemberAggregate = {
    user: USER_MARSHALL_STINSON,
    medicalGroup: ST_VASELINE,
    member: {
        active: true,
        memberID: { groupID: ST_VASELINE.groupID, userID: USER_MARSHALL_STINSON.userID },
        providerNum: '500',
        role: 'Specialist'
    }
};

export const MEMBER_JEMMA_HULL: MedicalGroupMemberAggregate = {
    user: USER_JEMMA_HULL,
    medicalGroup: JAY_STREET_MEDICAL_CENTRE,
    member: {
        active: true,
        memberID: { groupID: JAY_STREET_MEDICAL_CENTRE.groupID, userID: USER_JEMMA_HULL.userID },
        role: Role.GP
    }
};

export const MEMBER_PETER_FLOWER: MedicalGroupMemberAggregate = {
    user: USER_PETER_FLOWER,
    medicalGroup: ST_VINCENTS_HOSPITAL,
    member: {
        active: true,
        memberID: { groupID: ST_VINCENTS_HOSPITAL.groupID, userID: USER_PETER_FLOWER.userID },
        role: 'General Practitioner'
    }
};

export const MEMBER_WILLIAM_WENG: MedicalGroupMemberAggregate = {
    user: USER_WILLIAM_WENG,
    medicalGroup: ST_VINCENTS_HOSPITAL,
    member: {
        active: true,
        memberID: { groupID: ST_VINCENTS_HOSPITAL.groupID, userID: USER_WILLIAM_WENG.userID },
        role: 'General Practitioner'
    }
};

export const ALL_MEMBERS = [MEMBER_BILL_GOLFALOT, MEMBER_DOCTOR_DOLITTLE, MEMBER_BARNEY_STINSON, MEMBER_TED_ERIKSEN,
    MEMBER_TED_MOSBY, MEMBER_MARSHALL_ERIKSEN, MEMBER_MARSHALL_STINSON, MEMBER_JEMMA_HULL, MEMBER_PETER_FLOWER,
    MEMBER_WILLIAM_WENG];

export const ALL_MEMBER_ENTITIES = lodash.flatten(ALL_MEMBERS.map(member => memberEntityDetails(member)));
