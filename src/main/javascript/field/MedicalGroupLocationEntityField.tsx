import Entity from 'main/component/Entity';
import {BaseFieldProps} from 'main/field/BaseField';
import MedicalGroupLocationField from 'main/field/MedicalGroupLocationField';
import {inject, observer} from 'mobx-react';
import React from 'react';
import EntityType from 'smarthealth-javascript/EntityType';
import FormFieldMedicalGroupLocation from 'smarthealth-javascript/FormFieldMedicalGroupLocation';
import MedicalGroup from 'smarthealth-javascript/MedicalGroup';
import MedicalGroupLocationDigest from 'smarthealth-javascript/MedicalGroupLocationDigest';

/**
 * Fetch the current medical group for MedicalGroupLocationField
 *
 * @author Larry 30/11/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
@inject('sessionStore')
@observer
class MedicalGroupLocationEntityField
    extends React.Component<BaseFieldProps<FormFieldMedicalGroupLocation, MedicalGroupLocationDigest>>
{
    public render(): React.ReactNode
    {
        return <Entity<MedicalGroup> type={EntityType.MedicalGroup} id={this.props.sessionStore.currentGroupID}
            render={medicalGroup => <MedicalGroupLocationField context={this.props.context} medicalGroup={medicalGroup}
                onFieldChange={this.props.onFieldChange} value={this.props.value} />} />;
    }
}

export default MedicalGroupLocationEntityField;
