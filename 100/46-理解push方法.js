// 输出以下代码执行的结果并解释为什么

var obj = {
    '2': 3,
    '3': 4,
    'length': 2,
    'splice': Array.prototype.splice,
    'push': Array.prototype.push
}
obj.push(1)
obj.push(2)
console.log(obj)

// Object(4) [empty x 2, 1, 2, splice: f, push: f]
// push 方法会根据对象的 length , 在前面补足数值，并从 length 所在的位置插入元素
// 此例中就是先给对象添加了 0: undefined, 1: undefined
// 然后从 obj[2] 开始插入值，也就导致了 2: 1, 3: 2
//
// 其二是，如果一个对象同时拥有 push 和 splice 方法，输出时会转换为数组