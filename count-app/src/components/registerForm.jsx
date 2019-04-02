import React from 'react';
import Joi from 'joi-browser';
import Form from './common/form';


import * as userService from '../services/userService';
import { toast } from 'react-toastify';
import auth from '../services/authService';

class RegisterForm extends Form {
  state = {
    data: {
      username: '',
      password: '',
      name: '',
    },
    errors: {},
  };
  schema = {
    username: Joi.string()
      .required()
      .email()
      .label('用户名'),
    password: Joi.string()
      .required()
      .min(6)
      .label('密码'),
    name: Joi.string()
      .required()
      .label('姓名'),
  };
  // 表单之外的业务逻辑
  doSubmit = async () => {
    try {
      // 在此 需要注册成功后，使用 jwt 进行登录
      const response = await userService.register(this.state.data);
      const jwt = response.headers['x-auth-token'];
      auth.loginWithJwt(jwt)
      console.log(response);
      // this.props.history.push('/')
      window.location = '/';
    } catch (ex) {
      console.log(ex.response);
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    return (
      <div>
        <h1> Register</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput('username', 'Username')}
          {this.renderInput('password', 'Password', 'password')}
          {this.renderInput('name', 'Name')}
          {this.renderButton('Login')}
        </form>
      </div>
    );
  }
}

export default RegisterForm;
