import EntityCache from 'main/store/EntityCache';
import SessionStore from 'main/store/SessionStore';
import {computed} from 'mobx';
import ClinicalPermission from 'smarthealth-javascript/ClinicalPermission';
import ObservationGroup from 'smarthealth-javascript/ObservationGroup';

/**
 * Determine visibility permission of summaries such as checking View Permissions and if summary has data to view.
 *
 * @author Thompson 7/08/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
class SummaryViewPermission
{
    private entityCache: EntityCache;

    private sessionStore: SessionStore;

    constructor(entityCache: EntityCache, sessionStore: SessionStore)
    {
        this.entityCache = entityCache;
        this.sessionStore = sessionStore;
    }

    @computed
    public get lungFunctionButtonVisibility(): boolean
    {
        const lungFunctionViewPermission = this.sessionStore.hasClinicalPermission(
            ClinicalPermission.ViewLungFunctionSummary);
        if (!lungFunctionViewPermission)
        {
            return false;
        }

        if (!this.entityCache.observations.has(ObservationGroup.LungFunction))
        {
            this.entityCache.observations.load(ObservationGroup.LungFunction);
            return true;
        }

        return this.entityCache.observations.value(ObservationGroup.LungFunction) !== null
            ? this.entityCache.observations.value(ObservationGroup.LungFunction).length > 0
            : true;
    }

    @computed
    public get pathologyButtonVisibility(): boolean
    {
        const pathologyViewPermission = this.sessionStore.hasClinicalPermission(
            ClinicalPermission.ViewPathologySummary);
        if (!pathologyViewPermission)
        {
            return false;
        }

        // pathology id=0, check /pathology endpoint in JSONDoc
        if (!this.entityCache.pathology.has(0))
        {
            this.entityCache.pathology.load(0);
            return true;
        }
        return this.entityCache.pathology.value(0) !== null
            ? this.entityCache.pathology.value(0).tests.length > 0
            : true;
    }
}

export default SummaryViewPermission;
