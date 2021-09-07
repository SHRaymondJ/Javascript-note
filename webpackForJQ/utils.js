const HtmlWebpackPlugin = require('html-webpack-plugin')
const htmlArray = require('./htmlarray.js')
const path = require('path');

//根据模板生成html文件
exports.getHtmlArray = function (moduleExportsPlugins) {

    // 根据模板配置生成 HtmlWebpackPlugin 需要的配置
    const getHtmlConfig = function ( name, chunks) {
        return {
            template: path.resolve(__dirname,`./${name}/${name}.html`),
            filename: `./${name}/${name}.html`,
            inject: true,
            hash: true, // 开启hash
            title: 'Travel Portal,企业差旅管理专家',
            chunks, // 页面要引入的包
            minify: process.env.NODE_ENV === 'development' ? false : {
                removeComments: true, // 移除HTML中的注释
                collapseWhitespace: true, // 折叠空白区域 也就是压缩代码
                removeAttributeQuotes: true, // 去除属性引用
            },
        };
    };

    // 循环创建模板配置
    htmlArray.forEach((element) => {
        const { _html, chunks, title } = element
        moduleExportsPlugins.push(new HtmlWebpackPlugin(getHtmlConfig( _html, chunks, title)))
    })
}

// 入口文件
const glob = require('glob')

exports.getEntry = function () {
    const entry = {}
    // 读取src目录所有page入口
    glob.sync('./src/pages/*.js').forEach((name) => {
        const start = name.indexOf('src\\pages\\') + 9;    //本地路径
        const end = name.length - 3;
        const eArr = [];
        const n = name.slice(start, end).split('/')[1];
        eArr.push(path.resolve(__dirname,name));
        eArr.push('@babel/polyfill'); // 引入这个，是为了用async await，一些IE不支持的属性能够受支持，兼容IE浏览器用的
        entry[n] = eArr;
    })
    return entry;
}