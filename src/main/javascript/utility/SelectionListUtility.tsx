/**
 * Utilities for Selection Lists
 *
 * @author Larry 31/12/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
import {SelectionListOption} from 'main/component/SelectionList';

class SelectionListUtility
{
    public static determineSize(options: SelectionListOption<any>[]): number
    {
        return options.reduce((previousSize, option) => Math.max(previousSize, option.label.length), 0);
    }
}

export default SelectionListUtility;
