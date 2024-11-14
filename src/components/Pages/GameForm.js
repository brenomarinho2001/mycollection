import React, { useState } from 'react';
import './LoginForm.css'; // Importa o mesmo CSS do login

function GameForm() {
  const [name, setName] = useState('');
  const [photo, setPhoto] = useState('');
  const [stars, setStars] = useState('');
  const [description, setDescription] = useState('');
  const [completed, setCompleted] = useState(false);
  const [platform, setPlatform] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aqui, você pode enviar os dados para um servidor ou processá-los como necessário
    console.log({ name, photo, stars, description, completed, platform });
    alert('Jogo adicionado com sucesso!');
  };

  return (
    <div className="login-container">
      <h2 style={{ fontStyle: 'italic' }}>Adicionar Jogo</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label htmlFor="name">Nome do Jogo:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="photo">Foto (URL):</label>
          <input
            type="text"
            id="photo"
            value={photo}
            onChange={(e) => setPhoto(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="stars">Estrelas (1 a 5):</label>
          <input
            type="number"
            id="stars"
            value={stars}
            onChange={(e) => setStars(e.target.value)}
            min="1"
            max="5"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Descrição:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="completed">Zerado:</label>
          <input
            type="checkbox"
            id="completed"
            checked={completed}
            onChange={(e) => setCompleted(e.target.checked)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="platform">Plataforma:</label>
          <input
            type="text"
            id="platform"
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="login-button">Adicionar Jogo</button>
      </form>
    </div>
  );
}

export default GameForm;
