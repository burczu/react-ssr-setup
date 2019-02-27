const webpack = require('webpack');
const ManifestPlugin = require('webpack-manifest-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin-alt');
const resolve = require('resolve');
const typescriptFormatter = require('react-dev-utils/typescriptFormatter');

const paths = require('../paths');

const env = require('../env')();

const shared = [];

const client = [
    // TODO: add client side only mode
    // new HtmlWebpackPlugin({
    //     inject: true,
    //     template: paths.appHtml,
    // }),
    new CaseSensitivePathsPlugin(),
    new webpack.DefinePlugin(env.stringified),
    new webpack.DefinePlugin({
        __SERVER__: 'false',
        __BROWSER__: 'true',
    }),
    new MiniCssExtractPlugin({
        filename:
            process.env.NODE_ENV === 'development' ? '[name].css' : '[name].[contenthash].css',
        chunkFilename:
            process.env.NODE_ENV === 'development' ? '[id].css' : '[id].[contenthash].css',
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new ManifestPlugin({ fileName: 'manifest.json' }),

    // TypeScript type checking
    new ForkTsCheckerWebpackPlugin({
        typescript: resolve.sync('typescript', {
            basedir: 'node_modules',
        }),
        async: false,
        checkSyntacticErrors: true,
        tsconfig: paths.tsConfig,
        compilerOptions: {
            module: 'esnext',
            moduleResolution: 'node',
            resolveJsonModule: true,
            isolatedModules: true,
            noEmit: true,
            jsx: 'preserve',
        },
        reportFiles: [
            '**',
            '!**/*.json',
            '!**/__tests__/**',
            '!**/?(*.)(spec|test).*',
            '!**/src/setupProxy.*',
            '!**/src/setupTests.*',
        ],
        watch: paths.src,
        silent: true,
        formatter: typescriptFormatter,
    }),
];

const server = [
    new webpack.DefinePlugin({
        __SERVER__: 'true',
        __BROWSER__: 'false',
    }),
];

module.exports = {
    shared,
    client,
    server,
};
