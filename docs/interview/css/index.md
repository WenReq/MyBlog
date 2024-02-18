---
lang: 'zh-CN'
title: CSS
description: CSS
---

## 布局

### BFC

Block Formatting Context（BFC）块级格式化上下文。形成独立的渲染区域，内部元素的渲染不会影响外界。

形成 BFC 常见的条件

1. 浮动元素（float 不是 none）
2. 绝对定位元素（position 是 absolute 或 fixed）
3. 块级元素（overflow 不是 visible）
4. flex 元素
5. inline-block 元素

应用场景：清除浮动

## css

### 1、分析比较 opacity: 0、visibility: hidden、display: none 优劣和适用场景

#### 结构

- display:none: 会让元素完全从渲染树中消失，渲染的时候不占据任何空间, 不能点击，
- visibility: hidden:不会让元素从渲染树消失，渲染元素继续占据空间，只是内容不可见，不能点击
- opacity: 0: 不会让元素从渲染树消失，渲染元素继续占据空间，只是内容不可见，可以点击

#### 继承

- display: none 和 opacity: 0：是非继承属性，子孙节点消失由于元素从渲染树消失造成，通过修改子孙节点属性无法显示。
- visibility: hidden：是继承属性，子孙节点消失由于继承了hidden，通过设置visibility: visible;可以让子孙节点显式。

#### 性能

- display: none : 修改元素会造成文档回流,读屏器不会读取display: none元素内容，性能消耗较大
- visibility: hidden : 修改元素只会造成本元素的重绘,性能消耗较少。读屏器读取 visibility: hidden 元素内容
- opacity: 0 : 修改元素会造成重绘，性能消耗较少

联系：它们都能让元素不可见

### 2、清除浮动的方式有哪些?比较好的是哪一种?

常用的一般为三种 `.clearfix`, `clear:both`,`overflow:hidden`;

比较好是 .clearfix,伪元素万金油版本,后两者有局限性.

```html
.clearfix:after {
  visibility: hidden;
  display: block;
  font-size: 0;
  content: " ";
  clear: both;
  height: 0;
}

<!--
为毛没有 zoom ,_height 这些,IE6,7这类需要 csshack 不再我们考虑之内了
.clearfix 还有另外一种写法,
-->

.clearfix:before, .clearfix:after {
    content:"";
    display:table;
}
.clearfix:after{
    clear:both;
    overflow:hidden;
}
.clearfix{
    zoom:1;
}

<!--
用display:table 是为了避免外边距margin重叠导致的margin塌陷,
内部元素默认会成为 table-cell 单元格的形式
-->
```

`clear:both`:若是用在同一个容器内相邻元素上,那是贼好的,有时候在容器外就有些问题了, 比如相邻容器的包裹层元素塌陷

`overflow:hidden`:这种若是用在同个容器内,可以形成 BFC避免浮动造成的元素塌陷

### 3、css sprite 是什么,有什么优缺点

概念：将多个小图片拼接到一个图片中。通过 background-position 和元素尺寸调节需要显示的背景图案。

优点：

1. 减少 HTTP 请求数，极大地提高页面加载速度
2. 增加图片信息重复度，提高压缩比，减少图片大小
3. 更换风格方便，只需在一张或几张图片上修改颜色或样式即可实现

缺点：

1. 图片合并麻烦
2. 维护麻烦，修改一个图片可能需要重新布局整个图片，样式

### 4、link与@import的区别

- link 是 HTML 方式， @import 是 CSS 方式
- link 最大限度支持**并行下载**，@import 过多嵌套导致**串行下载**，出现FOUC
- link 可以通过 rel="alternate stylesheet" 指定候选样式
- 浏览器对 link 支持早于 @import，可以使用 @import 对老浏览器隐藏样式
- @import 必须在**样式规则之前**，可以在 css 文件中引用其他文件

总体来说：link 优于 @import

### 5、display: block; 和 display: inline; 的区别

block元素特点：

1. 处于常规流中时，如果 width 没有设置，会自动填充满父容器
2. 可以应用 margin/padding
3. 在没有设置高度的情况下会扩展高度以包含常规流中的子元素
4. 处于常规流中时布局时在前后元素位置之间（独占一个水平空间）
5. 忽略 vertical-align

inline元素特点：

1. 水平方向上根据 direction 依次布局
2. 不会在元素前后进行换行
3. 受 white-space 控制
4. margin/padding 在竖直方向上无效，水平方向上有效
5. width/height 属性对非替换行内元素无效，宽度由元素内容决定
6. 非替换行内元素的行框高由 line-height 确定，替换行内元素的行框高由 height, margin, padding, border决定
7. 浮动或绝对定位时会转换为 block
8. vertical-align 属性生效

### 6、PNG,GIF,JPG 的区别及如何选

#### GIF

- 8 位像素，256 色
- 无损压缩
- 支持简单动画
- 支持 boolean 透明
- 适合简单动画

#### JPEG

- 颜色限于 256
- 有损压缩
- 可控制压缩质量
- 不支持透明
- 适合照片

#### PNG

- 有 PNG8 和 truecolor PNG
- PNG8 类似 GIF 颜色上限为 256，文件小，支持 alpha 透明度，无动画
- 适合图标、背景、按钮

### 7、如何水平居中一个元素

- 如果需要居中的元素为常规流中 inline 元素，为父元素设置text-align: center;即可实现
- 如果需要居中的元素为常规流中 block 元素，1）为元素设置宽度，2）设置左右 margin 为 auto。3）IE6 下需在父元素上设置text-align: center;,再给子元素恢复需要的值
- 如果需要居中的元素为浮动元素，1）为元素设置宽度，2）position: relative;，3）浮动方向偏移量（left 或者 right）设置为 50%，4）浮动方向上的 margin 设置为元素宽度一半乘以-1
- 如果需要居中的元素为绝对定位元素，1）为元素设置宽度，2）偏移量设置为 50%，3）偏移方向外边距设置为元素宽度一半乘以-1
