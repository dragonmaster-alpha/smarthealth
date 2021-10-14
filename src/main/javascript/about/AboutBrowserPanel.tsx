import StoreProps from 'main/store/StoreProps';
import BrowserChecker from 'main/utility/BrowserChecker';
import React from 'react';
import supportedVersions from '../../resources/supportedVersions.json';

/**
 * Display user browser diagnostics.
 *
 * @author Uditha 28/09/2018
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2018
 */
class AboutBrowserPanel extends React.Component<StoreProps>
{
    public render()
    {
        const { userAgent } = window.navigator;
        const checker = new BrowserChecker(userAgent, supportedVersions.validBrowsers,
            supportedVersions.validOperatingSystems);
        return (
            <div>
                <div>Browser Name: {checker.getParser()
                    .getBrowserName()}
                </div>
                <div>Browser Version: {checker.getParser()
                    .getBrowserVersion()}
                </div>
                <div>OS Name: {checker.getParser()
                    .getOSName()}
                </div>
                <div>OS Version: {checker.getParser()
                    .getOSVersion()}
                </div>
                <div>Platform: {checker.getParser()
                    .getPlatformType()}
                </div>
                <div>JS Engine: {checker.getParser()
                    .getEngine().name}
                </div>
                <div>Cookies Enabled: {BrowserChecker.isCookiesEnabled()
                    .toString()}
                </div>
                <div>Browser Language: {BrowserChecker.getBrowserLanguage()}</div>
                <div>Browser Online: {BrowserChecker.isBrowserOnline()
                    .toString()}
                </div>
                <div>Browser Size: {BrowserChecker.getBrowserSize()}</div>
                <div>Screen Size: {BrowserChecker.getScreenSize()}</div>
                <div>Color Depth: {BrowserChecker.getColorDepth()}</div>
            </div>
        );
    }
}

export default AboutBrowserPanel;
