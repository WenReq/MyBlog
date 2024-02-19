---
lang: zh-CN
title: markdown 语法
---

```md
一、标题
 # 这是一级标题
 ## 这是二级标题
 ### 这是三级标题
 #### 这是四级标题
 ##### 这是五级标题
 ###### 这是六级标题

二、字体
 **a** 加粗
 *a* 斜体
 ***斜体加粗***
 ~~删除线~~
 ==高亮==

三、引用
 > 这是引用的内容
 >> 这是引用的内容
 >>>>>>>>>> 这是引用的内容

四、分割线
 三个或者三个以上的 - 或者 * 都可以。
 ---
 ----
 ***
 ****

五、图片
 ![图片alt](图片地址 ''Text on hover'')
 ![blockchain](https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=702257389,1274025419&fm=27&gp=0.jpg "Text on hover")

六、超链接
 [超链接名](超链接地址 "超链接title")
 [简书](http://jianshu.com)
 [百度](http://baidu.com)

七、列表
 无序列表(注意：- + * 跟内容之间都要有一个空格)

  - 列表内容
  + 列表内容
  * 列表内容

 有序列表
  1. 列表内容
  2. 列表内容
  3. 列表内容

 列表嵌套
  上一级和下一级之间敲三个空格即可

 定义列表
  : JS is available
  : https is available

 追踪已经完成的任务和需要完成的任务
  - [x] Learn Markdown
  - [ ] Learn NestJS
  - [ ] Learn Vue3

八、表格
 表头|表头|表头
 ---|:--:|---:
 内容|内容|内容
 内容|内容|内容

 姓名|技能|排行
 --|:--:|--:
 刘备|哭|大哥
 关羽|打|二哥
 张飞|骂|三弟

九、代码
 `代码内容`

 单行代码
  `create database hero;`

 ```js
   代码...
   代码...
   代码...
 ```

 代码块
  (```)
   function fun(){
     echo "这是一句非常牛逼的代码";
   }
   fun();
  (```)

十、流程图

 ```flow
    st=>start: 开始
    op=>operation: My Operation
    cond=>condition: Yes or No?
    e=>end
    st->op->cond
    cond(yes)->e
    cond(no)->op
    &```
  ```

## 显示

### 一、标题
 # 这是一级标题
 ## 这是二级标题
 ### 这是三级标题
 #### 这是四级标题
 ##### 这是五级标题
 ###### 这是六级标题

### 二、字体

- **a** 加粗
- *a* 斜体
- ***斜体加粗***
- ~~删除线~~
- ==高亮==

### 三、引用

> 这是引用的内容

>> 这是引用的内容

>>>>>>>>>> 这是引用的内容

### 四、分割线

三个或者三个以上的 - 或者 * 都可以。

---

----

***

****

### 五、图片

- ![图片alt](图片地址 ''Text on hover'')
- ![blockchain](https://buff8.oss-cn-shanghai.aliyuncs.com/sublime_words/default.png 'Text on hover')

### 六、超链接

- [超链接名](超链接地址 "超链接title")
- [简书](http://jianshu.com)
- [百度](http://baidu.com)

### 七、列表

#### 无序列表(注意：- + * 跟内容之间都要有一个空格)

- 列表内容
+ 列表内容
* 列表内容

#### 有序列表

1. 列表内容
2. 列表内容
3. 列表内容

#### 列表嵌套

上一级和下一级之间敲三个空格即可

追踪已经完成的任务和需要完成的任务

[x] Learn Markdown

[ ] Learn NestJS

[ ] Learn Vue3

### 八、表格
 表头|表头|表头
 ---|:--:|---:
 内容|内容|内容
 内容|内容|内容

 姓名|技能|排行
 --|:--:|--:
 刘备|哭|大哥
 关羽|打|二哥
 张飞|骂|三弟

### 九、代码

 `代码内容`

 单行代码 `create database hero;`

 ```js
  代码...
  代码...
  代码...
 ```

### 十、流程图

 ```flow
    st=>start: 开始
    op=>operation: My Operation
    cond=>condition: Yes or No?
    e=>end
    st->op->cond
    cond(yes)->e
    cond(no)->op
    &```
  ```

### VitePress Markdown 扩展

#### 表情：

```shell
:tada: :100:
🎉 💯
```

#### 目录：

`[[toc]]`

#### 自定义容器：

```md
::: tip
This is a tip
:::

::: warning
This is a warning
:::

::: danger
This is a dangerous warning
:::

::: danger STOP
Danger zone, do not proceed
:::
```

::: tip
This is a tip
:::

::: warning
This is a warning
:::

::: danger
This is a dangerous warning
:::

::: danger STOP
Danger zone, do not proceed
:::

#### 代码块中的行高亮：

```shell
js{4}
```

```js{4}
export default {
  data () {
    return {
      msg: 'Highlighted!'
    }
  }
}
```

除了指定单号以外，你也可以指定多个单行、区间或两者皆有：

- 行区间: 例如 `{5-8}, {3-10}, {10-17}`
- 多个单行: 例如 `{4,7,9}`
- 行区间与多个单行：例如 `{4,7-13,16,23-27,40}`

#### 行号

你可以通过配置为所有代码块启用行号：

```js
module.exports = {
  markdown: {
    lineNumbers: true
  }
}
```

#### 代码块中的聚焦

在某一行上添加 `// [!code focus]` 注释将聚焦它并模糊代码的其他部分。

此外，可以使用 `// [!code focus:<lines>]` 定义要聚焦的行数。

```js
export default {
  data () {
    return {
      msg: 'Focused!' // [!code focus]
    }
  }
}
```

#### 代码块中的颜色差异

在某一行添加 `// [!code --]` 或 `// [!code ++]` 注释将会为该行创建 diff，同时保留代码块的颜色。

```js
export default {
  data () {
    return {
      msg: 'Removed' // [!code --]
      msg: 'Added' // [!code ++]
    }
  }
}
```

#### 高亮“错误”和“警告”

在某一行添加 `// [!code warning]` 或 `// [!code error]` 注释将会为该行相应的着色。

```js
export default {
  data () {
    return {
      msg: 'Error', // [!code error]
      msg: 'Warning' // [!code warning]
    }
  }
}
```

#### 代码组

```md
::: code-group

:::
```

::: code-group

```js [config.js]
/**
 * @type {import('vitepress').UserConfig}
 */
const config = {
  // ...
}

export default config
```

```ts [config.ts]
import type { UserConfig } from 'vitepress'

const config: UserConfig = {
  // ...
}

export default config
```

:::

