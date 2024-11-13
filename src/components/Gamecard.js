// src/components/GameCard.js
import React,{ useEffect } from 'react';

import axios from 'axios';

const GameList = () => {
    useEffect(() => {
        // Fazendo o GET para buscar a lista de jogos
        axios.get('http://localhost:1337/api/users?populate=games.photo')
            .then(response => {
                console.log("Lista de Jogos:", response.data.data); // Exibe todos os jogos no console
            })
            .catch(error => {
                console.error("Erro ao buscar os jogos:", error);
            });
    }, []);

    return (
        <div>
            <h2>Verifique o console para a lista de jogos</h2>
        </div>
    );
};


const GameCard = ({ game }) => {
    console.log(GameList)
    const renderStars = () => {
        if (game.rating === null) {
            return <span style={{color:'black'}}>Não foi finalizado</span>;
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
        <div className='gamecard'>
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
