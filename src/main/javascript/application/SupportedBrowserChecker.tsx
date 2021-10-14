import BrowserChecker from 'main/utility/BrowserChecker';
import {action, observable} from 'mobx';
import {observer} from 'mobx-react';
import {Button} from 'primereact/button';
import {Dialog} from 'primereact/dialog';
import React from 'react';
import supportedVersions from '../../resources/supportedVersions.json';

/**
 * Check for Supported Browser.
 *
 * To test this component a browser extension should be used to fake the User-Agent of the browser.
 * User-Agent Switcher (FireFox):
 * https://addons.mozilla.org/en-US/firefox/addon/uaswitcher/
 *
 * @author Uditha 11/10/2018
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2018
 */
interface SupportedBrowserCheckerProps
{
    children: React.ReactNode;
}

@observer
class SupportedBrowserChecker extends React.Component<SupportedBrowserCheckerProps>
{
    private browser: BrowserChecker;

    @observable
    private showError: boolean;

    @observable
    private showWarning: boolean;

    constructor(props)
    {
        super(props);

        this.browser = new BrowserChecker(window.navigator.userAgent, supportedVersions.validBrowsers,
            supportedVersions.validOperatingSystems);
        this.showWarning = !(this.browser.getMinimumBrowserVersion() && this.browser.getMinimumOSVersion());
        this.showError = !(this.browser.satisfiesBrowser() && this.browser.satisfiesOS());
    }

    @action.bound
    private onClick()
    {
        this.showError = false;
        this.showWarning = false;
    }

    public render()
    {
        if (this.showWarning)
        {
            const title = !this.browser.getMinimumBrowserVersion() ? 'Browser' : 'Operating System';

            return (
                <Dialog blockScroll={true} closable={false} footer={<Button label="Ok" onClick={this.onClick} />}
                    header={`Unsupported ${title}`} modal={true} maximizable={false} onHide={this.onClick}
                    visible={this.showWarning}>
                    {!this.browser.getMinimumOSVersion() && <div>Your Operating System cannot be recognize</div>}
                    {!this.browser.getMinimumBrowserVersion() && <div>Your Browser cannot be recognize</div>}
                    <div>We cannot guarantee the application behaviour</div>
                </Dialog>
            );
        }
        else if (this.showError)
        {
            const title = !this.browser.satisfiesBrowser() ? 'Browser' : 'Operating System';

            return (
                <Dialog blockScroll={true} closable={false} header={`Unsupported ${title}`} modal={true}
                    maximizable={false} onHide={this.onClick} visible={this.showError}>
                    <>
                        {!this.browser.satisfiesBrowser() && (
                            <div>
                                {`Your Browser version ${this.browser.getBrowserName()} - ${
                                    this.browser.getBrowserVersion()} is not supported`}
                                <br />
                                {`Please use ${this.browser.getBrowserName()} version ${
                                    this.browser.getMinimumBrowserVersion()} or later`}
                            </div>)
                        }
                        {!this.browser.satisfiesOS() && (
                            <div>
                                {`Your Operating System ${this.browser.getOSName()} is not supported`}
                                <br />
                                {`Please use ${this.browser.getOSName()} version ${this.browser.getMinimumOSVersion()}
                                or later`}
                            </div>)
                        }
                    </>
                </Dialog>
            );
        }
        else
        {
            return this.props.children;
        }
    }
}

export default SupportedBrowserChecker;
