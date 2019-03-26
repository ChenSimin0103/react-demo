import React from 'react';
import Joi from 'joi-browser';
import Form from './common/form';
import { getMovie, saveMovie } from '../services/fakeMovieService';
import { getGenres } from '../services/fakeGenreService';

class MovieForm extends Form {
  state = {
    data: {
      // 奇怪的问题：_id为空是导致 validate 校验失败
      // _id: '',
      title: '',
      genreId: '',
      numberInStock: '',
      dailyRentalRate: '',
    },
    genres: [],
    errors: {},
  };
  schema = {
    _id: Joi.string(),
    title: Joi.string()
      .required()
      .label('Title'),
    genreId: Joi.string()
      .required()
      .label('Genre'),
    numberInStock: Joi.number()
      .required()
      .min(0)
      .max(100)
      .label('Number In Stock'),
    dailyRentalRate: Joi.number()
      .required()
      .min(0)
      .max(10)
      .label('Daily Rental Rate'),
  };

  // 生命周期钩子 ：组件挂载后
  componentDidMount() {
    const genres = getGenres();
    this.setState({ genres });

    const movieId = this.props.match.params.id;
    if (movieId === 'new') return;

    const movie = getMovie(movieId);
    if (!movie) return this.props.history.replace('/not-found');

    this.setState({ data: this.mapToViewModel(movie) });
  }
  // 此方法用于抹平 服务端数据 与前端展示的数据 之间的 格式差异
  mapToViewModel(movie) {
    return {
      _id: movie._id,
      title: movie.title,
      // genre 电影类型：如动作片，传记，剧情等
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
    };
  }

  // 表单之外的业务逻辑
  doSubmit = () => {
    saveMovie(this.state.data)

    this.props.history.replace('/movies')
  };

  render() {
    return (
      <div>
        <h1> Movie Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput('title','Title')}
          {/*  这里通过 genres 配置了 选择输入框的类型 */}
          {this.renderSelect('genreId','Genre',this.state.genres)}
          {this.renderInput('numberInStock', 'Number In Stock', 'number')}
          {this.renderInput('dailyRentalRate', 'Rate')}
          {this.renderButton('Save')}
        </form>
      </div>
    );
  }
}

export default MovieForm;
