

function Promise(executor) {
    var _this = this;
    // 三种状态
    this.state = 'pending'; 
    //成功结果
    this.value = undefined; 
    //失败原因
    this.reason = undefined; 

    this.onFulfilledCallback = [];//保存成功回调
    this.onRejectedCallback = [];//保存失败回调
    
    function resolve(value) {
        //当状态为pending时再做更新
        if (_this.state === 'pending') {
            _this.value = value;//保存成功结果
            //依次执行成功回调
            _this.onFulfilledCallback.forEach(fn => fn(value));
            _this.state = 'resolved';
        }

    }

    function reject(reason) {
        //当状态为pending时再做更新
        if (_this.state === 'pending') {
            _this.reason = reason;//保存失败原因
            //依次执行失败回调
            _this.onRejectedFunc.forEach(fn => fn(reason));
            _this.state = 'rejected';
        }
    }

    // 构造函数，创建时就马上执行
    executor(resolve, reject);
}

Promise.prototype.then = function (onFulfilled, onRejected) {
    let that = this;
    console.log('then')
    /** 1 让promise2等于一个新的Promise 并将promise2返回 */
    let promise2 = new Promise((resolve, reject) => {
        if (that.state === 'resolved') {
            /** 2 因为返回了promise2 
             *  并且第3步resolvePromiseRelation函数中传递了promise2
             *  而目前promise2并没有拿到
             *  所以加一个定时器 异步执行 等到promise2拿到后 
             *  再去执行 resolvePromiseRelation()方法 并将promise2传递进去*/
            setTimeout(() => {
                try {
                    let promise3 = onFulfilled(that.value);
                    /** 3 判断新返回值是什么类型的函数
                     *  并将当前的promise：promise2  新的返回值：promise3 
                     *  和 成功时回调：resolve  失败时回调：reject 作为参数传进去 */
                    resolvePromiseRelation(promise2, promise3, resolve, reject);
                } catch (e) {
                    reject(e);
                }
            }, 0);
        }
        if (that.state === 'rejected') {
            /** 同2 */
            setTimeout(() => {
                try {
                    let promise3 = onRejected(that.reason);
                    /** 同3*/
                    resolvePromiseRelation(promise2, promise3, resolve, reject);
                } catch (e) {
                    reject(e);
                }
            }, 0);
        }
        if (that.state === 'pending') {
            console.log('then pending')
            that.onFulfilledCallback.push(function () {
                /** 同2 */
                setTimeout(() => {
                    try {
                        let promise3 = onFulfilled(that.value);
                        /** 同3*/
                        resolvePromiseRelation(promise2, promise3, resolve, reject);
                    } catch (e) {
                        reject(e);
                    }
                }, 0);
            });
        }
        if (that.state === 'pending') {
            that.onRejectedCallback.push(function () {
                /** 同2 */
                setTimeout(() => {
                    try {
                        let promise3 = onRejected(that.reason);
                        /** 同3*/
                        resolvePromiseRelation(promise2, promise3, resolve, reject);
                    } catch (e) {
                        reject(e);
                    }
                }, 0);
            });
        }
    });
    /** 同1 */
    return promise2;
};


function resolvePromiseRelation(promise2, promise3, resolve, reject) {
    // console.log('resolve promise relation', promise2, promise3)
    /** 4 防止 一直循环等待 */
    if (promise2 === promise3) {
        return reject(new TypeError('循环引用了!'));
    }
    /**  8 一个标示 表示当前没有被调用过 
     *   确保resolve或者reject后的状态不会再次发生变更
    */
    let called;
    /** 5 保证promise3是一个引用类型
     *  判断新返回值promise3的类型 
     *  如果是普通值常量 就直接resolve导出 */
    if (promise3 !== null && (typeof promise3 === 'object' || typeof promise3 === 'function')) {
        try {
            let then = promise3.then;
            /** 6 确保promise3是一个Promise
             *  判断promise3的then方法
             *  如果存在 并且是一个function类型 
             *  就表示promise3是一个Promise */
            if (typeof then === 'function') {
                /** 9 执行promise3的then方法
                 *  因为promise3也是一个Promise
                 *  需要再次解析promise3的then方法
                 *  直到解析到最后的返回值不是一个Promise类型为止
                 */
                then.call(promise3, (promise4) => {
                    /** 同8 */
                    // console.log('then return then')
                    // if (called) return;
                    // called = true;
                    /** 10 递归解析新的返回值的类型
                     *  解析到返回值不是一个Promise类型为止
                     */
                    resolvePromiseRelation(promise3, promise4, resolve, reject);
                }, (r) => {
                    /** 同8 */
                    if (called) return;
                    called = true;
                    reject(r);
                });
            } else {
                /** 7 此时promise3是一个普通对象 直接resolve() */
                resolve(promise3);
            }
        } catch (e) {
            /** 同8 */
            if (called) return;
            called = true;
            reject(e);
        };
    } else {
        /** 同5 普通值直接resolve()*/
        resolve(promise3);
    }
}

/** 1 直接返回this的then方法
 *  因为catch只捕获错误 所以resolve直接为null
 *  返回reject就好*/
Promise.prototype.catch = function (errFn) {
    return this.then(null, errFn);
}

/** 3 finally实现起来也很简单 
 *  分别在resolve和reject中执行fn就好 
 *  最后再把this返回出去就好
*/
Promise.prototype.finally = function (fn) {
    this.then(() => {
        fn();
    }, () => {
        fn();
    });
    return this;
}

Promise.all = function (values) {
    return new Promise((resolve, reject) => {
        let results = [];
        let index = 0;
        function addToArr(key, value) {
            index++;
            results[key] = value;
            if (index === values.length) {
                resolve(results);
            }
        }
        for (let i = 0; i < values.length; i++) {
            let current = values[i];
            if (current && current.then && typeof current.then === 'function') {
                current.then((value) => {
                    addToArr(i, value);
                }, reject);
            } else {
                addToArr(i, current);
            }
        }
    });
}

Promise.race = function (values) {
    return new Promise((resolve, reject) => {
        for (let i = 0; i < values.length; i++) {
            let current = values[i];
            if (current && current.then && typeof current.then === 'function') {
                current.then(resolve, reject);
            } else {
                resolve(current);
            }
        }
    });
}


Promise.resolve = function (value) {
    return new Promise((resolve, reject) => {
        resolve(value);
    });
}

Promise.reject = function (reason) {
    return new Promise((resolve, reject) => {
        reject(reason);
    });
}
// 实现一个promise的延迟对象 defer
Promise.defer = Promise.deferred = function () {
    let dfd = {};
    dfd.promise = new Promise((resolve, reject) => {
        dfd.resolve = resolve;
        dfd.reject = reject;
    });
    return dfd;
}

// 测试 异步
const testAsync = () => {
    let p = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(1);
        }, 500);
    });
    p.then(data => console.log(data)); 
}

// 测试链式调用 then
const testChainThen = () => {
    let p = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(1);
        }, 500);
    });
    p.then(data => {
        console.log(data)
        return p
        // return new Promise((resolve, reject) => {
        //     setTimeout(() => {
        //         resolve(2);
        //     }, 500);
        // })
    }).then((data) => {
        console.log(data)
    })
}


const main = () => {
    // testAsync()
    // testChainThen()
}

main()