import React, { Component } from 'react';
import SMCService from "../services/smc_service";

class Login extends Component {

  constructor(props) {

    super(props);
    this.sendCredentials = this.sendCredentials.bind(this);
    this.onChangeInput = this.onChangeInput.bind(this);

    this.state = {
      email: "",
      password: "",
      admin: false,
      message: "", 
      sports: [
        "Baseball",
        "Basketball",
        "Cricket",
        "Field Hockey",
        "Football",
        "Table Tennis",
        "Tennis",
        "Volleyball"
      ]

    };
  }


  onChangeInput(e) {
    const val = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    this.setState({

      [e.target.name]: val
    });
    console.log(e.target.name, val)

  }


  sendCredentials() {
    var data = {
      email: this.state.email,
      password: this.state.password,
      admin: this.state.admin
    };

    console.log(data);
    SMCService.login(data)
      .then(response => {
        this.setState({
          message: response.data
        });
        console.log(response.data);

        if (response.data == "admin") {
          this.props.history.push({
            pathname: "/adminDash",
            state: {
              key: this.state.email
            }

          });

        }
        else if (response.data == "user") {
          this.props.history.push({
            pathname: "/userDash",
            state: {
              key: this.state.email
            }

          });
        }

      })
      .catch(e => {
        console.log(e);
      });



  }


  render() {

    return (

      <div className="container mt-3">

        <h2>Sign In Page</h2>
        <div className="form-group">
          <label htmlFor="Email">Email ID</label>
          <input
            type="text"
            className="form-control"
            name="email"
            id="email"
            required
            value={this.state.email}
            onChange={this.onChangeInput}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            name="password"
            id="password"
            required
            value={this.state.password}
            onChange={this.onChangeInput}

          />
        </div>

        <div className="form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="admin"
            name="admin"
            required
            checked={this.state.admin}
            onChange={this.onChangeInput}

          />
          <label htmlFor="Published">Admin</label>
        </div>

        <button onClick={this.sendCredentials} className="btn btn-primary">
          Sign In
        </button>
        <br />
        <a href="/signup" class="link-dark">New User? Sign Up here</a>
        <br />

        {this.state.message}


      </div>

    );


  }
}

export default Login;