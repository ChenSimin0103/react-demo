import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";

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
  doSubmit = () => {
    console.log("submit to server");
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
