import React from 'react';
import { Container, Navbar, Form, Nav, NavDropdown, FormControl, Button } from 'react-bootstrap';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import SubmitButton from './SubmitButton';
import ViewIPO from './UserDashPages/viewIPO';
import Comparison from './UserDashPages/Comparison';
import UpdateProfile from './UserDashPages/UpdateProfile';


import 'bootstrap/dist/css/bootstrap.min.css';
import UserCompanies from './UserDashPages/UserCompanies';
import UserSectors from './UserDashPages/UserSectors';
import UserExchanges from './UserDashPages/UserExchanges';


class UserDash extends React.Component{
    constructor(props) {


        super(props);
        this.goToLoginPage = this.goToLoginPage.bind(this);
    
        this.state = {
          email: "",
          password: "",
          admin: false,
          message: this.props.location.state.key
    
        };
      }

    goToLoginPage(e) {

        this.props.history.push("/");
        console.log("hi");
    
      }
    

    render(){

        return(
            <Router>
            <div>
                
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
            <Navbar.Brand>User Dashboard</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                <Nav.Link as={Link} to={"/viewIPO"}>IPOs</Nav.Link>
                <Nav.Link as={Link} to={"/comparison"}>Compare Companies/Sectors</Nav.Link>
                <Nav.Link as={Link} to={"/updateProfile"}>Update Profile</Nav.Link>
                <Nav.Link as={Link} to={"/userCompanies"}>Companies</Nav.Link>
                <Nav.Link as={Link} to={"/userSectors"}>Sectors</Nav.Link>
                <Nav.Link as={Link} to={"/userExchanges"}>Exchanges</Nav.Link>
                </Nav>
                <Nav>
                <Nav.Link>Logged In as {this.props.location.state.key}</Nav.Link>
                <SubmitButton 
                    text={'LogOut'}
                    disabled={false}
                    onClick={this.goToLoginPage}/>
                </Nav>
            </Navbar.Collapse>
            </Container>
            </Navbar>
            </div>
            <div>
                <Switch>
                    <Route path="/viewIPO">
                        <ViewIPO/>
                    </Route>
                    <Route path="/comparison">
                        <Comparison />
                    </Route>
                    <div className="container mt-3">             
                    <Route path="/updateProfile">
                        <UpdateProfile data = {this.state.message}/>
                    
                    </Route>

                    <Route path="/userCompanies">
                        <UserCompanies />
                    </Route>

                    <Route path="/userSectors">
                        <UserSectors />
                    </Route>

                    <Route path="/userExchanges">
                        <UserExchanges />
                    </Route>


                    </div>
                </Switch>
            </div>
            </Router>
        )
    }
}
export default UserDash;