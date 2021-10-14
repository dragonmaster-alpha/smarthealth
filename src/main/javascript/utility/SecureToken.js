import crypto from 'crypto';

/**
 * Create a base64 token from secure random numbers.
 * <p>
 * Copied from project random-base64-string because of compile errors https://github.com/103058/random-base64-string
 *
 * @author Larry 9/05/2018
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2018
 */
function secureToken(length, safe = true)
{
    let string = crypto.randomBytes(length)
        .toString('base64');
    if (safe)
    {
        string = string.replace(/\+|\/|=/g, '');
    }
    string = string.slice(0, length);
    if (string.length < length)
    {
        string += this.secureToken(length - string.length, safe);
    }
    return string;
}

export default secureToken;
