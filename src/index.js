import React, {Component} from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import SatQueryPage from './pages/sat-query-page';
import ImageSchedulePage from './pages/image-schedule-page';
import { HashRouter, Routes, Route } from 'react-router-dom';

const activeSatellites = JSON.parse(window.localStorage.getItem('activeSatellites'));
if (activeSatellites === null) {
  window.localStorage.setItem('activeSatellites', JSON.stringify([]));
}

class App extends Component {

  render() {
    return (
      <HashRouter>
        <Routes>
          <Route exact path="/imaging" element={<ImageSchedulePage />} />
          <Route path="/" element={<SatQueryPage />} />
        </Routes>
      </HashRouter>
    );
  }
}

const root = createRoot(document.getElementById('app'));
root.render(
  <App class='app-container'/>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
