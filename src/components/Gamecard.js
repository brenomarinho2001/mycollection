// src/components/GameCard.js
import React from 'react';

const GameCard = ({ game }) => {
    const renderStars = () => {
        if (game.rating === null) {
            return <span style={{color:'black'}}>Não foi jogado ainda</span>;
        }

        const stars = [];
        const fullStars = Math.floor(game.rating);
        const halfStar = game.rating % 1 !== 0;

        // Adiciona estrelas inteiras
        for (let i = 0; i < fullStars; i++) {
            stars.push(<span key={i}>★</span>);
        }

        // Adiciona meia estrela, se necessário
        if (halfStar) {
            stars.push(<span key="half">☆</span>);
        }

        // Completa até 5 estrelas com estrelas vazias
        while (stars.length < 5) {
            stars.push(<span key={stars.length}>☆</span>);
        }

        return stars;
    };

    return (
        <div style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '16px', width: '200px', textAlign: 'center', cursor:'pointer' }}>
            <img src={game.image} alt={game.title} style={{ width: '100%', borderRadius: '4px' }} />
            <h3>{game.title}</h3>
            <p>{game.description}</p>
            <p><strong>Console:</strong> {game.console}</p>
            <div style={{ fontSize: '20px', color: '#ffd700',fontStyle:'italic'}}>
                {renderStars()}
            </div>
        </div>
    );
};

export default GameCard;
