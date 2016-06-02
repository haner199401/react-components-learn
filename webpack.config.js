var webpack = require('webpack'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    BrowserSyncPlugin = require('browser-sync-webpack-plugin'),
    CleanWebpackPlugin = require('clean-webpack-plugin'),
    CopyWebpackPlugin = require('copy-webpack-plugin'),
    path = require('path');

module.exports = {
    entry:'./app/index.jsx',
    output: {
        path: './build',
        filename: 'bundle.js?[hash]'
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel'
        }, {
            test: /\.scss$/,
            loader: ExtractTextPlugin.extract('style!css!scss')
        }, {
            test: /\.css$/,
            loader: ExtractTextPlugin.extract('style!css')
        }]
    },
    resolve: {
        extensions: ['','.js', '.jsx', '.es6', '.json'],
        modulesDirectories: ['node_modules', 'lib'],
        alias:{
           // react:'react' 
        }
    },
    plugins: [
        new CleanWebpackPlugin(['./build']),
        new CopyWebpackPlugin([{from:'./simples',to: './simples'}]),
        new webpack.optimize.CommonsChunkPlugin("vendor","common.js"),
        new ExtractTextPlugin('styleshtee.css'),
        new HtmlWebpackPlugin({
            template:'./app/index.html'
        }),
        new BrowserSyncPlugin({
            notify: true,
            host: 'localhost',
            server: { baseDir: ['./build'] }
        })
    ]
};
