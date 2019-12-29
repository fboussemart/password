import React from 'react';
import {useCookies} from 'react-cookie';

export default function Home() {
    const [cookies] = useCookies(['login']);
    const msg = cookies.login && cookies.login.username ? "connection OK" : "no connection";
    return (
        <>
            <h4> Home is a public area</h4>
            <p> {msg}</p>
        </>
    )
}
