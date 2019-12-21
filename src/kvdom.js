
// vdom转换成 dom
// diff
// vtype元素类型：1-html元素；2-function组件；3-class组件
export default function createVNode(vtype, type, props){
  console.log(vtype)
  const vnode = {vtype, type, props}
  return vnode
}

// vdom转换成 dom
export function initVNode(vnode){
  const {vtype} = vnode
  if(!vtype){ //文本节点
    return document.createTextNode(vnode)
  }
  if(vtype === 1){ //原生节点
    return createElement(vnode)
  }else if(vtype === 2){//函数组件
    return createFunComp(vnode)
  }else if(vtype === 3){ //类
    return createClassComp(vnode)
  }
}

// 原生组件
function createElement(vnode){
  //根据type创建元素
  const {type, props} = vnode;
  const node = document.createElement(type)
  //处理属性
  const {key, children, ...rest} = props
  Object.keys(rest).forEach(k => {
    if(k === 'className'){
      node.setAttribute('class',rest[k])
    }else if (k === 'htmlFor'){
      node.setAttribute('for',rest[k])
    }else if (k === 'style' && typeof rest[k] === 'object'){
      const style = Object.keys(rest[k]).map(s => {
        return s + ':' + rest[k][s] 
      }).join(';')
      console.log('style',style)
      node.setAttribute('style',style)
    }else if (k.startsWith('on')){
      const event = k.toLocaleLowerCase();
      node[event] = rest[k]
    }else {
      node.setAttribute(k,rest[k])
    }
  })
  // 递归子组件
  children.forEach(c => {
    if(Array.isArray(c)){
      c.forEach(item =>  node.appendChild(initVNode(item)) )
    }else{
      node.appendChild(initVNode(c)) 
    }
  })
  return node
}
// 函数组件
function createFunComp(vnode){
  const {type, props} = vnode;
  const vdom = type(props)
  return initVNode(vdom)
}
// class组件
function createClassComp(vnode){
  const {type, props} = vnode;
  const comp = new type(props)
  const vdom = comp.render()
  return initVNode(vdom)
}