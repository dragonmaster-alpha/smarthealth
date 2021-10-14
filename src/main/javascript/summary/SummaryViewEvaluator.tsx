import AppStore from 'main/store/AppStore';
import ClinicalPermission from 'smarthealth-javascript/ClinicalPermission';
import ObservationGroup from 'smarthealth-javascript/ObservationGroup';

/**
 * Determine visibility of summaries.
 *
 * @author Thompson 7/08/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
class SummaryViewEvaluator
{
    public static isLungFunctionVisible(appStore: AppStore): boolean
    {
        if (!appStore.sessionStore.currentPatientID)
        {
            return false;
        }

        if (!appStore.sessionStore.hasClinicalPermission(ClinicalPermission.ViewLungFunctionSummary))
        {
            return false;
        }

        const { observations } = appStore.entityCache;
        if (!observations.has(ObservationGroup.LungFunction))
        {
            observations.load(ObservationGroup.LungFunction);
            return true;
        }

        return (observations.value(ObservationGroup.LungFunction) !== null)
            ? (observations.value(ObservationGroup.LungFunction).length > 0)
            : true;
    }

    public static isPathologyVisible(appStore: AppStore): boolean
    {
        if (!appStore.sessionStore.currentPatientID)
        {
            return false;
        }

        if (!appStore.sessionStore.hasClinicalPermission(ClinicalPermission.ViewPathologySummary))
        {
            return false;
        }

        // pathology id=0, check /pathology endpoint in JSONDoc
        const { pathology } = appStore.entityCache;
        if (!pathology.has(0))
        {
            pathology.load(0);
            return true;
        }

        return (pathology.value(0) !== null)
            ? (pathology.value(0).tests.length > 0)
            : true;
    }
}

export default SummaryViewEvaluator;
