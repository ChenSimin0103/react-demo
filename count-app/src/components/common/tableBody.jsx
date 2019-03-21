import React, { Component } from "react";
import _ from "lodash";

// 传入值：movies, onDelete
class TableBody extends Component {
  // 抽象方法：每行中 每个单元格的元素内容
  renderCell = (item, column) => {
    if (column.content) return column.content(item);
    return _.get(item, column.path);
  };
  // 抽象方法： 每行中 每个单元格的key属性
  createKey = (item, column) => {
    return item._id + (column.path || column.key);
  };
  render() {
    const { data, columns } = this.props;
    return (
      <tbody>
        {data.map(item => (
          <tr key={item._id}>
            {/* 因为这里要访问嵌套的属性，所以用lodash处理 */}
            {columns.map(column => (
              <td key={this.createKey(item, column)}>
                {this.renderCell(item, column)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  }
}

export default TableBody;
