const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const generateSourceMap = process.env.OMIT_SOURCEMAP === 'true' ? false : true;
const getCSSModuleLocalIdent = require('react-dev-utils/getCSSModuleLocalIdent');
const path = require('path');

const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;

const esLintLoader = {
    // First, run the linter.
    // It's important to do this before Babel processes the JS.
    test: /\.(js|mjs|jsx)$/,
    enforce: 'pre',
    use: [
        {
            options: {
                formatter: require.resolve('react-dev-utils/eslintFormatter'),
                eslintPath: require.resolve('eslint'),
            },
            loader: require.resolve('eslint-loader'),
        },
    ],
    include: path.join(__dirname, 'src'),
};

const tsLintLoader = {
    test: /\.(ts|tsx)$/,
    enforce: 'pre',
    use: [
        {
            loader: 'tslint-loader',
            options: {
                /* Loader options go here */
            },
        },
    ],
};

const babelLoader = {
    // test: /\.(js|mjs|jsx|ts|tsx)$/,
    // include: /src/,
    // loader: require.resolve('babel-loader'),
    // options: {
    //     customize: require.resolve(
    //         'babel-preset-react-app/webpack-overrides'
    //     ),
    //     plugins: [
    //         [
    //             require.resolve('babel-plugin-named-asset-import'),
    //             {
    //                 loaderMap: {
    //                     svg: {
    //                         ReactComponent: '@svgr/webpack?-prettier,-svgo![path]',
    //                     },
    //                 },
    //             },
    //         ],
    //     ],
    //     // This is a feature of `babel-loader` for webpack (not Babel itself).
    //     // It enables caching results in ./node_modules/.cache/babel-loader/
    //     // directory for faster rebuilds.
    //     cacheDirectory: true,
    //     cacheCompression: false,
    //     compact: false,
    // },

    test: /\.(js|mjs|jsx|ts|tsx)$/,
    exclude: /node_modules/,
    loader: require.resolve('babel-loader'),
    options: {
        plugins: [
            [
                require.resolve('babel-plugin-named-asset-import'),
                {
                    loaderMap: {
                        svg: {
                            ReactComponent: '@svgr/webpack?-prettier,-svgo![path]',
                        },
                    },
                },
            ],
        ],
        cacheDirectory: true,
        cacheCompression: process.env.NODE_ENV === 'production',
        compact: process.env.NODE_ENV === 'production',
    },
};

const cssModuleLoaderClient = {
    test: cssModuleRegex,
    use: [
        require.resolve('css-hot-loader'),
        MiniCssExtractPlugin.loader,
        {
            loader: require.resolve('css-loader'),
            options: {
                camelCase: true,
                modules: true,
                importLoaders: 1,
                sourceMap: generateSourceMap,
                // localIdentName: '[name]__[local]--[hash:base64:5]',
                getLocalIdent: getCSSModuleLocalIdent,
            },
        },
        {
            loader: require.resolve('postcss-loader'),
            options: {
                sourceMap: generateSourceMap,
            },
        },
    ],
};

const cssLoaderClient = {
    test: cssRegex,
    exclude: cssModuleRegex,
    use: [
        require.resolve('css-hot-loader'),
        MiniCssExtractPlugin.loader,
        require.resolve('css-loader'),
        {
            loader: require.resolve('postcss-loader'),
            options: {
                sourceMap: generateSourceMap,
            },
        },
    ],
};

const cssModuleLoaderServer = {
    test: cssModuleRegex,
    use: [
        {
            loader: require.resolve('css-loader'),
            options: {
                exportOnlyLocals: true,
                camelCase: true,
                importLoaders: 1,
                modules: true,
                // localIdentName: '[name]__[local]--[hash:base64:5]',
                getLocalIdent: getCSSModuleLocalIdent,
            },
        },
        {
            loader: require.resolve('postcss-loader'),
            options: {
                sourceMap: generateSourceMap,
            },
        },
    ],
};

const cssLoaderServer = {
    test: cssRegex,
    exclude: cssModuleRegex,
    loader: require.resolve('css-loader'),
};

const urlLoaderClient = {
    test: /\.(png|jpe?g|gif|svg)$/,
    loader: require.resolve('url-loader'),
    options: {
        limit: 2048,
        name: 'assets/[name].[hash:8].[ext]',
    },
};

const urlLoaderServer = {
    ...urlLoaderClient,
    options: {
        ...urlLoaderClient.options,
        emitFile: false,
    },
};

const fileLoaderClient = {
    exclude: [/\.(js|css|mjs|html|ejs|json)$/],
    use: [
        {
            loader: require.resolve('file-loader'),
            options: {
                name: 'assets/[name].[hash:8].[ext]',
            },
        },
    ],
};

const fileLoaderServer = {
    exclude: [/\.(js|css|mjs|html|ejs|json)$/],
    use: [
        {
            loader: require.resolve('file-loader'),
            options: {
                name: 'assets/[name].[hash:8].[ext]',
                emitFile: false,
            },
        },
    ],
};

const client = [
    esLintLoader,
    tsLintLoader,
    {
        oneOf: [
            babelLoader,
            cssModuleLoaderClient,
            cssLoaderClient,
            urlLoaderClient,
            fileLoaderClient,
        ],
    },
];
const server = [
    esLintLoader,
    tsLintLoader,
    {
        oneOf: [
            babelLoader,
            cssModuleLoaderServer,
            cssLoaderServer,
            urlLoaderServer,
            fileLoaderServer,
        ],
    },
];

module.exports = {
    client,
    server,
};
