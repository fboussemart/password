import React from 'react';
import {Link} from 'react-router-dom';

import 'bootswatch/dist/flatly/bootstrap.min.css';
import Login from "./Login";

export default class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {connected: false};
    }

    checkConnexion(connected) {
        if (connected !== this.state.connected) this.setState({connected: connected})
    }

    render() {
        const publicTabs = <li><Link className="nav-link" to={"/home"}>Home </Link></li>;
        const protectedTabs = Login.getUser() ?
            <li><Link className="nav-link" to={"/protected"}>Protected </Link></li> : null;
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav">
                        {publicTabs}
                        {protectedTabs}
                        <Login checkConnexion={(b) => this.checkConnexion(b)}/>
                    </ul>
                </div>
            </nav>
        );
    }
}
