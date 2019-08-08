
// 根据 https://www.zhihu.com/people/nswbmw/posts 整理

// 题目1 
// 考察 创建 promise 实例时，代码立即执行 

const one = () => {
    const promise = new Promise((resolve, reject) => {
        console.log(1)
        resolve()
        console.log(2)
    })
    promise.then(() => {
        console.log(3)
    })
    console.log(4)
}

// 输出
// 1
// 2
// 4
// 3


// 题目2
// 考察 promise 状态一旦变化，就不再改变

const two = () => {
    const promise = new Promise((resolve, reject) => {
        resolve('success1')
        reject('error')
        resolve('success2')
    })

    promise
        .then((res) => {
            console.log('then: ', res)
        })
        .catch((err) => {
            console.log('catch: ', err)
        })
}

// 输出
// then: success1


// 题目3
// 考察 promise.then 返回的是一个新的 promise

const three = () => {
    const promise1 = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('success one')
        }, 1000)
    })
    const promise2 = promise1.then(() => {
        return 'success two'
    })

    console.log('promise1', promise1)
    console.log('promise2', promise2)

    setTimeout(() => {
        console.log('promise1', promise1)
        console.log('promise2', promise2)
    }, 2000)
}

// 输出
// promise1 Promise { <pending> }
// promise2 Promise { <pending> }
// promise1 Promise {'success one'}
// promise2 Promise {'success two'}


// 题目 4
// 考察 promise 的链式调用

const four = () => {
    Promise.resolve(1)
        .then((res) => {
            console.log(res)
            return 2
        })
        .catch((err) => {
            return 3
        })
        .then((res) => {
            console.log(res)
        })
}

// 输出
// 1
// 2


// 题目 5
// 考察 promise 在调用 then 之后状态不再改变，直接返回结果

const five = () => {
    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('once')
            resolve('success')
        }, 1000)
    })

    const start = Date.now()
    promise.then((res) => {
        console.log(res, Date.now() - start)
    })
    promise.then((res) => {
        console.log(res, Date.now() - start)
    })
}

// 输出
// once
// success 1009
// success 1009


// 题目 6
// 考察 promise .then 或 .catch 返回的错误并不会被后面的 .catch 捕获到
// 因为返回的是一个新的 promise 对象，而 promise 对象内部的错误是不会反映到外部的

const six = () => {
    Promise.resolve()
        .then(() => {
            return new Error('error!!!')
        })
        .then((res) => {
            console.log('then: ', res)
        })
        .catch((err) => {
            console.log('catch: ', err)
        })
}

// 输出
// then: Error: error!!!
// ...
// ...


const main = () => {
    // one()
    // two()
    // three()
    // four()
    // five()
    // six()
}

main()


