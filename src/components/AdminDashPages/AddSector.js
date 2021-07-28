import React, { Component } from 'react';
import SMCService from "../../services/smc_service";

class AddSector extends Component {
    constructor(props) {


        super(props);
        this.sendCredentials = this.sendCredentials.bind(this);
        this.onChangeInput = this.onChangeInput.bind(this);

        this.state = {
            sectorName: "",
            brief: "", 
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
            sectorName: this.state.sectorName,
            brief: this.state.brief
        };
      
        console.log(data);
        SMCService.addNewSector(data)
        .then(response => {
          
            this.setState({
            message: response.data, 
            sectorName: "",
            brief: "",
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

                <h2>Add New Sector</h2>
                <div className="form-group">
                    <label htmlFor="Email">Sector Name</label>
                    <input
                        type="text"
                        className="form-control"
                        name="sectorName"
                        id="email"
                        required
                        value={this.state.sectorName}
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
    
                <br/>

                <div className="form-group">
                <button type="submit" onClick={this.sendCredentials} className="btn btn-primary">
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

export default AddSector;