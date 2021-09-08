// 旋转数组
// 给定一个数组， 将数组中的元素向右移动 k 个位置，其中 k 是非负数
const arr = [1, 2, 3, 4, 5, 6, 7]
const k = 3

// 方法1
function arrayTranslation(arr, k) {
    var k = k % arr.length
    var i = 0
    while (i < k) {
        arr.unshift(arr.pop())
        i++
    }
    return arr
}

// 方法2
function arrayTranslation(arr, k) {
    var k = k % arr.length
    return arr.slice(-k).concat(arr.slice(0, arr.length - k))
}

console.log(arrayTranslation(arr, k))