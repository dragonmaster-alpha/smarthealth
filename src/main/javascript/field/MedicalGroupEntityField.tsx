import Entity from 'main/component/Entity';
import {BaseFieldProps} from 'main/field/BaseField';
import MedicalGroupField from 'main/field/MedicalGroupField';
import React from 'react';
import EntityType from 'smarthealth-javascript/EntityType';
import FormFieldMedicalGroup from 'smarthealth-javascript/FormFieldMedicalGroup';
import MedicalGroup from 'smarthealth-javascript/MedicalGroup';

/**
 * TODO Larry Document the purpose of this class
 *
 * @author Larry 15/01/2021
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2021
 */
class MedicalGroupEntityField extends React.Component<BaseFieldProps<FormFieldMedicalGroup, number>>
{
    public render(): React.ReactNode
    {
        return (
            <Entity<MedicalGroup> id={this.props.value} type={EntityType.MedicalGroup} render={(medicalGroup) => (
                <MedicalGroupField context={this.props.context} onFieldChange={this.props.onFieldChange}
                    value={medicalGroup} />
            )} />
        );
    }
}

export default MedicalGroupEntityField;
