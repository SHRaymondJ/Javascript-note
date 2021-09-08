// 冒泡排序改进
// 基本
function bubbleSort(arr) {
    for (let i = 0; i < arr.length - 1; i++) {
        for (let j = 0; j < arr.length - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
            }
        }
    }
    return arr
}

// 改进
function bubbleSort2(arr) {
    let i = arr.length - 1
    while (i > 0) {
        let pos = 0
        for (let j = 0; j < i; j++) {
            if (arr[j] > arr[j + 1]) {
                pos = j
                [arr[j], arr[j+1]] = [arr[j+1] , arr[j]]
            }
        }
        i = pos
    }
    return arr
}