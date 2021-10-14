import {css} from '@emotion/core';
import {autobind} from 'core-decorators';
import {colour, font} from 'main/application/ThemeConstants';
import Button from 'main/component/Button';
import Entities, {EntityReferences} from 'main/component/Entities';
import EntityList from 'main/component/EntityList';
import FilterComponent from 'main/component/FilterComponent';
import MedicalGroupMemberAggregate from 'main/data/MedicalGroupMemberAggregate';
import {TableRow} from 'main/data/TableData';
import MedicalGroupMemberSearchDialog from 'main/dialog/MedicalGroupMemberSearchDialog';
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
import MemberID from 'smarthealth-javascript/MemberID';

/**
 * Dropdown to allow selection of Medical Group Member
 *
 * @author Larry 13/01/2021
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2021
 */
interface MemberSelectionOverlayProps extends StoreProps
{
    onSelection: (memberID: MemberID) => void;
}

const dropdownStyle = css({
    color: colour.text,
    font: font.text,
    ...grid('auto', '1fr auto'),
    maxHeight: '300px',
    minWidth: '700px',
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
class MemberSelectionOverlay extends React.Component<MemberSelectionOverlayProps>
{
    @observable
    private filter: string = '';

    @observable
    private filterLowerCase: string = '';

    @autobind
    private matches(member: MedicalGroupMemberAggregate): boolean
    {
        return this.matchesStart(member.user.name.familyName) || this.matchesStart(member.user.name.givenName)
            || this.matchesStartWord(member.medicalGroup.name);
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
        const member = row as MedicalGroupMemberAggregate;
        this.props.onSelection(member && member.member.memberID);
    }

    public render(): React.ReactNode
    {
        const entities: EntityReferences = {
            recents: EntityReferenceListTypeUtility.buildEntityReference(
                EntityReferenceListType.MedicalGroupMemberRecents),
            form: { id: 'Dropdown.Member', type: EntityType.FormDescription }
        };
        return <Entities entities={entities} render={({ recents, form }) =>
        {
            return <EntityList<MedicalGroupMemberAggregate> references={recents} render={members =>
            {
                return this.renderOverlay(members, form);
            }} />;
        }} />;
    }

    private renderOverlay(members: MedicalGroupMemberAggregate[], form: FormDescription)
    {
        const filteredMembers = (this.filterLowerCase && members) ? members.filter(this.matches) : members;

        const tableFormContext = FormContext.build(this.props.appStore, form);
        const tableContext = SimpleFieldContext.buildFromID(tableFormContext, 'members');

        return (
            <div css={dropdownStyle}>
                <SelectionTableFieldComponent context={tableContext} value={filteredMembers}
                    onSelection={this.onTableSelection} emptyText="No matching Medical Group Member found" />
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
            <MedicalGroupMemberSearchDialog onSelect={this.props.onSelection} />
        );
    }
}

export default MemberSelectionOverlay;
