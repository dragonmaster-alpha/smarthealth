import BaseContextFieldComponent, {BaseContextFieldComponentProps} from 'main/fieldcomponent/BaseContextFieldComponent';

/**
 * Base class for components that support fields
 *
 * @author Larry 23/12/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
export interface BaseFieldComponentProps extends BaseContextFieldComponentProps
{
    onValueChange: (value) => void;
    value: any;
}

abstract class BaseFieldComponent<T extends BaseFieldComponentProps = BaseFieldComponentProps>
    extends BaseContextFieldComponent<T>
{
}

export default BaseFieldComponent;
