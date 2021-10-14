import {autobind} from 'core-decorators';
import Entity from 'main/component/Entity';
import SelectionList from 'main/component/SelectionList';
import IDPair from 'main/data/IDPair';
import BaseField, {BaseFieldProps} from 'main/field/BaseField';
import {EMPTY} from 'main/field/FieldConstants';
import DropdownFieldComponent from 'main/fieldcomponent/DropdownFieldComponent';
import InputFieldComponent from 'main/fieldcomponent/InputFieldComponent';
import {inject, observer} from 'mobx-react';
import React from 'react';
import EntityType from 'smarthealth-javascript/EntityType';
import FormFieldMedicalGroupList from 'smarthealth-javascript/FormFieldMedicalGroupList';

/**
 * Field for a medical group list. Gets the list from the server on editing.
 *
 * @author Larry 31/12/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
interface MedicalGroupListEditingFieldProps extends BaseFieldProps<FormFieldMedicalGroupList, string>
{
    list: string[];
}

class MedicalGroupListEditingField
    extends BaseField<FormFieldMedicalGroupList, string, MedicalGroupListEditingFieldProps>
{
    @autobind
    private renderContent(ref: React.RefObject<any>, onFocus: (focus: boolean) => void): React.ReactNode
    {
        return <InputFieldComponent context={this.props.context} editable={false} maxLength={this.field.size}
            onFocus={onFocus} onValueChange={() => null} value={this.props.value} />;
    }

    protected renderEditing(): React.ReactNode
    {
        return (
            <DropdownFieldComponent context={this.props.context} renderContent={this.renderContent}
                renderOverlay={this.renderOverlay} valid={this.valid} />
        );
    }

    @autobind
    private renderOverlay(onExit: () => void): React.ReactNode
    {
        const options = this.props.list.map((selection) => ({ label: selection, value: selection }));
        if (!this.mandatory)
        {
            options.unshift({ label: EMPTY, value: null });
        }

        return <SelectionList size={this.field.size} options={options} onExit={onExit}
            onSelection={this.onValueChange} />;
    }
}

@inject('appStore')
@observer
class MedicalGroupListField extends BaseField<FormFieldMedicalGroupList>
{
    protected renderEditing()
    {
        const currentGroupID = this.props.appStore.sessionStore.currentGroupID;
        if (!currentGroupID)
        {
            throw new Error('No current medical group');
        }

        const id: IDPair = { id: currentGroupID, associatedID: this.field.medicalGroupListType };
        return <Entity id={id} type={EntityType.MedicalGroupList}
            render={list => <MedicalGroupListEditingField context={this.props.context} list={list as string[]}
                onFieldChange={this.props.onFieldChange} value={this.props.value} />} />;
    }
}

export default MedicalGroupListField;
