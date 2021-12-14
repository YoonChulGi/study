import React, { Component } from 'react';

class Todolist extends Component {
  render() {
    const todoList = [
      { name: '공부하기', done: false },
      { name: '낮잠자기', done: true },
    ];
    return (
      <div>
        {todoList.map((todo) => (
          <div key={todo.name}>{todo.name}</div>
        ))}
      </div>
    );
  }
}

export default Todolist;
