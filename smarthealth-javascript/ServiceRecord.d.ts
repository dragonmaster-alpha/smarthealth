import EntityData from './EntityData';
import ServiceSummary from './ServiceSummary';
/**
 * Transfer object created from Java object au.com.smarthealth.server.rest.data.ServiceRecordREST
 * Generated by Maven. See Java class GenerateTypeScript.
 */
interface ServiceRecord {
    data: EntityData;
    metadata: ServiceSummary;
    version: number;
}
export default ServiceRecord;
