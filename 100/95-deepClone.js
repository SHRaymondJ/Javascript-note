// 模拟实现一个深拷贝，并考虑对象相互引用 以及 Symbol 拷贝的情况

function deepCopy(target, cache = new Set()) {
    if(typeof target !== 'object' && cache.has(target)) {
        return target
    }
    if(Array.isArray(target)) {
        return target.map(t => {
            cache.add(t)
            let result = deepCopy(t, cache)
            return result
        })
    } else {
        return [...Object.keys(target), ...Object.getOwnPropertySymbols(target)].reduce((res, key) => {
            cache.add(target[key])
            res[key] = deepCopy(target[key], cache)
            return res
        }, target.constructor != Object ? Object.create(target.constructor.prototype) : {})
    }
}

let sym = Symbol('foo')
let x = [{a:4, sym: {a: 10}}, {a: 10}]
let y = deepCopy(x)
x[0].a = 5
y
