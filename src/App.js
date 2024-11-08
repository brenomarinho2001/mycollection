// src/App.js
import React from 'react';
import Header from './components/Header';
import Body from './components/Body';
import Footer from './components/Footer';
import './App.css';

const App = () => {
    const games = [
        {
            id: 1,
            title: 'The Legend of Zelda',
            description: 'An action-adventure game.',
            image: 'https://example.com/zelda.png'
        },
        {
            id: 2,
            title: 'Super Mario Bros.',
            description: 'A platform game developed by Nintendo.',
            image: 'https://example.com/mario.png'
        },
        {
            id: 3,
            title: 'Minecraft',
            description: 'A sandbox game about placing blocks and going on adventures.',
            image: 'https://example.com/minecraft.png'
        }
    ];

    return (
        <div className="App">
            <Header />
            <div className="content">
                <Body games={games} />
            </div>
            <Footer />
        </div>
    );
};

export default App;
