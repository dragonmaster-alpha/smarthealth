import {css} from '@emotion/core';
import {autobind} from 'core-decorators';
import {colour, font} from 'main/application/ThemeConstants';
import Button from 'main/component/Button';
import Entities, {EntityReferences} from 'main/component/Entities';
import EntityList from 'main/component/EntityList';
import FilterComponent from 'main/component/FilterComponent';
import {TableRow} from 'main/data/TableData';
import MedicalGroupSearchDialog from 'main/dialog/MedicalGroupSearchDialog';
import SimpleFieldContext from 'main/field/SimpleFieldContext';
import SelectionTableFieldComponent from 'main/fieldcomponent/SelectionTableFieldComponent';
import FormContext from 'main/form/FormContext';
import StoreProps from 'main/store/StoreProps';
import {grid, px} from 'main/utility/StyleUtility';
import {action, observable} from 'mobx';
import {inject, observer} from 'mobx-react';
import React from 'react';
import EntityReferenceListType from 'smarthealth-javascript/EntityReferenceListType';
import EntityReferenceListTypeUtility from 'smarthealth-javascript/EntityReferenceListTypeUtility';
import EntityType from 'smarthealth-javascript/EntityType';
import FormDescription from 'smarthealth-javascript/FormDescription';
import MedicalGroup from 'smarthealth-javascript/MedicalGroup';

/**
 * Dropdown to allow selection of a medical group
 *
 * @author Larry 15/01/2021
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2021
 */
interface MedicalGroupSelectionOverlayProps extends StoreProps
{
    onSelection: (groupID: number) => void;
}

const dropdownStyle = css({
    color: colour.text,
    font: font.text,
    ...grid('auto', '1fr auto'),
    maxHeight: '300px',
    minWidth: '400px',
    padding: px(8),
    '>div:last-of-type': {
        alignItems: 'center',
        display: 'flex',
        gap: '16px',
        justifyContent: 'space-between',
        marginTop: '4px'
    }
});

@inject('appStore')
@observer
class MedicalGroupSelectionOverlay extends React.Component<MedicalGroupSelectionOverlayProps>
{
    @observable
    private filter: string = '';

    @observable
    private filterLowerCase: string = '';

    @autobind
    private matches(medicalGroup: MedicalGroup): boolean
    {
        return this.matchesStartWord(medicalGroup.name);
    }

    private matchesStart(string: string)
    {
        return string.toLowerCase()
            .startsWith(this.filterLowerCase);
    }

    private matchesStartWord(string: string)
    {
        return string.split(' ')
            .some(word => this.matchesStart(word));
    }

    @action.bound
    private onFilterChange(value: string)
    {
        this.filter = value;
        this.filterLowerCase = this.filter.toLowerCase();
    }

    @autobind
    private onTableSelection(row: TableRow)
    {
        const medicalGroup = row as MedicalGroup;
        this.props.onSelection(medicalGroup && medicalGroup.groupID);
    }

    public render(): React.ReactNode
    {
        const entities: EntityReferences = {
            recents: EntityReferenceListTypeUtility.buildEntityReference(
                EntityReferenceListType.MedicalGroupRecents),
            form: { id: 'Dropdown.MedicalGroup', type: EntityType.FormDescription }
        };
        return <Entities entities={entities} render={({ recents, form }) =>
        {
            return <EntityList<MedicalGroup> references={recents} render={medicalGroups =>
            {
                return this.renderOverlay(medicalGroups, form);
            }} />;
        }} />;

    }

    private renderOverlay(medicalGroups: MedicalGroup[], form: FormDescription)
    {
        const filteredMedicalGroups = (this.filterLowerCase && medicalGroups)
            ? medicalGroups.filter(this.matches)
            : medicalGroups;

        const tableFormContext = FormContext.build(this.props.appStore, form);
        const tableContext = SimpleFieldContext.buildFromID(tableFormContext, 'groups');

        return (
            <div css={dropdownStyle}>
                <SelectionTableFieldComponent context={tableContext} value={filteredMedicalGroups}
                    onSelection={this.onTableSelection} emptyText="No matching Medical Group found" />
                <div>
                    <FilterComponent value={this.filter} onValueChange={this.onFilterChange} />
                    <Button title="Search ..." small={true} onClick={() => this.showSearchDialog()} />
                </div>
            </div>
        );
    }

    private showSearchDialog()
    {
        this.props.appStore.componentStore.modalDialog.show(
            <MedicalGroupSearchDialog onSelect={this.props.onSelection} />
        );
    }

}

export default MedicalGroupSelectionOverlay;
