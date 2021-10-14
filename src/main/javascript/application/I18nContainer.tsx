import {I18n, I18nProvider} from '@lingui/react';
import StoreProps from 'main/store/StoreProps';
import Locales from 'main/utility/Locales';
import {action, observable} from 'mobx';
import {inject, observer} from 'mobx-react';
import React from 'react';
import catalog from '../../locale/en/messages';

/**
 * I18n Container that links I18nProvider with AppStore.
 * <p>
 * The catalog message bundle is loaded dynamically based on the language set in the browser. If the language is not
 * found then we fall back to the language group. If that is not found then we default to en.
 * <p>
 * The language catalogs are set to load lazily in webpack. TODO check this is the case
 * webpackMode: "lazy", webpackChunkName: "i18n-[index]" *
 *<p>
 * This is based on the https://lingui.js.org/misc/showroom.html -> ledgy.com (source) and
 * https://webpack.js.org/guides/code-splitting/
 *
 * @author Uditha 20/08/2018
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2018
 */
@inject('appStore')
@observer
class I18nContainer extends React.Component<StoreProps>
{
    private catalogs = {};

    @observable
    private language;

    @observable
    private locale;

    @action
    public componentDidMount()
    {
        // Bug 7772 - Web UI Date Format - No formats for en-US
        this.locale = Locales.AUSTRALIA;
        this.loadCatalog(this.locale);
    }

    private loadCatalog(language)
    {
        this.catalogs['en'] = catalog;
        // import(`../../locale/${language}/messages.js`)
        //     .then((catalog) =>
        //     {
        //         runInAction(() =>
        //         {
        //             LOG.debug(`Loaded language ${language}`);
        //             this.catalogs[language] = catalog;
        //             this.language = language;
        //         });
        //     })
        //     .catch(() =>
        //     {
        //         LOG.debug(`Language not found ${language}`);
        //         if (language.length === 5)
        //         {
        //             this.loadCatalog(language.substr(0, 2));
        //         }
        //         else
        //         {
        //             this.loadCatalog('en');
        //         }
        //     });
    }

    public render(): React.ReactNode
    {
        return (
            <I18nProvider catalogs={this.catalogs} language={this.language} locales={this.locale}>
                <I18n>
                    {
                        // capture the i18n object to a store to allow use of conversion macro
                        ({ i18n }) =>
                        {
                            this.props.appStore.i18nStore.setI18n(i18n, this.locale);
                            // @ts-ignore
                            return React.cloneElement(this.props.children, { ...this.props, i18n });
                        }
                    }
                </I18n>
            </I18nProvider>
        );
    }
}

export default I18nContainer;
