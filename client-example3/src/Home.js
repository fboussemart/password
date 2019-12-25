import React from 'react';
//import axios from "axios";
//import {HTTP_SERVER_PORT} from "./constants";
import Login from "./Login";

//import { useCookies } from 'react-cookie';

export default function Home() {
    // async function loadData() {
    //     const test = (await axios.get(HTTP_SERVER_PORT + 'test', {headers: Login.getUser()})).data;
    //     if (test) console.log("test:", test);
    // }

    //loadData();
    //console.log(Login.getUser());


    // -----
    // const [cookies, setCookie] = useCookies(['name']);
    // setCookie('name', 'toto', { path: '/' });

    // const name = cookies.name;
    // return <div> Home : Public area for {name} </div>
    // -----

    return <div> Home : Public area <Login/></div>

}
