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
                from: 'index.html',
                to: path.resolve(__dirname, 'docs')
            },
            {
                from: path.resolve(__dirname, 'static'),
                to: path.resolve(__dirname, 'docs')
            }
        ])
    ],
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'docs'),
    },
};

new webpack.ProvidePlugin({
    $: 'jquery',
    jQuery: 'jquery',
});