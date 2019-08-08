
// 节流 
// 如果事件一直触发，以指定时间间隔执行操作
// 原理： 用闭包保存一个世间戳，比较当前时间戳和保存的时间戳在指定范围内，就执行操作

// 立即执行函数，避免不同文件变量名冲突
(function() {
    let btn = document.getElementsByClassName('btn')[0];
    function logger() {
        console.log('log');
    }
    btn.addEventListener('click', throttle(logger, 1000));

    function throttle(func, wait) {
        /* 上次的时间戳 默认第一次0 */
        let pre = 0;
        return function () {
            let now = Date.now();
            /* 如果当前时间与上次时间的间隔大于wait */
            if (now - pre > wait) {
                func.apply(this, arguments);
                pre = now;
            }
        }
    }
}())

