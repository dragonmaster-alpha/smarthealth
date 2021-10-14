import {action as storybookAction} from '@storybook/addon-actions';
import {storiesOf} from '@storybook/react';
import {TableRow} from 'main/data/TableData';
import SimpleFieldContext from 'main/field/SimpleFieldContext';
import SelectionTableFieldComponent from 'main/fieldcomponent/SelectionTableFieldComponent';
import FormContext from 'main/form/FormContext';
import {jsonify} from 'main/utility/Jsonify';
import {grid} from 'main/utility/StyleUtility';
import React from 'react';
import FormDescription from 'smarthealth-javascript/FormDescription';
import dropdownMedicalGroupForm from 'smarthealth-rest-test/formdesc/Form.Dropdown.MedicalGroup.json';
import dropdownMemberForm from 'smarthealth-rest-test/formdesc/Form.Dropdown.Member.json';
import WithStore from 'test/component/WithStore';
import {ALL_MEMBERS, MEMBER_BILL_GOLFALOT, MEMBER_DOCTOR_DOLITTLE} from 'test/data/MedicalGroupMemberAggregateMother';
import {PHILLIP_GENERAL_PRACTICE, ST_VINCENTS_HOSPITAL} from 'test/data/MedicalGroupMother';

/**
 * Tester for SelectionTableFieldComponent
 *
 * @author Larry 13/01/2021
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2021
 */
function onSelection(row: TableRow)
{
    storybookAction('Selected')(jsonify(row));
}

storiesOf('FieldComponent/SelectionTableFieldComponent', module)
    .add('Member Selection', () =>
    {
        return <WithStore render={appStore =>
        {
            const tableFormContext = FormContext.build(appStore, dropdownMemberForm as FormDescription);
            const tableContext = SimpleFieldContext.buildFromID(tableFormContext, 'members');

            return <SelectionTableFieldComponent context={tableContext}
                value={[MEMBER_DOCTOR_DOLITTLE, MEMBER_BILL_GOLFALOT]} onSelection={onSelection} />;
        }} />;
    })
    .add('Member Selection, scrolling', () =>
    {
        return <WithStore render={appStore =>
        {
            const tableFormContext = FormContext.build(appStore, dropdownMemberForm as FormDescription);
            const tableContext = SimpleFieldContext.buildFromID(tableFormContext, 'members');

            return (
                <div style={grid('700px', '300px')}>
                    <SelectionTableFieldComponent context={tableContext} value={ALL_MEMBERS}
                        onSelection={onSelection} />
                </div>
            );
        }} />;
    })
    .add('Medical Group Selection', () =>
    {
        return <WithStore render={appStore =>
        {
            const tableFormContext = FormContext.build(appStore, dropdownMedicalGroupForm as FormDescription);
            const tableContext = SimpleFieldContext.buildFromID(tableFormContext, 'groups');

            return <SelectionTableFieldComponent context={tableContext}
                value={[PHILLIP_GENERAL_PRACTICE, ST_VINCENTS_HOSPITAL]} onSelection={onSelection} />;
        }} />;
    });
