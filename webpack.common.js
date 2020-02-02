const path = require('path');
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    entry: {
        app: './src/index.js',
    },
    module: {
        rules: [{
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
        }]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new webpack.DefinePlugin({
            VERSION: JSON.stringify(require("./package.json").version)
        })
    ],
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
};

new webpack.ProvidePlugin({
    $: 'jquery',
    jQuery: 'jquery',
});