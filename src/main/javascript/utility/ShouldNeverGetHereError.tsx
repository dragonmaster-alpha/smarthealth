/**
 * Throw this error in places where code should not be executed.
 *
 * @author Larry 30/04/2019
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2019
 */
class ShouldNeverGetHereError extends Error
{
    constructor()
    {
        super('Error: Should never get here');
    }
}

export default ShouldNeverGetHereError;
