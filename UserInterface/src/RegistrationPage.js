import React, { Component } from "react";

export default class RegistrationPage extends Component {
  state = { inputText:'' };
  state = { username:[] };

  handleTextChange = (event) => {
    this.setState({ inputText: event.target.value });
  };

  handleRegister = () => {
    const { inputText } = this.state;
    const { onSave } = this.props;
    onSave(inputText);
  };

// handleRegister = (newuser) => {}
// this.setState(state => ({
// username:[newusername,
// ...state.username,],

// }));
// }

  render() {
    const { inputText } = this.state;
    return (
      <div>
        First Name{" "}
        <input
          type="text"
          value={inputText}
          onChange={this.handleTextChange}
          data-test="firstName"
        />
        <br />
        Last Name{" "}
        <input
          type="text"
          value={inputText}
          onChange={this.handleTextChange}
          data-test="lastName"
        />
        <br />
        Email Id{" "}
        <input
          type="text"
          value={inputText}
          onChange={this.handleTextChange}
          data-test="emailID"
        />
        <br />
        Password{" "}
        <input
          type="text"
          value={inputText}
          onChange={this.handleTextChange}
          data-test="password"
        />
        <br />
        Confirm Password{" "}
        <input
          type="text"
          value={inputText}
          onChange={this.handleTextChange}
          data-test="confirmPassword"
        />
        <br />
        <button data-test="RegisterButton" onSave={this.handleRegister}>
          Register
        </button>
      </div>
    );
  }
}
