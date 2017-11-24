const merge = require('webpack-merge');
const webpack = require('webpack');
const common = require('./webpack.common.js');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = merge(common, {
    devtool: '#source-map',
    plugins: [
        // short-circuits all Vue.js warning code
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        // minify with dead-code elimination
        new UglifyJsPlugin({
            uglifyOptions: {
                compress: {
                    warnings: false
                }
            }
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        })
    ],
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.runtime.min.js'
        },
        extensions: ['*', '.js', '.vue', '.json']
    }
});
