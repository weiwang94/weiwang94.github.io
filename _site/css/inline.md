## 内联元素

### 基线、x-height、ex

基线： 小写字母 x 的底部的线

x-height：小写字母 x 的高度

ex：1ex = x-height 

### line-height

line-height 表示文字占据的高度。

一行文字的高度即 line-height，由行间距和字体大小（文字本身高度）组成。其中行间距在上下被等分。

line-height > fonst-size，行间距为正，两行文字间有正的距离，没法发生重合；反之距离为负，发生重合。

在正常文字和替换元素排列在同一行时，高度取最大的

#### 居中

一行文字居中原理： line-height 只要设置的比字体大，因为行间距等分，就会实现单行文字垂直居中。

多行文字居中原理：生成幽灵空白节点（display: inline-block）,设置其 line-height 实现居中，相当于把多行变一行。

#### 取值

line-height 有三种数值表示形式

数字： 1.5 表示 1.5 倍当前字体大小

百分比：150% 表示 1.5 倍当前字体大小

数字 + 单位：1.5em 表示 1.5 倍当前字体大小

区别在于单纯数字 1.5 继承给子元素也是 1.5 倍当前字体，还保持相对性；而其他两个继承的是算出来的具体值大小，继承的是一个绝对得值。

有意思的是，不管父子元素的行高如何设置，父元素的行高总是大的哪一个。

[实例代码](./note/inline/line-height.html)

### vetical-align

vetical-align 是内联元素的对齐方式。所以在块级元素上是没用的。

vetical-align 默认值是 baseline， 可能的值，middle，top，bottom，10px(相对于基线靠上10px)

vetical-align: baseline 的含义是内联元素都按照小写字母 x 底部的基线对齐。

#### 取值

线性类： baseline top bottom middle 

文本类： text-top text-bottom

上标下标类： sub super

数值百分比类： 20px 2em 20%（相对于line-height）

#### vetical-align 和 line-height

不同大小文字影响高度的原因

    1，内联行框前面存在幽灵空白节点。
    2，内联元素默认是基线对齐。
    3，空隙是幽灵空白节点的下行距产生的

总结起来就是，行高一致和基线对齐导致高度被撑高了，

#### baseline 属性

内联元素一般都是基线对齐，但有个例外。 

元素 display: inline-block; 且里面没有内容或 overflow 不是 visible  则遵循下边缘对齐的原则

#### top bottom middle

top 元素顶部与整行的顶部对齐

bottom 元素的底部与整行的底部对齐

middle 元素中部与基线上面父元素 x-height 的一半对齐

#### text-top text-bottom

text-top 元素顶部与父元素字体内容的顶部对齐

text-bottom 元素底部与父元素字体内容的底部对齐







