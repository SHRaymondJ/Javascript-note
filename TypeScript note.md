# TypeScript notes

Install: 

```
npm install -g typescript
```



Compiled to JS 

```
tsc xxx.ts
// normal

tsc xxx.ts -w / tsx xxx.ts --watch
// watching mode

tsc -w
// watching all ts file
```



How to use

```typescript
// object
const person:{
    name:string;
    age:30;
    hobbies: string[];
    role: [number,string]; // [tuple] which means the type of elements inside is fixed.
} = {
    name: 'Raymond',
    age: 30,
    hobbies: ['Sports', 'Cooking'],
    role: [2, 'author']
}

// arguments
const add = (n1: number, n2: number, show: boolen) => {
    //...
}
    
// array
let favoriteActivities: string[];	// all of elements inside of the array should be string type

// enum
enum Role { ADMIN, READ_ONLY, AUTHOR }
//or
enum Role { ADMIN='ADMIN', READ_ONLY=0, AUTHOR='Arther' }
// enum can be any type

// literal type
function combine(resultConversion: 'as-number' | 'as-text') {
    if(resultConversion === 'as-number') {
        //...
    } else {
        //...
    }
}
combine('as-number')	//pass
combine('as-text')		// pass
combine('ddd')			// error

// type aliases
type Combinable = number | string
const obj = {
    input1:Combinable; input2: Combinable;
} = {
    input1: 1,
    input2: 'name' 
}
// this is equal to the below object
const obj = {
    input1: number | string;
    input2: number | string;
} = {
    input1: 1,
    input2: 'name'
}
// function type
let combineValues: Function
combineValues = add;
// or
let combineValues: (a:number, b:number) => number
// which means there's a function named as 'combineValues' has 2 arguments,  types of both the first argument and the second argument are number and the return type is number as well.
```



Function return type:

normal type:

- the return type must be the type which is defined after arguments

```react
function add(n1:number, n2:number): string {
    return n1.toString() + n2.toString()
}
```

Function return void:

- doesn't return anything

```react
function add(n1:number, n2:number): void {
    console.log('Result: ' + n1)
}
```

Function return undefined: 

- doesn't return anything, but the function must include at least one 'return' keyword

```react
function add(n1:number): undefined{
    console.log('Result: ' + n1)
    return	// if you remove this line, your IDE will return error
}
```

函数callback特殊类型

`void`: 无返回值，可以return;

`never`： 必须无返回值，无return

`undefined`： 必须return

