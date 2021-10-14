import BrowserChecker from 'main/utility/BrowserChecker';

/**
 * Unit Test for Browser Checker Utility
 *
 * @author Uditha 15/10/2018
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2018
 */

test('Check satisfies  OS', () =>
{
    const validOperatingSystems = {
        Windows: 10,
        macOS: 10,
        iOS: 10,
        Android: 5,
        Linux: 5
    };

    {
        const userAgentString = 'Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:47.0) Gecko/20100101 Firefox/47.0';
        const supportOS = new BrowserChecker(userAgentString, null, validOperatingSystems).satisfiesOS();
        expect(supportOS)
            .toBe(false);
    }
    {
        const userAgentString = 'Mozilla/5.0 (Windows NT 10.1; Win64; x64; rv:47.0) Gecko/20100101 Firefox/47.0';
        const supportOS = new BrowserChecker(userAgentString, null, validOperatingSystems).satisfiesOS();
        expect(supportOS)
            .toBe(true);
    }
    {
        const userAgentString = 'Mozilla/5.0 (Unknown 10.1; Win64; x64; rv:47.0) Gecko/20100101 Firefox/47.0';
        const supportOS = new BrowserChecker(userAgentString, null, validOperatingSystems).satisfiesOS();
        expect(supportOS)
            .toBe(undefined);
    }
    {
        const userAgentString = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6)'
            + ' AppleWebKit/601.7.7 (KHTML, like Gecko) Version/9.1.2 Safari/601.7.7';
        const supportOS = new BrowserChecker(userAgentString, null, validOperatingSystems).satisfiesOS();
        expect(supportOS)
            .toBe(true);
    }
    {
        const userAgentString = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6)'
            + ' AppleWebKit/601.7.7 (KHTML, like Gecko) Version/9.1.2 Safari/601.7.7';
        const supportOS = new BrowserChecker(userAgentString, null, validOperatingSystems).satisfiesOS();
        expect(supportOS)
            .toBe(true);
    }
    {
        const userAgentString = 'Mozilla/5.0 (iPad; CPU OS 9_3_2 like Mac OS X) '
            + 'AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13F69 Safari/601.1';
        const supportOS = new BrowserChecker(userAgentString, null, validOperatingSystems).satisfiesOS();
        expect(supportOS)
            .toBe(false);
    }
    {
        const userAgentString = 'Mozilla/5.0 (iPad; CPU OS 10_3_2 like Mac OS X) '
            + 'AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13F69 Safari/601.1';
        const supportOS = new BrowserChecker(userAgentString, null, validOperatingSystems).satisfiesOS();
        expect(supportOS)
            .toBe(true);
    }
    {
        const userAgentString = 'Mozilla/5.0 (X11; Linux x86_64; rv:10.0) Gecko/20150101 Firefox/47.0 (Chrome)';
        const supportOS = new BrowserChecker(userAgentString, null, validOperatingSystems).satisfiesOS();
        expect(supportOS)
            .toBe(undefined);
    }
    {
        const userAgentString = 'Mozilla/5.0 (Linux; Android 4.2.1; en-us; Nexus 5 Build/JOP40D) '
            + 'AppleWebKit/535.19 (KHTML, like Gecko; googleweblight) Chrome/38.0.1025.166 Mobile Safari/535.19';
        const supportOS = new BrowserChecker(userAgentString, null, validOperatingSystems).satisfiesOS();
        expect(supportOS)
            .toBe(false);
    }
    {
        const userAgentString = 'Mozilla/5.0 (Linux; Android 5.2.1; en-us; Nexus 5 Build/JOP40D) '
            + 'AppleWebKit/535.19 (KHTML, like Gecko; googleweblight) Chrome/38.0.1025.166 Mobile Safari/535.19';
        const supportOS = new BrowserChecker(userAgentString, null, validOperatingSystems).satisfiesOS();
        expect(supportOS)
            .toBe(true);
    }
    {
        const userAgentString = 'kasjhdfkjahskdjfhaksdjfhkajshdfkjashkdjfasjh';
        const supportOS = new BrowserChecker(userAgentString, null, validOperatingSystems).satisfiesOS();
        expect(supportOS)
            .toBe(undefined);
    }
});

test('Check satisfies  Browser', () =>
{
    const validBrowsers = {
        'Internet Explorer': 11,
        'Microsoft Edge': 42,
        Chrome: 65,
        Firefox: 57,
        Opera: 50,
        Safari: 10
    };

    {
        const userAgentString = 'Mozilla/5.0 (Windows NT 10.0) AppleWebKit/537.36 '
            + '(KHTML, like Gecko) Chrome/42.0.2311.135 Safari/537.36 Edge/12.10136';
        const supportBrowser = new BrowserChecker(userAgentString, validBrowsers, null).satisfiesBrowser();
        expect(supportBrowser)
            .toBe(false);
    }
    {
        const userAgentString = 'Mozilla/5.0 (Windows NT 10.0) AppleWebKit/537.36 '
            + '(KHTML, like Gecko) Chrome/42.0.2311.135 Safari/537.36 Edge/42.17134.1.0';
        const supportBrowser = new BrowserChecker(userAgentString, validBrowsers, null).satisfiesBrowser();
        expect(supportBrowser)
            .toBe(true);
    }
    {
        const userAgentString = 'Mozilla/5.0 (Windows NT 10.0) AppleWebKit/537.36 '
            + '(KHTML, like Gecko) Chrome/42.0.2311.135 Safari/537.36 Edge/42';
        const supportBrowser = new BrowserChecker(userAgentString, validBrowsers, null).satisfiesBrowser();
        expect(supportBrowser)
            .toBe(true);
    }
    {
        const userAgentString = 'Mozilla/5.0 (Windows NT 10.0) AppleWebKit/537.36 '
            + '(KHTML, like Gecko) Chrome/42.0.2311.135 Safari/537.36 Edge/XXXX';
        const supportBrowser = new BrowserChecker(userAgentString, validBrowsers, null).satisfiesBrowser();
        expect(supportBrowser)
            .toBe(undefined);
    }
    {
        const userAgentString = 'Mozilla/5.0 (compatible, MSIE 11, Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko';
        const supportBrowser = new BrowserChecker(userAgentString, validBrowsers, null).satisfiesBrowser();
        expect(supportBrowser)
            .toBe(true);
    }
});

test('Check getCache minimums', () =>
{
    const validBrowsers = {
        'Internet Explorer': 11,
        'Microsoft Edge': 42,
        Chrome: 65,
        Firefox: 57,
        Opera: 50,
        Safari: 10
    };

    const validOperatingSystems = {
        Windows: 10,
        macOS: 10,
        iOS: 10,
        Android: 5,
        Linux: 5
    };
    {
        const userAgentString = 'Mozilla/5.0 (Windows NT 10.0) AppleWebKit/537.36 '
            + '(KHTML, like Gecko) Chrome/42.0.2311.135 Safari/537.36 Edge/12.10136';
        const browserChecker = new BrowserChecker(userAgentString, validBrowsers, validOperatingSystems);

        expect('41.99')
            .toBe(browserChecker.getMinimumBrowserVersion());
        expect('9.99')
            .toBe(browserChecker.getMinimumOSVersion());
    }
    {
        const userAgentString = 'Some sdfkjasd aksdjfaks kasjdkfjaskf';
        const browserChecker = new BrowserChecker(userAgentString, validBrowsers, validOperatingSystems);

        expect(browserChecker.getMinimumBrowserVersion())
            .toBe(undefined);
        expect(browserChecker.getMinimumOSVersion())
            .toBe(undefined);
    }
});
