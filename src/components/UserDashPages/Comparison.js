/* eslint-disable no-unused-vars */
import React from 'react';
import { Form, Row, Col, Button, Collapse } from 'react-bootstrap';
import ReactFC from "react-fusioncharts";
import FusionCharts from "fusioncharts";
import Column2D from "fusioncharts/fusioncharts.charts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";

import SMCService from "../../services/smc_service";

ReactFC.fcRoot(FusionCharts, Column2D, FusionTheme);

class Comparison extends React.Component {
    constructor(props) {
        super(props);
        this.sendCredentials = this.sendCredentials.bind(this);
        this.onChangeInput = this.onChangeInput.bind(this);
        this.retrieveCompanies = this.retrieveCompanies.bind(this);
        this.retrieveSectors = this.retrieveSectors.bind(this);
        this.retrieveExchanges = this.retrieveExchanges.bind(this);


        this.chartData = [
            {
                label: "Venezuela",
                value: "290"
            },
            {
                label: "Saudi",
                value: "260"
            },
            {
                label: "Canada",
                value: "180"
            },
            {
                label: "Iran",
                value: "140"
            },
            {
                label: "Russia",
                value: "115"
            },
            {
                label: "UAE",
                value: "100"
            },
            {
                label: "US",
                value: "30"
            },
            {
                label: "China",
                value: "30"
            }
        ];

        this.chartConfigs = {
            type: "column2d",
            width: "700",
            height: "400",
            dataFormat: "json",
            dataSource: {

                chart: {
                    caption: "Countries With Most Oil Reserves [2017-18]",
                    subCaption: "In MMbbl = One Million barrels",
                    xAxisName: "Country",
                    yAxisName: "Reserves (MMbbl)",
                    numberSuffix: "",
                    theme: "fusion"
                },
                data: this.chartData
            }
        };

        this.state = {
            companyname1: "", 
            companyname2: "",
            companies: [],
            sectors: [],
            open: false,
            name1: "",   //company name
            name2: "",    //company name
            exchangename: "",
            from: "",
            to: "",
            chartConfigs: this.chartConfigs,
            chartConfigs1: "",
            chartConfigs2: "",
            chartConfigs3: ""
        }

    }

    componentDidMount() {
        this.retrieveCompanies();
        this.retrieveSectors();
        this.retrieveExchanges();
    }

    retrieveCompanies() {
        SMCService.getAllCompanies()
            .then(response => {
                this.setState({
                    companies: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    retrieveSectors() {
        SMCService.getAllSectors()
            .then(response => {
                this.setState({
                    sectors: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    retrieveExchanges() {
        SMCService.getAllExchanges()
            .then(response => {
                this.setState({
                    exchanges: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }



    onChangeInput(e) {
        const val = e.target.type === "checkbox" ? e.target.checked : e.target.value;
        this.setState({

            [e.target.name]: val
        });
        console.log(e.target.name, val);

    }

    sendCredentials() {
        console.log("hello");

        var data1 = {
            name: this.state.name1,
            exchangename: this.state.exchangename,
            from: this.state.from,
            to: this.state.to
        };

        var data2 = {
            name: this.state.name2,
            exchangename: this.state.exchangename,
            from: this.state.from,
            to: this.state.to
        };

        var data3 = {
            name: this.state.sector1,
            exchangename: this.state.exchangename,
            from: this.state.from,
            to: this.state.to
        };

        var data4 = {
            name: this.state.sector2,
            exchangename: this.state.exchangename,
            from: this.state.from,
            to: this.state.to
        };


        SMCService.getCompanyStockDetails(data1)
            .then(response => {
                this.setState({
                    chartConfigs1: {
                        type: "column2d",
                        width: "700",
                        height: "400",
                        dataFormat: "json",
                        dataSource: {

                            chart: {
                                caption: "Bar Plot Stats of Company " + this.state.name1,
                                subCaption: "",
                                xAxisName: "Stats",
                                yAxisName: "Prcies (Rs.)",
                                numberSuffix: "",
                                theme: "fusion"
                            },
                            data: response.data
                        }
                    }


                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });



        SMCService.getCompanyStockDetails(data2)
            .then(response => {
                this.setState({


                    chartConfigs2: {
                        type: "column2d",
                        width: "700",
                        height: "400",
                        dataFormat: "json",
                        dataSource: {

                            chart: {
                                caption: "Bar Plot Stats of Company " + this.state.name2,
                                subCaption: "",
                                xAxisName: "Stats",
                                yAxisName: "Prcies (Rs.)",
                                numberSuffix: "",
                                theme: "fusion"
                            },
                            data: response.data
                        }
                    }


                });
                console.log(response.data);

            })
            .catch(e => {
                console.log(e);
            });


        SMCService.getSectorStockDetails(data3)
            .then(response => {
                this.setState({


                    chartConfigs3: {
                        type: "column2d",
                        width: "700",
                        height: "400",
                        dataFormat: "json",
                        dataSource: {

                            chart: {
                                caption: "Bar Plot Stats of Sector " + this.state.sector1,
                                subCaption: "",
                                xAxisName: "Stats",
                                yAxisName: "Prcies (Rs.)",
                                numberSuffix: "",
                                theme: "fusion"
                            },
                            data: response.data
                        }
                    }


                });
                console.log(response.data);

            })
            .catch(e => {
                console.log(e);
            });



        SMCService.getSectorStockDetails(data4)
            .then(response => {
                this.setState({

                    chartConfigs4: {
                        type: "column2d",
                        width: "700",
                        height: "400",
                        dataFormat: "json",
                        dataSource: {

                            chart: {
                                caption: "Bar Plot Stats of Sector " + this.state.sector2,
                                subCaption: "",
                                xAxisName: "Stats",
                                yAxisName: "Prcies (Rs.)",
                                numberSuffix: "",
                                theme: "fusion"
                            },
                            data: response.data
                        }
                    }


                });
                console.log(response.data);

            })
            .catch(e => {
                console.log(e);
            });



    }



    render() {

        return (
            <div>
                <Form style={{
                    display: 'inline-block',
                    width: 700,
                    margin: 'auto',
                    padding: 25,
                    textAlign: 'left'
                }}>
                    <h2>Compare Companies/sectors</h2>
                    <Form.Group className="mb-3" controlId="comparison">
                        <Form.Label>Select a company: </Form.Label>

                        <select name="name1" onChange={this.onChangeInput} class="form-select" aria-label="Default select example">
                            <option selected>Open to select </option>
                            {this.state.companies &&
                                this.state.companies.map((company, index) => (
                                    <option
                                        key={index} value={company.code}
                                    >
                                        {company.name + " (" + company.code  +")"}
                                    </option>
                                ))}
                        </select>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="comparison">
                        <Form.Label>Select a sector: </Form.Label>

                        <select name="sector1" onChange={this.onChangeInput} class="form-select" aria-label="Default select example">
                            <option selected>Open to select </option>
                            {this.state.sectors &&
                                this.state.sectors.map((sector, index) => (
                                    <option
                                        key={index} value={sector.sectorName}
                                    >
                                        {sector.sectorName}
                                    </option>
                                ))}
                        </select>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="comparison">
                        <Form.Label>Select a stock exchange: </Form.Label>

                        <select name="exchangename" onChange={this.onChangeInput} class="form-select" aria-label="Default select example">
                            <option selected>Open to select </option>
                            {this.state.exchanges &&
                                this.state.exchanges.map((exchange, index) => (
                                    <option
                                        key={index} value={exchange.name}
                                    >
                                        {exchange.name}
                                    </option>
                                ))}
                        </select>

                    </Form.Group>
                    {/* <Form.Group className="mb-3" controlId="comparison">
                    <Form.Label>Company Name:</Form.Label> 
                    <Form.Control onChange={this.onChangeInput} placeholder="Enter Company Name" type="text" />   
                </Form.Group>  */}
                    <Form.Group className="mb-3" controlId="comparison">
                        <Row>
                            <Col>
                                <Form.Label>From Period:</Form.Label>
                                <Form.Control name="from" onChange={this.onChangeInput} placeholder="From Date" type="Date" />
                            </Col>
                            <Col>
                                <Form.Label>To Period:</Form.Label>
                                <Form.Control name="to" onChange={this.onChangeInput} placeholder="To Date" type="Date" />
                            </Col>
                        </Row>
                    </Form.Group>
                    {/* <Form.Group className="mb-3" controlId="comparison">
                    <Form.Label>Specific Periodicity: </Form.Label>
                    <Form.Control onChange={this.onChangeInput} placeholder="Specific Periodicity" type="text"/>
                </Form.Group> */}
                    <Form.Group className="mb-3" controlId="comparison">
                        <Button
                            onClick={() => this.setState({ open: !this.state.open })}
                            aria-controls="example-collapse-text"
                            aria-expanded={this.state.open}>
                            Add Another Company (+)
                        </Button>
                        <br />
                        <br />
                        <Collapse in={this.state.open}>
                            <div id="example-collapse-text">
                                {/* <Form.Group className="mb-3" controlId="comparison">
                        <br />
                        <Form.Label>Company Details:</Form.Label> 
                        <Form.Control onChange={this.onChangeInput} placeholder="Enter Company Name" type="text-area" />   
                    </Form.Group> */}
                                <Form.Group className="mb-3" controlId="comparison">
                                    <Form.Label>Select Another Company:</Form.Label>
                                    <select name="name2" onChange={this.onChangeInput} class="form-select" aria-label="Default select example">
                                        <option selected>Open to select </option>
                                        {this.state.companies &&
                                            this.state.companies.map((company, index) => (
                                                <option
                                                    key={index} value={company.code}
                                                >
                                                    {company.name + " (" + company.code  +")"}
                                                </option>
                                            ))}
                                    </select>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="comparison">
                                    <Form.Label>Select Another sector: </Form.Label>
                                    <select name="sector2" onChange={this.onChangeInput} class="form-select" aria-label="Default select example">
                                        <option selected>Open to select </option>
                                        {this.state.sectors &&
                                            this.state.sectors.map((sector, index) => (
                                                <option
                                                    key={index} value={sector.sectorName}
                                                >
                                                    {sector.sectorName}
                                                </option>
                                            ))}
                                    </select>
                                </Form.Group>

                            </div>
                        </Collapse>
                    </Form.Group>
                    <Button onClick={this.sendCredentials}  >Generate Map</Button>
                </Form>
                <br />
                <br />
                <div>
                    <ReactFC {...this.state.chartConfigs1} />
                    <ReactFC {...this.state.chartConfigs2} />
                    <ReactFC {...this.state.chartConfigs3} />
                    <ReactFC {...this.state.chartConfigs4} />
                </div>
            </div>
        )
    }
}
export default Comparison;