import React, { Component } from 'react';
import SMCService from "../../services/smc_service";

class UpdateExchange extends Component {
    constructor(props) {


        super(props);
        this.updateCredentials = this.updateCredentials.bind(this);
        this.onChangeInput = this.onChangeInput.bind(this);
        this.getExchange = this.getExchange.bind(this);


        this.state = {
            name: this.props.match.params.id,
            brief: "",
            contactAddress: "",
            message: ""

        };
    }

    componentDidMount() {
        this.getExchange(this.props.match.params.id);
    }

    getExchange(name) {
        SMCService.findByExchangeName(name)
            .then(response => {
                this.setState({
                    brief: response.data[0].brief,
                    contactAddress: response.data[0].contactAddress,

                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    onChangeInput(e) {
        const val = e.target.name === "name" ? this.props.match.params.id : e.target.value;
        this.setState({

            [e.target.name]: val
        });
        console.log(e.target.name, val);

    }

    updateCredentials() {

        var data = {
            name: this.state.name,
            brief: this.state.brief,
            contactAddress: this.state.contactAddress,

        };
      
        console.log(data);
        SMCService.updateExchange(data)
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

                <h2>Update Exchange Details</h2>
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
                    <label htmlFor="Email">contact Address</label>
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

                <br />

                <div className="form-group">
                    <button type="submit" onClick={this.updateCredentials} className="btn btn-primary">
                        Save
                    </button>
                </div>

                <div className="form-group">
                    <label htmlFor="Email">{this.state.message ? "Stock Exchange " + this.state.message + " has been updated":""}</label>
                </div>
            </div>
        );
    }


}

export default UpdateExchange;