
// 节流 完整版

(function(){
    let btn = document.getElementsByClassName('btn')[2];
    function logger() {
        console.log('complete log');
    }
    btn.addEventListener('click', () => {
        throttle(logger, null, 1000)
    });

    // options leading 第一次延迟执行

    function throttle(func, context, wait) {
        clearTimeout(func.timeId)

        func.now = Date.now()
        if (!func.pre) {
            func.pre = Date.now()
        }

        if (func.now - func.pre > wait) {
            func.call(context)
            func.pre = func.now
        } else {
            func.timeId = setTimeout(function () {
                func.call(context)
            }, wait);
        }
    }
}())
