/**
 * var a = ?
 * if(a == 1 && a == 2 && a == 3) {
 *      console.log(1)
 * }
 */

// == 会进行隐式类型转换，所以重写 toString 方法就可以了
var a = {
    i: 1,
    toString() {
        return a.i++
    }
}
if(a == 1 && a == 2 && a == 3) {
    console.log(1)
}