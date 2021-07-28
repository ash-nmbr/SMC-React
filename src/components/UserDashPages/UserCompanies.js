import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import SMCService from "../../services/smc_service";

class UserCompanies extends Component {
    constructor(props) {
        super(props);
        this.onChangeSearchCompany = this.onChangeSearchCompany.bind(this);
        this.retrieveCompanies = this.retrieveCompanies.bind(this);
        this.refreshList = this.refreshList.bind(this);
        // this.setActiveTutorial = this.setActiveTutorial.bind(this);
        // this.removeAllTutorials = this.removeAllTutorials.bind(this);
        this.searchCompany = this.searchCompany.bind(this);
        this.DeleteCompany = this.DeleteCompany.bind(this);

        
        this.state = {
          companies: [],
          currentCompany: null,
          currentIndex: -1,
          searchCompany: ""
        };
      }


      componentDidMount() {
        this.retrieveCompanies();
      }
    
      onChangeSearchCompany(e) {
        const searchCompany = e.target.value;
    
        this.setState({
          searchCompany: searchCompany
        });
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
    
      refreshList() {
        this.retrieveCompanies();
        this.setState({
          currentCompany: null,
          currentIndex: -1
        });
      }
    
      setActiveCompany(company, index) {
        this.setState({
          currentCompany: company,
          currentIndex: index
        });
      }
    
      redirectToAddNewCompany() {
        this.props.history.push("/createNewCompany");
      }
    
      searchCompany() {
        this.setState({
          currentCompany: null,
          currentIndex: -1
        });
    
        SMCService.findByCompanyName(this.state.searchCompany)
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

      DeleteCompany() {
        console.log(this.state.currentCompany.id);

        SMCService.deleteCompany(this.state.currentCompany.id)
        .then(response => {
          this.setState({
            // companies: response.data
          });
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });

        this.refreshList();
      }



      render() {
        const { searchCompany, companies, currentCompany, currentIndex } = this.state;
    
        return (
          <div className="list row">
            <div className="col-md-8">
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search by Company Name"
                  value={searchCompany}
                  onChange={this.onChangeSearchCompany}
                />
                <div className="input-group-append">
                  <button
                    className="btn btn-outline-secondary"
                    type="button"
                    onClick={this.searchCompany}
                  >
                    Search
                  </button>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <h4>Company List</h4>
    
              <ul className="list-group">
                {companies &&
                  companies.map((company, index) => (
                    <li
                      className={
                        "list-group-item " +
                        (index === currentIndex ? "active" : "")
                      }
                      onClick={() => this.setActiveCompany(company, index)} //this kinda arrow function is only required when passing params
                      key={index}
                    >
                      {company.name}
                    </li>
                  ))}
              </ul>
    
            </div>
            <div className="col-md-6">
              {currentIndex !== -1 ? (
                <div class="card"> 
                  <h4 class="card-header">Company Details</h4>
                  <div class="card-body">
                  <div>
                    <label>
                      <strong>Company Name:</strong>
                    </label>{" "}
                    {currentCompany.name}
                  </div>
                  <div>
                    <label>
                      <strong>Company Code:</strong>
                    </label>{" "}
                    {currentCompany.code}
                  </div>
                  <div>
                    <label>
                      <strong>CEO:</strong>
                    </label>{" "}
                    {currentCompany.ceo}
                  </div>
                  <div>
                    <label>
                      <strong>Sector:</strong>
                    </label>{" "}
                    {currentCompany.sectorName}
                  </div>
                  <div>
                    <label>
                      <strong>Turnover:</strong>
                    </label>{" "}
                    {currentCompany.turnover}
                  </div>
                  <div>
                    <label>
                      <strong>Brief Description:</strong>
                    </label>{" "}
                    {currentCompany.companyBrief}
                  </div>

                  <br/>

                  </div>
                </div>
              ) : (
                <div>
                  <br />
                  <p>Please click on a Company for more Info...</p>
                </div>
              )}
            </div>
          </div>
        );
      }
}

export default UserCompanies;