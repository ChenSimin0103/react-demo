import http from './httpService';
import { apiUrl } from '../config/config';
import jwtDecode from 'jwt-decode';

const apiEndpoint = apiUrl + '/auth';
const tokenKey = 'token';

// 去除 http 模块 和 auth 模块的双向依赖，将 http 模块设置为 核心模块（不引用其他模块），将http模块需要做的事 暴露为方法，给其他模块做
// 设置在 http-header 加入 token
http.setJwt(getJwt())

// 注意 ，export 和 export default 可以并存，export 通过 {} 引入，export default 直接引入是对象

// 注意，将登录时对 token 的操作统一管理，是有必要的
// 登陆接口
export async function login(email, password) {
  const { data: jwt } = await http.post(apiEndpoint, { email, password });
  localStorage.setItem(tokenKey, jwt);
}
export function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

// 登出接口
export function logout() {
  localStorage.removeItem(tokenKey);
}

// 由jwt 获得用户信息对象 的方法
export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    console.log('从token解出的用户登录信息：' + jwt);
    return jwtDecode(jwt);
  } catch (ex) {
    console.log('localStorage 没有 token');
    return null;
  }
}
export function getJwt() {
  try {
    return localStorage.getItem(tokenKey);
  } catch (ex) {
    console.log('localStorage 没有 token');
    return null;
  }
}

export default {
  login,
  logout,
  getCurrentUser,
  loginWithJwt,
  getJwt,
};
