import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles/index.css';
import reportWebVitals from './reportWebVitals';
import Home from './pages/Home';
import ImagingPage from './pages/Imaging';
import { HashRouter, Routes, Route } from 'react-router-dom';

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route exact path="/imaging" element={<ImagingPage />} />
        <Route exact path="/" element={<Home />} />
      </Routes>
    </HashRouter>
  );
}

const root = createRoot(document.getElementById('app'));
root.render(
  <App class='app-container' />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
