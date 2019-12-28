import React from "react";
//import Login from "./Login";
import axios from "axios";
// import {HTTP_SERVER_PORT} from "./constants";

//import {useCookies} from 'react-cookie';

export default function Protected(props) {
    //const [cookies, setCookie] = useCookies(['name']);
    //const name = cookies.name;
    axios.defaults.headers.get['Authorization'] = 'Bearer ' + props.token;

    async function getCities() {
        const p = (await axios.get('http://localhost:8000/cities')).data
        console.log("p=", p);
    }

    getCities();
    console.log("protected props=",props);
    return <p> Protected area for {props.username}</p>
}

/*
export default class Protected extends React.Component {
    constructor(props) {
        super(props);
        this.state = {cities: []};
        //this.loadData();
    }

    render() {
        return <p>Protected</p>
    }

    // async loadData() {
    //     const cities = (await axios.get(HTTP_SERVER_PORT + 'cities', {headers: Login.getUser()})).data;
    //     if (cities) this.setState({cities: cities});
    // }
    //
    // render() {
    //     if (!Login.getUser()) {
    //         return (<p>Access forbidden</p>);
    //     }
    //     if (this.state.cities === []) {
    //         return (<p>Loading...</p>)
    //     }
    //     return (
    //         <ul>
    //             {this.state.cities.map(q => <p key={q.name}> {q.name} - {q.country} </p>)}
    //         </ul>
    //     )
    // }
}
*/
