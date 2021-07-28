import React, { Component } from 'react';
import SMCService from "../../services/smc_service";


class AddIPO extends Component {
    constructor(props) {


        super(props);
        this.sendCredentials = this.sendCredentials.bind(this);
        this.onChangeInput = this.onChangeInput.bind(this);

        this.state = {
            compCode: "",
            openDateTime: "",
            remarks: "",
            pricePerShare: "",
            totalNumberOfShares: "",
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
            compCode: this.state.compCode,
            openDateTime: this.state.openDateTime,
            remarks: this.state.remarks,
            pricePerShare: this.state.pricePerShare,
            totalNumberOfShares: this.state.totalNumberOfShares,
        };
      
        console.log(data);
        SMCService.addOrUpdateIpo(data)
        .then(response => {
          
            this.setState({
            message: response.data, 
            compCode: "",
            openDateTime: "",
            remarks: "",
            pricePerShare: "",
            totalNumberOfShares: "",
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

                <h2>Add/Update IPO</h2>
                <div className="form-group">
                    <label htmlFor="Email">Company Code</label>
                    <input
                        type="text"
                        className="form-control"
                        name="compCode"
                        id="email"
                        required
                        value={this.state.compCode}
                        onChange={this.onChangeInput}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="Email">Price Per Share</label>
                    <input
                        type="number"
                        className="form-control"
                        name="pricePerShare"
                        id="email"
                        required
                        value={this.state.pricePerShare}
                        onChange={this.onChangeInput}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="Email">Total Number of Shares</label>
                    <input
                        type="number"
                        className="form-control"
                        name="totalNumberOfShares"
                        id="email"
                        required
                        value={this.state.totalNumberOfShares}
                        onChange={this.onChangeInput}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="Email">Open Date Time</label>
                    <input
                        type="datetime-local"
                        className="form-control"
                        name="openDateTime"
                        id="email"
                        required
                        value={this.state.openDateTime}
                        onChange={this.onChangeInput}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="Email">Remarks</label>
                    <input
                        type="text"
                        className="form-control"
                        name="remarks"
                        id="email"
                        required
                        value={this.state.remarks}
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

export default AddIPO;