// src/App.js
import React from 'react';

import './App.css';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './components/Pages/Home';
import Login from './components/Pages/Login'
import Register from './components/Pages/Register'

const App = () => {


    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />}></Route>
                    <Route path="/Login" element={<Login />}></Route>
                    <Route path="/Register" element={<Register />}></Route>
                </Routes>
            </BrowserRouter>
            
            
        </div>
    );
};

export default App;
