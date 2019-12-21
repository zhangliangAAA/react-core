// import React from 'react';
// import ReactDOM from 'react-dom';
import React, { Component } from './kreact';
import ReactDOM from './kreact-dom';

function Comp(props) {
  return <h2>hi {props.name}</h2>;
}


class Comp2 extends Component {
  render(){
    return (
      <div>
        <h2>class--{this.props.name}</h2>
      </div>
    )
  }
}

const list = [{
  name: 'zdf',
  age: 20
},{
  name: 'lisi',
  age: 28
}]

const jsx = (
  <div id="demo" onClick={()=> alert('demo-click')} style={{ color: "red", border: "1px solid green" }}>
    <span>hi</span>
    <Comp name="函数组件" />
    <Comp2 name="class组件" />
    <ul>
      {list.map(user => (
        <li key={user.name}>{user.name}</li>
      ))}
    </ul>
  </div>
);

console.log(jsx);

ReactDOM.render(jsx, document.getElementById('root'));

