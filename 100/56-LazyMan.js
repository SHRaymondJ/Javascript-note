/**
 * 要求设计 LazyMan 类，实现以下功能。
 * LazyMan('Tony');
// Hi I am Tony

LazyMan('Tony').sleep(10).eat('lunch');
// Hi I am Tony
// 等待了10秒...
// I am eating lunch

LazyMan('Tony').eat('lunch').sleep(10).eat('dinner');
// Hi I am Tony
// I am eating lunch
// 等待了10秒...
// I am eating diner

LazyMan('Tony').eat('lunch').eat('dinner').sleepFirst(5).sleep(10).eat('junk food');
// Hi I am Tony
// 等待了5秒...
// I am eating lunch
// I am eating dinner
// 等待了10秒...
// I am eating junk food
 */

class LazyManClass {
    constructor(name) {
        this.name = name
        this.taskList = []
        console.log('Hi I am ' + this.name)
        setTimeout(() => {
            this.next()
        }, 0)
    }
    sleep(seconds) {
        const that = this
        const fn = (sec => {
            return async () => {
                await new Promise(resolve => setTimeout(resolve, sec * 1000))
                console.log(`等待了${sec}秒`)
                that.next()
            }
        })(seconds)
        this.taskList.push(fn)
        return this
    }
    eat(food) {
        const that = this
        const fn = ((food) => {
            return () => {
                console.log('I am eating ' + food)
                that.next()
            }
        })(food)
        this.taskList.push(fn)
        return this
    }
    sleepFirst(seconds) {
        const that = this
        const fn = (sec => {
            return async () => {
                await new Promise(resolve => setTimeout(resolve, sec * 1000))
                console.log(`等待了${sec}秒`)
                that.next()
            }
        })(seconds)
        this.taskList.unshift(fn)
        return this
    }
    next() {
        const fn = this.taskList.shift()
        fn && fn()
    }
}

function LazyMan(name) {
    return new LazyManClass(name)
}