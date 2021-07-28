import React from 'react';
import { Table } from 'react-bootstrap';

import SMCService from "../../services/smc_service";

class viewIPO extends React.Component {
    constructor(props) {
        super(props) //since we are extending class Table so we have to use super in order to override Component class constructor

        this.retrieveIpos = this.retrieveIpos.bind(this);
        // this.renderTableData = this.renderTableData.bind(this);
        // this.renderTableHeader = this.renderTableHeader.bind(this);


        this.state = { //state is by default an object
            ipos: []

        }
    }

    componentDidMount() {
        this.retrieveIpos();
    }


    retrieveIpos() {
        SMCService.getAllIpos()
            .then(response => {
                this.setState({
                    ipos: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }


    renderTableData() {
        return this.state.ipos.map((ipo, index) => {
            const { id, compName, pricePerShare, totalNumberOfShares,
                openDateTime, remarks } = ipo //destructuring
            return (
                <tr key={id}>
                    <td>{compName}</td>
                    <td>{pricePerShare}</td>
                    <td>{totalNumberOfShares}</td>
                    <td>{openDateTime}</td>
                    <td>{remarks}</td>
                </tr>
            )
        })
    }


    renderTableHeader() {
        console.log(this.state.ipos);
        return ( <tr>
                <th key={0}>Company Name</th>
                <th key={1}>Price Per Share</th>
                <th key={2}>Total Number of Shares</th>
                <th key={3}>Open Date Time</th>
                <th key={4}>Remarks</th>
                </tr>
        );

    }




    render() {
        return (

            <div style={{
                display: 'inline-block',
                width: 1000,
                margin: 'auto',
                padding: 80,
                textAlign: 'left'
            }}>
                <h2>View IPO Details:</h2>
                <br />
                <Table striped bordered hover variant="dark">
                    <thead>
                        {this.renderTableHeader()}
                    </thead>
                    <tbody>
                        {this.renderTableData()}
                    </tbody>
                </Table>

            </div>
        );
    }
}
export default viewIPO;