import React, { Component } from 'react';
import SMCService from "../../services/smc_service";

class CreateNewCompany extends Component {
    constructor(props) {


        super(props);
        this.sendCredentials = this.sendCredentials.bind(this);
        this.onChangeInput = this.onChangeInput.bind(this);

        this.state = {
            name: "",
            companyBrief: "",
            turnover: "",
            ceo: "",
            boardOfDirectors: "",
            sectorName: "",
            code: "", 
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
            companyBrief: this.state.companyBrief,
            turnover: this.state.turnover,
            ceo: this.state.ceo,
            boardOfDirectors: this.state.boardOfDirectors,
            sectorName: this.state.sectorName,
            code: this.state.code
        };
      
        console.log(data);
        SMCService.addCompany(data)
        .then(response => {
          
            this.setState({
            message: response.data, 
            name: "",
            companyBrief: "",
            turnover: "",
            ceo: "",
            boardOfDirectors: "",
            sectorName: "",
            code: ""
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

                <h2>Add New Company</h2>
                <div className="form-group">
                    <label htmlFor="Email">Company Name</label>
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
                    <label htmlFor="Email">Company Code</label>
                    <input
                        type="text"
                        className="form-control"
                        name="code"
                        id="email"
                        required
                        value={this.state.code}
                        onChange={this.onChangeInput}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="Email">Company CEO</label>
                    <input
                        type="text"
                        className="form-control"
                        name="ceo"
                        id="email"
                        required
                        value={this.state.ceo}
                        onChange={this.onChangeInput}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="Email">Sector</label>
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
                    <label htmlFor="Email">Board of Directors</label>
                    <input
                        type="text"
                        className="form-control"
                        name="boardOfDirectors"
                        id="email"
                        required
                        value={this.state.boardOfDirectors}
                        onChange={this.onChangeInput}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="Email">Turnover</label>
                    <input
                        type="number"
                        className="form-control"
                        name="turnover"
                        id="email"
                        required
                        value={this.state.turnover}
                        onChange={this.onChangeInput}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="Email">Brief Description</label>
                    <input
                        type="text"
                        className="form-control"
                        name="companyBrief"
                        id="email"
                        required
                        value={this.state.companyBrief}
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
                <label htmlFor="Email">{this.state.message ? "Company "+this.state.message.name + " has been added":""}</label>
                </div>
            </div>

        );
    }
}

export default CreateNewCompany;