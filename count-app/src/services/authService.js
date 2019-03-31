import http from "./httpService";
import { apiUrl } from "../config/config";

const apiEndpoint = apiUrl + "/auth";

// 登陆接口
export function login(email, password) {
  return http.post(apiEndpoint, { email, password });
}
