import React, { Component } from 'react';
import SMCService from "../../services/smc_service";

class UpdateSector extends Component {
    constructor(props) {


        super(props);
        this.updateCredentials = this.updateCredentials.bind(this);
        this.onChangeInput = this.onChangeInput.bind(this);
        this.getSector = this.getSector.bind(this);


        this.state = {
            sectorName: this.props.match.params.id,
            brief: "", 
            message: ""
        };
    }


    componentDidMount() {
        this.getSector(this.props.match.params.id);
    }

    getSector(name) {
        SMCService.findSectorByName(name)
            .then(response => {
                this.setState({
                    brief: response.data.brief,
                    sectorName: response.data.sectorName,

                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    onChangeInput(e) {
        const val = e.target.name === "sectorName" ? this.props.match.params.id : e.target.value;
        this.setState({

            [e.target.name]: val
        });
        console.log(e.target.name, val);

    }

    updateCredentials() {

        var data = {
            sectorName: this.state.sectorName,
            brief: this.state.brief
        };
      
        console.log(data);
        SMCService.updateSector(data)
        .then(response => {
          
            this.setState({
            message: response.data, 
            sectorName: "",
            brief: ""
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

                <h2>Update Sector</h2>
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

export default UpdateSector;