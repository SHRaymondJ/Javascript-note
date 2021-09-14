class Mypromise {
    static all(promiseArr) {
        const result = []
        let count = 0
        return new Promise((resolve, reject) => {
            for (let i = 0; i < promiseArr.length; i++) {
                Promise.resolve(promiseArr[i]).then(value => {
                    result[i] = value
                    count++
                    if (i === promiseArr.length - 1) {
                        resolve(result)
                    }
                }, err => {
                    reject(err)
                })
            }
        })
    }

    static race(promiseArr) {
        return new Promise((resolve, reject) => {
            for (let i = 0; i < promiseArr.length; i++) {
                Promise.resolve(promiseArr[i]).then(value => resolve(value), err => reject(err))
            }
        })
    }
}


const promise1 = Promise.resolve(32)
const promise2 = 43
const promise3 = new Promise(resolve => {
    setTimeout(resolve, 200, 'this is the last promise')
})
const promise4 = new Promise(resolve => {
    setTimeout(resolve, 100, 'this is promise 4')
})
Mypromise.all([promise1, promise2, promise3]).then(values => {
    console.log(values)
})

Mypromise.race([promise3, promise4]).then(values => {
    console.log(values)
})
