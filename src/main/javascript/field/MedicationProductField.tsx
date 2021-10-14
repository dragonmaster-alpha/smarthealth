import classNames from 'classnames';
import {autobind} from 'core-decorators';
import FieldDropdownButton from 'main/component/FieldDropdownButton';
import MedicationProduct from 'main/component/MedicationProduct';
import MedicationProductIcon from 'main/component/MedicationProductIcon';
import OverlayPanel from 'main/container/OverlayPanel';
import MedicationProductSuggestionList from 'main/field/MedicationProductSuggestionList';
import FieldStateUtility from 'main/utility/FieldStateUtility';
import {action, computed, observable} from 'mobx';
import {inject, observer} from 'mobx-react';
import {InputText} from 'primereact/inputtext';
import React from 'react';
import CodedValue from 'smarthealth-javascript/CodedValue';
import FormFieldFormSpecific from 'smarthealth-javascript/FormFieldFormSpecific';
import BaseFieldOld from './BaseFieldOld';

/**
 * Selection field to browse medication product in the MIMS directory. A medication product is a Product or a Generic.
 *
 * User can:
 * - search for medications in the MIMS directory by typing the product name. Where a list of product search
 * will show.
 * - see their recently selected medication when there are no characters in the input field and the dropdown is
 * shown.
 *
 * This field should not set the recent medication product if a medication was selected from the search list. It is the
 * responsibility of MedicationService.tsx to add the recent medication product.
 *
 * @author Thompson 3/09/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */

@inject('handlers')
@observer
class MedicationProductField extends BaseFieldOld<FormFieldFormSpecific, CodedValue>
{
    public static PREFIX_SEARCH_LENGTH: number = 2;

    @observable
    private productInput: string = '';

    private productInputRef: any = React.createRef();

    @observable
    private showOverlay: boolean = false;

    @computed
    private get medicationSearchString(): string
    {
        if (this.props.value)
        {
            // Allow dropdown list to show other suggestions even if there is a value selected. Instead of showing just
            // the selected value as suggested options in MedicationProductSuggestionList component due to
            // filter.
            return this.props.value.value.substr(0, MedicationProductField.PREFIX_SEARCH_LENGTH);
        }
        else
        {
            return this.productInput;
        }
    }

    @computed
    private get value(): string
    {
        if (this.props.value)
        {
            return this.props.value.value;
        }
        else
        {
            return this.productInput;
        }
    }

    @action.bound
    private onClickOverlayDropdown()
    {
        this.setShowOverlay(!this.showOverlay);
    }

    @autobind
    private onExit(event)
    {
        const userClickedProductInput = this.productInputRef.current.element.contains(event.target);
        if (!userClickedProductInput)
        {
            this.setShowOverlay(false);
        }
    }

    @action.bound
    private onProductInputChange(event)
    {
        if ((event.target.value.length === 1)
            && (this.productInput.length === MedicationProductField.PREFIX_SEARCH_LENGTH))
        {
            // Used for when user remove characters to start a new search
            this.setShowOverlay(false);
        }
        // Set showOverlay to true when >= to cover cases where a user may copy and paste text into input
        else if ((event.target.value.length >= MedicationProductField.PREFIX_SEARCH_LENGTH) && !this.showOverlay)
        {
            this.setShowOverlay(true);
        }
        this.productInput = event.target.value;

        // Allow this.value to display this.productInput string
        if (this.props.value)
        {
            this.onChange({ target: { value: null } });
        }
    }

    @action.bound
    private onProductSelectionChange(value: CodedValue)
    {
        this.onChange(value);
        this.setShowOverlay(false);
    }

    protected renderEditing(): React.ReactNode
    {
        return (
            <div className={classNames('cp-MedicationProductField', {
                'is-invalid': !this.valid,
                'is-field-hover': this.valid,
                'is-disabled': FieldStateUtility.isReadOnly(this.props.fieldState)
            })}>
                <div className="cp-MedicationProductField-field">
                    <span className="cp-MedicationProductField-icon">
                        <MedicationProductIcon codedValue={this.props.value} />
                    </span>
                    <InputText ref={this.productInputRef} className="cp-MedicationProductField-textInput"
                        disabled={FieldStateUtility.isReadOnly(this.props.fieldState)}
                        onChange={this.onProductInputChange} value={this.value} />
                    <FieldDropdownButton onClick={this.onClickOverlayDropdown} />
                </div>
                {
                    this.showOverlay && (
                        <OverlayPanel className="cp-MedicationProductField-overlay" onExit={this.onExit}>
                            <MedicationProductSuggestionList
                                medicationSearchString={this.medicationSearchString}
                                onChange={this.onProductSelectionChange} value={this.props.value} />
                        </OverlayPanel>
                    )
                }
            </div>
        );
    }

    protected renderValue()
    {
        return <MedicationProduct codedValue={this.props.value} />;
    }

    @action.bound
    private setShowOverlay(showOverlay: boolean)
    {
        this.showOverlay = showOverlay;
    }
}

export default MedicationProductField;
