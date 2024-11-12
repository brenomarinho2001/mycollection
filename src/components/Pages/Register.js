import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function RegisterForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:1337/api/auth/local/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: email.split('@')[0], // Define um nome de usuário baseado no email
          email: email,
          password: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Registro bem-sucedido:', data);
        localStorage.setItem('jwt', data.jwt); // Salva o token de autenticação
        navigate('/'); // Redireciona para a página inicial
      } else {
        alert('Erro ao registrar! Verifique os dados e tente novamente.');
      }
    } catch (error) {
      console.error('Erro de registro:', error);
      alert('Erro ao conectar ao servidor. Tente novamente mais tarde.');
    }
  };

  return (
    <div style={{ maxWidth: '300px', margin: '0 auto', padding: '1rem' }}>
      <h2>Registrar-se no MyCollection</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Senha:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Registrar</button>
      </form>
    </div>
  );
}

export default RegisterForm;