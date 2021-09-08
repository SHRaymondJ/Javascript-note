const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const webpack = require('webpack')
const { getHtmlArray, getEntry } = require('./utils.js')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = {
    mode: 'production',    //模式 development / production
    entry: getEntry(),
    output: {
        path: path.resolve(__dirname, './dist'),
        // publicPath: '/',
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
        disableHostCheck: true,
        openPage: 'login/LoginPageBCDTest.html'
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
                use: [{
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        publicPath: '/',
                    }
                },
                {
                    loader: 'css-loader',
                    options: {
                        importLoaders: 2,
                        url: false
                    }
                }, 'postcss-loader', 'sass-loader']
            },
            {
                test: /\.svg/,
                type: 'asset/inline'
            },

            {
                test: /\.html$/,
                loader: "html-loader",
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new MiniCssExtractPlugin(),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: 'jquery',
            jquery: 'jquery'
        }),
    ],

}
getHtmlArray(module.exports.plugins)
