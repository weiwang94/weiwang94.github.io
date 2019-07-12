# 元素的显示和隐藏

## display: none

display: none 隐藏元素

有些标签天然 display: none。如 style，script，dialog 等。

input 隐藏

    <input type="hidden">

H5 新特性， hidden 属性隐藏

    <div hidden>
        隐藏
    </div>

## visibility: hidden

visibility: hidden 元素不看见，但占据空间

父元素设置 visibility: hidden, 子元素默认不可见，但如果子元素设置 visibility：visible； 则元素可见

visibility: hidden 支持 transition 动画

# outline 和 cursor

outline 按键盘 Tab 键，切换 input或按钮时的效果， 实际是 :focus 控制的 outline 样式

cursor: pointer 鼠标展示成手型；

cursor: url("cursor.png"); 自定义图片作为鼠标

# direction 水平流向

direction 改变内联元素的流向, 单独使用 direction 不能改变文字的方向，但可以改变 inline-block，flex 子元素 或图片的顺序。

direction: ltr; left to right，从左到右显示

direction: rtl; right to left，从右到左显示

## unicode-bidi

normal 属性， direction: rtl，图片、按钮、问号、加号之类的符号（符号在最后）从右向左显示，正常文字还是从左向右显示

embed 属性， 和 normal 功能类似，只是当发生冲突时，这个属性优先级高。

bidi-override 属性，改变文字的方向和 direction 设置的方向一致；

## writing-mode

三个属性，horizontal-tb（默认值），vertical-rl（垂直从右往左），vertical-lr（垂直从左往右）



