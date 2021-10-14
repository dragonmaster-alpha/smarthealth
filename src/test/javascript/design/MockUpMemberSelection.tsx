import {css} from '@emotion/core';
import {autobind} from 'core-decorators';
import {colour, dropdownBoxShadow, field, font} from 'main/application/ThemeConstants';
import Button from 'main/component/Button';
import MedicalGroupMemberAggregate from 'main/data/MedicalGroupMemberAggregate';
import {TableRow} from 'main/data/TableData';
import OKDialog from 'main/dialog/OKDialog';
import SimpleFieldContext from 'main/field/SimpleFieldContext';
import FormContext from 'main/form/FormContext';
import StoreProps from 'main/store/StoreProps';
import {grid, px} from 'main/utility/StyleUtility';
import {action, observable} from 'mobx';
import {inject, observer} from 'mobx-react';
import React from 'react';
import FormDescription from 'smarthealth-javascript/FormDescription';
import dropdownMemberForm from 'smarthealth-rest-test/formdesc/Form.Dropdown.Member.json';
import {
    MEMBER_BARNEY_STINSON, MEMBER_BILL_GOLFALOT, MEMBER_DOCTOR_DOLITTLE, MEMBER_JEMMA_HULL, MEMBER_MARSHALL_ERIKSEN,
    MEMBER_MARSHALL_STINSON, MEMBER_PETER_FLOWER, MEMBER_TED_ERIKSEN, MEMBER_TED_MOSBY, MEMBER_WILLIAM_WENG
} from 'test/data/MedicalGroupMemberAggregateMother';
import MockUpFilterComponent from 'test/design/MockUpFilterComponent';
import MockUpSelectionTable from 'test/design/MockUpSelectionTable';

/**
 * Selection panel mock up for medical group member
 *
 * @author Larry 11/01/2021
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2021
 */
interface MockUpMemberSelectionProps extends StoreProps
{
    onSelection: (selection: MedicalGroupMemberAggregate) => void;
}

const dropdownStyle = css({
    backgroundColor: colour.white,
    border: field.border,
    borderRadius: field.borderRadius,
    boxShadow: dropdownBoxShadow,
    color: colour.text,
    font: font.text,
    ...grid('minmax(700px, auto)', 'minmax(auto, 300px) auto'),
    padding: px(8),
    '>div:last-of-type': {
        alignItems: 'center',
        display: 'flex',
        gap: '16px',
        justifyContent: 'space-between',
        marginTop: '4px'
    }
});

const MEMBERS = [
    MEMBER_BILL_GOLFALOT, MEMBER_DOCTOR_DOLITTLE, MEMBER_JEMMA_HULL, MEMBER_PETER_FLOWER, MEMBER_WILLIAM_WENG,
    MEMBER_BARNEY_STINSON, MEMBER_MARSHALL_ERIKSEN, MEMBER_MARSHALL_STINSON, MEMBER_TED_ERIKSEN,
    MEMBER_TED_MOSBY
];

@inject('appStore')
@observer
class MockUpMemberSelection extends React.Component<MockUpMemberSelectionProps>
{
    @observable
    private filter: string;

    @observable
    private filterLowerCase: string;

    @observable
    private members = null;

    public componentDidMount()
    {
        this.members = MEMBERS;
    }

    private matches(member: MedicalGroupMemberAggregate): boolean
    {
        return this.matchesStart(member.user.name.familyName)
            || this.matchesStart(member.user.name.givenName) || this.matchesStart(member.medicalGroup.name);
    }

    private matchesStart(string: string)
    {
        return string.toLowerCase()
            .startsWith(this.filterLowerCase);
    }

    @action.bound
    private onFilterChange(value: string)
    {
        this.filter = value;
        this.filterLowerCase = this.filter.toLowerCase();
        this.members = this.filter ? MEMBERS.filter(member => this.matches(member)) : MEMBERS;
    }

    @autobind
    private onTableSelection(row: TableRow)
    {
        this.props.onSelection(row as MedicalGroupMemberAggregate);
    }

    public render(): React.ReactNode
    {
        const tableFormContext = FormContext.build(this.props.appStore, dropdownMemberForm as FormDescription);
        const tableContext = SimpleFieldContext.buildFromID(tableFormContext, 'members');

        return (
            <div css={dropdownStyle}>
                <MockUpSelectionTable context={tableContext}
                    value={this.members} onSelection={this.onTableSelection} />
                <div>
                    <MockUpFilterComponent value={this.filter} onValueChange={this.onFilterChange} />
                    <Button title="Search ..." small={true} onClick={() => this.showSearchDialog()} />
                </div>
            </div>
        );
    }

    private showSearchDialog()
    {
        this.props.appStore.componentStore.modalDialog.show(
            <OKDialog header="Search Medical Group Members" message="TODO" />
        );
    }
}

export default MockUpMemberSelection;
