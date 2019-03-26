import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";

class RegisterForm extends Form {
  state = {
    data: {
      username: "",
      password: "",
      name: ""
    },
    errors: {}
  };
  schema = {
    username: Joi.string()
      .required()
      .email()
      .label("用户名"),
    password: Joi.string()
      .required()
      .min(6)
      .label("密码"),
    name: Joi.string()
      .required()
      .label("姓名")
  };
  // 表单之外的业务逻辑
  doSubmit = () => {
    console.log("register form submit to server");
  };

  render() {
    return (
      <div>
        <h1> Register</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {this.renderInput("name", "Name")}
          {this.renderButton("Login")}
        </form>
      </div>
    );
  }
}

export default RegisterForm;
