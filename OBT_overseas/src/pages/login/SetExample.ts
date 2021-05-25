export const test = () => {
    // Set 成员唯一的数组类型
    const s = new Set()
    ;[2, 3, 5, 4, 5, 2, 2].forEach((x) => s.add(x))

    for (let i of s) {
        console.log(i)
    }
    console.log([...new Set('ababbc')].join('')) //abc

    const array = [1, 2, 3, 4, 5, 2, 3, 4, 5]
    console.log([...new Set(array)]) // [1,2,3,4,5]

    const s2 = new Set()
    s2.add(1).add(2).add(2)

    s2.size // 2

    s2.has(1) //true
    s2.has(2) //true
    s2.has(3) //false

    s2.delete(2) //true
    s2.has(2) //false

    // 通过Array.from把Set结构转为数组
    const newArray = [1,2,3,4,5,2,3]
    const items = new Set(newArray)
    Array.from(items)   // [1,2,3,4,5]

    // 遍历Set的方法：
    // Set.prototype.keys()     返回键名的遍历器
    // Set.prototype.values()   返回键值的遍历器
    // Set.prototype.entries()  返回键值对的遍历器
    // Set.prototype.forEach()  使用回调函数遍历每个成员
    // 由于Set没有键名，所以keys方法和values方法行为完全一致
    let s3 = new Set(['red','green','blue'])
    for(let item of s3.keys()){
        console.log(item);
    }
    // red
    // green
    // blue
    
    for(let item of s3.values()){
        console.log(item)
    }
    // red
    // green
    // blue
    
    for(let item of s3.entries()){
        console.log(item)
    }
    // ["red", "red"]
    // ["green", "green"]
    // ["blue", "blue"]
}
