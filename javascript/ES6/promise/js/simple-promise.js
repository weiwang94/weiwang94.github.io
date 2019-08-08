'use strict'

// 运行环境 node 12.7.0

const PENDING = 'pending'
const FULFILL = 'fulfill'
const REJECTED = 'rejected'

class Promise {
    // 三种状态 初始化为 pending 状态
    state = PENDING
    // 成功返回值
    value = undefined
    // 失败原因
    reason = undefined
    // 存储成功回调函数
    onFulfillCallback = []
    // 存储失败回调函数
    onRejectedCallback = []

    constructor(executor) {
        // 绑定 this
        this.resolve = this.resolve.bind(this);
        this.reject = this.reject.bind(this);
        // 执行回调函数
        executor(this.resolve, this.reject)
    }

    resolve(value) {
        if (this.state === PENDING) {
            this.state = FULFILL
            this.value = value
            this.onFulfillCallback.forEach((func) => func(value))
        }
    }

    reject(reason) {
        if (this.state === PENDING) {
            this.state = REJECTED
            this.reason = reason
            this.onRejectedCallback.forEach((func) => func(reason))
        }
    }

    then(onFulfilled, onRejected) {
        if (this.state === FULFILL) {
            onFulfilled(this.value)
        } else if (this.state === REJECTED) {
            onRejected(this.reason)
        } else if (this.state === PENDING) {
            this.onFulfillCallback.push(onFulfilled)
            this.onRejectedCallback.push(onRejected)
        } 
    }
}

// 测试 resolve 和 reject 改变状态
const test1 = () => {
    const p = new Promise(function(resolve, reject) {
        // reject('出错了')
        resolve(1)
    })

    p.then(res => {
        console.log('promise then', res)
    }, (err) => {
        console.log('promise catch', err)
    })
}

// 测试 异步 改变状态
const test2 = () => {
    const p = new Promise(function (resolve, reject) {
        setTimeout(() => {
            // reject('出错了')
            resolve(1)
        })
    })

    p.then(res => {
        console.log('promise then', res)
    }, (err) => {
        console.log('promise catch', err)
    })
}


const main = () => {
    // test1()
    // test2()
}

main()
