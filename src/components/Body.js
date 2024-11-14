import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css';

const Body = () => {
    const [games, setGames] = useState([]);
    const [isLogged, setIsLogged] = useState(false);
    const [userId, setUserId] = useState(null);
    const [dataFetched, setDataFetched] = useState(false);
    const [viewOption, setViewOption] = useState('category'); // Opção padrão de visualização

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

    // Função para categorizar e ordenar os jogos por plataforma
    const categorizeGamesByPlatform = () => {
        const categorized = games.reduce((categories, game) => {
            const platform = game.plataforma || 'Outros';
            if (!categories[platform]) {
                categories[platform] = [];
            }
            categories[platform].push(game);
            return categories;
        }, {});

        // Ordena os jogos em cada plataforma
        Object.keys(categorized).forEach(platform => {
            categorized[platform].sort((a, b) => a.nome.localeCompare(b.nome));
        });

        return categorized;
    };

    // Função para categorizar e ordenar os jogos por status (finalizado ou não)
    const categorizeGamesByStatus = () => {
        const statusCategorized = {
            Finalizados: games.filter(game => game.zerado),
            'Não Finalizados': games.filter(game => !game.zerado),
        };

        // Ordena os jogos em cada status
        Object.keys(statusCategorized).forEach(status => {
            statusCategorized[status].sort((a, b) => a.nome.localeCompare(b.nome));
        });

        return statusCategorized;
    };

    const gamesByPlatform = categorizeGamesByPlatform();
    const gamesByStatus = categorizeGamesByStatus();

    return (
        <main className="main-container">
            <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                <h2 className="collection-title" style={{ fontStyle: 'italic'}}>Minha Coleção</h2>
                {/* Caixa de seleção de visualização */}
                <div className="view-selector">
                    <label htmlFor="view-option">Visualizar por:</label>
                    <select
                        id="view-option"
                        value={viewOption}
                        onChange={(e) => setViewOption(e.target.value)}
                    >
                        <option value="category">Categoria (Plataforma)</option>
                        <option value="status">Status (Finalizado ou Não)</option>
                    </select>
                </div>
            </div>
            {isLogged ? (
                <>
                    {viewOption === 'category' ? (
                        // Exibição por Categoria (Plataforma)
                        <section className="games-section">
                            {Object.keys(gamesByPlatform).map(platform => (
                                <div key={platform}>
                                    <h4 className="sub-category-title">{platform}</h4>
                                    <div className="games-grid">
                                        {gamesByPlatform[platform].map(game => (
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
                                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <div className="game-stars">
                                                            {'★'.repeat(game.stars) + '☆'.repeat(5 - game.stars)}
                                                        </div>
                                                    </div>
                                                    <p
                                                        className="game-status"
                                                        style={{
                                                            marginTop: '10px',
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
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </section>
                    ) : (
                        // Exibição por Status
                        <section className="games-section">
                            {Object.keys(gamesByStatus).map(status => (
                                <div key={status}>
                                    <h4 className="sub-category-title">{status}</h4>
                                    <div className="games-grid">
                                        {gamesByStatus[status].map(game => (
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
                                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <div className="game-stars">
                                                            {'★'.repeat(game.stars) + '☆'.repeat(5 - game.stars)}
                                                        </div>
                                                    </div>
                                                    <p
                                                        className="game-status"
                                                        style={{
                                                            marginTop: '10px',
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
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </section>
                    )}
                </>
            ) : (
                <p className="empty-message">Faça login para ver seus jogos.</p>
            )}
        </main>
    );
};

export default Body;
