function Super(name, age) {
    this.name = name
    this.age = age
    this.color = ['red', 'yellow', 'black']
    this.sayHi = function() {
        console.log('hi')
    }
    console.log(this)
}

function Sub() {
    Super.apply(this, arguments)
    this.height = 180
    this.sayHello = function() {
        console.log(this.color)
    }
}

var instance1 = new Sub('one', 25)
var instance2 = new Sub('two', 34)

instance1.color.push('green')
console.log(instance2)  // 每个实例之间是独立的

console.log(instance1.__proto__ === Sub.prototype)//true
console.log(instance1.__proto__.__proto__ === Super.prototype)//false
console.log(Sub.prototype.__proto__ === Super.prototype)//false
instance1.sayHi() //hi