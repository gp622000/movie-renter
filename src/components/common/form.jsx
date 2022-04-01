import React, { Component } from "react";

import { Joi } from "joi-browser";
import Input from "./input";

class Form extends Component {
  state = {
    data: {},
    errors: {},
  };

  validateProperty = ({ name, value }) => {
    // console.log("fromValidateProperty");
    // const obj = { [name]: value };

    // const schema = { [name]: this.schema[name] };
    // console.log("Schema", schema);
    // const { error } = Joi.validate(obj, schema);
    // console.log(error);
    // if (error) return null;
    // return error.details[0].message;
    // return error ? error.details[0].message : null;
    if (name === "username") {
      if (value.trim() === "") return "Username is rquired";
    }
    if (name === "password") {
      if (value.trim() === "") return "Password is rquired";
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const errors = this.validate();
    this.setState({ errors });
    if (errors) return;

    this.doSubmit();

    // const username = this.username.current.value;
  };

  handleChange = (e) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(e.currentTarget);
    if (errorMessage) errors[e.currentTarget.name] = errorMessage;
    else delete errors[e.currentTarget.name];
    const data = { ...this.state.data };
    data[e.currentTarget.name] = e.currentTarget.value;
    this.setState({
      data,
      errors,
    });
  };

  renderButton(label) {
    return (
      <button
        type="submit"
        className="btn btn-primary m-2"
        // disabled is false when this.validate is null
        // disabled={this.validate()}
      >
        {label}
      </button>
    );
  }

  renderInput(name, label) {
    const { data, errors } = this.state;
    return (
      <Input
        name={name}
        value={data[name]}
        label={label}
        onChange={this.handleChange}
        error={errors.username}
      />
    );
  }
}

export default Form;
