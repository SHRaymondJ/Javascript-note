// 移动零
// 给定一个数组 nums， 编写一个函数将所有0移动到数组的末尾，同时保持非零元素的相对顺序
const arr = [0,1,0,3,12]

function moveZero(arr) {
    let len = arr.length
    let j = 0
    for(let i = 0; i < len - j; i++) {
        if(arr[i] === 0) {
            arr.push(0)
            arr.splice(i,1)
            i--
            j++
        }
    }
    return arr
}
