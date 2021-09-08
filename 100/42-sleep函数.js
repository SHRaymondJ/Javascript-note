// 实现一个sleep函数，比如sleep(1000) 意味着等待 1000 毫秒
// Promise
const sleep = times => {
    return new Promise(resolve => setTimeout(resolve, times))
}

sleep(1000).then(() => {
    // operations
    console.log(123)
})

// Generator
function* sleepGenerator(time) {
    yield new Promise(resolve => setTimeout(resolve, time))
}
sleepGenerator(1000).next().value.then(() => {
    // oprations
})

// async
const sleep = times => {
    return new Promise(resolve => setTimeout(resolve, times))
}

async function output() {
    let out = await sleep(1000)
    // oprations
    return out
}
output()

// ES5
function sleep(callback, time) {
    if(typeof callback === 'function') {
        setTimeout(callback, time)
    }
}
function output(){
    // oprations
}
sleep(output, 1000)