import PatientCAPI from './PatientCAPI';
import Audit from './Audit';
import MemberOrGroupID from './MemberOrGroupID';
/**
 * Transfer object created from Java object au.com.smarthealth.server.rest.data.PatientClinicalREST
 * Generated by Maven. See Java class GenerateTypeScript.
 */
interface PatientClinical {
    allergies?: PatientCAPI[];
    allergiesExclusionReason?: string;
    ambulanceFund?: boolean;
    audit?: Audit;
    gp?: MemberOrGroupID;
    medicalAlerts?: PatientCAPI[];
    patientID: number;
    version: number;
}
export default PatientClinical;
