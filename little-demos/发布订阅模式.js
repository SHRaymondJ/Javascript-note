class EventEmitter {
    constructor() {
        this.events = {}
    }
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
    console.log(rest.reduce((a,b) => a+b , 0))
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