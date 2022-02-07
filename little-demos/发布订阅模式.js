class EventEmitter {
    constructor() {
        this.events = {}
    }
    /**
     * 订阅事件
     * @param {String} type 事件类型
     * @param {Function} callback 订阅后发布动作触发的回调函数，参数为发布的数据
     */
    on(type, callback) {
        if (!this.events[type]) {
            this.events[type] = [callback]
        } else {
            this.events[type].push(callback)
        }
    }

    off(type, callback) {
        if (!this.events[type]) return
        this.events[type] = this.events[type].filter(fn => fn !== callback)
    }

    once(type, callback) {
        function fn() {
            callback()
            this.off(type, fn)
        }
        this.on(type, fn)
    }
    /**
     * 发布事件
     * @param {String} type 事件类型
     * @param {Any} rest 发布的内容
     */
    emit(type, ...rest) {
        if (!this.events[type]) return
        this.events[type].forEach(fn => fn.apply(this, rest))
    }
}

const event = new EventEmitter();

const handle = (...rest) => {
    console.log(rest);
};
const type = (...rest) => {
    console.log(rest.reduce((a, b) => a + b, 0))
}
event.on("click", handle);
event.on('click', type)
event.emit("click", 1, 2, 3, 4);

event.off("click", handle);

event.emit("click", 1, 2);

event.once("dbClick", () => {
    console.log(123456);
});
event.emit("dbClick");
event.emit("dbClick");