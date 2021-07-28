import React, { Component } from 'react';
import SMCService from "../../services/smc_service";

class UpdateProfile extends Component {
    constructor(props) {


        super(props);
        this.updateCredentials = this.updateCredentials.bind(this);
        this.onChangeInput = this.onChangeInput.bind(this);
        this.getUser = this.getUser.bind(this);


        this.state = {
            name: "",
            email: this.props.data,
            mobileNumber: "",
            password: "", 
            role: ""
        };
    }


    componentDidMount() {
        this.getUser(this.props.data);
    }

    getUser(email) {
        SMCService.getUserByEmail(email)
            .then(response => {
                this.setState({
                    name: response.data.name,
                    mobileNumber: response.data.mobileNumber,
                    password: response.data.password, 
                    role: response.data.role

                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    onChangeInput(e) {
        const val = e.target.name === "email" ? this.props.data : e.target.value;
        this.setState({

            [e.target.name]: val
        });
        console.log(e.target.name, val);

    }

    updateCredentials() {

        var data = {
            name: this.state.name,
            email: this.state.email,
            mobileNumber: this.state.mobileNumber,
            password: this.state.password, 
            role: this.state.role
        };
      
        console.log(data);
        SMCService.updateUser(data)
        .then(response => {
          
            this.setState({
            message: response.data, 
            name: "",
            email: "", 
            mobileNumber: "",
            password: "",
            role: ""
          });

          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
        
    }

    render() {
        return (

            <div className="form-group">

                <h2>Update User Details</h2>
                <div className="form-group">
                    <label htmlFor="Email">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        name="name"
                        id="email"
                        required
                        value={this.state.name}
                        onChange={this.onChangeInput}
                    />
                </div>
                
                <div className="form-group">
                    <label htmlFor="Email">Email</label>
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
                    <label htmlFor="Email">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        name="password"
                        id="email"
                        required
                        value={this.state.password}
                        onChange={this.onChangeInput}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="Email">Mobile Number</label>
                    <input
                        type="text"
                        className="form-control"
                        name="mobileNumber"
                        id="email"
                        required
                        value={this.state.mobileNumber}
                        onChange={this.onChangeInput}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="Email">Role</label>
                    <input
                        type="text"
                        className="form-control"
                        name="role"
                        id="email"
                        required
                        value={this.state.role}
                        onChange={this.onChangeInput}
                    />
                </div>
    
                <br/>

                <div className="form-group">
                <button type="submit" onClick={this.updateCredentials} className="btn btn-primary">
                    Save
                </button>
                </div>

                <div className="form-group">
                <label htmlFor="Email">{this.state.message}</label>
                </div>
            </div>

        );
    }
    
}

export default UpdateProfile;