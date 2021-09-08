// 合并为 ['A1', 'A2', 'A', 'B1', 'B2', 'B', 'C1', 'C2', 'C', 'D1', 'D2', 'D']

const arr1 = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'D1', 'D2']
const arr2 = ['A', 'B', 'C', 'D'].map(item => item + 3)

arr1.concat(arr2).sort().map(item => {
    if(item.includes('3')) {
        return item.split('')[0]
    }
    return item
})