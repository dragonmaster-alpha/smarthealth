import lodash from 'lodash';
import AppStore from 'main/store/AppStore';
import MedicationSummaryStore from 'main/store/MedicationSummaryStore';
import OIDCStore from 'main/store/OIDCStore';
import ServiceRecordListStore from 'main/store/ServiceRecordListStore';
import {action, computed, observable} from 'mobx';
import ClinicalPermission from 'smarthealth-javascript/ClinicalPermission';
import MedicalGroupLocationDigest from 'smarthealth-javascript/MedicalGroupLocationDigest';
import Permissions from 'smarthealth-javascript/Permissions';
import WebUISession from 'smarthealth-javascript/WebUISession';

/**
 * Stores the state of the session with the server.
 * <p>
 * TODO Many properties need to be moved to ComponentStore.
 *
 * @author Larry 02/03/2018
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2018
 */
class SessionStore
{
    @observable
    public advisories = null;

    public readonly appStore: AppStore;

    @observable
    public currentPatientID: number = null;

    @observable
    public location: MedicalGroupLocationDigest = null;

    public medicationSummaryStore: MedicationSummaryStore = null;

    @observable
    public memberAlerts = null;

    private mimsLicenceAccepted: boolean;

    public readonly oidcStore: OIDCStore = new OIDCStore();

    @observable
    public patientAlerts = null;

    @observable
    public permissions: Permissions = null;

    // TODO - Uditha - Move property to appropriate store - Used in the PatientSearchDialog
    @observable
    public purpose: string = null;

    public readonly serviceRecordListStore: ServiceRecordListStore;

    @observable
    public session: WebUISession;

    @observable
    public sessionID = null;

    // TODO - Uditha - Move property to appropriate store - Used in the PatientSearchDialog
    @observable
    public setting: string = null;

    constructor(appStore: AppStore)
    {
        this.appStore = appStore;

        this.setting = null;
        this.serviceRecordListStore = new ServiceRecordListStore(this.appStore);
        this.purpose = null;
    }

    @computed
    public get currentGroupID(): number
    {
        return lodash.isNil(this.session) ? null : this.session.groupID;
    }

    @computed
    public get currentUserID(): number
    {
        return lodash.isNil(this.session) ? null : this.session.userID;
    }

    @computed
    public get loggedIn(): boolean
    {
        return !lodash.isNil(this.currentUserID) && !lodash.isNil(this.currentGroupID);
    }

    @computed
    public get memberAlertCount(): number
    {
        return Array.isArray(this.memberAlerts) ? this.memberAlerts.length : 0;
    }

    @computed
    public get patientAlertCount(): number
    {
        return Array.isArray(this.patientAlerts) ? this.patientAlerts.length : 0;
    }

    @action
    private clearSession()
    {
        this.sessionID = null;
        this.session = null;
        this.location = null;
        this.memberAlerts = null;
        this.oidcStore.groupsAndLocations = null;
        this.mimsLicenceAccepted = null;
    }

    @action
    public closePatient(): void
    {
        this.currentPatientID = null;
        this.medicationSummaryStore = null;
        this.patientAlerts = null;
        this.serviceRecordListStore.clear();
    }

    public hasAnyClinicalPermission(permissions: ClinicalPermission[]): boolean
    {
        if (!this.permissions || !this.permissions.clinical)
        {
            return false;
        }
        const { clinical } = this.permissions;
        for (let i = 0; i < permissions.length; i += 1)
        {
            if (clinical.includes(permissions[i]))
            {
                return true;
            }
        }
        return false;
    }

    public hasClinicalPermission(permission: ClinicalPermission): boolean
    {
        return this.permissions && this.permissions.clinical && this.permissions.clinical.includes(permission);
    }

    public async isMIMSLicenceAccepted(): Promise<boolean>
    {
        if (lodash.isNil(this.mimsLicenceAccepted))
        {
            this.mimsLicenceAccepted = await this.appStore.handlers.medicationHandler.hasAcceptedMIMSLicence();
        }

        return this.mimsLicenceAccepted;
    }

    @action
    public loggedOut()
    {
        window.sessionStorage.clear();
        this.sessionID = null;
        this.appStore.handlers.setAuthToken(null);
        this.oidcStore.setError('Logged out');
        this.closePatient();
        this.clearSession();
    }

    @action
    public openedPatient(patientID: number)
    {
        this.currentPatientID = patientID;
    }

    @action
    public setLocation(location: MedicalGroupLocationDigest)
    {
        this.location = location;
    }

    @action
    public setLoggedIn(webUISession: WebUISession)
    {
        this.permissions = webUISession.permissions;
        this.session = webUISession;
    }

    @action
    public setPurposeAndSettings(purpose: string, setting: string)
    {
        this.purpose = purpose;
        this.setting = setting;
    }

    @action
    public setUnauthorised(reason: string)
    {
        window.sessionStorage.clear();
        this.sessionID = null;
        this.appStore.handlers.setAuthToken(null);
        this.oidcStore.setError(reason || 'This session is no longer active. Please log in again.');
        this.closePatient();
        this.clearSession();
    }
}

export default SessionStore;
