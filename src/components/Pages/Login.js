import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginForm.css'; // Importando a folha de estilos

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:1337/api/auth/local', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          identifier: email,
          password: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Login bem-sucedido:', data);
        localStorage.setItem('jwt', data.jwt); // Salva o token de autenticação
        navigate('/'); // Redireciona para a rota inicial
      } else {
        alert('Credenciais incorretas! Tente novamente.');
      }
    } catch (error) {
      console.error('Erro de login:', error);
      alert('Erro ao conectar ao servidor. Tente novamente mais tarde.');
    }
  };

  const handleRegisterRedirect = () => {
    navigate('/register'); // Redireciona para a rota de registro
  };

  return (
    <div className="login-container">
      <h2 style={{fontStyle:'italic'}}>Login</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Senha:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="login-button">Entrar</button>
      </form>
      <button onClick={handleRegisterRedirect} className="register-button">
        Criar uma conta
      </button>
    </div>
  );
}

export default LoginForm;
