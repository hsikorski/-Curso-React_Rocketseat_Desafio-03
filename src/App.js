import React, { useState, useEffect } from 'react';
import api from './services/api.js';

import './styles.css';

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(()=>{
    api.get('/repositories').then(response => {
      console.log(response);
      setRepositories(response.data);
    })
  }, []);

  async function handleAddRepository() {

    const response = await api.post('/repositories', {
      id: `id${Date.now()}`,
      title: `Teste ${Date.now()}`,
      url: `https://www.${Date.now()}.com.br`, 
      techs: ['asp', `${Date.now()}`, 'jquery']
    });

    const repository = response.data;

    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`/repositories/${id}`);
      
    setRepositories(repositories.filter(item => item.id !== id));
  }

  return (
    <div>
      <h1>Lista de Repos</h1>
      <ul data-testid="repository-list">
        {repositories.map((item) => (
          <li key={item.id}>
            {item.title}
            <br />
            <a href={item.url} target="_blank">Acessar</a>
            <button onClick={() => handleRemoveRepository(item.id)}>
              Remover 
            </button>
        </li>
        ))}        
      </ul>
      <br />
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
