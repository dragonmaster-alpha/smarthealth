import MedicalGroupMemberAggregate from 'main/data/MedicalGroupMemberAggregate';
import MedicalGroup from 'smarthealth-javascript/MedicalGroup';

/**
 * Medical group member or Medical member used in selection fields
 *
 * @author Thompson 7/11/2019
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2019
 */
type MemberOrMedicalGroup = MedicalGroupMemberAggregate | MedicalGroup;

export function isMemberOrMedicalGroup(value: MemberOrMedicalGroup): value is MemberOrMedicalGroup
{
    // @ts-ignore
    return isMedicalGroup(value) || isMedicalGroupMemberAggregate(value);
}

export function isMedicalGroupMemberAggregate(value: any): value is MedicalGroupMemberAggregate
{
    // @ts-ignore
    return value.medicalGroup && value.member && value.user;
}

export function isMedicalGroup(value: any): value is MedicalGroup
{
    // @ts-ignore
    return value.groupID && value.name;
}

export default MemberOrMedicalGroup;
