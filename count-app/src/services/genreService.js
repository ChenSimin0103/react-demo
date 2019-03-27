import http from "./httpService";

export function getGenres() {
  return http.get("http://localhost:9090/api/genres");
}
