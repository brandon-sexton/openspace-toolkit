import React, {Component} from "react";
import { NavBar } from "../components/nav-bar/nav-bar";
import { SatQueryWidget } from "../components/main-content/sat-query-widget/sat-query-widget";

class SatQueryPage extends Component {
  render() {
    return (
      <React.StrictMode>
        <NavBar />
        <div className="content">
          <SatQueryWidget satcat={this.props.satcat}/>
        </div>
      </React.StrictMode>
    );
  }
}

export default SatQueryPage;