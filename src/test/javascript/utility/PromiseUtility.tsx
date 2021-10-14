/**
 * Utilities for using promises in stories
 *
 * @author Larry 26/11/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
export function promiseResolved<T>(value: T): Promise<T>
{
    return new Promise<T>(resolve => resolve(value));
}
