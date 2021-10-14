import AppStore from 'main/store/AppStore';

/**
 * Description of a page in the application. The description can be rendered in the Nav Tree, a home page, a menu etc.
 *
 * @author Larry 28/10/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
interface PageDescription
{
    annotation?: React.ReactNode;
    hasServiceRecordList?: boolean;
    icon?: string | React.ReactNode;
    key: string;
    primary?: boolean;
    renderPanel?: () => React.ReactNode;
    title: string;
    visible?: (appStore: AppStore) => boolean;
}

export default PageDescription;
