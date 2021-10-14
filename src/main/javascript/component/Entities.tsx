import {Trans} from '@lingui/react';
import lodash from 'lodash';
import Loading from 'main/component/Loading';
import EntityCache from 'main/store/EntityCache';
import {CachedObject} from 'main/utility/Cache';
import {inject, observer} from 'mobx-react';
import React from 'react';
import EntityReference from 'smarthealth-javascript/EntityReference';

/**
 * Handle loading multiple entities before displaying the contents via a render function
 *
 * @author Larry 7/01/2019
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2019
 */
export type EntityReferences = { [key: string]: EntityReference };

interface EntitiesProps
{
    entities: EntityReferences;
    entityCache?: EntityCache;
    render: (values: any) => React.ReactNode;
}

@inject('entityCache')
@observer
class Entities extends React.Component<EntitiesProps>
{
    public render()
    {
        const { entities, entityCache } = this.props;

        const cacheEntries: { [key: string]: CachedObject<any, any> } = {};
        for (const key in entities)
        {
            cacheEntries[key] = entityCache.get(entities[key]);
        }

        for (const key in cacheEntries)
        {
            if (cacheEntries[key].error)
            {
                return <><Trans>Error loading entity</Trans>: {key} {JSON.stringify(entities[key])}</>;
            }
            else if (!cacheEntries[key].hasValue)
            {
                return <Loading />;
            }
        }

        const values = {};
        for (const key in cacheEntries)
        {
            values[key] = cacheEntries[key].value;
        }

        return this.props.render(lodash.isEmpty(values) ? null : values);
    }
}

export default Entities;
