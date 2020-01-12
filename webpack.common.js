const path = require('path');
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin');
const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');

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
        new CopyPlugin([{
            from: path.resolve(__dirname, 'static'),
            to: path.resolve(__dirname, '')
        }],
        ),
        new webpack.DefinePlugin({
            VERSION: JSON.stringify(require("./package.json").version)
        })
    ],
    output: {
        filename: 'dist/bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
};

new webpack.ProvidePlugin({
    $: 'jquery',
    jQuery: 'jquery',
});