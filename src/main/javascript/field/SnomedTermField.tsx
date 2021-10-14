import lodash from 'lodash';
import {action, observable} from 'mobx';
import {observer} from 'mobx-react';
import {AutoComplete} from 'primereact/autocomplete';
import React from 'react';
import FormFieldSnomedTerm from 'smarthealth-javascript/FormFieldSnomedTerm';
import SnomedTerm from 'smarthealth-javascript/SnomedTerm';
import BaseFieldOld from './BaseFieldOld';

/**
 * Display an auto complete suggestion input to search SNOMED terms.
 *
 * Suggestions will only appear after 3 characters are entered into the input element.
 *
 * TODO finish of class description of once field is finalised.
 *
 * @author Thompson 27/02/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */

@observer
class SnomedTermField extends BaseFieldOld<FormFieldSnomedTerm, SnomedTerm>
{
    @observable
    private showSnomedTermRecents: boolean;

    @observable
    private snomedTermRecents = [{ name: 'aa recent' }, { name: 'ab recent ' }];

    @observable
    private snomedTermSuggestions = [];

    // TODO temporary data to be removed
    @observable
    private snomedTerms = [{ name: 'abc' }, { name: 'abcd' }, { name: 'bcd' }, { name: 'cde' }];

    @action.bound
    private onDropdownClick()
    {
        this.showSnomedTermRecents = lodash.isEmpty(this.props.value);
    }

    @action.bound
    private onSelect()
    {
        this.snomedTermSuggestions = [];
    }

    protected renderEditing(): React.ReactNode
    {
        const suggestions = this.showSnomedTermRecents
            ? this.snomedTermRecents
            : this.snomedTermSuggestions;

        // TODO set width style, get SNOMED subset, only show suggestion after 3 character is entered, field is not name
        return (
            <AutoComplete completeMethod={this.snomedTermSuggestionHandler} dropdown={true} field="name" minLength={3}
                onChange={this.onChange} suggestions={suggestions} value={this.props.value}
                itemTemplate={this.suggestionItemTemplate} onDropdownClick={this.onDropdownClick}
                onSelect={this.onSelect} />
        );
    }

    protected renderValue(): React.ReactNode
    {
        // TODO value.name is temporary, evaluated after finalising SNOMED data structure
        return (
            <>
                {this.props.value && this.props.value.name}
            </>
        );
    }

    @action.bound
    private snomedTermSuggestionHandler(event)
    {
        this.showSnomedTermRecents = false;
        // TODO is filter based on startsWith
        // TODO test and explore variations on when suggestions should show up
        // e.g. if no value, show recents instead of suggestion
        // if theres a selection what should be shown...
        // event.query is an empty string if the user doesn't type a character in the input element.
        // Even if there is a value in the input from a previous selection.
        // The user MUST type minimum length of characters in the input for event.query to not be an empty string.
        const newSuggestions = event.query === ''
            ? []
            : this.snomedTerms.filter(term => term.name.toLowerCase()
                .startsWith(event.query.toLowerCase()));
        this.snomedTermSuggestions = newSuggestions;
    }

    private suggestionItemTemplate(item): React.ReactElement
    {
        // TODO template to render
        return <>{item.name} from template</>;
    }
}

export default SnomedTermField;
