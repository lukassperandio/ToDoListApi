import React, { useEffect, useState } from 'react';
import './App.css';
import api from './Api/AxiosConfig';
import { Route, Routes } from 'react-router';
import MainPage from './Pages/MainPage/MainPage';


function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<MainPage />} />
      </Routes>
    </>
  );
}

export default App;