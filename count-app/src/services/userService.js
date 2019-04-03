import http from "./httpService";
// import { apiUrl } from "../config/config";

const apiEndpoint = "/users";

// 注册函数，因为注册表单 信息 与 向后端发送的数据 有差异，在此重新拼装
export function register(user) {
  return http.post(apiEndpoint, {
    email: user.username,
    password: user.password,
    name: user.name
  });
}
