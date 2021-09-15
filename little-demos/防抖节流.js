// 防抖
const debounce = (fn, delay = 300) => {
    let timer
    return () => {
        const args = arguments
        if(timer) {
            clearTimeout(timer)
        }
        timer = setTimeout(() => {
            fn.apply(this, args)
        }, delay)
    }
}

// 节流
const throttle = (fn, delay = 300) => {
    let flag = true
    return () => {
        if(!flag) {
            return
        }
        flag = false
        setTimeout(() => {
            fn()
            flag = true
        }, delay)
    }
}