import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import Four04 from "../404";
import Home from "../home";

class App extends Component {
  static propTypes = {};

  render() {
    return (
      <div className="container">
        <Switch>
          <Route exact path="/" render={() => <Redirect to="/home" />} />
          <Route path="/home" component={Home} />
          <Route exact path="*" component={Four04} />
        </Switch>
      </div>
    );
  }
}

export default App;
