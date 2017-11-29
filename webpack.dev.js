const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: "vue-loader"
            }
        ]
    },
    devtool: 'inline-source-map'
});
