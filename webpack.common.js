'use strict';

const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, './dist'),
        chunkFilename: '[name].bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.less$/,
                use: ['style-loader','css-loader','less-loader']
            },
            {
                test: /\.css$/,
                use: ['style-loader','css-loader!postcss-loader']
            },
            {
                test: /\.scss$/, use: ExtractTextPlugin.extract({
                fallback: 'style-loader', use: 'css-loader!postcss-loader!sass-loader'}
            )
            },
            {
                test: /\.woff(2)?(\?v=\d+\.\d+\.\d+)?$/,
                use:[ { loader: "url-loader", options: {limit: 10000, mimetype: 'application/font-woff'} }]
            },
            {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                use:[ { loader: "url-loader", options: {limit: 10000, mimetype: 'application/octet-stream'} }]
            },
            {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                use: ["file-loader"]
            },
             {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                }
            },
            {
                test: /\.vue$/,
                loader: "vue-loader",
                options: {
                    loaders: {
                        js: 'babel-loader'
                    },
                    esModule: false,
                    postcss:[
                        require('postcss-cssnext')()
                    ]
                }
            },
            {
                enforce: 'pre',
                test: /\.vue$/,
                loader: 'eslint-loader',
                exclude: /node_modules/
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                use:[ { loader: "url-loader", options: {limit: 10000, mimetype: 'application/svg+xml'} }]
            }
        ]
    },
    /**
     * Useful for bootstrap.
     **/
    plugins: [new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        Popper: ['popper.js', 'default'],
        "window.jQuery": "jquery",
        Tether: "tether",
        "window.Tether": "tether",
        Alert: "exports-loader?Alert!bootstrap/js/dist/alert",
        Button: "exports-loader?Button!bootstrap/js/dist/button",
        Carousel: "exports-loader?Carousel!bootstrap/js/dist/carousel",
        Collapse: "exports-loader?Collapse!bootstrap/js/dist/collapse",
        Dropdown: "exports-loader?Dropdown!bootstrap/js/dist/dropdown",
        Modal: "exports-loader?Modal!bootstrap/js/dist/modal",
        Popover: "exports-loader?Popover!bootstrap/js/dist/popover",
        Scrollspy: "exports-loader?Scrollspy!bootstrap/js/dist/scrollspy",
        Tab: "exports-loader?Tab!bootstrap/js/dist/tab",
        Tooltip: "exports-loader?Tooltip!bootstrap/js/dist/tooltip",
        Util: "exports-loader?Util!bootstrap/js/dist/util",
    })]
};
