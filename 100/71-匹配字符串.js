// 实现一个字符串匹配算法，从长度为n的字符串S中，查找是否存在字符串T，T的长度是m，若存在返回位置
function find(S, T) {
    if(S.length < T.length) {
        return -1
    }
    return S.indexOf(T)
}