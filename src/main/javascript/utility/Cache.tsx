import {isIDPair} from 'main/data/IDPair';
import IDType, {isMemberID} from 'main/data/IDType';
import SubscriptionService from 'main/utility/SubscriptionService';
import {action, computed, observable} from 'mobx';

/**
 * Base class for caching server objects.
 * <ul>
 * <li>I is the type of the identifier for the object and is usually a number or string</li>
 * <li>T is the type of the object</li>
 * </ul>
 * @author Larry 30/11/2018
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2018
 */
export enum CachedObjectState
{
    loading, loaded, cleared, error, reloading
}

export type CachedObjectLoader<I, T> = (id: I) => T | Promise<T>;

export class CachedObject<I, T>
{
    public readonly id: I;

    @observable
    public state: CachedObjectState;

    @observable
    public value: T;

    constructor(id: I)
    {
        this.id = id;
        this.state = CachedObjectState.cleared;
    }

    @computed
    public get error(): boolean
    {
        return this.state === CachedObjectState.error;
    }

    @computed
    public get hasValue(): boolean
    {
        return (this.state === CachedObjectState.loaded) || (this.state === CachedObjectState.reloading);
    }

    @computed
    public get loaded(): boolean
    {
        return this.state === CachedObjectState.loaded;
    }

    @action
    public setError()
    {
        this.value = undefined;
        this.state = CachedObjectState.error;
    }

    @action
    public setValue(value: T)
    {
        this.value = value;
        this.state = value ? CachedObjectState.loaded : CachedObjectState.cleared;
    }
}

type CacheKey = string | number;

class Cache<I extends IDType, T>
{
    private cachedObjects: Map<CacheKey, CachedObject<I, T>> = new Map<CacheKey, CachedObject<I, T>>();

    private readonly objectLoaderFunction: CachedObjectLoader<I, T>;

    private promises: Map<CacheKey, Promise<T>> = new Map<CacheKey, Promise<T>>();

    private readonly subscriptionService: SubscriptionService;

    constructor(
        objectLoaderFunction: CachedObjectLoader<I, T>,
        subscriptionService: SubscriptionService = null)
    {
        this.objectLoaderFunction = objectLoaderFunction;
        this.subscriptionService = subscriptionService;
    }

    public get size()
    {
        return this.cachedObjects.size;
    }

    @action
    public clear()
    {
        if (this.subscriptionService)
        {
            this.cachedObjects.forEach((v, k) =>
            {
                // @ts-ignore
                this.subscriptionService.unsubscribe(k);
            });
        }
        this.cachedObjects.clear();
    }

    @action
    public get(id: I): CachedObject<I, T>
    {
        let cachedObject: CachedObject<I, T> = this.cachedObjects.get(this.toKey(id));
        if (!cachedObject)
        {
            cachedObject = new CachedObject<I, T>(id);
            this.cachedObjects.set(this.toKey(id), cachedObject);
            this.startLoading(cachedObject);
            if (this.subscriptionService)
            {
                // @ts-ignore
                this.subscriptionService.subscribe(id);
            }
        }
        return cachedObject;
    }

    public has(id: I): boolean
    {
        return this.cachedObjects.has(this.toKey(id));
    }

    @action
    public invalidate(id: I)
    {
        const cachedObject: CachedObject<I, T> = this.cachedObjects.get(this.toKey(id));
        if (cachedObject)
        {
            // needs a delay because sometimes the request is sent before the entity on the server finishes updating
            setTimeout(() =>
            {
                // make sure we have the latest object
                const cachedObject: CachedObject<I, T> = this.cachedObjects.get(this.toKey(id));
                this.startLoading(cachedObject);
            }, 500);
        }
    }

    public async load(id: I): Promise<T>
    {
        const cachedObject: CachedObject<I, T> = this.get(id);
        if (cachedObject.loaded)
        {
            return Promise.resolve(cachedObject.value);
        }
        else
        {
            return this.promises.get(this.toKey(id));
        }
    }

    @action
    public remove(id: I)
    {
        if (this.cachedObjects.has(this.toKey(id)))
        {
            this.cachedObjects.delete(this.toKey(id));
            if (this.subscriptionService)
            {
                this.subscriptionService.unsubscribe(id);
            }
        }
    }

    @action
    public set(id: I, value: T)
    {
        const key = this.toKey(id);
        let cachedObject: CachedObject<I, T> = this.cachedObjects.get(key);
        if (!cachedObject)
        {
            cachedObject = new CachedObject<I, T>(id);
            this.cachedObjects.set(key, cachedObject);
            if (this.subscriptionService)
            {
                // @ts-ignore
                this.subscriptionService.subscribe(id);
            }
        }
        cachedObject.setValue(value);
    }

    @action
    private startLoading(cachedObject: CachedObject<I, T>)
    {
        cachedObject.state = cachedObject.value ? CachedObjectState.reloading : CachedObjectState.loading;
        const result: T | Promise<T> = this.objectLoaderFunction(cachedObject.id);

        if (result instanceof Promise)
        {
            const promise: Promise<T> = result;
            this.promises.set(this.toKey(cachedObject.id), promise);
            promise
                .then((value: T) =>
                {
                    cachedObject.setValue(value);
                    this.promises.delete(this.toKey(cachedObject.id));
                    return value;
                })
                .catch((reason: any) =>
                {
                    cachedObject.setError();
                    this.promises.delete(this.toKey(cachedObject.id));
                });
        }
        else
        {
            cachedObject.setValue(result);
        }
    }

    private toKey(id: I): CacheKey
    {
        if (isIDPair(id))
        {
            return `${id.id},${id.associatedID}`;
        }
        else if (isMemberID(id))
        {
            return `${id.groupID},${id.userID}`;
        }
        else if (typeof id === 'number')
        {
            return id as number;
        }
        else
        {
            return id as string;
        }
    }

    public value(id: I): T
    {
        const cachedObject = this.get(id);
        if (cachedObject.hasValue)
        {
            return cachedObject.value;
        }
        else
        {
            return null;
        }
    }
}

export default Cache;
