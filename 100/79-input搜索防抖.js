// input 搜索防抖
function debounce() {
    var timer
    return function(fn){
        if(timer) {
            clearTimeout(timer)
        }
        timer = setTimeout(() => {
            fn()
        }, 1000)
    }
}