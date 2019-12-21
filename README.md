基于[Create React App]，手动实现react核心Api

### 启动
`npm start`
http://localhost:3000

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


### setState
1、setState(newState)执行时，会使用更新器update将newState添加到他维护的待处理状态数组pendingStates中，如果更新器处理未处于待处理状态isPending则通知更新
2、updateCoponent负责合并pendingStates中所有state变成一个state
3、forceUpdate执行新旧vdom对比，diff以及实际更新操作


### 虚拟dom相关理解
1、虚拟dom：即用js描述Dom信息和结构的代码（Object），当状态变更的时候，重新渲染这个js的对象结构。
2、DOM操作很慢，轻微操作都可能导致页面重新排版，比较耗性能。相对于Dom对象，js对象处理起来更快、简单。通过diff算法对比新旧vdom的差异，可以批量的、最小化的执行dom操作，从而提高性能。
3、react中用jsx语法描述视图，通过babel-loader转译后它们变为React.createElement()形式，该函数将生成vdom来描述真实dom。将来如果状态变化，vdom将作出相应变化，再通过diff算法对比新老vdom区别，从而作出最终dom操作。

### diff算法理解

策略：
1. 同级比较，Web UI 中 DOM 节点跨层级的移动操作特别少，可以忽略不计。
2. 拥有相同类的两个组件将会生成相似的树形结构，拥有不同类的两个组件将会生成不同的树形结构。 例如:div->p, CompA->CompB
3. 对于同一层级的一组子节点，通过唯一的key进行区分。

基于以上三个前提策略，React 分别对 tree diff、component diff 以及 element diff 进行算法优化，它保证了整体界面构建的性能。

1、element diff

差异类型:
1. 替换原来的节点，例如把div换成了p，Comp1换成Comp2
2. 移动、删除、新增子节点， 例如ul中的多个子节点li中出现了顺序互换。 3. 修改了节点的属性，例如节点类名发生了变化。
4. 对于文本节点，文本内容可能会改变。

重排(reorder)操作:INSERT_MARKUP(插入)、MOVE_EXISTING(移动)和 REMOVE_NODE(删除)。 INSERT_MARKUP，新的 component 类型不在老集合里， 即是全新的节点，需要对新节点执行插入操作。
MOVE_EXISTING，在老集合有新 component 类型，且 element 是可更新的类型， generateComponentChildren 已调用 receiveComponent，这种情况下 prevChild=nextChild，就需要做移 动操作，可以复用以前的 DOM 节点。
REMOVE_NODE，老 component 类型，在新集合里也有，但对应的 element 不同则不能直接复用和更新， 需要执行删除操作，或者老 component 不在新集合里的，也需要执行删除操作。