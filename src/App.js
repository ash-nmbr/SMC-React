import React, { Component } from "react";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import "./App.css";

import Login from "./components/Login";
import AdminDash from "./components/AdminDash";
import UserDash from "./components/UserDash";
import SignUp from "./components/SignUp";

class App extends Component {
  render() {
    return (

        <div >
        <BrowserRouter>
          <Switch>
            <Route exact path="/signup" component={SignUp} />
            <Route exact path={["/", "/login"]} component={Login} />
            <Route exact path="/adminDash" component={AdminDash} />
            <Route exact path="/userDash" component={UserDash} />
          </Switch>
        </BrowserRouter>
        </div>

    );
  }
}
export default App;
