import React, { Component } from 'react';
import { getMovies, deleteMovie } from '../services/movieService';
import { getGenres } from '../services/genreService';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import Pagination from './common/pagination';
import ListGroup from './common/listGroup';
import MoviesTable from './moviesTable';

import { paginate } from '../utils/paginate';
import SearchBox from './common/searchBox';

import { toast } from 'react-toastify';

class Movies extends Component {
  state = {
    movies: [],
    pageSize: 4,
    currentPage: 1,
    genres: [],
    // 这个值初始化为空对象??
    selectGenre: {},
    // 用于排序 asc为顺序排 desc为逆序排
    sortColumn: { path: 'title', order: 'asc' },
    // 用于输入名称搜索
    searchQuery: '',
  };
  // 自此钩子中初始化数据
  async componentDidMount() {
    const { data } = await getGenres();
    const genres = [{ name: 'All Genres', _id: '' }, ...data];

    const { data: movies } = await getMovies();
    this.setState({ movies, genres });
  }
  // 定义删除方法，加了调接口失败的处理
  handleDelete = async movie => {
    const originalMovies = this.state.movies;
    const movies = this.state.movies.filter(m => m._id !== movie._id);
    this.setState({ movies });
    try {
      deleteMovie(movie._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error('此电影已被删除');
      this.setState({ movies: originalMovies });
    }
  };
  // 分页组件点击事件
  handlePageChange = page => {
    this.setState({ currentPage: page });
  };
  // 分类组件点击事件
  handleGenresSelect = genre => {
    this.setState({ selectGenre: genre, searchQuery: '', currentPage: 1 });
  };
  // 处理 排序事件：排所有的项目，互相互斥，所以排序条件只需保存一条
  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };
  // 预处理数据
  getPageData = () => {
    const {
      movies: allMovies,
      pageSize,
      currentPage,
      selectGenre,
      sortColumn,
      searchQuery,
    } = this.state;
    // 预处理：先分类，再排序，最后分页
    let filtered = allMovies;
    if (searchQuery) {
      filtered = allMovies.filter(m =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase()),
      );
    } else if (selectGenre && selectGenre._id) {
      filtered = allMovies.filter(m => m.genre._id === selectGenre._id);
    }
    // lodash 博大精深
    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const curMovies = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: curMovies };
  };
  // 处理搜索输入事件
  handleSearch = query => {
    console.log(query);
    this.setState({ searchQuery: query, searchGenre: null, currentPage: 1 });
  };
  render() {
    const { length: count } = this.state.movies;
    const { pageSize, currentPage, sortColumn, searchQuery } = this.state;
    const { user } = this.props;

    if (count === 0) return <p>数据库里没有电影哦</p>;

    const { totalCount, data: curMovies } = this.getPageData();

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
          {user && (
            <Link
              to="/movies/new"
              className="btn btn-primary"
              style={{ marginBottom: 20 }}
            >
              New Movie
            </Link>
          )}
          <p>目前有{totalCount}部电影</p>
          <SearchBox value={searchQuery} onChange={this.handleSearch} />
          <MoviesTable
            movies={curMovies}
            sortColumn={sortColumn}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
          />
          <Pagination
            itemsCount={totalCount}
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
