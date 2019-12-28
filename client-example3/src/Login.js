import React from 'react';
import axios from "axios";
import {Route} from 'react-router-dom';

import {useCookies, withCookies} from 'react-cookie';

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

function Login() {

    const [cookies, setCookie, removeCookie] = useCookies(['login']);

    function disconnect() {
        removeCookie('login');
    }

    async function onSubmit(e) {
        e.preventDefault();
        const user = {
            username: e.target.username.value,
            password: e.target.password.value
        };
        const p = (await axios.post('http://localhost:8000/signin', user));
        if (p.status === 200) {
            user.token = p.data.token;
            console.log("user=", user);
            setCookie('login', user, '/');
        }
    }

    if (cookies.login && cookies.login.username) {
        return <button id="disconnect" onClick={disconnect}>disconnect</button>;
    }
    return <FormLogin onSubmit={onSubmit} cookies={cookies} setCookie={setCookie}/>
}
function ProtectedRoute1({component: Component, ...rest}) {
    if (rest.allCookies && rest.allCookies.login && rest.allCookies.login.username && rest.allCookies.login.token) {
        return (
            <Route
                {...rest}
                render={routeProps => (
                    <Component {...routeProps} username={rest.allCookies.login.username}
                               token={rest.allCookies.login.token}/>
                )}
            />
        );
    }
    return <p>!!</p>;
}

const ProtectedRoute = withCookies(ProtectedRoute1);
export {ProtectedRoute};
export default Login;


//render={props => <Protected {...props}
//                                                username={cookies.login.username}
//                                                token={cookies.login.token}