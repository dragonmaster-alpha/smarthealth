import StoreProps from 'main/store/StoreProps';
import {computed, observable, runInAction} from 'mobx';
import {inject, observer} from 'mobx-react';
import React from 'react';
import MedicalGroup from 'smarthealth-javascript/MedicalGroup';

/**
 * Generate the OwnerText for Service Record list table.
 *
 * @author Thompson 14/10/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
interface MedicalGroupOwnerTextProps extends StoreProps
{
    groupID: number;
}

@inject('entityCache')
@observer
class MedicalGroupOwnerText extends React.Component<MedicalGroupOwnerTextProps>
{
    @observable
    private medicalGroup: MedicalGroup;

    @computed
    private get ownerText(): string
    {
        return this.medicalGroup
            ? `${this.medicalGroup.name}, ${this.medicalGroup.address.city}`
            : '';
    }

    public async componentDidMount()
    {
        const medicalGroup = await this.props.entityCache.medicalGroups.load(this.props.groupID);
        runInAction(() =>
        {
            this.medicalGroup = medicalGroup;
        });
    }

    public render()
    {
        return this.ownerText;
    }
}

export default MedicalGroupOwnerText;
