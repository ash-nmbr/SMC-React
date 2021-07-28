import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import SMCService from "../../services/smc_service";

class ManageIPOS extends Component {
    constructor(props) {
        super(props);
        this.onChangeSearchIpo = this.onChangeSearchIpo.bind(this);
        this.retrieveIpos = this.retrieveIpos.bind(this);
        this.refreshList = this.refreshList.bind(this);
        // this.setActiveTutorial = this.setActiveTutorial.bind(this);
        // this.removeAllTutorials = this.removeAllTutorials.bind(this);
        this.searchIpo = this.searchIpo.bind(this);
        this.DeleteIpo = this.DeleteIpo.bind(this);

        
        this.state = {
          ipos: [],
          currentIpo: null,
          currentIndex: -1,
          searchIpo: ""
        };
      }


      componentDidMount() {
        this.retrieveIpos();
      }
    
      onChangeSearchIpo(e) {
        const searchIpo = e.target.value;
    
        this.setState({
            searchIpo: searchIpo
        });
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
    
      refreshList() {
        this.retrieveIpos();
        this.setState({
          currentIpo: null,
          currentIndex: -1
        });
      }
    
      setActiveIpo(ipo, index) {
        this.setState({
          currentIpo: ipo,
          currentIndex: index
        });
      }
    
      redirectToAddNewIpo() {
        this.props.history.push("/addIPO");
      }
    
      searchIpo() {
        this.setState({
          currentIpo: null,
          currentIndex: -1
        });
    
        SMCService.getCompanyIPODetails(this.state.searchIpo)
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

      DeleteIpo() {
        console.log(this.state.currentIpo.id);

        // SMCService.deleteCompany(this.state.currentCompany.id)
        // .then(response => {
        //   this.setState({
        //     // companies: response.data
        //   });
        //   console.log(response.data);
        // })
        // .catch(e => {
        //   console.log(e);
        // });

        this.refreshList();
      }



      render() {
        const { searchIpo, ipos, currentIpo, currentIndex } = this.state;
    
        return (
          <div className="list row">
            <div className="col-md-8">
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search by Company Code"
                  value={searchIpo}
                  onChange={this.onChangeSearchIpo}
                />
                <div className="input-group-append">
                  <button
                    className="btn btn-outline-secondary"
                    type="button"
                    onClick={this.searchIpo}
                  >
                    Search
                  </button>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <h4>IPO List</h4>
    
              <ul className="list-group">
                {ipos &&
                  ipos.map((ipo, index) => (
                    <li
                      className={
                        "list-group-item " +
                        (index === currentIndex ? "active" : "")
                      }
                      onClick={() => this.setActiveIpo(ipo, index)} //this kinda arrow function is only required when passing params
                      key={index}
                    >
                      {"IPO of " + ipo.compName}
                    </li>
                  ))}
              </ul>
    
              <button
                className="m-3 btn btn-sm btn-danger"
                onClick={() => this.redirectToAddNewIpo()}
              >
                Add New IPO
              </button>
            </div>
            <div className="col-md-6">
              {currentIndex !== -1 ? (
                <div class="card"> 
                  <h4 class="card-header">IPO Details</h4>
                  <div class="card-body">
                  <div>
                    <label>
                      <strong>Company Name:</strong>
                    </label>{" "}
                    {currentIpo.compName}
                  </div>
                  <div>
                    <label>
                      <strong>Company Code:</strong>
                    </label>{" "}
                    {currentIpo.compCode}
                  </div>
                  <div>
                    <label>
                      <strong>Price per Share:</strong>
                    </label>{" "}
                    {currentIpo.pricePerShare}
                  </div>
                  <div>
                    <label>
                      <strong>Total Number of Shares:</strong>
                    </label>{" "}
                    {currentIpo.totalNumberOfShares}
                  </div>
                  <div>
                    <label>
                      <strong>Remarks:</strong>
                    </label>{" "}
                    {currentIpo.remarks}
                  </div>
                  <div>
                    <label>
                      <strong>Open Date Time:</strong>
                    </label>{" "}
                    {currentIpo.openDateTime}
                  </div>
    
                  {/* <Link
                    to={"/updateIPO/" + currentIpo.id}
                    className="link-dark"
                  >
                    Update IPO Details
                  </Link>
                  <br/>
                  <Link
                    onClick={this.DeleteIpo}
                    className="link-dark"
                  >
                    Delete IPO
                  </Link> */}
                  </div>
                </div>
              ) : (
                <div>
                  <br />
                  <p>Please click on a IPO for more Info...</p>
                </div>
              )}
            </div>
          </div>
        );
      }
}

export default ManageIPOS;