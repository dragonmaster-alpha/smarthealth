import AppStore from 'main/store/AppStore';
import {inject, observer} from 'mobx-react';
import * as React from 'react';

/**
 * Tries to display locale from appStore i18nStore
 *
 * @author Larry 17/04/2019
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2019
 */
interface LocaleProps
{
    appStore?: AppStore;
}

@inject('appStore')
@observer
class Locale extends React.Component<LocaleProps>
{
    public render(): React.ReactNode
    {
        return this.props.appStore.i18nStore.locale || 'Unknown';
    }
}

export default Locale;
