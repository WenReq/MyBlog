---
title: 1. 走进前端技术栈 - CSS
lang: zh-CN
---

## 选择器 Selector

- 找出页面中的元素，以便给他们设置样式
- 使用多种方式选择元素
  - 按照标签名、类名或id
  - 按照属性
  - 按照 DOM 树中的位置

1. 通配选择器（`*`）所有
2. 标签选择器（`h1`、`p`）
3. id 选择器（`#logo`）
4. 类选择器（`.done`）
5. 属性选择器（`[disabled]`、`input[type="password"]`、`a[href^="#"]`（以#开头）、`a[href$=".jpg"]`（以.jpg结尾））
6. 伪类选择器
  - 状态伪类（`a:link`、`a:visited`、`a:hover`、`a:active`、`:focus`）
  - 结构性伪类（`li:first-child`、`li:last-child`）

## 组合

 名称|语法|说明|示例
 --|:--|:--|:--
 直接组合|AB|满足 A 同时满足 B|input:focus / .btn.primary
 后代组合|A B|选中 B，如果它是 A 的子孙|nav a
 亲子组合|A > B|选中 B，如果它是 A 的子元素|section > p
 兄弟选择器|A ~ B|选中 B，如果它在 A 后且和 A 同级|h2 ~ p
 相邻选择器|A + B|选中 B，如果它紧跟在 A 后面|h2 + p

## 选择器组

```css
[type="checkbox"], [type="radio"] {
  box-sizing: border-box;
  padding: 0;
}
```

## 颜色

- rgb(255, 0, 0, 1)
- #ff0000ff
- HSLA（色相(0-360)、饱和度(0-100%)、亮度(0-100%)、透明度(0-1)）hsl(0, 100%, 50%, 1)
- 关键字（red、blue、white）
- alpha 透明度

## 字体

`font-family: Optima, Georgia, serif, helvetica, sans-serif`

font-family 使用建议

- 字体列表最后写上通用字体族
- 英文字体放在中文字体前面

## 使用 Web Fonts

```css
@font-face {
  font-family: "Megrim";
  src: url(https://fonts.gstatic.com/s/megrim/v11/46kulbz5WjvLqJZVam_hVUdI1w.woff2) format('woff2');
}

h1 {
  font-family: Megrim, Cursive;
}
```

- 字体组合：`font: bold 14px/1.7 Helvetica, sans-serif` `font: style weight size/height family`
- 斜体：`font-style: italic`
- 对其：`text-align: center`
- 字间距：`letter-spacing: 2px`
- 词间距：`word-spacing: 2px`
- 缩进：`text-indent: 10px`
- 文字线：`text-decoration: underline`
- 空白符：`white-space: pre-line`