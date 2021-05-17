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



## 状态管理

### useState，或者useContext + Reducer

如果项目不大，建议使用这两个解决方案

```react
// context.js
import reducer from './reducer'

const AppContext = React.useContext()

const defaultState = {
    loading: false
}

const AppProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, defaultState)
    
    const toggleLoading = () => {
        dispatch({type: 'TOGGLE_LOADING'})
    }
    
    return (
    	<AppContext.Provider value={{...state, toggleLoading}}>
        	{children}
        </AppContext.Provider>
    )
}

export const useGlobalContext = () => {
    return useContext(AppContent)
}

export { AppContext, AppProvider }

// reducer.js
const reducer = (state, action) => {
    if(action.type === 'TOGGLE_LOADING') {
        return { ...state, loading: !state.loading}
    }
}

export default reducer

// 把AppProvider挂到app下
// index.js
import {AppProvider} from './context'

ReactDom.render(
	<React.StrictMode>
    	<AppProvider>
        	<App />
        </AppProvider>
    </React.StrictMode>,
    document.getElementById('root')
)

// 在需要使用的页面引入useGlobalContext
// homepage.js
import { useGlobalContext } from './context'
const { loading, toggleLoading } = useGlobalContext()
```





### react-redux[^1] 结合 reselect[^2]

对于大型或者较为复杂的项目，可以使用redux管理状态。就使用过程来说非常繁琐

安装：

```
$ yarn add redux react-redux reselect
```

使用方法：

react & react-redux

```react
/* ====================== 1. 创建一个homePage reducer */
// 定义一个默认状态
const defaultState = {
    users: ["No User!"]
}
// 定义一个reducer
const homePage = (state = defaultState, action) => {
    switch (action.type) {
        default:
            return store
    }
}
/* ====================== 2. 用redux创建一个store */
import { createStore, combineReducers } from 'redux'
// 把需要用到的reducer合并到一起， reducer内的名字需要统一，否则会报错
const reducers = combineReducers({ homePage })	
// 创建store用来管理
const store = createStore(reducers)
export default store

/* ====================== 3. 通过react-redux的Provider把store挂载到app下*/
// index.js
import React from 'react'
import ReactDom from 'react-dom'

import { Provider } from 'react-redux'
import store from './store'
import App from './App'

ReactDOM.render(
	<React.StrictMode>
    	<Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
)

/* ====================== 4. 管理操作*/
// action.js
export const setUsers = (users) => ({
    type: 'SET_USERS',
    payload: users
})

```

以上redux和react-redux的工作基本完成，接下去我们引入reselect获取state

reselect

```react
/* ======================= 5. 创建select*/
// selectors.js
import { createSelector } from 'reselect'

// 获得首页状态
const homePageState = (state) => state.homePage	//这里的state就是store， homePage就是第二步combine的homePage
/*
 * state = { homePage: { users: ['No User!'] } }
 *
 *
 */

// 通过选择器，从首页状态中获取users对象
export const makeSelectUsers = createSelector(
	homePageState,	// 入参， 把homePageState 传入下面的函数
    (homePage) => homePage.users	// 接收homePageState， 返回homePageState.users
)
console.log(makeSelectUsers) // ['No User!']

/* ======================= 6. 将select引入页面*/
// homepage.jsx
import React from 'react'
import { createSelector } from 'reselect'
import { useSelector } from 'react-redux'
import { makeSelectUsers } from './selectors.js'

const stateSelector = createSelector(makeSelectUsers, (users) => ({ users }))

export const HomePage = () => {
    const { users } = useSelector(stateSelector)
    console.log('stateSelector: ',useSelector(stateSelector))	// stateSelector: {users: Array(1)}
    console.log('makeSelectUsers: ',useSelector(makeSelectUsers))	// makeSelectUsers: ['No User!']
    console.log('users: ',users)	// users: ['No User!']
    return <></>
}
```

以上是读取state的流程，接下去我们来通过动作修改state

```react
/* ======================== 7. 修改reducer*/
const homePage = (state = defaultState, action) => {
    switch(action.type) {
    	case: ActionTypes.SET_USERS:
            return {...state, user: action.payload}
       	dafault:
            return state
    }
}
```

然后在页面中使用

```react
/* ======================== 8. 添加dispatch*/
// index.js
import {setUsers} from './actions'

const actionDispatch = (dispatch) => ({
    setusers: (users) => dispatch(setUsers(users))
})

/* ======================== 9. 使用useDispatch调用dispatch*/
const { setUsers } = actionDispatch(useDispatch())
// 再使用setUsers更新数据
useEffect(()=>{
    setUsers({x:'123'})
}, [])
```







## 遇到过的问题

Q. yarn build之后打开页面空白

> A. 在package.json中添加homepage映射： `"homepage":"./"`





[^1]: 状态管理，单项数据流
[^2]: 避免冗余计算

