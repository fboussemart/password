import React from 'react';
import axios from "axios";
import {Route} from 'react-router-dom';
import {Link} from 'react-router-dom';
import {useCookies, withCookies} from 'react-cookie';

function FormLogin(props) {
    return (
        <form onSubmit={props.onSignin}>
            <div>
                <label>Username:</label>
                <input type="text" id="username" ref={props.usernameRef}/>
            </div>
            <div>
                <label>Password:</label>
                <input type="password" name="password" ref={props.passwordRef}/>
            </div>
            <div>
                <button type="submit" name="login">Login</button>
                <button type="button" name="signup" onClick={props.onSignup}>
                    Sign up
                </button>
            </div>
        </form>
    );
}

function Login() {

    const [cookies, setCookie, removeCookie] = useCookies(['login']);
    const usernameRef = React.createRef();
    const passwordRef = React.createRef();

    function disconnect() {
        removeCookie('login');
    }

    async function onSignup() {
        const user = {
            username: usernameRef.current.value,
            password: passwordRef.current.value
        };
        try {
            const p = (await axios.post('http://localhost:8000/signup', user));
            if (p.status === 201) {
                user.token = p.data.token;
                setCookie('login', user, '/');
            }
        } catch (err) {
            console.error(err)
        }
    }

    async function onSignin(e) {
        e.preventDefault();
        const user = {
            username: e.target.username.value,
            password: e.target.password.value
        };
        try {
            const p = (await axios.post('http://localhost:8000/signin', user));
            if (p.status === 200) {
                user.token = p.data.token;
                setCookie('login', user, '/');
            }
        } catch (err) {
            console.error(err)
        }
    }

    if (cookies.login && cookies.login.username) {
        return <button id="disconnect" onClick={disconnect}>disconnect</button>;
    }
    return <FormLogin onSignin={onSignin} onSignup={onSignup} usernameRef={usernameRef} passwordRef={passwordRef}/>
}

function LocalProtectedRoute({component: Component, ...rest}) {
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

/**
 * @return {null}
 */
function LocalProtectedLink({...rest}) {
    if (rest.allCookies && rest.allCookies.login && rest.allCookies.login.username && rest.allCookies.login.token) {
        return <Link className={rest.className} to={rest.to}>cities</Link>
    }else{
        return null;
    }
}

function localIsConnected(...props){
    return props.allCookies && props.allCookies.login && props.allCookies.login.username && props.allCookies.login.token
}

const ProtectedRoute = withCookies(LocalProtectedRoute);
const ProtectedLink = withCookies(LocalProtectedLink);
const isConnected = withCookies(localIsConnected);

export {ProtectedRoute, ProtectedLink, isConnected};
export default Login;
