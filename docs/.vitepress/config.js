/*
 * @Author: 温少昌 wenshaochang@huizhihuyu.com
 * @Date: 2024-02-18 10:29:30
 * @LastEditors: 温少昌 wenshaochang@huizhihuyu.com
 * @LastEditTime: 2024-02-19 12:31:34
 * @FilePath: /NewMyBlog/docs/.vitepress/config.js
 * @Description: 一个 VuePress 站点必要的配置文件是 .vuepress/config.js
 */
module.exports = {
    title: "精进技术",
    description: "技术的精进和提升",
    base: "/blog/",
    markdown: {
        // 为所有代码块启用行号
        lineNumbers: true,
        anchor: { permalink: false },
        toc: { includeLevel: [1, 2] },
        config: (md) => {
            // use more markdown-it plugins!
            // md.use(require("markdown-it-anchor"))
        },
        image: {
            // 默认禁用图片懒加载
            lazyLoading: true
        }
    },
    lang: "en-US",
    ignoreDeadLinks: true,
    themeConfig: {
        search: {
            provider: 'algolia',
            options: {
                apiKey: "73bbe452801056ade1a65ac7a392a283",
                indexName: "WenReq",
                appId: "RUDT0L2NIK",
                placeholder: "搜索文档",
                translations: {
                    button: {
                        buttonText: "搜索文档",
                        buttonAriaLabel: "搜索文档",
                    },
                    modal: {
                        searchBox: {
                            resetButtonTitle: "清除查询条件",
                            resetButtonAriaLabel: "清除查询条件",
                            cancelButtonText: "取消",
                            cancelButtonAriaLabel: "取消",
                        },
                        startScreen: {
                            recentSearchesTitle: "搜索历史",
                            noRecentSearchesText: "没有搜索历史",
                            saveRecentSearchButtonTitle: "保存至搜索历史",
                            removeRecentSearchButtonTitle: "从搜索历史中移除",
                            favoriteSearchesTitle: "收藏",
                            removeFavoriteSearchButtonTitle: "从收藏中移除",
                        },
                        errorScreen: {
                            titleText: "无法获取结果",
                            helpText: "你可能需要检查你的网络连接",
                        },
                        footer: {
                            selectText: "选择",
                            navigateText: "切换",
                            closeText: "关闭",
                            searchByText: "搜索提供者",
                        },
                        noResultsScreen: {
                            noResultsText: "无法找到相关结果",
                            suggestedQueryText: "你可以尝试查询",
                            reportMissingResultsText: "你认为该查询应该有结果？",
                            reportMissingResultsLinkText: "点击反馈",
                        },
                    },
                },
            }
        },
        logo: "http://www.wenreq.site/utils/images/gitPicture.jpg",
        nav: [
            {
                link: "/",
                text: "主页",
            },
            {
                link: "/technology/",
                text: "精进技术",
            },
            {
                text: "我的文章",
                link: "/myArticle/markdown",
            },
            {
                text: "面试专栏",
                link: "/interview/",
            },
            {
                text: "📚电子书籍",
                items: [
                    {
                        text: "JavaScript高级程序设计(第四版)",
                        link: "http://www.wenreq.site/utils/PDF/JavaScript高级程序设计(第4版) .pdf",
                    },
                    {
                        text: "你不知道的JavaScript上",
                        link: "http://www.wenreq.site/utils/PDF/你不知道的JavaScript_上.pdf",
                    },
                    {
                        text: "你不知道的JavaScript中",
                        link: "http://www.wenreq.site/utils/PDF/你不知道的JavaScript_中.pdf",
                    },
                    {
                        text: "你不知道的JavaScript下",
                        link: "http://www.wenreq.site/utils/PDF/你不知道的JavaScript_下.pdf",
                    },
                    {
                        text: "JavaScript语言精粹",
                        link: "http://www.wenreq.site/utils/PDF/JavaScript语言精粹.pdf",
                    },
                    {
                        text: "JavaScript设计模式与开发实践",
                        link: "http://www.wenreq.site/utils/PDF/JavaScript设计模式与开发实践.pdf",
                    },
                    {
                        text: "Css世界",
                        link: "http://www.wenreq.site/utils/PDF/css世界.pdf",
                    },
                    {
                        text: "图解HTTP",
                        link: "http://www.wenreq.site/utils/PDF/图解HTTP.pdf",
                    },
                    {
                        text: "TCP/IP详解卷1：协议",
                        link: "http://www.wenreq.site/utils/PDF/TCP-IP详解卷1：协议.pdf",
                    },
                    {
                        text: "编译原理(第二版)",
                        link: "http://www.wenreq.site/utils/PDF/编译原理_0303.pdf",
                    },
                    {
                        text: "编译原理及实践",
                        link: "http://www.wenreq.site/utils/PDF/编译原理及实践.pdf",
                    },
                    {
                        text: "图解算法",
                        link: "http://www.wenreq.site/utils/PDF/图解算法.pdf",
                    },
                    {
                        text: "深入浅出Node.js",
                        link: "http://www.wenreq.site/utils/PDF/深入浅出Node.js.pdf",
                    },
                    {
                        text: "前端程序员面试秘籍",
                        link: "http://www.wenreq.site/utils/PDF/前端程序员面试秘籍.pdf",
                    },
                    {
                        text: "鸟哥的Linux私房菜基础学习篇.pdf",
                        link: "http://www.wenreq.site/utils/PDF/鸟哥的Linux私房菜基础学习篇.pdf",
                    },
                    {
                        text: "见识 吴军",
                        link: "http://www.wenreq.site/utils/PDF/见识 吴军.pdf",
                    },
                ],
            },
            {
                link: "https://github.com/wenreq",
                text: "Github",
            },
        ],
        sidebar: {
            "/technology/": [
                {
                    text: "精进技术",
                    items: [
                        {
                            text: "基础知识",
                            collapsed: true,
                            items: [
                                {
                                    text: "HTML",
                                    collapsed: true,
                                    items: [
                                        {
                                            text: "掘金 - HTML5入门教程",
                                            collapsed: true,
                                            items: [
                                                {
                                                    text: "介绍",
                                                    link: "/technology/basic/HTML/juejin/introduction/index.md",
                                                },
                                                {
                                                    text: "1、HTML 简介",
                                                    link: "/technology/basic/HTML/juejin/introduction/01.md",
                                                },
                                                {
                                                    text: "2、HTML5 简介",
                                                    link: "/technology/basic/HTML/juejin/introduction/02.md",
                                                },
                                                {
                                                    text: "3、语义化标签",
                                                    link: "/technology/basic/HTML/juejin/introduction/03.md",
                                                },
                                                {
                                                    text: "4、Web表单2.0",
                                                    link: "/technology/basic/HTML/juejin/introduction/04.md",
                                                },
                                                {
                                                    text: "5、多媒体查询",
                                                    link: "/technology/basic/HTML/juejin/introduction/05.md",
                                                },
                                                {
                                                    text: "6、MathML",
                                                    link: "/technology/basic/HTML/juejin/introduction/06.md",
                                                },
                                                {
                                                    text: "7、MicroData",
                                                    link: "/technology/basic/HTML/juejin/introduction/07.md",
                                                },
                                                {
                                                    text: "8、文档编辑属性",
                                                    link: "/technology/basic/HTML/juejin/introduction/08.md",
                                                },
                                                {
                                                    text: "9、地理位置",
                                                    link: "/technology/basic/HTML/juejin/introduction/09.md",
                                                },
                                                {
                                                    text: "10、Drag and Drop",
                                                    link: "/technology/basic/HTML/juejin/introduction/10.md",
                                                },
                                                {
                                                    text: "11、canvas",
                                                    link: "/technology/basic/HTML/juejin/introduction/11.md",
                                                },
                                                {
                                                    text: "12、SVG",
                                                    link: "/technology/basic/HTML/juejin/introduction/12.md",
                                                },
                                                {
                                                    text: "13、Web Storage",
                                                    link: "/technology/basic/HTML/juejin/introduction/13.md",
                                                },
                                                {
                                                    text: "14、Web SQL",
                                                    link: "/technology/basic/HTML/juejin/introduction/14.md",
                                                },
                                                {
                                                    text: "15、IndexDB",
                                                    link: "/technology/basic/HTML/juejin/introduction/15.md",
                                                },
                                                {
                                                    text: "16、Web Worker",
                                                    link: "/technology/basic/HTML/juejin/introduction/16.md",
                                                },
                                                {
                                                    text: "17、服务端推送 SSE",
                                                    link: "/technology/basic/HTML/juejin/introduction/17.md",
                                                },
                                                {
                                                    text: "18、WebSockets",
                                                    link: "/technology/basic/HTML/juejin/introduction/18.md",
                                                },
                                                {
                                                    text: "19、代码开发规范",
                                                    link: "/technology/basic/HTML/juejin/introduction/19.md",
                                                },
                                            ],
                                        },
                                    ],
                                },
                                {
                                    text: "CSS",
                                    collapsed: true,
                                    items: [
                                        {
                                            text: "掘金 - CSS 入门教程",
                                            collapsed: true,
                                            items: [
                                                {
                                                    text: "介绍",
                                                    link: "/technology/basic/CSS/juejin/introduction/index.md",
                                                },
                                                {
                                                    text: "1、概述",
                                                    link: "/technology/basic/CSS/juejin/introduction/01.md",
                                                },
                                                {
                                                    text: "2、圆角、渐变、过度、动画、变形、弹性盒子、网格",
                                                    link: "/technology/basic/CSS/juejin/introduction/02.md",
                                                },
                                            ],
                                        },
                                    ],
                                },
                            ],
                        },
                        {
                            text: "掘金-字节内部课",
                            collapsed: true, items: [
                                {
                                    text: "前端入门 - 基础语言篇",
                                    collapsed: true,
                                    items: [
                                        {
                                            text: "1、走进前端技术栈 - CSS",
                                            link: "/technology/byte/webBasic/css.md",
                                        },
                                        {
                                            text: "2、深入 CSS",
                                            link: "/technology/byte/webBasic/thoroughCss.md",
                                        }
                                    ],
                                },
                            ],
                        },
                        {
                            text: "LESS/SCSS",
                            collapsed: true,
                            items: [
                                {
                                    text: "LESS",
                                    collapsed: true,
                                    items: [
                                        {
                                            text: "快速入门",
                                            link: "/technology/style/less/01.md"
                                        },
                                        {
                                            text: "进阶指南",
                                            link: "/technology/style/less/02.md"
                                        }
                                    ],
                                }
                            ],
                        },
                        {
                            text: "JavaScript",
                            collapsed: true,
                            items: [
                                {
                                    text: "JS高级程序设计第四版",
                                    collapsed: true,
                                    items: [
                                        {
                                            text: "前章",
                                            link: "/technology/javaScript/programming/introduction.md",
                                        },
                                        {
                                            text: "1、语言基础",
                                            link: "/technology/javaScript/programming/01.md",
                                        },
                                        {
                                            text: "2、变量、作用域、内存",
                                            link: "/technology/javaScript/programming/02.md",
                                        },
                                        {
                                            text: "3、基本引用类型",
                                            link: "/technology/javaScript/programming/03.md",
                                        },
                                        {
                                            text: "4、集合引用类型",
                                            link: "/technology/javaScript/programming/04.md",
                                        },
                                        {
                                            text: "5、迭代器与生成器",
                                            link: "/technology/javaScript/programming/05.md",
                                        },
                                        {
                                            text: "6、对象、类与面向对象编程",
                                            link: "/technology/javaScript/programming/06.md",
                                        },
                                        {
                                            text: "7、代理与反射",
                                            link: "/technology/javaScript/programming/07.md",
                                        },
                                        {
                                            text: "8、函数",
                                            link: "/technology/javaScript/programming/08.md",
                                        },
                                        {
                                            text: "9、期约与异步函数",
                                            link: "/technology/javaScript/programming/09.md",
                                        },
                                        {
                                            text: "10、BOM",
                                            link: "/technology/javaScript/programming/10.md",
                                        },
                                        {
                                            text: "11、客户端检测能力",
                                            link:"/technology/javaScript/programming/11.md",
                                        },
                                        {
                                            text: "12、DOM - MutationObserver",
                                            link: "/technology/javaScript/programming/12.md",
                                        },
                                        {
                                            text: "13、网络请求与远程资源",
                                            link:"/technology/javaScript/programming/13.md",
                                        },
                                    ],
                                },
                                {
                                    text: "你不知道的JS-上",
                                    collapsed: true,
                                    items: [
                                        {
                                            text: "第一部分 作用域和闭包",
                                            collapsed: true,
                                            items: [
                                                {
                                                    text: "1、作用域是什么",
                                                    link: "/technology/javaScript/unaware/01.md",
                                                },
                                                {
                                                    text: "2、词法作用域",
                                                    link: "/technology/javaScript/unaware/02.md",
                                                },
                                                {
                                                    text: "3、函数作用域和块作用域",
                                                    link: "/technology/javaScript/unaware/03.md",
                                                },
                                                {
                                                    text: "4、提升",
                                                    link: "/technology/javaScript/unaware/04.md",
                                                },
                                                {
                                                    text: "5、作用域闭包",
                                                    link: "/technology/javaScript/unaware/05.md",
                                                },
                                                {
                                                    text: "6、附 A: 动态作用域",
                                                    link: "/technology/javaScript/unaware/1c.md",
                                                },
                                                {
                                                    text: "7、附 B: 块作用域的方案",
                                                    link: "/technology/javaScript/unaware/1c.md",
                                                },
                                                {
                                                    text: "8、附 C: this 词法",
                                                    link: "/technology/javaScript/unaware/1c.md",
                                                },
                                            ],
                                        },
                                        {
                                            text: "第二部分 this和对象原型",
                                            collapsed: true,
                                            items: [
                                                {
                                                    text: "1、关于 this",
                                                    link: "/technology/javaScript/unaware/06.md",
                                                },
                                                {
                                                    text: "2、this 全面解析",
                                                    link: "/technology/javaScript/unaware/07.md",
                                                },
                                                {
                                                    text: "3、对象",
                                                    link: "/technology/javaScript/unaware/08.md",
                                                },{
                                                    text: "4、混合对象-类",
                                                    link: "/technology/javaScript/unaware/09.md",
                                                },
                                                {
                                                    text: "5、原型",
                                                    link: "/technology/javaScript/unaware/10.md",
                                                },
                                                {
                                                    text: "6、行为委托",
                                                    link: "/technology/javaScript/unaware/11.md",
                                                },
                                                {
                                                    text: "7、附 A: ES 中的 Class",
                                                    link: "/technology/javaScript/unaware/2a.md",
                                                },
                                            ],
                                        },
                                    ],
                                },
                                {
                                    text: "ECMAScript 6 入门",
                                    collapsed: true,
                                    items: [
                                        {
                                            text: "ECMAScript 6 简介",
                                            link: "/technology/javaScript/es6/introduction.md",
                                        },
                                        {
                                            text: "let 和 const 命令",
                                            link: "/technology/javaScript/es6/01.md",
                                        },
                                        {
                                            text: "变量的解构赋值",
                                            link: "/technology/javaScript/es6/02.md",
                                        },
                                        {
                                            text: "字符串的扩展",
                                            link: "/technology/javaScript/es6/03.md",
                                        },
                                        {
                                            text: "字符串的新增方法",
                                            link: "/technology/javaScript/es6/04.md",
                                        },
                                        {
                                            text: "正则的扩展",
                                            link: "/technology/javaScript/es6/05.md",
                                        },
                                        {
                                            text: "数值的扩展",
                                            link: "/technology/javaScript/es6/06.md",
                                        },
                                        {
                                            text: "函数的扩展",
                                            link: "/technology/javaScript/es6/07.md",
                                        },
                                        {
                                            text: "数组的扩展",
                                            link: "/technology/javaScript/es6/08.md",
                                        },
                                    ],
                                },
                                {
                                    text: "基于 JavaScript 开发灵活的数据应用",
                                    collapsed: true,
                                    items: [
                                        {
                                            text: "1、字符串和数字",
                                            link:  "/technology/javaScript/data/1.md",
                                        },
                                        {
                                            text: "2、对象字面量",
                                            link:  "/technology/javaScript/data/3.md",
                                        },
                                        {
                                            text: "3、数组",
                                            link:  "/technology/javaScript/data/03.md",
                                        },
                                        {
                                            text: "4、基本统计",
                                            link:  "/technology/javaScript/data/04.md",
                                        }
                                    ],
                                },
                            ],
                        },
                        {
                            text: "Typescript",
                            collapsed: true,
                            items: [
                                {
                                    text: "拉钩",
                                    collapsed: true,
                                    items: [
                                        {
                                            text: "开篇词-为什么选择 TS",
                                            link: "/technology/typescript/lagou/01.md"
                                        },
                                        {
                                            text: "模块一：TypeScript 入门",
                                            collapsed: true,
                                            items: [
                                                {
                                                    text: "1、如何快速搭建 TypeScript 学习开发环境？",
                                                    link: "/technology/typescript/lagou/02.md",
                                                },
                                                {
                                                    text: "2、简单基础类型：TypeScript 与 JavaScript 有何不同？",
                                                    link: "/technology/typescript/lagou/03.md",
                                                },
                                                {
                                                    text: "3、复杂基础类型：TypeScript 与 JavaScript 有何不同？",
                                                    link: "/technology/typescript/lagou/04.md",
                                                },
                                                {
                                                    text: "4、什么是字面量类型、类型推断、类型拓宽和类型缩小？",
                                                    link: "/technology/typescript/lagou/05.md",
                                                },
                                                {
                                                    text: "5、函数类型：返回值类型和参数类型到底如何定义？",
                                                    link: "/technology/typescript/lagou/06.md",
                                                },
                                                {
                                                    text: "6、类类型：如何高效使用类型化的面向对象编程利器？",
                                                    link: "/technology/typescript/lagou/07.md",
                                                },
                                                {
                                                    text: "7、接口类型与类型别名：这两者的用法与区别分别是什么？",
                                                    link: "/technology/typescript/lagou/08.md",
                                                },
                                                {
                                                    text: "8、高级类型：联合类型和交叉类型",
                                                    link: "/technology/typescript/lagou/09.md",
                                                },
                                                {
                                                    text: "9、枚举类型：常见枚举类型的 7 种用法",
                                                    link: "/technology/typescript/lagou/10.md",
                                                },
                                                {
                                                    text: "10、泛型：如何正确使用泛型约束类型变量？",
                                                    link: "/technology/typescript/lagou/11.md",
                                                }
                                            ],
                                        },
                                        {
                                            text: "模块二：TypeScript 进阶",
                                            collapsed: true,
                                            items: [{
                                                text: "11、类型守卫：如何有效保障类型的安全性？",
                                                link: "/technology/typescript/lagou/12.md"
                                            }],
                                        },
                                    ],
                                },
                                {
                                    text: "bli-技术胖",
                                    link: "/technology/typescript/jsp.md",
                                },
                                {
                                    text: "TypeScript 入门教程",
                                    collapsed: true,
                                    items: [
                                        {
                                            text: "简介",
                                            collapsed: true,
                                            items: [
                                                {
                                                    text: "1、什么是TS",
                                                    link: "/technology/typescript/ts_basic/01.md",
                                                },
                                                {
                                                    text: "2、安装TS",
                                                    link: "/technology/typescript/ts_basic/02.md",
                                                },
                                                {
                                                    text: "3、Hello TS",
                                                    link: "/technology/typescript/ts_basic/03.md",
                                                },
                                            ],
                                        },
                                        {
                                            text: "基础",
                                            collapsed: true,
                                            items: [
                                                {
                                                    text: "4、Hello",
                                                    link: "/technology/typescript/ts_basic/04.md",
                                                },
                                                {
                                                    text: "5、Hello",
                                                    link: "/technology/typescript/ts_basic/05.md",
                                                },
                                                {
                                                    text: "6、Hello",
                                                    link: "/technology/typescript/ts_basic/06.md",
                                                }
                                            ],
                                        },
                                    ],
                                },
                            ],
                        },
                        {
                            text: "Vue 2",
                            collapsed: true,
                            items: [
                                {
                                    text: "源码",
                                    collapsed: true,
                                    items: [
                                        {
                                            text: "掘金：内部运行机制",
                                            collapsed: true,
                                            items: [
                                                {
                                                    text: "1、Vue.js 运行机制全局概览",
                                                    link: "/technology/vue2/sourceCode/01.md",
                                                },
                                                {
                                                    text: "2、响应式系统的基本原理",
                                                    link:"/technology/vue2/sourceCode/02.md",
                                                },
                                                {
                                                    text: "3、响应式系统的依赖收集追踪原理",
                                                    link: "/technology/vue2/sourceCode/03.md",
                                                },
                                                {
                                                    text: "4、实现 Virtual DOM 下的一个 VNode 节点",
                                                    link: "/technology/vue2/sourceCode/04.md",
                                                },
                                                {
                                                    text: "5、template 模板是怎样通过 Compile 编译的",
                                                    link: "/technology/vue2/sourceCode/05.md",
                                                },
                                                {
                                                    text: "6、数据状态更新时的差异 diff 及 patch 机制",
                                                    link: "/technology/vue2/sourceCode/06.md",
                                                },
                                                {
                                                    text: "7、批量异步更新策略及 nextTick 原理",
                                                    link: "/technology/vue2/sourceCode/07.md",
                                                },
                                                {
                                                    text: "8、Vuex 状态管理的工作原理",
                                                    link: "/technology/vue2/sourceCode/08.md",
                                                }
                                            ],
                                        },
                                    ],
                                },
                                {
                                    text: "Vue2 官方文档-自己总结",
                                    collapsed: true,
                                    items: [{
                                        text: "官网总结",
                                        link: "/technology/vue2/document/index.md"
                                    }],
                                },
                            ],
                        },
                        {
                            text: "Vue 3",
                            collapsed: true,
                            items: [
                                {
                                    text: "Vue 3文档",
                                    collapsed: true,
                                    items: [
                                        {
                                            text: "1. 开始",
                                            link: "/technology/vue3/document/index.md",
                                        },
                                        {
                                            text: "2. 基础",
                                            collapsed: true,
                                            items: [
                                                {
                                                    text: "1、创建一个 Vue 应用",
                                                    link: "/technology/vue3/document/basic/01.md",
                                                },
                                                {
                                                    text: "2、模板语法",
                                                    link: "/technology/vue3/document/basic/02.md",
                                                },
                                                {
                                                    text: "3、响应式基础",
                                                    link: "/technology/vue3/document/basic/03.md",
                                                },
                                                {
                                                    text: "4、计算属性",
                                                    link: "/technology/vue3/document/basic/04.md",
                                                },
                                                {
                                                    text: "5、类与样式绑定",
                                                    link: "/technology/vue3/document/basic/05.md",
                                                },
                                                {
                                                    text: "6、条件渲染",
                                                    link: "/technology/vue3/document/basic/06.md",
                                                },
                                                {
                                                    text: "7、列表渲染",
                                                    link: "/technology/vue3/document/basic/07.md",
                                                },
                                                {
                                                    text: "8、事件处理",
                                                    link: "/technology/vue3/document/basic/08.md",
                                                },
                                                {
                                                    text: "9、表单输入绑定",
                                                    link: "/technology/vue3/document/basic/09.md",
                                                },
                                                {
                                                    text: "10、生命周期",
                                                    link: "/technology/vue3/document/basic/10.md",
                                                },
                                                {
                                                    text: "11、侦听器",
                                                    link: "/technology/vue3/document/basic/11.md",
                                                },
                                                {
                                                    text: "12、模板 ref",
                                                    link: "/technology/vue3/document/basic/12.md",
                                                },
                                                {
                                                    text: "13、组件基础",
                                                    link: "/technology/vue3/document/basic/13.md",
                                                }
                                            ],
                                        },
                                        {
                                            text: "3. 深入组件",
                                            collapsed: true,
                                            items: [
                                                {
                                                    text: "1、组件注册",
                                                    link: "/technology/vue3/document/further/01.md",
                                                },
                                                {
                                                    text: "2、Props",
                                                    link: "/technology/vue3/document/further/02.md",
                                                },
                                                {
                                                    text: "3、组件事件",
                                                    link: "/technology/vue3/document/further/03.md",
                                                },
                                                {
                                                    text: "4、透传 Attribute",
                                                    link: "/technology/vue3/document/further/04.md",
                                                },
                                                {
                                                    text: "5、插槽",
                                                    link: "/technology/vue3/document/further/05.md",
                                                },
                                                {
                                                    text: "6、依赖注入",
                                                    link: "/technology/vue3/document/further/06.md",
                                                },
                                                {
                                                    text: "7、异步组件",
                                                    link: "/technology/vue3/document/further/07.md",
                                                }
                                            ],
                                        },
                                        {
                                            text: "4. 可重用性",
                                            collapsed: true,
                                            items: [
                                                {
                                                    text: "1、组合式函数",
                                                    link: "/technology/vue3/document/reusing/01.md",
                                                },
                                                {
                                                    text: "2、自定义指令",
                                                    link: "/technology/vue3/document/reusing/02.md",
                                                },
                                                {
                                                    text: "3、插件",
                                                    link: "/technology/vue3/document/reusing/03.md",
                                                }
                                            ],
                                        },
                                        {
                                            text: "5. 内置模块",
                                            collapsed: true,
                                            items: [
                                                {
                                                    text: "1、Transition 过渡",
                                                    link: "/technology/vue3/document/builtIn/01.md",
                                                },
                                                {
                                                    text: "2、TransitionGroup 过渡组",
                                                    link: "/technology/vue3/document/builtIn/02.md",
                                                },
                                                {
                                                    text: "3、KeepAlive",
                                                    link: "/technology/vue3/document/builtIn/03.md",
                                                },
                                                {
                                                    text: "4、Teleport 传送门",
                                                    link: "/technology/vue3/document/builtIn/04.md",
                                                },
                                                {
                                                    text: "5、Suspense",
                                                    link: "/technology/vue3/document/builtIn/05.md",
                                                }
                                            ],
                                        },
                                        {
                                            text: "6. 升级规模",
                                            collapsed: true,
                                            items: [
                                                {
                                                    text: "1、单文件组件",
                                                    link: "/technology/vue3/document/upgrade/01.md",
                                                },
                                                {
                                                    text: "2、工具链",
                                                    link: "/technology/vue3/document/upgrade/02.md",
                                                },
                                                {
                                                    text: "3、路由",
                                                    link: "/technology/vue3/document/upgrade/03.md",
                                                },
                                                {
                                                    text: "4、状态管理",
                                                    link: "/technology/vue3/document/upgrade/04.md",
                                                },
                                                {
                                                    text: "5、测试",
                                                    link: "/technology/vue3/document/upgrade/05.md",
                                                }
                                            ],
                                        },
                                        {
                                            text: "7. 最佳实践",
                                            collapsed: true,
                                            items: [
                                                {
                                                    text: "1、生产部署",
                                                    link: "/technology/vue3/document/best/01.md",
                                                },
                                                {
                                                    text: "2、性能",
                                                    link: "/technology/vue3/document/best/02.md",
                                                },
                                                {
                                                    text: "3、安全",
                                                    link: "/technology/vue3/document/best/03.md",
                                                },
                                            ],
                                        },
                                        {
                                            text: "8. TypeScript",
                                            link: "/technology/vue3/document/TypeScript/01.md"
                                        },
                                        {
                                            text: "9. 进阶主题",
                                            collapsed: true,
                                            items: [
                                                {
                                                    text: "1、组合式 API",
                                                    link: "/technology/vue3/document/advance/01.md",
                                                },
                                                {
                                                    text: "2、深入响应式系统",
                                                    link: "/technology/vue3/document/advance/02.md",
                                                }
                                            ],
                                        },
                                    ],
                                },
                                {
                                    text: "掘金 玩转Vue3",
                                    collapsed: true,
                                    items: [
                                        {
                                            text: "1、Options Api很普及，为什么Vue3还要出Composition Api？",
                                            link: "/technology/vue3/juejin/01.md",
                                        },
                                        {
                                            text: "2、Vue3.0中的响应式做了哪些改变？",
                                            link: "/technology/vue3/juejin/02.md",
                                        },
                                        {
                                            text: "3、Vue2升级Vue3有哪些非兼容性变更？",
                                            link: "/technology/vue3/juejin/03.md",
                                        },
                                        {
                                            text: "4、怎样将你的Vue2项目升级到Vue3？",
                                            link: "/technology/vue3/juejin/04.md",
                                        },
                                        {
                                            text: "5、Vite 为什么这么快？",
                                            link: "/technology/vue3/juejin/05.md",
                                        },
                                        {
                                            text: "6、使用 Vue3 + Vite 搭建项目",
                                            link: "/technology/vue3/juejin/06.md",
                                        },
                                        {
                                            text: "7、如何使用组件化来开发你的 Vue3 项目？",
                                            link: "/technology/vue3/juejin/07.md",
                                        },
                                        {
                                            text: "8、怎么让你的组件变得更加灵活",
                                            link: "/technology/vue3/juejin/08.md",
                                        },
                                        {
                                            text: "9、Vue3 中的过度和动画效果实现",
                                            link: "/technology/vue3/juejin/09.md",
                                        },
                                        {
                                            text: "10、Vue3 全家桶之路由系统",
                                            link: "/technology/vue3/juejin/10.md",
                                        },
                                        {
                                            text: "11、Vue3 全家桶之数据管理",
                                            link: "/technology/vue3/juejin/11.md",
                                        },
                                        {
                                            text: "12、Vue3 全家桶之网络请求",
                                            link: "/technology/vue3/juejin/12.md",
                                        },
                                        {
                                            text: "13、怎么使用 TypeScript 来规范你的代码？",
                                            link: "/technology/vue3/juejin/13.md",
                                        },
                                        {
                                            text: "14、如何优雅优化你的 Vue3 项目",
                                            link: "/technology/vue3/juejin/14.md",
                                        },
                                        {
                                            text: "15、加餐1：前端框架发展之路",
                                            link: "/technology/vue3/juejin/15.md",
                                        },
                                        {
                                            text: "16、加餐2：前端框架的数据驱动",
                                            link: "/technology/vue3/juejin/16.md",
                                        },
                                        {
                                            text: "17、加餐3：虚拟DOM diff 算法解析",
                                            link: "/technology/vue3/juejin/17.md",
                                        }
                                    ],
                                },
                                {
                                    text: "Vue3 企业级项目实战",
                                    collapsed: true,
                                    items: [
                                        {
                                            text: "1. Vue3 简介及开发环境搭建",
                                            link: "/technology/vue3/juejin/project/01.md",
                                        },
                                        {
                                            text: "2. Vue3 组合 API 入口 Setup 浅析",
                                            link: "/technology/vue3/juejin/project/02.md",
                                        },
                                        {
                                            text: "3. Vue3 之响应式",
                                            link: "/technology/vue3/juejin/project/03.md",
                                        },
                                        {
                                            text: "4. Vue3 之生命周期钩子函数、依赖注入",
                                            link: "/technology/vue3/juejin/project/04.md",
                                        },
                                        {
                                            text: "5. Vue3 性能和业务层面上的提升",
                                            link: "/technology/vue3/juejin/project/05.md",
                                        },
                                        {
                                            text: "6. Vite2 构建项目及原理分析",
                                            link: "/technology/vue3/juejin/project/06.md",
                                        },
                                        {
                                            text: "7. Vue-Router4 新旧路由方法对比",
                                            link: "/technology/vue3/juejin/project/07.md",
                                        },
                                        {
                                            text: "8. 成为一名有独立开发能力的前端工程师",
                                            link: "/technology/vue3/juejin/project/08.md",
                                        },
                                        {
                                            text: "9. Vite2+Vue3+Element-Plus 搭建管理后台项目",
                                            link: "/technology/vue3/juejin/project/09.md",
                                        },
                                        {
                                            text: "10. Vue3 实战之管理后台左右栏目布局（Menu菜单组件）",
                                            link: "/technology/vue3/juejin/project/10.md",
                                        },
                                        {
                                            text: "11. Vue3 实战之登录鉴权（Form 表单组件）",
                                            link: "/technology/vue3/juejin/project/11.md",
                                        },
                                        {
                                            text: "12. Vue3 实战之首页大盘数据",
                                            link: "/technology/vue3/juejin/project/12.md",
                                        },
                                        {
                                            text: "13. Vue3 实战之首页配置",
                                            link: "/technology/vue3/juejin/project/13.md",
                                        },
                                        {
                                            text: "14. Vue3 实战之分类管理（多级公用 Table）",
                                            link: "/technology/vue3/juejin/project/14.md",
                                        }
                                    ],
                                },
                                {
                                    text: "Electron + vue3",
                                    link: "/technology/vue3/Electron/01.md"
                                },
                            ],
                        },
                        {
                            text: "前端工程化",
                            collapsed: true,
                            items: [
                                {
                                    text: "打包篇",
                                    collapsed: true,
                                    items: [
                                        {
                                            text: "第一章: Bundle 基础设施建设",
                                            collapsed: true,
                                            items: [
                                                {
                                                    text: "1. 模块化方案",
                                                    link: "/technology/engineering/build/01.md",
                                                },
                                                {
                                                    text: "2. AST 及其应用",
                                                    link: "/technology/engineering/build/02.md",
                                                },
                                                {
                                                    text: "3. 原理与运行时分析",
                                                    link: "/technology/engineering/build/03.md",
                                                },
                                                {
                                                    text: "4. 运行时 Chunk 分析",
                                                    link: "/technology/engineering/build/04.md",
                                                },
                                                {
                                                    text: "5. 加载非JS资源：JSON与图片",
                                                    link: "/technology/engineering/build/05.md",
                                                },
                                                {
                                                    text: "6. 加载非JS资源：Style",
                                                    link: "/technology/engineering/build/06.md",
                                                },
                                                {
                                                    text: "7. 将脚本注入 HTML 的处理",
                                                    link: "/technology/engineering/build/07.md",
                                                },
                                                {
                                                    text: "8. Hot Module Replacement",
                                                    link: "/technology/engineering/build/08.md",
                                                },
                                                {
                                                    text: "9. 构建性能优化",
                                                    link: "/technology/engineering/build/09.md",
                                                },
                                            ],
                                        },
                                        {
                                            text: "第二章: 打包体积优化",
                                            collapsed: true,
                                            items: [
                                                {
                                                    text: "10. 打包体积优化",
                                                    link: "/technology/engineering/build/10.md",
                                                },
                                                {
                                                    text: "11. JavaScript 压缩",
                                                    link: "/technology/engineering/build/11.md",
                                                },
                                                {
                                                    text: "12. Tree Shaking",
                                                    link: "/technology/engineering/build/12.md",
                                                },
                                                {
                                                    text: "13. Polyfill：core-js",
                                                    link: "/technology/engineering/build/13.md",
                                                },
                                                {
                                                    text: "14. browserslist 垫片体积控制",
                                                    link: "/technology/engineering/build/14.md",
                                                },
                                            ],
                                        },
                                        {
                                            text: "第三章: BundLess 基础设施建设",
                                            collapsed: true,
                                            items: [
                                                {
                                                    text: "15. 原理与浏览器中的 ESM",
                                                    link: "/technology/engineering/build/15.md",
                                                },
                                                {
                                                    text: "16. CommonJS To ESM",
                                                    link: "/technology/engineering/build/16.md",
                                                },
                                                {
                                                    text: "17. Bundless 与生产环境",
                                                    link: "/technology/engineering/build/17.md",
                                                },
                                            ],
                                        },
                                    ],
                                },
                                {
                                    text: "开发篇",
                                    collapsed: true,
                                    items: [
                                        {
                                            text: "第四章: npm package 开发",
                                            collapsed: true,
                                            items: [
                                                {
                                                    text: "18. semver 与版本管理",
                                                    link: "/technology/engineering/develop/18.md",
                                                },
                                                {
                                                    text: "19. main/module/exports 入口",
                                                    link: "/technology/engineering/develop/19.md",
                                                },
                                                {
                                                    text: "20. dep/devDep 的区别",
                                                    link: "/technology/engineering/develop/20.md",
                                                },
                                                {
                                                    text: "21. engines 宿主环境控制",
                                                    link: "/technology/engineering/develop/21.md",
                                                },
                                                {
                                                    text: "22. script hooks 及其风险",
                                                    link: "/technology/engineering/develop/22.md",
                                                },
                                                {
                                                    text: "23. npm publish 发布第一个包",
                                                    link: "/technology/engineering/develop/23.md",
                                                },
                                                {
                                                    text: "24. lockfile 及其影响",
                                                    link: "/technology/engineering/develop/24.md",
                                                },
                                                {
                                                    text: "25. package 中的 lockfile",
                                                    link: "/technology/engineering/develop/25.md",
                                                }
                                            ],
                                        },
                                        {
                                            text: "第五章: 包管理工具",
                                            collapsed: true,
                                            items: [
                                                {
                                                    text: "26. npm cache",
                                                    link: "/technology/engineering/develop/26.md",
                                                },
                                                {
                                                    text: "27. node_modules 拓扑结构",
                                                    link: "/technology/engineering/develop/27.md",
                                                },
                                                {
                                                    text: "28. pnpm 的优势",
                                                    link: "/technology/engineering/develop/28.md",
                                                },
                                            ],
                                        },
                                    ],
                                },
                                {
                                    text: "运维篇",
                                    collapsed: true,
                                    items: [
                                        {
                                            text: "第六章: 前端质量保障",
                                            collapsed: true,
                                            items: [
                                                {
                                                    text: "29. CI CD",
                                                    link: "/technology/engineering/operation/29.md",
                                                },
                                                {
                                                    text: "30. git hooks",
                                                    link: "/technology/engineering/operation/30.md",
                                                },
                                                {
                                                    text: "31. Audit",
                                                    link: "/technology/engineering/operation/31.md",
                                                },
                                                {
                                                    text: "32. Upgrade",
                                                    link: "/technology/engineering/operation/32.md",
                                                },
                                                {
                                                    text: "33. ESLint",
                                                    link: "/technology/engineering/operation/33.md",
                                                },
                                                {
                                                    text: "34. Package Patch",
                                                    link: "/technology/engineering/operation/34.md",
                                                }
                                            ],
                                        },
                                        {
                                            text: "第七章: 包管理工具",
                                            collapsed: true,
                                            items: [
                                                {
                                                    text: "35. Long Term Cache",
                                                    link: "/technology/engineering/operation/35.md",
                                                },
                                                {
                                                    text: "36. Chunk Spliting 与缓存优化",
                                                    link: "/technology/engineering/operation/36.md",
                                                },
                                                {
                                                    text: "37. Docker 部署",
                                                    link: "/technology/engineering/operation/37.md",
                                                },
                                                {
                                                    text: "38. Docker Preview 部署",
                                                    link: "/technology/engineering/operation/38.md",
                                                },
                                            ],
                                        },
                                    ],
                                },
                            ],
                        },
                        {
                            text: "Node.js",
                            collapsed: true,
                            items: [
                                {
                                    text: "内置模块",
                                    collapsed: true,
                                    items: [
                                        {
                                            text: "导读",
                                            link: "/technology/node/index.md",
                                        },
                                        {
                                            text: "1. 初识 Node.js",
                                            link: "/technology/node/01.md",
                                        },
                                        {
                                            text: "2. fs 文件系统模块",
                                            link: "/technology/node/02.md",
                                        },
                                        {
                                            text: "3. path 路径模块",
                                            link: "/technology/node/03.md",
                                        },
                                        {
                                            text: "4. http 模块",
                                            link: "/technology/node/04.md",
                                        },
                                    ],
                                },
                                {
                                    text: "模块化、包和express、中间件",
                                    collapsed: true,
                                    items: [
                                        {
                                            text: "模块化和包",
                                            link: "/technology/node/05.md",
                                        },
                                        {
                                            text: "express",
                                            link: "/technology/node/06.md",
                                        },
                                        {
                                            text: "数据库和身份认证",
                                            link: "/technology/node/07.md",
                                        },
                                    ],
                                },
                                {
                                    text: "Node.js-hm",
                                    collapsed: true,
                                    items: [
                                        {
                                            text: "Node.js 的应用场景",
                                            link: "/technology/node/08.md",
                                        },
                                        {
                                            text: "01. 事件循环：高性能到底是如何做到的？",
                                            link: "/technology/node/09.md",
                                        },
                                        {
                                            text: "02. 引用场景：Node.js 作为后台可以提供哪些服务？",
                                            link: "/technology/node/10.md",
                                        },
                                        {
                                            text: "03. 如何构建一个简单的 RESTful 服务？",
                                            link: "/technology/node/11.md",
                                        },
                                    ],
                                },
                            ],
                        },
                        {
                            text: "小程序",
                            collapsed: true, items: [
                                {
                                    text: "小程序-hm",
                                    collapsed: true,
                                    items: [
                                        {
                                            text: "1、项目结构",
                                            link: "/technology/miniProgram/01.md",
                                        },
                                        {
                                            text: "2、小程序起步",
                                            link: "/technology/miniProgram/02.md",
                                        },
                                        {
                                            text: "3、模版与配置",
                                            link: "/technology/miniProgram/03.md",
                                        },
                                        {
                                            text: "4、跳转、下拉刷新和上拉、声明周期",
                                            link: "/technology/miniProgram/04.md",
                                        },
                                        {
                                            text: "5、基础加强 - 组件",
                                            link: "/technology/miniProgram/05.md",
                                        },
                                        {
                                            text: "6、基础加强 - npm、全局数据共享、分包和自定义 tabBar",
                                            link: "/technology/miniProgram/06.md",
                                        },
                                    ],
                                },
                            ],
                        },
                        {
                            text: "HTTP",
                            collapsed: true,
                            items: [
                                {
                                    text: "HTTP-MK",
                                    collapsed: true,
                                    items: [
                                        {
                                            text: "1、课程导学",
                                            link: "/technology/http/mk/01.md",
                                        },
                                        {
                                            text: "2、HTTP协议基础及发展历史",
                                            link: "/technology/http/mk/02.md",
                                        },
                                        {
                                            text: "3、HTTP 各种特性总览",
                                            link: "/technology/http/mk/03.md",
                                        },
                                        {
                                            text: "4、Nginx 代理以及面向未来的 HTTP",
                                            link: "/technology/http/mk/04.md",
                                        }
                                    ],
                                },
                            ],
                        },
                        {
                            text: "React",
                            collapsed: true,
                            items: [
                                {
                                    text: "学习 React",
                                    collapsed: true,
                                    items: [{
                                        text: "React 知识点",
                                        link: "/technology/React/docs/basic.md"
                                    }],
                                },
                                {
                                    text: "掘金",
                                    collapsed: true,
                                    items: [
                                        {
                                            text: "React 实战：设计模式和最佳实践",
                                            collapsed: true,
                                            items: [{
                                                text: "设计模式和最佳实践",
                                                link: "/technology/React/juejin/design/docs.md"
                                            }],
                                        },
                                    ],
                                },
                            ],
                        },
                        {
                            text: "打包工具",
                            collapsed: true,
                            items: [
                                {
                                    text: "Vite",
                                    collapsed: true,
                                    items: [{
                                        text: "Vite 快速入门",
                                        link: "/technology/build/vite/01.md"
                                    }],
                                },
                            ],
                        },
                    ]
                },
            ],
            "/interview/": [
                {
                    text: "面试专栏",
                    items: [
                        {
                            text: "目录",
                            link: "/interview/",
                        },
                        {
                            text: "性能优化",
                            collapsed: true,
                            items: [
                                {
                                    text: "1、prefetch 与 preload 的区别是什么？",
                                    link: "/interview/Performance/01.md",
                                },
                                {
                                    text: "2、实现一个 once 函数，记忆返回结果只执行一次",
                                    link: "/interview/Performance/02.md",
                                },
                                {
                                    text: "3、如何压缩前端项目中 JS 的体积",
                                    link: "/interview/Performance/03.md",
                                },
                                {
                                    text: "4、如何优化 React 项目的性能",
                                    link: "/interview/Performance/04.md",
                                },
                                {
                                    text: "5、如何提高首屏渲染时间？",
                                    link: "/interview/Performance/05.md",
                                },
                                {
                                    text: "6、网站性能优化中，如何对小图片进行优化",
                                    link: "/interview/Performance/06.md",
                                }
                            ],
                        },
                        {
                            text: "HTML",
                            link: "/interview/html/",
                        },
                        {
                            text: "CSS",
                            link: "/interview/css/",
                        },
                        {
                            text: "JavaScript",
                            link: "/interview/javaScript/",
                        },
                        {
                            text: "Vue",
                            link: "/interview/vue/",
                        },
                        {
                            text: "Web",
                            link: "/interview/httpAndBrowser/",
                        },
                        {
                            text: "掘金小册",
                            collapsed: true,
                            items: [
                                {
                                    text: "Web 前端面试指南与高频考题解析",
                                    collapsed: true,
                                    items: [
                                        {
                                            text: "1、准备：简历编写和面试前准备",
                                            link: "/interview/juejin/first/01.md",
                                        },
                                        {
                                            text: "2、一面 1：ES 基础知识点与高频考题解析",
                                            link: "/interview/juejin/first/02.md",
                                        },
                                        {
                                            text: "3、一面 2：JS-Web-API 知识点与高频考题解析",
                                            link: "/interview/juejin/first/03.md",
                                        },
                                        {
                                            text: "4、一面 3：CSS-HTML 知识点与高频考题解析",
                                            link: "/interview/juejin/first/04.md",
                                        },
                                        {
                                            text: "5、一面 4：从容应对算法题目",
                                            link: "/interview/juejin/first/05.md",
                                        },
                                        {
                                            text: "6、一面5：浏览器相关知识点与高频考题解析",
                                            link: "/interview/juejin/first/06.md",
                                        },
                                        {
                                            text: "7、一面 6：开发环境相关知识点与高频考题解析",
                                            link: "/interview/juejin/first/07.md",
                                        },
                                        {
                                            text: "8、二面 1：如何回答常见的软技能问题",
                                            link: "/interview/juejin/first/08.md",
                                        },
                                        {
                                            text: "9、二面 2：如何介绍项目及应对项目细节追问",
                                            link: "/interview/juejin/first/09.md",
                                        },
                                        {
                                            text: "10、HR 面：谈钱不伤感情",
                                            link: "/interview/juejin/first/10.md",
                                        },
                                        {
                                            text: "11、其他：面试注意事项",
                                            link: "/interview/juejin/first/11.md",
                                        },
                                        {
                                            text: "12、总结与补充说明",
                                            link: "/interview/juejin/first/12.md",
                                        }
                                    ],
                                },
                                {
                                    text: "前端面试之道",
                                    collapsed: true,
                                    items: [
                                        {
                                            text: "1、JS 基础知识点及常考面试题（一）",
                                            link: "/interview/juejin/path/01.md",
                                        },
                                        {
                                            text: "2、JS 基础知识点及常考面试题（二）",
                                            link: "/interview/juejin/path/02.md",
                                        },
                                        {
                                            text: "3、ES6 知识点及常考面试题",
                                            link: "/interview/juejin/path/03.md",
                                        },
                                        {
                                            text: "4、JS 异步编程及常考面试题",
                                            link: "/interview/juejin/path/04.md",
                                        }
                                    ],
                                },
                            ],
                        },
                        {
                            text: "公司真实面试题",
                            collapsed: true,
                            items: [
                                {
                                    text: "Vue 源码",
                                    link: "/interview/company/vue/source.md",
                                },
                                {
                                    text: "1、221025面试题",
                                    link: "/interview/company/01.md",
                                },
                                {
                                    text: "2、阿里前端p7面试题",
                                    link: "/interview/company/02.md",
                                },
                                {
                                    text: "3、阿里某部门",
                                    link: "/interview/company/03.md",
                                },
                                {
                                    text: "4、前端共学群中的公司面试题",
                                    link: "/interview/company/04.md",
                                }
                            ],
                        },
                    ]
                }
            ],
            "/myArticle/": [
                {
                    text: "我的文章",
                    items: [
                        {
                            text: "MarkDown语法",
                            link: "/myArticle/markdown",
                        },
                        {
                            text: "前端调试通关秘籍",
                            link: "/myArticle/dev",
                        },
                        {
                            text: "Chrome DevTools",
                            link: "/myArticle/DevTools",
                        },
                        {
                            text: "Git",
                            collapsed: false,
                            items: [
                                {
                                    text: "Git 命令行",
                                    link: "/myArticle/git/operate.md",
                                },
                                {
                                    text: "Commit 规范",
                                    link: "/myArticle/git/normalize.md",
                                },
                                {
                                    text: "GitHub",
                                    link: "/myArticle/git/github.md",
                                },
                                {
                                    text: "Git 中的 Dependabot",
                                    link: "/myArticle/git/dependabot.md",
                                }
                            ],
                        },
                        {
                            text: "Web Worker",
                            link: "/myArticle/webworker",
                        },
                        {
                            text: "项目",
                            collapsed: true,
                            items: [
                                {
                                    text: "1、pnpm + vue3.0 + vite + pinia + vueuse 搭建前端项目",
                                    link: "/myArticle/project/vue3.md",
                                },
                                {
                                    text: "2、vue项目中的一些核心技能",
                                    link: "/myArticle/project/core.md",
                                },
                                {
                                    text: "3、patch-package 为 element-ui date-picker 组建修复 bug",
                                    link: "/myArticle/project/patch-package.md",
                                },
                                {
                                    text: "4、统一规范团队包管理器：only-allow",
                                    link: "/myArticle/project/patch-package.md",
                                }
                            ],
                        },
                        {
                            text: "技术文章",
                            collapsed: true,
                            items: [
                                {
                                    text: "使用 Rollup 编写一个可以在任何环境使用的 JavaScript 库",
                                    link: "/myArticle/build/rollup_library.md"
                                }
                            ],
                        },
                        {
                            text: "樊登读书",
                            collapsed: true,
                            items: [{
                                text: "跨越不可能",
                                link: "/myArticle/fandeng/01.md"
                            }],
                        },
                        {
                            text: "掘金成长",
                            collapsed: true,
                            items: [
                                {
                                    text: "优秀的前端团队是如何炼成的",
                                    collapsed: true,
                                    items: [
                                        {
                                            text: "1、职业思考：如何选择创业公司与成长型前端团队",
                                            link: "/myArticle/growUp/core/01.md"
                                        }
                                    ],
                                },
                            ],
                        },
                    ]
                }
            ]
        }
    },
};
