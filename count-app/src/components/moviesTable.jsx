import React, { Component } from "react";
import { Link } from "react-router-dom";
import Table from "./common/table";

class MoviesTable extends Component {
  // 注意：点击排序标签变换顺序，是组件自己的事，所以转移责任 到组件内
  // 配置 表头
  columns = [
    {
      path: "title",
      label: "Title",
      content: movie => <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
    },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    {
      key: "func",
      content: movie => (
        <button
          onClick={() => this.props.onDelete(movie)}
          className="btn btn-danger btn-sm"
        >
          Delete
        </button>
      )
    }
  ];

  render() {
    // 解构数据
    const { movies, sortColumn } = this.props;
    // 解构事件
    const { onSort } = this.props;

    return (
      <Table
        columns={this.columns}
        data={movies}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default MoviesTable;
