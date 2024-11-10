// src/components/Body.js
import React from 'react';
import GameCard from './Gamecard.js';

const Body = ({ games }) => {
    // Agrupa os jogos por console
    const gamesByConsole = games.reduce((acc, game) => {
        if (!acc[game.console]) acc[game.console] = [];
        acc[game.console].push(game);
        return acc;
    }, {});

    return (
        <main style={{ padding: '20px' }}>
            {Object.keys(gamesByConsole).map(console => (
                <section key={console} style={{ marginBottom: '40px' }}>
                    <h2 style={{ textAlign: 'center' }}>{console} Games</h2>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
                        {gamesByConsole[console].map(game => (
                            <GameCard key={game.id} game={game} />
                        ))}
                    </div>
                </section>
            ))}
        </main>
    );
};

export default Body;
