const myNew = (fn, ...args) => {
    const obj = Object.create(fn.prototype);
    const res = fn.call(obj, ...args);
    if (res && (typeof res === 'object' || typeof res === 'function')) {
        return res
    }
    return obj
}

function Person(name, age) {
    this.name = name
    this.age = age
    this.sayHi = function () {
        setTimeout(() => console.log(this), 1000)
    }
}

let jack = new Person('Jack', 24)
let person = myNew(Person,'Jack', 24)