import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";

import { login } from "../services/authService";

class LoginFrom extends Form {
  // 这里使用了原型继承的方式，将表单 的大部分逻辑封装在Form里，
  // 在使用时，设置以下三组属性即可
  state = {
    data: {
      username: "",
      password: ""
    },
    errors: {
      username: "",
      password: ""
    }
  };
  // 用于joi校验
  schema = {
    username: Joi.string()
      .required()
      .label("Username"),
    password: Joi.string()
      .required()
      .label("password")
  };
  // 表单之外的业务逻辑
  doSubmit = async () => {
    try {
      const { data } = this.state;
      // 取出jwt 令牌
      const re = await login(data.username, data.password);
      console.log(re)
      const { data: jwt } = re
      localStorage.setItem("token", jwt);
      this.props.history.push('/')
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        {this.renderInput("username", "Username")}
        {this.renderInput("password", "Password", "password")}
        {this.renderButton("Login")}
      </form>
    );
  }
}

export default LoginFrom;
