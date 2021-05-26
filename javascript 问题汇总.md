# javascript 问题汇总

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