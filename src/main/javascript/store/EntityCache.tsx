import LOG from 'loglevel';
import IDPair from 'main/data/IDPair';
import IDType from 'main/data/IDType';
import AppStore from 'main/store/AppStore';
import HandlerStore from 'main/store/HandlerStore';
import Cache, {CachedObjectLoader} from 'main/utility/Cache';
import SubscriptionService from 'main/utility/SubscriptionService';
import {action, observable} from 'mobx';
import EntityReference from 'smarthealth-javascript/EntityReference';
import EntityReferenceList from 'smarthealth-javascript/EntityReferenceList';
import EntityType from 'smarthealth-javascript/EntityType';
import FormDescription from 'smarthealth-javascript/FormDescription';
import MedicalGroup from 'smarthealth-javascript/MedicalGroup';
import MedicalGroupMember from 'smarthealth-javascript/MedicalGroupMember';
import MedicationSummary from 'smarthealth-javascript/MedicationSummary';
import MemberID from 'smarthealth-javascript/MemberID';
import Observation from 'smarthealth-javascript/Observation';
import ObservationGroup from 'smarthealth-javascript/ObservationGroup';
import PathologySummaryData from 'smarthealth-javascript/PathologySummaryData';
import Patient from 'smarthealth-javascript/Patient';
import PatientClinical from 'smarthealth-javascript/PatientClinical';
import PatientContact from 'smarthealth-javascript/PatientContact';
import PatientFamilySocial from 'smarthealth-javascript/PatientFamilySocial';
import PatientIdentifiers from 'smarthealth-javascript/PatientIdentifiers';
import PatientMedicalGroupAssociation from 'smarthealth-javascript/PatientMedicalGroupAssociation';
import PatientPAS from 'smarthealth-javascript/PatientPAS';
import PatientProviderAssociation from 'smarthealth-javascript/PatientProviderAssociation';
import ServiceRecord from 'smarthealth-javascript/ServiceRecord';
import ServiceType from 'smarthealth-javascript/ServiceType';
import SummaryType from 'smarthealth-javascript/SummaryType';
import User from 'smarthealth-javascript/User';
import ValueSet from 'smarthealth-javascript/ValueSet';

/**
 * MobX store containing entity caches
 *
 * @author Larry 6/12/2018
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2018
 */

class EntityCache
{
    private allCaches: Map<EntityType, Cache<any, any>> = new Map();

    private readonly appStore: AppStore;

    @observable
    public entityReferenceLists: Cache<string, EntityReferenceList>;

    @observable
    public formDescriptions: Cache<string, FormDescription>;

    @observable
    public medicalGroupLists: Cache<IDPair, String[]>;

    @observable
    public medicalGroupMembers: Cache<MemberID, MedicalGroupMember>;

    @observable
    public medicalGroups: Cache<number, MedicalGroup>;

    @observable
    public medicationSummary: Cache<number, MedicationSummary>;

    @observable
    public observations: Cache<ObservationGroup, Observation[]>;

    @observable
    public pathology: Cache<number, PathologySummaryData>;

    @observable
    private patientCaches: Cache<any, any>[] = [];

    @observable
    public patientClinical: Cache<number, PatientClinical>;

    @observable
    public patientContacts: Cache<number, PatientContact[]>;

    @observable
    public patientFamilySocial: Cache<number, PatientFamilySocial>;

    @observable
    public patientIdentifiers: Cache<number, PatientIdentifiers>;

    @observable
    public patientMedicalGroupAssociations: Cache<IDPair, PatientMedicalGroupAssociation>;

    @observable
    public patientPAS: Cache<number, PatientPAS>;

    @observable
    public patientProviderAssociations: Cache<number, PatientProviderAssociation[]>;

    @observable
    public patients: Cache<number, Patient>;

    @observable
    public serviceRecord: Cache<number, ServiceRecord>;

    @observable
    public serviceTypes: Cache<number, ServiceType>;

    @observable
    public summary: Cache<SummaryType, { [key: string]: any }>;

    @observable
    public users: Cache<number, User>;

    @observable
    public valueSets: Cache<string, ValueSet>;

    constructor(appStore: AppStore, handlers: HandlerStore)
    {
        this.appStore = appStore;

        this.entityReferenceLists = this.initPatientCache(EntityType.EntityReferenceList,
            (key: string) => (handlers.entityReferenceListHandler.getEntityReferenceList(key)));
        this.formDescriptions = this.initCache(EntityType.FormDescription,
            (key: string) => (handlers.formDescriptionHandler.getFormDescription(key)));
        this.medicalGroupLists = this.initCache(EntityType.MedicalGroupList,
            (key: IDPair) => (handlers.medicalGroupHandler.getMedicalGroupList(key)));
        this.medicalGroups = this.initCache(EntityType.MedicalGroup,
            (key: number) => (handlers.medicalGroupHandler.getMedicalGroup(key)));
        this.medicalGroupMembers = this.initCache(EntityType.MedicalGroupMember,
            (key: MemberID) => (handlers.medicalGroupMemberHandler.getMedicalGroupMember(key)));
        this.medicationSummary = this.initPatientCache(EntityType.MedicationSummary,
            (key: number) => handlers.medicationHandler.getMedicationSummary(key));
        this.observations = this.initPatientCache(EntityType.Observations,
            (key: ObservationGroup) => (handlers.observationsHandler.getObservations(key)));
        this.pathology = this.initPatientCache(EntityType.Pathology,
            () => (handlers.pathologyHandler.getPathology()));
        this.patients = this.initPatientCache(EntityType.Patient,
            (key: number) => (handlers.patientHandler.getPatient(key)));
        this.patientClinical = this.initPatientCache(EntityType.PatientClinical,
            (key: number) => (handlers.patientHandler.getPatientClinical(key)));
        this.patientContacts = this.initPatientCache(EntityType.PatientContacts,
            (key: number) => (handlers.patientHandler.getPatientContacts(key)));
        this.patientFamilySocial = this.initPatientCache(EntityType.PatientFamilySocial,
            (key: number) => (handlers.patientHandler.getPatientFamilySocial(key)));
        this.patientIdentifiers = this.initPatientCache(EntityType.PatientIdentifiers,
            (key: number) => (handlers.patientHandler.getPatientIdentifiers(key)));
        this.patientMedicalGroupAssociations = this.initPatientCache(EntityType.PatientMedicalGroupAssociation,
            (key: IDPair) => handlers.patientHandler.getPatientMedicalGroupAssociation(key));
        this.patientProviderAssociations = this.initPatientCache(EntityType.PatientProviderAssociation,
            (key: number) => (handlers.patientHandler.getPatientProviders(key)));
        this.patientPAS = this.initPatientCache(EntityType.PatientPAS,
            (key: number) => handlers.patientHandler.getPatientPAS(key));
        this.serviceRecord = this.initPatientCache(EntityType.ServiceRecord,
            (key: number) => handlers.serviceRecordHandler.getServiceRecord(key));
        this.serviceTypes = this.initCache(EntityType.ServiceType,
            (key: number) => (handlers.serviceTypeHandler.getServiceType(key)));
        this.summary = this.initPatientCache(EntityType.Summary,
            (key: SummaryType) => handlers.summaryHandler.getSummary(key));
        this.users = this.initCache(EntityType.User,
            (key: number) => (handlers.userHandler.getUser(key)));
        this.valueSets = this.initCache(EntityType.ValueSet,
            (key: string) => (handlers.valueSetHandler.getValueSet(key)));
    }

    @action
    public clearAll()
    {
        this.allCaches.forEach(cache => (cache.clear()));
    }

    @action
    public clearPatient()
    {
        this.patientCaches.forEach(cache => (cache.clear()));
    }

    @action
    public entityChanged(reference: EntityReference)
    {
        if (reference.associatedID)
        {
            LOG.debug(`Entity changed: ${reference.type} ${reference.id},${reference.associatedID}`);
            this.getCache(reference.type)
                .invalidate({ id: reference.id, associatedID: reference.associatedID });
        }
        else
        {
            LOG.debug(`Entity changed: ${reference.type} ${reference.id}`);
            this.getCache(reference.type)
                .invalidate(reference.id);
        }
    }

    public get(reference: EntityReference)
    {
        if (reference.associatedID)
        {
            return this.getCache(reference.type)
                .get({ id: reference.id, associatedID: reference.associatedID });
        }
        else
        {
            return this.getCache(reference.type)
                .get(reference.id);
        }
    }

    public getCache(type: EntityType): Cache<any, any>
    {
        if (!this.allCaches.has(type))
        {
            throw new Error(`No cache found for entity type: ${type}`);
        }
        return this.allCaches.get(type);
    }

    private initCache<I extends IDType, T>(
        entityType: EntityType, objectLoaderFunction: CachedObjectLoader<I, T>): Cache<I, T>
    {
        const subscriptionService = new SubscriptionService(entityType, this.appStore.handlers.websocketHandler);
        const cache = new Cache<I, T>(objectLoaderFunction, subscriptionService);
        this.allCaches.set(entityType, cache);
        return cache;
    }

    private initPatientCache<I extends IDType, T>(
        entityType: EntityType, objectLoaderFunction: CachedObjectLoader<I, T>): Cache<I, T>
    {
        const cache = this.initCache(entityType, objectLoaderFunction);
        this.patientCaches.push(cache);
        return cache;
    }
}

export default EntityCache;
