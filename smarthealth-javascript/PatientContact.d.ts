import Address from './Address';
import Audit from './Audit';
import PersonContactDetails from './PersonContactDetails';
import Name from './Name';
/**
 * Transfer object created from Java object au.com.smarthealth.common.entity.patient.PatientContact
 * Generated by Maven. See Java class GenerateTypeScript.
 */
interface PatientContact {
    address: Address;
    audit?: Audit;
    contactDetails: PersonContactDetails;
    headOfFamily?: boolean;
    id?: number;
    name: Name;
    patientID: number;
    relationship?: string;
    sourcePASID?: number;
    version: number;
}
export default PatientContact;
