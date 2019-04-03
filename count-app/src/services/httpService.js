import axios from 'axios';
import logger from './logService';
import { toast } from 'react-toastify';

// 设置 jwt
function setJwt(jwt) {
  axios.defaults.headers.common['x-auth-token'] = jwt;
}
// 从环境变量中配置 url
axios.defaults.baseURL = process.env.REACT_APP_API_URL
// axios拦截器 用于拦截错误信息
axios.interceptors.response.use(null, error => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedError) {
    logger.log(error);
    toast.error('出现了意料之外的错误！');
  }
  return Promise.reject(error);
});

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  setJwt,
};
