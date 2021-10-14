import IDType from 'main/data/IDType';

/**
 * A pair of IDs that together identify a single entity.
 *
 * @author Larry 23/01/2019
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2019
 */
interface IDPair
{
    associatedID: number | string;
    id: number;
}

export function isIDPair(id: IDType): id is IDPair
{
    // @ts-ignore
    return id.id && id.associatedID;
}

export default IDPair;
