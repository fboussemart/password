import React, {useState} from 'react';
import {Route, Switch} from 'react-router-dom';

import NavBar from './NavBar.js';
import Protected from "./Protected";
//import {ProtectedRoute} from "./Login";
import Home from "./Home";
import Login from "./Login";

function App() {
    const [isUserConnected, setUserConnexion] = useState(false);

    // function checkConnexion(connected) {
    //     if (connected !== isUserConnected) setUserConnexion(connected)
    // }

    return (<div>
        <header><NavBar connected={isUserConnected}/></header>
        <Switch>
            <Route exact={true} path="/" component={Home}/>
            <Route exact={true} path="/home" component={Home}/>
            <Route exact={true} path="/protected" component={Protected}/>
            {/*<Route exact={true} path="/login"*/}
            {/*       render={props => <Login {...props} checkConnexion={b => checkConnexion(b)}/>}/>*/}
            <Route exact={true} path="/login"
                   render={props => <Login {...props}
                                           isUserConnected={isUserConnected}
                                           setUserConnexion={setUserConnexion}/>}/>

            {/*<ProtectedRoute exact={true} path="/protected" component={Protected}/>*/}
            <Route path="*" component={() => <p>Page Not Found</p>}/>
        </Switch>
        <footer>Footer</footer>
    </div>);
}

export default App;
