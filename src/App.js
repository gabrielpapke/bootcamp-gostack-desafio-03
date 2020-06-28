import React, { useState, useEffect } from "react";

import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(({ data }) => setRepositories(data));
  }, [])

  async function handleAddRepository() {
    const newRepository = {
      title: `Desafio React.js 03 ${Date.now()}`,
      url: "https://github.com/gabrielpapke/bootcamp-gostack-desafio-03",
      techs: ["React.js", "Javascript"]
    };

    const { data } = await api.post('repositories', newRepository);

    setRepositories([...repositories, data])

  }

  async function handleRemoveRepository(id) {
    const { status } = await api.delete(`repositories/${id}`)

    if (status !== 204) return

    const newRepositoriesList = repositories.filter(repo => repo.id !== id);

    setRepositories(newRepositoriesList)
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repo, index) => (
          <li key={repo.id}>
          {repo.title}

          <button onClick={() => handleRemoveRepository(repo.id)}>
            Remover
          </button>
        </li>
        ))}
      </ul>
      
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
