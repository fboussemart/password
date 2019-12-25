import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';

import NavBar from './NavBar.js';
import Protected from "./Protected";
import {ProtectedRoute} from "./Login";
import Home from "./Home";

class App extends Component {
  render() {
    return (<div>
      <header><NavBar/></header>
      <Switch>
        <Route exact={true} path="/" component={Home}/>
        <Route exact={true} path="/home" component={Home}/>
        <ProtectedRoute exact={true} path="/protected" component={Protected}/>
        <Route path="*" component={() => <p>Page Not Found</p>}/>
      </Switch>
      <footer>Footer</footer>
    </div>);
  }
}

export default App;
