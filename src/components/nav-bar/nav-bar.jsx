import "./nav-bar.css";
import React, { Component } from "react";

export class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chaseState: JSON.parse(window.localStorage.getItem('chaseState')),
    };
  }
  render() {
    return (
      <nav>
        <div className='nav-item' id='satcat' onClick={this.handleSatellitesClick}></div>
        <div className='nav-item' id='imaging' onClick={this.handleImagingClick}></div>
        <div className='chase-state-div'>
          <div>{this.state.chaseState.name}</div>
          <div>{this.state.chaseState.epoch}</div>
          <button onClick={this.handleLoadClick}>Load</button>
        </div>
      </nav>
    );
  }

  handleLoadClick = async () => {
    const fileHandle = await window.showOpenFilePicker();
    if (!fileHandle) return;
    const file = await fileHandle[0].getFile();
    const contents = await file.text();
    const jsonFormat = JSON.parse(contents);
    localStorage.setItem('chaseState', JSON.stringify(jsonFormat[0]));
    this.setState({chaseState: jsonFormat[0]});
  }
    

  handleSatellitesClick = () => {
    window.location.href="./";
  }

  handleImagingClick = () => {
    window.location.href="./#/imaging";
  }

}