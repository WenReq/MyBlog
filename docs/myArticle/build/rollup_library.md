---
title: 使用 Rollup 编写一个可以在任何环境使用的 JavaScript 库
lang: zh-CN
---

![aa](https://rollupjs.org/logo.svg)

在本文中，我们的目标是创建和发布一个可以在客户端（html、vue）和服务器端（node）应用程序中使用的库，而无需对代码进行任何更改。

## 1. 可使用的场景

1. 该库是用 ES6+ 编写的，使用 `import` 和 `export` 关键字
2. 该库可以与 `<script>` 标记一起使用
3. 该库可以在使用现代包管理器（npm、yarn、pnpm）的 web 应用程序中使用。
4. 该库可以在 node 应用程序中使用。

这意味着库可以在以下上下文中工作:

### 1.1 使用 `<script>` 标签

```html
<html>
  <head>
    <script src="scripts/my-library.min.js"></script>
  </head>
  <body>
    <div id="app" />
    <script>
      myLibrary.helloWorld();
    </script>
  </body>
</html>
```

### 1.2 使用 RequireJS

```js
define(["my-library"], function (myLibrary) {});
// or
define(function (require) {
  var myLibrary = require("my-library");
});
```

### 1.3 在 web 应用中通过包管理器

```js
import { helloWorld } from "my-library";
helloWorld();
```

### 1.4 在 node 环境中的使用

```js
const myLibrary = require("my-library");
myLibrary.helloWorld();
// or
const { helloWorld } = require("my-library");
helloWorld();
```

### 1.5 注意

在 web 应用中通过包管理器，没有办法导入整个库并调用其中的单个函数。`import lib from 'library'; lib.sayHello();` 这完全是故意的。我们希望消费者只调用他们使用的位，这样摇树（tree-shaking）就可以完成工作，并且在捆绑最终应用程序时消除死代码。记住，在使用现代捆绑器的应用程序的情况下，消费 web 应用程序也将生成一个用于部署的捆绑包（bundle），我们希望它尽可能小，这样我们就可以使消费者，不必包含应用程序中没有使用的代码。

## 2. Rollup

为了实现这一切，我们将使用 rollup.js。主要原因是 `Rollup` 非常快(虽然不是最快的)，需要最小的配置，并且通过它方便的插件系统支持我们需要的一切。

一旦我们的库编写完成，我们将使用 Rollup 以以下三种格式导出代码:

1. UMD(通用模块定义):这将支持使用脚本标记和 RequireJS。由于消费应用程序本身不会转译或捆绑代码，我们需要提供库的一个版本，该版本经过了精简和转译，以获得广泛的浏览器支持。
2. ESM (ES2015 模块):这将允许捆绑器（npm、yarn 和 pnpm）导入我们的应用程序，消除死代码，并将其编译到他们选择的级别。我们仍然在编译代码，但只是以一种方便消费者的格式提供它，让他们决定下一步做什么。我们可以 `import` 关键字引入使用。
3. CJS (CommonJS): Node.js 格式的选择。这里不需要摇树，因为代码大小并不那么重要，这种格式允许在节点应用程序中使用 `require` 关键字。

对于每种格式，我们还将提供一个**源映射**，以便用户可以在需要时调试库。

### 2.1 创建项目

```sh
mkdir my-library
cd my-library
npm init -y
```

### 2.2 添加依赖项

显然，我们需要 `rollup`

```sh
npm install rollup --save-dev
```

我们需要将代码转译为 UMD 格式，所以让我们安装 `babel`:

```sh
npm install @babel/core @babel/preset-env --save-dev
```

我们还需要 rollup 来使用 babel 和最小化代码，所以让我们安装必要的插件来使用 babel 和 `terser`:

```sh
npm install @rollup/plugin-babel rollup-plugin-terser --save-dev
```

最后，我们希望能够在我们的库中以 node 的样式使用 import/export 语法: 这让我们可以使用 `import fn from './fn'` 替换 `import fn from './fn/index.js'`。当然，还有使用`node_modules`目录中的模块。

```sh
npm install @rollup/plugin-node-resolve --save-dev
```

库的最终依赖项列表应该如下所示:

```json
{
  "dependencies": {},
  "devDependencies": {
    "@babel/core": "^7.11.6",
    "@babel/preset-env": "^7.11.5",
    "@rollup/plugin-babel": "^5.2.1",
    "@rollup/plugin-node-resolve": "^9.0.0",
    "rollup": "^2.28.2",
    "rollup-plugin-terser": "^7.0.2"
  }
}
```

### 2.3 添加目录和配置文件

我们还需要一个用于源代码的目录，一个用于 `babel` 的配置文件，一个用于 `rollup` 的配置文件:

```sh
mkdir src
touch .babelrc.json
touch rollup.config.js
```

`.babelrc.json` 中的配置非常简单，我们只需要告诉 babel 我们想要使用最新版本的 JavaScript:

```json
{
  "presets": [["@babel/env", { "modules": false }]]
}
```

对于 Rollup，我们需要导入必要的插件:

```js
import { nodeResolve } from "@rollup/plugin-node-resolve";
import { terser } from "rollup-plugin-terser";
import babel from "@rollup/plugin-babel";
```

我们还会导入这个 `package.json`。所以我们可以在导出 UMD bundle 时使用 `name` 字段:

```js
import pkg from "./package.json";
```

我们的 `rollup.config.js` 会做两件事:

对于 UMD：获取代码，处理它并通过 babel (transpile)转化器和 terser (minify)压缩器运行它，并将其导出为 UMD 可使用文件。

```js
{
  // UMD
  input: "src/index.js",
  plugins: [
    nodeResolve(),
    babel({
      babelHelpers: "bundled",
    }),
    terser(),
  ],
  output: {
    file: `dist/${pkg.name}.min.js`,
    format: "umd",
    name: "myLibrary",
    esModule: false,
    exports: "named",
    sourcemap: true,
  },
},
```

对于 CJS/ESM:获取代码，处理它，并将其导出为 ESM 模块和 CJS 模块。记住，在这种情况下，我们不需要转导或缩小。Node 不需要它，对于 ESM，由消费者（即使用函数）来完成。

```js
{
  input: ["src/index.js"],
  plugins: [nodeResolve()],
  output: [
    {
      dir: "dist/esm",
      format: "esm",
      exports: "named",
      sourcemap: true,
    },
    {
      dir: "dist/cjs",
      format: "cjs",
      exports: "named",
      sourcemap: true,
    },
  ],
},
```

然而，在所有情况下，我们都会生成一个源地图（sourcemap）。

注意所有配置中的 `exports: "named"` 选项，在 `rollup` 的[文档](https://rollupjs.org/guide/en/#outputexports)中有更长的解释，本质上这告诉 rollup 我们使用的是**命名导出**而不是默认导出。长话短说，这允许最广泛的兼容性，并使树摇动发生。如果使用 linter，请确保将其配置为优先于命名导出而不是默认导出(这不适用于应用程序，**只适用于库**，对于应用程序使用默认导出甚至混合使用默认/命名导出（default/named exports）完全可以)。

完整的 rollup 文件如下所示。而且因为名字是从 `package.json` 里取的。只要入口点是 `src/index.js`，并且在 UMD 模块的输出中相应地设置名称，你就可以实际使用这个文件。

```js
import { nodeResolve } from "@rollup/plugin-node-resolve";
import { terser } from "rollup-plugin-terser";
import babel from "@rollup/plugin-babel";
import pkg from "./package.json";
const input = ["src/index.js"];
export default [
  {
    // UMD
    input,
    plugins: [
      nodeResolve(),
      babel({
        babelHelpers: "bundled",
      }),
      terser(),
    ],
    output: {
      file: `dist/${pkg.name}.min.js`,
      format: "umd",
      name: "myLibrary", // this is the name of the global object
      esModule: false,
      exports: "named",
      sourcemap: true,
    },
  },
  // ESM and CJS
  {
    input,
    plugins: [nodeResolve()],
    output: [
      {
        dir: "dist/esm",
        format: "esm",
        exports: "named",
        sourcemap: true,
      },
      {
        dir: "dist/cjs",
        format: "cjs",
        exports: "named",
        sourcemap: true,
      },
    ],
  },
];
```

## 3. library 函数部分

现在我们有了依赖项、配置的 babel 和 rollup，是时候编写代码了。

我们将像这样布局文件:

```tree
src
├── goodbye
│   ├── goodbye.js
│   └── index.js
├── hello
│   ├── hello.js
│   └── index.js
└── index.js
```

```js
// src/index.js
export { default as hello } from "./hello";
export { default as goodbye } from "./goodbye";
```

```js
// src/hello/index.js
export { default } from "./hello";
```

```js
// src/hello/hello.js
export default function hello() {
  console.log("hello");
}
```

```js
// src/goodbye/index.js
export { default } from "./goodbye";
```

```js
// src/goodbye/goodbye.js
export default function goodbye() {
  console.log("goodbye");
}
```

## 4. 脚本的配置

接下来我们需要调用 rollup 并告诉它执行它的工作。为了方便起见，我们将创建两个 npm 脚本，一个用于构建库，另一个用于在每次更改时重新编译代码的 dev 任务:

```json
"scripts": {
  "build": "rollup -c",
  "dev": "rollup -c -w"
},
```

最后，我们需要描述如何导出应用程序，既使 `npm` 可用，又使使用者可以使用。

我们将在 `package.json` 中定义三个值:

files 选项告诉 npm 要打包什么(这可以使用 npm pack 进行测试)，指向 CJS 模块的主选项，以及模块选项，虽然不是标准的，但已经成为 ESM 模块的规范。

```json
// package.json
...
"main": "dist/cjs/index.js",
"module": "dist/esm/index.js",
...
files: [
  "dist"
]
```

就是这样!

要构建库，只需运行 `npm run build`，在开发时，你可以使用 `npm run dev`。可以使用 `npm pack` 对导出进行测试。

## 5. 测试库

### 5.1 script

使用 script 标记，只需创建一个 HTML 文件，并在浏览器中打开它。您将在控制台中看到“hello”字样。

```html
<html>
  <head>
    <script src="dist/my-library.min.js"></script>
  </head>
  <body>
    <script>
      myLibrary.hello();
    </script>
  </body>
</html>
```

### 5.2 Requires.JS

创建一个小的 web 应用程序，并使用 serve 服务它。

```tree
www
├── index.html
└── scripts
├── app.js
├── my-library.min.js
└── require.js
```

```html
<!-- index.html -->
<html>
  <head>
    <script data-main="scripts/app.js" src="scripts/require.js"></script>
  </head>
  <body></body>
</html>
```

```js
// app.js
requirejs.config({
  baseUrl: "scripts",
});
requirejs(["my-library.min"], function (myLibrary) {
  myLibrary.hello();
});
```

字样 'hello' 将打印在控制台中。一旦模块发布，`my-library.min.js` 文件将从[https://unpkg.com/](https://unpkg.com/)上可用。

### 5.3 Node

在 library 目录外，创建一个 js 文件，并通过指向 my-library 目录(不是 dist 文件夹!)来获取模块:

```js
const myLibrary = require("../my-library");
myLibrary.hello(); // hello
myLibrary.goodbye(); // goodbye
```

如果您进一步调试应用程序，那么源映射也会起作用!

### 5.4 web 应用 - React/Vue

从一个使用 webpack 的 web 应用程序，比如 React 应用程序:

```sh
npx create-react-app my-library-cra
cd my-library-cra
```

在 package.json 的 dependencies，只需添加这一行:

```json
"my-library": "../my-library/"
```

运行 `yarn install`

在 `src/App.js`，导入和调用 hello 的函数：

```js
import { hello } from "my-library";
hello();
```

使用 `yarn start` 运行 React 应用程序并打开 JavaScript 控制台，您应该会看到打印出的 "hello" 字。

现在，为了确保摇树（tree-shaking）工作，运行`yarn build`。React 应用程序将被捆绑并放入构建目录中。如果你在文件中搜索 hello 关键字，你会看到它在一个 js 文件中，有一个长而复杂的名字，但是关键字 goodbye 却找不到。这表明 webpack 只**拉入必要的代码**。由于我们在库中使用命名导出，库的消费者不能从 'my-library' 写入 `import myLibrary`;并且错误地导入了整个包，而只使用了其中的一部分。

## 6. 最后

希望以上内容对你有帮助，如果你有任何问题请在评论中告诉我!

我开源的前端函数工具库 [realize-utils](https://github.com/wenreq/realize-utils)，此开源项目用的就是 Rollup 打的多类型的包（CJS、UMD、ESM）。请给个 Star 吧。ღ( ´･ᴗ･` )比心
