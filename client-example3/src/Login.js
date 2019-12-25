import React from 'react';
//import axios from "axios";
//import {Route} from 'react-router-dom';

import {useCookies} from 'react-cookie';

//import {HTTP_SERVER_PORT} from "./constants";


function FormLogin(props) {
    return (
        <form className="form-inline my-2 my-lg-0" onSubmit={props.onSubmit}>
            <div>
                <label>Username:</label>
                <input type="text" id="username"/>
            </div>
            <div>
                <label>Password:</label>
                <input type="password" name="password"/>
            </div>
            <div>
                <button type="submit" name="login">Login</button>
                <button name="signup" onClick={() => {
                    console.log("sign up")
                }}>
                    Sign up
                </button>
            </div>
        </form>
    );
}

export default function Login() {

    const [cookies, setCookie, removeCookie] = useCookies(['login']);

    function disconnect() {
        removeCookie('login');
    }

    function onSubmit(e) {
        e.preventDefault();
        setCookie('login', {
            username: e.target.username.value,
            password: e.target.password.value,
            isConnected: true
        }, '/');
    }

    if (cookies.login && cookies.login.isConnected) {
        return <button id="disconnect" onClick={disconnect}>disconnect</button>;
    }
    return <FormLogin onSubmit={onSubmit} cookies={cookies} setCookie={setCookie}/>
}

