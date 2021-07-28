import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import SMCService from "../../services/smc_service";

class UserSectors extends Component {
    constructor(props) {
        super(props);
        this.onChangeSearchSector = this.onChangeSearchSector.bind(this);
        this.retrieveSectors = this.retrieveSectors.bind(this);
        this.refreshList = this.refreshList.bind(this);
        // this.setActiveTutorial = this.setActiveTutorial.bind(this);
        // this.removeAllTutorials = this.removeAllTutorials.bind(this);
        this.searchSector = this.searchSector.bind(this);
        this.DeleteSector = this.DeleteSector.bind(this);
    
    
        this.state = {
          companies: [],
          sectors: [],
          currentSector: null,
          currentIndex: -1,
          searchSector: ""
        };
      }
    
    
      componentDidMount() {
        this.retrieveSectors();
    
      }
    
      onChangeSearchSector(e) {
        const searchSector = e.target.value;
    
        this.setState({
          searchSector: searchSector
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
    
      refreshList() {
        this.retrieveSectors();
        this.setState({
          currentSector: null,
          currentIndex: -1
        });
      }
    
      setActiveSector(sector, index) {
        this.setState({
          currentSector: sector,
          currentIndex: index
        });
    
        SMCService.getCompaniesOfSector(sector.sectorName)
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
    
      redirectToAddNewSector() {
        this.props.history.push("/addSector");
      }
    
      searchSector() {
        this.setState({
          currentSector: null,
          currentIndex: -1
        });
    
        SMCService.findSectorByName(this.state.searchSector)
          .then(response => {
            this.setState({
              sectors: [response.data]
            });
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
      }
    
      DeleteSector() {
        console.log(this.state.currentSector.id);
    
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
    
        // this.refreshList();
      }
    
    
    
      render() {
        const { companies, searchSector, sectors, currentSector, currentIndex } = this.state;
    
        return (
          <div className="list row">
            <div className="col-md-8">
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search by Sector Name"
                  value={searchSector}
                  onChange={this.onChangeSearchSector}
                />
                <div className="input-group-append">
                  <button
                    className="btn btn-outline-secondary"
                    type="button"
                    onClick={this.searchSector}
                  >
                    Search
                  </button>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <h4>Sector List</h4>
    
              <ul className="list-group">
                {sectors &&
                  sectors.map((sector, index) => (
                    <li
                      className={
                        "list-group-item " +
                        (index === currentIndex ? "active" : "")
                      }
                      onClick={() => this.setActiveSector(sector, index)} //this kinda arrow function is only required when passing params
                      key={index}
                    >
                      {sector.sectorName}
                    </li>
                  ))}
              </ul>
    
            </div>
            <div className="col-md-6">
              {currentIndex !== -1 ? (
                <div class="card">
                  <h4 class="card-header">Sector Details</h4>
                  <div class="card-body">
                    <div>
                      <label>
                        <strong>Sector Name:</strong>
                      </label>{" "}
                      {currentSector.sectorName}
                    </div>
                    <div>
                      <label>
                        <strong>Brief:</strong>
                      </label>{" "}
                      {currentSector.brief}
                    </div>

                    <br /> <br />
                    <strong>Companies belonging to this sector:</strong>
                    {companies &&
                      companies.map((company, index) => (
                        <div key={index}>
                          {company.name}
                        </div>
                      ))}
    
                  </div>
                </div>
              ) : (
                <div>
                  <br />
                  <p>Please click on a Sector for more Info...</p>
                </div>
              )}
            </div>
          </div>
        );
      }
}

export default UserSectors;