import React, {Component} from 'react';
import { createRoot } from 'react-dom/client';
import './styles/index.css';
import reportWebVitals from './reportWebVitals';
import Home from './pages/Home';
import ImagingPage from './pages/Imaging';
import { HashRouter, Routes, Route } from 'react-router-dom';

import {SatCat} from "otk-data-handlers"

const satcat = await SatCat.fromURL(process.env.PUBLIC_URL + "/satcat.json");
satcat.forEach((sat) => {
  sat.SCENARIO_STATUS = "Inactive";
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      satcat: satcat,
    }
  }

  render() {
    return (
      <HashRouter>
        <Routes>
          <Route exact path="/imaging" element={<ImagingPage satcat={this.state.satcat} />} />
          <Route exact path="/" element={<Home satcat={this.state.satcat} />} />
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
