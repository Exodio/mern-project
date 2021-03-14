import React, { Component } from 'react';

import { connect } from "react-redux";

import { registerUser } from "../actions/user_actions";

class Register extends Component {
  state = {
    lastName: "",
    name: "",
    email: "",
    password: "",
    passwordConfirmation: "",
    errors: [],
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  displayErrors = (errors) => errors.map((err, i) => <p key={i}>{err}</p>);

  isFormValid = () => {
    let errors = [];
    let error;

    if (this.isFormEmpty(this.state)) {
      error = { message: "Please fill in all fields" };
      this.setState({ errors: errors.concat(error) });
    } else if (!this.isPasswordValid(this.state)) {
      error = { message: "Password is invalid" };
      this.setState({ errors: errors.concat(error) });
    } else if (!this.isEmailValid(this.state)) {
      error = { message: "Email is invalid" };
      this.setState({ errors: errors.concat(error) });
    }
    else {
      return true;
    }
  }

  isPasswordValid = ({ password, passwordConfirmation }) => {
    if (password.length < 6 || passwordConfirmation.length < 6) {
      return false;
    } else if (password !== passwordConfirmation) {
      return false;
    } else {
      return true;
    }
  }

  isEmailValid = ({ email }) => {
    let validationString = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (validationString.test(email)) {
      return true;
    } else {
      return false;
    }
  }

  isFormEmpty = ({ name, lastName, email, password, passwordConfirmation }) => {
    return (
      !name.length ||
      !lastName.length ||
      !email.length ||
      !password.length ||
      !passwordConfirmation.length
    );
  }

  submitForm = (event) => {
    event.preventDefault();

    let dataToSubmit = {
      email: this.state.email,
      name: this.state.name,
      lastName: this.state.lastName,
      password: this.state.password,
      passwordConfirmation: this.state.passwordConfirmation,
    };

    if (this.isFormValid(this.state)) {
      this.setState({ errors: [] });

      this.props
        .dispatch(registerUser(dataToSubmit))
        .then((response) => {
          console.log(response);

          if (response.payload.success) {
            this.props.history.push("/login");
          } else {
            this.setState({
              errors: this.state.errors.concat(
                "Failed to register, please check in your field forms!"
              ),
            });
          }
        })
        .catch((err) => {
          this.setState({
            errors: this.state.errors.concat(err),
          });
        });

    } else {
      this.setState({
        errors: this.state.errors.concat(
          "Invalid data, please check your input fields!"
        ),
      });
    }
  }

  render() {
    return (
      <div className="container">
        <h2>Sign Up</h2>
        <div className="row">
          <form className="col s12">

          <div className="row">
              <div className="input-field col s12">
                <input
                  name="name"
                  value={this.state.name}
                  onChange={(e) => this.handleChange(e)}
                  id="name"
                  type="text"
                  className="validate"
                />

                <label className="active" htmlFor="email">
                  First Name
                </label>
                <span
                  className="helper-text"
                  data-error="wrong"
                  data-success="right"
                />
              </div>
            </div>

            <div className="row">
              <div className="input-field col s12">
                <input
                  name="lastName"
                  value={this.state.lastName}
                  onChange={(e) => this.handleChange(e)}
                  id="lastName"
                  type="text"
                  className="validate"
                />

                <label className="active" htmlFor="email">
                  Last Name
                </label>
                <span
                  className="helper-text"
                  data-error="wrong"
                  data-success="right"
                />
              </div>
            </div>

            <div className="row">
              <div className="input-field col s12">
                <input
                  name="email"
                  value={this.state.email}
                  onChange={(e) => this.handleChange(e)}
                  id="email"
                  type="text"
                  className="validate"
                />

                <label className="active" htmlFor="email">
                  Email
                </label>
                <span
                  className="helper-text"
                  data-error="wrong"
                  data-success="right"
                />
              </div>
            </div>

            <div className="row">
              <div className="input-field col s12">
                <input
                  name="password"
                  onChange={(e) => this.handleChange(e)}
                  value={this.state.password}
                  id="password"
                  type="password"
                  className="validate"
                />
                <label className="active" for="password">
                  Password
                </label>
              </div>
            </div>

            <div className="row">
              <div className="input-field col s12">
                <input
                  name="passwordConfirmation"
                  onChange={(e) => this.handleChange(e)}
                  value={this.state.passwordConfirmation}
                  id="passwordConfirmation"
                  type="password"
                  className="validate"
                />
                <label className="active" for="passwordConfirmation">
                  Password Confirmation
                </label>
              </div>
            </div>

            {this.state.errors.length > 0 && (
              <div>{this.displayErrors(this.state.errors)}</div>
            )}

            <div className="row">
              <div className="col s12">
                <button
                  className="btn waves-effect red lighten-2"
                  type="submit"
                  name="action"
                  onClick={this.submitForm}
                >
                  Create an account
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default connect()(Register);