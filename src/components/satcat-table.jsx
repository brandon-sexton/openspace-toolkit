import "../styles/satcat-table.css"
import {SatCat} from "otk-data-handlers"
import React, { Component } from "react";

let satcat = await SatCat.fromURL(process.env.PUBLIC_URL + "/satcat.json");

class SatCountryCell extends Component {
  render() {
    return (
      <td id={this.props.country}>{this.props.country}</td>
    );
  }
}

class SatTypeCell extends Component {
  render() {
    return (
      <td id={this.props.type}>{this.props.type}</td>
    );
  }
}

class SatNameFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputTimer: null
    };
  }
  render() {
    return (
      <
        input 
        type="text" 
        id="sat-name-input" 
        placeholder="Name" 
        onChange={this.checkInputTimer}
      ></input>
    );
  }

  checkInputTimer = () => {
    clearTimeout(this.state.inputTimer);
    this.inputTimer = setTimeout(() => {
      this.props.onChange();
    }
    , 1000);
  }
}

class SatIdFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputTimer: null
    };
  }
  render() {
    return (
      <
        input 
        type="text" 
        id="sat-norad-input" 
        placeholder="NORAD ID"
        onChange={this.checkInputTimer}
      ></input>
    );
  }

  checkInputTimer = () => {
    clearTimeout(this.state.inputTimer);
    this.inputTimer = setTimeout(() => {
      this.props.onChange();
    }
    , 1000);
  }
}

class SatTypeFilter extends Component {
  render() {
    return (
      <select id="sat-type-select" onChange={this.props.onChange}>
        <option value="">All</option>
        <option value="PAYLOAD">Payload</option>
        <option value="ROCKET BODY">Rocket Body</option>
        <option value="DEBRIS">Debris</option>
        <option value="UNKNOWN">Unknown</option>
      </select>
    );
  }
}

class SatCountryFilter extends Component {

  render() {
    return (
      <select id="sat-country-select" onChange={this.props.onChange}>
        <option value="">All</option>
        <option value="US">USA</option>
        <option value="CIS">Russia</option>
        <option value="PRC">China</option>
        <option value="OTHER">Other</option>
      </select>
    )
  }
}


export class SatCatTable extends Component {

  constructor(props) {
    super(props);
    this.state = {
      fullCat: satcat.filterByStillOnOrbit(),
      filterSatNoradId: "",
      filterSatName: "",
      filterSatCountry: "",
      filterSatType: ""
    };
  }

  render() {

    return (
      <table id="sat-table">
        <tbody>
          <tr>
            <th>
              <SatNameFilter onChange={this.handleFilterChange}/>
            </th>
            <th>
              <SatIdFilter onChange={this.handleFilterChange}/>
            </th>
            <th>
              <SatCountryFilter onChange={this.handleFilterChange}/>
            </th>
            <th>
              <SatTypeFilter onChange={this.handleFilterChange}/>
            </th>
          </tr>
          {this.getTableRows()}
        </tbody>
      </table>
    );
  }

  handleFilterChange = () => {
    this.setState({
      filterSatName: document.getElementById("sat-name-input").value,
      filterSatNoradId: document.getElementById("sat-norad-input").value,
      filterSatCountry: document.getElementById("sat-country-select").value,
      filterSatType: document.getElementById("sat-type-select").value
    }, () => {
    });
  }

  getTableRows() {

    let afterFilters = this.state.fullCat.filterByNamePattern(this.state.filterSatName);
    afterFilters = afterFilters.filterByNoradIdPattern(this.state.filterSatNoradId)
    if (this.state.filterSatCountry !== "" && this.state.filterSatCountry !== "OTHER") {
      afterFilters = afterFilters.filterByCountryCodes([this.state.filterSatCountry]);
    } else if (this.state.filterSatCountry === "OTHER") {
      afterFilters = afterFilters.filter((sat) => !["US", "CIS", "PRC"].includes(sat.COUNTRY));
    }
    if (this.state.filterSatType !== "") {
      afterFilters = afterFilters.filterByTypes([this.state.filterSatType]);
    }

    return afterFilters.map((sat, index) => (
      <tr key={index}>
        <td>{sat.SATNAME}</td>
        <td>{sat.NORAD_CAT_ID}</td>
        <SatCountryCell country={sat.COUNTRY}/>
        <SatTypeCell type={sat.OBJECT_TYPE}/>
      </tr>
    ));
  }

}
