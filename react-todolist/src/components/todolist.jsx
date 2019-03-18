import React, { Component } from 'react';
import Todo from './todo';

class Todolist extends Component {
  state = {
    inputValue: '',
    list: [{ id: 0, msg: 'hello' }, { id: 1, msg: 'simin' }],
  };
  // 监听子组件触发的事件，并修改状态
  // 监听输入框内容
  handleInput(e) {
    const inputValue = e.target.value;
    this.setState({ inputValue });
  }
  // 监听确定按钮事件
  handleAdd() {
    let list = [...this.state.list];
    let inputValue = this.state.inputValue;
    // 这个id需要仔细考虑

    let count = list.length !== 0 ? list[list.length - 1].id + 1 : 0;
    list.push({ id: count, msg: inputValue });
    inputValue = '';
    this.setState({ list, inputValue });
  }
  // 监听子组件出发的删除事件
  handleDelete = id => {
    console.log('delete: ' + id);
    let list = this.state.list;
    list = list.filter(item => item.id !== id);
    this.setState({ list });
  };
  render() {
    return (
      <React.Fragment>
        <p>这是一个todolist</p>
        <input
          placeholder={'input something'}
          value={this.state.inputValue}
          onChange={this.handleInput.bind(this)}
        />
        {/* // 注意：这里 bind(this) 是因为 该函数中要使用本组件为this，且没有写为箭头函数才做的 */}
        {/* // 若该函数为箭头函数，则此处直接写此函数的引用即可 */}
        <button onClick={this.handleAdd.bind(this)}>确定</button>
        {this.state.list.map(item => {
          return (
            <Todo key={item.id} list={item} onDelete={this.handleDelete} />
          );
        })}
      </React.Fragment>
    );
  }
}

export default Todolist;
