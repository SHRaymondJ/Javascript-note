# Javascript 问题汇总

###  1. [Set, WeakSet 和 Map的区别](https://es6.ruanyifeng.com/#docs/set-map)

Set

只能存放唯一成员

WeakSet

相较于Set，只能存放对象，其次WeakSet中的对象都是弱引用，即垃圾回收机制不考虑WeakSet对该对象的引用，不可遍历

Map

结构类似于对象，也是键值对的集合，但是“键”不限于字符串，各种类型的值（包括对象）都能当作键，可以遍历

> 初始化方法： 
>
> ```javascript
> const map = new Map([['a', 'this is the first item'], ['b', 'this is the second item']])
> ```
>
> 添加、修改成员：
>
> ```javascript
> const o = new Set([1,2,3,4])
> map.set(o, 'new Set')
> ```



###  2. 深度优化遍历和广度优化遍历，如何实现

深度优化遍历(Depth-First-Search)：

$从一个节点开始追溯，直到最后一个节点，然后回溯到根节点，继而搜索下一条路径，直到全部搜索完$

广度优化遍历(Breadth-First-Search):

$从根节点，尝试访问尽可能靠近它的目标节点，发散式搜索$



### 3. 扁平化一个数组，并排序

> var arr = [ [1, 2, 2], [3, 4, 5, 5], [6, 7, 8, 9, [11, 12, [12, 13, [14] ] ] ], 10];
>
> 编写一个程序将数组扁平化去并除其中重复部分数据，最终得到一个升序且不重复的数组

```javascript
Array.from(new Set(arr.flat(Infinity).sort((x,y)=>x-y)))
```

<b>知识点</b>： [Array.from()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/from)

从一个类似数组或可迭代对象创建一个新的，浅拷贝的数组实例

<b>知识点</b>： [Array.prototype.flat()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/flat)

按照一个可指定的深度递归遍历数组，并将元素与遍历到的子数组中的元素合并为一个新数组返回

<b>知识点</b>： 关键字Infinity

无穷大



### 4. 实现一个New

```javascript
const _new = (fn, ...arg) => {
    const obj = Object.new(fn.prototype)
    const ret = fn.apply(obj, arg)
    return ret instance of Object ? ret : obj
}
```

