---
lang: zh-CN
title: 前章
description: 前章
---

## 什么是 JavaScript?

- 核心（**ECMAScript**）由 ECMA-262 定义并提供核心功能。
- 文档对象模型（**DOM**）提供与网页内容交互的方法和接口。
- 浏览器对象模型（**BOM**）提供与浏览器交互的方法和接口。

**Web 浏览器**只是 ECMAScript 实现可能存在的一种**宿主环境**。其他宿主环境还有服务器端 JavaScript 平台的 **Node.js**。

DOM 通过创建表示文档的树，让开发者随心所欲地控制网页的内容和解构。使用 **DOM API**, 可以轻松地删除、添加、替换、修改节点。

W3C 定制 DOM 标准。

## HTML 中的 JavaScript

JavaScript 通过 `<script>` 元素插入到 HTML 页面中。

1. JavaScript 代码嵌套到 HTML 页面中。
2. 保存在外部文件中的 JavaScript 。

- 外部文件，必须将 `src` 属性设置为要包含文件的 **URL**。文件可以和网页在同一台服务器上，也可以位于完全不同的域。
- 不使用 `defer` 和 `async` 属性情况下，包含在 `<script>` 元素中的代码必须严格**按次序执行**。
- 对不推迟执行的脚本，浏览器必须解释完位于 `<script>` 元素中的代码，然后才能继续渲染页面的剩余部分。为此，通常应该把 `<script>` 元素放到页面末尾，介于主内容之后及 `</body>` 标签之前。
- `defer` 属性把脚本推迟到**文档渲染完毕后**再执行。推迟的脚本原则上按照它们被列出的次序执行。
- `async` 属性表示脚本不需要等待其他脚本，同时也不阻塞文档渲染，即**异步加载**。异步加载不能保证按照它们在页面中出现的次序执行。
- 浏览器不支持脚本时，可以使用 `<noscript>` 元素显示内容。如果浏览器支持并启用脚本， 则 `<noscript>` 元素中的任何内容都不会被渲染。