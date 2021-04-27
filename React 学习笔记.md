# React 学习笔记

## 路由

### [react-router](https://react-guide.github.io/react-router-cn/)

>  我用react-router疯狂报错，还是用更先进的[react-router-dom](#react-router-dom)吧



### [react-router-dom](https://reactrouter.com/web/guides/quick-start)<div id="react-router-dom"></div>

#### 划重点

1. `<Switch></Switch>` 套在`Route` 外，同时只显示一个路由

2. `<Route path > ` 会从URL的头部往后匹配，所以如果`path='/'` 会匹配到所有链接。

   解决方法：

   ```react
   // 1. 把path='/'的路由写到最后
   <Route path='/about'><About /></Route>
   <Route path='/shop'><Shop /></Route>
   <Route path='/'><Homepage /></Route>
   
   // 2. 在路由上加关键字 exact
   <Route exact path='/'><Homepage /></Route>
   <Route path='/about'><About /></Route>
   <Route path='/shop'><Shop /></Route>
   ```

3. `<NavLink>` 是`<Link>` 的一种特殊类型，自带属性`activeClassName` 可以设置链接active的样式



## 遇到过的问题

Q. yarn build之后打开页面空白

> A. 在package.json中添加homepage映射： `"homepage":"./"`