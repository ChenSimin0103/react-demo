import http from "./httpService";

const apiEndPoint = "http://localhost:9090/api/movies";

export function getMovies() {
  return http.get(apiEndPoint);
}

export function deleteMovie(movieId) {
  return http.delete(apiEndPoint + "/" + movieId);
}
