import bowser from 'bowser';
import utils from 'bowser/src/utils';

/**
 * Browser/OS Version Checking Utility based on bowser library(https://github.com/lancedikson/bowser)
 *
 * @author Uditha 15/10 /2018
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2018
 */

class BrowserChecker
{
    public static compareVersion(version, currentVersion): boolean | undefined
    {
        let expectedResult = 0;
        let comparableVersion = version;
        let isLoose = false;

        if (typeof currentVersion !== 'string')
        {
            return undefined;
        }

        if (version[0] === '>')
        {
            expectedResult = 1;
            comparableVersion = version.substr(1);
        }
        else if (version[0] === '<')
        {
            expectedResult = -1;
            comparableVersion = version.substr(1);
        }
        else if (version[0] === '=')
        {
            comparableVersion = version.substr(1);
        }
        else if (version[0] === '~')
        {
            isLoose = true;
            comparableVersion = version.substr(1);
        }

        return utils.compareVersions(currentVersion, comparableVersion, isLoose) === expectedResult;
    }

    public static getBrowserLanguage(): string
    {
        return window.navigator.language;
    }

    public static getBrowserSize(): string
    {
        return `${window.innerWidth} x ${window.outerHeight}`;
    }

    public static getColorDepth(): number
    {
        return window.screen.colorDepth;
    }

    public static getScreenSize(): string
    {
        return `${window.screen.width} x ${window.screen.height}`;
    }

    public static isBrowserOnline(): boolean
    {
        return window.navigator.onLine || false;
    }

    public static isCookiesEnabled(): boolean
    {
        return window.navigator.cookieEnabled || false;
    }

    private parser;

    private validBrowsers: {};

    private validOperatingSystems: {};

    constructor(userAgent: string, validBrowsers: {}, validOperatingSystems: {})
    {
        this.parser = bowser.getParser(userAgent);
        this.validBrowsers = {};
        if (validBrowsers)
        {
            Object.keys(validBrowsers)
                .forEach(browserName => this.validBrowsers[browserName] = `>${validBrowsers[browserName] - 0.01}`);
        }
        this.validOperatingSystems = {};
        if (validOperatingSystems)
        {
            Object.keys(validOperatingSystems)
                .forEach(osName => this.validOperatingSystems[osName] = `>${validOperatingSystems[osName] - 0.01}`);
        }
    }

    public getBrowserName(): string
    {
        return this.parser.getBrowserName();
    }

    public getBrowserVersion(): string
    {
        return this.parser.getBrowserVersion();
    }

    public getMinimumBrowserVersion(): string | undefined
    {
        const browserName = this.parser.getBrowserName()
            .toLowerCase();
        const validBrowserNames = Object.keys(this.validBrowsers);
        const matchBrowserName = validBrowserNames.find(name => browserName === (String(name)
            .toLowerCase()));

        if (matchBrowserName)
        {
            return this.validBrowsers[matchBrowserName].substr(1);
        }

        return undefined;
    }

    public getMinimumOSVersion(): string | undefined
    {
        const osName = this.parser.getOSName(true);
        const validOSNames = Object.keys(this.validOperatingSystems);
        const matchingOSName = validOSNames.find(name => osName === (String(name)
            .toLowerCase()));

        if (matchingOSName)
        {
            return this.validOperatingSystems[matchingOSName].substr(1);
        }

        return undefined;
    }

    public getOSName(): string
    {
        return this.parser.getOSName();
    }

    public getOSVersion(): string
    {
        return this.parser.getOSVersion();
    }

    public getParser()
    {
        return this.parser;
    }

    public satisfiesBrowser(): boolean | undefined
    {
        return this.parser.satisfies(this.validBrowsers);
    }

    public satisfiesOS(): boolean | undefined
    {
        const validOSNames = Object.keys(this.validOperatingSystems);
        const osName = this.parser.getOSName(true);
        const matchingOSName = validOSNames.find(name => osName === (String(name)
            .toLowerCase()));

        const currentOSVersionStr = this.parser.getOSVersion();
        if (matchingOSName && currentOSVersionStr)
        {
            // Sometimes os version can have strings .e.g - NT 10.0, keep only numbers
            const currentOSVersion = currentOSVersionStr.replace(/[^\d.-]/g, '');
            return BrowserChecker.compareVersion(this.validOperatingSystems[matchingOSName], currentOSVersion);
        }

        return undefined;
    }
}

export default BrowserChecker;
