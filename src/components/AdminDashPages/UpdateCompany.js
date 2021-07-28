import React, { Component } from 'react';
import SMCService from "../../services/smc_service";

class UpdateCompany extends Component {
    constructor(props) {


        super(props);
        this.updateCredentials = this.updateCredentials.bind(this);
        this.onChangeInput = this.onChangeInput.bind(this);
        this.getCompany = this.getCompany.bind(this);


        this.state = {
            name: "",
            companyBrief: "",
            turnover: "",
            ceo: "",
            boardOfDirectors: "",
            sectorName: "",
            code: this.props.match.params.id,
            message: ""

        };
    }

    componentDidMount() {
        this.getCompany(this.props.match.params.id);
    }

    getCompany(code) {
        SMCService.getCompanyByCode(code)
            .then(response => {
                this.setState({
                    name: response.data.name,
                    companyBrief: response.data.companyBrief,
                    turnover: response.data.turnover,
                    ceo: response.data.ceo,
                    boardOfDirectors: response.data.boardOfDirectors,
                    sectorName: response.data.sectorName

                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    onChangeInput(e) {
        const val = e.target.name === "code" ? this.props.match.params.id : e.target.value;
        this.setState({

            [e.target.name]: val
        });
        console.log(e.target.name, val);

    }

    updateCredentials() {

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
        SMCService.updateCompany(data)
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

                <h2>Update Company Details</h2>
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
                <br />

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

export default UpdateCompany;