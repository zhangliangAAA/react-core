import createVNode from './kvdom'

function createElement(type, props, ...children){
  
  props.children = children;
  delete props.__source
  // delete props '__source'
  // type: 标签类型 
  let vtype; //vtype元素类型：1-html元素；2-function组件；3-class组件
  if(typeof type === 'string'){
    vtype = 1
  }else if(typeof type === 'function'){
    if(!type.isClass){
      vtype = 2
    }else{
      vtype = 3
    }
  }
  return createVNode(vtype, type, props)
}

export class Component {
  //是否是类组件
  static isClass = true;
  constructor(props){
    this.props = props
    this.state = {}
  }
  setState(){

  }
}

export default { createElement}