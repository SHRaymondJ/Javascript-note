// 如何把一个字符串的大小写取反（大写变小写小写变大写），例如 ’AbC' 变成 'aBc' 。
let str = 'AbC'
let arr = str.split('')
let result = arr.map(i => {
    return i === i.toUpperCase() ? i.toLowerCase() : i.toUpperCase()
}).join('')

console.log(result)