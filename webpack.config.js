const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: "development",
    entry: {
        index: './src/index.js',
    },
    devServer: {
        port: 9081,
        contentBase: path.resolve(__dirname, 'dist')
    },
    output: {
        filename: 'up.bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
};