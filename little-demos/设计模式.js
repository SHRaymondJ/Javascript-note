// /** 创建型模式 - 工厂模式 */
// class User {
//    constructor(username) {
//       this.username = username;
//    }
// }

// class Factory {
//    // 使用一个工厂类封装new操作
//    create(username) {
//       return new User(username);
//    }
// }

// const factory = new Factory();
// const user = factory.create('Ray')
// console.log(user.username)

/** 创建型模式 - 生产器模式 */
class ConcreteBuilder1 {
   constructor() {
      this.reset()
   }
   reset(){
      this.product = new Product1()
   }
   producePartA() {
      this.product.parts.push('PartA1')
   }
   producePartB() {
      this.product.parts.push('PartB1')
   }
   producePartC() {
      this.product.parts.push('PartC1')
   }
   getProduct(){
      const result = this.product
      this.reset()
      return result
   }
}
class Product1 {
   parts = []
   listParts() {
      console.log(`Product parts: ${this.parts.join(', ')}\n`)
   }
}
class Director{
   setBuilder(builder) {
      this.builder = builder
   }
   buildMinimalViableProduct() {
      this.builder.producePartA()
   }
   buildFullFeaturedProduct() {
      this.builder.producePartA()
      this.builder.producePartB()
      this.builder.producePartC()
   }
}
function clientCode(director) {
   const builder = new ConcreteBuilder1()
   director.setBuilder(builder)

   console.log('Standard basic product: ')
   director.buildMinimalViableProduct()
   builder.getProduct().listParts()

   console.log('Standard full featured product: ')
   director.buildFullFeaturedProduct()
   builder.getProduct().listParts()

   console.log('Custom product: ')
   builder.producePartA()
   builder.producePartC()
   builder.getProduct().listParts()
}

const director = new Director()
clientCode(director)

// /** 单例模式 */
// class LoginForm {
//    constructor() {
//       this.state = 'hide'
//    }
//    show() {
//       if (this.state === 'show') {
//          console.log('已经显示')
//          return
//       }
//       this.state = 'show'
//       console.log('登录框显示成功')
//    }
//    hide() {
//       if (this.state === 'hide') {
//          console.log('已经隐藏了')
//          return
//       }
//       this.state = 'hide'
//       console.log('登录框隐藏成功')
//    }
// }

// // 通过该静态方法生成单个实例
// LoginForm.getInstance = (function () {
//    let instance
//    return function () {
//       if (!instance) {
//          instance = new LoginForm()
//       }
//       return instance
//    }
// })()

// const login1 = LoginForm.getInstance()
// login1.show()  // 登录框显示成功
// const login2 = LoginForm.getInstance()
// login2.show()  // 已经显示


// /** 装饰器模式
//  * 解释： 装饰器传入实例引用，通过修改实例引用的属性，达到修改原实例的目的
//  */
// // 被装饰的对象构造函数
// class BaseBike {
//    constructor() {
//       this.cost = 2000
//       this.weight = 12
//    }
//    printPrice() {
//       console.log(this.cost)
//    }
//    printWeight() {
//       console.log(this.weight)
//    }
// }
// class Giant extends BaseBike {
//    constructor() {
//       super()
//       this.name = '捷安特'
//    }
//    printDetail() {
//       console.log(`${this.name} cost: ${this.cost}, weight: ${this.weight}`)
//    }
// }
// class DiKaNong extends BaseBike {
//    constructor() {
//       super()
//       this.name = '迪卡侬'
//    }
//    printDetail() {
//       console.log(`${this.name} cost: ${this.cost}, weight: ${this.weight}`)
//    }
// }
// class FrontLight {
//    add(bike) {
//       bike.cost += 100
//       bike.weight += 0.2
//    }
// }

// class BackLight {
//    add(bike) {
//       bike.cost += 56
//       bike.weight += 0.3
//    }
// }

// const bike1 = new Giant()
// FrontLight.prototype.add(bike1)
// BackLight.prototype.add(bike1)
// bike1.printPrice()
// bike1.printWeight()
// const bike2 = new DiKaNong()
// FrontLight.prototype.add(bike2)
// bike2.printDetail()


