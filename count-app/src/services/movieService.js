import http from './httpService';
import { apiUrl } from '../config/config.json';

const apiEndPoint = apiUrl + '/movies';

export function getMovies() {
  return http.get(apiEndPoint);
}

export function getMovie(movieId) {
  return http.get(apiEndPoint + '/' + movieId);
}

export function saveMovie(movie) {
  // 要同时处理 修改 和 创建 操作，对 修改操作，请求体中不应包含 id ，以免多数据源干扰
  if (movie._id) {
    const body = { ...movie };
    delete body._id;
    return http.put(apiEndPoint + '/' + movie._id, body);
  }

  return http.post(apiEndPoint, movie);
}

export function deleteMovie(movieId) {
  return http.delete(apiEndPoint + '/' + movieId);
}
