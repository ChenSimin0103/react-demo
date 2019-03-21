import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import _ from "lodash";

import Pagination from "./common/pagination";
import ListGroup from "./common/listGroup";
import MoviesTable from "./moviesTable";

import { paginate } from "../utils/paginate";

class Movies extends Component {
  state = {
    movies: [],
    pageSize: 4,
    currentPage: 1,
    genres: [],
    // 这个值初始化为空对象??
    selectGenre: {},
    // 用于排序 asc为顺序排 desc为逆序排
    sortColumn: { path: "title", order: "asc" }
  };
  // 自此钩子中初始化数据
  componentDidMount() {
    const genres = [{ name: "All Genres", _id: "" }, ...getGenres()];

    this.setState({ movies: getMovies(), genres });
  }
  // 定义方法
  handleDelete = movie => {
    const movies = this.state.movies.filter(m => m._id !== movie._id);
    this.setState({ movies });
  };
  // 分页组件点击事件
  handlePageChange = page => {
    this.setState({ currentPage: page });
  };
  // 分类组件点击事件
  handleGenresSelect = genre => {
    this.setState({ selectGenre: genre, currentPage: 1 });
  };
  // 处理 排序事件：排所有的项目，互相互斥，所以排序条件只需保存一条
  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };
  render() {
    const { length: count } = this.state.movies;
    const {
      movies,
      pageSize,
      currentPage,
      selectGenre,
      sortColumn
    } = this.state;

    if (count === 0) return <p>数据库里没有电影哦</p>;

    // 预处理：先分类，再排序，最后分页
    const filtered = selectGenre._id
      ? movies.filter(m => m.genre._id === selectGenre._id)
      : movies;
    // lodash 博大精深
    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const curMovies = paginate(sorted, currentPage, pageSize);

    return (
      <div className="row">
        <div className="col-4">
          {/* 注意：这里需要传入使用items中的属性，防止接口过度耦合 */}
          <ListGroup
            items={this.state.genres}
            selectedItem={this.state.selectGenre}
            onItemSelect={this.handleGenresSelect}
          />
        </div>
        <div className="col">
          <p>目前有{filtered.length}部电影</p>
          <MoviesTable
            movies={curMovies}
            sortColumn={sortColumn}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
          />
          <Pagination
            itemsCount={filtered.length}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
