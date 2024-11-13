import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RegisterForm.css';

function RegisterForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [avatar, setAvatar] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Primeiro, cria o usuário
      const userResponse = await fetch('http://localhost:1337/api/auth/local/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: email.split('@')[0],
          email: email,
          password: password,
        }),
      });

      const userData = await userResponse.json();

      if (userResponse.ok) {
        console.log('Registro bem-sucedido:', userData);
        localStorage.setItem('jwt', userData.jwt);

        // Se um avatar foi selecionado, faz o upload
        if (avatar) {
          const formData = new FormData();
          formData.append('files', avatar);
          formData.append('ref', 'plugin::users-permissions.user'); // Modelo de usuário
          formData.append('refId', userData.user.id); // ID do usuário recém-criado
          formData.append('field', 'avatar'); // Nome do campo no modelo

          const uploadResponse = await fetch('http://localhost:1337/api/upload', {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${userData.jwt}`,
            },
            body: formData,
          });

          if (uploadResponse.ok) {
            console.log('Avatar enviado com sucesso');
          } else {
            console.error('Falha no upload do avatar');
          }
        }

        navigate('/'); // Redireciona para a página inicial após o registro
      } else {
        alert(userData.error.message || 'Erro ao registrar! Verifique os dados e tente novamente.');
      }
    } catch (error) {
      console.error('Erro de registro:', error);
      alert('Erro ao conectar ao servidor. Tente novamente mais tarde.');
    }
  };

  return (
    <div className="register-container">
      <h2>Registrar-se no MyCollection</h2>
      <form onSubmit={handleSubmit} className="register-form">
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
        <div className="form-group">
          <label htmlFor="avatar">Avatar:</label>
          <input
            type="file"
            id="avatar"
            accept="image/*"
            onChange={(e) => setAvatar(e.target.files[0])}
          />
        </div>
        <button type="submit" className="register-button">Registrar</button>
      </form>
    </div>
  );
}

export default RegisterForm;
