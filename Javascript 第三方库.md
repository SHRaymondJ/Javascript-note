# Javascript 第三方库

## 日期处理类库

### [Moment.js](http://momentjs.cn/)

安装

```
npm install moment --save   # npm
yarn add moment             # Yarn
Install-Package Moment.js   # NuGet
spm install moment --save   # spm
meteor add momentjs:moment  # meteor
```

常用方法：

#### fromNow

获取距离现在的时间间隔

```
moment([2017, 0, 29]).fromNow();     // 4 年前
moment([2017, 0, 29]).fromNow(true); // 4 年
// moment内的参数可以是Date()实例
```

#### locale

获取moment当前的语言环境

```
moment.locale()	// zh-cn
```

#### updateLocale

更新语言环境，并且配置对应显示的文字

```
// 中文
moment.updateLocale('zh-cn', {
    relativeTime : {
        future: "%s 后",
        past:   "%s 前",
        s  : '几秒前',
        ss : '%d 秒',
        m:  "一分钟",
        mm: "%d 分钟",
        h:  "一小时",
        hh: "%d 小时",
        d:  "a 天",
        dd: "%d 天",
        M:  "a 个月",
        MM: "%d 个月",
        y:  "a 年",
        yy: "%d 年"
    }
});
```



## React 库

### [react-icons](https://react-icons.github.io/react-icons)

> 图标库

安装

```
npm install react-icons --save
```

使用方法：

```react
import { FaBeer } from 'react-icons/fa'
class Question extends React.Component {
  render() {
    return <h3> Lets go for a <FaBeer />? </h3>	// 跟引入Component一样
  }
}
```



## 动态加载库

### [loadable-components](https://loadable-components.com/) 

动态加载。可以降低打包后的文件大小，提升网站加载速度

安装

```
npm install @loadable/component
# or use yarn
yarn add @loadable/component
```

如果用Babel plugin，需要使用cacheKey设置

```react
import React, { useState } from 'react'
import loadable from '@loadable/component'

const AsyncPage = loadable(props => import(`./${props.page}`),{
    cacheKey: props => props.page
})

export default function App() {
    const {page, setPage} = useState('Home')
    return (
    	<button onClick={()=>setPage('Home')}>Home</button>
    	<button onClick={()=>setPage('About')}>About</button>
        {page && <AsyncPage page={page}/>}	// 渲染在这里
    )
}
```

相当于动态加载`./Home` 和`./About` 的：

```react
import React from 'react'
import Home from './Home'
import About from './About'
import { BrowserRouter as Router, Switch, Route, Link }

export default function App() {
    <Router>
    	<Link to='/'>Home</Link>
    	<Link to='/about'>About</Link>
        <Route path='/'>
        	<Home /> 
        </Route>
        <Route path='/about'>
        	<About />
        </Route>
    </Router>
}
```



## Canvas 库

### [Rough.js](https://roughjs.com/)

画手绘风格图片