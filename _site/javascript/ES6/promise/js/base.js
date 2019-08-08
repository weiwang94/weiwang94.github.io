
// 简单用法
const one = () => {
    // 生成实例
    const p = () => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(12)
            })
        })
    }

    // 调用实例的 then 和 catch
    p().then(data => {
        console.log('success', data)
    }).catch((err) => {
        console.log('fail', err)
    })
}

// then 返回一个 promise 实例, 意味着可以连用
// 
const two = () => {
    const p = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(1)
        })
    })
    p.then((value) => {
        console.log(value)
        return 2
    }).then((value) => {
        console.log(value)
    })
}


// catch 是 then(null, rejection) 或 then(undefined, rejection)
// catch 不仅捕获 Promise rejected 回调的错误，还能捕获 then 中的错误
const three = () => {
    const p = new Promise((resolve, reject) => {
        setTimeout(() => {
            // resolve(1)
            reject('出错了')
        })
    })
    p.then((value) => {
        x + 1 
    }).catch((err) => {
        console.log('catch', err)
        x + 1
    }).catch(err => {
        console.log('catch again', err)
    })
}

// all
const four = () => {
    const p1 = () => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                
                resolve(1)
            })
        })
    }
    const p2 = () => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
               reject('error')
                resolve(2)
            })
        })
    }

   p2().catch(e => {
        console.log('p2 error', e)
    })

    const p3 = () => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {

                resolve(3)
            })
        })
    }


    Promise.all([p1(), p2(), p3()]).then(result => {
        // 都成功
        console.log('all', result)
    }).catch(err => {
        // 有一个失败 就触发
        console.log('all catch', err)
    })
}


// race
const five = () => {
    const p1 = () => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(1)
            }, 1000)
        })
    }
    const p2 = () => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // 500 ms 内没有成功，就失败
                reject(2)
            }, 500)
        })
    }
    Promise.race([p1(), p2()]).then(result => {
        // 谁先成功， 结果就是谁
        console.log('race', result)
    }).catch(err => {
        // 谁先失败， 结果就是谁
        console.log('race catch', err)
    })
}


// resove 
// 立即返回的 promise 在本轮事件循环结束时执行
const six = () => {
    setTimeout(() => {
        // 在下一轮事件循环 开始时执行
        console.log(9)   
    })
    Promise.resolve(10).then(p => {
        console.log('then', p)
    })
    console.log(11)
}



const main = () => {
    // one()
    // two()
    // three()
    // four()
    // five()
    // six()
}

main()