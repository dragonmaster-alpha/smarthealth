import BaseContextFieldComponent, {BaseContextFieldComponentProps} from 'main/fieldcomponent/BaseContextFieldComponent';

/**
 * Base class for a FieldComponent that support focus.
 *
 * @author Thompson 5/02/2021
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2021
 */
export interface BaseInputFieldComponentProps extends BaseContextFieldComponentProps
{
    onValueChange: (value, hasFocus: boolean) => void;
    value: any;
}

abstract class BaseInputFieldComponent<T extends BaseInputFieldComponentProps = BaseInputFieldComponentProps>
    extends BaseContextFieldComponent<T>
{
}

export default BaseInputFieldComponent;
