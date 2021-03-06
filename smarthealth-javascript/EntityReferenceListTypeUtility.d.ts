import EntityReferenceListType from './EntityReferenceListType';
import EntityReference from './EntityReference';
/**
 * Typescript helper for generating EntityReferenceList ids.
 * Derived from EntityReferenceListType.java
 * Generated by Maven. See Java class GenerateTypeScript.
 */
declare class EntityReferenceListTypeUtility {
    static getTemplate(type: EntityReferenceListType): string;
    static buildID(type: EntityReferenceListType, params?: {}): string;
    static buildEntityReference(type: EntityReferenceListType, params?: {}): EntityReference;
}
export default EntityReferenceListTypeUtility;
