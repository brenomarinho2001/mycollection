// src/components/Body.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Body = () => {
    const [games, setGames] = useState([]);
    const [isLogged, setIsLogged] = useState(false);
    const [userId, setUserId] = useState(null);  // Estado para armazenar o ID do usuário logado

    // Verifica se o usuário está logado e busca os jogos
    useEffect(() => {
        const jwt = localStorage.getItem('jwt');
        if (jwt) {
            setIsLogged(true);
            // Decodificar o JWT para pegar o ID do usuário
            const decodedToken = JSON.parse(atob(jwt.split('.')[1]));
            setUserId(decodedToken.id);  // Define o ID do usuário logado
            fetchUserGames(jwt, decodedToken.id);  // Passa o ID para a função de busca
        }
    }, []);

    // Função para buscar os jogos do usuário autenticado
    const fetchUserGames = async (token, userId) => {
        try {
            const response = await axios.get('http://localhost:1337/api/games?populate=user', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('Dados retornados pela API:', response.data); // Verificar estrutura dos dados

            // Filtra jogos que estão relacionados ao usuário autenticado
            const userGames = response.data.data.filter(game => game.user.id === userId);
            setGames(userGames); // Define apenas os jogos do usuário
        } catch (error) {
            console.error('Erro ao buscar jogos:', error.response ? error.response.data.message : error.message);
        }
    };

    return (
        <main style={{ padding: '20px' }}>
            {isLogged ? (
                games.length > 0 ? (
                    games.map(game => (
                        <div>
                        <p key={game.id} style={{ textAlign: 'center', fontFamily: 'monospace', fontSize: '18px' }}>{game.nome}</p>
                        <p key={game.id} style={{ textAlign: 'center', fontFamily: 'monospace', fontSize: '18px' }}>{game.desc}</p>
                        <img src="http://localhost:1337/uploads/thumbnail_baixados_2886adf1e9.jpg" alt="Chrono Trigger"></img>

                        </div>
                    ))
                ) : (
                    <p style={{ textAlign: 'center' }}>Nenhum jogo encontrado.</p>
                )
            ) : (
                <p style={{ textAlign: 'center' }}>Faça login para ver seus jogos.</p>
            )}
        </main>
    );
};

export default Body;
