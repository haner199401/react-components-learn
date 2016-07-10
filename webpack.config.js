var webpack = require('webpack'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    CleanWebpackPlugin = require('clean-webpack-plugin'),
    CopyWebpackPlugin = require('copy-webpack-plugin'),
    OpenBrowserPlugin = require('open-browser-webpack-plugin'),
    path = require('path');

var port = 8089;

module.exports = {
    devServer: {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
        },
        historyApiFallback: true,
        hot: true,
        inline: true,
        progress: true,
        contentBase: './build',
        port: port
    },
    entry: [
        'webpack/hot/dev-server',
        'webpack-dev-server/client?http://localhost:' + port,
        path.resolve(__dirname, 'app/index.jsx')
    ],
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
            test: /\.css$/,
            loader: ExtractTextPlugin.extract('style!css')
        }, {
            test: /\.scss$/,
            loader: ExtractTextPlugin.extract("css!sass")
        }, {
            test: /\.(woff|png|jpg|gif|eot|svg|ttf)$/,
            loader: 'url-loader?limit=10000'
        }]
    },
    resolve: {
        extensions: ['', '.js', '.jsx', '.es6', '.json'],
        modulesDirectories: ['node_modules', 'lib'],
        alias: {
            // react:'react' 
        }
    },
    plugins: [
        new CleanWebpackPlugin(['./build']),
        new CopyWebpackPlugin([{ from: './simples', to: './simples' }]),
        new webpack.optimize.CommonsChunkPlugin("vendor", "common.js"),
        new ExtractTextPlugin('styleshtee.css'),
        new HtmlWebpackPlugin({
            template: './app/index.html'
        }),
        new webpack.HotModuleReplacementPlugin(),
        new OpenBrowserPlugin({ url: 'http://localhost:' + port })
    ]
};
