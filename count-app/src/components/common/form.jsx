import React, { Component } from 'react';
import Joi from 'joi-browser';

import Input from './input';
import Select from './Select';

class Form extends Component {
  state = {
    data: {},
    errors: {},
  };
  // 处理 提交表单
  handleSubmit = e => {
    e.preventDefault();
    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;

    this.doSubmit();
  };
  // 处理输入框变化事件
  handleChange = ({ target: input }) => {
    // 先处理错误
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else errors[input.name] = '';
    // 在处理输入
    const data = { ...this.state.data };
    data[input.name] = input.value;

    this.setState({ data, errors });
  };
  // 校验
  validate = () => {
    // abortEarly 用于出错时中断校验过程
    const options = { abortEarly: false };
    const result = Joi.validate(this.state.data, this.schema, options);
    if (!result.error) return null;

    const errors = {};
    for (let item of result.error.details) errors[item.path[0]] = item.message;
    return errors;
  };
  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);

    return error ? error.details[0].message : null;
  };
  // render 辅助方法：
  // 用于动态创建Input框
  renderInput(name, label, type = 'text') {
    const { data, errors } = this.state;
    return (
      <Input
        type={type}
        name={name}
        label={label}
        value={data[name]}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  }
  // 用于动态创建select框
  renderSelect(name, label, options) {
    const { data, errors } = this.state;
    return (
      <Select
        name={name}
        label={label}
        value={data[name]}
        options={options}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  }
  // 用于动态创建提交按钮
  renderButton(label) {
    return (
      <button disabled={this.validate()} className="btn btn-primary">
        {label}
      </button>
    );
  }
}

export default Form;
