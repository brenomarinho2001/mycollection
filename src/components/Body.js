// src/components/Body.js
import React from 'react';
import GameCard from './Gamecard.js';

const Body = ({ games }) => {
    return (
        <main style={{ padding: '20px', display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
            {games.map(game => (
                <GameCard key={game.id} game={game} />
            ))}
        </main>
    );
};

export default Body;
