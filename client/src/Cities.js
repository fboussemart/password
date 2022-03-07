import React, {useEffect, useState} from "react";
import axios from "axios";

export default function Cities(props) {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + props.token;

    const [cities, setCities] = useState([]);

    async function getCities() {
        const data = (await axios.get('http://localhost:8000/cities')).data;
        setCities(data);
    }

    useEffect(() => {
        getCities()
    }, []);

    return (
        <>
            <p> Protected area for {props.username}</p>
            <ul>
                {cities.map(c => <li key={c.id}>{c.id} : {c.cityname}</li>)}
            </ul>
        </>
    )
}
