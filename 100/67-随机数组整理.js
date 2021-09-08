// 随机生成一个长度为 10 的整数类型的数组，例如 [2, 10, 3, 4, 5, 11, 10, 11, 20]，将其排列成一个新数组，要求新数组形式如下，例如 [[2, 3, 4, 5], [10, 11], [20]]。

function getRandomArr(length) {
    const arr = []
    while(arr.length < length) {
        arr.push(parseInt(Math.random() * 100))
    }
    return arr
}

const arr = getRandomArr(10)

const arrSort = arr.sort((a,b) => a - b)

const obj = {}
arrSort.map(i => {
    let itemIndex = Math.floor(i/10)
    if(!obj[itemIndex]) obj[itemIndex] = []
    obj[itemIndex].push(i)
})

const result = []
for(let i in obj) {
    result.push(obj[i])
}

console.log(result)