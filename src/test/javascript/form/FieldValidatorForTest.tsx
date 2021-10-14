import FieldValidator from 'main/form/FieldValidator';

/**
 * A FieldValidator that can be instantiated for use in tests
 *
 * @author Larry 7/02/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
class FieldValidatorForTest extends FieldValidator
{
    constructor()
    {
        // TODO see if we can get this working better
        super(null);
    }
}

export default FieldValidatorForTest;
