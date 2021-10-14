/**
 * Test Promises.
 * <p>
 *     Note: the promise must be returned for JEST to handle it correctly
 *
 * @author Larry 30/11/2018
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2018
 */
import {promiseResolved} from 'test/utility/PromiseUtility';

test('promise resolve', () =>
{
    const promise = new Promise((resolve) =>
    {
        resolve('Response');
    });

    return promise.then((result) =>
    {
        expect(result)
            .toBe('Response');
    });
});

test('PromiseUtility.resolved', () =>
{

    return promiseResolved('Response')
        .then((result) =>
        {
            expect(result)
                .toBe('Response');
        });
});

test('promise resolve2', () =>
{
    // eslint-disable-next-line no-unused-vars
    const promise = new Promise((resolve, reject) =>
    {
        resolve('Response');
    });

    return promise.then((result) =>
    {
        expect(result)
            .toBe('Response');
    });
});

test('promise reject', () =>
{
    // eslint-disable-next-line no-unused-vars
    const promise = new Promise((resolve, reject) =>
    {
        reject(new Error('Reason'));
    });

    return promise
        // eslint-disable-next-line no-unused-vars
        .then((result) =>
        {
            // should not getCache here
        })
        .catch((reason) =>
        {
            expect(reason.message)
                .toBe('Reason');
        });
});

test('promise cascaded', () =>
{
    // eslint-disable-next-line no-unused-vars
    const promise1 = new Promise((resolve, reject) =>
    {
        resolve('Result1');
    });

    const promise2 = promise1.then((result) =>
    {
        expect(result)
            .toBe('Result1');
        return 'Result2';
    });

    return promise2.then((result) =>
    {
        expect(result)
            .toBe('Result2');
    });
});

test('promise async', async () =>
{
    const result = await new Promise((resolve) =>
    {
        resolve('Response');
    });

    expect(result)
        .toBe('Response');
});
