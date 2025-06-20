import React from 'react';
import ReactDOM from 'react-dom/client';
// import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
// import { LanguageProvider } from './context/LanguageContext';
// import Reflect from './pages/Reflect';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
