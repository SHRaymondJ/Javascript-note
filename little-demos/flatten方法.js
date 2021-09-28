/**
 * 
 * const obj = {
 a: {
        b: 1,
        c: 2,
        d: {e: 5}
    },
 b: [1, 3, {a: 2, b: 3}],
 c: 3
}

flatten(obj) 结果返回如下
// {
//  'a.b': 1,
//  'a.c': 2,
//  'a.d.e': 5,
//  'b[0]': 1,
//  'b[1]': 3,
//  'b[2].a': 2,
//  'b[2].b': 3
//   c: 3
// }
 */
const obj = {
    a: {
        b: 1,
        c: 2,
        d: { e: 5 }
    },
    b: [1, 3, { a: 2, b: 3 }],
    c: 3
}

function isObject(val) {
    return typeof val === 'object' && val !== null
}

function flatten(obj) {
    if (!isObject(obj)) {
        return
    }
    const res = {}
    const transition = (curr, prefix) => {
        if (isObject(curr)) {
            if (Array.isArray(curr)) {
                curr.map((item,index) => {
                    transition(item, `${prefix}[${index}]`)
                })
            } else {
                for(let i in curr) {
                    transition(curr[i], `${prefix}${prefix ? '.' : ''}${i}`)
                }
            }
        } else {
            res[prefix] = curr
        }
    }
    transition(obj, '')
    return res
}

console.log(flatten(obj))