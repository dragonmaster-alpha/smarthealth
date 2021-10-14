import IDType from 'main/data/IDType';
import StoreProps from 'main/store/StoreProps';
import {inject} from 'mobx-react';
import * as React from 'react';
import EntityType from 'smarthealth-javascript/EntityType';

/**
 * Wrapper to set a value into the entity cache
 *
 * @author Larry 27/02/2019
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2019
 */
export interface EntityDetails
{
    id: IDType;
    type: EntityType;
    value: any;
}

interface SetEntityProps extends EntityDetails, StoreProps
{
}

@inject('entityCache')
class SetEntity extends React.Component<SetEntityProps>
{
    public render(): React.ReactNode
    {
        this.props.entityCache.getCache(this.props.type)
            .set(this.props.id, this.props.value);
        return this.props.children;
    }
}

export default SetEntity;
