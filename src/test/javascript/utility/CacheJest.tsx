import IDPair from 'main/data/IDPair';
import Cache from 'main/utility/Cache';

/**
 * Test Cache
 *
 * @author Larry 30/11/2018
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2018
 */
test('getCache immediate', () =>
{
    const cache = new Cache<string, string>((id: string) => (`Loaded ${id}`));

    const promise: Promise<string> = cache.load('Fred');
    expect(promise)
        .toBeInstanceOf(Promise);

    return promise.then(value =>
    {
        expect(value)
            .toBe('Loaded Fred');

        expect(cache.get('Fred').loaded)
            .toBe(true);

        expect(cache.get('Fred').value)
            .toBe('Loaded Fred');
    });
});

test('getCache immediate async', async () =>
{
    const cache = new Cache<string, string>((id: string) => (`Loaded ${id}`));

    const promise = cache.load('Fred');
    expect(promise)
        .toBeInstanceOf(Promise);
    {
        const { value } = cache.get('Fred');
        expect(value)
            .toBe('Loaded Fred');
    }
    {
        const { value } = cache.get('Wilma');
        expect(value)
            .toBe('Loaded Wilma');
    }
    {
        const { value } = cache.get('Fred');
        expect(value)
            .toBe('Loaded Fred');
    }
    {
        const { value } = cache.get('Wilma');
        expect(value)
            .toBe('Loaded Wilma');
    }
});

test('getCache promise', () =>
{
    const cache = new Cache<string, string>((id: string) => (new Promise(resolve => (resolve(`Promised ${id}`)))));

    const promise = cache.load('Fred');
    expect(promise)
        .toBeInstanceOf(Promise);

    return promise.then(value =>
    {
        expect(value)
            .toBe('Promised Fred');

        expect(cache.get('Fred').value)
            .toBe('Promised Fred');
    });
});

test('getCache promise async', async () =>
{
    const cache = new Cache<string, string>((id: string) => (new Promise(resolve => (resolve(`Promised ${id}`)))));
    {
        const promise = cache.load('Fred');
        expect(promise)
            .toBeInstanceOf(Promise);
        expect(await promise)
            .toBe('Promised Fred');
    }
    {
        const { value } = cache.get('Fred');
        expect(value)
            .toBe('Promised Fred');
    }
    {
        const promise = cache.load('Wilma');
        expect(promise)
            .toBeInstanceOf(Promise);
        expect(await promise)
            .toBe('Promised Wilma');
    }
    {
        const { value } = cache.get('Wilma');
        expect(value)
            .toBe('Promised Wilma');
    }
    {
        const { value } = cache.get('Fred');
        expect(value)
            .toBe('Promised Fred');
    }
    {
        const { value } = cache.get('Wilma');
        expect(value)
            .toBe('Promised Wilma');
    }

    expect(cache.size)
        .toBe(2);
});

test('is loaded', async () =>
{
    const cache = new Cache<string, string>((id: string) => (new Promise(resolve => (resolve(`Promised ${id}`)))));

    expect(cache.get('Fred').loaded)
        .toBe(false);

    expect(await cache.load('Fred'))
        .toBe('Promised Fred');

    expect(cache.get('Fred').loaded)
        .toBe(true);

    expect(cache.get('Fred').loaded)
        .toBe(true);
});

test('invalidate', async () =>
{
    const cache = new Cache<string, string>((id: string) => (`Loaded ${id}`));

    expect(await cache.load('Fred'))
        .toBe('Loaded Fred');

    cache.invalidate('Fred');
    expect(cache.get('Fred').hasValue)
        .toBe(true);
});

test('clear', async () =>
{
    const cache = new Cache<string, string>((id: string) => (`Loaded ${id}`));

    expect(await cache.load('Fred'))
        .toBe('Loaded Fred');

    expect(cache.size)
        .toBe(1);

    cache.clear();
    expect(cache.has('Fred'))
        .toBe(false);

    expect(cache.size)
        .toBe(0);
});

test('id is number', async () =>
{
    const cache = new Cache<number, string>((id: number) => (`Loaded ${id}`));

    expect(await cache.load(77))
        .toBe('Loaded 77');

    expect(cache.has(77))
        .toBe(true);
});

test('id is IDPair', async () =>
{
    const cache = new Cache<IDPair, string>((id: IDPair) => (`Loaded ${id.id},${id.associatedID}`));

    expect(await cache.load({ id: 3, associatedID: 4 }))
        .toBe('Loaded 3,4');

    expect(cache.has({ id: 3, associatedID: 4 }))
        .toBe(true);

    expect(cache.get({ id: 3, associatedID: 4 }).value)
        .toBe('Loaded 3,4');

    expect(cache.size)
        .toBe(1);
});

test('set', async () =>
{
    const cache = new Cache<string, string>((id: string) => (new Promise((resolve, reject) =>
    {
        reject('Should not get here');
    })));

    cache.set('Fred', 'Set Fred');

    expect(cache.value('Fred'))
        .toBe('Set Fred');

    expect(cache.get('Fred').loaded)
        .toBe(true);

    expect(await cache.load('Fred'))
        .toBe('Set Fred');
});

test('set after load', async () =>
{
    const cache = new Cache<string, string>((id: string) => (new Promise(resolve => (resolve(`Promised ${id}`)))));

    expect(cache.value('Fred'))
        .toBe(null);

    expect(await cache.load('Fred'))
        .toBe('Promised Fred');

    cache.set('Fred', 'Set Fred');

    expect(cache.value('Fred'))
        .toBe('Set Fred');
});

test('value', async () =>
{
    const cache = new Cache<string, string>((id: string) => (new Promise(resolve => (resolve(`Promised ${id}`)))));

    expect(cache.value('Fred'))
        .toBe(null);

    expect(await cache.load('Fred'))
        .toBe('Promised Fred');

    expect(cache.value('Fred'))
        .toBe('Promised Fred');
});
