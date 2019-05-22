//  参考文章
// http://www.ruanyifeng.com/blog/2013/05/Knuth%E2%80%93Morris%E2%80%93Pratt_algorithm.html


// 1, 先写个逐个字母匹配的字符串搜索程序


const words = 'wang will be a good man.'

const searchStr = (str) => {
    const wordsArr = words.split('')
    const strArr = str.split('')
    if (str.length > word.length) {
        return false
    }
    let verify = false
    let verifyCount = 0

    // for (let i = 0, w[i] = ; i < .length; i++) {
    //     for (let j = 0; j < word.split('').length; j++) {
    //         if (w[i + j] === s[j]) {
    //             verifyCount++
    //         }
    //     }
    // }
}