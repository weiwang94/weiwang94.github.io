# 流的破坏与保护

css 正常文档流很难适应复杂布局的需要，于是就需要破坏流来实现想要的布局；破坏总是不好的，需要尽可能的把破坏的影响限制在特定范围内，此时就需要保护流。

## float

float 的设计本意是想实现文字环绕图片的效果；然而却经常被用作一块一块的转头式布局。

float 的作用机制是文字环绕图片显示，文字实际指的是行框盒子的文字，每一行内联元素都有一个行框盒子。

*浮动会带来两个问题，一是浮动会是父级容器塌陷，二是文字环绕*

clear 清除浮动只能在一定程度上解决文字环绕效果，但解决不了高度塌陷问题。

来看看更好的解决方案 BFC

## BFC

BFC(Block Formatting Context) 块级格式化上下文，形成一个封闭环境，不受外界影响，也不影响外界。

### 形成条件:

    html 根元素；

    float 值不为 None；

    overflow 值为 auto，scroll 或 hidden；

    display 值为 table-cell，table-caption 或 iniline-block;

    postion 不为 relative 和 static

BFC 主要目的是利用流体特性，实现自适应布局, 所以最合适的是 overflow: hidden;

## overflow

overflow 设置内容超出容器如何显示。有四个值

visible： 超出部分不被裁剪，显示在元素框之外

auto：没超出不裁剪，超出产生滚动条

scroll: 显示滚动条

hidden： 超出隐藏内容

### overflow-x 和 over-flow-y

有个特性 overflow-x 和 overflow-y，中有一个是三个值（auto， scroll， hidden）中的一个，那么另外一个不能是 visible

### 锚点定位

两种方式，其一 通过 id 定位

    <a href="#poem">有诗云</a>
           
    <div id="poem">
        <p> 满纸荒唐言，一把辛酸泪。</p>
        <p> 都云作者痴，谁解其中味。</p>
    </div>

其二 通过 name 定位，但必须是 a 标签

    <a href="#red"> 这里</a>
    <a name="red">悼红轩</a>

值得注意的是 overflow: hidden; 也可以这样定位。

## absolute

元素一旦设置 position: absolute, 则 display 自动更新为 block

### absolute 的包含块

absolute 是相对于最近非 static 的父级元素定位，这个父级元素称为包含块。

absolute 元素的表现为宽度自适应（内容占多大宽度就是多少宽度）， 但最大宽度不会超过包含块的宽度。设置 white-space: no-wrap; 可以让文字突破限制。

包含块的边界是 padding box；

### 无依赖决定定位（不设置 left right top bottom）

当只设置 position: absolute 时，其位置不在相对其他元素定位，位置是默认的，但可通过 margin 调整；且仍旧脱离文档流

*absolute 和 overflow 连用，滚动时 absolute 元素静止不动*

### absolute 和 clip

clip 必须和 absolute 和 fixed 连用才能起作用。

隐藏元素

     position: absolute;
     clip: rect(0, 0, 0, 0)

### absolute 的流体特性

同时设置 left 和right 就表现为水平方向流体特性，竖直方向也一样

流体特性的特点就是**自动充满可用空间**。

## relative

relative 得值 left right top bottom 的规则很好理解，就是相对自身定位；在四者同时存在时 top > bottom, left > right

尽量不要使用 relative， 确要使用影响也应限制在最小范围内。

## fixed

fixd 相对 html 元素定位，层级最高，永远在最上面。