import MemberID from 'smarthealth-javascript/MemberID';
import IDPair from './IDPair';

/**
 * Encapsulate the various ID types for entities
 *
 * @author Larry 23/01/2019
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2019
 */
type IDType = number | string | IDPair | MemberID;

export function isMemberID(id: IDType): id is MemberID
{
    // @ts-ignore
    return id.groupID && id.userID;
}

export default IDType;
