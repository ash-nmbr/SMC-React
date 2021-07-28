import React, { Component } from 'react';
import { ExcelRenderer, OutTable } from 'react-excel-renderer';
import SMCService from "../../services/smc_service";


class ImportData extends Component {
    constructor(props) {

        super(props);
        this.fileHandler = this.fileHandler.bind(this);
        this.sendExcelData = this.sendExcelData.bind(this);

        this.state = {
            rows: "",
            cols: "", 
            message: ""
        };
    }


    sendExcelData() {

        var data = {
            rows: this.state.rows,
            cols: this.state.cols,
          };

          console.log(data.rows);

          for (var i = 1; i < data.rows.length; i++)
          {
              for (var j = 0; j < data.cols.length; j++)
              {
                  data.rows[i][j] = String(data.rows[i][j])
              }
          }

          console.log(data.rows);

          SMCService.addExcel(data.rows)
            .then(response => {
              this.setState({
                message: response.data
              });
              console.log(response.data);
            })
            .catch(e => {
              console.log(e);
            });

    }

    fileHandler(e) {
        console.log("hey");
        let fileObj = e.target.files[0];
        ExcelRenderer(fileObj, (err, resp) => {

            if (err) {
                console.log(err);
            }
            else {
                this.setState({
                    rows: resp.rows,
                    cols: resp.cols
                });
            }

        });
    }



    render() {

        return (

            <div className="form-group">

                <label htmlFor="exampleFormControlFile1">Upload Excel</label>
                <br />
                <input
                    type="file"
                    className="form-control-file"
                    name="file"
                    id="email"
                    required
                    onChange={this.fileHandler}
                />
                <div className="form-group">
                {this.state.rows && 
                <OutTable data={this.state.rows}
                    columns={this.state.cols}
                    tableClassName="ExcelTable2007"
                    tableHeaderRowClass="heading" />}
                </div>

                <div className="form-group">
                <button type="submit" onClick={this.sendExcelData} className="btn btn-primary">
                    Upload
                </button>
                </div>

                
                <div className="col-md-6">
              {this.state.message ? (
                <div class="card"> 
                  <h4 class="card-header">Company Details</h4>
                  <div class="card-body">
                  <div>
                    <label>
                      <strong>Company Name:</strong>
                    </label>{" "}
                    {this.state.message.companyname}
                  </div>
                  <div>
                    <label>
                      <strong>Exchange Name:</strong>
                    </label>{" "}
                    {this.state.message.exchangename}
                  </div>
                  <div>
                    <label>
                      <strong>No. of Records Imported:</strong>
                    </label>{" "}
                    {this.state.message.records}
                  </div>
                  <div>
                    <label>
                      <strong>From Date:</strong>
                    </label>{" "}
                    {this.state.message.fromdate}
                  </div>
                  <div>
                    <label>
                      <strong>To Date:</strong>
                    </label>{" "}
                    {this.state.message.todate}
                  </div>

                  </div>
                </div>
              ) : (
                <div>
                  <br />
                  <p>Summary will show once you upload excel file...</p>
                </div>
              )}
            </div>

                
            </div>

        );
    }
}

export default ImportData;