import React, { Component } from "react";
import { Joi } from "joi-browser";
import Input from "./common/input";

class RegisterForm extends Component {
  state = {
    account: { username: "", password: "", name: "" },
    errors: {},
  };

  //   schema = {
  //     username: Joi.string().required(),
  //     password: Joi.string().required(),
  //     name: Joi.string().required(),
  //   };

  //   validate = () => {
  //     const result = Joi.validate(this.state.account, this.schema, {
  //       abortEarly: false,
  //     });
  //     console.log("result", result);
  //     if (!result.error) return null;
  //     const errors = {};
  //     for (let item of result.error.details) {
  //       console.log(item);
  //       errors[item.path[0]] = item.message;
  //     }
  //     return errors;
  //   };

  validateProperty = ({ name, value }) => {
    if (name === "username") {
      if (value.trim() === "") return "Username is required";
    }
    if (name === "password") {
      if (value.trim() === "") return "Password is required";
    }
    if (name === "name") {
      if (value.trim() === "") return "Name is required";
    }
  };

  handleChange = (e) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(e.currentTarget);
    if (errorMessage) {
      errors[e.currentTarget.name] = errorMessage;
    } else {
      delete errors[e.currentTarget.name];
    }
    const account = { ...this.state.account };
    account[e.currentTarget.name] = e.currentTarget.value;
    this.setState({
      account,
      errors,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    console.log("Summited");
  };

  render() {
    const { account, errors } = this.state;
    console.log("error", errors);
    return (
      <div>
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          <Input
            name="username"
            label="Username"
            onChange={this.handleChange}
            value={account.username}
            error={errors.username}
          />
          <Input
            name="password"
            label="password"
            onChange={this.handleChange}
            value={account.password}
            error={errors.password}
          />
          <Input
            name="name"
            label="name"
            onChange={this.handleChange}
            value={account.name}
            error={errors.name}
          />
          <button
            type="submit"
            className="btn btn-primary m-2"
            // disabled={this.validate()}
          >
            Register
          </button>
        </form>
      </div>
    );
  }
}

export default RegisterForm;
