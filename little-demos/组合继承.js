// 通过构造函数继承属性
// 通过原型链继承方法

function Super(name, age) {
    this.name = name
    this.age = age
    this.color = ['red', 'yellow', 'black']
    this.sayHi = function() {
        console.log('hi')
    }
}
// Super.prototype.sayHi = function() {
//     console.log('hi')
// }

function Sub(name, age, height) {
    Super.apply(this, arguments)
    this.height = height
}

Sub.prototype = new Super()
Sub.prototype.constructor = Sub

//创建实例 
var instance1 = new Sub('ccdida', 25, 180)
var instance2 = new Sub('piaopiao', 24, 170)

console.log(instance1.__proto__ === Sub.prototype)//true
console.log(instance1.__proto__.__proto__ === Super.prototype)//true
console.log(Sub.prototype.__proto__ === Super.prototype)//true
instance1.sayHi() //hi