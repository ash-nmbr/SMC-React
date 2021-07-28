import React, { Component } from 'react';
import SMCService from "../../services/smc_service";

class AddExchange extends Component {
    constructor(props) {


        super(props);
        this.sendCredentials = this.sendCredentials.bind(this);
        this.onChangeInput = this.onChangeInput.bind(this);

        this.state = {
            name: "",
            brief: "",
            contactAddress: "",
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
            name: this.state.name,
            brief: this.state.brief,
            contactAddress: this.state.contactAddress,
        };
      
        console.log(data);
        SMCService.addNewExchange(data)
        .then(response => {
          
            this.setState({
            message: response.data, 
            name: "",
            brief: "",
            contactAddress: ""
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

                <h2>Add New Stock Exchange</h2>
                <div className="form-group">
                    <label htmlFor="Email">Stock Exchange Name</label>
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
                    <label htmlFor="Email">Brief</label>
                    <input
                        type="text"
                        className="form-control"
                        name="brief"
                        id="email"
                        required
                        value={this.state.brief}
                        onChange={this.onChangeInput}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="Email">Contact Address</label>
                    <input
                        type="text"
                        className="form-control"
                        name="contactAddress"
                        id="email"
                        required
                        value={this.state.contactAddress}
                        onChange={this.onChangeInput}
                    />
                </div>

                
                <br/>

                <div className="form-group">
                <button type="submit" onClick={this.sendCredentials} className="btn btn-primary">
                    Save
                </button>
                </div>

                <div className="form-group">
                <label htmlFor="Email">{this.state.message ? "Stock Exchange "+this.state.message.name + " has been added":""}</label>
                </div>
            </div>

        );
    }


}

export default AddExchange;