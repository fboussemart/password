import React from 'react';
import {Route, Switch} from 'react-router-dom';

import NavBar from './NavBar.js';
import Protected from "./Protected";
import Home from "./Home";
import Login, {ProtectedRoute} from "./Login";

function App() {
    return (<div>
        <header><NavBar/></header>
        <Switch>
            <Route exact={true} path="/" component={Home}/>
            <Route exact={true} path="/home" component={Home}/>
            <ProtectedRoute exact={true} path="/protected" component={Protected} />
            <Route exact={true} path="/login" component={Login}/>
            <Route path="*" component={() => <p>Page Not Found</p>}/>
        </Switch>
        <footer>Footer</footer>
    </div>);
}

export default App;
