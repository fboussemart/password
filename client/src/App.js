import React from 'react';
import {Route, Routes} from 'react-router-dom';

import NavBar from './NavBar.js';
import Cities from "./Cities";
import Home from "./Home";
import Login, {ProtectedRoute} from "./Login";

function App() {
    return (
        <div>
            <header><NavBar/></header>
            <Routes>
                <Route exact={true} path="/" element={<Home/>}/>
                <Route exact={true} path="/home" element={<Home/>}/>
                <Route exact={true} path="/cities" element={<ProtectedRoute><Cities/></ProtectedRoute>}/>
                <Route exact={true} path="/login" element={<Login/>}/>
                <Route path="*" element={<Home/>}/>
            </Routes>
        </div>);
}

export default App;
