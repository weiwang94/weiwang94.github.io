
// 节流 进阶版

(function(){
    let btn = document.getElementsByClassName('btn')[1];
    function logger() {
        console.log('advance log');
    }
    btn.addEventListener('click', () => {
        throttle(logger, null, 1000)
    });

    function throttle(func, context, wait) {
        // 高程上的节流实现， 其实严格来讲是防抖
        console.log('timeId', func.timeId)
        clearTimeout(func.timeId)
        func.timeId = setTimeout(function() {
            func.call(context)
        }, wait);
    }
})()



