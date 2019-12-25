import React from 'react';
import axios from "axios";
import {Route} from 'react-router-dom';

import {HTTP_SERVER_PORT} from "./constants";

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.checkConnexion = () => console.log("no connexion");
        if (this.props.checkConnexion) {
            this.checkConnexion = this.props.checkConnexion
        }
        this.state = {
            user: Login.getUser(),
            authenticated: false,
            renderForm: false
        };
        this.login();
    }

    // login() {
    //     if (this.state.user) {
    //         axios.post(HTTP_SERVER_PORT + 'login', this.state.user)
    //             .then(res => {
    //                 if (res.data.isConnected) {
    //                     this.setUser(this.state.user);
    //                     this.setState({
    //                         authenticated: true
    //                     });
    //                     this.checkConnexion(true);
    //                 }
    //             })
    //     }
    // };
    async login() {
        if (this.state.user) {
            console.log("login:", this.state.user);
            const p = (await axios.get('http://localhost:8000/persons'));
            console.log("reponse==",p);

            // axios.post(HTTP_SERVER_PORT + 'login', this.state.user)
            //     .then(res => {
            //         if (res.data.isConnected) {
            //             this.setUser(this.state.user);
            //             this.setState({
            //                 authenticated: true
            //             });
            //             this.checkConnexion(true);
            //         }
            //     })
        } else {
            console.log("login : no user");
        }
    };

    signUp() {
        axios.post(HTTP_SERVER_PORT + 'signUp', this.state.user)
            .then(res => {
                if (res.data.isConnected) this.login()
            });
    };

    logout() {
        sessionStorage.clear();
        this.setState({
            user: null,
            authenticated: false,
        });
        this.checkConnexion(false);
    };

    setUser() {
        sessionStorage.setItem('username', this.state.user.username);
        sessionStorage.setItem('password', this.state.user.password);
    };

    // --- static methods ---
    static getUser() {
        if (sessionStorage.getItem('username') && sessionStorage.getItem('password')) {
            return ({
                username: sessionStorage.getItem('username'),
                password: sessionStorage.getItem('password')
            })
        }
        return null;
    };

    // --- form methods
    handleForm(e) {
        e.preventDefault();
        this.login();
        this.toggleForm();
    };

    setUsername(e) {
        const user = this.state.user || {};
        user.username = e.target.value;
        this.setState({user: user})
    }

    setPassword(e) {
        const user = this.state.user || {};
        user.password = e.target.value;
        this.setState(user)
    }

    toggleForm() {
        this.setState({renderForm: !this.state.renderForm});
    };

    renderForm() {
        if (!this.state.renderForm) return null;
        return (
            <form className="form-inline my-2 my-lg-0" onSubmit={e => this.handleForm(e)}>
                <div>
                    <label>Username:</label>
                    <input type="text" id="username"
                           onChange={e => this.setUsername(e)}/>
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" name="password"
                           onChange={e => this.setPassword(e)}/>
                </div>
                <div>
                    <button type="submit" name="login">Login</button>
                    <button name="signup" onClick={() => this.signUp(this.state.user)}>Sign up
                    </button>
                </div>
            </form>
        );
    };

    render() {
        if (this.state.user && this.state.authenticated) {
            return (
                <>
                    <p>{this.state.user.username}</p>
                    <button type="button" name="logout" className="btn btn-secondary"
                            onClick={() => this.logout()}>logout
                    </button>
                </>
            )
        } else {
            return (
                <>
                    <button type="button" name="login" className="btn btn-secondary my-2 my-sm-0"
                            onClick={() => this.toggleForm()}>login
                    </button>
                    {this.renderForm()}
                </>
            )
        }

    }
}

export const
    ProtectedRoute = (props) => {
        if (Login.getUser())
            return (<Route exact={props.exact} path={props.path} component={props.component}/>);
        return null;
    };

export default Login;