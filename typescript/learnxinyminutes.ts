// 基础类型
let isDone: boolean = true
let lines: number = 42
let user: string = 'Raymond'

// 任意类型
let notSure: any = 4
notSure = true
notSure = 'maybe a string instad'

// 数组类型
let list: number[] = [1, 2, 3]
let list2: Array<number> = [1, 2, 3]

// 枚举类型
enum Color {
    Red,
    Green,
    Blue,
}
let c: Color = Color.Green

// 空类型，function 没有 返回值
function bigHorribleAlert(): void {
    alert("I'm a little annoying box!")
}

/** 函数类型 （入参类型):回参类型 */
// 函数表达式
let f1 = function (i: number): number {
    return i * 1
}
// 返回参数推断
let f2 = function (i: number) {
    return i * 1
}
// 箭头函数
let f3 = (i: number): number => {
    return i * 1
}
// 回参类型推导
let f4 = (i: number) => {
    return i * 1
}
let f5 = (i: number) => i * 1

/** Interface 类型结构*/
// 定义
interface Person {
    name: string
    age?: number // 选填属性加问号
    move(c: number): void // 函数
}
// 使用
let p: Person = { name: 'Bobby', move: () => {} }

let validPerson: Person = { name: 'Bobby', age: 42, move: () => {} }

let invalidPerson: Person = { name: 'Bobby', age: true } // 报错：因为不是number

// 定义函数类型
interface SearchFunc {
    (source: string, subString: string): boolean
}
// 使用
let mySearch: SearchFunc = (src, sub) => src.search(sub) != -1

/** Class 类型 */
class Point {
    x: number
    constructor(x: number, public y: number = 0) {
        this.x = x
    }

    // Functions
    dist(): number {
        return Math.sqrt(this.x * this.x + this.y * this.y)
    }

    // Static members
    static origin = new Point(0, 0)
}
// 类型继承自interface, 如果有遗漏属性，会报错
class PointPerson implements Person {
    name
    move() {}
    constructor(name: string) {
        this.name = name
    }
}

let p1 = new Point(10, 20)
let p2 = new Point(25)

// 类型继承
class Point3D extends Point {
    constructor(x: number, y: number, public z: number = 0) {
        super(x, y)
    }

    // Overwrite
    dist(): number {
        let d = super.dist()
        return Math.sqrt(d * d + this.z + this.z)
    }
}

/** 模块 */
/** ???????????????????????????????????????? 不懂 ????????????????????? */
module Geometry {
    export class Square {
        constructor(public sideLength: number = 0) {}
        area() {
            return Math.pow(this.sideLength, 2)
        }
    }
}

let s1 = new Geometry.Square(5)

import G = Geometry

let s2 = new G.Square(10)

/** 泛型 */
// class
class Tuple<T1, T2> {
    constructor(public item1: T1, public item2: T2) {}
}

// interface
interface Pair<T> {
    item1: T
    item2: T
}

// 函数
let pairToTuple = function <T>(p: Pair<T>) {
    return new Tuple(p.item1, p.item2)
}

let tuple = pairToTuple({ item1: 'hello', item2: 'job' })
let tuple2 = pairToTuple({ item1: 1, item2: 2 })

/** 只读 */
interface Person2 {
    readonly name: string
    readonly age: number
}

var p3: Person2 = { name: 'Tyrone', age: 42 }
p3.age = 25 // ERROR, p3.age is raedonly

var p4 = { name: 'John', age: 60 }
var p5: Person2 = p4
p5.age = 35 // ERROR, p5.age is readonly
p4.age = 45

class Car {
    readonly make: string
    readonly model: string
    readonly year = 2018

    constructor() {
        this.make = 'Jake' // 只读属性可以在constructor内定义
        this.model = 'model'
    }
}

let numbers: Array<number> = [0, 1, 2, 3, 4]
let moreNumbers: ReadonlyArray<number> = numbers
moreNumbers[5] = 5 // ReadonlyArray 只读数组，不能修改
moreNumbers.push(5) // 没有push方法
moreNumbers.length = 3 // 长度也是固定的
numbers = moreNumbers // 缺少变异方法

/** 用于建模状态的标记联合类型可以是多种类型之一 */
type State =
    | { type: 'loading' }
    | { type: 'success'; value: number }
    | { type: 'error'; message: string }

// declare 和 type的区别???
declare const state: State
if(state.type === 'success') {
    console.log(state.value)
} else if(state.type === 'error') {
    console.log(state.message)
}


/** for...of 遍历遍历器 */
let arrayOfAnyType = [1, "string", false]
for (const val of arrayOfAnyType) {
    console.log(val)
}

let list1 = [4,5,6]
for(const i of list1) {
    console.log(i)
}

let foo = {}
foo.bar = 123   // 空对象内没有bar属性
foo.baz = 'hello world'

interface Foo {
    bar: number
    baz: string
}
let foo1 = {} as Foo
foo1.bar = 123
foo1.baz = 'hellow world'   // 设置了interface就有这两个属性了
