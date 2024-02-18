---
title: 技术胖-ts
lang: zh-CN
---

[视频传送门](https://www.bilibili.com/video/BV1qV41167VD?p=1&vd_source=08f7a2ca46536916f537de5075cece94)

## tsconfig

- `outDir` tsc 编译后的文件夹
- `rootDir` tsc 要编译的文件夹
- `include` `exclude` `files` 用来匹配要进行转换的文件
- `sourceMap` ts 和 js 的管理文件，用于排除错误定位文件
- `noUnusedLocals` 没有使用的变量打包时进行提示
- `noUnusedParameters` 没有使用的方法打包进行提示

## 一些简单的概括

- 泛型：指的是泛指的类型，使用尖括号接收变量，使用的时候指定泛型的具体类型。
- 枚举：用户方便定义 index 和 label 的对应关系。
- 联合类型和类型守卫：Waiter | Teacher；类型守卫：类型断言 as，in 操作符，typeof，instanceof。
- 抽象类：abstract 用户具体类的实现。
- 类 get、set：对获取和设置变量的一种封装。
- 类 static：类中的静态方法，可以不用实例化，直接调用即可
- 类 readonly：new 的实例无法改写内部的变量。
- 子类构造函数：写构造函数时，子类必须添加 super()
- 对于继承过来的子类，1. 可以重写父类方法，2. 使用 super 扩展父类方法，3.子类的方法。子类实例可以调用父类的方法。
- 类的访问类型：
  - private - 私有的，只能内部使用
  - protected - 受保护的，继承中可以使用
  - public - 公共的，类内部外部都可以使用
- interface
  - 可选属性(?)，
  - 自定义属性（[propName: string]: any）
  - 接口继承接口（interface Teacher1 extends Girl）
  - 接口也可以限制类（class XiaoJieJie implements Girl）
  - 接口限制对象属性
- 元组：数组中元素的数据类型不同，元组中允许存储不同类型的元素，元组可以作为参数传递给函数。[string, string, number]
- 类型推断；类型注释；多个类型的数组注释；数组对象的注释；简化数组对象的注释：type alias 类型别名。
- 函数参数和返回类型的注解。
  - 不返回 void
  - 返回的类型是 never。（1.抛出异常。2.死循环。）
  - 函数参数是对象时添加的注解（{ one, two } : { one: number, two: number}）
- 类型推断不出来的话就要进行类型注解了。
- 对象类型（{name: string,age: number}） 数组类型（string[]） 类类型（Person） 函数类型（() => string）
- 基础静态类型 number string boolean
