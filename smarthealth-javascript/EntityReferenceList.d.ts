import EntityType from './EntityType';
import EntityReference from './EntityReference';
/**
 * Transfer object created from Java object au.com.smarthealth.server.rest.data.EntityReferenceList
 * Generated by Maven. See Java class GenerateTypeScript.
 */
interface EntityReferenceList {
    id: string;
    referencedType: EntityType;
    references: EntityReference[];
}
export default EntityReferenceList;
