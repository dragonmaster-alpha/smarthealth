/**
 * Custom webpack config for Storybook
 *
 * For more information refer the docs: https://storybook.js.org/configurations/custom-webpack-config
 *
 * @author Uditha 10/10/2018
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2018
 */
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const mainConfig = require('../../../../webpack.config');

// eslint-disable-next-line no-unused-vars
module.exports = async ({ config, mode }) =>
{
    const plugins = [
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: 'src/main/assets',
                    to: 'assets'
                }
        ]}),

        new MiniCssExtractPlugin({
            filename: '[name].css'
        })
    ];

    return {
        ...config,
        module: { ...config.module, ...mainConfig.module },
        resolve: { ...mainConfig.resolve },
        plugins: [...config.plugins, ...plugins]
    };
};
