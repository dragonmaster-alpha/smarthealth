import AppStore from 'main/store/AppStore';

/**
 * Description of an action within the application. The description can be rendered in the Nav Tree, a home page, a
 * menu etc.
 *
 * @author Larry 28/10/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
interface ActionDescription
{
    annotation?: React.ReactNode;
    doAction: (appStore: AppStore) => void;
    icon?: string | React.ReactNode;
    key: string;
    primary?: boolean;
    title: string;
    visible?: (appStore: AppStore) => boolean;
}

export function isActionDescription(obj): obj is ActionDescription
{
    return !!obj.doAction;
}

export default ActionDescription;
