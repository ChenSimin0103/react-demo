import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { getMovie, saveMovie } from "../services/movieService";
import { getGenres } from "../services/genreService";
import { toast } from "react-toastify";

class MovieForm extends Form {
  state = {
    data: {
      // 奇怪的问题：_id为空是导致 validate 校验失败
      // _id: '',
      title: "",
      genreId: "",
      numberInStock: "",
      dailyRentalRate: ""
    },
    genres: [],
    errors: {}
  };
  schema = {
    _id: Joi.string(),
    title: Joi.string()
      .required()
      .min(5)
      .label("Title"),
    genreId: Joi.string()
      .required()
      .label("Genre"),
    numberInStock: Joi.number()
      .required()
      .min(0)
      .max(100)
      .label("Number In Stock"),
    dailyRentalRate: Joi.number()
      .required()
      .min(0)
      .max(10)
      .label("Daily Rental Rate")
  };

  // 构建分类
  async populateGenres() {
    const { data: genres } = await getGenres();
    this.setState({ genres });
  }
  // 构建电影
  async populateMovies() {
    try {
      // 处理未找到的情况
      const movieId = this.props.match.params.id;
      if (movieId === "new") return;

      const { data: movie } = await getMovie(movieId);
      this.setState({ data: this.mapToViewModel(movie) });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        this.props.history.replace("/not-found");
    }
  }
  // 生命周期钩子 ：组件挂载后
  async componentDidMount() {
    await this.populateGenres();
    await this.populateMovies();
  }
  // 此方法用于抹平 服务端数据 与前端展示的数据 之间的 格式差异
  mapToViewModel(movie) {
    return {
      _id: movie._id,
      title: movie.title,
      // genre 电影类型：如动作片，传记，剧情等
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate
    };
  }

  // 表单之外的业务逻辑
  doSubmit = async () => {
    try {
      await saveMovie(this.state.data);

      this.props.history.replace("/movies");
    } catch (ex) {
      if(ex.response && ex.response.status === 400) {
        toast.error("输入有误");
      }
    }
  };

  render() {
    return (
      <div>
        <h1> Movie Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}
          {/*  这里通过 genres 配置了 选择输入框的类型 */}
          {this.renderSelect("genreId", "Genre", this.state.genres)}
          {this.renderInput("numberInStock", "Number In Stock", "number")}
          {this.renderInput("dailyRentalRate", "Rate")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default MovieForm;
