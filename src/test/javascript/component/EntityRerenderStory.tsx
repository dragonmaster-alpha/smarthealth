import {storiesOf} from '@storybook/react';
import Entity from 'main/component/Entity';
import EntityCache from 'main/store/EntityCache';
import Cache, {CachedObjectLoader} from 'main/utility/Cache';
import {observable} from 'mobx';
import React from 'react';
import EntityType from 'smarthealth-javascript/EntityType';

/**
 * Test how the Entity component handles rerendering
 *
 * @author Thompson 29/08/2019
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2019
 */
class MockEntityCache
{
    @observable
    private cache: Cache<any, any>;

    constructor(objectLoader: CachedObjectLoader<any, any>)
    {
        this.cache = new Cache<any, any>(objectLoader);
    }

    public getCache(type: EntityType): Cache<any, any>
    {
        return this.cache;
    }
}

storiesOf('Component/Entity', module)
    .add('Prevent Re-render', () =>
    {
        const data = { label: 'Count', count: 0 };
        const mockEntityCache = new MockEntityCache(id => data);

        const onClick = () =>
        {
            data.count += 1;
            mockEntityCache.getCache(null)
                .invalidate(1);
        };

        // @ts-ignore forced cast
        const entityCache = mockEntityCache as EntityCache;
        return (
            <>
                <Entity id={1} type={EntityType.ServiceRecord} entityCache={entityCache} render={(data: any) => (
                    <>{data.label}: {data.count}</>
                )} />
                <br />
                <button onClick={onClick}>Increment</button>
            </>
        );
    });
