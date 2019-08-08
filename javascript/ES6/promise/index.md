# Promise

promise 是为了解决异步回调过多导致的代码难以维护的问题而出现的。promise 内部存在三种状态，**pending**、**fulfilled**和***rejected**。
这三种状态只能通过 promise 内部改变，且改变了之后就不能更改了，称之为 **resolved**。能唯一让 promise 变为 fulfilled 即成功状态的回调函数是 Promise 的构造函数第一个参数，一般命名为 resolve。能让 promise 变为 rejected 失败状态的回调函数就是 第二个参数，一般命名为 reject。

基于这样的特点 promise 自然就有异步控制流程的能力了。不明白的，不妨设想一下，简单的异步操作无非就是进行中，成功，失败三种状态，只要在异步完成后调用成功回调把状态置为成功，调用失败同理


    new Promise((resolve, reject) => {})

## promise 用法

先写一个函数，返回 Promise 实例。然后调用这个函数的 then 方法得到异步响应，catch 方法，捕获异常

    // 生成实例
    const p = ( ) => {
        return new Promise((resolve, reject) => {
           setTimeout(() => {
               resolve(12)
               
           })
        }) 
    }

    // 调用实例的 then 和 catch
    p().then(data=> {
        console.log('success', data)
    }).catch((err) => {
        console.log('fail', err)
    })

then 和 catch 方法返回的还是 promise 实例，因此可以链式调用。

finally 在状态改变时触发，但不知道是何种状态，应该写与状态无关的代码

all 将多个 promise 实例状态包装为一个 promise 实例，所有实例都 resolve 调用 then，只要有一个实例 reject 调用 catch

race  将多个 promise 实例状态包装为一个 promise 实例，那个实例的状态先改变就会改变最终的 promise 实例状态

Promise.resolve() 和 Promise.reject() 返回状态改变后的 promise 实例

[代码](./js/base.js)

[自测问题](./js/question.js)

## promise 源码

源码来自 [segmentfault](https://segmentfault.com/a/1190000018209663) [github](https://github.com/funky-tiger/create-promise-by-yourself)

我编写了简单的测试代码

用类写的简单 [promise](./js/simple-promise.js)