import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {

  const [tasks, setTasks] = useState();
  const [task, setTask] = useState();
  const [newTask, setNewTask] = useState();

  const getTasks = async () => {
    try {
      const response = await api.get("/apu/v1/allTasks");
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  }

  return (
    <div className="App">
   
    </div>
  );
}

export default App;
