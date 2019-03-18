import React, { Component } from "react";

class Counter extends Component {
  state = {
  };
  render() {
    return (
      <div>
        <span className={this.getBadgeClasses()}>{this.formatCount()}</span>
        <button onClick={() => this.props.onAdd(this.props.counter)} className="btn btn-secondary btn-sm">
          增加1
        </button>
        <button onClick={() => this.props.onDelete(this.props.counter.id)} className="btn btn-secondary btn-sm">
          删除
        </button>
      </div>
    );
  }

  // 动态设置按钮css样式
  getBadgeClasses() {
    let classes = "badge m-2 ";
    classes += this.props.counter.value === 0 ? "badge-warning" : "badge-primary";
    return classes;
  }

  // 动态计算count的显示
  formatCount() {
    const { value } = this.props.counter;
    return value === 0 ? "Zero" : value;
  }
}

export default Counter;
