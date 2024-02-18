---
title: React 知识点
lang: zh-Cn
---

## 1. 项目初始化（my-app）

### 方式一：
1. `npm install -g create-react-app` 或 `sudo npm install -g create-react-app`
2. `create-react-app <项目名>` 例如：`create-react-app my-app`

### 方式二：

`npx create-react-app <项目名>` 例如 `npx create-react-app my-app`

> 如果你的电脑上安装了 yarn 的话，create-react-app 会默认使用 yarn 而非 npm。如果你同时安装了 yarn 和 npm，但你希望使用 npm 的话，在 create-react-app 的时候需要输入 --use-npm : `npx create-react-app moz-todo-react --use-npm`

### 初始化终端报错

- 问题：Cannot find module '@babel/plugin-proposal-private-property-in-object'
- 解决：`npm install --save-dev @babel/plugin-proposal-private-property-in-object`

### 进入项目并启动

`cd my-app && npm start`

## 2. 目录

### App.js

文件 App.js 主要由三部分组成：顶部的 import 语句，中间的 App 组件，以及底部的 export 语句。大多数 React 组件都遵循这个模式。

## 3. React 入门

- 组件可以 import 它们需要的模块，并且在文件底部将自身 export，以让其他组件使用。
- 组件是用 PascalCase 也就是帕斯卡命名法命名的。
- 通过把变量放在大括号中，您可以读取 JSX 的变量，如 `{so}`
- 一些 JSX 属性与 HTML 属性不相同，这样就不会与 JavaScript 的保留字相冲突，比如说，在 HTML 中的 class 会在 JSX 中转译为 className。注意这些属性都是驼峰式命名的。
- Props 就像属性一样写在组件里，并且传入组件。

### 3.1 导出

同一文件中，有且仅有一个默认导出，但可以有多个具名导出！为了减少在默认导出和具名导出之间的混淆，一些团队会选择**只使用一种风格**（默认或者具名），或者禁止在单个文件内混合使用。这因人而异，选择最适合你的即可！

语法	|导出语句	|导入语句
--|--|--
默认|`export default function Button() {}`|`import Button from './Button.js'`;
具名|`export function Button() {}`|`import { Button } from './Button.js'`;

### 3.2 JSX规则

1. 只能返回一个根元素
2. 标签必须闭合
3. 使用驼峰式命名法给 所有 大部分属性命名！
  3.1 `className`
  3.2 由于历史原因，`aria-*` 和 `data-*` 属性是以带 - 符号的 HTML 格式书写的。

### 3.3 大括号

在 JSX 中，只能在以下两种场景中使用大括号：

1. 用作 JSX 标签内的文本：`<h1>{name}'s To Do List</h1>` 是有效的。
2. 用作紧跟在 = 符号后的 属性：`src={avatar}` 会读取 avatar 变量，但是 `src="{avatar}"` 只会传一个字符串 `{avatar}`。

#### 双大括号:

内联样式

```jsx
export default function TodoList() {
  return (
    <ul style={{
      backgroundColor: 'black',
      color: 'pink'
    }}>
      <li>Improve the videophone</li>
      <li>Prepare aeronautics lectures</li>
      <li>Work on the alcohol-fuelled engine</li>
    </ul>
  )
}
```

当你写成这样时，你可以很清楚地看到大括号里包着的对象。内联 style 属性 使用驼峰命名法编写。例如，HTML

```html
<ul style='background-color: black'> 在你的组件里应该写成 <ul style={{ backgroundColor: 'black' }}>
```

#### 更多的使用：

```jsx
const person = {
  name: 'Gregorio Y. Zara',
  theme: {
    backgroundColor: 'black',
    color: 'pink'
  }
}

export default function TodoList() {
  return (
    <div style={person.theme}>
      <h1>{person.name}'s Todos</h1>
      <img
        className="avatar"
        src="https://i.imgur.com/7vQD0fPs.jpg"
        alt="Gregorio Y. Zara"
      />
      <ul>
        <li>Improve the videophone</li>
        <li>Prepare aeronautics lectures</li>
        <li>Work on the alcohol-fuelled engine</li>
      </ul>
    </div>
  )
}
```

```jsx
src="{baseUrl+person.imageId+person.imageSize+.jpg}"
```
