// 打印1-10000之间的所有对称数

// 方法一
const arr = []
for (i = 1; i <= 10000; i++) {
    for (let j = 0; j < Math.floor(i.toString().length / 2); j++) {
        if (i.toString()[j] === i.toString()[i.toString().length - j - 1]) {
            arr.push(i)
        }
    }

}


// 方法二
[...Array(10000).keys()].filter((x) => {
    return x.toString().length > 1 && x === Number(x.toString().split('').reverse().join(''))
})