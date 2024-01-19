import "./sat-query-widget.css"
import React, { Component } from "react";

class SatCountryCell extends Component {
  render() {
    return (
      <div className="country-cell" id={this.props.country}>
        {this.props.country}
      </div>
    );
  }
}

class SatTypeCell extends Component {
  render() {
    return (
      <div className="type-cell" id={this.props.type}>
        {this.props.type}
      </div>
    );
  }
}

export class SatQueryWidget extends Component {

  constructor(props) {
    super(props);
    this.state = {
      queryResults: [],
    };
  }

  render() {
    return (
      <div>
        <div className="sat-query-inputs">
          <input type="text" id="sat-name-input" placeholder="Name"></input>
          <input type="text" id="sat-norad-input" placeholder="NORAD ID"></input>
          <select id="sat-country-select">
            <option value="">All</option>
            <option value="US">USA</option>
            <option value="CIS">Russia</option>
            <option value="PRC">China</option>
            <option value="OTHER">Other</option>
          </select>
          <select id="sat-type-select">
            <option value="">All</option>
            <option value="PAYLOAD">Payload</option>
            <option value="ROCKET BODY">Rocket Body</option>
            <option value="DEBRIS">Debris</option>
            <option value="UNKNOWN">Unknown</option>
          </select>
          <div className="inc-range-div">
            <input type="number" id="sat-inc-min" placeholder="Min"></input>
            <input type="number" id="sat-inc-max" placeholder="Max"></input>
          </div>
          <select id="sat-status-select">
            <option value="">All</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
          <button id="sat-query-button" onClick={this.handleQuery}>Query</button>
        </div>
        <div className="sat-query-table">
          <div className="sat-query-row">
            <div>Name</div>
            <div>NORAD ID</div>
            <div>Country</div>
            <div>Type</div>
            <div>Inclination</div>
            <div>Scenario Status</div>
          </div>
          {this.mapQueryResultsToRows(this.state.queryResults)}
        </div>
      </div>
    );
  }

  handleQuery = () => {
    const satName = document.getElementById("sat-name-input").value;
    const satNoradId = document.getElementById("sat-norad-input").value;
    const satCountry = document.getElementById("sat-country-select").value;
    const satType = document.getElementById("sat-type-select").value;
    const satIncMin = document.getElementById("sat-inc-min").value;
    const satIncMax = document.getElementById("sat-inc-max").value;
    const satStatus = document.getElementById("sat-status-select").value;

    let satResults = this.props.satcat.filterByStillOnOrbit();
    satResults = satResults.filterByNamePattern(satName);
    satResults = satResults.filterByNoradIdPattern(satNoradId)
    if (satCountry !== "" && satCountry !== "OTHER") {
      satResults = satResults.filterByCountryCodes([satCountry]);
    } else if (satCountry === "OTHER") {
      satResults = satResults.filter((sat) => !["US", "CIS", "PRC"].includes(sat.COUNTRY));
    }
    if (satType !== "") {
      satResults = satResults.filterByTypes([satType]);
    }
    if (satIncMin !== "" && satIncMax !== "") {
      satResults = satResults.filterByInclinationRange(satIncMin, satIncMax);
    }
    if (satStatus !== "") {
      satResults = satResults.filter((sat) => sat.SCENARIO_STATUS === satStatus);
    }
    this.setState({
      queryResults: satResults,
    });
  }

  handleScenarioStatusChange = (event) => {
    const satNoradId = event.target.parentElement.children[1].innerHTML;
    const satIndex = this.props.satcatsatcat.findIndex((sat) => sat.NORAD_CAT_ID === satNoradId);
    const sat = this.props.satcatsatcat[satIndex];
    if (sat.SCENARIO_STATUS === "Inactive") {
      sat.SCENARIO_STATUS = "Active";
    } else {
      sat.SCENARIO_STATUS = "Inactive";
    }
    const queryIndex = this.state.queryResults.findIndex((sat) => sat.NORAD_CAT_ID === satNoradId);
    const querySat = this.state.queryResults[queryIndex];
    querySat.SCENARIO_STATUS = sat.SCENARIO_STATUS;
    this.setState({
      queryResults: this.state.queryResults,
    });
  }

  mapQueryResultsToRows = (satResults) => {
    return satResults.map((sat, index) => (
      <div key={index} className="sat-query-row">
        <div>{sat.SATNAME}</div>
        <div>{sat.NORAD_CAT_ID}</div>
        <SatCountryCell country={sat.COUNTRY}/>
        <SatTypeCell type={sat.OBJECT_TYPE}/>
        <div>{sat.INCLINATION}</div>
        <button id={sat.SCENARIO_STATUS} onClick={this.handleScenarioStatusChange}>{sat.SCENARIO_STATUS}</button>
      </div>
    ));
  }
}
