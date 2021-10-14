/**
 * Convert a an object to a JSON String handling cycles
 *
 * @author Larry 25/01/2019
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2019
 */
export function jsonify(obj)
{
    const seen = [];

    return JSON.stringify(obj, (key, val) =>
    {
        if (val && (typeof val === 'object'))
        {
            if (seen.indexOf(val) >= 0)
            {
                return '__cycle__';
            }
            seen.push(val);
        }
        return val;
    });
}
