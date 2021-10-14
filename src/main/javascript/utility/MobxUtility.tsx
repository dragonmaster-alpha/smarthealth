import lodash from 'lodash';
import {extendObservable, isObservableObject} from 'mobx';

/**
 * Utility methods for Mobx
 *
 * @author Larry 17/01/2019
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2019
 */

/**
 * If the property defined by the path was not in the original object then it is not observable. We need to add it as
 * an observable property.
 */
export function extendObservableByPath(target: any, path: string | string[]): void
{
    if (!isObservableObject(target))
    {
        return;
    }

    const pathArray: string[] = lodash.toPath(path);
    const pathFirst = pathArray.shift();
    if (!(pathFirst in target))
    {
        const additional = {};
        additional[pathFirst] = (pathArray.length > 0) ? {} : null;
        extendObservable(target, additional);
    }
    if (pathArray.length > 0)
    {
        extendObservableByPath(target[pathFirst], pathArray);
    }
}

/*
 * stop console.log type warning that value is not an array. MobX arrays are objects.
 * https://mobx.js.org/refguide/array.html
 */
export function toNativeArray(array: any[]): any[]
{
    return array ? array.slice() : array;
}
