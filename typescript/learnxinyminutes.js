"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// 基础类型
var isDone = true;
var lines = 42;
var user = 'Raymond';
// 任意类型
var notSure = 4;
notSure = true;
notSure = 'maybe a string instad';
// 数组类型
var list = [1, 2, 3];
var list2 = [1, 2, 3];
// 枚举类型
var Color;
(function (Color) {
    Color[Color["Red"] = 0] = "Red";
    Color[Color["Green"] = 1] = "Green";
    Color[Color["Blue"] = 2] = "Blue";
})(Color || (Color = {}));
var c = Color.Green;
// 空类型，function 没有 返回值
function bigHorribleAlert() {
    alert("I'm a little annoying box!");
}
/** 函数类型 （入参类型):回参类型 */
// 函数表达式
var f1 = function (i) {
    return i * 1;
};
// 返回参数推断
var f2 = function (i) {
    return i * 1;
};
// 箭头函数
var f3 = function (i) {
    return i * 1;
};
// 回参类型推导
var f4 = function (i) {
    return i * 1;
};
var f5 = function (i) { return i * 1; };
// 使用
var p = { name: 'Bobby', move: function () { } };
var validPerson = { name: 'Bobby', age: 42, move: function () { } };
var invalidPerson = { name: 'Bobby', age: true }; // 报错：因为不是number
// 使用
var mySearch = function (src, sub) { return src.search(sub) != -1; };
/** Class 类型 */
var Point = /** @class */ (function () {
    function Point(x, y) {
        if (y === void 0) { y = 0; }
        this.y = y;
        this.x = x;
    }
    // Functions
    Point.prototype.dist = function () {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    };
    // Static members
    Point.origin = new Point(0, 0);
    return Point;
}());
// 类型继承自interface, 如果有遗漏属性，会报错
var PointPerson = /** @class */ (function () {
    function PointPerson(name) {
        this.name = name;
    }
    PointPerson.prototype.move = function () { };
    return PointPerson;
}());
var p1 = new Point(10, 20);
var p2 = new Point(25);
// 类型继承
var Point3D = /** @class */ (function (_super) {
    __extends(Point3D, _super);
    function Point3D(x, y, z) {
        if (z === void 0) { z = 0; }
        var _this = _super.call(this, x, y) || this;
        _this.z = z;
        return _this;
    }
    // Overwrite
    Point3D.prototype.dist = function () {
        var d = _super.prototype.dist.call(this);
        return Math.sqrt(d * d + this.z + this.z);
    };
    return Point3D;
}(Point));
/** 模块 */
/** ???????????????????????????????????????? 不懂 ????????????????????? */
var Geometry;
(function (Geometry) {
    var Square = /** @class */ (function () {
        function Square(sideLength) {
            if (sideLength === void 0) { sideLength = 0; }
            this.sideLength = sideLength;
        }
        Square.prototype.area = function () {
            return Math.pow(this.sideLength, 2);
        };
        return Square;
    }());
    Geometry.Square = Square;
})(Geometry || (Geometry = {}));
var s1 = new Geometry.Square(5);
var G = Geometry;
var s2 = new G.Square(10);
/** 泛型 */
var Tuple = /** @class */ (function () {
    function Tuple(item1, item2) {
        this.item1 = item1;
        this.item2 = item2;
    }
    return Tuple;
}());
var pairToTuple = function (p) {
    return new Tuple(p.item1, p.item2);
};
var tuple = pairToTuple({ item1: 'hello', item2: 'job' });
var tuple2 = pairToTuple({ item1: 1, item2: 2 });
