Function.prototype.myBind = function(context, ...args) {
    let fn = Symbol()
    context[fn] = this
    let _this = this
    
    const result = function(...innerArgs) {
        if(this instanceof _this === true) {
            this[fn] = _this
            this[fn](...[...args, ...innerArgs])
        } else {
            context[fn](...[...args, ...innerArgs])
        }
    }
    
    result.prototype = Object.create(this.prototype)
    return result
}

  //用法如下

  function Person(name, age) {
    console.log(name); //'我是参数传进来的name'
    console.log(age); //'我是参数传进来的age'
    console.log(this); //构造函数this指向实例对象
  }
  // 构造函数原型的方法
  Person.prototype.say = function() {
    console.log(123);
  }
  let obj = {
    objName: '我是obj传进来的name',
    objAge: '我是obj传进来的age'
  }
  // 普通函数
  function normalFun(name, age) {
    console.log(name);   //'我是参数传进来的name'
    console.log(age);   //'我是参数传进来的age'
    console.log(this); //普通函数this指向绑定bind的第一个参数 也就是例子中的obj
    console.log(this.objName); //'我是obj传进来的name'
    console.log(this.objAge); //'我是obj传进来的age'
  }

  // 先测试作为构造函数调用
  let bindFun = Person.myBind(obj, '我是参数传进来的name')
  let a = new bindFun('我是参数传进来的age')
  a.say() //123

  // 再测试作为普通函数调用
  // let bindFun = normalFun.myBind(obj, '我是参数传进来的name')
  //  bindFun('我是参数传进来的age')