import React from "react";
import Login from "./Login";
import axios from "axios";
import {HTTP_SERVER_PORT} from "./constants";


export default class Protected extends React.Component {
    constructor(props) {
        super(props);
        this.state = {cities: []};
        this.loadData();
    }

    async loadData() {
        const cities = (await axios.get(HTTP_SERVER_PORT + 'cities', {headers: Login.getUser()})).data;
        if (cities) this.setState({cities: cities});
    }

    render() {
        if (!Login.getUser()) {
            return (<p>Access forbidden</p>);
        }
        if (this.state.cities === []) {
            return (<p>Loading...</p>)
        }
        return (
            <ul>
                {this.state.cities.map(q => <p key={q.name}> {q.name} - {q.country} </p>)}
            </ul>
        )
    }
}

