import {css} from '@emotion/core';
import {autobind} from 'core-decorators';
import sort from 'fast-sort';
import SelectionMandatoryField from 'main/component/SelectionMandatoryField';
import FieldContext from 'main/field/FieldContext';
import MedicationFormulationField from 'main/field/MedicationFormulationField';
import MedicationProductField from 'main/field/MedicationProductField';
import {customFieldRendererAdapter, CustomFields, OnFieldChange} from 'main/form/CustomFieldRenderer';
import EditViewFormComponent, {ButtonRenderer, EditViewFormComponentProps} from 'main/form/EditViewFormComponent';
import FieldValidator from 'main/form/FieldValidator';
import ShouldNeverGetHereError from 'main/utility/ShouldNeverGetHereError';
import {action, autorun, computed, observable, runInAction} from 'mobx';
import {inject, observer} from 'mobx-react';
import {Button} from 'primereact/button';
import React from 'react';
import EntityData from 'smarthealth-javascript/EntityData';
import FieldState from 'smarthealth-javascript/FieldState';
import FormField from 'smarthealth-javascript/FormField';
import FormFieldFormSpecific from 'smarthealth-javascript/FormFieldFormSpecific';
import MIMSConstants from 'smarthealth-javascript/MIMSConstants';
import MIMSPack from 'smarthealth-javascript/MIMSPack';

/**
 * Display Medication service with custom Product, Formulation, Pack, PBS and Dosage guide fields. The Medication
 * service has 3 form views which are Cease, Edit and View.
 *
 * When the Medication service record is ceased the service record is not able to be edited the footer action buttons
 * display only the Close button. Otherwise, if the Medication service record is not ceased the service record displays
 * 3 footer action buttons which are Edit, Cease and Close/Cancel.
 *
 * Pack and PBS fields are relational, in that if 1 field value change it will affect the other field dropdown options
 * listing.
 * There are 4 states the Pack and PBS fields can be in and the results are for their respective options:
 * 1. Pack (value empty) & PBS (value empty) -> Pack (show all options) & PBS (show all options)
 * 2. Pack (value empty) & PBS (value populated) -> Pack (show filtered options) & PBS (show all options)
 * 3. Pack (value populated) & PBS (value empty) -> Pack (show all options) & PBS (show filtered options)
 * 4. Pack (value populated) & PBS (value populated) -> Pack (show filtered options) & PBS (show filtered options)
 *
 * For the Dose guide field if there are multiple of the same formulationType in formulations then Dose Guide is empty.
 * This only applies for Generic products.
 *
 * The service will also add a new recent medication product for the Product field only after the service record has
 * been saved.
 *
 * TODO Cease section should not show if the service record Medication is not ceased.
 *
 * https://rm.smarthealth.com.au/smartrm/#!/PV8/FR1734
 *
 * @author Thompson 3/09/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
interface MedicationServiceProps extends EditViewFormComponentProps<EntityData>
{
    // TODO Thompson - you cannot change a common interface - make this the same as every other custom component
    // serviceID: number;
}

// @ts-ignore
const medicationServiceStyle = css({
    display: 'grid',
    gridTemplateColumns: '1fr',
    gridTemplateRows: 'auto 1fr'
});

// @ts-ignore
const mimsLogoStyle = css({
    position: 'absolute',
    top: '3em',
    right: '2em'
});

// .ct-MedicationService {
//     position: relative;
//
// &-mimsLogo {
//         position: absolute;
//         top: 3em;
//         right: 2em;
//     }
//
// &-detailButtons {
//         display: flex;
//         justify-content: flex-end;
//
//         button {
//             margin-right: 0.2em;
//         }
//     }
// }
@inject('handlers', 'sessionStore')
@observer
class MedicationService extends React.Component<MedicationServiceProps>
{
    private doseGuideDisposer: () => void;

    /*
        packOptions and pbsOptions are computed values that need the observable editData.
        NOTE: could not get packOptions and pbsOptions to react to a separate definition of editData.Pack and
        editData.PBS.
        e.g. defined like:
        @observable
        private packEditData: string = editData.Pack;
    */
    private editDataObservableReference: EntityData;

    private packAutorunIsOnFirstRun: boolean = true;

    @observable
    private packs?: MIMSPack[] = null;

    private packsDisposer?: () => void;

    @computed
    private get packOptions(): string[]
    {
        if (!this.packs)
        {
            return [];
        }

        return [
            ...new Set(this.packs
                // Pack options has a relationship with the PBS value.
                .filter(pack => (
                    (this.editDataObservableReference.PBS === null)
                    || (pack.pbs === this.editDataObservableReference.PBS)
                ))
                .map(pack => (pack.details))
            )
        ];
    }

    @computed
    private get pbsOptions(): string[]
    {
        if (!this.packs)
        {
            return [];
        }

        return [
            ...new Set(this.packs
                // PBS options has a relationship with the Pack value.
                .filter(pack => (
                    (this.editDataObservableReference.Pack === null)
                    || (pack.details === this.editDataObservableReference.Pack)
                ))
                .map(pack => (pack.pbs))
            )
        ];
    }

    public componentWillUnmount()
    {
        this.disposePackAutomaticFetcher();
    }

    @action
    private clearPackAndPBSAfterFirstRun()
    {
        if (this.packAutorunIsOnFirstRun)
        {
            // Ignore MobX.autorun immediate first execution because Pack and PBS may already have a value. Otherwise,
            // Pack and PBS values will always be empty after entering edit mode.
            // NOTE: make sure this.packAutorunIsOnFirstRun is set to true when disposing this.packsDisposer.
            this.packAutorunIsOnFirstRun = false;
            return;
        }

        // We need to clear the old values when there is a new Formulation data. Otherwise, the Pack and PBS fields may
        // show stale values and options list may not contain the correct list.
        this.editDataObservableReference.Pack = null;
        this.editDataObservableReference.PBS = null;
    }

    private disposeDoseGuideSetter()
    {
        if (this.doseGuideDisposer)
        {
            this.doseGuideDisposer();
            this.doseGuideDisposer = null;
        }
    }

    private disposePackAutomaticFetcher()
    {
        if (this.packsDisposer)
        {
            this.packsDisposer();
            this.packsDisposer = null;

            this.packAutorunIsOnFirstRun = true;
        }
    }

    private async fetchPacks(editData: EntityData)
    {
        if (editData.Product.codeSet === MIMSConstants.MIMS_Generics_CodeSet)
        {
            const packs = await this.props.handlers.medicationHandler.getGenericFormulationPacks(editData.Product,
                editData.Formulation);
            runInAction(() =>
            {
                this.packs = this.sortPacks(packs);
            });
        }
        else
        {
            const packs = await this.props.handlers.medicationHandler.getProductFormulationPacks(editData.Product,
                editData.Formulation);
            runInAction(() =>
            {
                this.packs = this.sortPacks(packs);
            });
        }
    }

    private initiateDoseGuideAutomaticSetter(editData: EntityData)
    {
        this.doseGuideDisposer = autorun(() =>
        {
            if (editData.Product && editData.Formulation)
            {
                this.setDoseGuide(editData);
            }
        });
    }

    private initiatePacksAutomaticFetcherAndClearValues(editData: EntityData)
    {
        this.disposePackAutomaticFetcher();

        this.packsDisposer = autorun(() =>
        {
            if (editData.Product && editData.Formulation)
            {
                this.clearPackAndPBSAfterFirstRun();

                this.fetchPacks(editData);
            }
        });
    }

    @autobind
    private onClickOpenCeaseMedicationDialog()
    {
        // TODO Thompson fix
        // const productFormulationStrength = `${this.props.data.ProductAndFormulation} ${this.props.data.Strength}`;
        // this.props.sessionStore.modalDialog.show(<MedicationCeaseMedicationDialog
        //     productFormulationStrength={productFormulationStrength} serviceID={this.props.serviceID} />);
    }

    @autobind
    private onFinishEditing()
    {
        this.disposePackAutomaticFetcher();
        this.disposeDoseGuideSetter();
    }

    @autobind
    private async onSaveMedication(serviceRecord): Promise<boolean>
    {
        const successfulSave = await this.props.onSave(serviceRecord);
        if (successfulSave && serviceRecord.Product)
        {
            this.props.handlers.medicationHandler.addRecentMedicationProduct(serviceRecord.Product);
        }

        return successfulSave;
    }

    @action.bound
    private onStartEditing(editData: EntityData)
    {
        this.initiatePacksAutomaticFetcherAndClearValues(editData);

        this.initiateDoseGuideAutomaticSetter(editData);

        this.editDataObservableReference = editData;
    }

    public render(): React.ReactNode
    {
        const customFields: CustomFields<EntityData> = {
            Pack: customFieldRendererAdapter(this.renderPackField),
            PBS: customFieldRendererAdapter(this.renderPBSField),
            Product: customFieldRendererAdapter(this.renderProductField),
            Formulation: customFieldRendererAdapter(this.renderFormulationField)
        };

        const medicationCeased: boolean = this.props.data.Cease && this.props.data.Cease.Ceased;
        const ceaseOptionalButton: { renderer: ButtonRenderer, position: number }[] = medicationCeased
            ? []
            : [{ renderer: this.renderCeaseButton, position: 1 }];
        // TODO render MIMS logo - do this as a form specific field, not something with magic positioning that depends
        // on so many factors
        // return ( <div css={medicationServiceStyle}> <img css={mimsLogoStyle} alt="MIMS Logo"
        // src="assets/MIMS_logo.png" /> <EditViewFormComponent {...this.props} customFields={customFields}
        // extraButtons={ceaseOptionalButton} onFinishEditing={this.onFinishEditing}
        // onStartEditing={this.onStartEditing} onSave={medicationCeased ? null : this.onSaveMedication} /> </div> );
        return <EditViewFormComponent {...this.props} customFields={customFields} extraButtons={ceaseOptionalButton}
            onFinishEditing={this.onFinishEditing} onStartEditing={this.onStartEditing}
            onSave={medicationCeased ? null : this.onSaveMedication} />;
    }

    @autobind
    private renderCeaseButton(editing: boolean): React.ReactNode
    {
        return !editing && <Button label="Cease" onClick={this.onClickOpenCeaseMedicationDialog} />;
    }

    @autobind
    private renderFormulationField(field: FormField, value: any, editing: boolean, disabled: boolean, valid: boolean,
        onFieldChange: OnFieldChange, context: FieldContext, fieldValidator: FieldValidator, data: EntityData,
        fieldState: FieldState): React.ReactNode
    {
        return (
            <MedicationFormulationField context={context} product={data.Product} disabled={disabled} editing={editing}
                field={field as FormFieldFormSpecific} fieldState={fieldState} fieldValidator={fieldValidator}
                onFieldChange={onFieldChange} value={value} />
        );
    }

    @autobind
    private renderPBSField(field: FormField, value: any, editing: boolean, disabled: boolean, valid: boolean,
        onFieldChange: OnFieldChange, context: FieldContext, fieldValidator: FieldValidator, data: EntityData,
        fieldState: FieldState): React.ReactNode
    {
        return <SelectionMandatoryField context={context} options={this.pbsOptions} disabled={disabled}
            editing={editing}
            field={field as FormFieldFormSpecific} fieldState={fieldState} fieldValidator={fieldValidator}
            onFieldChange={onFieldChange} value={value} />;
    }

    @autobind
    private renderPackField(field: FormField, value: any, editing: boolean, disabled: boolean, valid: boolean,
        onFieldChange: OnFieldChange, context: FieldContext, fieldValidator: FieldValidator, data: EntityData,
        fieldState: FieldState): React.ReactNode
    {
        return <SelectionMandatoryField context={context} options={this.packOptions} disabled={disabled}
            editing={editing}
            field={field as FormFieldFormSpecific} fieldState={fieldState} fieldValidator={fieldValidator}
            onFieldChange={onFieldChange} value={value} />;
    }

    private renderProductField(field: FormField, value: any, editing: boolean, disabled: boolean, valid: boolean,
        onFieldChange: OnFieldChange, context: FieldContext, fieldValidator: FieldValidator, data: EntityData,
        fieldState: FieldState): React.ReactNode
    {
        return (
            <MedicationProductField context={context} disabled={disabled} editing={editing}
                field={field as FormFieldFormSpecific} fieldState={fieldState} fieldValidator={fieldValidator}
                onFieldChange={onFieldChange} value={value} />
        );
    }

    private async setDoseGuide(editData: EntityData)
    {
        let doseGuide = null;
        if (editData.Product.codeSet === MIMSConstants.MIMS_Generics_CodeSet)
        {
            const formulations = await this.props.handlers.medicationHandler.getGenericFormulations(editData.Product);
            const formulationsWithFormulationType = formulations.filter(formulation =>
                (editData.Formulation && (formulation.formulationType === editData.Formulation.value))
            );
            // If there are multiple of the same formulationType in formulations then Dose Guide is empty. This only
            // applies for Generic products.
            const genericHasDoseGuide = formulationsWithFormulationType.length === 1;
            // dosage has potential to not be there.
            // e.g. Product "Panadol" has formulations that does not contain dosage. The if statement is to avoid
            // setting doseGuide to an undefined value making it not observable.
            if (genericHasDoseGuide && formulationsWithFormulationType[0].dosage)
            {
                doseGuide = formulationsWithFormulationType[0].dosage;
            }
        }
        else if (editData.Product.codeSet === MIMSConstants.MIMS_Product_CodeSet)
        {
            const formulations = await this.props.handlers.medicationHandler.getProductFormulations(editData.Product);
            const formulation = formulations.find(
                formulation => formulation.formulationCode === Number.parseInt(editData.Formulation.code, 10));
            // dosage has potential to not be there.
            // e.g. Product "Panadol" has formulations that does not contain dosage. The if statement is to avoid
            // setting doseGuide to an undefined value making it not observable.
            if (formulation.dosage)
            {
                doseGuide = formulation.dosage;
            }
        }
        else
        {
            throw new ShouldNeverGetHereError();
        }

        runInAction(() =>
        {
            editData.DoseGuide = doseGuide;
        });
    }

    private sortPacks(packs: MIMSPack[]): MIMSPack[]
    {
        return sort(packs)
            .asc(pack =>
            {
                if (this.editDataObservableReference.Product &&
                    (this.editDataObservableReference.Product.codeSet === MIMSConstants.MIMS_Product_CodeSet))
                {
                    return pack.formulation.sortOrder;
                }
                else
                {
                    return pack.details;
                }
            });
    }
}

export default MedicationService;
