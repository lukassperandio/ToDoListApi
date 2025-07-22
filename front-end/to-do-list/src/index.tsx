import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router';
import MainPage from './Pages/MainPage/MainPage';


export default function renderApp() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/teste' element={<MainPage />} />
      </Routes>
    </BrowserRouter>  
  );
}

reportWebVitals();
