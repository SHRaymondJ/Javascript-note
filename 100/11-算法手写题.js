// 将数组扁平化并去除其中重复数据，最终得到一个升序且不重复的数组
const arr = []
Array.from(new Set(arr.flat(Infinity))).sort((a,b) => a-b)