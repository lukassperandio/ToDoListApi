import React, { useEffect, useState } from 'react';
import './App.css';
import api from './Api/AxiosConfig';
import { Route, Routes } from 'react-router';
import MainPage from './Pages/MainPage/MainPage';
import CreateTaskPage from './Pages/CreateTask/CreateTask';
import EditTask from './Pages/EditTask/EditTask';

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/create-task" element={<CreateTaskPage />} />
        <Route path="/edit-task/:taskId" element={<EditTask />} />
      </Routes>
    </>
  );
}

export default App;