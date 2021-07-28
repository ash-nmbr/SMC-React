import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import SMCService from "../../services/smc_service";

class UserExchanges extends Component {
    constructor(props) {
        super(props);
        this.onChangeSearchExchange = this.onChangeSearchExchange.bind(this);
        this.retrieveExchanges = this.retrieveExchanges.bind(this);
        this.refreshList = this.refreshList.bind(this);
        // this.setActiveTutorial = this.setActiveTutorial.bind(this);
        // this.removeAllTutorials = this.removeAllTutorials.bind(this);
        this.searchExchange = this.searchExchange.bind(this);
        this.DeleteExchange = this.DeleteExchange.bind(this);
    
    
        this.state = {
          exchanges: [],
          currentExchange: null,
          currentIndex: -1,
          searchExchange: ""
        };
      }
    
    
      componentDidMount() {
        this.retrieveExchanges();
      }
    
      onChangeSearchExchange(e) {
        const searchExchange = e.target.value;
    
        this.setState({
          searchExchange: searchExchange
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
    
      refreshList() {
        this.retrieveExchanges();
        this.setState({
          currentExchange: null,
          currentIndex: -1
        });
      }
    
      setActiveExchange(exchange, index) {
        this.setState({
          currentExchange: exchange,
          currentIndex: index
        });
    
        SMCService.getCompaniesInExchange(exchange.name)
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
    
      redirectToAddNewExchange() {
        this.props.history.push("/addExchange");
      }
    
      searchExchange() {
        this.setState({
          currentExchange: null,
          currentIndex: -1
        });
    
        SMCService.findByExchangeName(this.state.searchExchange)
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
    
      DeleteExchange() {
        console.log(this.state.currentExchange.id);
    
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
        const { companies, searchExchange, exchanges, currentExchange, currentIndex } = this.state;
    
        return (
          <div className="list row">
            <div className="col-md-8">
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search by Stock Exchange Name"
                  value={searchExchange}
                  onChange={this.onChangeSearchExchange}
                />
                <div className="input-group-append">
                  <button
                    className="btn btn-outline-secondary"
                    type="button"
                    onClick={this.searchExchange}
                  >
                    Search
                  </button>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <h4>Stock Exchange List</h4>
    
              <ul className="list-group">
                {exchanges &&
                  exchanges.map((exchange, index) => (
                    <li
                      className={
                        "list-group-item " +
                        (index === currentIndex ? "active" : "")
                      }
                      onClick={() => this.setActiveExchange(exchange, index)} //this kinda arrow function is only required when passing params
                      key={index}
                    >
                      {exchange.name}
                    </li>
                  ))}
              </ul>
    
            </div>
            <div className="col-md-6">
              {currentIndex !== -1 ? (
                <div class="card">
                  <h4 class="card-header">Stock Exchange Details</h4>
                  <div class="card-body">
                    <div>
                      <label>
                        <strong>Stock Exchange Name:</strong>
                      </label>{" "}
                      {currentExchange.name}
                    </div>
                    <div>
                      <label>
                        <strong>Brief:</strong>
                      </label>{" "}
                      {currentExchange.brief}
                    </div>
                    <div>
                      <label>
                        <strong>Contact Address:</strong>
                      </label>{" "}
                      {currentExchange.contactAddress}
                    </div>
    
    
                    <br />
                    <br />
    
                    <strong>Companies belonging to this sector:</strong>
                    {companies &&
                      companies.map((company, index) => (
                        <div key={index}>
                          {company}
                        </div>
                      ))}
    
    
                    {/* <Link
                        onClick={this.DeleteExchange}
                        className="link-dark"
                      >
                        Delete Stock Exchange
                      </Link> */}
                  </div>
                </div>
              ) : (
                <div>
                  <br />
                  
                  <p>Please click on a Stock Exchange for more Info...</p>
                </div>
              )}
            </div>
          </div>
        );
      }
    
}

export default UserExchanges;