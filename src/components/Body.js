import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css';

const Body = () => {
    const [games, setGames] = useState([]);
    const [isLogged, setIsLogged] = useState(false);
    const [userId, setUserId] = useState(null);
    const [dataFetched, setDataFetched] = useState(false);

    useEffect(() => {
        const jwt = localStorage.getItem('jwt');
        if (jwt && !dataFetched) {
            setIsLogged(true);
            const decodedToken = JSON.parse(atob(jwt.split('.')[1]));
            setUserId(decodedToken.id);
            fetchUserGames(jwt, decodedToken.id);
            setDataFetched(true);
        }
    }, [dataFetched]);

    const fetchUserGames = async (token, userId) => {
        try {
            const response = await axios.get(`http://localhost:1337/api/users/${userId}?populate=games.photo`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            
            const userData = response.data;

            if (userData && userData.games) {
                const uniqueGames = [...new Map(userData.games.map(game => [game.id, game])).values()];
                setGames(uniqueGames);
            } else {
                setGames([]);
            }
        } catch (error) {
            console.error('Erro ao buscar jogos do usuário:', error.response ? error.response.data.message : error.message);
        }
    };

    return (
        <main className="main-container">
            <h2 className="collection-title" style={{ fontStyle: 'italic' }}>> Minha Coleção</h2>
            <div style={{ display: 'flex' }}>
                {isLogged ? (
                    games.length > 0 ? (
                        games.map(game => (
                            <div className="game-card" key={game.id}>
                                {game.photo && game.photo[0] && game.photo[0].formats && game.photo[0].formats.small && (
                                    <img
                                        src={`http://localhost:1337${game.photo[0].formats.small.url}`}
                                        alt={game.nome}
                                        className="game-image"
                                    />
                                )}
                                <div className="game-info">
                                    <h3 className="game-title">{game.nome}</h3>
                                    <div style={{ display: 'flex' }}>
                                        <p className="game-platform" style={{ marginRight: '5px' }}>{game.plataforma}</p>
                                        <div className="game-stars">
                                            {'★'.repeat(game.stars) + '☆'.repeat(5 - game.stars)}
                                        </div>
                                    </div>
                                    <p
                                        className="game-status"
                                        style={{
                                            marginRight: '5px',
                                            textAlign: 'center',
                                            backgroundColor: game.zerado ? 'green' : 'red',
                                            color: 'white',
                                            padding: '5px',
                                            borderRadius: '5px',
                                        }}
                                    >
                                        {game.zerado ? "Finalizado" : "Não Finalizado"}
                                    </p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="empty-message">Nenhum jogo encontrado.</p>
                    )
                ) : (
                    <p className="empty-message">Faça login para ver seus jogos.</p>
                )}
            </div>
        </main>
    );
};

export default Body;
