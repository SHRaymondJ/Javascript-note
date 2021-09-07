const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const webpack = require('webpack')
const { getHtmlArray,getEntry } = require('./utils.js')

module.exports = {
    mode: 'development',    //模式
    entry: getEntry(),
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].bundle.js',
        environment: {
            arrowFunction: false
        }
    },
    devServer: {
        historyApiFallback: true,
        contentBase: path.resolve(__dirname, './dist'),
        open: true,
        compress: true,
        hot: true,
        port: 8080,
        openPage: 'index/index.html'
    },
    target: 'web',
    module: {
        rules: [
            // JavaScript
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            //Images
            {
                test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
                type: "asset/resource"
            },
            // CSS, PostCSS, and Sass
            {
                test: /\.(scss|css)$/,
                use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
            }
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: 'jquery',
            jquery: 'jquery'
        }),
    ]
}
getHtmlArray(module.exports.plugins)
