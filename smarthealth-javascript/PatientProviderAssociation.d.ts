import MemberID from './MemberID';
/**
 * Transfer object created from Java object au.com.smarthealth.common.entity.patient.PatientProviderAssociation
 * Generated by Maven. See Java class GenerateTypeScript.
 */
interface PatientProviderAssociation {
    expiryDate: Date;
    id: number;
    memberID: MemberID;
    patientID: number;
    serviceID: number;
}
export default PatientProviderAssociation;
