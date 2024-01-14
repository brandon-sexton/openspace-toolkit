import "../styles/nav-panel.css";
import React, { Component } from "react";

export class NavPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: "satcat"
    };
  }
  render() {
    return (
      <nav id="nav-panel">
        <div className="nav-panel-item" onClick={this.handleSatellitesClick}>Satellites</div>
        <div className="nav-panel-item" onClick={this.handleImagingClick}>Imaging</div>
      </nav>
    );
  }

  handleSatellitesClick = () => {
    window.location.href="./";
  }

  handleImagingClick = () => {
    window.location.href="./#/imaging";
  }

}