---
title: 设计模式和最佳实践
lang: zh-cn
---

## 一、React 的基本思想

1. 在 React 中，界面完全由**数据驱动**；

2. 在 React 中，**一切都是组件**；
3. **props** 是 React 组件之间通讯的基本方式。

## 二、组件实践

### 1、如何定义清晰可维护的接口

#### 设计原则

减少组件之间的耦合性。

- 保持接口小，**props 数量要少**；
- 根据**数据边界来划分组件**，充分利用组合（composition）；
- **把 state 往上层组件提取，让下层组件只需要实现为纯函数。**

一些最佳实践：

1. 避免 renderXXXX 函数。是把这些 renderXXXX 重构成各自独立的 React 组件。
2. 给回调函数类型的 props 加统一前缀（on或handle）
3. 使用 propTypes 来定义组件的 props

```go
const ControlButtons = (props) => {
  //TODO: 返回两个按钮的JSX
};

ControlButtons.propTypes = {
  activated: PropTypes.bool,
  onStart: PropTypes.func.isRquired,
  onPause: PropTypes.func.isRquired,
  onSplit: PropTypes.func.isRquired,
  onReset: PropTypes.func.isRquired,
};
```

### 2、组件的内部实现

1. 功能正常；
2. 代码整洁；
3. 高性能。

#### 初始化应用框架

全局安装：`npm install -g create-react-app`

创建应用：`create-react-app demo --use-npm` 如果你更喜欢 yarn，不使用 `--use-npm` 这个参数就可以了。

文件用 `export default` 的方式导出单个组件。第一行导入 React，虽然目前没有派上什么用场，但是任何 JSX 都需要 React，很快我们在实现控件的内容时，就要写 JSX，所以**导入 React 是必需的**。

在 JSX 中应用的函数 props 应该尽量使用类成员函数，**不要用内联函数**。

#### 小结

1. 尽量每个组件都有自己专属的源代码文件；
2. 用**解构赋值**的方法获取参数 props 的每个属性值；
3. 利用属性初始化来定义 state 和成员函数（this.setState）。

### 3、组件化样式

在 React 中，当你要修改一个功能的内容和行为时，在一个文件中就能完成，这样就达到了高内聚的要求。

#### style 属性

把它（style对象）提取到组件之外，这样就可以重用一个对象。

```javascript
const clockStyle = {
  'font-family': 'monospace'
};

const MajorClock = ({milliseconds=0}) => {
  return <h1 style={clockStyle}>{ms2Time(milliseconds)}</h1>
}
```

#### 导入 CSS 文件

用 className 来指定元素的类名。导入一个同目录下的 ControlButtons.css 文件：`import './ControlButtons.css'`

create-react-app 会用 webpack 完成打包过程，只要 JavaScript 文件中应用的资源，都会被打包进最终的文件，所以，ControlButtons.css 中的样式规则就会被应用。

#### 组件式样式

Component Style - 组件化的样式。`styled-jsx`

`npm install react-app-rewired styled-jsx`

```javascript
  render() {
    return (
      <Fragment>
        <style jsx>{`
          h1 {
            color: green;
          }
        `}</style>
        <h1>秒表</h1>
        <MajorClock
          milliseconds={this.state.currentTime - this.state.startTime}
          activated={this.state.isStarted}
        />
   ...
```

可以把 CSS 的作用域限定在一个组件之内，达到了高内聚的要求。

#### 动态 styled jsx

```javascript
const MajorClock = ({milliseconds=0, activated=false}) => {
  return (
    <React.Fragment>
      <style jsx>{`
        h1 {
          color: ${activated? 'red' : 'black'};
          font-family: monospace;
        }
      `}</style>
      <h1>
        {ms2Time(milliseconds)}
      </h1>
    </React.Fragment>
  );
};
```

#### 小结

1. React 将内容、样式和动态功能聚集在一个模块中，是高聚合的表现；
2. React 原生 style 属性的用法；
3. 组件化样式 styled jsx 的用法。

## 三、组件设计模式

### 1、聪明组件和傻瓜组件

把一个功能分配到两个组件中，形成父子关系，外层的**父组件负责管理数据状态，内层的子组件只负责展示**。

#### 为什么要分割聪明组件和傻瓜组件

软件设计中有一个原则，叫做“责任分离”（Separation of Responsibility）,简单说就是让一个模块的责任尽量少，如果发现一个模块功能过多，就应该拆分为多个模块，让一个模块都专注于一个功能，这样有利于代码的维护。

使用 React 来做界面，无外乎就是获得驱动界面的数据，然后利用这些数据来渲染界面。当然，你可以在一个组件中就搞定，但是，最好把获取和管理数据这件事和界面渲染这件事分开。做法就是，把获取和管理数据的逻辑放在父组件，也就是聪明组件；把渲染界面的逻辑放在子组件，也就是傻瓜组件。

这么做的好处，是可以灵活地修改数据状态管理方式，比如，最初你可能用 Redux 来管理数据，然后你想要修改为用 Mobx，如果按照这种模式分割组件，那么，你需要改的只有聪明组件，傻瓜组件可以保持原状。

#### PureComponent

**因为傻瓜组件一般没有自己的状态，利用 PureComponent 来提高傻瓜组件的性能。**

```scala
class Joke extends React.PureComponent {
  render() {
    return (
      <div>
        <img src={SmileFace} />
        {this.props.value || "loading..."}
      </div>
    )
  }
}
```

值得一提的是，`PureComponent` 中 `shouldComponentUpdate` 对 props 做得只是浅层比较，不是深层比较，如果 props 是一个深层对象，就容易产生问题。

比如，**两次渲染传入的某个 props 都是同一个对象，但是对象中某个属性的值不同，这在 PureComponent 眼里，props 没有变化，不会重新渲染**，但是这明显不是我们想要的结果。

#### React.memo

虽然 PureComponent 可以提高组件渲染性能，但是它也不是没有代价的，它逼迫我们必须把组件实现为 class，不能用纯函数来实现组件。

如果你使用 React v16.6.0 之后的版本，可以使用一个新功能 React.memo 来完美实现 React 组件，上面的 Joke 组件可以这么写：

```js
const Joke = React.memo(() => {
  <div>
    <img src={SmileFace}/>
    {this.props.value || 'loading...'}
  </div>
})
```

React.memo 既利用了 shouldComponentUpdate，又不要求我们写一个 class，这也体现出 React 逐步向完全函数式编程前进。

2022年，React16.8后出现了 `useMemo` 可替代上面所说的 React.memo，用于缓存React函数组件。

### 2、高阶组件 HoC

#### 高阶组件的基本形式

```js
const withDoNothing = (Component) => {
  const NewComponent = (props) => {
    return <Component {...props} />;
  };
  return NewComponent;
};
```

上面的函数 `withDoNothing` 就是一个高阶组件，**作为一项业界通用的代码规范**，高阶组件的命名一般都带 `with` 前缀，命名中后面的部分代表这个高阶组件的功能。

就如同 withDoNothing 这个名字所说的一样，这个高阶组件什么都没做，但是从中可以看出高阶组件的基本代码套路。

1. 高阶组件不能去修改作为参数的组件，高阶组件必须是一个纯函数，不应该有任何副作用。
2. 高阶组件返回的结果必须是一个新的 React 组件，这个新的组件的 JSX 部分肯定会包含作为参数的组件。
3. 高阶组件一般需要把传给自己的 props 转手传递给作为参数的组件。

#### 用高阶组件抽取共同逻辑

接下来，我们对 withDoNothing 进行一些改进，让它实现“只有在登录时才显示”这个功能。

假设我们已经有一个函数 getUserId 能够从 cookies 中读取登录用户的 ID，如果用户未登录，这个 getUserId 就返回空，那么“退出登录按钮“就需要这么写：

```kotlin
const LogoutButton = () => {
  if(getUserId()){
    return ...; // 显示“退出登录”的JSX
  } else {
    return null;
  }
}
```

同样，购物车的代码就是这样。上面两个组件明显有重复的代码，我们可以把重复代码抽取出来，形成 `withLogin` 这个高阶组件，代码如下：

```js
const withLogin = (Component) => {
  const NewComponent = (props) => {
    if(getUserId()) {
      return <Component {...props} />;
    } else {
      return null;
    }
  }
}

return NewComponent;
```

如此一来，我们就只需要这样定义 LogoutButton 和 ShoppintCart：

```js
const LogoutButton = withLogin((props) => {
  return ...; // 显示”退出登录“的JSX
});

const ShoppingCart = withLogin(() => {
  return ...; // 显示”购物车“的JSX
});
```

你看，我们避免了重复代码，以后如果要修改对用户是否登录的判断逻辑，也只需要修改 withLogin，而不用修改每个 React 组件。

#### 高阶组件的高级用法

高阶组件只需要返回一个 React 组件即可，没人规定高阶组件只能接受一个 React 组件作为参数，完全可以**传入多个 React 组件给高阶组件**。

比如，我们可以改进上面的 withLogin，让它接受两个 React 组件，根据用户是否登录选择渲染合适的组件。

```js
const withLoginAndLogout = (ComponentForLogin, ComponentForLogout) => {
  const NewComponent = (props) => {
    if(getUserId()){
      return <ComponentForLogin {...props} />;
    } else {
      return <ComponentForLogout {...props} />;
    }
  }
  return NewComponent;
}
```

有了上面的 withLoginAndLogout，就可以产生根据用户登录状态显示不同的内容。

#### 链式调用高阶组件

假设，你有三个高阶组件分别是 `withOne`、`withTwo` 和 `withThree`，那么，如果要赋予一个组件 X 某个高阶组件的超能力，那么，你要做的就是挨个使用高阶组件包装，代码如下：

```ini
const X1 = withOne(X);
const X2 = withTwo(X1);
const X3 = withThree(X2);
const SuperX = X3; // 最终的 SuperX 具备三个高阶组件的能力
```

很自然，我们可以避免使用中间变量 X1 和 X2，直接连续调用高阶函数，如下：`const SuperX = withThree(withTwo(withOne(X)));`

对于 `X` 而言，它被高阶组件包装了，至于被一个高阶组件包装，还是被 `N` 个高阶组件包装，没有什么差别。而高阶组件本身就是一个纯函数，纯函数是可以组合使用的，所以，我们其实可以把多个高阶组件组合为一个高阶组件，然后用这一个高阶组件去包装 `X`，代码如下：

```ini
const hoc = compose(withThree, withTwo, withOne);
const SuperX = hoc(X);
```

在上面代码中使用的 compose，是函数式编程中很基础的一种方法，作用就是把多个函数组合为一个函数，在很多开源的代码库中都可以看到，下面是一个参考实现：

```js
export default function compose(...funcs) {
  if(funcs.length === 0) {
    return arg => arg;
  }

  if(funcs.length === 1) {
    return funcs[0];
  }

  return funcs.reduce((a, b) => (...args) => a(b(...args)));
}
```

React 组件可以当做积木一样组合使用，现在有了 compose，我们就可以把高阶组件也当做积木一样组合，进一步重用代码。

#### 不要滥用高阶组件

首先，高阶组件不得不处理 `displayName`，不然 debug 会很痛苦。当 React 渲染出错的时候，靠组件的 displayName 静态属性来判断出错的组件类，而高阶组件总是创造一个新的 React 组件类，所以，每个高阶组件都需要处理一下 displayName。

如果要做一个最简单的什么增强功能都没有的高阶组件，也必须要写下面这样的代码：

```ini
const withExample = (Component) => {
  const NewComponent = (props) => {
    return <Component {...props} />;
  }

  NewComponent.displayName = `withExample(${Component.displayName || Component.name || 'Component'})`;

  return NewCompoennt;
};
```

每个高阶组件都这么写，就会非常的麻烦。

对于 React 生命周期函数，高阶组件不用怎么特殊处理，但是，如果内层组件包含定制的静态函数，这些静态函数的调用在 React 生命周期之外，那么高阶组件就必须要在新产生的组件中增加这些静态函数的支持，这更加麻烦。

其次，高阶组件支持嵌套调用，这是它的优势。但是如果真的一大长串高阶组件被应用的话，当组件出错，你看到的会是一个超深的 stack trace，十分痛苦。

最后，使用高阶组件，一定要非常小心，要避免重复产生 React 组件，比如，下面的代码是有问题的：

```ini
const Example = () => {
  const EnhancedFoo = withExample(Foo);
  return <EnhancedFoo />
}
```

像上面这样写，每一次渲染 Example，都会用高阶组件产生一个新的组件，虽然都叫做 `EnhancedFoo`，但是对 React 来说是一个全新的东西，在重新渲染的时候不会重用之前的虚拟 DOM，会造成极大的浪费。

正确的写法是下面这样，自始至终只有一个 EnhancedFoo 组件类被创建：

```ini
const EnhancedFoo = withExample(Foo);

const Example = () => {
  return <EnhancedFoo />
}
```

总之，高阶组件是重用代码的一种方式，但并不是唯一方式，在下一小节，我们会介绍一种更加精妙的方式。

#### 小结

在这一小节中，我们介绍了高阶组件（HoC）这种重用逻辑的模式，读者应该能够学会：

1. 高阶组件的形式；
2. 高阶组件的链式调用方法；
3. 高阶组件的不足。

### 3、render props 模式

#### render props

因为作为 props 传入的函数往往被用来渲染一部分界面，所以这种模式被称为 render props。

```js
const RenderAll = (props) => {
  return (
    <React.Fragment>
      {props.children(props)}
    </React.Fragment>
  )
}
```

#### 传递 props

```js
const Login = (props) => {
  const userName = getUserName();

  if(userName) {
    const allProps = { userName, ...props };
    return (
      <React.Fragment>
        {props.children(props)}
      </React.Fragment>
    )
  } else {
    return null;
  }
}
```

```js
<Login>
  {({userName}) => <h1>Hello {userName}</h1>}
</Login>
```

#### 不限于 children

我们来扩展 Login，不光在用户登录时显示一些东西，也可以定制用户没有登录时显示的东西，我们把这个组件叫做 `Auth`，对应代码如下：

```js
const Auth= (props) => {
  const userName = getUserName();

  if (userName) {
    const allProps = {userName, ...props};
    return (
      <React.Fragment>
        {props.login(allProps)}
      </React.Fragment>
    );
  } else {
    <React.Fragment>
      {props.nologin(props)}
    </React.Fragment>
  }
};
```

使用 Auth 的话，可以分别通过 `login` 和 `nologin` 两个 props 来指定用户登录或者没登录时显示什么，用法如下：

```js
<Auth
  login={({userName}) => <h1>Hello {userName}</h1>}
  nologin={() => <h1>Please login</h1>}
/>
```

#### 依赖注入

render props 其实就是 React 世界中的“依赖注入”（Dependency Injection)。

### 4、提供者模式 Provider Pattern

![Provider](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2018/9/30/16627df7e8c08232~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.awebp)

在上图中，组件 A 需要传递信息给组件 X，如果通过 props 的话，那么从顶部的组件 A 开始，要把 props 传递给组件 B，然后组件 B 传递给组件 D，最后组件 D 再传递给组件 X。

可见，对于跨级的信息传递，我们需要一个更好的方法。在 React 中，解决这个问题应用的就是 **“提供者模式”**。

#### 提供者模式

虽然这个模式叫做“提供者模式”，但是其实有两个角色，一个叫“提供者”（Provider），另一个叫“消费者”（Consumer），这两个角色都是 React 组件。其中“提供者”在组件树上居于比较靠上的位置，“消费者”处于靠下的位置。在上面的组件树中，组件 A 可以作为提供者，组件 X 就是消费者。

既然名为“提供者”，它可以提供一些信息，而且这些信息在它之下的所有组件，无论隔了多少层，都可以直接访问到，而不需要通过 props 层层传递。

避免 props 逐级传递，即是提供者的用途。

#### 如何实现提供者模式

提供者模式的一个典型用例就是实现“样式主题”（Theme），由顶层的提供者确定一个主题，下面的样式就可以直接使用对应主题里的样式。这样，当需要切换样式时，只需要修改提供者就行，其他组件不用修改。

React v16.3.0 之前的提供者模式，要实现一个 React 组件，不过这个组件要做两个特殊处理。

1. 需要实现 `getChildContext()` 方法，用于返回 “上下文” 的数据；
2. 需要定义 `childContextTypes` 属性，声明 “上下文” 的结构。

下面就是一个实现“提供者”的例子，组件名为 ThemeProvider：

```scala
class ThemeProvider extends React.Component {
  getChildContext() {
    return {
      theme: this.props.value
    };
  }

  render() {
    return (
      <React.Fragment>
        {this.props.children}
      </React.Fragment>
    );
  }
}

ThemeProvider.childContextTypes = {
  theme: PropTypes.object
};
```

我们把 Subject 实现为一个类用来消费，代码如下：

```scala
class Subject extends React.Component {
  render() {
    const {mainColor} = this.context.theme;
    return (
      <h1 style={{color: mainColor}}>
        {this.props.children}
      </h1>
    );
  }
}

Subject.contextTypes = {
  theme: PropTypes.object
}
```

在 Subject 的 `render` 函数中，可以通过 `this.context` 访问到“上下文”数据，因为 ThemeProvider 提供的“上下文”包含 `theme` 字段，所以可以直接访问 `this.context.theme`。

千万不要忘了 Subject 必须增加 `contextTypes` 属性，必须和 ThemeProvider 的 `childContextTypes` 属性一致，不然，`this.context` 就不会得到任何值。

用纯函数的方式实现另一个消费者 Paragraph，代码如下：

```ini
const Paragraph = (props, context) => {
  const {textColor} = context.theme;
  return (
    <p style={{color: textColor}}>
      {props.children}
    </p>
  );
};

Paragraph.contextTypes = {
  theme: PropTypes.object
};
```

从上面的代码可以看到，因为 Paragraph 是一个函数形式，所以不可能访问 `this.context`，但是函数的第二个参数其实就是 `context`。

当然，也不要忘了设定 Paragraph 的 `contextTypes`，不然参数 `context` 也不会是上下文。

React v16.3.0 之后的提供者模式

首先，要用新提供的 `createContext` 函数创造一个“上下文”对象。

```ini
const ThemeContext = React.createContext();
```

这个“上下文”对象 `ThemeContext` 有两个属性，分别就是——对，你没猜错——`Provider` 和 `Consumer`。

```ini
const ThemeProvider = ThemeContext.Provider;
const ThemeConsumer = ThemeContext.Consumer;
```

使用“消费者”也同样简单，而且应用了上一节我们介绍的 render props 模式，比如，Subject 的代码如下:

```scala
class Subject extends React.Component {
  render() {
    return (
      <ThemeConsumer>
        {
          (theme) => (
            <h1 style={{color: theme.mainColor}}>
              {this.props.children}
            </h1>
          )
        }
      </ThemeConsumer>
    );
  }
}
```

上面的 `ThemeConsumer` 其实就是一个应用了 render props 模式的组件，它要求子组件是一个函数，会把“上下文”的数据作为参数传递给这个函数，而这个函数里就可以通过参数访问“上下文”对象。

实现 Page 的方式并没有变化，而应用 ThemeProvider 的代码和之前也完全一样:

```ini
  <ThemeProvider value={{mainColor: 'green', textColor: 'red'}} >
    <Page />
  </ThemeProvider>
```

### 5、组合组件

所谓模式，就是特定于一种问题场景的解决办法。

```scss
模式(Pattern) = 问题场景(Context) + 解决办法(Solution)
```

Tabs 和 TabItem 不通过表面的 props 传递也能心有灵犀，二者之间有某种神秘的“组合”，就是我们所说的“组合组件”。

```js
const TabItem = (props) => {
  const {active, onClick} = props;
  const tabStyle = {
    'max-width': '150px',
    color: active ? 'red' : 'green',
    border: active ? '1px red solid' : '0px',
  };
  return (
    <h1 style={tabStyle} onClick={onClick}>
      {props.children}
    </h1>
  );
};
```

```xml
<Tabs>
  <TabItem>One</TabItem>
  <TabItem>Two</TabItem>
  <TabItem>Three</TabItem>
</Tabs>
```

```scala
class Tabs extends React.Component {
  state = {
    activeIndex:  0
  }

  render() {
    const newChildren = React.Children.map(this.props.children, (child, index) => {
      if (child.type) {
        return React.cloneElement(child, {
          active: this.state.activeIndex === index,
          onClick: () => this.setState({activeIndex: index})
        });
      } else {
        return child;
      }
    });

    return (
      <Fragment>
        {newChildren}
      </Fragment>
    );
  }
}
```

在 render 函数中，我们用了 React 中不常用的两个 API：

1. React.Children.map
2. React.cloneElement

使用 `React.Children.map`，可以遍历 `children` 中所有的元素，因为 `children` 可能是一个数组嘛。

使用 `React.cloneElement` 可以复制某个元素。这个函数第一个参数就是被复制的元素，第二个参数可以增加新产生元素的 props，我们就是利用这个机会，把 `active` 和 `onClick` 添加了进去。

这两个 API 双剑合璧，就能实现不通过表面的 props 传递，完成两个组件的“组合”。

## 四、单元测试

### Jest

1. 单元测试用例庞大，执行时间过长。
2. 单元测试用例之间相互影响。

Jest 支持并行执行。Jest 为每一个单元测试文件创造一个独立的运行环境，换句话说，Jest 会启动一个进程执行一个单元测试文件，运行结束之后，就把这个执行进程废弃了，这个单元测试文件即使写得比较差，把全局变量污染得一团糟，也不会影响其他单元测试文件，因为其他单元测试文件是用另一个进程来执行。

更妙的是，因为每个单元测试文件之间再无纠葛，Jest 可以**启动多个进程同时运行不同的文件**，这样就充分利用了电脑的多 CPU 多核，单进程 100 秒才完成的测试执行过程，8 核只需要 12.5 秒，速度快了很多。

### Enzyme

命令安装 `enzyme`: `npm i --save-dev enzyme enzyme-adapter-react-16`

可以注意到，我们不光要安装 enzyme，还要安装 enzyme-adapter-react-16，这个库是用来作为适配器的。因为不同 React 版本有各自特点，所用的适配器也会不同，我们的项目中使用的是 16.4 之后的版本，所以用 enzyme-adapter-react-16；如果用 16.3 版本，需要用 enzyme-adapter-react-16.3；如果用 16.2 版本，需要用 enzyme-adapter-react-16.2；如果用更老的版本 15.5，需要用 enzyme-adapter-react-15。具体各个 React 版本对应什么样的 Adapter，请参考 [enzyme官方文档](https://airbnb.io/enzyme/#installation)。

shallow 和 mount 的区别，就是 shallow 只会渲染被测试的 React 组件这一层，不会渲染子组件；而 mount 则是完整地渲染 React 组件包括其所有子组件，包括触发 `componentDidMount` 生命周期函数。

原则上，能用 shallow 就尽量用 shallow，首先是为了测试性能考虑，其次是可以减少组件之间的影响，比如，一个组件 `Foo` 有子组件 `Bar`，如下：

```js
const Foo = () => ()
    <div>
       {/* other logic */}
       <Bar />
    </div>
)
```

如果用 mount 去渲染 Foo，会连带 Bar 一起完全渲染，如果 Bar 出了什么毛病，那 Foo 的单元测试也过不了；如果用 shallow，只知道 Bar 曾经被用，即使 Bar 哪里出了问题，也不影响 Foo 的单元测试。

这并不是说我们就不管 Bar，Bar 的质量会由它自己的单元测试来检验，这就引出下一个话题——代码覆盖率。

### 代码覆盖率

如果对覆盖率的要求低于 100%，时间一长，质量必定会越来越下滑。

在 create-react-app 创造的应用中，已经自带了代码覆盖率的支持，运行下面的命令，不光会运行所有单元测试，也会得到覆盖率汇报。

`npm test -- --coverage`

代码覆盖率包含四个方面：

1. 语句覆盖率
2. 逻辑分支覆盖率
3. 函数覆盖率
4. 代码行覆盖率

只有四个方面都是 100%，才算真的 100%。

## 五、状态管理

### 组件状态

#### 什么数据放在 state 中

一个经常被问到的问题，就是为什么不把组件的数据直接存放在组件类的成员变量中？比如像下面这样：

```scala
class Foo extends React.component {
  foo = 'foo'

  render() {
    return (
      <React.Fragment>{this.foo}</React.Fragment>
    )
  }
}
```

像上面，数据存在 `this.foo` 中，而不是存在 `this.state.foo` 中，当这个组件渲染的时候，当然 `this.foo` 的值也就被渲染出来了，问题是，更新 `this.foo` 并**不会引发组件的重新渲染**，这很可能不是我们想要的。

所以，判断一个数据应该放在哪里，用下面的原则：

1. 如果数据由外部传入，放在 props 中；
2. 如果是组件内部状态，是否这个状态更改应该立刻引发一次组件重新渲染？如果是，放在 state 中；不是，放在成员变量中。

#### 修改 state 的正确方式

我们修改 state，当然不只是想修改这个对象的值，而是想引发 React 组件的重新渲染。

```kotlin
this.state.foo = 'bar'; // 错误方式

this.setState({foo: 'bar'}); // 正确方式
```

如上面代码所示，如果只是修改 `this.state`，那改了也就只是改了这个对象，其他的什么都不会发生；如果使用 `setState` 函数，那不光修改 `state`，还能引发组件的重新渲染，在重新渲染中就会使用修改后的 `state`，这也就是达到根据 `state` 改变公式左侧 UI 的目的。

```ini
UI = f(state)
```

#### state 改变引发的重新渲染的时机

React 的一种性能优化策略，如果 React 对每一次 `setState` 都立刻做一次组件重新渲染，那代价有点大，比如下面的代码：

```kotlin
this.setState({count: 1});
this.setState({caption: 'foo'});
this.setState({count: 2});
```

连续的同步调用 `setState`，第三次还覆盖了第一次调用的效果，但是效果只相当于调用了下面这样一次：

```kotlin
this.setState({count: 2, caption: 'foo'});
```

React 非常巧妙地用任务队列解决了这个问题，可以理解为每次 setState 函数调用都会往 React 的任务队列里放一个任务，多次 setState 调用自然会往队列里放多个任务。React 会选择时机去批量处理队列里执行任务，当批量处理开始时，React 会合并多个 setState 的操作，比如上面的三个 setState 就被合并为只更新 state 一次，也只引发一次重新渲染。

因为这个任务队列的存在，React 并不会同步更新 state，所以，在 React 中，**setState 也不保证同步更新 state 中的数据**。

#### state 不会被同步修改

简单说来，调用 setState 之后的下一行代码，读取 this.state 并不是修改之后的结果。

```kotlin
console.log(this.state.count);// 修改之前this.state.count为0
this.setState({count: 1})
console.log(this.state.count);// 在这里this.state.count依然为0
```

```js
  setTimeout(() => {
    this.setState({count: 2}); //这会立刻引发重新渲染
    console.log(this.state.count); //这里读取的count就是2
  }, 0);
```

为什么 setTimeout 能够强迫 setState 同步更新 state 呢？

可以这么理解，当 React 调用某个组件的生命周期函数或者事件处理函数时，React 会想：“嗯，这一次函数可能调用多次 setState，我会先打开一个标记，只要这个标记是打开的，所有的 setState 调用都是往任务队列里放任务，当这一次函数调用结束的时候，我再去批量处理任务队列，然后把这个标记关闭。”

因为 setTimeout 是一个 JavaScript 函数，和 React 无关，对于 setTimeout 的第一个函数参数，这个函数参数的执行时机，已经不是 React 能够控制的了，换句话说，React 不知道什么时候这个函数参数会被执行，所以那个“标记”也没有打开。

当那个“标记”没有打开时，setState 就不会给任务列表里增加任务，而是强行立刻更新 state 和引发重新渲染。这种情况下，React 认为：“这个 setState 发生在自己控制能力之外，也许开发者就是想要强行同步更新呢，宁滥勿缺，那就同步更新了吧。”

知道这个“技巧”之后，可能会有开发者说：好啊，那么以后我就用 setTimeout 来调用 setState 吧，能够立刻更新 state，多好！

我劝你不要这么做。

就像上面所说，React 选择不同步更新 state，是一种性能优化，如果你用上 setTimeout，就没机会让 React 优化了。

而且，**每当你觉得需要同步更新 state 的时候，往往说明你的代码设计存在问题**，绝大部分情况下，你所需要的，并不是“state 立刻更新”，而是，“确定 state 更新之后我要做什么”，这就引出了 setState 另一个功能。

#### setState 的第二个参数

setState 的第二个参数可以是一个回调函数，当 state 真的被修改时，这个回调函数会被调用。

```js
console.log(this.state.count); // 0
this.setState({ count: 1 }, ()=>{
  console.log(this.state.count); // 这里就是 1
});
console.log(this.state.count); // 依然是 0
```

当 setState 的第二个参数被调用时，React 已经处理完了任务列表，所以 this.state 就是更新后的数据。

如果需要在 state 更新之后做点什么，请利用第二个参数。

#### 函数式 setState

当 setState 的第一个参数为函数时，任务列表上增加的就是一个可执行的任务函数了，React 每处理完一个任务，都会更新 this.state，然后把新的 state 传递给这个任务函数。

setState 第一个参数的形式如下：

```js
function increment(state, props) {
  return { count: state.count + 1 }
}
```

可以看到，这是一个纯函数，不光接受当前的 state，还接受组件的 props，在这个函数中可以根据 state 和 props 任意计算，返回的结果会用于修改 this.state。

如此一来，我们就可以这样连续调用 setState：

```kotlin
this.setState(increment);
this.setState(increment);
this.setState(increment);
```

用这种函数式方式连续调用 setState，就真的能够让 this.state.count 增加 3，而不只是增加 1。

#### 小结

1. 如何确定数据以 props 还是以 state 形式存在；
2. 更新 state 的正确方法；
3. setState 通常并不会立刻更新 state；
4. 函数参数形式的 setState 才是推荐的用法。

### Redux 使用模式

#### 适合 Redux 的场景

第一步，看这个状态是否会被多个 React 组件共享。第二步，看这个组件被 unmount 之后重新被 mount，之前的状态是否需要保留。第三步，到这一步，基本上可以确定，这个状态可以放在 React 组件中了。

不过，如果你觉得这个状态很复杂，需要跟踪修改过程，那看你个人喜好，可以选择放在 Store 上；如果你想简单处理，可以心安理得地让这个状态由 React 组件自己管理。

#### 代码组织方式

基于角色的分类（role based）：把所有 reducer 放在一个目录（通常就叫做 `reducers`)，把所有 action 放在另一个目录（通常叫 `actions`），最后，把所有的纯 React 组件放在另一个目录。

基于功能的分类（feature based）：每个目录下都有各自的 `action.js` 和 `reducer.js` 文件。

具体用哪种方式来组织代码，主要就看你是否预期这些模块会被共享，如果会，那采用基于功能的方式就是首选。

#### react-redux 中的模式

`npm install redux react-redux`

react-redux 就是『提供者模式』的实践。在组件树的一个比较靠近根节点的位置，我们通过 `Provider` 来引入一个 store，代码如下

```js
import {createStore} from 'redux';
import {Provider} from 'react-redux';

const store = createStore(...);

// JSX
  <Provider store={store}>
    { // Provider之下的所有组件都可以connect到给定的store }
  </Provider>
```

这个 `Provider` 当然也是利用了 React 的 Context 功能。在这个 Provider 之下的所有组件，如果使用 connect，那么『链接』的就是 Provider 的 state。

#### Redux 和 React 结合的最佳实践

1. Store 上的数据应该范式化。（尽量减少冗余信息）。
2. 使用 selector。业界应用最广的 selector 就是 [reslector](https://github.com/reduxjs/reselect)。
    reselector 的好处，是把反范式化分为两个步骤，第一个步骤是简单映射，第二个步骤是真正的重量级运算，如果第一个步骤发现产生的结果和上一次调用一样，那么第二个步骤也不用计算了，可以直接复用缓存的上次计算结果。
3. 只 connect 关键点的 React 组件。

当 Store 上状态发生改变的时候，所有 connect 上这个 Store 的 React 组件会被通知：『状态改变了！』

然后，这些组件会进行计算。connect 的实现方式包含 `shouldComponentUpdate` 的实现，可以阻挡住大部分不必要的重新渲染，但是，毕竟处理通知也需要消耗 CPU，所以，尽量让关键的 React 组件 connect 到 store 就行。

一个实际的例子就是，一个列表种可能包含几百个项，让每一个项都去 connect 到 Store 上不是一个明智的设计，最好是只让列表去 connect，然后把数据通过 props 传递给各个项。

#### 一个还是多个 Store

在下面的代码示例中，Foo 能够 connect 到的 store 是s tore1，而 Bar 能够 connect 到的是 store2，因为内层的 Provider 会屏蔽掉外层的 Provider。

```xml
  <Provider store={store1}>
    <React.Fragment>
      <Foo />
      <Provider store={store2} >
        <React.Fragment>
          <Bar />
        </React.Fragment>
      </Provider>
   </React.Fragment>
  </Provider>
```

如果真的需要让 Bar 来访问到 store1，那么就不能通过 Provider 来传递，只能通过 props 等方式传递，如此一来，引入了新的复杂度。

所以，建议还是尽量使用一个 Store，如果真的需要多个 Store，除非认定只有很少组件会访问多个 Store。

#### 如何实现异步操作

Suspense 才是 React 中做异步操作的未来

#### 小结

这一小节我们介绍了 Redux，读者应该掌握：

1. Redux 中的基本概念 action、reducer 和 store；
2. 使用 react-redux 会应用哪些设计模式；
3. 如何设计 Redux 的 Store。

### Mobx 使用模式

安装：`npm install mobx`

```ini
import {observable} from 'mobx';

const counter = observable({
  count: 0
});
```

```js
import {autorun} from 'mobx';

window.counter = counter;

autorun(() => {
  console.log('#count', counter.count);
});
```

在 Chrome 的开发者界面，我们可以直接访问 `window.counter.count`，神奇之处是，如果我们直接修改 `window.counter.count` 的值，可以直接触发 `autorun` 的函数参数！

这个现象说明，`mobx` 的 `observable` 拥有某种“神力”，**任何对这个对象的修改，都会立刻引发某些函数被调用。**和 observable 这个名字一样，被包装的对象变成了“被观察者”，而被调用的函数就是“观察者”，在上面的例子中，autorun 的函数参数就是“观察者”。

Mobx 这样的功能，等于实现了设计模式中的“观察者模式”（Observer Pattern），通过建立 observer 和 observable 之间的关联，达到数据联动。`observable.register(observer);` Mobx 最了不起之处，在于不需要开发者写上面的关联代码，Mobx自己通过解析代码就能够自动发现 observer 和 observable 之间的关系。

#### 在 create-react-app 中增加 decorator 支持

`npm run eject` 在 eject 之后，我们手动安装支持 decorator 的 babel 插件: `npm install --save-dev babel-plugin-transform-decorators-legacy`

然后，我们找到 `package.json` 里面 `babel` 这一部分，添加 `plugins` 部分，让这一部分变成这个样子：

```json
  "babel": {
    "plugins": [
      "transform-decorators-legacy"
    ],
    "presets": [
      "react-app"
    ]
  },
```

现在，我们离在 create-react-app 产生的应用中使用 decorator 只差一步了，记得我们说过 Mobx 和 React 并无直接关系吗？为了建立二者的关系，还需要安装 `mobx-react`: `npm install mobx-react` 现在，我们可以使用 decorator 来操作 Mobx了。

#### 用 decorator 来使用 Mobx

```ts
import {observable} from 'mobx';
import {observer} from 'mobx-react';

@observer
class Counter extends React.Component {
  @observable count = 0;

  onIncrement = () => {
    this.count ++;
  }

  onDecrement = () => {
    this.count --;
  }

  componentWillUpdate() {
    console.log('#enter componentWillUpdate');
  }

  render() {
    return(
      <CounterView
        caption="With decorator"
        count={this.count}
        onIncrement={this.onIncrement}
        onDecrement={this.onDecrement}
        />
    );
  }
}
```

在上面的代码中，`Counter` 这个 React 组件自身是一个 `observer`，而 `observable` 是 `Counter` 的一个成员变量 `count`。

注意 `observer` 这个 `decorator` 来自于 `mobx-react`，它是 Mobx 世界和 React 的桥梁，被它“装饰”的组件，只要用到某个被 Mobx 的 `observable` “装饰”过的数据，自然会对这样的数据产生反应。所以，只要 `Counter` 的 `count` 成员变量一变化，就会引发 `Counter` 组件的重新渲染。

可以注意到，`Counter` 的代码中并没有自己的 state，其实，被 `observer` 修饰过之后，`Counter` 被强行"注入”了 state，只不过我们看不见而已。

#### 独立的 Store

虽然把 observer 和 observable 集中在一个 React 组件中可行，但是，这也让 observable 的状态被封存在了 React 组件内，那我们直接用 React 自身的 state 管理也能解决问题，所以，这样使用 Mobx 意义不大。

更多适用于 Mobx 的场合，就和适用于 Redux 的场合一样，是一个状态需要多个组件共享，所以 observable 一般是在 React 组件之外。

我们重写一遍 Counter 组件，代码如下：

```ini
const store = observable({
  count: 0
});
store.increment = function() {
  this.count ++;
};
store.decrement = function() {
  this.count --;
}

@observer // this decorator is must
class Counter extends React.Component {
  onIncrement = () => {
    store.increment();
  }

  onDecrement = () => {
    store.decrement();
  }

  render() {
    return(
      <CounterView
        caption="With external state"
        count={store.count}
        onIncrement={this.onIncrement}
        onDecrement={this.onDecrement}
        />
    );
  }
}
```

可以看到，我们把 `count` 提到组件之外，甚至就把它叫做 store，这延续的是 Redux 的命名方法。

在这一小节中，我们介绍了 Mobx，读者应该能学到：

1. Mobx 的基本功能就是“观察者模式”
2. decorator 是“装饰者模式”在 JavaScript 语言中的实现
3. Mobx 通常利用 decorator 来使用
4. 如何利用 mobx-react 来管理 React组件的状态

### 不同方式对比

#### Mobx 和 Redux 的比较

最根本的区别在于**对数据的处理方式不同**。

Redux 认为，数据的一致性很重要，为了保持数据的一致性，要求Store 中的数据尽量范式化，也就是减少一切不必要的冗余，为了限制对数据的修改，要求 Store 中数据是不可改的（Immutable），**只能通过 action 触发 reducer 来更新 Store**。

Mobx 也认为数据的一致性很重要，但是它认为解决问题的根本方法不是让数据范式化，而是不要给机会让数据变得不一致。所以，Mobx 鼓励数据干脆就“反范式化”，有冗余没问题，**只要所有数据之间保持联动，改了一处，对应依赖这处的数据自动更新**，那就不会发生数据不一致的问题。

值得一提的是，虽然 Mobx 最初的一个卖点就是直接修改数据，但是实践中大家还是发现这样无组织无纪律不好，所以后来 Mobx 还是提供了 action 的概念。和 Redux 的 action 有点不同，Mobx 中的 action 其实就是一个函数，不需要做 `dispatch`，调用就修改对应数据，在上面的代码中，`increment` 和 `decrement` 就是 action。

如果想强制要求使用 action，禁止直接修改 observable 数据，使用 Mobx 的 `configure`，如下：

```js
import {configure} from "mobx";

configure({ enforceActions: true });
```

总结一下 Redux 和 Mobx 的区别，包括这些方面：

1. Redux 鼓励一个应用只用一个 Store，Mobx 鼓励使用多个 Store；
2. Redux 使用“拉”的方式使用数据，这一点和 React是一致的，但 Mobx 使用“推”的方式使用数据，和 RxJS 这样的工具走得更近；
3. Redux 鼓励数据范式化，减少冗余，Mobx 容许数据冗余，但同样能保持数据一致。

然后，被问起最多的问题就来了：我应该选用 Mobx 还是 Redux 呢？

问：你的应用是小而且简单，还是大而且复杂？

如果是前者，选择 Mobx；如果是后者，选择 Redux。

问：你想要快速开发应用，还是想要长期维护这个应用？

如果是前者，选择 Mobx；如果是后者，选择 Redux。

## 六、路由的魔法

### React Router 实例

我们并不需要安装 react-router 这个 npm 包，因为 react-router 为了支持 Web 和 React Native 出了两个包—— react-router-dom 和 react-router-native ，我们只关心 Web，所以只需要安装 react-router-dom 。这个 react-router-dom 依赖于 react-router ，所以 react-router 也会被自动安装上。

安装 `npm install react-router-dom`

```js
import { HashRouter } from "react-router-dom";

ReactDOM.render(
  <HashRouter>
    <App />
  </HashRouter>
  document.getElementById('root');
)
```

把 Router 用在 React 组件树的最顶层，这是最佳实践。因为将来我们如果想把 HashRouter 换成 BrowserRouter，组件 App 以下几乎不用任何改变。

### Link

在 `App.js` 中，我们让网页由两个组件 Navigation 和 Content 组成， Navigation 就是导航栏，而 Content 是具体内容。

```scala
class App extends Component {
  render() {
    return (
      <div className="App">
        <Navigation />
        <Content />
      </div>
    );
  }
}
```

```js
const ulStyle = {
  'list-style-type': 'none',
  margin: 0,
  padding: 0,
};

const liStyle = {
  display: 'inline-block',
  width: '60px',
};

const Navigation = () => (
  <header>
    <nav>
      <ul style={ulStyle}>
        <li style={liStyle}><Link to='/'>Home</Link></li>
        <li style={liStyle}><Link to='/about'>About</Link></li>
      </ul>
    </nav>
  </header>
)
```

我们来看 Content 这个组件，这里会用到 react-router 最常用的两个组件 Route 和 Switch。

```js
const Content = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route path='/about' component={About}/>
    </Switch>
  </main>
)
```

在想要精确匹配的 Route 上加一个属性 `exact`，或者使用 Switch 组件。

### 动态路由

```xml
<Switch>
  <Route exact path='/' component={Home}/>
  {
    isUserLogin() &&
    <Route exact path='/product' component={Product}/>,
  }
  <Route path='/about' component={About}/>
</Switch>
```

可以用任何条件决定 Route 组件实例是否渲染，比如，可以根据页面宽度、设备类型决定路由规则，动态路由有了最大的自由度。

## 七、服务端渲染

### 1、基本套路

#### 为什么要服务端渲染

相比于浏览器端渲染，服务器端渲染的好处是：

1. 可以缩短 “第一有意义渲染时间”（first-meaningful-paint-time）。
2. 更好的搜索引擎优化（search-engine-optimization，SEO）。

上面两点，就是服务器端渲染的主要意义。

#### React 对服务端渲染的支持

因为 React 是**声明式框架**，所以，在渲染上对服务器端渲染非常友好。

```js
import React from 'react';
import ReactDOMServer from 'react-dom/server';

// 把渲染内容以流的形式塞给response
ReactDOMServer.renderToNodeStream(<Hello />).pipe(response);
```

`renderToNodeStream` 把渲染结果以“流”的形式塞给 response 对象（这里的 response 是 express 或者 koa 的概念），这意味着不用等到所有 HTML 都渲染出来了才给浏览器端返回结果，也许 10 毫秒内就渲染出来了网页头部，那就没必要等到 500 毫秒全部网页都出来了才推给浏览器，“流”的作用就是有多少内容给多少内容，这样用户只需要 10 毫秒多一点的延迟就可以看到网页内容，进一步改进了“第一有意义渲染时间”。

#### 服务端渲染的难点

```ini
import React from 'react';
import ReactDOMServer from 'react-dom/server';

callAPI().then(result => {
  const props = result;
  ReactDOMServer.renderToNodeStream(<Hello {...props}/>).pipe(response);
});
```

最大的问题来了，如何给组件获取和提供数据呢？

解决了这个问题，才算真的解决了服务器端渲染的问题。

#### 脱水和注水

**如果想要动态交互效果，使用 React 服务器端渲染，必须也配合使用浏览器端渲染。**

前面提到过 React v16 之后用 `React.hydrate` 替换 `React.render`，这个 hydrate 就是“注水”。

![hydrate](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2018/11/2/166d20bf04d0775d~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.awebp)

总之，为了实现React的服务器端渲染，必须要处理好这两个问题：

1. 脱水
2. 注入

### 2、理解 Next.js

我们已经知道了服务器端渲染的原理，你只需要搭建一个 Express 服务器，在服务器端手工打造『脱水』，在浏览器端做『注水』，完成某个页面的服务器端渲染并不难。

#### 快速创建 Next.js 项目

安装：`npm install -g create-next-app`

创建：`create-next-app next-demo`

#### 编写页面

在 Next.js 应用中，习惯上 `npm run start` 以产品模式启动，所以要先运行 `npm run build` 然后才能运行 `npm run start`。

Next.js 遵从『协定优于配置』（convention over configuration）的设计原则，根据『协定』，在 `pages` 中每个文件对应一个网页文件，文件名对应的就是网页的路径名，比如 `pages/home.js` 文件对应的就是 `/home` 路径的页面，当然 `pages/index.js` 比较特殊，对应的是默认根路径 `/` 的页面。

#### getInitialProps

我们用一个函数来实现异步操作，以此模拟调用 API 的延迟效果，如下：

```js
const timeout = (ms, result) => {
  return new Promise(resolve => setTimeout(() => resolve(result), ms));
}
```

```js
const Home = (props) => (
  <h1>
    Hello {props.userName}
  </h1>
)

Home.getInitialProps = async () => {
  return await timeout(200, {userName: 'Morgan'});
};
```

这个 `getInitialProps` 是 Next.js 最伟大的发明，它确定了一个规范，一个页面组件只要把访问 API 外部资源的代码放在 getInitialProps 中就足够，其余的不用管，Next.js 自然会在服务器端或者浏览器端调用 getInitialProps 来获取外部资源，并把外部资源以 props 的方式传递给页面组件。

注意 getInitialProps 是页面组件的静态成员函数，可以用下面的方法定义：

```ini
Home.getInitialProps = async () = {...};
```

也可以在组件类中加上 `static` 关键字定义：

```scala
class Home extends React.Component {
  static async getInitialProps() {
     ...
  }
}
```

我们可以这样来看待 getInitialProps，它就是 Next.js 对代表页面的 React 组件生命周期的扩充。React 组件的生命周期函数缺乏对异步操作的支持，所以 Next.js 干脆定义出一个新的生命周期函数 getInitialProps，在调用 React 原生的所有生命周期函数之前，Next.js 会调用 getInitialProps 来获取数据，然后把获得数据作为 props 来启动 React 组件的原生生命周期过程。

这个生命周期函数的扩充十分巧妙，因为：

1. 没有侵入 React 原生生命周期函数，以前的 React 组件该怎么写还是怎么写；
2. getInitialProps 只负责获取数据的过程，开发者不用操心什么时候调用 getInitialProps，依然是 React 哲学的声明式编程方式；
3. getInitialProps 是 async 函数，可以利用 JavaScript 语言的新特性，用同步的方式实现异步功能。

#### Next.js 的脱水和注水

在网页的 HTML 中，可以看到类似下面的内容：

```xml
<script>
  __NEXT_DATA__ = {
    "props":{
      "pageProps": {"userName":"Morgan"}},
      "page":"/","pathname":"/","query":{},"buildId":"-","assetPrefix":"","nextExport":false,"err":null,"chunks":[]}
</script>
```

Next.js 在做服务器端渲染的时候，页面对应的 React 组件的 getInitialProps 函数被调用，异步结果就是“脱水”数据的重要部分，除了传给页面 React 组件完成渲染，还放在内嵌 script 的 `__NEXT_DATA__` 中，这样，在浏览器端渲染的时候，是不会去调用 getInitialProps 的，直接通过 `__NEXT_DATA__` 中的“脱水”数据来启动页面 React 组件的渲染。

那么，getInitialProps 什么时候会在浏览器端调用呢？

当在单页应用中做页面切换的时候，比如从 Home 页切换到 Product 页，这时候完全和服务器端没关系，只能靠浏览器端自己了，Product页面的 getInitialProps 函数就会在浏览器端被调用，得到的数据用来开启页面的 React 原生生命周期过程。

关键点是，浏览器可能会直接访问 `/home` 或者 `/product`，也可能通过网页切换访问这两个页面，也就是说 Home 或者 Product 都可能被服务器端渲染，也可能完全只有浏览器端渲染，不过，这对应用开发者来说无所谓，应用开发者只要写好 `getInitialProps`，至于调用 getInitialProps 的时机，交给 Next.js 处理就好了。

你可以发明自己的服务器端框架，但很可能最后你发现，如果要做得通用性好，最后都会做到和 Next.js 一样的模式上来。

## 八、React 的未来

### 1、拥抱异步渲染

#### 同步渲染的问题

长期以来，React 一直用的是同步渲染，这样对 React 实现非常直观方便，但是会带来性能问题。

假设有一个超大的 React 组件树结构，有 1000 个组件，每个组件平均使用 1 毫秒，那么，要做一次完整的渲染就要花费 1000 毫秒也就是 1 秒钟，然而 JavaScript 运行环境是单线程的，也就是说，React 用同步渲染方式，渲染最根部组件的时候，会同步引发渲染子组件，再同步渲染子组件的子组件……最后完成整个组件树。在这 1 秒钟内，同步渲染霸占 JavaScript 唯一的线程，其他的操作什么都做不了，在这 1 秒钟内，如果用户要点击什么按钮，或者在某个输入框里面按键，都不会看到立即的界面反应，这也就是俗话说的“卡顿”。

在同步渲染下，要解决“卡顿”的问题，只能是尽量缩小组件树的大小，以此缩短渲染时间，但是，应用的规模总是在增大的，不是说缩小就能缩小的，虽然我们利用定义 shouldComponentUpdate 的方法可以减少不必要的渲染，但是这也无法从根本上解决大量同步渲染带来的“卡顿”问题。

#### 异步渲染：两阶段渲染

React Fiber 引入了异步渲染，有了异步渲染之后，React 组件的渲染过程是分时间片的，不是一口气从头到尾把子组件全部渲染完，而是每个时间片渲染一点，然后每个时间片的间隔都可去看看有没有更紧急的任务（比如用户按键），如果有，就去处理紧急任务，如果没有那就继续照常渲染。

根据 React Fiber 的设计，一个组件的渲染被分为两个阶段：第一个阶段（也叫做 `render` 阶段）是可以被 React 打断的，一旦被打断，这阶段所做的所有事情都被废弃，当 React 处理完紧急的事情回来，依然会重新渲染这个组件，这时候第一阶段的工作会重做一遍；第二个阶段叫做 `commit` 阶段，一旦开始就不能中断，也就是说第二个阶段的工作会稳稳当当地做到这个组件的渲染结束。

两个阶段的分界点，就是 `render` 函数。render 函数之前的所有生命周期函数（包括 render)都属于第一阶段，之后的都属于第二阶段。

开启异步渲染，虽然我们获得了更好的感知性能，但是考虑到第一阶段的的生命周期函数可能会被重复调用，不得不对历史代码做一些调整。

在 React v16.3 之前，render 之前的生命周期函数（也就是第一阶段生命周期函数）包括这些：

- componentWillReceiveProps
- shouldComponentUpdate
- componentWillUpdate
- componentWillMount
- render

下图是 React v16.3 之前的完整的生命周期函数图：

![生命周期](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2018/11/14/1670f0f2d4d06575~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.awebp)

首先，一个组件的 componentWillMount 比 componentDidMount 也早调用不了几微秒，性能没啥提高；而且，等到异步渲染开启的时候，componentWillMount 就可能被中途打断，中断之后渲染又要重做一遍，想一想，在 componentWillMount 中做 AJAX 调用，代码里看到只有调用一次，但是实际上可能调用 N 多次，这明显不合适。相反，若把 AJAX 放在 componentDidMount，因为 componentDidMount 在第二阶段，所以绝对不会多次重复调用，这才是 AJAX 合适的位置（当然，React 未来有更好的办法，在下一小节 Suspense 中可以讲到）。

#### getDerivedStateFromProps

到了 React v16.3，React 干脆引入了一个新的生命周期函数 getDerivedStateFromProps，这个生命周期函数是一个 static 函数，在里面根本不能通过 `this` 访问到当前组件，输入只能通过参数，对组件渲染的影响只能通过返回值。没错，getDerivedStateFromProps 应该是一个纯函数，React 就是通过要求这种纯函数，强制开发者们必须适应异步渲染。

```js
static getDerivedStateFromProps(nextProps, prevState) {
  // 根据 nextProps 和 prevState 计算出预期的状态改变，返回结果会被送给 setState
}
```

到了 React v16.3，React 生命周期函数全图如下:

![生命周期](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2018/11/14/1670f0fc08e10440~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.awebp)

注意，上图中并包含全部React生命周期函数，在React v16发布时，还增加了一个 `componentDidCatch`，当异常发生时，一个可以捕捉到异常的 `componentDidCatch` 就排上用场了。不过，很快 React 觉着这还不够，在 v16.6.0 又推出了一个新的捕捉异常的生命周期函数`getDerivedStateFromError`。

如果异常发生在第一阶段（render阶段），React 就会调用 `getDerivedStateFromError`，如果异常发生在第二阶段（commit阶段），React 会调用`componentDidCatch`。这个区别也体现出两个阶段的区分对待。

#### 适应异步渲染的组件原则

明白了异步渲染的来龙去脉之后，开发者就应该明白，现在写代码必须要为未来的某一次 React 版本升级做好准备，当 React 开启异步渲染的时候，你的代码应该做到在 render 之前最多只能这些函数被调用：

- 构造函数
- getDerivedStateFromProps
- shouldComponentUpdate

幸存的这些第一阶段函数，除了构造函数，其余两个全都必须是纯函数，也就是不应该做任何有副作用的操作。

实际上，如果之前你的用法规范，除了 shouldComponentUpdate 不怎么使用第一阶段生命周期函数，你还会发现不怎么需要改动代码，比如 componentWillMount 中的代码移到构造函数中就可以了。但是如果用法错乱，比如滥用componentWillReceiveProps，那就不得不具体情况具体分析，从而决定这些代码移到什么位置。

开发者中一个普遍的误区，就是总想把任务往前提，提到靠前的生命周期函数去，就像我前面说过的在 componentWillMount 中做 AJAX。正确的做法是根据各函数的语义来放置代码，并**不是越往前越好**。

### 2、Suspense 带来的异步操作革命

如果用一句话概括 Suspense 的功用，那就是：用同步的代码来实现异步操作。

#### React 同步操作的不足

上一节介绍过，React 最初的设计，整个渲染过程都是同步的。同步的意思是，当一个组件开始渲染之后，就必须一口气渲染完，不能中断，对于特别庞大的组件树，这个渲染过程会很**耗时**，而且，这种同步处理，也会导致我们的代码比较麻烦。

当我们开始渲染某个组件的时候，假设这个组件需要从服务器获取数据，那么，要么由这个组件的父组件想办法拿到服务器的数据，然后通过 props 传递进来，要么就要靠这个组件自力更生来获取数据，但是，没有办法通过一次渲染完成这个过程，因为渲染过程是同步的，不可能让 React 等待这个组件调用 AJAX 获取数据之后再继续渲染。

常用的做法，需要组件的 render 和 componentDidMount 函数配合。

1. 在 componentDidMount 中使用 AJAX，在 AJAX 成功之后，通过 setState 修改自身状态，这会引发一次新的渲染过程。
2. 在 render 函数中，如果 state 中没有需要的数据，就什么都不渲染或者渲染一个“正在装载”之类提示；如果 state 中已经有需要的数据，就可以正常渲染了，但这也必定是在 componentDidMount 修改了 state 之后，也就是只有在第二次渲染过程中才可以。

```scala
class Foo extends React.Component {
  state = {
     data: null
  }

  render() {
     if (!this.state.data) {
        return null;
     } else {
        return <div>this.state.data</div>;
     }
  }

  componentDidMount() {
     callAPI().then(result => {
       this.setState({data: result});
     });
  }
}
```

这种方式虽然可行，我们也照这种套路写过不少代码，但它的缺点也是很明显的。

1. 组件必须要有自己的 state 和 componentDidMount 函数实现，也就不可能做成纯函数形式的组件。
2. 需要两次渲染过程，第一次是 mount 引发的渲染，由 componentDidMount 触发 AJAX 然后修改 state，然后第二次渲染才真的渲染出内容。
3. 代码啰嗦，十分啰嗦。

#### 理想中的代码形式

```ini
const Foo = () => {
  const data = callAPI();
  return <div>{data}</div>;
}
```

够简洁吧，可是目前的 React 版本做不到啊！

因为 `callAPI` 肯定是一个异步操作，不可能获得同步数据，无法在同步的 React 渲染过程中立足。

不过，现在做不到，不代表将来做不到，将来 React 会支持这样的代码形式，这也就是 `Suspense`。

Suspense 提供的 createFetcher 函数会封装异步操作，当尝试从 createFetcher 返回的结果读取数据时，有两种可能：一种是数据已经就绪，那就直接返回结果；还有一种可能是异步操作还没有结束，数据没有就绪，这时候 createFetcher 会抛出一个“异常”。

你可能会说，抛出异常，渲染过程不就中断了吗？

的确会中断，不过，createFetcher 抛出的这个“异常”比较特殊，这个“异常”实际上是一个 Promise 对象，这个 Promise 对象代表的就是异步操作，操作结束时，也是数据准备好的时候。当 componentDidCatch 捕获这个 Promise 类型的“异常”时，就可以根据这个 Promise 对象的状态改变来重新渲染对应组件，第二次渲染，肯定就能够成功。

下面是 createFetcher 的一个简单实现方式：

```ini
var NO_RESULT = {};

export const createFetcher = (task) => {
  let result = NO_RESULT;

  return () => {
    const p = task();

    p.then(res => {
      result = res;
    });


    if (result === NO_RESULT) {
      throw p;
    }

    return result;
  }
}
```

在上面的代码中，createFetcher 的参数 `task` 被调用应该返回一个 Promise 对象，这个对象在第一次调用时会被 throw 出去，但是，只要这个对象完结，那么 `result` 就有实际的值，不会再被 throw。

还需要一个和 createFetcher 配合的 Suspense，代码如下：

```scala
class Suspense extends React.Component {
  state = {
    pending: false
  }

  componentDidCatch(error) {
    // easy way to detect Promise type
    if (typeof error.then === 'function') {
      this.setState({pending: true});

      error.then(() => this.setState({
        pending: false
      }));
    }
  }

  render() {
    return this.state.pending ? null : this.props.children;
  }
}
```

上面的 Suspense 组件实现了 componentDidCatch，如果捕获的 `error` 是 Promise 类型，那就说明子组件用 createFetcher 获取异步数据了，就会等到它完结之后重设 state，引发一次新的渲染过程，因为 createFetcher 中会记录异步返回的结果，新的渲染就不会抛出异常了。

使用 createFetcher 和 Suspense 的示例代码如下:

```js
const getName = () => new Promise((resolve) => {
  setTimeout(() => {
    resolve('Morgan');
  }, 1000);
})

const fetcher = createFetcher(getName);

const Greeting = () => {
  return <div>Hello {fetcher()}</div>
};

const SuspenseDemo = () => {
  return (
    <Suspense>
      <Greeting />
    </Suspense>
  );
};
```

上面的 `getName` 利用 `setTimeout` 模拟了异步 AJAX 获取数据，第一次渲染 `Greeting` 组件时，会有 Promise 类型的异常抛出，被 `Suspense` 捕获。1 秒钟之后，当 `getName` 返回实际结果的时候，`Suspense` 会引发重新渲染，这一次 `Greeting` 会显示出 `hello Morgan`。

上面的 createFetcher 和 Suspense 是一个非常简陋的实现，主要用来让读者了解 Suspense 的工作原理，正式发布的 Suspense 肯定会具备更强大的功能。

#### Suspense 带来的 React 使用模式改变

Suspense 被推出之后，可以极大地减少异步操作代码的复杂度。

之前，只要有 AJAX 这样的异步操作，就必须要用两次渲染来显示 AJAX 结果，这就需要用组件的 state 来存储 AJAX 的结果，用 state 又意味着要把组件实现为一个 class。总之，我们需要做这些：

1. 实现一个 class；
2. 实现一个 class；
3. 需要实现 componentDidMount 函数；
4. render 必须要根据 `this.state` 来渲染不同内容。

有了 Suspense 之后，不需要做上面这些杂事，只要一个函数形式组件就足够了。

在介绍 Redux 时，我们提到过在 Suspense 面前，Redux 的一切异步操作方案都显得繁琐，读者现在应该能够通过代码理解这一点了。

很可惜，目前 Suspense 还不支持服务器端渲染，当 Suspense 支持服务器端渲染的时候，那就真的会对 React 社区带来革命性影响。

在这一小节中我们介绍了 Suspense 功能，读者应该可以了解到：

1. Suspense 解决异步操作的问题；
2. 有了 Supsense 之后，依赖 AJAX 的组件也可以是函数形式，不需要是 class。

### 3、函数化的 Hooks

Hooks 的目的，简而言之就是让开发者不需要再用 class 来实现组件。

#### useState

Hooks 会提供一个叫 `useState` 的方法，它开启了一扇新的定义 state 的门，对应 Counter 的代码可以这么写：

```js
import {useState} from "react";

const Counter = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
       <div>{count}</div>
       <button onClick={() => setCount(count + 1)}>+</button>
       <button onClick={() => setCount(count - 1)}>-</button>
    </div>
  );
}
```

注意看，Counter 拥有自己的“状态”，但它只是一个函数，不是 class。

`useState` 只接受一个参数，也就是 state 的初始值，它返回一个只有两个元素的数组，第一个元素就是 state 的值，第二个元素是更新 state 的函数。

我们利用解构赋值（destructuring assignment）把两个元素分别赋值给 count 和 setCount，相当于这样的代码：

```ini
  // 下面代码等同于： const [count, setCount] = useState(0);
  const result = useState(0);
  const count = result[0];
  const setCount = result[1];
```

利用 count 可以读取到这个 state，利用 setCount 可以更新这个 state，而且我们完全可以控制这两个变量的命名，只要高兴，你完全可以这么写:

```scss
  const [theCount, updateCount] = useState(0);
```

因为 `useState` 在 `Counter` 这个函数体中，每次 Counter 被渲染的时候，这个 `useState` 调用都会被执行，`useState` 自己肯定不是一个纯函数，因为它要区分第一次调用（组件被 mount 时）和后续调用（重复渲染时），只有第一次才用得上参数的初始值，而后续的调用就返回“记住”的 state 值。

读者看到这里，心里可能会有这样的疑问：如果组件中多次使用 useState 怎么办？React 如何“记住”哪个状态对应哪个变量？

React 是完全根据 `useState` 的调用顺序来“记住”状态归属的，假设组件代码如下：

```scss
const Counter = () => {
  const [count, setCount] = useState(0);
  const [foo, updateFoo] = useState('foo');
  ...
}
```

#### useEffect

```js
import { useState, useEffect } from 'react';

const Counter = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `Count: ${count}`;
  });

  return (
    <div>
       <div>{count}</div>
       <button onClick={() => setCount(count + 1)}>+</button>
       <button onClick={() => setCount(count - 1)}>-</button>
    </div>
  );
};
```

**useEffect 就是告诉组件在“渲染完”之后做点什么事。**

```scss
  useEffect(() => {
    // 这里只有mount时才被调用，相当于componentDidMount
  }, [123]);
```

在上面的代码中，`useEffect` 的第二个参数是 `[123]`，其实也可以是任何一个常数，因为它永远不变，所以 useEffect 只在 mount 时调用第一个函数参数一次，达到了 componentDidMount 一样的效果。

#### useContext

使用 Hooks 的 useContext，上面的代码可以缩略为下面这样：

```ini
const theme = useContext(ThemeContext);
const language = useContext(LanguageContext);
// 这里就可以用theme和language了
```

但是，`useContext` 也并不是完美的，它会造成意想不到的重新渲染，我们看一个完整的使用 `useContext` 的组件。

```ini
const ThemedPage = () => {
    const theme = useContext(ThemeContext);

    return (
       <div>
            <Header color={theme.color} />
            <Content color={theme.color}/>
            <Footer color={theme.color}/>
       </div>
    );
};
```

因为这个组件 `ThemedPage` 使用了 `useContext`，它很自然成为了Context的一个消费者，所以，只要Context的值发生了变化，`ThemedPage` 就会被重新渲染，这很自然，因为不重新渲染也就没办法重新获得 `theme` 值，但现在有一个大问题，对于ThemedPage来说，实际上只依赖于`theme`中的`color`属性，如果只是`theme`中的`size`发生了变化但是`color`属性没有变化，`ThemedPage`依然会被重新渲染，当然，我们通过给`Header`、`Content`和`Footer`这些组件添加`shouldComponentUpdate`实现可以减少没有必要的重新渲染，但是上一层的`ThemedPage`中的JSX重新渲染是躲不过去了。

说到底，`useContext` 需要一种表达方式告诉React：“我没有改变，重用上次内容好了。”

希望Hooks正式发布的时候能够弥补这一缺陷。

#### Hooks 带来的代码模式改变

上面我们介绍了 `useState`、`useEffect` 和 `useContext` 三个最基本的 Hooks，可以感受到，Hooks 将大大简化使用 React 的代码。

首先我们可能不再需要 class了，虽然 React 官方表示 class 类型的组件将继续支持，但是，业界已经普遍表示会迁移到 Hooks 写法上，也就是放弃 class，只用函数形式来编写组件。

对于 `useContext`，它并没有为消除 class 做贡献，却为消除 render props 模式做了贡献。很长一段时间，高阶组件和 render props 是组件之间共享逻辑的两个武器，但如同我前面章节介绍的那样，这两个武器都不是十全十美的，现在 Hooks 的出现，也预示着高阶组件和 render props 可能要被逐步取代。

但读者朋友，不要觉得之前学习高阶组件和 render props 是浪费时间，相反，你只有明白 React 的使用历史，才能更好地理解 Hooks 的意义。

可以预测，在 Hooks 兴起之后，共享代码之间逻辑会用函数形式，而且这些函数会以 `use-` 前缀为约定，重用这些逻辑的方式，就是在函数形式组件中调用这些 `useXXX` 函数。

例如，我们可以写这样一个共享 Hook `useMountLog`，用于在 mount 时记录一个日志，代码如下：

```js
const useMountLog = (name) => {
    useEffect(() => {
        console.log(`${name} mounted`);    
    }, [123]);
}
```

任何一个函数形式组件都可以直接调用这个 `useMountLog` 获得这个功能，如下：

```ini
const Counter = () => {
    useMountLog('Counter');
    ...
}
```

对了，所有的 Hooks API 都只能在函数类型组件中调用，class 类型的组件不能用，从这点看，很显然，class 类型组件将会走向消亡。

这一节我们介绍了 React Hooks，读者应该能够理解：

1. Hooks 的意义就是可以淘汰 class 类型的组件；
2. Hooks 将改变重用组件逻辑的模式；
3. 在未来，Hooks 将是 React 使用的主流。

## 九、结语

技术在不断进步，时代在不断进步，设计模式和最佳实践也在不断进步，我们开发者自身也应该不断进步。

作为一个 React 开发者，你很幸运，因为 React 技术和社区也在与时俱进不断发展，最后祝大家工作顺利一路进步！

再见！

## 十、知识点学习

### propTypes

使用其内置的 PropTypes 进行类型检查。使用前必须先安装 prop-types 插件。

1. 安装 prop-types 插件

   `npm install prop-types -S`

2. PropTypes 规则

   [使用PropTypes进行类型检查](https://legacy.reactjs.org/docs/typechecking-with-proptypes.html)

