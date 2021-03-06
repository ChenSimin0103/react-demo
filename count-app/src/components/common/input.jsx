import React from 'react';

const Input = ({ type, name, label, value, error, onChange }) => {
  return (
    <div className="form-group">
      <label htmlFor="username">{label}</label>
      <input
        type={type}
        value={value}
        name={name}
        onChange={onChange}
        id={name}
        className="form-control"
      />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Input;
