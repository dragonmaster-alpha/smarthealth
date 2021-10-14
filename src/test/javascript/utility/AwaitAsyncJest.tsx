/**
 * Test what happens when you await a non promise
 *
 * @author Thompson 20/11/2019
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2019
 */

test('await a non promise', async () =>
{
    const nonPromise: boolean | Promise<boolean> = true;
    // @ts-ignore
    expect(await nonPromise)
        .toEqual(true);
});

test('await a Promise', async () =>
{
    const promise = new Promise<boolean>((resolve) =>
    {
        setTimeout(() => resolve(true), 100);
    });
    expect(await promise)
        .toEqual(true);
});
