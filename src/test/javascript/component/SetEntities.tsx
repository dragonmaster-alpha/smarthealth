import StoreProps from 'main/store/StoreProps';
import {inject} from 'mobx-react';
import * as React from 'react';
import {EntityDetails} from 'test/component/SetEntity';

/**
 * Allow multiple entities to be set for testing
 *
 * @author Larry 17/04/2019
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2019
 */
interface SetEntitiesProps extends StoreProps
{
    entities: EntityDetails[];
}

@inject('entityCache')
class SetEntities extends React.Component<SetEntitiesProps>
{
    public render(): React.ReactNode
    {
        this.props.entities.forEach(entity =>
        {
            this.props.entityCache.getCache(entity.type)
                .set(entity.id, entity.value);
        });
        return this.props.children;
    }
}

export default SetEntities;
