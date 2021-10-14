import {action, computed, observable} from 'mobx';
import MedicationSummary from 'smarthealth-javascript/MedicationSummary';

/**
 * Medication summary store to keep track of summary filter and selection state.
 *
 * @author Thompson 8/10/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
export enum MedicationSummaryFilterField
{
    'adverseReaction' = 'summaryShowAdverseReactions',
    'allMedication' = 'summaryShowAllMedications'
}

class MedicationSummaryStore
{
    @observable
    public medicationSummarySelected?: MedicationSummary = null;

    @observable
    private summaryShowAdverseReactions: boolean = false;

    @observable
    private summaryShowAllMedications: boolean = false;

    @computed
    public get adverseReactionFilter(): true | null
    {
        // PrimeReact TriStateCheckbox has 3 states, we want to ignore the [X] state which is false and show uncheck
        return this.summaryShowAdverseReactions || null;
    }

    @computed
    public get allMedicationFilter(): true | null
    {
        // PrimeReact TriStateCheckbox has 3 states, we want to ignore the [X] state which is false and show uncheck
        return this.summaryShowAllMedications || null;
    }

    @action
    public setMedicationSummarySelected(medicationSummary: MedicationSummary)
    {
        this.medicationSummarySelected = medicationSummary;
    }

    @action
    public toggleSummaryFilters(toggleField: MedicationSummaryFilterField)
    {
        this[toggleField] = !this[toggleField];

        if (toggleField === MedicationSummaryFilterField.adverseReaction)
        {
            this.summaryShowAllMedications = false;
        }
        else if (toggleField === MedicationSummaryFilterField.allMedication)
        {
            this.summaryShowAdverseReactions = false;
        }

        this.medicationSummarySelected = null;
    }
}

export default MedicationSummaryStore;
