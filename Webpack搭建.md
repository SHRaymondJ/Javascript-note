# Webpack

## [基本安装](https://webpack.docschina.org/guides/getting-started/)

```
mkdir webpack-demo 	//创建项目目录
cd webpack-demo		//进入项目目录
npm init -y			//初始化npm（创建package.json）
npm install webpack webpack-cli --save-dev	//安装webpack-cli
yarn add webpack webpack-cli --dev	//安装webpack-cli或者用这句
```

## 什么是 webpack？

现在，大多数网站不再只是单单的由原生JS+纯HTML编写的，还涉及一些浏览器无法理解的语言，如果项目大，文件多，对应的体积就大。所以要压缩文件和翻译成所有浏览器都能理解的东西，这就是`webpack`的用武之地。

**webpack** 可以看做是模块打包器：它做的事情是，分析你的项目结构，找到JavaScript模块以及其它的一些浏览器不能直接运行的拓展语言（Scss，TypeScript等），并将其打包为合适的格式以供浏览器使用。

对于开发，webpack 还提供了一个开发服务器，它可以在我们保存时动态地更新模块和样式。`vue create`和`create-response-app`本质上都依赖于 webpack。

webpac k可以做很多事情，本文只是帮助大家熟悉一些主要概念并进行一些手动的配置。

## 安装

首先，创建一个目录`webpack-tutorial`，相关命令如下：

```
mkdir webpack-tutorial
cd webpack-tutorial
npm init -y  // 创建默认的 package.json
```

安装`webpack`和`webpack-cli`：

```
npm i -D webpack webpack-cli
```

接着，创建目录 `src`，并在其里面创建 `index.js`，内容如下：

```
console.log('Interesting!')
```

## 基本配置

在项目的根目录中创建一个`webpack.config.js`。

#### Entry

`entry`是配置模块的入口，可抽象成输入，`Webpack` 执行构建的第一步将从入口开始搜寻及递归解析出所有入口依赖的模块。

`entry` 配置是必填的，若不填则将导致 Webpack 报错退出。这里，我们将`src/index.js`做为入口点。

```
const path = require('path')

module.exports = {
  entry: {
    main: path.resolve(__dirname, './src/index.js'),
  },
}
```

#### Output

配置 `output` 选项可以控制 webpack 如何向硬盘写入编译文件。注意，即使可以存在多个入口起点，但只指定一个`输出`配置。这里指定输出的路径为 'dist'：

```
module.exports = {
  /* ... */

  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].bundle.js',
  },
}
```

现在，我们具有构建捆绑包所需的最低配置。 在`package.json`中，我们可以创建一个运行`webpack`命令的构建脚本。

```
"scripts": {
  "build": "webpack"
}
```

现在可以运行它了:

```
npm run build
```

![clipboard.png](https://segmentfault.com/img/bVcHRV5)

现在在 dist 目录会生成一个 `main.bundle.js` 文件

## 插件

webpack有一个插件接口，这使得它更加灵活。内部webpack代码和第三方扩展使用插件，有一些主要的方法几乎每个webpack项目都会用到。

## HTML 模板文件

目前，我们有一个随机的bundle文件，但它对我们还不是很有用。如果需要使用`main.bundle.js`，就要借助 HTML页面来加载这个 JS 包作为脚本。我们希望HTML文件自动引入这个生成 `js` 文件，所以我们将使用`html-webpack-plugin`创建一个HTML模板。

安装一下：

```
npm i -D html-webpack-plugin
```

在`src`文件夹中创建一个`template.html`文件，这里，我们自定义一个`title`，内容如下：

**src/template.html**

```
<!DOCTYPE html>
<html lang="en">
  <head>
    <title><%= htmlWebpackPlugin.options.title %></title>
  </head>

  <body>
    <div id="root"></div>
  </body>
</html>
```

创建配置的`plugins`属性，然后将插件，文件名添加到输出（`index.html`），并链接到将基于该模板的模板文件。

```
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  /* ... */

  plugins: [
    new HtmlWebpackPlugin({
      title: 'webpack Boilerplate',
      template: path.resolve(__dirname, './src/template.html'), // template file
      filename: 'index.html', // output file
    }),
  ],
}
```

现在再次运行构建，会看到`dist`文件夹现在包含一个`index.html`，里面也自动引入了我们打包好的 js 文件。用浏览器打开 `index.html`，会在控制台看到 `Interesting!`。

接着，在`index.js`中我们动态插入一些 dom 元素到页面中，内容如下：

```
// Create heading node
const heading = document.createElement('h1')
heading.textContent = 'Interesting!'

// Append heading node to the DOM
const app = document.querySelector('#root')
app.append(heading)
```

重新构建，在进入 dist 目录下面，用 `http-server` 运行 html 文件。

```
http-server
```

可以在页面上看到，我们注入的 `"Interesting!"`，还会注意到捆绑文件已缩小。

> **注意**:在安装`HtmlWebpackPlugin`后，你会看到一个`DeprecationWarning`，因为插件在升级到webpack 5后还没有完全摆脱`deprecation`警告。

## Clean

我们还需要设置`clean-webpack-plugin`,在每次构建后清除`dist`文件夹中的所有内容。 这对于确保不遗留任何旧数据很重要。

`clean-webpack-plugin`-删除/清理构建文件夹

```
const path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')

module.exports = {
  /* ... */

  plugins: [
    /* ... */
    new CleanWebpackPlugin(),
  ],
}
```

## Modules and Loaders

webpack 使用 `loader` 预处理一些加载的文件，如 js 文件、静态资源(如图像和CSS样式)和编译器(如`TypeScript`和`Babel`)。webpack 5也有一些内置的资产加载器。

在我们的项目中，有一个HTML文件，该文件可以加载并引入一些 JS ，但实际上并没有执行任何操作。 那么这个`webpack`配置要做的主要事情是什么？

- 将 JS 编译为浏览器可以理解的版本
- 导入样式并将 `SCSS` 编译为 `CSS`
- 导入图像和字体
- （可选）设置React或Vue

## Babel (JavaScript)

`Babel`是一个工具，可让使用最新的 JS 语法。

建立一个规则来检查项目中（`node_modules`之外）的任何`.js`文件，并使用`babel-loader`进行转换。 Babel 还有一些其他的依赖项：

- `babel-loader`-使用 Babel 和 webpack 传输文件。
- `@babel/core`-将ES2015+ 转换为向后兼容的 JavaScript
- `@babel/preset-env`-Babel 的智能默认设置
- `@babel/plugin-proposal-class-properties`-自定义 Babel 配置的示例（直接在类上使用属性）

```
npm i -D babel-loader @babel/core @babel/preset-env @babel/preset-env @babel/plugin-proposal-class-properties
```

**webpack.config.js**

```
module.exports = {
  /* ... */

  module: {
    rules: [
      // JavaScript
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
    ],
  },
}
```

> 如果是 TypeScript 项目，使用的是`typescript-loader`而不是`babel-loader`。

现在Babel已经设置好了，但是我们的`Babel`插件还没有。可以在`index.js`中添加一些新的语法来证明它还不能正常工作。

```
// 创建没有构造函数的类属性
class Game {
  name = 'Violin Charades'
}
const myGame = new Game()
// 创建 p 节点
const p = document.createElement('p')
p.textContent = `I like ${myGame.name}.`

const heading = document.createElement('h1')
heading.textContent = 'Interesting!'

const app = document.querySelector('#root')
app.append(heading, p)
```

![clipboard.png](https://segmentfault.com/img/bVcHSmw)

要解决这个问题，只需在项目的根目录中创建一个`.babelrc`文件。可以使用`preset-env`和`plugin-proposal-class-properties`添加更多默认值。

```
{
  "presets": ["@babel/preset-env"],
  "plugins": ["@babel/plugin-proposal-class-properties"]
}
```

现在运行`npm run build` 一切准备就绪。

## Images

假设我们需要引用一张图片并直接导入到 JS 文件中，这样是无法正常工作的。 为了演示，创建 `src/ images` 并向其中添加图像，然后尝试将其导入到`index.js`文件中。

**src/index.js**

```
import example from './images/example.png'

/* ... */
```

运行构建时，再次看到错误：

![clipboard.png](https://segmentfault.com/img/bVcHSoX)

`webpack`有一些内置的[asset modules](https://link.segmentfault.com/?url=https%3A%2F%2Fwebpack.js.org%2Fguides%2Fasset-modules%2F) ，可用于静态资源。 对于图像类型，我们将使用`asset/resource`,注意，这里是一个`type`，而不是`loader`。

**webpack.config.js**

```
module.exports = {
  /* ... */
  module: {
    rules: [
      // Images
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: 'asset/resource',
      },
    ],
  },
}
```

构建后，可以在`dist`文件夹查看。

## 字体和内联

webpack 还有一`个asset module` ，可以使用`asset/inline`内联某些数据，例如`svgs`和字体。

**src/index.js**

```
import example from './images/example.svg'

/* ... */
```

**webpack.config.js**

```
module.exports = {
  /* ... */
  module: {
    rules: [
      // Fonts and SVGs
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        type: 'asset/inline',
      },
    ],
  },
}
```

## Styles

同样的需要使用 `style loader`才能在脚本中执行类似`import 'file.css'`的操作。

现在很多人都在使用[CSS-in-JS](https://link.segmentfault.com/?url=https%3A%2F%2Fcssinjs.org%2F)、[styled-components](https://link.segmentfault.com/?url=https%3A%2F%2Fstyled-components.com%2F)和其他工具来将样式引入到他们的 JS 应用程序中。

当网站只有一个 CSS 文件，仅能够加载一个CSS文件就足够了。但如果想使用[PostCSS](https://link.segmentfault.com/?url=https%3A%2F%2Fpostcss.org%2F)，为了能在任何浏览器中使用所有最新的CSS特性。或者想使用Sass, CSS预处理器，那就需要使用其它的 loader 处理。

我想使用这三种方法——在Sass中编写，在`PostCSS`中处理，以及编译到CSS。这需要引入一些加载器和依赖项。

- `sass-loader` — 加载 SCSS 并编译为CSS
- `node-sass` — Node Sass
- `postcss-loader` — 使用 PostCSS 处理 CSS
- `css-loader` — 解析 css import
  - `style-loader` —— 将CSS注入到DOM中（和MiniCssExtractPlugin不能同时用，如果用需要放在css-loader之前）
- `MiniCssExtractPlugin.loader` —— 将CSS转成JS再注入CSS

```
npm i -D sass-loader postcss-loader css-loader style-loader postcss-preset-env node-sass
```

就像Babel一样，PostCSS 也需要一个配置文件 `postcss.config.js`，在根目录中创建它，并输入以下内容：

**postcss.config.js**

```
module.exports = {
  plugins: {
    'postcss-preset-env': {
      browsers: 'last 2 versions',
    },
  },
}
```

为了测试 Sass 和 PostCSS 是否正常工作，创建 `src/styles/main.scss`，并输入以下内容：

**src/styles/main.scss**

```
$font-size: 1rem;
$font-color: lch(53 105 40);

html {
  font-size: $font-size;
  color: $font-color;
}
```

现在，将文件导入`index.js`并添加四个 `loader` 。 它们从最后编译到第一个，因此列表中最后一个是`sass-loader`，因为需要编译，然后是`PostCSS`，然后是CSS，最后是`style-loader`，它将CSS注入到DOM 中。

**src/index.js**

```
import './styles/main.scss'

/* ... */
```

**webpack.config.js**

```javascript
module.exports = {
  /* ... */
  module: {
    rules: [
      // CSS, PostCSS, and Sass
      {
        test: /\.(scss|css)$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'],
      },
    ],
  },
  plugins: [
  	new MiniCssExtractPlugin()
  ]
}
```

现在，重新构建时，项目中已经应用了`Sass`和`PostCSS`。

## JQuery

全局解析JQuery代码

```javascript
module.exports = {
    /* ... */
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: 'jquery',
            jquery: 'jquery'
        })
    ]
}
```



## 开发

每次进行更新时都要运行`npm run build`，站点越大，构建所需的时间就越长，这样就十分的烦琐。 为此可以为 webpack 设置两种配置：

- 生产配置，用于最小化，优化和删除所有源映射
- 开发配置，该配置在服务器中运行webpack，每次更改都会更新，并具有源映射

开发模式下是在内存中运行所有内容，而不是构建一个`dist`文件，需要安装 `webpack-dev-server`

```
npm i -D webpack-dev-server
```

出于演示目的，我们可以仅将开发配置添加到正在构建的当前`webpack.config.js`文件中并对其进行测试。 但是，我们开发一般要创建两个配置文件：一个生产环境用的 `mode: production`，一个开发环境用的`mode: development`。`mode:production` 环境下打包后的文件压缩的更小。

```javascript
const webpack = require('webpack')

module.exports =  {
  /* ... */
  mode: 'development',
  devServer: {
    historyApiFallback: true,
    contentBase: path.resolve(__dirname, './dist'),
    open: true,
    compress: true,
    hot: true,
    port: 8080,
  },

  plugins: [
    /* ... */
    // Only update what has changed on hot reload
    new webpack.HotModuleReplacementPlugin(),
  ],
})
```

我们添加`mode: development`，并创建`devServer`属性，其中，默认端口将为`8080`，自动打开浏览器窗口，并使用`hot-module-placement`，这需要`webpack.HotModuleReplacementPlugin`插件。 这样模块执行更新而无需完全重新加载页面-因此，如果你更新某些样式，则这些样式将发生变化，并且不用重新加载整个 JS ，大大加快了开发速度。

现在，可以使用`webpack serve`命令来启动项目。

**package.json**

```
"scripts": {
  "start": "webpack serve"
}
npm start
```

运行此命令时，将在浏览器中自动弹出一个指向`localhost：8080`的链接。 现在，您可以更新Sass和JavaScript，并观看其动态更新。

### 热更新

开发的时候不用一次次打包，测试，代码保存之后，浏览器直接更新

```javascript
const webpack = require('webpack')
module.export = {
	plugins: [
        new webpack.HotModuleReplacementPlugin(),
    ]
}
```





### package.json

```json
{
  "name": "webpack-demo",
  "version": "1.0.0",
  "description": "",
  "private": true,
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "webpack serve",
    "build": "webpack"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "@babel/core": "^7.14.6",
    "@babel/plugin-proposal-class-properties": "^7.14.5",
    "@babel/polyfill": "^7.12.1",
    "@babel/preset-env": "^7.14.7",
    "babel-loader": "^8.2.2",
    "clean-webpack-plugin": "^4.0.0-alpha.0",
    "copy-webpack-plugin": "^9.0.1",
    "core-js": "^3.15.2",
    "cross-env": "^7.0.3",
    "css-loader": "^6.1.0",
    "eslint": "^7.30.0",
    "eslint-loader": "^4.0.2",
    "file-loader": "^6.2.0",
    "glob": "^7.1.7",
    "html-loader": "^2.1.2",
    "html-webpack-plugin": "^5.3.2",
    "mini-css-extract-plugin": "^2.1.0",
    "node-sass": "^6.0.1",
    "optimize-css-assets-webpack-plugin": "^6.0.1",
    "postcss": "^8.3.5",
    "postcss-loader": "^6.1.1",
    "postcss-preset-env": "^6.7.0",
    "sass": "^1.35.2",
    "sass-loader": "^12.1.0",
    "style-loader": "^3.1.0",
    "ts-loader": "^9.2.3",
    "url-loader": "^4.1.1",
    "webpack": "^5.44.0",
    "webpack-cli": "^4.7.2",
    "webpack-dev-server": "^3.11.2",
    "webpack-merge": "^5.8.0"
  },
  "dependencies": {
    "jquery": "^3.6.0",
    "typescript": "^4.3.5"
  }
}

```



## 常见问题

**Q: 报错 SCRIPT5022: SecurityError sockjs.js (1687,3)**

A: 找到/node_modules/sockjs-client/dist/sockjs.js 找到代码的 1605行 try { // self.xhr.send(payload)

**Q: Promise找不到**

A: 入口文件头引入"core-js/features/promise"

**Q: 各种语法找不到**

A: webpack5 打包的时候默认会用一些 ES6 的语法糖，需要在 output 的时候配置一下，如下：

```javascript
{
    output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].bundle.js',
    environment: {
        arrowFunction: false,  // 不支持箭头函数
        bigIntLiteral: false,  // 不支持BigInt
        const: true,
        destructuring: false,  // 不支持解构
        dynamicImport: false,  // 不支持异步import
        forOf: false,   // 不支持for...of
        module: false,  // 不支持module
    },
}}
```

**Q: js中的图片加载不出**

A: JS中图片需要先引入，再调用，webpack 才能识别出图片并打包

**Q: CSS中的图片路径不对**

A: 如果用的 `MiniCssExtractPlugin.loader` 打包 css 文件，在 `MiniCssExtractPlugin.loader` 下设置个 publicPath

```javascript
 {
     test: /\.(scss|css)$/,
         use: [{
             loader: MiniCssExtractPlugin.loader,
             options: {
                 publicPath: '../',
             }
         }, 'css-loader', 'postcss-loader', 'sass-loader']
 },
```





# -------------分割----------------------------





## 引言

- 前一段时间我把 webpack 源码大概读了一遍;
- webpack 到 4.x 版本后，其源码已经比较庞大;
- 对各种开发场景进行了高度抽象;
  - 阅读成本也愈发昂贵;



- 过度分析源码对于大家并没有太大的帮助;
- 本文主要是想通过分析 webpack 的:
  - '构建流程'以及'实现'一个简单的 webpack;
  - 让大家对 webpack 的'内部原理'有一个大概的了解;

## webpack 构建流程分析

- entry-option: 初始化流程;
- run: 开始编译;
- make: 从 entry 开始'递归的'分析依赖，对每个'依赖模块'进行 build;
- before-resolve: 对'模块位置'进行解析;
- build-module: 开始'构建'某个'模块';
- normal-module-loader: 将 loader 加载完成的 module 进行编译，生成 AST 树;
- program: 遍历 AST 树，当遇到 require 等一些调用表达式时，收集依赖;
- seal: 所有依赖 build 完成，开始优化;
- emit: 输出到 dist 目录;
- webpack 的'运行流程'是一个'串行'的过程;
- 从启动到结束会依次执行以下流程:
  - 首先会从'配置文件'和 'Shell 语句'中'读取'与'合并'参数;
    - 并初始化'需要使用的插件'和'配置插件'等'执行环境'所需要的参数;
  - 初始化完成后会调用 Compiler 的 run:
    - 来真正启动 webpack'编译构建'过程;
  - webpack 的构建流程包括:
    - compile
    - make
    - build
    - seal
    - emit
- 执行完这些阶段就完成了构建过程;

### 阿辉小结（笔记）：

- (个人当前理解，后面随着学习深入，会逐步进行调整)
- 简单的说，webpack 的构建流程就是：
  - 先用 compiler 的 run 命令启动编译;
  - 然后再开始递归分析所有"依赖模块"，对每个"依赖模块"进行 build；
  - build 步骤要细：
    - 先分析模块位置；
    - 开始构建一个个模块；
    - 将所有模块生成 AST 树进行遍历；
    - 遍历过程中遇到 require 等一些调用表达式时，收集依赖;
    - 所有模块构建与依赖收集完毕,开始优化;
    - 最后，输出到 dist 目录;

### 初始化

#### entry-options 启动

- 从'配置文件'和 'Shell 语句'中'读取与合并'参数，得出最终的参数;

#### run 实例化

- compiler:
  - 用上一步'得到的参数'初始化 Compiler 对象;
  - 加载所有配置的插件;
  - 执行对象的 run 方法开始执行编译;

### 编译构建

#### entry 确定入口

- 根据配置中的 entry 找出所有的入口文件;

#### make 编译模块

- 从入口文件出发:
  - 调用所有配置的 Loader 对模块进行翻译;
  - 再找出该模块依赖的模块;
  - 再递归本步骤:
    - 直到所有'入口依赖'的文件都经过了本步骤的处理;

#### build module 完成模块编译

- 经过上面一步使用 Loader 翻译完所有模块后;
  - 得到了每个模块被翻译后的最终内容;
  - 以及它们之间的依赖关系;

#### seal 输出资源

- 根据'入口'和'模块'之间的依赖关系;
  - 组装成一个个包含多个模块的 Chunk;
- 再把每个 Chunk 转换成一个单独的文件加入到输出列表;
- 这步是可以修改输出内容的最后机会;

#### emit 输出完成

- 在确定好输出内容后;
  - '根据配置'确定输出的'路径'和'文件名';
  - 把文件内容写入到文件系统;
- 分析完构建流程，下面让我们自己动手实现一个简易的 webpack 吧;

## 实现一个简易的 webpack

### 准备工作

#### 目录结构

- 我们先来初始化一个项目，结构如下：

```javascript
|-- forestpack
    |-- dist
    |   |-- bundle.js
    |   |-- index.html
    |-- lib
    |   |-- compiler.js
    |   |-- index.js
    |   |-- parser.js
    |   |-- test.js
    |-- src
    |   |-- greeting.js
    |   |-- index.js
    |-- forstpack.config.js
    |-- package.json
```

- 这里我先解释下每个文件/文件夹对应的含义：
  - dist：打包目录
  - lib：核心文件，主要包括 compiler 和 parser
    - compiler.js:
      - 编译相关;
      - Compiler 为一个类, 并且有 run 方法去开启编译;
      - 还有构建 module（buildModule）和输出文件（emitFiles）;
    - parser.js:
      - 解析相关;
      - 包含解析 AST（getAST）;
      - 收集依赖（getDependencies）;
      - 转换（es6 转 es5）;
    - index.js:
      - 实例化 Compiler 类;
      - 并将配置参数（对应 forstpack.config.js）传入;
    - test.js:
      - 测试文件;
      - 用于测试方法函数打 console 使用;
  - src：源代码。也就对应我们的业务代码;
  - forstpack.config.js： 配置文件。类似 webpack.config.js;
  - package.json：这个就不用我多说了～～～（什么，你不知道？？）

#### package.json 是什么?

- 什么是 Node.js 的模块（Module）？
- 在 Node.js 中，模块是一个库或者框架；
  - 也是一个 Node.js 项目；
- Node.js 项目遵循模块化架构：
  - 当我们创建了一个 Node.js 项目；
  - 意味着创建了一个模块;
- 这个模块的描述文件，被称为 package.json;

#### 先完成“造轮子”前 30%的代码

- 项目搞起来了，但似乎还少点东西～～
- 对了！基础的文件我们需要先完善下：
  - forstpack.config.js
  - src
- 首先是 forstpack.config.js：

```javascript
const path = require("path");

module.exports = {
  entry: path.join(__dirname, "./src/index.js"),
  output: {
    path: path.join(__dirname, "./dist"),
    filename: "bundle.js",
  },
};
```

- 内容很简单，定义一下入口、出口;
- 其次是 src，这里在 src 目录下定义了两个文件：
- greeting.js:

```javascript
// greeting.js
export function greeting(name) {
  return "你好" + name;
}
```

- index.js:

```javascript
import { greeting } from "./greeting.js";
document.write(greeting("森林"));
```

- ok，到这里我们已经把需要准备的工作都完成了;
- 问：为什么这么基础？答：当然要基础了，我们的核心是“造轮子”！！）

### 梳理下逻辑

- 短暂的停留一下，我们梳理下逻辑：
- Q: 我们要做什么？
- A: 做一个比 webpack 更强的 super webpack;(吹了起来)
- Q: 怎么去做？
- A: 看下文
- Q: 整个的流程是什么？
- A: 大概流程就是:
  - 读取入口文件
  - 分析入口文件:
    - '递归'的去'读取模块所依赖'的'文件内容';
    - 生成 AST 语法树;
  - 根据 AST 语法树:
    - 生成浏览器能够运行的代码;

### 正式开工

#### compile.js 编写

```javascript
const path = require("path");
const fs = require("fs");

module.exports = class Compiler {
  // 接收通过lib/index.js new Compiler(options).run()传入的参数，对应`forestpack.config.js`的配置
  constructor(options) {
    const { entry, output } = options;
    this.entry = entry;
    this.output = output;
    this.modules = [];
  }
  // 开启编译
  run() {}
  // 构建模块相关
  buildModule(filename, isEntry) {
    // filename: 文件名称
    // isEntry: 是否是入口文件
  }
  // 输出文件
  emitFiles() {}
};
```

- compile.js 主要做了几个事情：
  - 接收 forestpack.config.js 配置参数，并初始化 entry、output;
  - 开启编译 run 方法:
    - 处理构建模块;
    - 收集依赖;
    - 输出文件;
    - 等;
  - buildModule 方法:
    - 主要用于构建模块（被 run 方法调用）;
  - emitFiles 方法: - 输出文件（同样被 run 方法调用）;
- 到这里，compiler.js 的大致结构已经出来了;
- 但是得到模块的源码后, 需要去解析;
  - '替换源码'和'获取模块的依赖项';
  - 也就对应我们下面需要完善的 parser.js;

#### parser.js 编写

```javascript
const fs = require("fs");
// const babylon = require("babylon");
const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const { transformFromAst } = require("babel-core");
module.exports = {
  // 解析我们的代码生成AST抽象语法树
  getAST: (path) => {
    const source = fs.readFileSync(path, "utf-8");

    return parser.parse(source, {
      sourceType: "module", //表示我们要解析的是ES模块
    });
  },
  // 对AST节点进行递归遍历
  getDependencies: (ast) => {
    const dependencies = [];
    traverse(ast, {
      ImportDeclaration: ({ node }) => {
        dependencies.push(node.source.value);
      },
    });
    return dependencies;
  },
  // 将获得的ES6的AST转化成ES5
  transform: (ast) => {
    const { code } = transformFromAst(ast, null, {
      presets: ["env"],
    });
    return code;
  },
};
```

- 看完这代码是不是有点懵（说好的保证让看懂的 ）
- 别着急，你听我辩解！！
- 这里要先着重说下用到的几个 babel 包：
  - @babel/parser:
    - 用于将源码生成 AST;
  - @babel/traverse:
    - 对 AST 节点进行递归遍历;
  - babel-core/@babel/preset-env:
    - 将获得的 ES6 的 AST 转化成 ES5;
- parser.js 中主要就三个方法：
  - getAST:
    - 将获取到的模块内容 解析成 AST 语法树;
  - getDependencies:
    - 遍历 AST，将用到的依赖收集起来;
  - transform:
    - 把获得的 ES6 的 AST 转化成 ES5;

### 完善 compiler.js

- 在上面我们已经将 compiler.js 中会用到的函数占好位置;
- 下面我们需要完善一下 compiler.js:
  - 当然会用到 parser.js 中的一些方法;
  - 直接上代码：

```javascript
const { getAST, getDependencies, transform } = require("./parser");
const path = require("path");
const fs = require("fs");

module.exports = class Compiler {
  constructor(options) {
    const { entry, output } = options;
    this.entry = entry;
    this.output = output;
    this.modules = [];
  }
  // 开启编译
  run() {
    const entryModule = this.buildModule(this.entry, true);
    this.modules.push(entryModule);
    this.modules.map((_module) => {
      _module.dependencies.map((dependency) => {
        this.modules.push(this.buildModule(dependency));
      });
    });
    // console.log(this.modules);
    this.emitFiles();
  }
  // 构建模块相关
  buildModule(filename, isEntry) {
    let ast;
    if (isEntry) {
      ast = getAST(filename);
    } else {
      const absolutePath = path.join(process.cwd(), "./src", filename);
      ast = getAST(absolutePath);
    }

    return {
      filename, // 文件名称
      dependencies: getDependencies(ast), // 依赖列表
      transformCode: transform(ast), // 转化后的代码
    };
  }
  // 输出文件
  emitFiles() {
    const outputPath = path.join(this.output.path, this.output.filename);
    let modules = "";
    this.modules.map((_module) => {
      modules += `'${_module.filename}' : function(require, module, exports) {${_module.transformCode}},`;
    });

    const bundle = `
        (function(modules) {
          function require(fileName) {
            const fn = modules[fileName];
            const module = { exports:{}};
            fn(require, module, module.exports)
            return module.exports
          }
          require('${this.entry}')
        })({${modules}})
    `;

    fs.writeFileSync(outputPath, bundle, "utf-8");
  }
};
```

- 关于 compiler.js 的内部函数，上面我说过一遍，这里主要来看下 emitFiles：
  - 这里的 bundle 一大坨，什么鬼？
- 我们先来了解下 webpack 的文件'打包'机制;
  - 下面一段代码是经过 webpack 打包精简过后的代码:

```javascript
// dist/index.xxxx.js
(function(modules) {
  // 已经加载过的模块
  var installedModules = {};

  // 模块加载函数
  function __webpack_require__(moduleId) {
    if(installedModules[moduleId]) {
      return installedModules[moduleId].exports;
    }
    var module = installedModules[moduleId] = {
      i: moduleId,
      l: false,
      exports: {}
    };
    modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
    module.l = true;
    return module.exports;
  }
  __webpack_require__(0);
})([
/* 0 module */
(function(module, exports, __webpack_require__) {
  ...
}),
/* 1 module */
(function(module, exports, __webpack_require__) {
  ...
}),
/* n module */
(function(module, exports, __webpack_require__) {
  ...
})]);
```

- 简单分析下：

  - webpack 将所有模块(可以简单理解成文件):

    - 包裹于一个函数中;
    - 并传入默认参数;
    - 然后将所有模块：
      - 放入一个数组中，取名为 modules;
      - 并通过数组的下标来作为 moduleId;

  - 将 modules 传入一个自执行函数中:

    - 自执行函数中包含:
      - 一个 installedModules 已经加载过的模块;
      - 一个模块加载函数;
    - 最后加载入口模块并返回;

  - ```javascript
    __webpack_require__
    ```

     

    模块加载;

    - 先判断 installedModules 是否已加载;
    - 加载过了就直接返回 exports 数据;
    - 没有加载过该模块就通过:
      - modules[moduleId].call(module.exports, module, module.exports, `__webpack_require__`)执行模块;
      - 并且将 module.exports 给返回;

- (还是没听懂!)

- 那我换个说法吧：

  - 经过 webpack 打包出来的是一个匿名闭包函数（IIFE）;
  - modules 是一个数组:
    - 每一项是一个模块初始化函数;
  - `__webpack_require__`用来加载模块，返回 module.exports;
  - 通过 WEBPACK_REQUIRE_METHOD(0)启动程序

### lib/index.js 入口文件编写

- 到这里，就剩最后一步了；
- 在 lib 目录创建 index.js：

```javascript
const Compiler = require("./compiler");
const options = require("../forestpack.config");

new Compiler(options).run();
```

- 这里逻辑就比较简单了:
  - 实例化 Compiler 类;
  - 并将配置参数（对应 forstpack.config.js）传入;
- 运行 node lib/index.js;
  - 就会在 dist 目录下生成 bundle.js 文件;

```javascript
        (function(modules){
            function require(filename){
                const fn = modules[filename];
                const module = {exports:{}};
                fn(require, module, module.exports);
                return module.exports
            }
            require('/Users/chenhui/Downloads/wepack-learn/forestpack/src/index.js')
        })({'/Users/chenhui/Downloads/wepack-learn/forestpack/src/index.js': function(require, module, exports){"use strict";

var _greeting = require("./greeting.js");

document.write((0, _greeting.greeting)("森林"));},'./greeting.js': function(require, module, exports){"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.greeting = greeting;

function greeting(name) {
  return "你好" + name;
}}})
```

- 和上面用 webpack 打包生成的 js 文件作下对比，是不是很相似呢？

### 来吧！展示

- 我们在dist目录下创建index.html文件，引入打包生成的bundle.js文件：

```javascript
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <script src="./bundle.js"></script>
  </body>
</html>
```

- 此时打开浏览器：
  - 即显示：你好森林;

## 总结

- 通过对webpack构建流程的分析以及实现了一个简易的forestpack;
- 相信你对webpack的构建原理已经有了一个清晰的认知！

## 参考

- 本文是看过极客时间程柳锋老师的「玩转 webpack」课程后整理的;
- 这里也十分推荐大家去学习这门课程～

# 本文转载

- 作者：前端森林
- 链接：https://juejin.im/post/6859538537830858759
- 来源：掘金