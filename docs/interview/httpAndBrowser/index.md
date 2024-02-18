---
title: http、浏览器对象
lang: 'zh-CN'
---

## 1、HTTPS 握手过程中，客户端如何验证证书的合法性

权威的证书颁发机构CA来解决；https主要的思想是在http基础上增加了ssl安全层。

## 2、TCP 三次握手和四次挥手

三次握手之所以是三次是保证 client 和 server 均让对方知道自己的**接收**和**发送**能力没问题而保证的最小次数。

1. 第一次 client => server 只能 server 判断出 client 具备发送能力
2. 第二次 server => client client 就可以判断出 server 具备发送和接受能力。此时 client 还需让 server 知道自己接收能力没问题于是就有了第三次
3. 第三次 client => server 双方均保证了自己的接收和发送能力没有问题

其中，为了保证后续的握手是为了应答上一个握手，每次握手都会带一个标识 `seq`，后续的 `ACK` 都会对这个 `seq` 进行加一来进行确认。

## 3、img iframe script 来发送跨域请求有什么优缺点？

### iframe

优点：跨域完毕之后 DOM 操作和互相之间的 JS 调式都是没问题的

缺点：1.若结果要以URL参数传递，这就意味着在结果**数据量很大**的时候需要分割传递，巨烦。 2. 还有一个是iframe本身带来的，母页面和iframe本身的交互本身就有**安全性限制**。

### script

优点：可以直接返回 json 格式的数据，方便处理

缺点：只接受 GET 请求方式

### 图片 ping

优点：可以访问任何 url，一般用来进行点击追踪，做页面分析常用的方法

缺点：不能访问响应文本，只能监听是否响应

## 4、http 和 https的区别？

http 传输的数据都是未加密的，也就是明文的，网景公司设置了 SSL 协议来对 http 协议传输的数据进行加密处理，简单来说 https 协议是由 http 和 ssl 协议构建的可进行**加密传输**和**身份认证**的网络协议，比 http 协议的安全性更高。主要的区别如下：

- Https 协议需要 ca 证书，费用较高。
- http 是**超文本**传输协议，信息是明文传输，https 则是具有安全性的 **ssl 加密**传输协议。
- 使用不同的链接方式，端口也不同，一般而言，http 协议的端口为 **80**，https 的端口为 **443**
- http的连接很简单，是**无状态**的；HTTPS协议是由 SSL+HTTP 协议构建的可进行**加密传输**、**身份认证**的网络协议，比http协议安全。

## 5、什么是 Bom？有哪些常用的 Bom 属性？

Bom 是浏览器对象（Browser Object model）

### location 对象

- location.href-- 返回或设置当前文档的 URL
- location.search -- 返回 URL 中的查询字符串部分。例如 http://www.dreamdu.com/dreamd... 返回包括(?)后面的内容?id=5&name=dreamdu
- location.hash -- 返回 URL # 后面的内容，如果没有 #，返回空 location.host -- 返回URL中的域名部分，例如www.dreamdu.com
- location.hostname -- 返回 URL 中的主域名部分，例如 dreamdu.com
- location.pathname -- 返回 URL 的域名后的部分。例如 http://www.dreamdu.com/xhtml/ 返回/xhtml/
- location.port -- 返回 URL 中的端口部分。例如 http://www.dreamdu.com:8080/xhtml/ 返回8080
- location.protocol -- 返回 URL 中的协议部分。例如 http://www.dreamdu.com:8080/xhtml/ 返回(//)前面的内容 http:
- location.assign -- 设置当前文档的 URL
- location.replace() -- 设置当前文档的 URL，并且在 history 对象的地址列表中移除这个URL location.replace(url);
- location.reload() -- 重载当前页面

### history 对象

- history.go() -- 前进或后退指定的页面数
- history.go(num); history.back() -- 后退一页
- history.forward() -- 前进一页

### Navigator 对象

- navigator.userAgent -- 返回用户代理头的字符串表示(就是包括浏览器版本信息等的字符串)
- navigator.cookieEnabled -- 返回浏览器是否支持(启用)cookie

## 6、Cookie、sessionStorage、localStorage 的区别？

共同点：都是保存在浏览器端，并且是同源的

- cookie 数据始终在同源的 http **请求中携带**（即使不需要），即 cookie 在浏览器和服务器间**来回传递**。而 sessionStorage 和 localStorage 不会自动把数据发给服务器，仅在本地保存。cookie 数据还有路径（path）的概念，可以限制 cookie 只属于某个路径下,存储的大小很小只有 **4K** 左右。
- sessionStorage：仅在当前浏览器**窗口关闭前有效**，自然也就不可能持久保持，localStorage：始终有效，窗口或浏览器关闭也一直保存，因此用作持久数据；cookie只在设置的cookie过期时间之前一直有效，即使窗口或浏览器关闭。
- localStorage：localStorage 在所有同源窗口中都是共享的；cookie也是在所有同源窗口中都是共享的。

补充说明一下cookie的作用：

- 保存用户登录状态。
- 跟踪用户行为。
- 定制页面。

## 7、Cookie如何防范XSS攻击

XSS（跨站脚本攻击）是指攻击者在返回的 HTML 中嵌入 javascript 脚本，为了减轻这些攻击，需要在 HTTP 头部配上，set-cookie：

- httponly - 这个属性可以防止XSS,它会禁止 javascript 脚本来访问 cookie。
- secure - 这个属性告诉浏览器仅在请求为 https 的时候发送 cookie。

结果应该是这样的：Set-Cookie=.....

## 8、浏览器和 Node 事件循环的区别？

其中一个主要的区别在于浏览器的 event loop 和 nodejs 的 event loop 在**处理异步事件的顺序**是不同的, nodejs 中有 micro event;其中Promise属于micro event 该异步事件的处理顺序就和浏览器不同.nodejs V11.0以上 这两者之间的顺序就相同了。

在node11以下版本的执行结果(先执行所有的宏任务，再执行微任务)；node11及浏览器的执行结果(顺序执行宏任务和微任务)。

## 9、简述 HTTPS 中间人攻击

https协议由 http + ssl 协议构成，具体的链接过程可参考SSL或TLS握手的概述

中间人攻击过程如下：

1. 服务器向客户端发送公钥。
2. 攻击者截获公钥，保留在自己手上。
3. 然后攻击者自己生成一个【伪造的】公钥，发给客户端。
4. 客户端收到伪造的公钥后，生成加密 hash 值发给服务器。
5. 攻击者获得加密hash值，用自己的私钥解密获得真秘钥。
6. 同时生成假的加密hash值，发给服务器。
7. 服务器用私钥解密获得假秘钥。
8. 服务器用加秘钥加密传输信息

防范方法：

服务端在发送浏览器的公钥中加入**CA证书**，浏览器可以验证CA证书的有效性。

## 10、说几条web前端优化策略

1. 减少HTTP请求数
2. 从设计实现层面简化页面
3. 合理设置HTTP缓存
4. 资源合并与压缩
5. CSS Sprites
6. Inline Images
7. Lazy Load Images

## 11、你了解的浏览器的重绘和回流导致的性能问题

- 重绘是当节点需要更改外观而不会影响布局的，比如改变 color就叫称为重绘
- 回流是布局或者几何属性需要改变就称为回流。

回流必定会发生重绘，重绘不一定会引发回流。回流所需的成本比重绘高的多，改变深层次的节点很可能导致父节点的一系列回流。

所以以下几个动作可能会导致性能问题：

- 改变 window 大小
- 改变字体
- 添加或删除样式
- 文字改变
- 定位或者浮动
- 盒模型

很多人不知道的是，重绘和回流其实和 Event loop 有关。

1. 当 Event loop 执行完 Microtasks 后，会判断 document 是否需要更新。因为浏览器是 60Hz 的刷新率，每 16ms 才会更新一次。
2. 然后判断是否有 resize或者 scroll，有的话会去触发事件，所以 resize和 scroll事件也是至少 16ms 才会触发一次，并且自带节流功能。
3. 判断是否触发了 media query
4. 更新动画并且发送事件
5. 判断是否有全屏操作事件
6. 执行 requestAnimationFrame 回调
7. 执行 IntersectionObserver 回调，该方法用于判断元素是否可见，可以用于懒加载上，但是兼容性不好
8. 更新界面
9. 以上就是一帧中可能会做的事情。如果在一帧中有空闲时间，就会去执行 requestIdleCallback回调。

### 减少重绘和回流

- 使用 translate 替代 top
- 使用 visibility替换 display: none，因为前者只会引起重绘，后者会引发回流（改变了布局）
- 不要使用 table 布局，可能很小的一个小改动会造成整个 table 的重新布局
- 动画实现的速度的选择，动画速度越快，回流次数越多，也可以选择使用 requestAnimationFrame
- CSS 选择符从右往左匹配查找，避免 DOM 深度过深
- 将频繁运行的动画变为图层，图层能够阻止该节点回流影响别的元素。比如对于 video标签，浏览器会自动将该节点变为图层。
