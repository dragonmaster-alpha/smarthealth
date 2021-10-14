import {autobind} from 'core-decorators';
import sort from 'fast-sort';
import MedicationProduct from 'main/component/MedicationProduct';
import MedicationProductField from 'main/field/MedicationProductField';
import StoreProps from 'main/store/StoreProps';
import {action, computed, observable, runInAction} from 'mobx';
import {inject, observer} from 'mobx-react';
import {ListBox} from 'primereact/listbox';
import React from 'react';
import CodedValue from 'smarthealth-javascript/CodedValue';

/**
 * Container component to fetch product search and to handle the logic for what to render in medication list.
 *
 * There are 2 situations where the medication list will be different.
 * 1). If medicationSearchString string property is an empty string then a list of recently prescribed products are
 * displayed.
 *
 * 2). If medicationSearchString string property has 2 characters or more then a list of searched matching products are
 * displayed. Matched products is when the whole medicationSearchString matches the start of the words in
 * CodedValue.value.
 *
 * @author Thompson 6/09/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
interface MedicationProductSuggestionListContainerProps extends StoreProps
{
    medicationSearchString: string;
    onChange: (event) => void;
    value: CodedValue;
}

@inject('handlers')
@observer
class MedicationProductSuggestionList extends React.Component<MedicationProductSuggestionListContainerProps>
{
    private static buildOption(codedValue: CodedValue)
    {
        return ({
            // Added codedValue.code to label because it needs to be unique as they are used as React.keys and
            // there are results with duplicate codedValue.value such as 'as'. We use PrimeReact ListBox itemTemplate
            // to render codedValue.value instead of label, since label has code attached to it.
            label: codedValue.value + codedValue.code,
            value: codedValue
        });
    }

    @observable
    private medicationRecents: CodedValue[] = [];

    @observable
    private medicationSearchResults: CodedValue[] = [];

    @computed
    private get options(): { label: string; value: CodedValue }[]
    {
        if (this.props.medicationSearchString.length >= MedicationProductField.PREFIX_SEARCH_LENGTH)
        {
            const resultsFiltered = this.medicationSearchResults.filter(this.filterByFullWordsAppearance);
            return resultsFiltered.map(MedicationProductSuggestionList.buildOption);
        }
        else if (this.props.medicationSearchString.length === 1)
        {
            // Display empty list if medicationSearchString equals 1 and not the medicationRecents.
            return [];
        }
        else
        {
            return sort(this.medicationRecents)
                .asc(recent => recent.value)
                .map(MedicationProductSuggestionList.buildOption);
        }
    }

    public componentDidMount()
    {
        this.searchMedicationProducts();

        this.fetchRecentMedicationProducts();
    }

    @action
    public componentDidUpdate(prevProps)
    {
        if (prevProps.medicationSearchString !== this.props.medicationSearchString)
        {
            if (this.props.medicationSearchString.substring(0, MedicationProductField.PREFIX_SEARCH_LENGTH)
                    .toLowerCase()
                !== prevProps.medicationSearchString.substring(0, MedicationProductField.PREFIX_SEARCH_LENGTH)
                    .toLowerCase())
            {
                this.searchMedicationProducts();
            }
        }
    }

    private async fetchRecentMedicationProducts()
    {
        const medicationRecents = await this.props.handlers.medicationHandler.getRecentMedicationProducts();
        runInAction(() =>
        {
            this.medicationRecents = medicationRecents;
        });
    }

    @autobind
    private filterByFullWordsAppearance(value: CodedValue): boolean
    {
        const valueLowercase = value.value.toLowerCase();
        const medicationSearchStringLowercase = this.props.medicationSearchString.toLowerCase();
        const fullWordsMatchBeginning = valueLowercase.substring(0,
            medicationSearchStringLowercase.length) === medicationSearchStringLowercase;
        const fullWordsMatch = valueLowercase.includes(` ${medicationSearchStringLowercase}`);
        if (fullWordsMatchBeginning || fullWordsMatch)
        {
            return true;
        }
        else
        {
            return false;
        }
    }

    public render()
    {
        return (
            <ListBox className="cp-MedicationProductField-recentList" itemTemplate={this.renderMedicationProduct}
                onChange={this.props.onChange} options={this.options} value={this.props.value} />
        );
    }

    private renderMedicationProduct(value): React.ReactElement
    {
        return <MedicationProduct codedValue={value.value} />;
    }

    private async searchMedicationProducts()
    {
        if (this.props.medicationSearchString.length >= MedicationProductField.PREFIX_SEARCH_LENGTH)
        {
            const prefix = this.props.medicationSearchString.substr(0, MedicationProductField.PREFIX_SEARCH_LENGTH);
            const searchResult = await this.props.handlers.medicationHandler.searchMedicationProducts(prefix);
            runInAction(() =>
            {
                this.medicationSearchResults = searchResult;
            });
        }
    }
}

export default MedicationProductSuggestionList;
