import fs from 'fs';
import MinimumBrowserSupportExtractor from 'test/config/MinimumBrowserSupportExtractor';
import browsersToSupportList from 'test/config/MinimumBrowserSupportExtractor.BrowsersToSupport.json';
import eSFeaturesToSupportList from 'test/config/MinimumBrowserSupportExtractor.FeaturesToSupport.json';
import supportedVersions from '../../../main/resources/supportedVersions.json';

/**
 * Allow us to run Jest on MinimumBrowserSupportExtractor.tsx.
 *
 * @author Thompson 7/07/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
test('extract minimum browser support versions for our list of features', () =>
{
    expect(new MinimumBrowserSupportExtractor(eSFeaturesToSupportList, browsersToSupportList)
        .extractBrowserMinimumVersions())
        .toEqual({
            chrome: 63,
            edge: 79,
            firefox: 67,
            opera: 50,
            safari: 11.1,
            and_chr: 81,
            and_ff: 68,
            android: 81,
            ios_saf: 11
        });

    // test return unsupported for ie. Number.MAX_SAFE_INTEGER represent unsupported.
    expect(new MinimumBrowserSupportExtractor(eSFeaturesToSupportList, ['chrome', 'ie'])
        .extractBrowserMinimumVersions())
        .toEqual({
            chrome: 63,
            ie: Number.MAX_SAFE_INTEGER
        });
});

// This test rounds up the supported browser version. Therefore, if this test fails, expect the expected value to be a
// rounded up number of the browser version in supportedVersions.json.
test('browser versions in supportedVersions.json >= minimum extracted browser versions from list of features',
    () =>
    {
        const browserMinimumVersions = new MinimumBrowserSupportExtractor(eSFeaturesToSupportList,
            browsersToSupportList)
            .extractBrowserMinimumVersions();

        Object.keys(supportedVersions.validBrowsers)
            .forEach(browserName =>
            {
                if (browserName === 'Microsoft Edge')
                {
                    expect(supportedVersions.validBrowsers[browserName])
                        .toBeGreaterThanOrEqual(browserMinimumVersions.edge);
                }
                else
                {
                    expect(supportedVersions.validBrowsers[browserName])
                        .toBeGreaterThanOrEqual(browserMinimumVersions[browserName.toLowerCase()]);
                }
            });
    });

test('browser versions in @babel/preset-env targets of .babelrc MUST match with browser versions in ' +
    'supportedVersions.json',
    () =>
    {
        const babelrc = fs.readFileSync('./.babelrc', 'utf8');
        const babelrcJSON = JSON.parse(babelrc);
        const babelrcBrowserVersions = babelrcJSON.presets[0][1].targets;

        const supportedBrowserVersions = {};
        Object.keys(supportedVersions.validBrowsers)
            .forEach(supportedBrowserName =>
            {
                if (supportedBrowserName === 'Microsoft Edge')
                {
                    supportedBrowserVersions['edge'] = `${supportedVersions.validBrowsers['Microsoft Edge']}`;
                }
                else
                {
                    const supportedBrowserNameBabelrcStandard = supportedBrowserName.toLowerCase();
                    supportedBrowserVersions[supportedBrowserNameBabelrcStandard] =
                        `${supportedVersions.validBrowsers[supportedBrowserName]}`;
                }
            });

        expect(babelrcBrowserVersions)
            .toEqual(supportedBrowserVersions);
    });
