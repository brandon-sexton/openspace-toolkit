import "./nav-bar.css";
import React, { Component } from "react";

export class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: "satcat"
    };
  }
  render() {
    return (
      <nav>
        <div className='nav-item' id='satcat' onClick={this.handleSatellitesClick}></div>
        <div className='nav-item' id='imaging' onClick={this.handleImagingClick}></div>
      </nav>
    );
  }

  handleSatellitesClick = () => {
    window.location.href="./";
  }

  handleImagingClick = () => {
    window.location.href="./imaging";
  }

}