function Super(name, age){
    this.name = name
    this.age = age
    this.color = ['red', 'yellow', 'black']
    this.sayHi = function(){
        console.log('hi')
    }
    console.log(this)
}

function Sub(height) {
    Super.call(this, ...arguments)  // 通过 call 拿到 Super 中的属性
    this.height = height
}

Sub.prototype = Object.create(Super.prototype)  // 通过 Object.create 让子类的原型对象的隐式原型指向父类的原型对象
Sub.prototype.constructor = Sub

//创建实例 
var instance1 = new Sub('ccdida', 25, 180)
var instance2 = new Sub('piaopiao', 24, 170)

console.log(instance1.__proto__ === Sub.prototype)//true
console.log(instance1.__proto__.__proto__ === Super.prototype)//true
console.log(Sub.prototype.__proto__ === Super.prototype)//true
instance1.sayHi() //hi