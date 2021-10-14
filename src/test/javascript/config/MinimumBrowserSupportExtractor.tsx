import * as caniuse from 'caniuse-lite';
import lodash from 'lodash';

/**
 * Using caniuse-lite to extract JavaScript features minimum browser version support.
 *
 * NOTE:
 * A browser version number that is 9007199254740991 means it is unsupported for that feature. The 9007199254740991
 * number comes from Number.MAX_SAFE_INTEGER.
 *
 * @author Thompson 7/07/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
export interface MinimumBrowserVersions
{
    [browser: string]: number;
}

export interface BrowserFeature
{
    comment?: string;
    feature: string;
    optional?: boolean;
}

export type BrowserFeatureOrString = BrowserFeature | string;

class MinimumBrowserSupportExtractor
{
    private browsersToSupport: string[];

    private features: BrowserFeatureOrString[];

    constructor(features: BrowserFeatureOrString[], browsersToSupport: string[])
    {
        this.browsersToSupport = browsersToSupport;
        this.features = features;
    }

    public extractBrowserMinimumVersions(): MinimumBrowserVersions
    {
        // Browser minimum version to support is the highest of the lowest supported browser version for a feature.
        // e.g. Check browser minimum version to support for 'let' and 'const' features in 'firefox'. Lowest firefox
        // supported version for 'let' is 30 and 'const' is 33. Therefore, the browser minimum version to support is 33.
        const browsersMinimumVersionToSupport = {};
        this.features.forEach(feature =>
        {
            const minimumBrowserVersions = this.extractMinimumBrowserVersionsForFeature(feature);
            if (!minimumBrowserVersions)
            {
                // ignore - missing data is shown in the table
            }
            else if (!lodash.isString(feature) && feature.optional)
            {
                // ignore optional features
            }
            else
            {
                Object.keys(minimumBrowserVersions)
                    .forEach(browserKey =>
                    {
                        if (!browsersMinimumVersionToSupport[browserKey] ||
                            minimumBrowserVersions[browserKey] > browsersMinimumVersionToSupport[browserKey])
                        {
                            browsersMinimumVersionToSupport[browserKey] = minimumBrowserVersions[browserKey];
                        }
                    });
            }
        });

        return browsersMinimumVersionToSupport;
    }

    public extractMinimumBrowserVersionsForFeature(feature: BrowserFeatureOrString): MinimumBrowserVersions | null
    {
        const featureKey = lodash.isString(feature) ? feature : feature.feature;
        if (!caniuse.features[featureKey])
        {
            return null;
        }

        const minimumBrowsersVersionForFeature: MinimumBrowserVersions = {};

        const featureStats = caniuse.feature(caniuse.features[featureKey]).stats;
        this.browsersToSupport.forEach(browserKey =>
        {
            const browserStats: caniuse.SupportStatusByVersion = featureStats[browserKey];
            if (!browserStats)
            {
                // MAX_SAFE_INTEGER is used to represent the browser currently has no support for the feature
                minimumBrowsersVersionForFeature[browserKey] = Number.MAX_SAFE_INTEGER;
                return;
            }

            const browserVersionStrings: string[] = Object.keys(browserStats)
                // if first character is a 'y', feature is fully supported for browser
                // `y` - fully supported & `y x` - fully supported, vendor prefix
                .filter(versionKey => (browserStats[versionKey][0] === 'y'));
            const browserVersionNumbers: number[] = browserVersionStrings.map((browserVersion) =>
            {
                // some versions are a range. e.g. 10.1-10.2
                const version = browserVersion.split('-')[0];
                // Looking at all Safari versions in https://caniuse.com/#comparison we can see a version named TP.
                // Safari Technology Preview gives you an early look at upcoming web technologies in macOS and iOS.
                // https://developer.apple.com/safari/technology-preview/
                if (browserKey === 'safari' && version === 'TP')
                {
                    // return the largest number that is not represented as no browser support.
                    return Number.MAX_SAFE_INTEGER - 1;
                }

                return Number.parseFloat(version);
            });
            if (browserVersionNumbers.length === 0)
            {
                // MAX_SAFE_INTEGER is used to represent the browser currently has no support for the feature
                minimumBrowsersVersionForFeature[browserKey] = Number.MAX_SAFE_INTEGER;
                return;
            }

            const minimumBrowserVersion = Math.min(...browserVersionNumbers);
            minimumBrowsersVersionForFeature[browserKey] = minimumBrowserVersion;
        });

        return minimumBrowsersVersionForFeature;
    }
}

export default MinimumBrowserSupportExtractor;
