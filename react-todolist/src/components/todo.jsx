import React, { Component } from 'react';

class Todo extends Component {
  render() {
    const { msg, id } = this.props.list;
    return (
      <div>
        <span>{msg}</span>
        <button onClick={() => this.props.onDelete(id)}>X</button>
      </div>
    );
  }
}

export default Todo;
