import React from 'react';
import { Redirect } from 'react-router-dom';

import Joi from 'joi-browser';
import Form from './common/form';

import auth from '../services/authService';

class LoginFrom extends Form {
  // 这里使用了原型继承的方式，将表单 的大部分逻辑封装在Form里，
  // 在使用时，设置以下三组属性即可
  state = {
    data: {
      username: '',
      password: '',
    },
    errors: {
      username: '',
      password: '',
    },
  };
  // 用于joi校验
  schema = {
    username: Joi.string()
      .required()
      .label('Username'),
    password: Joi.string()
      .required()
      .label('password'),
  };
  // 表单之外的业务逻辑
  doSubmit = async () => {
    try {
      const { data } = this.state;
      // 取出jwt 令牌
      await auth.login(data.username, data.password);

      // this.props.history.push('/')
      // 如果路由信息系保存了 跳转到此页 之前的路由，则跳回那个路由，否则跳主页面
      const { state } = this.props.location;
      window.location = state ? state.from.pathname : '/';
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    // 如果已登录，进入登录页会重定向去主页
    if (auth.getCurrentUser()) return <Redirect to="/" />;

    return (
      <form onSubmit={this.handleSubmit}>
        {this.renderInput('username', 'Username')}
        {this.renderInput('password', 'Password', 'password')}
        {this.renderButton('Login')}
      </form>
    );
  }
}

export default LoginFrom;
