import { Component, React } from "react";
import Joi from "joi-browser";
import Input from "./common/input";

class LoginForm extends Component {
  state = {
    account: { username: "", password: "" },
    errors: {},
  };

  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };

  validate = () => {
    const result = Joi.validate(this.state.account, this.schema, {
      abortEarly: false,
    });
    if (!result.error) return null;
    const errors = {};
    for (let item of result.error.details) {
      console.log(item);
      errors[item.path[0]] = item.message;
    }
    return errors;
    // const errors = {};
    // const { account } = this.state;
    // if (account.username.trim() === "")
    //   errors.username = "Username is required";
    // if (account.password.trim() === "")
    //   errors.password = "Password is required";
    // return Object.keys(errors).length === 0 ? null : errors;
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const errors = this.validate();
    console.log(errors);
    this.setState({ errors });
    if (errors) return;

    // const username = this.username.current.value;
    console.log("Submitted");
  };

  validateProperty = ({ name, value }) => {
    // console.log("fromValidateProperty");
    if (name === "username") {
      if (value.trim() === "") return "Username is rquired";
    }
    if (name === "password") {
      if (value.trim() === "") return "Password is rquired";
    }
  };

  handleChange = (e) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(e.currentTarget);
    if (errorMessage) errors[e.currentTarget.name] = errorMessage;
    else delete errors[e.currentTarget.name];
    const account = { ...this.state.account };
    account[e.currentTarget.name] = e.currentTarget.value;
    this.setState({
      account,
      errors,
    });
  };

  render() {
    const { account, errors } = this.state;
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          <Input
            name="username"
            value={account.username}
            label="Username"
            onChange={this.handleChange}
            error={errors.username}
          />
          <Input
            name="password"
            value={account.password}
            label="Password"
            onChange={this.handleChange}
            error={errors.password}
          />
          <button type="submit" className="btn btn-primary m-2">
            Login
          </button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
