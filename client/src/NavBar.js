import React from 'react';
import {Link} from 'react-router-dom';

import Login, {NotProtectedLink, ProtectedLink} from './Login';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function NavBar() {
    return (
        <nav className="navbar navbar-light bg-light">
            <Link className="nav-link" to={"/home"}>Home </Link>
            <NotProtectedLink className="nav-link" to={"/login"}>Login </NotProtectedLink>
            <ProtectedLink className="nav-link" to={"/cities"}>cities </ProtectedLink>
            <Login/>
        </nav>
    );
}
