import { makeAutoObservable } from "mobx"

class Timer {
    secondsPassed = 0

    constructor() {
        makeAutoObservable(this)
    }

    increaseTimer() {
        this.secondsPassed ++
    }
    decreaseTimer() {
        this.secondsPassed > 0 && this.secondsPassed --
    }
}

export const myTimer = new Timer()