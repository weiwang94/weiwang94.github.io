# 文字效果

## font-size

em 相对当前字体大小的相对长度单位

rem 相对 <html> 元素字体大小的相对长度单位

桌面 chrome 浏览器默认 16px， 最小 12px;

font-size: 0; 可以隐藏文字

**line-height 不带单位是相对于 font-size 计算的**

**vetical-align 百分比数值是相对于 line-height 计算的**

## font-family

font-family 是文字使用的字体，可以使用字体名，和字体族两种值

### 字体名

比如

    font-family: simsun // 宋体

    font-family: 'Microsoft Yahei' // 微软雅黑

    font-family: simsun, 'Microsoft Yahei' // 先查找宋体，有则使用，没有则找微软雅黑，再没有则使用默认字体

### 字体族

主要字体

    serify: 衬线字体

    sans-serify 无衬线字体

    monospace 等宽字体

衬线字体： 文字笔画开始和结尾额外装饰，且笔画粗细不一致

无衬线字体： 文字笔画开始和结尾无额外装饰，且笔画粗细几乎一致

字体也可以和字体族写一块，只是字体族要放在最后，因为字体族后面的字体会被浏览器忽略

    font-family: 'Microsoft Yahei', sans-serify;

等宽字体： 宽度相等的字体，一般针对英文字体，比如代码一般设置等宽字体，看起来比较舒服。

CSS3 相对单位， 1 ch 等于阿拉伯数字 0 等宽度

## 其他

### font-weight

字体的粗细，关键字有 narmal， bolder；数值有 100， 200， 300， 400， 500， 600， 700， 800， 900，依次字体越来越粗。

font-weight 的数值也是基于字体的，如果没有相应粗细的字体，也是不起作用的。

### font-style

表示字体是斜还是正；

有三种值，normal, italic, oblique。其中 italic 是使用字体的斜体版本，如果字体没有斜体版本，则单纯倾斜字体。 oblique 单纯倾斜字体


## font

缩写形式没有什么价值暂且不记

使用系统字体

    font: menu;

    font: small-caption;

    font: status-bar;

## @font face

@font face 定义字体的集合。

有用的几种属性

    @font-face{　
        font-family: 'example';　
        src: url(example.ttf);　
        font-style: normal;　
        font-weight: normal;　
        unicode-range: U+0025-00FF;
    }

font-family 字体名称；

### src

src 可以用 local 引用本地字体，也可以用 url() 引用外部字体。

以下是常规的使用阿里字体的方法

    @font-face {
        font-family: 'webfont';
        font-display: swap;
        src: url('//at.alicdn.com/t/webfont_5q7njuqdgfg.eot'); /* IE9*/
        src: url('//at.alicdn.com/t/webfont_5q7njuqdgfg.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
        url('//at.alicdn.com/t/webfont_5q7njuqdgfg.woff2') format('woff2'),
        url('//at.alicdn.com/t/webfont_5q7njuqdgfg.woff') format('woff'), /* chrome、firefox */
        url('//at.alicdn.com/t/webfont_5q7njuqdgfg.ttf') format('truetype'), /* chrome、firefox、opera、Safari, Android, iOS 4.2+*/
        url('//at.alicdn.com/t/webfont_5q7njuqdgfg.svg#AlibabaPuHuiTiH') format('svg'); /* iOS 4.1- */
    }

上面共使用了.eot，.woff2，.woff，.ttf，.svg等 5 中字体格式，它们的特点如下

     .eot IE 专用

     .woff 转为 web 设计字体，体积小，Android 4.4 开始全面支持。

     .woff2 web 设计字体，体积更小

     .ttf 兼容老安卓 

     .svg 为了兼容 IOS 4.1 及之前版本

故可优化代码为

     @font-face {
        font-family: 'webfont';
        font-display: swap;
        src: url('//at.alicdn.com/t/webfont_5q7njuqdgfg.eot'); /* IE9*/
        src: local('😁')
        url('//at.alicdn.com/t/webfont_5q7njuqdgfg.woff2') format('woff2'),
        url('//at.alicdn.com/t/webfont_5q7njuqdgfg.woff') format('woff'), /* chrome、firefox */
        url('//at.alicdn.com/t/webfont_5q7njuqdgfg.ttf') format('truetype'), /* chrome、firefox、opera、Safari, Android, iOS 4.2+*/
    }


## 文本控制

text-indent 文字开始的空格。

letter-spacing 文字之间的距离。

word-spacing 空格的宽度

word-break 文本断行

    normal: 默认断行规则

    break-all: 在任意字符间断行

    keep-all: 中日韩文本不断行，非中日韩文本 normal

    break-word: 文本溢出断行

word-wrap 文本断行

    normal： 默认断行规则

    break-word: 文本溢出断行

### white-space

设置元素中出现的空白

几种值  

    normal 连续的空白符会被合并，换行符无效，会自动换行

    nowrap 连续的空白符会被合并，换行符无效， 不会自动换行

    pre 连续的空白符会保留, 换行符也换行， 不会自动换行

    pre-wrap 连续的空白符会保留, 换行符也换行， 会自动换行

    pre-line 连续的空白符会合并, 换行符也换行， 会自动换行

### text-align

justify 文字向两侧对齐，对最后一行无效。 文字换行时使用。

### text-decoration

用于设置文本下划线、顶划线、删除线或者闪烁

### text-transform

自动转换英文字母大小写， uppercase, lowercase 

## ::first-letter 和 ::first-line

::first-letter 一行的第一个字， 注意直接选中的是哪个字！

:: first-line 多行的第一行
