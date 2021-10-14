import ServiceRecordCategory from './ServiceRecordCategory';
import Program from './Program';
/**
 * Transfer object created from Java object au.com.smarthealth.server.rest.data.ServiceTypeREST
 * Generated by Maven. See Java class GenerateTypeScript.
 */
interface ServiceType {
    abbreviation: string;
    category?: ServiceRecordCategory;
    formDescriptionID: string;
    name: string;
    permissionPerProgram?: boolean;
    program?: Program;
    serviceTypeID: number;
    supportDraft?: boolean;
}
export default ServiceType;
