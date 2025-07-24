import React, { useEffect } from 'react';
import api from '../../Api/AxiosConfig';

function MainPage() {
  useEffect(() => {
  console.log("useEffect foi chamado!");

  api.get('/api/v1/tasks/allTasks')
    .then((response) => {
      console.log("Tarefas recebidas do backend:", response.data);
    })
    .catch((error) => {
      console.error("Erro ao buscar tarefas:", error);
    });
}, []);

  return (
    <div>
      <h1>Main Page</h1>
    </div>
  );
}

export default MainPage;
