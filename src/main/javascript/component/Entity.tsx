import {Trans} from '@lingui/react';
import lodash from 'lodash';
import Loading from 'main/component/Loading';
import IDType from 'main/data/IDType';
import EntityCache from 'main/store/EntityCache';
import {CachedObject} from 'main/utility/Cache';
import {inject, observer} from 'mobx-react';
import React from 'react';
import EntityType from 'smarthealth-javascript/EntityType';

/**
 * Handle loading the entity before displaying the contents via a render function
 *
 * @author Larry 7/01/2019
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2019
 */
interface EntityProps<T>
{
    entityCache?: EntityCache;
    id: IDType;
    render: (value: T) => React.ReactNode;
    type: EntityType;
}

@inject('entityCache')
@observer
class Entity<T> extends React.Component<EntityProps<T>>
{
    public render()
    {
        const { entityCache, id, type } = this.props;
        if (lodash.isNil(id))
        {
            return this.props.render(null);
        }

        const cacheEntry: CachedObject<any, T> = entityCache
            .getCache(type)
            .get(id);

        if (cacheEntry.error)
        {
            return <Trans>Error loading entity {id} {type}</Trans>;
        }
        else if (!cacheEntry.hasValue)
        {
            return <Loading />;
        }
        else
        {
            return this.props.render(cacheEntry.value);
        }
    }
}

export default Entity;
