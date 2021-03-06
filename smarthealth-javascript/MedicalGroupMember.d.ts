import MemberID from './MemberID';
/**
 * Transfer object created from Java object au.com.smarthealth.server.rest.data.MedicalGroupMemberREST
 * Generated by Maven. See Java class GenerateTypeScript.
 */
interface MedicalGroupMember {
    active?: boolean;
    memberID: MemberID;
    providerNum?: string;
    role?: string;
    speciality?: string;
    version?: number;
}
export default MedicalGroupMember;
