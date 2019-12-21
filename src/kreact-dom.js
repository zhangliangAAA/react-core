import {initVNode} from './kvdom'
// vnode -> dom 将虚拟dom转换成真实dom加载在dom上
function render(vnode, container) {
  const node = initVNode(vnode)
  console.log('---',node)
  container.appendChild(node);
  // container.innerHTML = `<pre> ${JSON.stringify(vnode, null, 2)} </pre>`
}

export default {render}