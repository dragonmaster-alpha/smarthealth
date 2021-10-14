import {css} from '@emotion/core';
import lodash from 'lodash';
import {background, colour, field, font} from 'main/application/ThemeConstants';
import React from 'react';
import MinimumBrowserSupportExtractor, {BrowserFeature} from 'test/config/MinimumBrowserSupportExtractor';
import browsersToSupportList from 'test/config/MinimumBrowserSupportExtractor.BrowsersToSupport.json';
import featuresToSupportList from 'test/config/MinimumBrowserSupportExtractor.FeaturesToSupport.json';

/**
 * A table with all the features we need to support in our application. Along side their browser version support.
 *
 * @author Thompson 10/07/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
const tableStyle = css({
    borderCollapse: 'separate',
    borderSpacing: 0,
    backgroundColor: colour.white,
    width: '100%',
    thead: {
        tr: {
            th: {
                backgroundColor: colour.white,
                top: 0,
                position: 'sticky',
                color: colour.label,
                font: font.label,
                textAlign: 'left',
                padding: '4px',
                borderLeft: field.border,
                borderBottom: field.border
            }
        }
    },
    tbody: {
        tr: {
            ':nth-of-type(even)': {
                backgroundColor: background.gridRow,
                borderLeft: field.border
            },
            ':nth-of-type(odd) td': {
                borderLeft: field.border
            },
            td: {
                font: font.text,
                padding: '4px'
            },
            th: {
                font: font.label,
                padding: '4px',
                textAlign: 'left'
            }
        }
    }
});

class MinimumBrowserSupportTable extends React.Component
{
    private extractor = new MinimumBrowserSupportExtractor(featuresToSupportList, browsersToSupportList);

    public render()
    {
        const minimumVersions = this.extractor.extractBrowserMinimumVersions();

        return (
            <table css={tableStyle}>
                <thead>
                <tr>
                    <th>Feature</th>
                    {browsersToSupportList.map(browserName => <th>{browserName}</th>)}
                </tr>
                </thead>
                <tbody>
                {
                    featuresToSupportList.map(feature =>
                    {
                        const versions = this.extractor.extractMinimumBrowserVersionsForFeature(feature);
                        return (
                            <tr>
                                <td>{this.renderFeature(feature)}</td>
                                {browsersToSupportList.map(browserName => (
                                    <td>
                                        {this.renderVersion(versions[browserName])}
                                    </td>
                                ))}
                            </tr>
                        );
                    })
                }
                <tr>
                    <th>Browser minimum support</th>
                    {browsersToSupportList.map(browserName => (
                        <th>
                            {this.renderVersion(minimumVersions[browserName])}
                        </th>
                    ))
                    }
                </tr>
                </tbody>
            </table>
        );
    }

    private renderFeature(feature): React.ReactNode
    {
        if (lodash.isString(feature))
        {
            return <a href={`https://caniuse.com/#feat=${feature}`} target="_blank">{feature}</a>;
        }
        else
        {
            const browserFeature = feature as BrowserFeature;
            const comment = browserFeature.comment && ` - ${browserFeature.comment}`;
            return (
                <>
                    <a href={`https://caniuse.com/#feat=${browserFeature.feature}`} target="_blank">
                        {browserFeature.feature}
                    </a>
                    {browserFeature.optional && '?'}
                    {comment}
                </>
            );
        }
    }

    private renderVersion(version: number): React.ReactNode
    {
        return (version === Number.MAX_SAFE_INTEGER) ? <span>Not supported</span> : <span>{version}</span>;
    }
}

export default MinimumBrowserSupportTable;
