// src/components/GameCard.js
import React from 'react';

const GameCard = ({ game }) => {
    return (
        <div style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '16px', width: '200px', textAlign: 'center' }}>
            <img src={game.image} alt={game.title} style={{ width: '100%', borderRadius: '4px' }} />
            <h3>{game.title}</h3>
            <p>{game.description}</p>
        </div>
    );
};

export default GameCard;
