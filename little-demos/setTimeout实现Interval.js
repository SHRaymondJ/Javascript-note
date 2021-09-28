function mySetInterval(fn, time = 1000) {
    let timer = null,
        isClear = false
    function interval() {
        if(isClear) {
            isClear = false;
            clearTimeout(timer);
            return false
        }
        fn()
        timer = setTimeout(interval, time)
    }
    timer = setTimeout(interval, time)
    return () => {
        isClear = true
    }
}


let a = mySetInterval(function () {
    console.log(Math.random() * 100)
}, 1000)

setTimeout(function () {
    a()
}, 7000)