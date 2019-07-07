# 层叠规则

层叠顺序指的是元素发生重叠时那个在上，那个在下

z-index 必须和 position 不为 static 的值连用。CSS3 中新增了 flex盒子 的孩子元素。

层叠上下文，如果一个元素具备形成了层叠上下文的条件，则它与子元素的层叠规则就区别于其他元素。

当我们在谈层叠顺序时，我们往往不能避开层叠上下文。

## 层叠顺序

从上往下依次递增

    层叠上下文 background/border

    负 index

    block 块状水平盒子

    float 浮动盒子

    inline 内联水平盒子 （包括 inline， inline-block， inline-table 元素）

    z-index: auto 或视作 z-index: 0；不依赖 z-indx 的层叠上下文

    正 z-index

## 层叠准则

z-index 起作用时， 大的在上面

层叠水平一致时，后面的在上面

## 层叠上下文

特性：

    层叠上下文的层叠水平 大于 普通元素

    层叠上下文嵌套时，层叠水平的基础是最外层的层叠上下文

    层叠上下文只考虑子元素

生成条件：

    html 元素

    z-index 为数值的定位元素（positiotn 不为 static）

    一些 css3 属性

CSS3 一些主要的形成层叠上下文的属性

    flex 布局元素， z-index != auto

    opacity != 1

    tranform != none

    filter != none

**技巧**

    z-index 等于 负值 可以隐藏元素 

    普通场景（除了悬浮在所有元素上面的场景）不要让 z-indx 超过 2

    