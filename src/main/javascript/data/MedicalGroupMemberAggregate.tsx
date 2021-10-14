import MedicalGroup from 'smarthealth-javascript/MedicalGroup';
import MedicalGroupMember from 'smarthealth-javascript/MedicalGroupMember';
import User from 'smarthealth-javascript/User';

/**
 * Wrapper for results from server/Entity Cache
 *
 * @author Thompson 24/05/2019
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2019
 */
interface MedicalGroupMemberAggregate
{
    medicalGroup: MedicalGroup;
    member: MedicalGroupMember;
    user: User;
}

export default MedicalGroupMemberAggregate;
