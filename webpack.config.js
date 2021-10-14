/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const env = process.env.NODE_ENV;

/**
 * Contains all config related to webpack.
 *
 * @author Uditha 09/03/2018
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2018
 */
module.exports = {
    entry: {
        // babel-polyfill needs to be loaded before all other javascript code
        // polyfill: 'babel-polyfill',
        bundle: './src/main/javascript/Index.js'
    },
    output: {
        path: path.join(__dirname, 'target', 'webapp'),
        filename: '[name].js'
    },
    devtool: 'inline-source-map',
    devServer: {
        historyApiFallback: true,
        contentBase: './'
    },
    module: {
        rules: [
            {
                test: /\.(js|tsx)$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                      presets: ['@babel/preset-env'],
                      plugins: ['@babel/plugin-transform-runtime']
                    }
                  },
                exclude: /node_modules/,
            },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(scss|css)$/,
                use: [
                    env === 'production' ? MiniCssExtractPlugin.loader : 'style-loader',
                    'css-loader',
                    'sass-loader'
                ],
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 8000, // Convert images < 8kb to base64 strings
                        name: 'images/[name]-[contenthash].[ext]'
                    }
                }],
                // type: 'javascript/auto'
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 8000,
                        name: 'fonts/[name]-[contenthash].[ext]'
                    }
                }],
                // type: 'javascript/auto'
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json', '.css', '.scss'],
        alias: {
            assets: path.resolve(__dirname, 'src/main/assets/'),
            main: path.resolve(__dirname, 'src/main/javascript/'),
            test: path.resolve(__dirname, 'src/test/javascript/')
        },
    },
    optimization: {
        splitChunks: {
            chunks: 'async',
            minSize: 500000,
            maxSize: 800000,
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all'
                },
            }
        }
    },

    performance: {
        hints: false
      },

    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css'
        }),
        new HtmlWebpackPlugin({
            template: 'src/main/index.html'
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: 'src/main/assets',
                    to: 'assets'
                }
        ]})
    ],
    
    // Following settings is required, because of issue:
    // https://github.com/webpack-contrib/css-loader/issues/447



};
