import React, { Component } from 'react';
import { Redirect, BrowserRouter, Switch, Route, Link } from "react-router-dom";
import { Container, Navbar, Form, Nav, NavDropdown, FormControl, Button } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";

import ImportData from "./AdminDashPages/ImportData";
import SubmitButton from './SubmitButton';
import ManageCompany from "./AdminDashPages/ManageCompany";
import ManageExchanges from "./AdminDashPages/ManageExchanges";
import ManageIPOS from "./AdminDashPages/ManageIPOS";
import CreateNewCompany from "./AdminDashPages/CreateNewCompany";
import UpdateCompany from './AdminDashPages/UpdateCompany';
import ManageSector from './AdminDashPages/ManageSector';
import AddExchange from './AdminDashPages/AddExchange';
import UpdateExchange from './AdminDashPages/UpdateExchange';
import AddIPO from './AdminDashPages/AddIPO';
import AddSector from './AdminDashPages/AddSector';
import UpdateSector from './AdminDashPages/UpdateSector';


class AdminDash extends Component {

  constructor(props) {


    super(props);
    this.goToLoginPage = this.goToLoginPage.bind(this);

    this.state = {
      email: "",
      password: "",
      admin: false,
      message: ""

    };
  }


  goToLoginPage(e) {

    this.props.history.push("/");
    console.log("hi");

  }



  render() {
    return (
      <BrowserRouter>
        <div>
          {/* <nav className="navbar navbar-expand navbar-dark bg-dark">
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/importData"} className="nav-link">
                Import Data
              </Link>
            </li>


            <li className="nav-item">
              <Link to={"/manageCompany"} className="nav-link">
                Manage Company
              </Link>
              
            </li>
            <li className="nav-item">
              <Link to={"/manageExchanges"} className="nav-link">
                Manage Exchanges
              </Link>
              
            </li>
            <li className="nav-item">
              <Link to={"/manageIPOS"} className="nav-link">
                Manage IPOs
              </Link>
              
            </li>

            <li className="nav-item">
              <Link to={"/manageSector"} className="nav-link">
                Manage Sector
              </Link>
              
            </li>


            <li className="nav-item">
            <button onClick={this.goToLoginPage} >
              Log Out
            </button>
            </li>

          </div>
        </nav> */}

          <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
              <Navbar.Brand>Admin Dashboard</Navbar.Brand>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                  <Nav.Link as={Link} to={"/ImportData"}>Import Stock Data</Nav.Link>
                  <Nav.Link as={Link} to={"/manageCompanies"}>Manage Companies</Nav.Link>
                  <Nav.Link as={Link} to={"/manageExchanges"}>Manage Exchanges</Nav.Link>
                  <Nav.Link as={Link} to={"/manageIpos"}>Manage IPOs</Nav.Link>
                  <Nav.Link as={Link} to={"/manageSector"}>Manage Sectors</Nav.Link>
                </Nav>
                <Nav>
                  <Nav.Link >Logged In as {this.props.location.state.key}</Nav.Link>
                  <SubmitButton
                    text={'LogOut'}
                    disabled={false}
                    onClick={this.goToLoginPage} />
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>

          <div className="container mt-3">
            <Switch>
              <Route exact path="/importData" component={ImportData} />
              <Route exact path="/manageCompanies" component={ManageCompany} />
              <Route exact path="/manageExchanges" component={ManageExchanges} />
              <Route exact path="/manageIPOS" component={ManageIPOS} />
              <Route exact path="/createNewCompany" component={CreateNewCompany} />
              <Route exact path="/updateCompany/:id" component={UpdateCompany} />
              <Route exact path="/manageSector" component={ManageSector} />
              <Route exact path="/addExchange" component={AddExchange} />
              <Route exact path="/updateExchange/:id" component={UpdateExchange} />
              <Route exact path="/addIPO" component={AddIPO} />
              <Route exact path="/addSector" component={AddSector} />
              <Route exact path="/updateSector/:id" component={UpdateSector} />
              <Route exact path="/addSector" component={AddIPO} />
            </Switch>


          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default AdminDash;