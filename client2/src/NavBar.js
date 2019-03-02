import React from 'react';
import {Link} from 'react-router-dom';

import 'bootswatch/dist/flatly/bootstrap.min.css';

export default class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {connected: false};
    }

    render() {
        const publicTabs = [
            <li key="home"><Link className="nav-link" to={"/home"}>Home </Link></li>,
            <li key="login"><Link className="nav-link" to={"/login"}>Login </Link></li>
        ];
        const protectedTabs = this.props.connected ?
            <li><Link className="nav-link" to={"/protected"}>Protected </Link></li> : null;
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav">
                        {publicTabs}
                        {protectedTabs}
                    </ul>
                </div>
            </nav>
        );
    }
}
