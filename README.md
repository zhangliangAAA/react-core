基于[Create React App]，手动实现react核心Api

1、webpack+babel编译时，替换JSX为React.createElement(type,props,...children)
2、所有的React.createElement()执行结束后得到一个JS，能够描述完整的dom结构，成为vdom
3、ReactDOM.render(vdom, container)可以将vdom转成dom并追加到container中，通过递归遍历vdom树，根据vtype不同，执行不同逻辑：1原生元素，2则执行函数并将返回vdom初始化，3则将类实例化并执行其render函数将返回的vdom初始化。

### ./src/kreact.js
React.createElement:创建虚拟DOM 
React.Component:实现自定义组件 

### ./src/kvdom.js
将createElement返回的结果对象转换为vdom

### ./src/kreact-dom
ReactDOM.render:将vdom渲染真实DOM



### 启动
`npm start`
http://localhost:3000

