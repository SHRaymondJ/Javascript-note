// 10
var b = 10;
(function b(b) {
    window.b = 20
    console.log(b)
})(b)


// 20
var b = 10;
(function b(b) {
    b = 20
    console.log(b)
})(b)
