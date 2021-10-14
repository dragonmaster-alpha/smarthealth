/**
 * A map with multiple values for each key
 *
 * @author Thompson 26/06/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
class MultiMap<K, V> extends Map<K, V[]>
{
    public add(key: K, value: V): void
    {
        if (this.has(key))
        {
            const a: V[] = this.get(key);
            a.push(value);
        }
        else
        {
            const a: V[] = [value];
            this.set(key, a);
        }
    }
}

export default MultiMap;
