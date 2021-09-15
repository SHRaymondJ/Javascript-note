function Super() {
    this.color = ['red','yello','green']
}
function Sub() {

}

Sub.prototype = new Super() // 这里继承的是一个实例

const instance1 = new Sub()
const instance2 = new Sub()

console.log(instance1.__proto__.color === instance2.__proto__.color) // 实例之间共享值,因为原型继承的是一个实例

console.log(instance1.color === instance2.color) 

instance1.color.push('green')
console.log(instance2.color)    // 实例之间共享值