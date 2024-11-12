import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('jwt');
        if (token) {
            setIsLoggedIn(true);
            axios.get('http://localhost:1337/api/users/me?populate=avatar', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(response => {
                setUser(response.data); // Define os dados do usuário
                console.log(response.data); // Verifique a estrutura da resposta aqui
            })
            .catch(error => {
                console.error("Erro ao buscar os dados do usuário:", error);
            });
        }
    }, []);

    const handleLoginRedirect = () => {
        navigate('/login');
    };

    const handleLogout = () => {
        localStorage.removeItem('jwt');
        setIsLoggedIn(false);
        setUser(null);
        navigate('/');
    };

    return (
        <header style={{ padding: '20px', backgroundColor: '#333', color: 'white', textAlign: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ paddingRight: '20px' }}>
                    {isLoggedIn ? (
                        <>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <div
                                    style={{
                                        borderRadius: '50%',
                                        height: '30px',
                                        width: '30px',
                                        marginRight: '10px',
                                        backgroundImage: user && user.avatar && user.avatar.formats && user.avatar.formats.thumbnail
                                            ? `url(http://localhost:1337${user.avatar.formats.thumbnail.url})`
                                            : 'none',
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                        cursor: 'pointer'
                                    }}
                                ></div>
                                <p style={{fontFamily:'monospace', fontStyle:'italic', fontSize:'15px'}}>
                                    {user ? user.username : 'Carregando...'}
                                </p>
                            </div>
                        </>
                    ) : (
                        <>
                            <button className='buttonbase' onClick={handleLoginRedirect}>Login</button>
                            <button className='buttonbase' onClick={handleLoginRedirect}>Registrar</button>
                        </>
                    )}
                </div>
                <div>
                    {isLoggedIn && (
                        <>
                            <button className='buttonbase' style={{ height: '35px' }}>Adicionar Jogo</button>
                            <button className='buttonbase' style={{ height: '35px' }} onClick={handleLogout}>Logout</button>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
