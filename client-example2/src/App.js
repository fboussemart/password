import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';

import NavBar from './NavBar.js';
import Protected from "./Protected";
import {ProtectedRoute} from "./Login";
import Home from "./Home";
import Login from "./Login";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {connected: false};
    }

    checkConnexion(connected) {
        if (connected !== this.state.connected) this.setState({connected: connected})
    }

    render() {
        return (<div>
            <header><NavBar connected={this.state.connected}/></header>
            <Switch>
                <Route exact={true} path="/" component={Home}/>
                <Route exact={true} path="/home" component={Home}/>
                <Route exact={true} path="/login"
                       render={props => <Login {...props} checkConnexion={b => this.checkConnexion(b)} />}/>
                <ProtectedRoute exact={true} path="/protected" component={Protected}/>
                <Route path="*" component={() => <p>Page Not Found</p>}/>
            </Switch>
            <footer>Footer</footer>
        </div>);
    }
}

export default App;
