import React, { Component } from 'react';
import SMCService from "../services/smc_service";

class SignUp extends Component {

    constructor(props) {

        super(props);
        this.sendCredentials = this.sendCredentials.bind(this);
        this.onChangeInput = this.onChangeInput.bind(this);

        this.state = {
            name: "",
            email: "",
            password: "",
            mobileNumber: "",
            role: "",
            message: ""

        };
    }


    onChangeInput(e) {
        const val = e.target.type === "checkbox" ? e.target.checked : e.target.value;
        this.setState({
            [e.target.name]: val
        });

        console.log(e.target.name, val);
    }


    sendCredentials() {
        var data = {
            email: this.state.email,
            password: this.state.password,
            mobileNumber: this.state.mobileNumber,
            role: this.state.role,
            name: this.state.name
        };

        console.log(data);
        SMCService.signUp(data)
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

                <h2>Sign Up Page</h2>

                <div className="form-group">
                    <label htmlFor="password">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        name="name"
                        id="password"
                        required
                        value={this.state.name}
                        onChange={this.onChangeInput}

                    />
                </div>

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

                <div className="form-group">
                    <label htmlFor="password">Mobile Number</label>
                    <input
                        type="text"
                        className="form-control"
                        name="mobileNumber"
                        id="password"
                        required
                        value={this.state.mobileNumber}
                        onChange={this.onChangeInput}

                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Role</label>
                    <input
                        type="text"
                        className="form-control"
                        name="role"
                        id="password"
                        required
                        value={this.state.role}
                        onChange={this.onChangeInput}

                    />
                </div>

                <button onClick={this.sendCredentials} className="btn btn-primary">
                    Sign Up
                </button>
                <br />
                <a href="/login" class="link-dark">Already Registered? Sign In here</a>
                <br />
                {this.state.message}
            </div>

        );


    }
}

export default SignUp;